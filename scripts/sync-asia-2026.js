#!/usr/bin/env node
/**
 * sync-asia-2026.js
 * Seeds the asia-2026 trip into Firestore.
 *
 * Usage:
 *   GOOGLE_APPLICATION_CREDENTIALS=<path/to/key.json> node scripts/sync-asia-2026.js
 *
 * Run from the repo root. Safe to re-run — fully overwrites existing docs.
 */

import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

if (!getApps().length) {
  const cred = process.env.GOOGLE_APPLICATION_CREDENTIALS
    ? cert(process.env.GOOGLE_APPLICATION_CREDENTIALS)
    : undefined;
  initializeApp(cred ? { credential: cred } : {});
}

const db = getFirestore();
const TRIP_ID = 'asia-2026';

const tripDoc = {
  title: 'Tokyo · KL · Singapore',
  dates: { start: '2026-12-19', end: '2027-01-01' },
  cities: [
    { id: 'tokyo',       name: 'Tokyo' },
    { id: 'kualalumpur', name: 'Kuala Lumpur' },
    { id: 'singapore',   name: 'Singapore' },
  ],
  travelers: ['Michael Lee', 'Uwen Kok', 'Carl Kurbat'],
  status: 'planning',
};

const days = [
  {
    date: '2026-12-19', displayDate: 'Dec 19', weekday: 'Saturday', city: 'travel', isTravel: true,
    kicker: 'Departure day',
    events: [
      { time: '16:45', title: 'Flight ZG 025 SFO → NRT', note: 'Seats 5K / 5D / 5G — departs 4:45 PM' },
    ],
  },
  {
    date: '2026-12-20', displayDate: 'Dec 20', weekday: 'Sunday', city: 'tokyo', isTravel: false,
    kicker: 'Arrival in Tokyo',
    events: [
      { time: '20:00', title: 'Land NRT', note: 'Arrives 8:00 PM' },
      { time: '',      title: 'Check in — Hotel TBD', note: '' },
    ],
  },
  {
    date: '2026-12-21', displayDate: 'Dec 21', weekday: 'Monday', city: 'tokyo', isTravel: false,
    kicker: 'Day 1 in Tokyo',
    events: [],
  },
  {
    date: '2026-12-22', displayDate: 'Dec 22', weekday: 'Tuesday', city: 'travel', isTravel: true,
    kicker: 'Travel day — overnight to KL',
    events: [
      { time: '00:05', title: 'Flight NH 885 HND → KUL', note: 'Departs 12:05 AM · Seats 4A / 4D / 4C · Boeing 787-8' },
    ],
  },
  {
    date: '2026-12-23', displayDate: 'Dec 23', weekday: 'Wednesday', city: 'kualalumpur', isTravel: false,
    kicker: 'KL arrival',
    events: [
      { time: '06:45', title: 'Arrive KLIA', note: 'Arrives 6:45 AM MYT' },
    ],
  },
  {
    date: '2026-12-24', displayDate: 'Dec 24', weekday: 'Thursday', city: 'kualalumpur', isTravel: false,
    kicker: 'Day 2 in KL',
    events: [],
  },
  {
    date: '2026-12-25', displayDate: 'Dec 25', weekday: 'Friday', city: 'kualalumpur', isTravel: false,
    kicker: 'Day 3 in KL · Christmas Day',
    events: [],
  },
  {
    date: '2026-12-26', displayDate: 'Dec 26', weekday: 'Saturday', city: 'kualalumpur', isTravel: false,
    kicker: 'Day 4 in KL',
    events: [],
  },
  {
    date: '2026-12-27', displayDate: 'Dec 27', weekday: 'Sunday', city: 'kualalumpur', isTravel: false,
    kicker: 'Day 5 in KL',
    events: [],
  },
  {
    date: '2026-12-28', displayDate: 'Dec 28', weekday: 'Monday', city: 'travel', isTravel: true,
    kicker: 'Travel day',
    events: [
      { time: '', title: 'Flight KUL → SIN — TBD (not yet booked)', note: '' },
    ],
  },
  {
    date: '2026-12-29', displayDate: 'Dec 29', weekday: 'Tuesday', city: 'singapore', isTravel: false,
    kicker: 'Day 1 in Singapore',
    events: [],
  },
  {
    date: '2026-12-30', displayDate: 'Dec 30', weekday: 'Wednesday', city: 'singapore', isTravel: false,
    kicker: 'Day 2 in Singapore',
    events: [],
  },
  {
    date: '2026-12-31', displayDate: 'Dec 31', weekday: 'Thursday', city: 'singapore', isTravel: false,
    kicker: "Day 3 in Singapore · New Year's Eve",
    events: [],
  },
  {
    date: '2027-01-01', displayDate: 'Jan 1', weekday: 'Friday', city: 'travel', isTravel: true,
    kicker: 'Return day',
    events: [
      { time: '', title: 'Flight SIN → SFO — TBD (not yet booked)', note: '' },
    ],
  },
];

async function main() {
  console.log(`Writing trips/${TRIP_ID} ...`);
  await db.doc(`trips/${TRIP_ID}`).set(tripDoc);

  const batch = db.batch();
  for (const day of days) {
    batch.set(db.doc(`trips/${TRIP_ID}/days/${day.date}`), day);
  }

  console.log(`Writing ${days.length} day documents ...`);
  await batch.commit();

  console.log('Done ✓');
  process.exit(0);
}

main().catch(err => { console.error(err); process.exit(1); });
