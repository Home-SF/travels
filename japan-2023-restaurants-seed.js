#!/usr/bin/env node
/**
 * Seed script for japan-2023 restaurants
 * Run from travel-app/ directory:
 *   node japan-2023-restaurants-seed.js
 */

const admin = require('firebase-admin');
const serviceAccount = require('/Volumes/MacMiniM4-EXT/mikecylee-m4/Downloads/paris-london-2026-firebase-adminsdk-fbsvc-08d317d7ab.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const TRIP_ID = 'japan-2023';

const restaurants = [
  // ── TOKYO ────────────────────────────────────────────────────────────────
  {
    id: 'tokyo-001',
    num: 1,
    name: 'Otako Honten',
    city: 'tokyo',
    address: 'Shinjuku, Tokyo',
    neighborhood: 'Shinjuku',
    reservationDate: '2023-04-06',
    visitNote: 'Dinner · Apr 6 · Traditional oden',
    reserved: false,
    cancelled: false,
    muted: ['Historic oden counter · Shinjuku institution'],
    links: {
      maps: 'https://www.google.com/maps/search/?api=1&query=Otako+Honten+Shinjuku+Tokyo',
    },
    order: 1,
  },
  {
    id: 'tokyo-002',
    num: 2,
    name: 'Akanezaka Onuma',
    city: 'tokyo',
    address: 'Minato City, Tokyo',
    neighborhood: 'Akasaka',
    reservationDate: '2023-04-08',
    visitNote: 'Lunch · Apr 8 · ⭐ Michelin',
    reserved: true,
    cancelled: false,
    muted: ['Michelin 1 star'],
    links: {
      maps: 'https://www.google.com/maps/search/?api=1&query=Akanezaka+Onuma+Tokyo',
    },
    order: 2,
  },
  {
    id: 'tokyo-003',
    num: 3,
    name: 'Daigo RAN Kaiseki',
    city: 'tokyo',
    address: '2-3-1 Atago, Minato City, Tokyo 105-0002',
    neighborhood: 'Atago',
    reservationDate: '2023-04-15',
    visitNote: 'Dinner · Apr 15 · Party of 7 · ⭐⭐ Michelin',
    reserved: true,
    cancelled: false,
    muted: ['Michelin 2 stars · Shojin ryori (Buddhist vegetarian kaiseki)'],
    links: {
      maps: 'https://www.google.com/maps/search/?api=1&query=Daigo+RAN+Kaiseki+Atago+Minato+Tokyo',
    },
    order: 3,
  },
  {
    id: 'tokyo-004',
    num: 4,
    name: 'Akiba Fukurou Owl Café',
    city: 'tokyo',
    address: '67 Kanda Neribeicho, Chiyoda-ku, Tokyo',
    neighborhood: 'Akihabara',
    reservationDate: '2023-04-16',
    visitNote: 'Apr 16 · Reservation for 3',
    reserved: true,
    cancelled: false,
    muted: ['Owl café experience in Akihabara'],
    links: {
      maps: 'https://www.google.com/maps/search/?api=1&query=Akiba+Fukurou+Owl+Cafe+Kanda+Neribeicho+Chiyoda+Tokyo',
    },
    order: 4,
  },

  // ── KYOTO ────────────────────────────────────────────────────────────────
  {
    id: 'kyoto-001',
    num: 1,
    name: 'Kushi Tanaka',
    city: 'kyoto',
    address: 'Kyoto',
    neighborhood: 'Kyoto',
    reservationDate: '2023-04-09',
    visitNote: 'Dinner · Apr 9 · Michelin Bib Gourmand',
    reserved: false,
    cancelled: false,
    muted: ['Bib Gourmand yakitori'],
    links: {
      maps: 'https://www.google.com/maps/search/?api=1&query=Kushi+Tanaka+yakitori+Kyoto',
    },
    order: 1,
  },
  {
    id: 'kyoto-002',
    num: 2,
    name: 'Muromachi Wakuden',
    city: 'kyoto',
    address: 'Muromachi, Kyoto',
    neighborhood: 'Nishiki',
    reservationDate: '2023-04-10',
    visitNote: 'Lunch · Apr 10 · Private room · ¥22,000 pp · ⭐ Michelin',
    reserved: true,
    cancelled: false,
    muted: ['Michelin 1 star · Traditional kaiseki · Private tatami room'],
    links: {
      maps: 'https://www.google.com/maps/search/?api=1&query=Muromachi+Wakuden+Kyoto',
    },
    order: 2,
  },
  {
    id: 'kyoto-003',
    num: 3,
    name: 'Hyotei',
    city: 'kyoto',
    address: '35 Kusagawacho, Sakyo Ward, Kyoto 606-8436',
    neighborhood: 'Nanzenji',
    reservationDate: '2023-04-11',
    visitNote: 'Dinner · Apr 11 · Party of 7 · ⭐⭐⭐ Michelin',
    reserved: true,
    cancelled: false,
    muted: ['Michelin 3 stars · 450+ year history · Nanzenji · Kaiseki ryori'],
    links: {
      website: 'https://hyotei.co.jp/en/',
      maps: 'https://www.google.com/maps/search/?api=1&query=Hyotei+Nanzenji+Kyoto',
    },
    order: 3,
  },
  {
    id: 'kyoto-004',
    num: 4,
    name: 'Tan Restaurant',
    city: 'kyoto',
    address: 'Kyoto',
    neighborhood: 'Kyoto',
    reservationDate: '2023-04-12',
    visitNote: 'Lunch · Apr 12 · Wakuden group farewell',
    reserved: true,
    cancelled: false,
    muted: ['Part of the Wakuden restaurant group'],
    links: {
      maps: 'https://www.google.com/maps/search/?api=1&query=Tan+Restaurant+Wakuden+Kyoto',
    },
    order: 4,
  },

  // ── NAGANO ───────────────────────────────────────────────────────────────
  {
    id: 'nagano-001',
    num: 1,
    name: 'Ogawa No Sho',
    city: 'nagano',
    address: 'Nagano Prefecture',
    neighborhood: 'Nozawa Onsen area',
    reservationDate: '2023-04-13',
    visitNote: 'Lunch · Apr 13 · Traditional farmhouse',
    reserved: false,
    cancelled: false,
    muted: ['Oyaki (traditional stuffed dumplings) · Farmhouse experience'],
    links: {
      maps: 'https://www.google.com/maps/search/?api=1&query=Ogawa+No+Sho+Nagano',
    },
    order: 1,
  },
  {
    id: 'nagano-002',
    num: 2,
    name: 'Chousenkaku Kameya',
    city: 'nagano',
    address: 'Nagano Prefecture',
    neighborhood: 'Nozawa Onsen',
    reservationDate: '2023-04-13',
    visitNote: 'Ryokan kaiseki · Apr 13–14 · Shinshu cuisine',
    reserved: true,
    cancelled: false,
    muted: ['Multi-course kaiseki dinners at the ryokan · Local Nagano ingredients'],
    links: {
      maps: 'https://www.google.com/maps/search/?api=1&query=Chousenkaku+Kameya+ryokan+Nagano',
    },
    order: 2,
  },
];

async function seed() {
  console.log(`Seeding restaurants for trip: ${TRIP_ID}`);
  const batch = db.batch();

  for (const r of restaurants) {
    const { id, ...data } = r;
    const ref = db.collection('trips').doc(TRIP_ID).collection('restaurants').doc(id);
    batch.set(ref, data);
  }

  await batch.commit();
  console.log(`✓ ${restaurants.length} restaurant documents written`);
  console.log(`Done! Visit travels.luckycommons.com/restaurants.html?trip=${TRIP_ID}`);
  process.exit(0);
}

seed().catch(err => {
  console.error('Seed failed:', err);
  process.exit(1);
});