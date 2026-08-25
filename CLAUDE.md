# CLAUDE.md — travels.luckycommons.com

This is the **central family travel app** at `travels.luckycommons.com`. It is a static GitHub Pages site that reads all content from Firestore in real time. Content is never edited here — it lives in per-trip repos and gets synced to Firestore via `sync-to-firestore.js`.

---

## Architecture

```
travels/                 ← this repo (Home-SF/travels)
├── index.html           # All trips homepage
├── trip.html            # Trip overview — day grid by city
├── day.html             # Single day — events timeline + dining + photo grid + upload
├── restaurants.html     # Dining list (filterable by city)
├── activities.html      # Activities list (filterable by city)
├── photos.html          # Photo gallery (filterable by city, sortable)
├── photo-upload.html    # Standalone bulk photo upload (auth required)
├── migrate-photos.html  # One-time tool: creates Firestore records for pre-existing Storage files
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

The app uses Firestore — no Auth required for reads (public rules). Writes to `photos` require Firebase Auth.

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
      {photoId}                ← auto-ID; written by upload flow
```

### Photo document fields

```js
{
  url:         string,   // Firebase Storage download URL (full resolution)
  thumbnailUrl: string,  // same as url for now (no thumbnail pipeline yet)
  person:      string,   // uploader-selected person name
  city:        string,   // 'paris' | 'london' | 'toronto'
  date:        string,   // YYYY-MM-DD — EXIF shoot date, or today's date if no EXIF
  filename:    string,   // original file name
  tripId:      string,   // e.g. 'paris-london-2026'
  uploadedAt:  Timestamp // Firestore server timestamp
}
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

## Photo system

### How photos are stored
- Files go into Firebase Storage at `photos/{tripId}/{date}_{timestamp}_{filename}`
- A Firestore document is written to `trips/{tripId}/photos/{autoId}` after each successful upload
- `url` and `thumbnailUrl` both point to the Storage download URL (no thumbnail pipeline yet)

### Date tagging priority
1. **EXIF `DateTimeOriginal`** — read client-side via `exifr` before upload; used if present
2. **Today's date** — fallback when no EXIF data is found (NOT the trip day's date)

This means a photo shot on Aug 10 and uploaded on Aug 20 will be tagged `2026-08-10`. A screenshot or HEIC without EXIF will be tagged to the day it was uploaded.

### Upload auth
Photos require Firebase Auth (`signInWithEmailAndPassword`). The upload panel on `day.html` is gated behind a sign-in form; once authenticated, the session persists until sign-out.

### EXIF extraction
Uses `exifr` (CDN: `https://cdn.jsdelivr.net/npm/exifr@7.1.3/dist/lite.esm.js`). The lite build reads `DateTimeOriginal` only, which is sufficient and fast.

### Day page photo grid
`day.html` fetches all photos for the trip via `fetchPhotos()`, filters client-side to `photo.date === date`, and renders a square grid. Clicking opens a lightbox. Photos with broken/expired Storage URLs are silently hidden via `onerror="this.closest('.day-photo-item').style.display='none'"`.

### Gallery sort (photos.html)
Three sort modes, selected via a dropdown in the filter bar:
- **Oldest first** (`date-asc`) — default; matches Firestore `orderBy('date', 'asc')`
- **Newest first** (`date-desc`) — client-side reverse sort on `photo.date`
- **Recently added** (`uploaded-desc`) — client-side sort on `photo.uploadedAt.toMillis()`

---

## CRITICAL: Firestore query pattern

**Always wrap collection references in `query(..., orderBy(...))`.**

```js
// ✅ Works — all helpers in app.js use this pattern
const snap = await getDocs(
  query(collection(db, 'trips', tripId, 'photos'), orderBy('date', 'asc'))
);

// ❌ Hangs indefinitely — the promise never resolves
const snap = await getDocs(collection(db, 'trips', tripId, 'photos'));
```

This affects Firestore's WebChannel transport in Chrome. The bare `collectionRef` form hangs silently — no error, no timeout. Always use `query()` with at least one `orderBy()`. Every helper in `app.js` (`fetchDays`, `fetchRestaurants`, `fetchPhotos`, etc.) already follows this pattern.

---

## app.js shared helpers

Key exports from `assets/app.js`:

```js
fetchTrip(tripId)              // single trip doc
fetchAllTrips()                // all trips, ordered by start date desc
fetchDays(tripId)              // all days for a trip, ordered by date asc
fetchDay(tripId, date)         // single day doc
fetchRestaurants(tripId, city) // restaurants; city optional filter
fetchActivities(tripId, city)  // activities; city optional filter
fetchPhotos(tripId)            // all photos, ordered by date asc
fetchCheckins(tripId, max)     // recent checkins (top-level collection)

renderNav(tripId, tripLabel, activePage)
renderFooter()
renderLoading(msg)
renderEmpty(msg)
escHtml(str)
fmtDate(iso)           // "2026-08-12" → "August 12, 2026"
fmtDateRange(start, end)
cityPill(city, label)
renderCityPills(cities)
```

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

// These collections are admin-only (email/Cloud Function use)
match /participants/{id}   { allow read, write: if false; }
match /emailSentLog/{id}   { allow read, write: if false; }
```

**Resend API key** is stored as a Firebase secret (`firebase functions:secrets:set RESEND_API_KEY`) — never hardcoded in any file.

---

## Known issues / housekeeping

- **Broken Storage URLs**: If a photo Firestore document has an expired or invalid `url`/`thumbnailUrl`, it silently disappears from the day grid (onerror handler hides the tile). To fix, locate the document in the Firebase console under `trips/paris-london-2026/photos`, find the entry with the bad URL, and delete it.
- **Screenshots uploaded as photos**: Screenshots have no EXIF so they get tagged with today's upload date. If uploaded on a day page, they won't appear under the day they were "taken." Delete the Firestore document and re-upload with the correct date set manually if needed.
- **Old Storage files without Firestore docs**: Use `migrate-photos.html` (auth required) to scan Storage and create missing Firestore records. Migrated photos default to `person: "— unknown —"` — edit individual records in the Firestore console to fix attribution.
