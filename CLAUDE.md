# CLAUDE.md — travels.luckycommons.com

This is the **central family travel app** at `travels.luckycommons.com`. It is a static GitHub Pages site that reads all content from Firestore in real time. Content is never edited here — it lives in per-trip repos and gets synced to Firestore via `sync-to-firestore.js`.

---

## Architecture

```
travels/                 ← this repo (Home-SF/travels)
├── index.html           # All trips homepage
├── trip.html            # Trip overview — day grid by city
├── day.html             # Single day — events timeline + dining
├── restaurants.html     # Dining list (filterable by city)
├── activities.html      # Activities list (filterable by city)
├── photos.html          # Photo gallery (from Firestore)
├── location-map.html    # GPS track map (Leaflet)
├── live-status.html     # Live check-in feed (auto-refreshes)
└── assets/
    ├── styles.css        # Shared design tokens + components
    ├── firebase-config.js # Firebase init (needs real config pasted in)
    └── app.js            # Shared Firestore helpers + render utils
```

**No build step.** Vanilla JS ES modules. GitHub Pages hosting.

---

## Firebase setup

1. Go to Firebase Console → Project `paris-london-2026` → Project Settings → Your apps → Web app
2. Copy the `firebaseConfig` object
3. Paste it into `assets/firebase-config.js` (replacing the placeholder values)

The app uses Firestore — no Auth required for reads (public rules).

---

## Firestore data model

All trip content lives under `trips/{tripId}` and its subcollections:

```
trips/
  paris-london-2026/           ← trip document
    days/
      2026-08-10/              ← day document (ISO date = doc ID)
      ...
    restaurants/
      paris-001                ← {city}-{num:03d}
      ...
    activities/
      paris-act-001            ← {city}-act-{num:03d}
      ...
    photos/
      {photoId}                ← uploaded via Firebase Storage
```

---

## URL routing

| URL | Page |
|-----|------|
| `/` | All trips homepage |
| `/trip.html?id=paris-london-2026` | Trip overview |
| `/day.html?trip=paris-london-2026&date=2026-08-12` | Single day |
| `/restaurants.html?trip=paris-london-2026` | All dining |
| `/restaurants.html?trip=paris-london-2026&city=paris` | Paris dining |
| `/activities.html?trip=paris-london-2026&city=london` | London activities |
| `/photos.html?trip=paris-london-2026` | Photo gallery |
| `/location-map.html?trip=paris-london-2026` | GPS map |
| `/live-status.html?trip=paris-london-2026` | Live check-ins |

---

## Design tokens

```css
--bg: #FBF6EC;  --bg-raised: #F3EAD6;  --ink: #241F1B;
--navy: #1D4E89;  --brass-dark: #B8842E;
--paris: #E1512B;  --london: #1D4E89;  --toronto: #1B7A5C;
```

Fonts: Big Shoulders Display (headings), Inter (body), Space Mono (labels).

---

## Adding a new trip

1. In the per-trip repo, run `generate-trip-data.py` → commits `trip-data.json`
2. Run `sync-to-firestore.js` → creates `trips/{tripId}` and subcollections
3. The new trip automatically appears on the homepage — no changes needed here.

---

## DNS / GitHub Pages

Domain: `travels.luckycommons.com`  
GitHub Pages: Settings → Pages → Custom domain → `travels.luckycommons.com`  
DNS: CNAME `travels.luckycommons.com` → `home-sf.github.io`

---

## Firebase security rules

```
match /trips/{tripId} {
  allow read: if true;
  allow write: if false;   // admin SDK only
  match /days/{date}       { allow read: if true; allow write: if false; }
  match /restaurants/{id}  { allow read: if true; allow write: if false; }
  match /activities/{id}   { allow read: if true; allow write: if false; }
  match /photos/{id}       { allow read: if true; allow write: if request.auth != null; }
}
```
