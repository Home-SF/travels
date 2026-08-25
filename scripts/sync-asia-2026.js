#!/usr/bin/env node
/**
 * sync-asia-2026.js
 * Seeds the asia-2026 trip into Firestore.
 *
 * Usage:
 *   GOOGLE_APPLICATION_CREDENTIALS=./serviceAccount.json node scripts/sync-asia-2026.js
 *
 * Or with Firebase Admin already initialised via ADC / emulator:
 *   node scripts/sync-asia-2026.js
 *
 * Run from the repo root. Safe to re-run — uses set() with merge:false,
 * so it fully overwrites existing docs each time.
 */

import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// ── Init ────────────────────────────────────────────────────────────────────

if (!getApps().length) {
  const cred = process.env.GOOGLE_APPLICATION_CREDENTIALS
    ? cert(process.env.GOOGLE_APPLICATION_CREDENTIALS)
    : undefined; // uses ADC when undefined
  initializeApp(cred ? { credential: cred } : {});
}

const db = getFirestore();
const TRIP_ID = 'asia-2026';

// ── Trip document ────────────────────────────────────────────────────────────

const tripDoc = {
  title: 'Tokyo · KL · Singapore',
  dates: { start: '2026-12-19', end: '2027-01-01' },
  cities: [
    { id: 'tokyo',        name: 'Tokyo' },
    { id: 'kualalumpur',  name: 'Kuala Lumpur' },
    { id: 'singapore',    name: 'Singapore' },
  ],
  travelers: ['Michael Lee', 'Uwen Kok', 'Carl Kurbat'],
  status: 'planning',
};

// ── Day documents ────────────────────────────────────────────────────────────

const days = [
  {
    date: '2026-12-19',
    weekday: 'Saturday',
    city: 'travel',
    kicker: 'Departure day',
    events: [
      { time: '16:45', title: 'Flight ZG 025 SFO → NRT', note: 'Seats 5K / 5D / 5G — departs 4:45 PM' },
    ],
  },
  {
    date: '2026-12-20',
    weekday: 'Sunday',
    city: 'tokyo',
    kicker: 'Arrival in Tokyo',
    events: [
      { time: '20:00', title: 'Land NRT', note: 'Arrives 8:00 PM' },
      { time: '',      title: 'Check in — Hotel TBD', note: '' },
    ],
  },
  {
    date: '2026-12-21',
    weekday: 'Monday',
    city: 'tokyo',
    kicker: 'Day 1 in Tokyo',
    events: [],
  },
  {
    date: '2026-12-22',
    weekday: 'Tuesday',
    city: 'travel',
    kicker: 'Travel day',
    events: [
      { time: '', title: 'Flight HND → KUL — TBD (not yet booked)', note: '' },
    ],
  },
  {
    date: '2026-12-23',
    weekday: 'Wednesday',
    city: 'kualalumpur',
    kicker: 'KL arrival',
    events: [
      { time: '14:30', title: 'Flight NH 885 HND → KLIA', note: 'Departs 2:30 PM JST · Seats 4A / 4D / 4C' },
      { time: '22:00', title: 'Arrive KLIA', note: 'Arrives 10:00 PM MYT' },
    ],
  },
  {
    date: '2026-12-24',
    weekday: 'Thursday',
    city: 'kualalumpur',
    kicker: 'Day 2 in KL',
    events: [],
  },
  {
    date: '2026-12-25',
    weekday: 'Friday',
    city: 'kualalumpur',
    kicker: 'Day 3 in KL · Christmas Day',
    events: [],
  },
  {
    date: '2026-12-26',
    weekday: 'Saturday',
    city: 'kualalumpur',
    kicker: 'Day 4 in KL',
    events: [],
  },
  {
    date: '2026-12-27',
    weekday: 'Sunday',
    city: 'kualalumpur',
    kicker: 'Day 5 in KL',
    events: [],
  },
  {
    date: '2026-12-28',
    weekday: 'Monday',
    city: 'travel',
    kicker: 'Travel day',
    events: [
      { time: '', title: 'Flight KUL → SIN — TBD (not yet booked)', note: '' },
    ],
  },
  {
    date: '2026-12-29',
    weekday: 'Tuesday',
    city: 'singapore',
    kicker: 'Day 1 in Singapore',
    events: [],
  },
  {
    date: '2026-12-30',
    weekday: 'Wednesday',
    city: 'singapore',
    kicker: 'Day 2 in Singapore',
    events: [],
  },
  {
    date: '2026-12-31',
    weekday: 'Thursday',
    city: 'singapore',
    kicker: "Day 3 in Singapore · New Year's Eve",
    events: [],
  },
  {
    date: '2027-01-01',
    weekday: 'Friday',
    city: 'travel',
    kicker: 'Return day',
    events: [
      { time: '', title: 'Flight SIN → SFO — TBD (not yet booked)', note: '' },
    ],
  },
];

// ── Write ────────────────────────────────────────────────────────────────────

async function main() {
  const tripRef = db.doc(`trips/${TRIP_ID}`);

  console.log(`Writing trips/${TRIP_ID} ...`);
  await tripRef.set(tripDoc);

  const batch = db.batch();
  for (const day of days) {
    const ref = db.doc(`trips/${TRIP_ID}/days/${day.date}`);
    batch.set(ref, day);
  }

  console.log(`Writing ${days.length} day documents ...`);
  await batch.commit();

  console.log('Done ✓');
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
