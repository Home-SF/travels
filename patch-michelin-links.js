#!/usr/bin/env node
/**
 * Patch script — adds michelin links to all Michelin-recognised restaurants
 * across all trips. Safe to re-run (uses update, not set).
 * Run from travel-app/ directory: node patch-michelin-links.js
 */

const admin = require('firebase-admin');
const serviceAccount = require('/Volumes/MacMiniM4-EXT/mikecylee-m4/Downloads/paris-london-2026-firebase-adminsdk-fbsvc-08d317d7ab.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const patches = [
  // ── japan-2023 ─────────────────────────────────────────────────────────────
  {
    trip: 'japan-2023', id: 'tokyo-002',
    michelin: 'https://guide.michelin.com/us/en/tokyo-region/tokyo/restaurant/akanezaka-onuma',
  },
  {
    trip: 'japan-2023', id: 'tokyo-003',
    michelin: 'https://guide.michelin.com/us/en/tokyo-region/tokyo/restaurant/daigo',
  },
  {
    trip: 'japan-2023', id: 'kyoto-001',
    michelin: 'https://guide.michelin.com/us/en/kyoto-region/kyoto/restaurant/kushi-tanaka',
  },
  {
    trip: 'japan-2023', id: 'kyoto-002',
    michelin: 'https://guide.michelin.com/us/en/kyoto-region/kyoto/restaurant/muromachi-wakuden',
  },
  {
    trip: 'japan-2023', id: 'kyoto-003',
    michelin: 'https://guide.michelin.com/us/en/kyoto-region/kyoto/restaurant/hyotei',
  },

  // ── thailand-2023 ──────────────────────────────────────────────────────────
  {
    trip: 'thailand-2023', id: 'bangkok-005',
    michelin: 'https://guide.michelin.com/en/bangkok-region/bangkok/restaurant/samlor',
  },
  {
    trip: 'thailand-2023', id: 'bangkok-006',
    michelin: 'https://guide.michelin.com/us/en/bangkok-region/bangkok/restaurant/samrub-samrub-thai',
  },
  {
    trip: 'thailand-2023', id: 'bangkok-007',
    michelin: 'https://guide.michelin.com/us/en/bangkok-region/bangkok/restaurant/nusara-1192382',
  },
  {
    trip: 'thailand-2023', id: 'bangkok-009',
    michelin: 'https://guide.michelin.com/us/en/bangkok-region/bangkok/restaurant/blue-by-alain-ducasse',
  },

  // ── italy-2024 ─────────────────────────────────────────────────────────────
  {
    trip: 'italy-2024', id: 'rome-010',
    michelin: 'https://guide.michelin.com/us/en/lazio/roma/restaurant/mirabelle-1190136',
  },
  {
    trip: 'italy-2024', id: 'florence-005',
    michelin: 'https://guide.michelin.com/us/en/toscana/firenze/restaurant/la-leggenda-dei-frati',
  },

  // ── bordeaux-spain-2022 ────────────────────────────────────────────────────
  {
    trip: 'bordeaux-spain-2022', id: 'bordeaux-003',
    michelin: 'https://guide.michelin.com/us/en/nouvelle-aquitaine/bordeaux/restaurant/la-tupina',
  },
  {
    trip: 'bordeaux-spain-2022', id: 'bilbao-001',
    michelin: 'https://guide.michelin.com/us/en/pais-vasco/bilbao/restaurant/etxanobe-atelier',
  },
  {
    trip: 'bordeaux-spain-2022', id: 'sansebastian-001',
    michelin: 'https://guide.michelin.com/us/en/pais-vasco/es-donostia-san-sebastian/restaurant/arzak',
  },
  {
    trip: 'bordeaux-spain-2022', id: 'sansebastian-002',
    michelin: 'https://guide.michelin.com/gb/en/pais-vasco/es-donostia-san-sebastian/restaurant/bernardo-etxea',
  },

  // ── europe-2025 ────────────────────────────────────────────────────────────
  {
    trip: 'europe-2025', id: 'livorno-001',
    michelin: 'https://guide.michelin.com/en/toscana/marina-di-bibbona/restaurant/la-pineta',
  },
];

async function patch() {
  console.log(`\nPatching Michelin links across ${new Set(patches.map(p => p.trip)).size} trips...\n`);

  for (const { trip, id, michelin } of patches) {
    const ref = db.collection('trips').doc(trip).collection('restaurants').doc(id);
    await ref.update({ 'links.michelin': michelin });
    console.log(`  ✓ ${trip} / ${id}`);
  }

  console.log(`\nDone! ${patches.length} restaurants updated.\n`);
  process.exit(0);
}

patch().catch(err => {
  console.error('Patch failed:', err);
  process.exit(1);
});