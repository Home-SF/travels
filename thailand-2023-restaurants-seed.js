#!/usr/bin/env node
/**
 * Seed script for thailand-2023 restaurants
 * Run from travel-app/ directory:
 *   node thailand-2023-restaurants-seed.js
 */

const admin = require('firebase-admin');
const serviceAccount = require('/Volumes/MacMiniM4-EXT/mikecylee-m4/Downloads/paris-london-2026-firebase-adminsdk-fbsvc-08d317d7ab.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const TRIP_ID = 'thailand-2023';

const restaurants = [
  // ── BANGKOK ──────────────────────────────────────────────────────────────
  {
    id: 'bangkok-001',
    num: 1,
    name: 'Seven Flavors Steam',
    city: 'bangkok',
    address: 'Bangkok',
    neighborhood: 'Bangkok',
    reservationDate: '2023-12-18',
    visitNote: 'Welcome dinner · Dec 18',
    reserved: true,
    cancelled: false,
    muted: ['Hot pot & steam boat welcome dinner'],
    links: {
      maps: 'https://www.google.com/maps/search/?api=1&query=Seven+Flavors+Steam+Bangkok',
    },
    order: 1,
  },
  {
    id: 'bangkok-002',
    num: 2,
    name: 'Kempinski Hotel Sindhorn',
    city: 'bangkok',
    address: 'Langsuan Road, Bangkok',
    neighborhood: 'Lumphini',
    reservationDate: '2023-12-19',
    visitNote: 'Optional breakfast · Dec 19',
    reserved: false,
    cancelled: false,
    muted: ['Hotel breakfast · Langsuan Road'],
    links: {
      maps: 'https://www.google.com/maps/search/?api=1&query=Kempinski+Hotel+Sindhorn+Langsuan+Bangkok',
    },
    order: 2,
  },
  {
    id: 'bangkok-003',
    num: 3,
    name: 'Silom Thai Cooking School',
    city: 'bangkok',
    address: '6/14 Decho Road, Bang Rak, Bangkok 10500',
    neighborhood: 'Silom',
    reservationDate: '2023-12-20',
    visitNote: 'Cooking class · Dec 20 · Market tour included',
    reserved: true,
    cancelled: false,
    muted: ['Menu: tom yum goong · pad see ew · green curry · mango sticky rice'],
    links: {
      maps: 'https://www.google.com/maps/search/?api=1&query=Silom+Thai+Cooking+School+Decho+Road+Bangkok',
    },
    order: 3,
  },
  {
    id: 'bangkok-004',
    num: 4,
    name: 'Le Méridien Surawongse',
    city: 'bangkok',
    address: 'Surawong Road, Bang Rak, Bangkok',
    neighborhood: 'Silom',
    reservationDate: '2023-12-21',
    visitNote: 'Optional buffet · Dec 21',
    reserved: false,
    cancelled: false,
    muted: ['Hotel buffet'],
    links: {
      maps: 'https://www.google.com/maps/search/?api=1&query=Le+Meridien+Surawongse+Bangkok',
    },
    order: 4,
  },
  {
    id: 'bangkok-005',
    num: 5,
    name: 'Samlor',
    city: 'bangkok',
    address: 'Bangkok',
    neighborhood: 'Bangkok',
    reservationDate: '2023-12-22',
    visitNote: 'Dinner · Dec 22 · Party of 8 · Michelin Bib Gourmand',
    reserved: true,
    cancelled: false,
    muted: ['Michelin Bib Gourmand · Modern Thai'],
    links: {
      maps: 'https://www.google.com/maps/search/?api=1&query=Samlor+restaurant+Bangkok',
    },
    order: 5,
  },
  {
    id: 'bangkok-006',
    num: 6,
    name: 'Samrub Samrub Thai',
    city: 'bangkok',
    address: 'Bangkok',
    neighborhood: 'Bangkok',
    reservationDate: '2023-12-23',
    visitNote: 'Dinner · Dec 23 · Party of 7 · Michelin Guide',
    reserved: true,
    cancelled: false,
    muted: ['Michelin Guide · Thai fine dining · Chef Prin Polsuk'],
    links: {
      maps: 'https://www.google.com/maps/search/?api=1&query=Samrub+Samrub+Thai+Bangkok',
    },
    order: 6,
  },
  {
    id: 'bangkok-007',
    num: 7,
    name: 'Nusara',
    city: 'bangkok',
    address: 'Bangkok',
    neighborhood: 'Bangkok',
    reservationDate: '2023-12-29',
    visitNote: "Dinner · Dec 29 · Party of 6 · Asia's 50 Best",
    reserved: true,
    cancelled: false,
    muted: ["Asia's 50 Best Restaurants · Chef Thitid 'Ton' Tassanakajohn · Modern Thai tasting menu"],
    links: {
      maps: 'https://www.google.com/maps/search/?api=1&query=Nusara+restaurant+Bangkok',
    },
    order: 7,
  },
  {
    id: 'bangkok-008',
    num: 8,
    name: "Marriott Marquis Queen's Park",
    city: 'bangkok',
    address: 'Sukhumvit Soi 22, Bangkok 10110',
    neighborhood: 'Sukhumvit',
    reservationDate: '2023-12-30',
    visitNote: 'Optional buffet lunch · Dec 30',
    reserved: false,
    cancelled: false,
    muted: ['Hotel buffet lunch'],
    links: {
      maps: 'https://www.google.com/maps/search/?api=1&query=Marriott+Marquis+Queens+Park+Sukhumvit+22+Bangkok',
    },
    order: 8,
  },
  {
    id: 'bangkok-009',
    num: 9,
    name: 'Blue by Alain Ducasse',
    city: 'bangkok',
    address: 'ICONSIAM, 299 Charoennakhon Road, Khlong Ton Sai, Bangkok 10600',
    neighborhood: 'ICONSiam',
    reservationDate: '2023-12-31',
    visitNote: 'NYE Dinner · Dec 31 · Party of 10 · ⭐ Michelin',
    reserved: true,
    cancelled: false,
    muted: ['Michelin 1 star · Chef Wilfrid Hocquet · French fine dining · ICONSiam'],
    links: {
      maps: 'https://www.google.com/maps/search/?api=1&query=Blue+by+Alain+Ducasse+ICONSiam+Bangkok',
    },
    order: 9,
  },

  // ── PATTAYA ──────────────────────────────────────────────────────────────
  {
    id: 'pattaya-001',
    num: 1,
    name: 'Hilton Pattaya Christmas Brunch',
    city: 'pattaya',
    address: 'Pattaya Beach Road, Pattaya 20150',
    neighborhood: 'Pattaya Beach',
    reservationDate: '2023-12-25',
    visitNote: 'Christmas Brunch · Dec 25 · Party of 13',
    reserved: true,
    cancelled: false,
    muted: ['Festive Christmas Day brunch · Hilton Pattaya rooftop'],
    links: {
      maps: 'https://www.google.com/maps/search/?api=1&query=Hilton+Pattaya+Beach+Road',
    },
    order: 1,
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