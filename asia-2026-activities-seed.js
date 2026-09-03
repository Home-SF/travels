#!/usr/bin/env node
/**
 * Seed script — asia-2026 activities (initial: Singapore hotel)
 * Run from travel-app/ directory: node asia-2026-activities-seed.js
 */

const admin = require('firebase-admin');
const serviceAccount = require('/Volumes/MacMiniM4-EXT/mikecylee-m4/Downloads/paris-london-2026-firebase-adminsdk-fbsvc-08d317d7ab.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const TRIP_ID = 'asia-2026';

const activities = [

  // ── SINGAPORE ─────────────────────────────────────────────────────────────
  {
    id: 'singapore-001',
    name: 'Grand Mercure Singapore Roxy',
    city: 'singapore',
    num: 1,
    order: 1,
    date: '2026-12-29',
    address: '50 East Coast Road, Roxy Square, Singapore 428769',
    neighborhood: 'Marine Parade, Singapore',
    visitNote: 'Dec 29 – Jan 1 · Hotel stay · Confirmed',
    planned: true,
    facts: [
      'Check-in: 29 Dec 2026 · Check-out: 1 Jan 2027 (3 nights)',
      'Reservation confirmed · Accor / Grand Mercure brand',
      'Contact: +65 6344 8000 · H3610-FO16@accor.com',
      'Located in Roxy Square, Marine Parade — East Coast beachside neighbourhood',
    ],
    links: {
      maps: 'https://www.google.com/maps/search/?api=1&query=Grand+Mercure+Singapore+Roxy+50+East+Coast+Road',
      website: 'https://all.accor.com/hotel/3610/index.en.shtml',
    },
  },

];

async function seed() {
  console.log(`\nSeeding asia-2026 activities (${activities.length} total)...\n`);
  const batch = db.batch();

  for (const { id, ...data } of activities) {
    const ref = db.collection('trips').doc(TRIP_ID).collection('activities').doc(id);
    batch.set(ref, data);
    console.log(`  ✓ ${id}  ${data.city} #${data.num}  ${data.name}`);
  }

  await batch.commit();
  console.log(`\nDone! ${activities.length} activities seeded.\n`);
  process.exit(0);
}

seed().catch(err => {
  console.error('Seed failed:', err);
  process.exit(1);
});
