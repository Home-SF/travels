#!/usr/bin/env node
/**
 * Patch script — adds cityGroups + cityGroupNames to the europe-2025 trip document.
 * This lets trip.html group individual port-city day cards under Italy / Greece / Turkey
 * section headers without changing the day documents themselves.
 * Run from travel-app/ directory: node patch-europe-2025-city-groups.js
 */

const admin = require('firebase-admin');
const serviceAccount = require('/Volumes/MacMiniM4-EXT/mikecylee-m4/Downloads/paris-london-2026-firebase-adminsdk-fbsvc-08d317d7ab.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function patch() {
  const ref = db.collection('trips').doc('europe-2025');

  await ref.update({
    // Maps each port-city id → country group key
    cityGroups: {
      genoa:     'italy',
      livorno:   'italy',
      rome:      'italy',
      sorrento:  'italy',
      santorini: 'greece',
      rhodes:    'greece',
      patmos:    'greece',
      athens:    'greece',
      antalya:   'turkey',
      bodrum:    'turkey',
      // montecarlo stays unmapped → shown as "Monte Carlo" (embarkation day)
    },
    // Display names for each group key
    cityGroupNames: {
      italy:  'Italy',
      greece: 'Greece',
      turkey: 'Turkey',
    },
  });

  console.log('✓ europe-2025 trip doc updated with cityGroups + cityGroupNames');
  process.exit(0);
}

patch().catch(err => {
  console.error('Patch failed:', err);
  process.exit(1);
});