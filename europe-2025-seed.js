// europe-2025-seed.js
// Run from travel-app/ directory: node europe-2025-seed.js
// Requires firebase-admin to be installed in travel-app/

const admin = require('firebase-admin');
const serviceAccount = require('/Volumes/MacMiniM4-EXT/mikecylee-m4/Downloads/paris-london-2026-firebase-adminsdk-fbsvc-08d317d7ab.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const TRIP_ID = 'europe-2025';

// ── Trip document ─────────────────────────────────────────────────────────────

const trip = {
  title: 'European Vacation 2025',
  dates: { start: '2025-08-01', end: '2025-08-17' },
  cities: [
    { id: 'genoa',      name: 'Genoa' },
    { id: 'montecarlo', name: 'Monte Carlo' },
    { id: 'livorno',    name: 'Livorno' },
    { id: 'rome',       name: 'Rome' },
    { id: 'sorrento',   name: 'Sorrento' },
    { id: 'santorini',  name: 'Santorini' },
    { id: 'rhodes',     name: 'Rhodes' },
    { id: 'antalya',    name: 'Antalya' },
    { id: 'bodrum',     name: 'Bodrum' },
    { id: 'patmos',     name: 'Patmos' },
    { id: 'athens',     name: 'Athens' },
  ],
  travelers: [
    'Mike', 'Uwen', 'Carl',
    'Norm', 'Amanda', 'Megan', 'Brodie', 'George', 'Mable',
    'Lyn', 'Poh Thiam', 'Wee Kiat', 'K. Oy',
    'Michelle',
  ],
  status: 'completed',
};

// ── Days ──────────────────────────────────────────────────────────────────────

const days = [
  {
    date: '2025-08-01',
    displayDate: 'Aug 1',
    weekday: 'Friday',
    city: 'travel',
    isTravel: true,
    kicker: 'Travel Day',
    events: [
      { time: '15:15', tz: 'PDT', title: 'AZ 641 departs SFO → FCO', note: 'Mike, Uwen, Carl · arrives Rome 12:15 +1' },
      { time: '17:54', tz: 'EDT', title: 'AC 836 departs YYZ → Munich', note: 'Norm, Amanda, Megan, Brodie, George, Mable · arrives 07:45 +1' },
      { time: '23:25', tz: 'ICT', title: 'TG 900 departs BKK → IST', note: 'Lyn, Poh Thiam, Wee Kiat · arrives Istanbul 05:35 +1' },
    ],
  },
  {
    date: '2025-08-02',
    displayDate: 'Aug 2',
    weekday: 'Saturday',
    city: 'genoa',
    isTravel: false,
    kicker: 'Arrivals in Genoa & Nice',
    events: [
      { time: '07:10', tz: 'TRT',  title: 'TK 1813 departs IST → Nice',       note: 'Lyn, Poh Thiam, Wee Kiat · arrives Nice 09:15' },
      { time: '11:20', tz: 'CEST', title: 'LH 6920 departs MUC → Genoa',      note: 'Norm, Amanda, Megan, Brodie, George, Mable · arrives 12:35' },
      { time: '14:30', tz: 'CEST', title: 'Lunch — Hosteria Grappolo d\'oro', note: 'Mike, Uwen, Carl · near Piazza Navona, Rome' },
      { time: '16:00', tz: '',     title: 'Trevi Fountain',                    note: 'Mike, Uwen, Carl' },
      { time: '17:00', tz: '',     title: 'Ice cream — Come Il Latte',         note: 'Mike, Uwen, Carl · Rome' },
      { time: '17:30', tz: '',     title: 'Transfer Roma Termini → FCO',       note: 'Mike, Uwen, Carl' },
      { time: '21:45', tz: 'CEST', title: 'AZ 1389 departs FCO → Genoa',      note: 'Mike, Uwen, Carl · arrives 22:50' },
      { time: '23:10', tz: 'CEST', title: 'Car service to Hotel Bristol Palace', note: 'Look for sign "Kok-Lee-Kurbat Party"' },
    ],
  },
  {
    date: '2025-08-03',
    displayDate: 'Aug 3',
    weekday: 'Sunday',
    city: 'genoa',
    isTravel: false,
    kicker: 'Day 2 in Genoa',
    events: [
      { time: '20:00', tz: 'CEST', title: 'Dinner — Trattoria Rosmarino', note: '9 people · outdoor seating · classic Ligurian dishes' },
    ],
  },
  {
    date: '2025-08-04',
    displayDate: 'Aug 4',
    weekday: 'Monday',
    city: 'genoa',
    isTravel: false,
    kicker: 'Genoa Culinary Class',
    events: [
      { time: '09:15', tz: 'CEST', title: 'Genoa Culinary Masterclass — Do Eat Better', note: '9 people · meet at Columbus childhood home · gnocchi, focaccia, Canestrelli biscuits' },
      { time: '19:30', tz: 'CEST', title: 'Dinner — Ristorante Santa Teresa',           note: '9 people' },
    ],
  },
  {
    date: '2025-08-05',
    displayDate: 'Aug 5',
    weekday: 'Tuesday',
    city: 'montecarlo',
    isTravel: true,
    kicker: 'Monte Carlo · Ship Embarkation',
    events: [
      { time: '07:40', tz: 'CEST', title: 'Train Genoa Piazza Principe → Ventimiglia', note: 'Regionale 3360 · arrives 10:03 · 9 travelers' },
      { time: '10:48', tz: 'CEST', title: 'Train Ventimiglia → Monte Carlo',           note: 'SNCF TER 86028 · arrives 11:18' },
      { time: '',      tz: '',     title: 'Cruise ship embarkation',                   note: 'Monte Carlo, Monaco' },
    ],
  },
  {
    date: '2025-08-06',
    displayDate: 'Aug 6',
    weekday: 'Wednesday',
    city: 'livorno',
    isTravel: false,
    kicker: 'Livorno · Tuscany',
    events: [
      { time: '09:30', tz: 'CEST', title: 'Minivan pickup at dock',                  note: 'Driver Max · €600 for the day · confirmed' },
      { time: '12:30', tz: 'CEST', title: 'Lunch — La Pineta, Marina di Bibbona',    note: 'Michelin-starred · two seatings of 5' },
      { time: '13:30', tz: '',     title: 'Bolgheri village',                        note: 'Cypress-lined avenue · Super Tuscan wine country' },
      { time: '15:30', tz: 'CEST', title: 'Wine tasting — Guado Al Melo winery',    note: 'Organic Bordeaux blends · 2015 & 2006 vintages' },
      { time: '16:15', tz: 'CEST', title: 'Return to ship',                         note: '' },
    ],
  },
  {
    date: '2025-08-07',
    displayDate: 'Aug 7',
    weekday: 'Thursday',
    city: 'rome',
    isTravel: false,
    kicker: 'Rome Day Trip',
    events: [
      { time: '10:00', tz: 'CEST', title: 'Vans depart Civitavecchia Port',          note: 'Transfeero · 2 vans · ref #78204772 (6 people) + #78204787 (4 people) · 7-hour day' },
      { time: '12:30', tz: 'CEST', title: 'Lunch — Roscioli Salumeria con Cucina',  note: '10 people · Via dei Giubbonari 21 · code BCRZJW3H' },
    ],
  },
  {
    date: '2025-08-08',
    displayDate: 'Aug 8',
    weekday: 'Friday',
    city: 'sorrento',
    isTravel: false,
    kicker: 'Sorrento · Herculaneum',
    events: [
      { time: '08:30', tz: 'CEST', title: 'Marina Piccola — cliff lift to town',            note: 'Porto Sorrento' },
      { time: '10:30', tz: 'CEST', title: 'Herculaneum with archaeologists',                note: 'Raffaele Grand Tour Experience · 7 guests: Mike, Uwen, Carl, Megan, Brodie, Norm, Amanda · 2 hrs' },
      { time: '',      tz: '',     title: 'Lunch — Ristorante Parrucchiano Favorita 1868', note: '' },
      { time: '',      tz: '',     title: 'Ice cream — Raki',                               note: '' },
      { time: '',      tz: '',     title: 'Digital Photo Lesson on ship',                  note: '' },
      { time: '',      tz: '',     title: 'Dinner on ship',                                note: '' },
      { time: '',      tz: '',     title: 'Philip West — ship entertainment',              note: '' },
    ],
  },
  {
    date: '2025-08-09',
    displayDate: 'Aug 9',
    weekday: 'Saturday',
    city: 'travel',
    isTravel: true,
    kicker: 'At Sea',
    events: [
      { time: '19:00', tz: '', title: 'Toscana Restaurant dinner', note: '7 people: Mike, Uwen, Carl, Lyn, K. Oy, Poh Thiam, Wee Kiat' },
      { time: '19:30', tz: '', title: 'Toscana Restaurant dinner', note: '6 people: Norm, Amanda, Megan, Brodie, George, Mable' },
    ],
  },
  {
    date: '2025-08-10',
    displayDate: 'Aug 10',
    weekday: 'Sunday',
    city: 'santorini',
    isTravel: false,
    kicker: 'Santorini',
    events: [
      { time: '',      tz: '',     title: 'Lunch — Mistelli\'s',                      note: '' },
      { time: '14:00', tz: 'EEST', title: 'Private mini van tour — OceanWave Tours', note: 'Call Marinos (+30 697 924 9154) on tender · Akrotiri · Art Space Winery · €550 cash due' },
      { time: '18:30', tz: 'EEST', title: 'Dinner — Aris Restaurant',                note: '14 people · Agiou Mina, Thira · caldera & sunset views · est. 1973' },
    ],
  },
  {
    date: '2025-08-11',
    displayDate: 'Aug 11',
    weekday: 'Monday',
    city: 'rhodes',
    isTravel: false,
    kicker: 'Rhodes',
    events: [
      { time: '',      tz: '',     title: 'Lunch — Nireas',               note: '' },
      { time: '18:30', tz: 'EEST', title: 'Dinner — Jacques Restaurant', note: '14 people across three reservations' },
    ],
  },
  {
    date: '2025-08-12',
    displayDate: 'Aug 12',
    weekday: 'Tuesday',
    city: 'antalya',
    isTravel: false,
    kicker: 'Antalya',
    events: [
      { time: '12:00', tz: 'TRT', title: 'Lunch — Tiritcizade Restoran',   note: '14 people · Ottoman & Anatolian cuisine · Konyaaltı' },
      { time: '',      tz: '',    title: 'Kaleiçi Old Town exploration',    note: 'Hadrian\'s Gate · Ottoman garden cafés · Turkish coffee' },
      { time: '18:30', tz: 'TRT', title: 'Dinner — Polo Grill Restaurant', note: 'Two seatings of 7 + 6' },
    ],
  },
  {
    date: '2025-08-13',
    displayDate: 'Aug 13',
    weekday: 'Wednesday',
    city: 'bodrum',
    isTravel: false,
    kicker: 'Bodrum',
    events: [
      { time: '',      tz: '',    title: 'Lunch — Nokta Doner',        note: '' },
      { time: '',      tz: '',    title: 'Old Town shopping',          note: 'Handwoven towels, jewelry, ceramics, leather sandals' },
      { time: '19:00', tz: 'TRT', title: 'Dinner — Orfoz Restaurant', note: '14 people · seafood degustation · Zeki Müren Cd. · confirmed via WhatsApp' },
    ],
  },
  {
    date: '2025-08-14',
    displayDate: 'Aug 14',
    weekday: 'Thursday',
    city: 'patmos',
    isTravel: false,
    kicker: 'Patmos',
    events: [
      { time: '',      tz: '',     title: 'Monastery of Saint John the Theologian', note: '' },
      { time: '',      tz: '',     title: 'Cave of the Apocalypse',                note: '' },
      { time: '20:00', tz: 'EEST', title: 'Dinner — Red Ginger Restaurant',        note: '14 people · 20:00 (6 people) + 20:30 (4+4 people)' },
    ],
  },
  {
    date: '2025-08-15',
    displayDate: 'Aug 15',
    weekday: 'Friday',
    city: 'athens',
    isTravel: false,
    kicker: 'Athens · Disembarkation',
    events: [
      { time: '08:00', tz: 'EEST', title: 'Disembarkation — Port of Piraeus', note: '' },
      { time: '09:00', tz: 'EEST', title: 'Minibus to King George Hotel',     note: 'Driver Kwstas Eleni +306944330131 · 7 people' },
      { time: '12:15', tz: 'EEST', title: 'Lunch — Mezze Athens',             note: 'Mitropoleos Street · seafood & land meze' },
      { time: '19:30', tz: 'EEST', title: 'Dinner — Tudor Hall',              note: '7th floor, King George Hotel · Acropolis views · 7 people' },
    ],
  },
  {
    date: '2025-08-16',
    displayDate: 'Aug 16',
    weekday: 'Saturday',
    city: 'athens',
    isTravel: false,
    kicker: 'Athens',
    events: [
      { time: '10:25', tz: 'EEST', title: 'TK 1844 departs ATH → IST',   note: 'Poh Thiam, Wee Kiat, Lyn, K. Oy · arrives Istanbul 12:05' },
      { time: '',      tz: '',     title: 'Lunch — The Greco\'s Project', note: '' },
      { time: '19:00', tz: 'EEST', title: 'Acropolis & Parthenon tour',   note: 'Code FDE8FCFFE5' },
      { time: '20:30', tz: 'EEST', title: 'Dinner — Ella\'s Restaurant',  note: '' },
    ],
  },
  {
    date: '2025-08-17',
    displayDate: 'Aug 17',
    weekday: 'Sunday',
    city: 'travel',
    isTravel: true,
    kicker: 'Homeward Bound',
    events: [
      { time: '03:30', tz: 'EEST', title: 'Transfer to Athens Airport', note: 'Mike, Uwen, Carl' },
      { time: '06:05', tz: 'EEST', title: 'AZ 717 departs ATH → FCO',  note: 'Mike, Uwen, Carl · arrives Rome 07:10' },
      { time: '09:20', tz: 'CEST', title: 'AZ 640 departs FCO → SFO',  note: 'Mike, Uwen, Carl · arrives San Francisco 13:25' },
    ],
  },
];

// ── Seed ─────────────────────────────────────────────────────────────────────

async function seed() {
  console.log(`\nSeeding trip: ${TRIP_ID}\n`);

  await db.collection('trips').doc(TRIP_ID).set(trip);
  console.log('  ✓ Trip document written');

  for (const day of days) {
    await db
      .collection('trips').doc(TRIP_ID)
      .collection('days').doc(day.date)
      .set(day);
    console.log(`  ✓ ${day.date}  ${day.kicker}`);
  }

  console.log('\nDone! 🌍\n');
  process.exit(0);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});