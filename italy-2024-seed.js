#!/usr/bin/env node
/**
 * Seed script for italy-2024 — full detail version
 * Run from travel-app/ directory:
 *   node italy-2024-seed.js
 */

const admin = require('firebase-admin');
const serviceAccount = require('/Volumes/MacMiniM4-EXT/mikecylee-m4/Downloads/paris-london-2026-firebase-adminsdk-fbsvc-08d317d7ab.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const TRIP_ID = 'italy-2024';

const trip = {
  title: 'Italy 2024',
  dates: { start: '2024-07-29', end: '2024-08-11' },
  cities: [
    { id: 'rome',     name: 'Rome' },
    { id: 'florence', name: 'Florence' },
    { id: 'siena',    name: 'Siena' },
    { id: 'bologna',  name: 'Bologna' },
  ],
  travelers: ['Mike', 'Uwen', 'Carl'],
  status: 'completed',
};

const days = [
  {
    date: '2024-07-29',
    displayDate: 'Jul 29',
    weekday: 'Monday',
    city: 'travel',
    isTravel: true,
    kicker: 'Toronto → New York → Rome',
    events: [
      { time: '13:15', title: 'AC 8554 YYZ → JFK', note: 'Air Canada · Booking 2T6L94 · Arrive New York 15:04 · Mike, Uwen & Carl' },
      { time: '21:30', title: 'ITA Airways ITA 611 JFK → FCO', note: 'Terminal 1 → Terminal 1 · Seats 2L, 3J, 4L · Non-stop 8h35m · Arrive Rome 12:05 next day' },
    ],
  },
  {
    date: '2024-07-30',
    displayDate: 'Jul 30',
    weekday: 'Tuesday',
    city: 'rome',
    isTravel: true,
    kicker: 'Arrive Rome · Emma\'s',
    events: [
      { time: '12:05', title: 'Arrive Rome Fiumicino (FCO) Terminal 3', note: 'Collect baggage · Taxi to hotel' },
      { time: '', title: 'Check in: Martius Private Suites', note: 'Via degli Uffici del Vicario, 49, 00186 Roma · Reservation 9921 · +39 066784157 · Stay through Aug 2' },
      { time: '', title: 'Explore local neighbourhood', note: 'Galleria Sciarra · Giolitti Ice Cream (Via degli Uffici del Vicario, 40 — adjacent to hotel) · Trevi Fountain' },
      { time: '20:00', title: 'Dinner at Emma\'s', note: 'Via del Monte della Farina, 28, 00186 Roma · +39 06 6476 0475 · Reservation confirmed' },
    ],
  },
  {
    date: '2024-07-31',
    displayDate: 'Jul 31',
    weekday: 'Wednesday',
    city: 'rome',
    isTravel: false,
    kicker: 'Pantheon tour · Armando al Pantheon · CiPASSO',
    events: [
      { time: '09:30', title: 'Meet guide at Basilica Bookshop of San Lorenzo in Lucina', note: 'Piazza di San Lorenzo in Lucina 5A · 8 min walk to Pantheon · Pick up tickets here' },
      { time: '10:00', title: 'Pantheon Guided Tour', note: 'One of the best-preserved ancient Roman buildings · AD 125 · Coffered concrete dome · Oculus' },
      { time: '13:15', title: 'Lunch at Armando al Pantheon', note: 'Salita de\' Crescenzi, 31, 00186 Roma · Gargioli family since 1961 · Traditional Roman & Lazian cuisine · Reservation with CC on file' },
      { time: '', title: 'Chiesa di Sant\'Ignazio di Loyola', note: '17th-century Baroque church · Piazza di Sant\'Ignazio · Trompe l\'œil ceiling frescoes by Andrea Pozzo depicting St Ignatius in glory' },
      { time: '20:30', title: 'Dinner at CiPASSO', note: 'Via Metastasio, 21, 00186 Roma · cipassoitalia.it · Contemporary bistro · Roman traditions with imaginative twists · Reservation confirmed' },
    ],
  },
  {
    date: '2024-08-01',
    displayDate: 'Aug 1',
    weekday: 'Thursday',
    city: 'rome',
    isTravel: false,
    kicker: 'Colosseum tour · Trastevere · Otaleg',
    events: [
      { time: '08:45', title: 'Meet guide at Oppio Caffè, Oppio Park', note: 'Via delle Terme di Tito, Rome · Arrive 15 min early · atelier@mtdecoster.com' },
      { time: '09:00', title: 'Walking Tour of the Colosseum & Roman Forum', note: '70,000-seat amphitheatre · AD 72 · Gladiatorial contests · Optional Palatine Hill' },
      { time: '12:30', title: 'Lunch at La Taverna dei Fori Imperiali', note: 'Trastevere · Quandoo reservation' },
      { time: '20:00', title: 'Dinner at Osteria Der Belli Piras Valentino', note: 'P.za di Sant\'Apollonia, 11, 00153 Roma · +39 06 580 3782 · Trastevere · Reservation required' },
      { time: '', title: 'Ice cream at Otaleg', note: 'Trastevere · Artisanal gelato' },
    ],
  },
  {
    date: '2024-08-02',
    displayDate: 'Aug 2',
    weekday: 'Friday',
    city: 'travel',
    isTravel: true,
    kicker: 'Rome → Florence · St. Regis',
    events: [
      { time: '', title: 'Checkout: Martius Private Suites', note: 'Via degli Uffici del Vicario, 49, Roma' },
      { time: '14:10', title: 'Frecciarossa 9540 Roma Termini → Firenze', note: 'Seats 12A, 12B, 11A · High-speed train ~1h30m' },
      { time: '', title: 'Check in: St. Regis Florence', note: 'Piazza Ognissanti 1, Florence 50123 · Premium King room · Stay through Aug 9' },
      { time: '20:00', title: 'Dinner at Casa Ciabattini', note: 'Via Il Prato 68/R, 50123 Firenze · Reservation via WhatsApp · Traditional Tuscan' },
    ],
  },
  {
    date: '2024-08-03',
    displayDate: 'Aug 3',
    weekday: 'Saturday',
    city: 'florence',
    isTravel: false,
    kicker: 'Uffizi · Cinghiale Bianco · Atto di Vito Mollica',
    events: [
      { time: '09:00', title: 'Uffizi Gallery', note: 'One of the world\'s great art museums · Botticelli\'s Birth of Venus & Primavera · Leonardo, Raphael, Michelangelo · uffizi.it' },
      { time: '13:30', title: 'Lunch at Osteria Cinghiale Bianco', note: 'Borgo S. Jacopo, 43, 50125 Firenze · cinghialebianco.com · AMEX · Reservation confirmed' },
      { time: '20:30', title: 'Dinner at Atto di Vito Mollica', note: 'Palazzo Portinari Salviati, Via del Corso 6, 50122 Firenze · The Fork reservation · $270 deposit · Fine Italian tasting menu' },
    ],
  },
  {
    date: '2024-08-04',
    displayDate: 'Aug 4',
    weekday: 'Sunday',
    city: 'florence',
    isTravel: false,
    kicker: 'Boboli Gardens · L\'Arte di Dory · La Leggenda dei Frati',
    events: [
      { time: '10:00', title: 'Boboli Gardens', note: 'Behind Palazzo Pitti · Amphitheatre, fountains, grottos · Ticket included with Uffizi Pass · uffizi.it/en/boboli-garden · Until 12:30' },
      { time: '13:30', title: 'Lunch at L\'Arte di Dory', note: 'Reservation required · @lartedidory' },
      { time: '20:00', title: 'Dinner at La Leggenda dei Frati', note: 'San Giorgio 6/a, Florence 50125 · +39 055 068 0545 · Michelin Guide · laleggendadeifrati.it · Panoramic views of Florence · Reservation confirmed' },
    ],
  },
  {
    date: '2024-08-05',
    displayDate: 'Aug 5',
    weekday: 'Monday',
    city: 'siena',
    isTravel: false,
    kicker: 'Drive to Siena · Permalico · Osteria 1126',
    events: [
      { time: '09:00', title: 'Car rental pickup at Alamo', note: 'Via Maso Finiguerra 31 R, Florence · VW T-Roc Automatic (Intermediate)' },
      { time: '', title: 'Drive Florence → Siena', note: '~75km · Free parking near Fortress/Stadium on Viale Vittorio Veneto' },
      { time: '12:30', title: 'Lunch at Osteria Permalico', note: 'Costa Larga 4, Siena · +39 0577 41105 · permalico.it · Local Sienese cuisine · Piazza del Campo nearby' },
      { time: '', title: 'Explore Siena', note: 'Piazza del Campo · Duomo di Siena · Palazzo Pubblico · Try: panforte, ricciarelli, pici aglione pasta, wild boar' },
      { time: '19:45', title: 'Dinner at Osteria 1126', note: 'Località Cinciano 2, Poggibonsi · cinciano.it · Contemporary cuisine with local Tuscan ingredients' },
    ],
  },
  {
    date: '2024-08-06',
    displayDate: 'Aug 6',
    weekday: 'Tuesday',
    city: 'bologna',
    isTravel: false,
    kicker: 'Day trip to Bologna · Al Sangiovese · Food stroll',
    events: [
      { time: '08:00', title: 'Return car rental at Alamo', note: 'Via Maso Finiguerra 31 R, Florence' },
      { time: '09:55', title: 'Frecciarossa 9516 Firenze SMN → Bologna Centrale', note: 'Arrive 10:33 · ~38 min' },
      { time: '13:00', title: 'Lunch at Ristorante Al Sangiovese', note: 'Bologna · Traditional Bolognese cuisine' },
      { time: '18:00', title: 'Evening food stroll — Via Pescherie Vecchie', note: '"The Belly of Italy" · Salumeria Simoni (charcuterie) → Osteria Del Sole wine bar → La Baita Vecchia Malga → Mercato di Mezzo · Stop and graze from place to place' },
      { time: '20:30', title: 'Frecciarossa 9567 Bologna Centrale → Firenze SMN', note: 'Depart 20:30 · Arrive Florence 21:04 · Return to St. Regis' },
    ],
  },
  {
    date: '2024-08-07',
    displayDate: 'Aug 7',
    weekday: 'Wednesday',
    city: 'florence',
    isTravel: false,
    kicker: 'Cooking class · La Terrazza · Classical music',
    events: [
      { time: '10:00', title: 'Francesca\'s Cooking Lesson', note: 'Private Florentine cooking class · Traditional Tuscan recipes' },
      { time: '19:00', title: 'Drinks & dessert at La Terrazza Rooftop Bar', note: 'Lungarno Collection · Rooftop terrace overlooking the Arno · Pre-concert aperitivo' },
      { time: '20:30', title: 'Firenze Academy Ensemble — Auditorium Santo Stefano', note: 'Auditorium di Santo Stefano al Ponte Vecchio · Programme: Bach Air, Mozart A Little Night Music, Vivaldi concerti · Until 21:45' },
    ],
  },
  {
    date: '2024-08-08',
    displayDate: 'Aug 8',
    weekday: 'Thursday',
    city: 'florence',
    isTravel: false,
    kicker: 'Accademia · Fat Tire Bike Tour · Bistecca Fiorentina',
    events: [
      { time: '09:00', title: 'Galleria dell\'Accademia', note: 'Michelangelo\'s David (1501-04, 5.17m marble) · Also Prisoners series & Palestrina Pietà · Via Ricasoli, 58-60' },
      { time: '13:45', title: 'Lunch at La Ménagère', note: 'Via de\' Ginori, 8/r, 50123 Florence · Reservation required · Concept restaurant: coffee shop, florist, bistro' },
      { time: '18:00', title: 'Fat Tire Bike Tour of Florence', note: '3 hours · Meet at Via dei Cimatori 9R, 50122 Florence · Arrive 15 min early · Tickets in app · Evening light through historic streets' },
      { time: '20:30', title: 'Dinner at Ristorante dei Rossi', note: 'Specialty: Bistecca Fiorentina (T-bone from Chianina cattle, grilled rare over oak) · Florence' },
    ],
  },
  {
    date: '2024-08-09',
    displayDate: 'Aug 9',
    weekday: 'Friday',
    city: 'travel',
    isTravel: true,
    kicker: 'Florence → Rome · Divinity rooftop dinner',
    events: [
      { time: '', title: 'Checkout: St. Regis Florence', note: 'Piazza Ognissanti 1' },
      { time: '15:48', title: 'Frecciarossa 9421 Firenze SMN → Roma Termini', note: 'Seats 4A, 4B, 3A · Arrive 17:24' },
      { time: '', title: 'Check in: Westin Excelsior Rome', note: 'Via Vittorio Veneto, 125, 00187 Roma · Confirmation 70454121 · Deluxe King · Stay through Aug 11' },
      { time: '20:30', title: 'Dinner at Divinity Restaurant', note: 'The Pantheon Iconic Rome Hotel · Via di S. Chiara, 4/A, 00186 Roma · Rooftop terrace · Views over the Pantheon' },
      { time: '', title: 'Gelateria La Romana', note: 'Late-night gelato stop' },
    ],
  },
  {
    date: '2024-08-10',
    displayDate: 'Aug 10',
    weekday: 'Saturday',
    city: 'rome',
    isTravel: false,
    kicker: 'Vatican Museums · Siciliainbocca · Mirabelle ✦ Michelin',
    events: [
      { time: '09:00', title: 'Vatican Museums & Sistine Chapel', note: 'Corridoio 3 / Passageway 3 · Gallery of Maps · Raphael Rooms · Sistine Chapel (Michelangelo, 1508-12) · St. Peter\'s Basilica' },
      { time: '12:45', title: 'Lunch at Siciliainbocca', note: 'Reservation confirmed · Sicilian cuisine in Rome' },
      { time: '19:00', title: 'Dinner at Mirabelle', note: 'Hotel Splendide Royal, Via Di Porta Pinciana 14, Roma · Leading Hotels of the World · Michelin-recognized · Modern Italian cuisine with panoramic Rome views · Reservation with CC · 24h cancellation policy' },
      { time: '', title: 'Ice cream at Como Il Latte', note: 'Post-dinner gelato · Rome' },
    ],
  },
  {
    date: '2024-08-11',
    displayDate: 'Aug 11',
    weekday: 'Sunday',
    city: 'travel',
    isTravel: true,
    kicker: 'Rome → San Francisco',
    events: [
      { time: '', title: 'Checkout: Westin Excelsior Rome', note: 'Via Vittorio Veneto, 125 · Leonardo Express from Roma Termini (32 min) or taxi (37 min) to FCO' },
      { time: '09:15', title: 'ITA Airways ITA 640 FCO → SFO', note: 'Seats 7H, 7J, 6L · Non-stop 13h · Arrive San Francisco 13:15 (same day) · Mike, Uwen & Carl' },
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

  console.log('Done! Visit travels.luckycommons.com/?trip=italy-2024');
  process.exit(0);
}

seed().catch(err => {
  console.error('Seed failed:', err);
  process.exit(1);
});