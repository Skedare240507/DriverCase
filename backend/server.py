from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="Velocity Atlas API")
api_router = APIRouter(prefix="/api")


# ---------- Models ----------
class Inquiry(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    subject: Optional[str] = None
    message: str
    brand_slug: Optional[str] = None
    car_slug: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class InquiryCreate(BaseModel):
    name: str
    email: EmailStr
    subject: Optional[str] = None
    message: str
    brand_slug: Optional[str] = None
    car_slug: Optional[str] = None


class Favorite(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    session_id: str
    car_slug: str
    brand_slug: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class FavoriteCreate(BaseModel):
    session_id: str
    car_slug: str
    brand_slug: str


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "Velocity Atlas API", "status": "online"}


@api_router.post("/inquiries", response_model=Inquiry)
async def create_inquiry(payload: InquiryCreate):
    inquiry = Inquiry(**payload.model_dump())
    doc = inquiry.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.inquiries.insert_one(doc)
    return inquiry


@api_router.get("/inquiries", response_model=List[Inquiry])
async def list_inquiries():
    items = await db.inquiries.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    for it in items:
        if isinstance(it.get('created_at'), str):
            it['created_at'] = datetime.fromisoformat(it['created_at'])
    return items


@api_router.post("/favorites", response_model=Favorite)
async def add_favorite(payload: FavoriteCreate):
    existing = await db.favorites.find_one({
        "session_id": payload.session_id,
        "car_slug": payload.car_slug,
    }, {"_id": 0})
    if existing:
        if isinstance(existing.get('created_at'), str):
            existing['created_at'] = datetime.fromisoformat(existing['created_at'])
        return existing
    fav = Favorite(**payload.model_dump())
    doc = fav.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.favorites.insert_one(doc)
    return fav


@api_router.get("/favorites/{session_id}", response_model=List[Favorite])
async def list_favorites(session_id: str):
    items = await db.favorites.find({"session_id": session_id}, {"_id": 0}).to_list(200)
    for it in items:
        if isinstance(it.get('created_at'), str):
            it['created_at'] = datetime.fromisoformat(it['created_at'])
    return items


@api_router.delete("/favorites/{session_id}/{car_slug}")
async def remove_favorite(session_id: str, car_slug: str):
    result = await db.favorites.delete_one({"session_id": session_id, "car_slug": car_slug})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Favorite not found")
    return {"status": "removed", "car_slug": car_slug}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
