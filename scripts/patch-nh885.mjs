#!/usr/bin/env node
/**
 * patch-nh885.mjs
 * Fixes the NH 885 flight times in the live asia-2026 Firestore docs.
 *
 * Usage:
 *   GOOGLE_APPLICATION_CREDENTIALS=<path/to/key.json> node scripts/patch-nh885.mjs
 */

import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

if (!getApps().length) {
  initializeApp({ credential: cert(process.env.GOOGLE_APPLICATION_CREDENTIALS) });
}

const db = getFirestore();

// Dec 22: red-eye departs just after midnight
await db.doc('trips/asia-2026/days/2026-12-22').update({
  kicker: 'Travel day — overnight to KL',
  events: [
    { time: '00:05', title: 'Flight NH 885 HND → KUL', note: 'Departs 12:05 AM · Seats 4A / 4D / 4C · Boeing 787-8' },
  ],
});

// Dec 23: arrive KL in the morning
await db.doc('trips/asia-2026/days/2026-12-23').update({
  events: [
    { time: '06:45', title: 'Arrive KLIA', note: 'Arrives 6:45 AM MYT' },
  ],
});

console.log('Done ✓');
