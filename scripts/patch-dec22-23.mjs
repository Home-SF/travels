#!/usr/bin/env node
/**
 * patch-dec22-23.mjs
 * Dec 22 → regular Tokyo day (NH 885 departs just after midnight INTO Dec 23 JST)
 * Dec 23 → shows departure 00:05 JST and arrival 06:45 MYT
 *
 * Usage:
 *   GOOGLE_APPLICATION_CREDENTIALS=<path/to/key.json> node scripts/patch-dec22-23.mjs
 */

import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

if (!getApps().length) {
  initializeApp({ credential: cert(process.env.GOOGLE_APPLICATION_CREDENTIALS) });
}

const db = getFirestore();

// Dec 22 — last full day in Tokyo (airport late night, but date is still Dec 22)
await db.doc('trips/asia-2026/days/2026-12-22').set({
  date: '2026-12-22',
  displayDate: 'Dec 22',
  weekday: 'Tuesday',
  city: 'tokyo',
  isTravel: false,
  kicker: 'Day 2 in Tokyo',
  events: [],
}, { merge: false });

// Dec 23 — depart HND at 00:05 JST (just after midnight), arrive KLIA 06:45 MYT
await db.doc('trips/asia-2026/days/2026-12-23').set({
  date: '2026-12-23',
  displayDate: 'Dec 23',
  weekday: 'Wednesday',
  city: 'kualalumpur',
  isTravel: false,
  kicker: 'KL arrival',
  events: [
    { time: '00:05', tz: 'JST', title: 'Flight NH 885 HND → KLIA', note: 'Seats 4A / 4D / 4C · Boeing 787-8 · 7h 40m' },
    { time: '06:45', tz: 'MYT', title: 'Arrive KLIA', note: 'Kuala Lumpur International Airport' },
  ],
}, { merge: false });

console.log('Done ✓');
