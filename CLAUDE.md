# Travel App — Claude/AI Working Notes

## What this repo is
A multi-trip travel website (`travels.luckycommons.com`) + iOS app. All data lives in **Firestore** (`paris-london-2026` Firebase project) — the website and iOS app both read from the same collections.

## Website stack
**Next.js 16, App Router, `output: 'export'`** → static files in `out/` → deployed to Firebase Hosting.

### Build & deploy
```bash
rm -rf .next && npm run build && firebase deploy --only hosting
```
Always `rm -rf .next` first — stale turbopack cache causes ENOTEMPTY errors.

### Key files
- `src/lib/firestore.ts` — all Firestore fetch functions; has session-level cache + in-flight deduplication
- `src/lib/firebase.ts` — Firebase app init (client SDK)
- `src/lib/cityColors.ts` — hardcoded city color map (colors are NOT in Firestore)
- `src/config/trips-config.json` — trip slugs + city slugs used by generateStaticParams at build time
- `src/app/globals.css` — CSS city color variables + `.tag.{city}` classes

### Page pattern (all dynamic routes)
Server `page.tsx` exports `generateStaticParams()` (reads trips-config.json) and renders a `'use client'` component. The client component calls `useParams()` then fetches from Firestore in `useEffect`.

### Day page note
`src/app/trips/[tripSlug]/days/[date]/page.tsx` fetches ALL real day dates from Firestore at build time in `generateStaticParams()`. This is required — without it, client-side navigation to day URLs fails because Next.js can't find the RSC payload.

## Firestore collections
```
trips/{tripId}                    — trip document
trips/{tripId}/days/{YYYY-MM-DD}  — one doc per day
trips/{tripId}/restaurants/{id}   — restaurants
trips/{tripId}/activities/{id}    — sights/activities
photos/{photoId}                  — trip photos (cross-trip)
checkins/{id}                     — live check-ins
```

## Day schema: old vs new trips
Old trips (japan-2023, europe-2025, etc.): `displayDate`, `kicker`, `isTravel` fields.
New trips (asia-2026 onward): `label`, `title`, `dayNum` fields.
`normalizeDay()` in firestore.ts maps both to the TypeScript `Day` type.

## dates field on Trip documents
Old trips: `dates: { start: 'YYYY-MM-DD', end: 'YYYY-MM-DD' }` (object)
New trips: `dates: 'Dec 19, 2026 – Jan 1, 2027'` (string)
`normalizeTrip()` handles both — DO NOT use `raw.dates ?? ''` (object is truthy).
Use: `typeof raw.dates === 'string' ? raw.dates : ''`

## Adding a new trip
1. Run a seed script (use `asia-2026-seed.js` as template)
2. Add to `src/config/trips-config.json`
3. Add city colors to `src/lib/cityColors.ts`
4. Add CSS vars + `.tag.{city}` to `src/app/globals.css`
5. Rebuild and deploy

## Firebase project
- Project ID: `paris-london-2026`
- Service account key: `/Volumes/MacMiniM4-EXT/mikecylee-m4/Downloads/paris-london-2026-firebase-adminsdk-fbsvc-08d317d7ab.json`
- Rules file: `firestore.rules` (deploy with `firebase deploy --only firestore:rules`)

## Trips in Firestore
paris-london-2026, asia-2026, europe-2025, italy-2024, japan-2023, thailand-2023, bordeaux-spain-2022
