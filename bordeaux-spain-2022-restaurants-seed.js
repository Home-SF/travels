#!/usr/bin/env node
/**
 * Seed script for bordeaux-spain-2022 restaurants
 * Run from travel-app/ directory:
 *   node bordeaux-spain-2022-restaurants-seed.js
 */

const admin = require('firebase-admin');
const serviceAccount = require('/Volumes/MacMiniM4-EXT/mikecylee-m4/Downloads/paris-london-2026-firebase-adminsdk-fbsvc-08d317d7ab.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const TRIP_ID = 'bordeaux-spain-2022';

const restaurants = [
  // ── BORDEAUX ─────────────────────────────────────────────────────────────
  {
    id: 'bordeaux-001',
    num: 1,
    name: 'La Terrasse Rouge',
    city: 'bordeaux',
    address: '1 La Dominique, 33330 Saint-Émilion',
    neighborhood: 'Saint-Émilion',
    reservationDate: '2022-08-12',
    visitNote: 'Lunch · Aug 12 · Party of 7',
    reserved: true,
    cancelled: false,
    muted: ['Château La Dominique · laterrasserouge.com · 15 min from house'],
    links: {
      maps: 'https://www.google.com/maps/search/?api=1&query=La+Terrasse+Rouge+1+La+Dominique+Saint-Emilion',
    },
    order: 1,
  },
  {
    id: 'bordeaux-002',
    num: 2,
    name: 'Lard et Bouchon',
    city: 'bordeaux',
    address: '22 rue Guadet, 33330 Saint-Émilion',
    neighborhood: 'Saint-Émilion',
    reservationDate: '2022-08-13',
    visitNote: 'Dinner · Aug 13 · Party of 8',
    reserved: true,
    cancelled: false,
    muted: ['+33 5 57 24 28 53 · lardetbouchon.fr'],
    links: {
      maps: 'https://www.google.com/maps/search/?api=1&query=Lard+et+Bouchon+22+rue+Guadet+Saint-Emilion',
    },
    order: 2,
  },
  {
    id: 'bordeaux-003',
    num: 3,
    name: 'La Tupina',
    city: 'bordeaux',
    address: '6 rue Porte de la Monnaie, 33800 Bordeaux',
    neighborhood: 'Bordeaux City',
    reservationDate: '2022-08-14',
    visitNote: 'Lunch · Aug 14 · Michelin Guide',
    reserved: false,
    cancelled: false,
    muted: ['+33 5 56 91 56 37 · latupina.com · South-West French cuisine'],
    links: {
      website: 'https://www.latupina.com',
      maps: 'https://www.google.com/maps/search/?api=1&query=La+Tupina+6+rue+Porte+de+la+Monnaie+Bordeaux',
    },
    order: 3,
  },
  {
    id: 'bordeaux-004',
    num: 4,
    name: 'Café Lavinal at Cordeilian Bages',
    city: 'bordeaux',
    address: 'Pauillac, Gironde',
    neighborhood: 'Pauillac',
    reservationDate: '2022-08-15',
    visitNote: 'Lunch · Aug 15 · Michelin-starred',
    reserved: true,
    cancelled: false,
    muted: ['Chef Jean-Luc Rocha · "A gastronomic journey through land and sea with the fine wines of Bordeaux"'],
    links: {
      maps: 'https://www.google.com/maps/search/?api=1&query=Cafe+Lavinal+Cordeilian+Bages+Pauillac',
    },
    order: 4,
  },
  {
    id: 'bordeaux-005',
    num: 5,
    name: 'Brasero de Candale',
    city: 'bordeaux',
    address: 'Saint-Émilion area',
    neighborhood: 'Saint-Émilion',
    reservationDate: '2022-08-15',
    visitNote: 'Dinner · Aug 15 · Two tables booked side by side',
    reserved: true,
    cancelled: false,
    muted: [],
    links: {
      maps: 'https://www.google.com/maps/search/?api=1&query=Brasero+de+Candale+Saint-Emilion',
    },
    order: 5,
  },
  {
    id: 'bordeaux-006',
    num: 6,
    name: "L'Envers du Décor",
    city: 'bordeaux',
    address: '11 rue du Clocher, 33330 Saint-Émilion',
    neighborhood: 'Saint-Émilion',
    reservationDate: '2022-08-16',
    visitNote: 'Dinner · Aug 16',
    reserved: false,
    cancelled: false,
    muted: ['envers-dudecor.com/en/'],
    links: {
      website: 'https://www.envers-dudecor.com/en/',
      maps: 'https://www.google.com/maps/search/?api=1&query=L%27Envers+du+Decor+Saint-Emilion',
    },
    order: 6,
  },

  // ── BILBAO ───────────────────────────────────────────────────────────────
  {
    id: 'bilbao-001',
    num: 1,
    name: 'Etxanobe Atelier',
    city: 'bilbao',
    address: 'Juan de Ajuriaguerra 8, 48009 Bilbao',
    neighborhood: 'City Centre',
    reservationDate: '2022-08-18',
    visitNote: 'Dinner · Aug 18 · Party of 8 · ⭐ Michelin',
    reserved: true,
    cancelled: false,
    muted: ['+34 944 42 10 71 · ladespensadeletxanobe.com/en/'],
    links: {
      website: 'https://www.ladespensadeletxanobe.com/en/',
      maps: 'https://www.google.com/maps/search/?api=1&query=Etxanobe+Atelier+Juan+de+Ajuriaguerra+8+Bilbao',
    },
    order: 1,
  },
  {
    id: 'bilbao-002',
    num: 2,
    name: 'Txirene',
    city: 'bilbao',
    address: 'Poza Lizentziatuaren 26, 48009 Bilbao',
    neighborhood: 'City Centre',
    reservationDate: '2022-08-23',
    visitNote: 'Dinner · Aug 23 · Mike, Uwen & Carl',
    reserved: false,
    cancelled: false,
    muted: [],
    links: {
      maps: 'https://www.google.com/maps/search/?api=1&query=Txirene+Poza+Lizentziatuaren+26+Bilbao',
    },
    order: 2,
  },

  // ── SAN SEBASTIÁN ────────────────────────────────────────────────────────
  {
    id: 'sansebastian-001',
    num: 1,
    name: 'Arzak',
    city: 'sansebastian',
    address: 'Alcalde J. Elosegi Hiribidea 273, 20015 Donostia',
    neighborhood: 'Alza',
    reservationDate: '2022-08-19',
    visitNote: 'Dinner · Aug 19 · Party of 8 · ⭐⭐⭐ Michelin',
    reserved: true,
    cancelled: false,
    muted: ['"Exceptional cuisine, worth a special journey" · arzak.es/en/'],
    links: {
      website: 'https://www.arzak.es/en/',
      maps: 'https://www.google.com/maps/search/?api=1&query=Arzak+Alcalde+J+Elosegi+Hiribidea+273+Donostia',
    },
    order: 1,
  },
  {
    id: 'sansebastian-002',
    num: 2,
    name: 'Bernardo Etxea',
    city: 'sansebastian',
    address: 'Triunfo 3, 20007 Donostia/San Sebastián',
    neighborhood: 'Parte Vieja',
    reservationDate: '2022-08-22',
    visitNote: 'Lunch · Aug 22 · Party of 8 · Michelin Guide',
    reserved: true,
    cancelled: false,
    muted: ['Seafood · bernardoetxea.com'],
    links: {
      website: 'https://www.bernardoetxea.com',
      maps: 'https://www.google.com/maps/search/?api=1&query=Bernardo+Etxea+Triunfo+3+San+Sebastian',
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