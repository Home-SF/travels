#!/usr/bin/env node
/**
 * Seed script for europe-2025 restaurants
 * Run from travel-app/ directory:
 *   node europe-2025-restaurants-seed.js
 */

const admin = require('firebase-admin');
const serviceAccount = require('/Volumes/MacMiniM4-EXT/mikecylee-m4/Downloads/paris-london-2026-firebase-adminsdk-fbsvc-08d317d7ab.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const TRIP_ID = 'europe-2025';

const restaurants = [
  // ── ROME (pre-cruise, Aug 2) ──────────────────────────────────────────────
  {
    id: 'rome-001',
    num: 1,
    name: "Hosteria Grappolo d'oro",
    city: 'rome',
    address: 'Near Piazza Navona, Rome',
    neighborhood: 'Piazza Navona',
    reservationDate: '2025-08-02',
    visitNote: 'Lunch · Aug 2 · Mike, Uwen, Carl',
    reserved: false,
    cancelled: false,
    muted: ['Pre-cruise layover lunch in Rome'],
    links: {
      maps: "https://www.google.com/maps/search/?api=1&query=Hosteria+Grappolo+d'oro+Piazza+Navona+Rome",
    },
    order: 1,
  },
  {
    id: 'rome-002',
    num: 2,
    name: 'Come Il Latte',
    city: 'rome',
    address: 'Via Silvio Spaventa 24-26, 00187 Roma',
    neighborhood: 'Rome',
    reservationDate: '2025-08-02',
    visitNote: 'Ice cream · Aug 2 · Mike, Uwen, Carl',
    reserved: false,
    cancelled: false,
    muted: ['Artisan gelateria'],
    links: {
      maps: 'https://www.google.com/maps/search/?api=1&query=Come+Il+Latte+gelato+Rome',
    },
    order: 2,
  },

  // ── GENOA ─────────────────────────────────────────────────────────────────
  {
    id: 'genoa-001',
    num: 1,
    name: 'Trattoria Rosmarino',
    city: 'genoa',
    address: 'Genoa',
    neighborhood: 'Genoa',
    reservationDate: '2025-08-03',
    visitNote: 'Dinner · Aug 3 · 9 people · outdoor seating · classic Ligurian dishes',
    reserved: true,
    cancelled: false,
    muted: ['Classic Ligurian cuisine'],
    links: {
      maps: 'https://www.google.com/maps/search/?api=1&query=Trattoria+Rosmarino+Genoa',
    },
    order: 1,
  },
  {
    id: 'genoa-002',
    num: 2,
    name: 'Genoa Culinary Masterclass — Do Eat Better',
    city: 'genoa',
    address: 'Columbus childhood home, Genoa',
    neighborhood: 'Genoa',
    reservationDate: '2025-08-04',
    visitNote: 'Cooking class · Aug 4 · 09:15 · 9 people · gnocchi, focaccia, Canestrelli biscuits',
    reserved: true,
    cancelled: false,
    muted: ['Meet at Columbus childhood home · hands-on Genoese cooking class'],
    links: {
      maps: 'https://www.google.com/maps/search/?api=1&query=Do+Eat+Better+Experience+Genoa',
    },
    order: 2,
  },
  {
    id: 'genoa-003',
    num: 3,
    name: 'Ristorante Santa Teresa',
    city: 'genoa',
    address: 'Genoa',
    neighborhood: 'Genoa',
    reservationDate: '2025-08-04',
    visitNote: 'Dinner · Aug 4 · 9 people',
    reserved: true,
    cancelled: false,
    muted: [],
    links: {
      maps: 'https://www.google.com/maps/search/?api=1&query=Ristorante+Santa+Teresa+Genoa',
    },
    order: 3,
  },

  // ── LIVORNO ───────────────────────────────────────────────────────────────
  {
    id: 'livorno-001',
    num: 1,
    name: 'La Pineta',
    city: 'livorno',
    address: 'Marina di Bibbona, Livorno',
    neighborhood: 'Marina di Bibbona',
    reservationDate: '2025-08-06',
    visitNote: 'Lunch · Aug 6 · Michelin-starred · two seatings of 5',
    reserved: true,
    cancelled: false,
    muted: ['Michelin-starred seafood · beachfront · Marina di Bibbona'],
    links: {
      maps: 'https://www.google.com/maps/search/?api=1&query=La+Pineta+Marina+di+Bibbona+Livorno',
    },
    order: 1,
  },

  // ── ROME (cruise day, Aug 7) ───────────────────────────────────────────────
  {
    id: 'rome-003',
    num: 3,
    name: 'Roscioli Salumeria con Cucina',
    city: 'rome',
    address: 'Via dei Giubbonari 21, 00186 Roma',
    neighborhood: "Campo de' Fiori",
    reservationDate: '2025-08-07',
    visitNote: 'Lunch · Aug 7 · 10 people · code BCRZJW3H',
    reserved: true,
    cancelled: false,
    muted: ['Legendary Roman salumeria & restaurant · reservation code BCRZJW3H'],
    links: {
      maps: 'https://www.google.com/maps/search/?api=1&query=Roscioli+Salumeria+Via+dei+Giubbonari+21+Rome',
    },
    order: 3,
  },

  // ── SORRENTO ──────────────────────────────────────────────────────────────
  {
    id: 'sorrento-001',
    num: 1,
    name: 'Ristorante Parrucchiano Favorita 1868',
    city: 'sorrento',
    address: 'Corso Italia, Sorrento',
    neighborhood: 'Sorrento',
    reservationDate: '2025-08-08',
    visitNote: 'Lunch · Aug 8',
    reserved: false,
    cancelled: false,
    muted: ['Historic restaurant since 1868 · Sorrento institution'],
    links: {
      maps: 'https://www.google.com/maps/search/?api=1&query=Ristorante+Parrucchiano+Favorita+Sorrento',
    },
    order: 1,
  },
  {
    id: 'sorrento-002',
    num: 2,
    name: 'Raki',
    city: 'sorrento',
    address: 'Sorrento',
    neighborhood: 'Sorrento',
    reservationDate: '2025-08-08',
    visitNote: 'Ice cream · Aug 8',
    reserved: false,
    cancelled: false,
    muted: ['Artisan gelato · Sorrento'],
    links: {
      maps: 'https://www.google.com/maps/search/?api=1&query=Raki+gelato+Sorrento',
    },
    order: 2,
  },

  // ── AT SEA (Aug 9) ────────────────────────────────────────────────────────
  {
    id: 'atsea-001',
    num: 1,
    name: 'Toscana Restaurant',
    city: 'travel',
    address: 'On board',
    neighborhood: 'Ship',
    reservationDate: '2025-08-09',
    visitNote: 'Dinner · Aug 9 · 7 people: Mike, Uwen, Carl, Lyn, K. Oy, Poh Thiam, Wee Kiat · 19:00 / 6 people: Norm, Amanda, Megan, Brodie, George, Mable · 19:30',
    reserved: true,
    cancelled: false,
    muted: ['Ship specialty restaurant · two seatings'],
    links: {},
    order: 1,
  },

  // ── SANTORINI ─────────────────────────────────────────────────────────────
  {
    id: 'santorini-001',
    num: 1,
    name: "Mistelli's",
    city: 'santorini',
    address: 'Santorini',
    neighborhood: 'Santorini',
    reservationDate: '2025-08-10',
    visitNote: 'Lunch · Aug 10',
    reserved: false,
    cancelled: false,
    muted: [],
    links: {
      maps: "https://www.google.com/maps/search/?api=1&query=Mistelli's+Santorini",
    },
    order: 1,
  },
  {
    id: 'santorini-002',
    num: 2,
    name: 'Aris Restaurant',
    city: 'santorini',
    address: 'Agiou Mina, Thira, Santorini',
    neighborhood: 'Thira',
    reservationDate: '2025-08-10',
    visitNote: 'Dinner · Aug 10 · 14 people · 18:30 · caldera & sunset views · est. 1973',
    reserved: true,
    cancelled: false,
    muted: ['Caldera views · sunset dining · established 1973'],
    links: {
      maps: 'https://www.google.com/maps/search/?api=1&query=Aris+Restaurant+Agiou+Mina+Thira+Santorini',
    },
    order: 2,
  },

  // ── RHODES ────────────────────────────────────────────────────────────────
  {
    id: 'rhodes-001',
    num: 1,
    name: 'Nireas',
    city: 'rhodes',
    address: 'Rhodes',
    neighborhood: 'Rhodes',
    reservationDate: '2025-08-11',
    visitNote: 'Lunch · Aug 11',
    reserved: false,
    cancelled: false,
    muted: ['Seafood restaurant · Rhodes'],
    links: {
      maps: 'https://www.google.com/maps/search/?api=1&query=Nireas+restaurant+Rhodes',
    },
    order: 1,
  },
  {
    id: 'rhodes-002',
    num: 2,
    name: 'Jacques Restaurant',
    city: 'rhodes',
    address: 'Rhodes',
    neighborhood: 'Rhodes',
    reservationDate: '2025-08-11',
    visitNote: 'Dinner · Aug 11 · 14 people across three reservations · 18:30',
    reserved: true,
    cancelled: false,
    muted: ['14 people · three reservations'],
    links: {
      maps: 'https://www.google.com/maps/search/?api=1&query=Jacques+Restaurant+Rhodes',
    },
    order: 2,
  },

  // ── ANTALYA ───────────────────────────────────────────────────────────────
  {
    id: 'antalya-001',
    num: 1,
    name: 'Tiritcizade Restoran',
    city: 'antalya',
    address: 'Konyaaltı, Antalya',
    neighborhood: 'Konyaaltı',
    reservationDate: '2025-08-12',
    visitNote: 'Lunch · Aug 12 · 14 people · Ottoman & Anatolian cuisine',
    reserved: true,
    cancelled: false,
    muted: ['Ottoman & Anatolian cuisine · 14 people'],
    links: {
      maps: 'https://www.google.com/maps/search/?api=1&query=Tiritcizade+Restoran+Antalya',
    },
    order: 1,
  },
  {
    id: 'antalya-002',
    num: 2,
    name: 'Polo Grill Restaurant',
    city: 'antalya',
    address: 'Antalya',
    neighborhood: 'Antalya',
    reservationDate: '2025-08-12',
    visitNote: 'Dinner · Aug 12 · Two seatings of 7 + 6',
    reserved: true,
    cancelled: false,
    muted: ['Two seatings of 7 and 6'],
    links: {
      maps: 'https://www.google.com/maps/search/?api=1&query=Polo+Grill+Restaurant+Antalya',
    },
    order: 2,
  },

  // ── BODRUM ────────────────────────────────────────────────────────────────
  {
    id: 'bodrum-001',
    num: 1,
    name: 'Nokta Doner',
    city: 'bodrum',
    address: 'Bodrum',
    neighborhood: 'Bodrum',
    reservationDate: '2025-08-13',
    visitNote: 'Lunch · Aug 13',
    reserved: false,
    cancelled: false,
    muted: [],
    links: {
      maps: 'https://www.google.com/maps/search/?api=1&query=Nokta+Doner+Bodrum',
    },
    order: 1,
  },
  {
    id: 'bodrum-002',
    num: 2,
    name: 'Orfoz Restaurant',
    city: 'bodrum',
    address: 'Zeki Müren Cd., Bodrum',
    neighborhood: 'Bodrum',
    reservationDate: '2025-08-13',
    visitNote: 'Dinner · Aug 13 · 14 people · seafood degustation · confirmed via WhatsApp',
    reserved: true,
    cancelled: false,
    muted: ['Seafood degustation · 14 people · confirmed via WhatsApp'],
    links: {
      maps: 'https://www.google.com/maps/search/?api=1&query=Orfoz+Restaurant+Zeki+Muren+Bodrum',
    },
    order: 2,
  },

  // ── PATMOS ────────────────────────────────────────────────────────────────
  {
    id: 'patmos-001',
    num: 1,
    name: 'Red Ginger Restaurant',
    city: 'patmos',
    address: 'Patmos',
    neighborhood: 'Patmos',
    reservationDate: '2025-08-14',
    visitNote: 'Dinner · Aug 14 · 14 people · 20:00 (6 people) + 20:30 (4+4 people)',
    reserved: true,
    cancelled: false,
    muted: ['14 people across two seatings'],
    links: {
      maps: 'https://www.google.com/maps/search/?api=1&query=Red+Ginger+Restaurant+Patmos',
    },
    order: 1,
  },

  // ── ATHENS ────────────────────────────────────────────────────────────────
  {
    id: 'athens-001',
    num: 1,
    name: 'Mezze Athens',
    city: 'athens',
    address: 'Mitropoleos Street, Athens',
    neighborhood: 'Syntagma',
    reservationDate: '2025-08-15',
    visitNote: 'Lunch · Aug 15 · seafood & land meze · Mitropoleos Street',
    reserved: false,
    cancelled: false,
    muted: ['Seafood & land meze · Mitropoleos Street'],
    links: {
      maps: 'https://www.google.com/maps/search/?api=1&query=Mezze+Athens+Mitropoleos+Street',
    },
    order: 1,
  },
  {
    id: 'athens-002',
    num: 2,
    name: 'Tudor Hall',
    city: 'athens',
    address: 'King George Hotel, Syntagma Square, Athens',
    neighborhood: 'Syntagma',
    reservationDate: '2025-08-15',
    visitNote: 'Dinner · Aug 15 · 19:30 · 7th floor · Acropolis views · 7 people',
    reserved: true,
    cancelled: false,
    muted: ['7th floor of the King George Hotel · panoramic Acropolis views'],
    links: {
      maps: 'https://www.google.com/maps/search/?api=1&query=Tudor+Hall+King+George+Hotel+Athens',
    },
    order: 2,
  },
  {
    id: 'athens-003',
    num: 3,
    name: "The Greco's Project",
    city: 'athens',
    address: 'Athens',
    neighborhood: 'Athens',
    reservationDate: '2025-08-16',
    visitNote: 'Lunch · Aug 16',
    reserved: false,
    cancelled: false,
    muted: [],
    links: {
      maps: "https://www.google.com/maps/search/?api=1&query=The+Greco's+Project+Athens",
    },
    order: 3,
  },
  {
    id: 'athens-004',
    num: 4,
    name: "Ella's Restaurant",
    city: 'athens',
    address: 'Athens',
    neighborhood: 'Athens',
    reservationDate: '2025-08-16',
    visitNote: 'Dinner · Aug 16 · 20:30',
    reserved: false,
    cancelled: false,
    muted: [],
    links: {
      maps: "https://www.google.com/maps/search/?api=1&query=Ella's+Restaurant+Athens",
    },
    order: 4,
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