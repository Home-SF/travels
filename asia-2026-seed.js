#!/usr/bin/env node
/**
 * Seed script for asia-2026 — seeds trip, days, activities, and restaurants
 * into Firestore so both the website and iOS app can read it.
 *
 * Run from the travel-app/ directory:
 *   node asia-2026-seed.js
 *
 * Requires the Firebase Admin SDK service account key at the path below.
 */

const admin = require('firebase-admin');
const serviceAccount = require('/Volumes/MacMiniM4-EXT/mikecylee-m4/Downloads/paris-london-2026-firebase-adminsdk-fbsvc-08d317d7ab.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const TRIP_ID = 'asia-2026';

// ── Trip document ────────────────────────────────────────────────────────────

const trip = {
  title:     'Tokyo & KL & Singapore',
  subtitle:  'Two weeks, three cities, one small crew.',
  dates:     { start: '2026-12-19', end: '2027-01-01' },
  startDate: '2026-12-19',
  year:      2026,
  coverCity: 'tokyo',
  travelers: [
    { name: 'Michael Lee' },
    { name: 'Uwen Kok' },
    { name: 'Carl Kurbat' },
  ],
  route: [
    { code: 'SFO', city: 'San Francisco', date: 'Dec 19' },
    { code: 'NRT', city: 'Tokyo',         date: 'Dec 20' },
    { code: 'KUL', city: 'Kuala Lumpur',  date: 'Dec 22' },
    { code: 'SIN', city: 'Singapore',     date: 'Dec 29' },
    { code: 'SFO', city: 'San Francisco', date: 'Jan 1'  },
  ],
  cities: [
    {
      slug:    'tokyo',
      name:    'Tokyo',
      arrival: 'Dec 20',
      hotel:   'Hotel TBD',
    },
    {
      slug:    'kualalumpur',
      name:    'Kuala Lumpur',
      arrival: 'Dec 22',
      hotel:   'Hotel TBD',
    },
    {
      slug:    'singapore',
      name:    'Singapore',
      arrival: 'Dec 29',
      hotel:   'Grand Mercure Singapore Roxy',
      hotelAddress: '50 East Coast Road, Roxy Square, Singapore 428769',
      lat:     1.3021,
      lon:     103.9073,
    },
  ],
  status: 'upcoming',
};

// ── Days ─────────────────────────────────────────────────────────────────────

const days = [
  {
    date: '2026-12-19', label: 'December 19', weekday: 'Saturday',
    dayNum: 1, city: 'tokyo', title: 'Departure day',
    events: [], prevDate: null, nextDate: '2026-12-20',
  },
  {
    date: '2026-12-20', label: 'December 20', weekday: 'Sunday',
    dayNum: 2, city: 'tokyo', title: 'Arrival in Tokyo',
    events: [], prevDate: '2026-12-19', nextDate: '2026-12-21',
  },
  {
    date: '2026-12-21', label: 'December 21', weekday: 'Monday',
    dayNum: 3, city: 'tokyo', title: 'Day 2 in Tokyo',
    events: [], prevDate: '2026-12-20', nextDate: '2026-12-22',
  },
  {
    date: '2026-12-22', label: 'December 22', weekday: 'Tuesday',
    dayNum: 4, city: 'kualalumpur', title: 'Travel day — Tokyo to Kuala Lumpur',
    events: [], prevDate: '2026-12-21', nextDate: '2026-12-23',
  },
  {
    date: '2026-12-23', label: 'December 23', weekday: 'Wednesday',
    dayNum: 5, city: 'kualalumpur', title: 'Day 2 in Kuala Lumpur',
    events: [], prevDate: '2026-12-22', nextDate: '2026-12-24',
  },
  {
    date: '2026-12-24', label: 'December 24', weekday: 'Thursday',
    dayNum: 6, city: 'kualalumpur', title: 'Day 3 in Kuala Lumpur',
    holiday: 'Christmas Eve',
    events: [], prevDate: '2026-12-23', nextDate: '2026-12-25',
  },
  {
    date: '2026-12-25', label: 'December 25', weekday: 'Friday',
    dayNum: 7, city: 'kualalumpur', title: 'Day 4 in Kuala Lumpur',
    holiday: 'Christmas Day — some shops and services may have reduced hours.',
    events: [], prevDate: '2026-12-24', nextDate: '2026-12-26',
  },
  {
    date: '2026-12-26', label: 'December 26', weekday: 'Saturday',
    dayNum: 8, city: 'kualalumpur', title: 'Day 5 in Kuala Lumpur',
    events: [], prevDate: '2026-12-25', nextDate: '2026-12-27',
  },
  {
    date: '2026-12-27', label: 'December 27', weekday: 'Sunday',
    dayNum: 9, city: 'kualalumpur', title: 'Day 6 in Kuala Lumpur',
    events: [], prevDate: '2026-12-26', nextDate: '2026-12-28',
  },
  {
    date: '2026-12-28', label: 'December 28', weekday: 'Monday',
    dayNum: 10, city: 'kualalumpur', title: 'Day 7 in Kuala Lumpur',
    events: [], prevDate: '2026-12-27', nextDate: '2026-12-29',
  },
  {
    date: '2026-12-29', label: 'December 29', weekday: 'Tuesday',
    dayNum: 11, city: 'singapore', title: 'Travel day — Kuala Lumpur to Singapore',
    hotel: 'Grand Mercure Singapore Roxy',
    events: [
      {
        time: '—',
        title: 'Check in — Grand Mercure Singapore Roxy',
        note: '3 nights · Check-out 1 Jan 2027',
        address: '50 East Coast Road, Roxy Square, Singapore 428769',
      },
    ],
    prevDate: '2026-12-28', nextDate: '2026-12-30',
  },
  {
    date: '2026-12-30', label: 'December 30', weekday: 'Wednesday',
    dayNum: 12, city: 'singapore', title: 'Day 2 in Singapore',
    hotel: 'Grand Mercure Singapore Roxy',
    events: [], prevDate: '2026-12-29', nextDate: '2026-12-31',
  },
  {
    date: '2026-12-31', label: 'December 31', weekday: 'Thursday',
    dayNum: 13, city: 'singapore', title: "New Year's Eve in Singapore",
    hotel: 'Grand Mercure Singapore Roxy',
    holiday: "New Year's Eve — Singapore's Marina Bay countdown is one of the largest in the world.",
    events: [], prevDate: '2026-12-30', nextDate: '2027-01-01',
  },
  {
    date: '2027-01-01', label: 'January 1', weekday: 'Friday',
    dayNum: 14, city: 'singapore', title: 'Return day',
    holiday: "New Year's Day",
    events: [
      {
        time: '—',
        title: 'Check out — Grand Mercure Singapore Roxy',
        address: '50 East Coast Road, Roxy Square, Singapore 428769',
      },
    ],
    prevDate: '2026-12-31', nextDate: null,
  },
];

// ── Activities ───────────────────────────────────────────────────────────────

const activities = [
  {
    id:           'singapore-001',
    city:         'singapore',
    name:         'Grand Mercure Singapore Roxy',
    address:      '50 East Coast Road, Roxy Square, Singapore 428769',
    hours:        'Check-in: 29 Dec 2026 · Check-out: 1 Jan 2027',
    fee:          '',
    facts: [
      { label: 'Stay',     text: '3 nights · 29 Dec 2026 – 1 Jan 2027 · Reservation confirmed' },
      { label: 'Contact',  text: '+65 6344 8000 · H3610-FO16@accor.com' },
      { label: 'Location', text: 'Roxy Square, Marine Parade — East Coast beachside neighbourhood, 5 min walk to East Coast Park' },
    ],
    website:      'https://all.accor.com/hotel/3610/index.en.shtml',
    planned:      true,
    lat:          1.3021,
    lon:          103.9073,
    neighborhood: 'Marine Parade, Singapore',
  },
];

// ── Seed function ────────────────────────────────────────────────────────────

async function seed() {
  console.log(`\nSeeding ${TRIP_ID} to Firestore...\n`);

  // Trip document
  await db.collection('trips').doc(TRIP_ID).set(trip);
  console.log('✓ Trip document written');

  // Days subcollection
  const batch1 = db.batch();
  for (const day of days) {
    const ref = db.collection('trips').doc(TRIP_ID).collection('days').doc(day.date);
    batch1.set(ref, day);
  }
  await batch1.commit();
  console.log(`✓ ${days.length} days written`);

  // Activities subcollection
  const batch2 = db.batch();
  for (const act of activities) {
    const ref = db.collection('trips').doc(TRIP_ID).collection('activities').doc(act.id);
    batch2.set(ref, act);
  }
  await batch2.commit();
  console.log(`✓ ${activities.length} activities written`);

  // Restaurants (empty for now — placeholder)
  const restaurantsRef = db.collection('trips').doc(TRIP_ID).collection('restaurants').doc('_placeholder');
  await restaurantsRef.set({ _placeholder: true });
  console.log('✓ Restaurants placeholder written (populate later)');

  console.log('\n✅ asia-2026 seed complete!\n');
  process.exit(0);
}

seed().catch(err => {
  console.error('Seed failed:', err);
  process.exit(1);
});
