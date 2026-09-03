#!/usr/bin/env node
/**
 * Patch script — consolidates europe-2025 restaurants from city → country groupings
 * italy, greece, turkey (travel stays travel)
 * Run from travel-app/ directory: node patch-europe-2025-country-grouping.js
 */

const admin = require('firebase-admin');
const serviceAccount = require('/Volumes/MacMiniM4-EXT/mikecylee-m4/Downloads/paris-london-2026-firebase-adminsdk-fbsvc-08d317d7ab.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const TRIP_ID = 'europe-2025';

// doc id → { city, num, order }
const patches = [
  // ── ITALY ─────────────────────────────────────────────────────────────────
  // Rome pre-cruise (Aug 2)
  { id: 'rome-001',     city: 'italy', num: 1, order: 1 },
  { id: 'rome-002',     city: 'italy', num: 2, order: 2 },
  // Genoa (Aug 3–4)
  { id: 'genoa-001',    city: 'italy', num: 3, order: 3 },
  { id: 'genoa-002',    city: 'italy', num: 4, order: 4 },
  { id: 'genoa-003',    city: 'italy', num: 5, order: 5 },
  // Livorno (Aug 6)
  { id: 'livorno-001',  city: 'italy', num: 6, order: 6 },
  // Rome cruise stop (Aug 7)
  { id: 'rome-003',     city: 'italy', num: 7, order: 7 },
  // Sorrento (Aug 8)
  { id: 'sorrento-001', city: 'italy', num: 8, order: 8 },
  { id: 'sorrento-002', city: 'italy', num: 9, order: 9 },

  // ── GREECE ────────────────────────────────────────────────────────────────
  // Santorini (Aug 10)
  { id: 'santorini-001', city: 'greece', num: 1, order: 1 },
  { id: 'santorini-002', city: 'greece', num: 2, order: 2 },
  // Rhodes (Aug 11)
  { id: 'rhodes-001',    city: 'greece', num: 3, order: 3 },
  { id: 'rhodes-002',    city: 'greece', num: 4, order: 4 },
  // Patmos (Aug 14)
  { id: 'patmos-001',    city: 'greece', num: 5, order: 5 },
  // Athens (Aug 15–16)
  { id: 'athens-001',    city: 'greece', num: 6, order: 6 },
  { id: 'athens-002',    city: 'greece', num: 7, order: 7 },
  { id: 'athens-003',    city: 'greece', num: 8, order: 8 },
  { id: 'athens-004',    city: 'greece', num: 9, order: 9 },

  // ── TURKEY ────────────────────────────────────────────────────────────────
  // Antalya (Aug 12)
  { id: 'antalya-001',   city: 'turkey', num: 1, order: 1 },
  { id: 'antalya-002',   city: 'turkey', num: 2, order: 2 },
  // Bodrum (Aug 13)
  { id: 'bodrum-001',    city: 'turkey', num: 3, order: 3 },
  { id: 'bodrum-002',    city: 'turkey', num: 4, order: 4 },

  // ── TRAVEL (at sea) — city stays 'travel' ─────────────────────────────────
  // atsea-001 unchanged
];

async function patch() {
  console.log(`\nConsolidating europe-2025 restaurants to country groupings...\n`);
  const batch = db.batch();

  for (const { id, city, num, order } of patches) {
    const ref = db.collection('trips').doc(TRIP_ID).collection('restaurants').doc(id);
    batch.update(ref, { city, num, order });
    console.log(`  ✓ ${id} → ${city} #${num}`);
  }

  await batch.commit();
  console.log(`\nDone! ${patches.length} restaurants regrouped.\n`);
  process.exit(0);
}

patch().catch(err => {
  console.error('Patch failed:', err);
  process.exit(1);
});