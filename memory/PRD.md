# Velocity Atlas — PRD

## Original Problem Statement
Build a 3D landing-page website for different car companies. Clicking a brand
brings its famous cars in one by one with forward/backward controls. A "See
Details" button shows car type, colors, price, engine and full specs. Includes
About page with founder info + photos and index of all brands and their cars.
Homepage has website info, animations, background videos, images, 3D rotating
elements.

## User Choices
- Brands: All 10 (Ferrari, Lamborghini, Porsche, Bugatti, Rolls-Royce, BMW, Mercedes, Audi, Tesla, Toyota)
- 3D approach: Mix — real photos + CSS 3D transforms + coverflow carousel + rotating rings
- Backend: Favorites (per session) + Contact/Inquiry form
- Background videos: Yes (Pexels cinematic clip)

## Architecture
- Frontend: React 19 + React Router + Framer Motion + Tailwind + Sonner (toasts). Fonts: Cormorant Garamond, Outfit, JetBrains Mono. Dark cinematic theme (#050505, gold #D4AF37).
- Backend: FastAPI, MongoDB (Motor). Endpoints under /api.
  - GET  /api/               — health/root
  - POST /api/inquiries      — contact form
  - GET  /api/inquiries      — list inquiries (admin)
  - POST /api/favorites      — add favorite (idempotent by session_id+car_slug)
  - GET  /api/favorites/{session_id}
  - DELETE /api/favorites/{session_id}/{car_slug}
- Data: 10 brands × 3 cars each, static in /app/frontend/src/data/brands.js
- Session: browser-scoped UUID in localStorage (`velocity_atlas_session`) for favorites

## Pages
- / (Home)         — hero video, marquee, brand tetris grid, features, founders teaser
- /brand/:slug     — brand hero + 3D coverflow carousel with prev/next/dots + full lineup grid
- /car/:slug       — drag-to-rotate 3D viewer, gallery, colour swatches, spec sheet, features, founder story
- /about           — 10-founder tetris grid + full index of brands and cars + manifesto
- /contact         — Contact form saved to backend (name, email, subject, message)
- /favorites       — Personal garage (session-based favorites)

## Implementation Log
- 2026-07-03: Initial MVP shipped. 10 brands × 3 cars, backend + frontend complete. Testing agent iteration_1: 100% pass rate (backend 4/4, frontend all flows). Fixed nested-Link warning on About index.

## P0/P1/P2 Backlog
- P1: Add Three.js/R3F 3D scene for the hero (currently uses CSS 3D + Pexels video)
- P1: Add real founder photos + more accurate car imagery (some Unsplash pics are stand-ins)
- P2: Admin dashboard for inquiries
- P2: Compare-2-cars side-by-side viewer
- P2: Add search/filter across all cars
- P2: Add sound on hover (engine idles) with mute toggle
