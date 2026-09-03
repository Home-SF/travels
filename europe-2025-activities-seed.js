#!/usr/bin/env node
/**
 * Seed script — europe-2025 activities, grouped by country (italy / greece / turkey)
 * Non-dining activities extracted from day events.
 * Run from travel-app/ directory: node europe-2025-activities-seed.js
 */

const admin = require('firebase-admin');
const serviceAccount = require('/Volumes/MacMiniM4-EXT/mikecylee-m4/Downloads/paris-london-2026-firebase-adminsdk-fbsvc-08d317d7ab.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const TRIP_ID = 'europe-2025';

const activities = [

  // ── ITALY ─────────────────────────────────────────────────────────────────
  // Rome pre-cruise (Aug 2)
  {
    id: 'italy-001',
    name: 'Trevi Fountain',
    city: 'italy',
    num: 1,
    order: 1,
    date: '2025-08-02',
    address: 'Piazza di Trevi, 00187 Roma, Italy',
    neighborhood: 'Trevi, Rome',
    visitNote: 'Aug 2 · Rome pre-cruise · Mike, Uwen, Carl',
    planned: false,
    facts: [
      'Baroque masterpiece completed 1762 · largest fountain in Rome',
      'Tradition: toss a coin to ensure return to Rome',
    ],
    links: {
      maps: 'https://www.google.com/maps/search/?api=1&query=Trevi+Fountain+Rome',
    },
  },

  // Genoa (Aug 4)
  {
    id: 'italy-002',
    name: 'Genoa Culinary Masterclass',
    city: 'italy',
    num: 2,
    order: 2,
    date: '2025-08-04',
    address: 'Vico Dritto Ponticello, 16123 Genova, Italy',
    neighborhood: 'Old Town, Genoa',
    visitNote: 'Aug 4 · 09:15 · Do Eat Better · 9 people',
    planned: true,
    facts: [
      'Meet at Columbus childhood home in the caruggi (medieval lanes)',
      'Hands-on: gnocchi · focaccia · Canestrelli butter biscuits',
      'Local chef guides · includes market visit',
    ],
    links: {
      maps: 'https://www.google.com/maps/search/?api=1&query=Do+Eat+Better+Genova',
      website: 'https://www.doeatbetter.it',
    },
  },

  // Livorno / Bolgheri (Aug 6)
  {
    id: 'italy-003',
    name: 'Bolgheri Village',
    city: 'italy',
    num: 3,
    order: 3,
    date: '2025-08-06',
    address: 'Via Lauretta, 57022 Bolgheri LI, Italy',
    neighborhood: 'Bolgheri, Tuscany',
    visitNote: 'Aug 6 · 13:30 · Livorno port day',
    planned: false,
    facts: [
      'Famous cypress-lined avenue (Viale dei Cipressi) · immortalised by poet Carducci',
      'Heart of Super Tuscan wine country — Sassicaia · Ornellaia · Masseto',
      'Medieval walled village with tower and small piazza',
    ],
    links: {
      maps: 'https://www.google.com/maps/search/?api=1&query=Bolgheri+village+Tuscany',
    },
  },
  {
    id: 'italy-004',
    name: 'Guado Al Melo Wine Tasting',
    city: 'italy',
    num: 4,
    order: 4,
    date: '2025-08-06',
    address: 'Via Bolgherese 280, 57022 Bolgheri LI, Italy',
    neighborhood: 'Bolgheri, Tuscany',
    visitNote: 'Aug 6 · 15:30 · Livorno port day',
    planned: true,
    facts: [
      'Organic winery specialising in Bordeaux blends',
      'Tasting: 2015 & 2006 vintages',
      'Bolgheri DOC appellation — Cabernet Sauvignon · Merlot',
    ],
    links: {
      maps: 'https://www.google.com/maps/search/?api=1&query=Guado+Al+Melo+winery+Bolgheri',
      website: 'https://www.guadoalmelo.it',
    },
  },

  // Sorrento / Herculaneum (Aug 8)
  {
    id: 'italy-005',
    name: 'Marina Piccola Cliff Lift',
    city: 'italy',
    num: 5,
    order: 5,
    date: '2025-08-08',
    address: 'Via Marina Piccola, 80067 Sorrento NA, Italy',
    neighborhood: 'Marina Piccola, Sorrento',
    visitNote: 'Aug 8 · 08:30 · Sorrento port',
    planned: false,
    facts: [
      'Funicular-style cliff lift connecting the harbour to Sorrento town centre',
      'Dramatic views over the Bay of Naples',
    ],
    links: {
      maps: 'https://www.google.com/maps/search/?api=1&query=Marina+Piccola+Sorrento',
    },
  },
  {
    id: 'italy-006',
    name: 'Herculaneum Archaeological Tour',
    city: 'italy',
    num: 6,
    order: 6,
    date: '2025-08-08',
    address: 'Corso Resina 187, 80056 Ercolano NA, Italy',
    neighborhood: 'Ercolano (Herculaneum)',
    visitNote: 'Aug 8 · 10:30 · Raffaele Grand Tour Experience · 7 guests · 2 hrs',
    planned: true,
    facts: [
      'Private tour with archaeologists — Raffaele Grand Tour Experience',
      'Herculaneum: preserved by Vesuvius eruption 79 AD, better preserved than Pompeii',
      'Guests: Mike, Uwen, Carl, Megan, Brodie, Norm, Amanda',
    ],
    links: {
      maps: 'https://www.google.com/maps/search/?api=1&query=Herculaneum+archaeological+site+Ercolano',
      website: 'https://www.raffaelegrandtour.com',
    },
  },

  // ── GREECE ────────────────────────────────────────────────────────────────
  // Santorini (Aug 10)
  {
    id: 'greece-001',
    name: 'Santorini Private Van Tour',
    city: 'greece',
    num: 1,
    order: 1,
    date: '2025-08-10',
    address: 'Akrotiri, 847 00 Santorini, Greece',
    neighborhood: 'Akrotiri & Megalochori, Santorini',
    visitNote: 'Aug 10 · 14:00 · OceanWave Tours · €550 cash',
    planned: true,
    facts: [
      'OceanWave Tours · contact Marinos on tender (+30 697 924 9154)',
      'Akrotiri archaeological site — Bronze Age Minoan city buried by 1627 BC eruption',
      'Art Space Winery — volcanic-soil Assyrtiko wine · cellar carved into ancient caves',
      '€550 cash due on the day',
    ],
    links: {
      maps: 'https://www.google.com/maps/search/?api=1&query=Akrotiri+archaeological+site+Santorini',
    },
  },

  // Patmos (Aug 14)
  {
    id: 'greece-002',
    name: 'Monastery of Saint John the Theologian',
    city: 'greece',
    num: 2,
    order: 2,
    date: '2025-08-14',
    address: 'Chora, 855 00 Patmos, Greece',
    neighborhood: 'Chora, Patmos',
    visitNote: 'Aug 14 · Patmos port day',
    planned: false,
    facts: [
      'UNESCO World Heritage Site · founded 1088 AD',
      'Fortress-like Byzantine monastery crowning the hill above Chora',
      'Treasury holds illuminated manuscripts and Byzantine icons',
    ],
    links: {
      maps: 'https://www.google.com/maps/search/?api=1&query=Monastery+Saint+John+Theologian+Patmos',
    },
  },
  {
    id: 'greece-003',
    name: 'Cave of the Apocalypse',
    city: 'greece',
    num: 3,
    order: 3,
    date: '2025-08-14',
    address: 'Patmos 855 00, Greece',
    neighborhood: 'Between port and Chora, Patmos',
    visitNote: 'Aug 14 · Patmos port day',
    planned: false,
    facts: [
      'UNESCO World Heritage Site · where St John dictated the Book of Revelation (95 AD)',
      'Rock split in three — symbol of the Holy Trinity',
      'Silver-canopied niche marks where the Evangelist rested his head',
    ],
    links: {
      maps: 'https://www.google.com/maps/search/?api=1&query=Cave+Apocalypse+Patmos+Greece',
    },
  },

  // Athens (Aug 16)
  {
    id: 'greece-004',
    name: 'Acropolis & Parthenon Tour',
    city: 'greece',
    num: 4,
    order: 4,
    date: '2025-08-16',
    address: 'Acropolis, Athens 105 58, Greece',
    neighborhood: 'Acropolis Hill, Athens',
    visitNote: 'Aug 16 · 19:00 · Code FDE8FCFFE5',
    planned: true,
    facts: [
      'Evening visit — golden-hour light on the marble',
      'Parthenon: dedicated to Athena, built 447–432 BC',
      'Also includes Erechtheion (Caryatid porch) and Propylaea gateway',
      'Booking code: FDE8FCFFE5',
    ],
    links: {
      maps: 'https://www.google.com/maps/search/?api=1&query=Acropolis+Athens+Greece',
      website: 'https://eacropolis.gr',
    },
  },

  // ── TURKEY ────────────────────────────────────────────────────────────────
  // Antalya (Aug 12)
  {
    id: 'turkey-001',
    name: 'Kaleiçi Old Town',
    city: 'turkey',
    num: 1,
    order: 1,
    date: '2025-08-12',
    address: 'Kaleiçi, Antalya, Turkey',
    neighborhood: 'Kaleiçi, Antalya',
    visitNote: 'Aug 12 · Antalya port day',
    planned: false,
    facts: [
      "Hadrian's Gate — Roman triumphal arch built 130 AD, still intact",
      'Winding lanes of Ottoman-era mansions converted to boutique hotels and cafés',
      'Best spot for Turkish coffee in atmospheric garden courtyards',
      'Old harbour (Iskele) with Roman-era walls still visible',
    ],
    links: {
      maps: 'https://www.google.com/maps/search/?api=1&query=Kaleici+Old+Town+Antalya',
    },
  },

  // Bodrum (Aug 13)
  {
    id: 'turkey-002',
    name: 'Bodrum Old Town Shopping',
    city: 'turkey',
    num: 2,
    order: 2,
    date: '2025-08-13',
    address: 'Bodrum Castle Area, 48400 Bodrum, Turkey',
    neighborhood: 'Old Town, Bodrum',
    visitNote: 'Aug 13 · Bodrum port day',
    planned: false,
    facts: [
      'Best buys: handwoven Turkish towels (peshtemal) · ceramics · silver jewelry',
      'Leather sandals hand-crafted to order in the bazaar lanes',
      'Bodrum Castle (Castle of St Peter) backdrop to the bazaar — built 1402 by Knights Hospitaller',
    ],
    links: {
      maps: 'https://www.google.com/maps/search/?api=1&query=Bodrum+Old+Town+bazaar+Turkey',
    },
  },
];

async function seed() {
  console.log(`\nSeeding europe-2025 activities (${activities.length} total)...\n`);
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