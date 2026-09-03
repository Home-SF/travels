#!/usr/bin/env node
/**
 * Seed script for italy-2024 restaurants
 * Run from travel-app/ directory:
 *   node italy-2024-restaurants-seed.js
 */

const admin = require('firebase-admin');
const serviceAccount = require('/Volumes/MacMiniM4-EXT/mikecylee-m4/Downloads/paris-london-2026-firebase-adminsdk-fbsvc-08d317d7ab.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const TRIP_ID = 'italy-2024';

const restaurants = [
  // ── ROME ─────────────────────────────────────────────────────────────────
  {
    id: 'rome-001',
    num: 1,
    name: 'Giolitti',
    city: 'rome',
    address: 'Via degli Uffici del Vicario 40, 00186 Roma',
    neighborhood: 'Pantheon',
    reservationDate: '2024-08-01',
    visitNote: 'Gelato · Aug 1 & throughout stay · Adjacent to hotel',
    reserved: false,
    cancelled: false,
    muted: ['Historic gelateria since 1900'],
    links: {
      maps: 'https://www.google.com/maps/search/?api=1&query=Giolitti+Via+degli+Uffici+del+Vicario+40+Roma',
    },
    order: 1,
  },
  {
    id: 'rome-002',
    num: 2,
    name: "Emma's",
    city: 'rome',
    address: 'Via del Monte della Farina 28, 00186 Roma',
    neighborhood: "Campo de' Fiori",
    reservationDate: '2024-07-30',
    visitNote: 'Dinner · Jul 30 · Reservation confirmed',
    reserved: true,
    cancelled: false,
    muted: ['+39 06 6476 0475'],
    links: {
      maps: 'https://www.google.com/maps/search/?api=1&query=Emma+Via+del+Monte+della+Farina+28+Roma',
    },
    order: 2,
  },
  {
    id: 'rome-003',
    num: 3,
    name: 'Armando al Pantheon',
    city: 'rome',
    address: "Salita de' Crescenzi 31, 00186 Roma",
    neighborhood: 'Pantheon',
    reservationDate: '2024-07-31',
    visitNote: 'Lunch · Jul 31 · Gargioli family since 1961',
    reserved: true,
    cancelled: false,
    muted: ['Classic Roman cuisine · CC reservation'],
    links: {
      maps: "https://www.google.com/maps/search/?api=1&query=Armando+al+Pantheon+Salita+de+Crescenzi+31+Roma",
    },
    order: 3,
  },
  {
    id: 'rome-004',
    num: 4,
    name: 'CiPASSO',
    city: 'rome',
    address: 'Via Metastasio 21, 00186 Roma',
    neighborhood: 'Pantheon',
    reservationDate: '2024-07-31',
    visitNote: 'Dinner · Jul 31 · Contemporary bistro',
    reserved: false,
    cancelled: false,
    muted: [],
    links: {
      maps: 'https://www.google.com/maps/search/?api=1&query=CiPASSO+Via+Metastasio+21+Roma',
    },
    order: 4,
  },
  {
    id: 'rome-005',
    num: 5,
    name: 'La Taverna dei Fori Imperiali',
    city: 'rome',
    address: 'Via della Madonna dei Monti 9, 00184 Roma',
    neighborhood: 'Monti',
    reservationDate: '2024-08-01',
    visitNote: 'Lunch · Aug 1 · Quandoo reservation',
    reserved: true,
    cancelled: false,
    muted: ['Roman trattoria near the Imperial Forums'],
    links: {
      maps: 'https://www.google.com/maps/search/?api=1&query=La+Taverna+dei+Fori+Imperiali+Roma',
    },
    order: 5,
  },
  {
    id: 'rome-006',
    num: 6,
    name: 'Osteria Der Belli Piras Valentino',
    city: 'rome',
    address: "P.za di Sant'Apollonia 11, 00153 Roma",
    neighborhood: 'Trastevere',
    reservationDate: '2024-08-01',
    visitNote: 'Dinner · Aug 1',
    reserved: false,
    cancelled: false,
    muted: ['+39 06 580 3782'],
    links: {
      maps: "https://www.google.com/maps/search/?api=1&query=Osteria+Der+Belli+Piras+Valentino+Piazza+Sant+Apollonia+Roma",
    },
    order: 6,
  },
  {
    id: 'rome-007',
    num: 7,
    name: 'Otaleg',
    city: 'rome',
    address: 'Via di San Cosimato 14A, 00153 Roma',
    neighborhood: 'Trastevere',
    reservationDate: '2024-08-01',
    visitNote: 'Gelato · Aug 1',
    reserved: false,
    cancelled: false,
    muted: ['Artisan gelateria in Trastevere'],
    links: {
      maps: 'https://www.google.com/maps/search/?api=1&query=Otaleg+gelato+Trastevere+Roma',
    },
    order: 7,
  },
  {
    id: 'rome-008',
    num: 8,
    name: 'Divinity Restaurant',
    city: 'rome',
    address: 'Via di S. Chiara 4/A, 00186 Roma',
    neighborhood: 'Pantheon',
    reservationDate: '2024-08-09',
    visitNote: 'Dinner · Aug 9 · Rooftop at Pantheon Iconic Rome Hotel',
    reserved: true,
    cancelled: false,
    muted: ['Panoramic rooftop terrace with Pantheon views'],
    links: {
      maps: 'https://www.google.com/maps/search/?api=1&query=Divinity+Restaurant+Via+di+Santa+Chiara+Roma',
    },
    order: 8,
  },
  {
    id: 'rome-009',
    num: 9,
    name: 'Siciliainbocca',
    city: 'rome',
    address: 'Roma',
    neighborhood: 'Pantheon',
    reservationDate: '2024-08-10',
    visitNote: 'Lunch · Aug 10 · Sicilian cuisine · Reservation confirmed',
    reserved: true,
    cancelled: false,
    muted: [],
    links: {
      maps: 'https://www.google.com/maps/search/?api=1&query=Siciliainbocca+Roma',
    },
    order: 9,
  },
  {
    id: 'rome-010',
    num: 10,
    name: 'Mirabelle',
    city: 'rome',
    address: 'Via Di Porta Pinciana 14, 00187 Roma',
    neighborhood: 'Villa Borghese',
    reservationDate: '2024-08-10',
    visitNote: 'Dinner · Aug 10 · Michelin-recognized · Hotel Splendide Royal',
    reserved: true,
    cancelled: false,
    muted: ['CC required · 24h cancellation policy'],
    links: {
      maps: 'https://www.google.com/maps/search/?api=1&query=Mirabelle+Via+di+Porta+Pinciana+14+Roma',
    },
    order: 10,
  },
  {
    id: 'rome-011',
    num: 11,
    name: 'Come il Latte',
    city: 'rome',
    address: 'Via Silvio Spaventa 24-26, 00187 Roma',
    neighborhood: 'Villa Borghese',
    reservationDate: '2024-08-10',
    visitNote: 'Gelato · Aug 10',
    reserved: false,
    cancelled: false,
    muted: [],
    links: {
      maps: 'https://www.google.com/maps/search/?api=1&query=Come+il+Latte+gelato+Roma',
    },
    order: 11,
  },

  // ── FLORENCE ─────────────────────────────────────────────────────────────
  {
    id: 'florence-001',
    num: 1,
    name: 'Casa Ciabattini',
    city: 'florence',
    address: 'Via Il Prato 68/R, 50123 Firenze',
    neighborhood: 'Santa Maria Novella',
    reservationDate: '2024-08-02',
    visitNote: 'Dinner · Aug 2 · WhatsApp reservation',
    reserved: true,
    cancelled: false,
    muted: [],
    links: {
      maps: 'https://www.google.com/maps/search/?api=1&query=Casa+Ciabattini+Via+Il+Prato+68+Firenze',
    },
    order: 1,
  },
  {
    id: 'florence-002',
    num: 2,
    name: 'Osteria del Cinghiale Bianco',
    city: 'florence',
    address: 'Borgo S. Jacopo 43, 50125 Firenze',
    neighborhood: 'Oltrarno',
    reservationDate: '2024-08-03',
    visitNote: 'Lunch · Aug 3 · AMEX',
    reserved: true,
    cancelled: false,
    muted: ['Wild boar specialties · Tuscan classics'],
    links: {
      maps: 'https://www.google.com/maps/search/?api=1&query=Osteria+Cinghiale+Bianco+Borgo+San+Jacopo+43+Firenze',
    },
    order: 2,
  },
  {
    id: 'florence-003',
    num: 3,
    name: 'Atto di Vito Mollica',
    city: 'florence',
    address: 'Via del Corso 6, 50122 Firenze',
    neighborhood: 'Duomo',
    reservationDate: '2024-08-03',
    visitNote: 'Dinner · Aug 3 · Fine tasting menu · Palazzo Portinari Salviati',
    reserved: true,
    cancelled: false,
    muted: ['The Fork · $270 deposit paid'],
    links: {
      maps: 'https://www.google.com/maps/search/?api=1&query=Atto+di+Vito+Mollica+Via+del+Corso+6+Firenze',
    },
    order: 3,
  },
  {
    id: 'florence-004',
    num: 4,
    name: "L'Arte di Dory",
    city: 'florence',
    address: 'Firenze',
    neighborhood: 'Firenze',
    reservationDate: '2024-08-04',
    visitNote: 'Lunch · Aug 4',
    reserved: false,
    cancelled: false,
    muted: [],
    links: {
      maps: "https://www.google.com/maps/search/?api=1&query=L'Arte+di+Dory+Firenze",
    },
    order: 4,
  },
  {
    id: 'florence-005',
    num: 5,
    name: 'La Leggenda dei Frati',
    city: 'florence',
    address: 'Costa San Giorgio 6/A, 50125 Firenze',
    neighborhood: 'Oltrarno',
    reservationDate: '2024-08-04',
    visitNote: 'Dinner · Aug 4 · Michelin Guide · Panoramic views',
    reserved: true,
    cancelled: false,
    muted: ['Gardens of Villa Bardini · sweeping city views'],
    links: {
      maps: 'https://www.google.com/maps/search/?api=1&query=La+Leggenda+dei+Frati+Costa+San+Giorgio+6+Firenze',
    },
    order: 5,
  },
  {
    id: 'florence-006',
    num: 6,
    name: 'La Ménagère',
    city: 'florence',
    address: "Via de' Ginori 8/r, 50123 Firenze",
    neighborhood: 'San Lorenzo',
    reservationDate: '2024-08-08',
    visitNote: 'Lunch · Aug 8 · Concept restaurant',
    reserved: false,
    cancelled: false,
    muted: ['Restaurant, bar, florist & concept store'],
    links: {
      maps: "https://www.google.com/maps/search/?api=1&query=La+Menagere+Via+de+Ginori+8+Firenze",
    },
    order: 6,
  },
  {
    id: 'florence-007',
    num: 7,
    name: 'Ristorante dei Rossi',
    city: 'florence',
    address: 'Firenze',
    neighborhood: 'Firenze',
    reservationDate: '2024-08-08',
    visitNote: 'Dinner · Aug 8 · Bistecca Fiorentina',
    reserved: false,
    cancelled: false,
    muted: ['Classic Florentine steakhouse'],
    links: {
      maps: 'https://www.google.com/maps/search/?api=1&query=Ristorante+dei+Rossi+Firenze',
    },
    order: 7,
  },

  // ── SIENA ────────────────────────────────────────────────────────────────
  {
    id: 'siena-001',
    num: 1,
    name: 'Osteria Permalico',
    city: 'siena',
    address: 'Costa Larga 4, 53100 Siena',
    neighborhood: 'Siena',
    reservationDate: '2024-08-05',
    visitNote: 'Lunch · Aug 5 · Local Sienese cuisine',
    reserved: true,
    cancelled: false,
    muted: ['+39 0577 41105'],
    links: {
      maps: 'https://www.google.com/maps/search/?api=1&query=Osteria+Permalico+Costa+Larga+4+Siena',
    },
    order: 1,
  },
  {
    id: 'siena-002',
    num: 2,
    name: 'Osteria 1126',
    city: 'siena',
    address: 'Località Cinciano 2, 53036 Poggibonsi',
    neighborhood: 'Chianti',
    reservationDate: '2024-08-05',
    visitNote: 'Dinner · Aug 5 · Contemporary Tuscan',
    reserved: false,
    cancelled: false,
    muted: ['Countryside estate near Poggibonsi'],
    links: {
      maps: 'https://www.google.com/maps/search/?api=1&query=Osteria+1126+Poggibonsi+Siena',
    },
    order: 2,
  },

  // ── BOLOGNA ──────────────────────────────────────────────────────────────
  {
    id: 'bologna-001',
    num: 1,
    name: 'Ristorante Al Sangiovese',
    city: 'bologna',
    address: 'Bologna',
    neighborhood: 'Bologna',
    reservationDate: '2024-08-06',
    visitNote: 'Lunch · Aug 6 · Traditional Bolognese',
    reserved: false,
    cancelled: false,
    muted: ['Classic ragù, tortellini, tagliatelle'],
    links: {
      maps: 'https://www.google.com/maps/search/?api=1&query=Ristorante+Al+Sangiovese+Bologna',
    },
    order: 1,
  },
  {
    id: 'bologna-002',
    num: 2,
    name: 'Via Pescherie Vecchie Food Stroll',
    city: 'bologna',
    address: 'Via Pescherie Vecchie, 40124 Bologna',
    neighborhood: 'Quadrilatero',
    reservationDate: '2024-08-06',
    visitNote: 'Evening · Aug 6 · Market & bar crawl',
    reserved: false,
    cancelled: false,
    muted: ['Salumeria Simoni · Osteria Del Sole · La Baita Vecchia Malga · Mercato di Mezzo'],
    links: {
      maps: 'https://www.google.com/maps/search/?api=1&query=Via+Pescherie+Vecchie+Bologna',
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