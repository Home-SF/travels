#!/usr/bin/env node
/**
 * patch-display-dates.mjs
 * Adds displayDate and isTravel to all asia-2026 day documents in Firestore.
 *
 * Usage:
 *   GOOGLE_APPLICATION_CREDENTIALS=<path/to/key.json> node scripts/patch-display-dates.mjs
 */

import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

if (!getApps().length) {
  initializeApp({ credential: cert(process.env.GOOGLE_APPLICATION_CREDENTIALS) });
}

const db = getFirestore();

const patches = [
  { date: '2026-12-19', displayDate: 'Dec 19', isTravel: true  },
  { date: '2026-12-20', displayDate: 'Dec 20', isTravel: false },
  { date: '2026-12-21', displayDate: 'Dec 21', isTravel: false },
  { date: '2026-12-22', displayDate: 'Dec 22', isTravel: true  },
  { date: '2026-12-23', displayDate: 'Dec 23', isTravel: false },
  { date: '2026-12-24', displayDate: 'Dec 24', isTravel: false },
  { date: '2026-12-25', displayDate: 'Dec 25', isTravel: false },
  { date: '2026-12-26', displayDate: 'Dec 26', isTravel: false },
  { date: '2026-12-27', displayDate: 'Dec 27', isTravel: false },
  { date: '2026-12-28', displayDate: 'Dec 28', isTravel: true  },
  { date: '2026-12-29', displayDate: 'Dec 29', isTravel: false },
  { date: '2026-12-30', displayDate: 'Dec 30', isTravel: false },
  { date: '2026-12-31', displayDate: 'Dec 31', isTravel: false },
  { date: '2027-01-01', displayDate: 'Jan 1',  isTravel: true  },
];

const batch = db.batch();
for (const { date, displayDate, isTravel } of patches) {
  batch.update(db.doc(`trips/asia-2026/days/${date}`), { displayDate, isTravel });
}

await batch.commit();
console.log('Done ✓');
