"""Backend API tests for Velocity Atlas."""
import os
import uuid
import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://drive-showcase-28.preview.emergentagent.com').rstrip('/')
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def session_id():
    return f"TEST_{uuid.uuid4().hex[:10]}"


# ---------- Health ----------
def test_root_online():
    r = requests.get(f"{API}/")
    assert r.status_code == 200
    data = r.json()
    assert data.get("status") == "online"


# ---------- Inquiries ----------
def test_create_inquiry_valid():
    payload = {
        "name": "TEST_Reviewer",
        "email": "reviewer@example.com",
        "subject": "Hello",
        "message": "Love the site",
    }
    r = requests.post(f"{API}/inquiries", json=payload)
    assert r.status_code == 200, r.text
    data = r.json()
    assert data["name"] == payload["name"]
    assert data["email"] == payload["email"]
    assert "id" in data and data["id"]
    assert "created_at" in data


def test_create_inquiry_invalid_email():
    payload = {"name": "T", "email": "not-an-email", "message": "hi"}
    r = requests.post(f"{API}/inquiries", json=payload)
    assert r.status_code == 422


# ---------- Favorites ----------
def test_favorites_add_idempotent_list_and_delete(session_id):
    car = "ferrari-sf90"
    brand = "ferrari"

    # Add
    r1 = requests.post(f"{API}/favorites", json={
        "session_id": session_id, "car_slug": car, "brand_slug": brand
    })
    assert r1.status_code == 200, r1.text
    fav1 = r1.json()
    assert fav1["car_slug"] == car
    assert "id" in fav1

    # Add same again (idempotent)
    r2 = requests.post(f"{API}/favorites", json={
        "session_id": session_id, "car_slug": car, "brand_slug": brand
    })
    assert r2.status_code == 200
    fav2 = r2.json()
    assert fav2["id"] == fav1["id"], "Favorite should be idempotent (same id)"

    # Add different car
    requests.post(f"{API}/favorites", json={
        "session_id": session_id, "car_slug": "ferrari-296-gtb", "brand_slug": brand
    })

    # List should only return this session's favs
    rl = requests.get(f"{API}/favorites/{session_id}")
    assert rl.status_code == 200
    items = rl.json()
    slugs = [i["car_slug"] for i in items]
    assert car in slugs
    assert "ferrari-296-gtb" in slugs
    assert all(i["session_id"] == session_id for i in items)

    # Other session isolation
    other = f"TEST_other_{uuid.uuid4().hex[:6]}"
    ro = requests.get(f"{API}/favorites/{other}")
    assert ro.status_code == 200
    assert ro.json() == []

    # Delete
    rd = requests.delete(f"{API}/favorites/{session_id}/{car}")
    assert rd.status_code == 200

    # Delete non-existent -> 404
    rd2 = requests.delete(f"{API}/favorites/{session_id}/{car}")
    assert rd2.status_code == 404

    # Cleanup other car
    requests.delete(f"{API}/favorites/{session_id}/ferrari-296-gtb")
