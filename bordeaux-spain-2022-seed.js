#!/usr/bin/env node
/**
 * Seed script for bordeaux-spain-2022 — full detail version
 * Run from travel-app/ directory:
 *   node bordeaux-spain-2022-seed.js
 */

const admin = require('firebase-admin');
const serviceAccount = require('/Volumes/MacMiniM4-EXT/mikecylee-m4/Downloads/paris-london-2026-firebase-adminsdk-fbsvc-08d317d7ab.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const TRIP_ID = 'bordeaux-spain-2022';

const trip = {
  title: 'Bordeaux · Spain 2022',
  dates: { start: '2022-08-11', end: '2022-08-24' },
  cities: [
    { id: 'bordeaux',     name: 'Bordeaux' },
    { id: 'bilbao',       name: 'Bilbao' },
    { id: 'sansebastian', name: 'San Sebastián' },
    { id: 'mutriku',      name: 'Mutriku' },
    { id: 'bayonne',      name: 'Bayonne' },
  ],
  travelers: ['Mike', 'Uwen', 'Carl', 'Poh Thiam', 'Wee Kiat', 'Lyn', 'Kuhn Oy'],
  status: 'completed',
};

const days = [
  {
    date: '2022-08-11',
    displayDate: 'Aug 11',
    weekday: 'Thursday',
    city: 'travel',
    isTravel: true,
    kicker: 'Flights to Paris → Bordeaux',
    events: [
      { time: '10:45', tz: 'CDT', title: 'Mike, Uwen & Carl arrive Paris CDG', note: 'UA 990 from SFO · Terminal 2A · United Polaris Business' },
      { time: '11:16', tz: 'CDT', title: 'Lyn, Oy, Mummy & Daddy: TGV INOUI 5224 dep CDG', note: 'Connection at Massy TGV → OUIGO Grande Vitesse 7673 · Carriage 5 seats 61–64 / Carriage 8 seats 867, 868, 871, 872' },
      { time: '12:38', tz: 'CDT', title: 'Mike, Uwen & Carl: TGV INOUI 5226 dep CDG', note: 'Connection at Massy → TGV INOUI 8547 at 14:18' },
      { time: '15:14', tz: 'CDT', title: 'Lyn group arrive Bordeaux Saint-Jean', note: '' },
      { time: '16:14', tz: 'CDT', title: 'Mike group arrive Bordeaux Saint-Jean', note: '' },
      { time: '17:00', tz: 'CDT', title: 'Europcar pickup – Mike, Uwen & Carl', note: 'Confirmation #1148938605 · Compact class (Jeep Renegade or similar)' },
      { time: '', title: 'Check in: Vrai Canon Bouche, Fronsac', note: 'Our home for the Bordeaux leg' },
    ],
  },
  {
    date: '2022-08-12',
    displayDate: 'Aug 12',
    weekday: 'Friday',
    city: 'bordeaux',
    isTravel: false,
    kicker: 'Saint-Émilion — La Terrasse Rouge',
    events: [
      { time: '13:00', title: 'Lunch at La Terrasse Rouge', note: 'Château La Dominique, 1 La Dominique, 33330 Saint-Émilion · laterrasserouge.com · 15 min from house · Party of 7' },
      { time: '', title: 'Easy afternoon to help with jet lag', note: 'Shopping, swimming, or walking tour of Saint-Émilion town' },
    ],
  },
  {
    date: '2022-08-13',
    displayDate: 'Aug 13',
    weekday: 'Saturday',
    city: 'bordeaux',
    isTravel: false,
    kicker: 'Château La Dauphine wine tasting · Lard et Bouchon',
    events: [
      { time: '15:00', title: 'Wine tasting at Château La Dauphine', note: 'With Benjamin · Owners of Vrai Canon Bouche · Included with rental' },
      { time: '17:30', title: 'Dinner at Lard et Bouchon', note: '22 rue Guadet, 33330 Saint-Émilion · +33 5 57 24 28 53 · lardetbouchon.fr · Party of 8' },
    ],
  },
  {
    date: '2022-08-14',
    displayDate: 'Aug 14',
    weekday: 'Sunday',
    city: 'bordeaux',
    isTravel: false,
    kicker: 'Marché des Capucins · La Tupina',
    events: [
      { time: '', title: 'Morning at Marché des Capucins', note: '"The belly of Bordeaux" — oysters, cheese, foie gras, wine merchants · marchedescapucins.com' },
      { time: '13:00', title: 'Lunch at La Tupina', note: '6 rue Porte de la Monnaie, 33800 Bordeaux · +33 5 56 91 56 37 · latupina.com · 6-min walk from market · Michelin Guide · South-West French cuisine' },
    ],
  },
  {
    date: '2022-08-15',
    displayDate: 'Aug 15',
    weekday: 'Monday',
    city: 'bordeaux',
    isTravel: false,
    kicker: 'Pauillac wine country · Pichon Longueville Baron',
    events: [
      { time: '12:15', title: 'Lunch at Café Lavinal at Cordeilian Bages', note: 'Michelin-starred · Chef Jean-Luc Rocha · "A gastronomic journey through land and sea with the fine wines of Bordeaux"' },
      { time: '14:00', title: 'Pichon Longueville Baron', note: 'Château visit · Pauillac Grand Cru Classé' },
      { time: '19:00', title: 'Dinner at Brasero de Candale', note: 'Two tables booked side by side · Confirmed' },
    ],
  },
  {
    date: '2022-08-16',
    displayDate: 'Aug 16',
    weekday: 'Tuesday',
    city: 'bordeaux',
    isTravel: false,
    kicker: 'Lascaux Caves · Dordogne river cruise · L\'Envers du Décor',
    events: [
      { time: '11:10', title: 'Guided tour of Lascaux Caves', note: 'Cro-Magnon cave art · Vézère Valley · archeologie.culture.gouv.fr/lascaux' },
      { time: '13:00', title: 'Lunch in Sarlat-la-Canéda', note: '"Town of Art and History" — highest density of Historic Monuments in France' },
      { time: '16:30', title: 'Dordogne river cruise with Les Gabares Norbert', note: 'La Roque-Gageac' },
      { time: '20:00', title: 'Dinner at L\'Envers du Décor', note: 'Saint-Émilion · envers-dudecor.com/en/' },
    ],
  },
  {
    date: '2022-08-17',
    displayDate: 'Aug 17',
    weekday: 'Wednesday',
    city: 'travel',
    isTravel: true,
    kicker: 'Bordeaux → Mutriku, Spain',
    events: [
      { time: '', title: 'Breakfast & last morning at Vrai Canon Bouche', note: '' },
      { time: '12:00', title: 'Return rental cars at Gare St. Jean', note: 'Europcar · Hall 3 Belcier N 1 Parking P4 · Confirmation #1148938601' },
      { time: '13:00', title: 'Meet driver at Exit 3, Belcier Hall', note: 'Transfer to Bilbao Airport' },
      { time: '16:30', title: 'Pick up cars at Bilbao Airport (Alamo)', note: 'Volvo XC60 or similar SUV · Confirmation #1538564917 (Mike) / #1538565607 (Lyn)' },
      { time: '', title: 'Arrive Ocean Design Boheme Manor, Mutriku', note: 'Alkoleako Punta 13, 20830 Mutriku · Owner: Joseba Aramburu +34 943 693 902' },
    ],
  },
  {
    date: '2022-08-18',
    displayDate: 'Aug 18',
    weekday: 'Thursday',
    city: 'bilbao',
    isTravel: false,
    kicker: 'Guggenheim · Etxanobe Atelier',
    events: [
      { time: '', title: 'Guggenheim Museum Bilbao', note: 'Frank O. Gehry · titanium-sheathed · Modern & contemporary art · guggenheim-bilbao.eus' },
      { time: '', title: 'Casco Viejo — old quarter', note: 'Shopping, pintxos bars, history' },
      { time: '20:30', title: 'Dinner at Etxanobe Atelier', note: '1-star Michelin · Juan de Ajuriaguerra 8, Bilbao 48009 · +34 944 42 10 71 · ladespensadeletxanobe.com/en/ · Party of 8' },
    ],
  },
  {
    date: '2022-08-19',
    displayDate: 'Aug 19',
    weekday: 'Friday',
    city: 'sansebastian',
    isTravel: false,
    kicker: 'San Sebastián · Arzak ⭐⭐⭐',
    events: [
      { time: '', title: 'La Concha Beach', note: '' },
      { time: '', title: 'Parte Vieja — pintxos bars', note: '' },
      { time: '21:00', title: 'Dinner at Arzak', note: '3-star Michelin · "Exceptional cuisine, worth a special journey" · Alcalde J. Elosegi Hiribidea 273, Donostia 20015 · Party of 8 · arzak.es/en/' },
    ],
  },
  {
    date: '2022-08-20',
    displayDate: 'Aug 20',
    weekday: 'Saturday',
    city: 'mutriku',
    isTravel: false,
    kicker: 'Free day in Mutriku',
    events: [
      { time: '', title: 'Free day', note: 'Mutriku harbour & local beaches · pintxos bars in town' },
    ],
  },
  {
    date: '2022-08-21',
    displayDate: 'Aug 21',
    weekday: 'Sunday',
    city: 'bayonne',
    isTravel: false,
    kicker: 'Villa Arnaga · Bayonne',
    events: [
      { time: '09:30', title: 'Villa Arnaga, Cambo-les-Bains', note: '"Sumptuous" Basque heritage estate' },
      { time: '', title: 'Afternoon in Bayonne', note: 'French-Basque capital · master chocolatiers · Bayonne ham' },
      { time: '19:00', title: 'Dinner at the house, Mutriku', note: '' },
    ],
  },
  {
    date: '2022-08-22',
    displayDate: 'Aug 22',
    weekday: 'Monday',
    city: 'sansebastian',
    isTravel: false,
    kicker: 'San Sebastián · Bernardo Etxea · Pintxos crawl',
    events: [
      { time: '13:00', title: 'Lunch at Bernardo Etxea', note: 'Triunfo 3, Donostia/San Sebastián 20007 · Michelin Guide · Seafood · Party of 8 · bernardoetxea.com' },
      { time: '', title: 'Pintxos crawl — Parte Vieja', note: '' },
    ],
  },
  {
    date: '2022-08-23',
    displayDate: 'Aug 23',
    weekday: 'Tuesday',
    city: 'bilbao',
    isTravel: true,
    kicker: 'Departures · Hotel Ercilla · Txirene',
    events: [
      { time: '', title: 'Check out of Ocean Design Boheme Manor, Mutriku', note: '' },
      { time: '11:30', title: 'Mummy & Daddy: LH 1825 BIO → MUC', note: 'Arrival Munich 13:40 · Onward to KL via Bangkok' },
      { time: '14:00', title: 'Lyn & Oy: VY 1427 BIO → BCN', note: 'Vueling · Arrival Barcelona 15:10 Terminal 1 · Onward to Bangkok Aug 25' },
      { time: '', title: 'Check in: Hotel Ercilla de Bilbao', note: 'Mike, Uwen & Carl · "Hotel forged from the fiery passions of Basque country"' },
      { time: '20:00', title: 'Dinner at Txirene', note: 'Poza Lizentziatuaren 26, Bilbao 48009 · Mike, Uwen & Carl' },
    ],
  },
  {
    date: '2022-08-24',
    displayDate: 'Aug 24',
    weekday: 'Wednesday',
    city: 'travel',
    isTravel: true,
    kicker: 'Bilbao → Frankfurt → San Francisco',
    events: [
      { time: '14:20', title: 'UA 8823 (Lufthansa) BIO → FRA', note: 'Arrival Frankfurt 16:25 · Terminal 1 A Gates · Mike, Uwen & Carl' },
      { time: '17:30', title: 'UA 927 FRA → SFO', note: 'United Polaris Business · Dinner service · Terminal 1 Z Gates' },
      { time: '19:55', title: 'Arrive San Francisco', note: '' },
    ],
  },
];

async function seed() {
  console.log(`Seeding trip: ${TRIP_ID}`);

  await db.collection('trips').doc(TRIP_ID).set(trip);
  console.log('✓ Trip document written');

  const batch = db.batch();
  for (const day of days) {
    const ref = db.collection('trips').doc(TRIP_ID).collection('days').doc(day.date);
    batch.set(ref, day);
  }
  await batch.commit();
  console.log(`✓ ${days.length} day documents written`);

  console.log('Done! Visit travels.luckycommons.com/?trip=bordeaux-spain-2022');
  process.exit(0);
}

seed().catch(err => {
  console.error('Seed failed:', err);
  process.exit(1);
});