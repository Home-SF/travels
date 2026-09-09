// Travel App Ñ static routing helpers (build-time only)
// All data fetching has moved to src/lib/firestore.ts (client-side).
// This file only provides route enumeration for generateStaticParams()
// by reading the trips-config.json manifest.
export { staticTripSlugs as tripSlugs, staticCitySlugs as citySlugs } from '@/lib/firestore';
