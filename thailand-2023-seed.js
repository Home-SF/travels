#!/usr/bin/env node
/**
 * Seed script for thailand-2023 — full detail version
 * Run from travel-app/ directory:
 *   node thailand-2023-seed.js
 */

const admin = require('firebase-admin');
const serviceAccount = require('/Volumes/MacMiniM4-EXT/mikecylee-m4/Downloads/paris-london-2026-firebase-adminsdk-fbsvc-08d317d7ab.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const TRIP_ID = 'thailand-2023';

const trip = {
  title: 'Thailand 2023',
  dates: { start: '2023-12-17', end: '2024-01-02' },
  cities: [
    { id: 'bangkok',    name: 'Bangkok' },
    { id: 'pattaya',    name: 'Pattaya' },
    { id: 'udonthani',  name: 'Udon Thani' },
  ],
  travelers: ['Mike', 'Uwen', 'Carl', 'Lyn', 'Mummy', 'Daddy', 'Aunty Poh Lian', 'Bee Ling', 'Jerilyn', 'Ananth', 'Aunty Jennifer', 'Uncle Hong', 'Shannon'],
  status: 'completed',
};

const days = [
  {
    date: '2023-12-17',
    displayDate: 'Dec 17',
    weekday: 'Sunday',
    city: 'travel',
    isTravel: true,
    kicker: 'Arrivals · Bangkok',
    events: [
      { time: '19:00', title: 'Aunty Poh Lian & Bee Ling arrive Suvarnabhumi', note: 'Scoot TR 616 from Singapore · Fast Track & Golf Cart booked' },
      { time: '', title: 'Stay: Baan Lux Sathorn', note: "82/15 Soi Mek Sawat, Bangkok 10120 · Lyn's home · Near Sathorn Soi 1" },
    ],
  },
  {
    date: '2023-12-18',
    displayDate: 'Dec 18',
    weekday: 'Monday',
    city: 'travel',
    isTravel: true,
    kicker: 'Mike, Uwen & Carl arrive · Seven Flavors Steam',
    events: [
      { time: '16:20', title: 'Mike, Uwen & Carl arrive Suvarnabhumi', note: 'Japan Airlines JAL 31 from Haneda' },
      { time: '19:00', title: 'Dinner at Seven Flavors Steam', note: 'Bangkok · Welcome dinner' },
    ],
  },
  {
    date: '2023-12-19',
    displayDate: 'Dec 19',
    weekday: 'Tuesday',
    city: 'bangkok',
    isTravel: false,
    kicker: 'Bangkok · Kempinski Sindhorn breakfast',
    events: [
      { time: '08:00', title: 'Breakfast at Kempinski Hotel Sindhorn Bangkok', note: 'Optional · Langsuan Road · Luxury hotel buffet breakfast' },
      { time: '', title: 'Explore Bangkok', note: 'Temples, markets, malls · Baan Lux Sathorn base' },
    ],
  },
  {
    date: '2023-12-20',
    displayDate: 'Dec 20',
    weekday: 'Wednesday',
    city: 'bangkok',
    isTravel: false,
    kicker: 'Silom Thai Cooking School',
    events: [
      { time: '08:45', title: 'Silom Thai Cooking School', note: '6/14 Decho Road, Bangrak, Bangkok 10500 · silomthaicooking.com · Market tour + hands-on cooking · Menu: tom yum goong, pad see ew, green curry, sticky rice with mango' },
    ],
  },
  {
    date: '2023-12-21',
    displayDate: 'Dec 21',
    weekday: 'Thursday',
    city: 'bangkok',
    isTravel: false,
    kicker: 'Bangkok · Le Meridien dinner',
    events: [
      { time: '', title: 'Explore Bangkok', note: 'Chatuchak Weekend Market nearby · Lumphini Park · Floating markets' },
      { time: '19:00', title: 'Dinner at Le Meridien Surawongse', note: 'Optional buffet dinner · Surawong Road, Bang Rak' },
    ],
  },
  {
    date: '2023-12-22',
    displayDate: 'Dec 22',
    weekday: 'Friday',
    city: 'bangkok',
    isTravel: false,
    kicker: 'Samlor ✦ Bib Gourmand',
    events: [
      { time: '', title: 'Yaowarat — Bangkok Chinatown', note: 'Street food, gold shops, old temples · Evening atmosphere at Chinatown' },
      { time: '20:00', title: 'Dinner at Samlor', note: 'Michelin Bib Gourmand · Party of 8 · Contemporary Thai' },
    ],
  },
  {
    date: '2023-12-23',
    displayDate: 'Dec 23',
    weekday: 'Saturday',
    city: 'bangkok',
    isTravel: false,
    kicker: 'Samrub Samrub Thai · Michelin Guide',
    events: [
      { time: '', title: 'Bangkok day', note: 'Asiatique riverfront · floating market · shopping malls' },
      { time: '20:00', title: 'Dinner at Samrub Samrub Thai', note: 'Michelin Guide · Party of 7 · Thai heritage cuisine' },
    ],
  },
  {
    date: '2023-12-24',
    displayDate: 'Dec 24',
    weekday: 'Sunday',
    city: 'travel',
    isTravel: true,
    kicker: 'Bangkok → Pattaya · More arrivals',
    events: [
      { time: '13:30', title: 'Aunty Jennifer, Uncle Hong & Shannon arrive Don Muang', note: 'Thai Lion Air SL 101 from Singapore' },
      { time: '', title: 'Drive Bangkok → Tamarind Exclusive Villas, Pattaya', note: '226 Bang Sare, Sattahip District, Chon Buri 20250 · ~2h drive' },
      { time: '18:40', title: 'Jerilyn & Ananth arrive Suvarnabhumi', note: 'Emirates EK 372 from Dubai' },
      { time: '19:30', title: 'Christmas Eve welcome dinner at Tamarind Villas', note: 'Full group · Pattaya' },
    ],
  },
  {
    date: '2023-12-25',
    displayDate: 'Dec 25',
    weekday: 'Monday',
    city: 'pattaya',
    isTravel: false,
    kicker: 'Christmas Day Brunch · Hilton Pattaya',
    events: [
      { time: '12:00', title: 'Christmas Brunch at Hilton Pattaya', note: 'Booked · Party of 13 · Beachfront hotel · Buffet · Pattaya Beach Road' },
      { time: '', title: 'Afternoon at Tamarind Villas', note: 'Pool, beach, villa relaxation' },
      { time: '19:00', title: 'Christmas evening at Tamarind Villas', note: '' },
    ],
  },
  {
    date: '2023-12-26',
    displayDate: 'Dec 26',
    weekday: 'Tuesday',
    city: 'pattaya',
    isTravel: false,
    kicker: 'Island Hopping · Koh Larn',
    events: [
      { time: '08:00', title: 'Island Hopping — Koh Larn (Coral Island)', note: 'TBC · 6 beaches · Parasailing, snorkelling · Ferry from Pattaya pier · "Bamboo Island" Ko Phai also option' },
      { time: '19:00', title: 'Dinner at Tamarind Villas', note: '' },
    ],
  },
  {
    date: '2023-12-27',
    displayDate: 'Dec 27',
    weekday: 'Wednesday',
    city: 'pattaya',
    isTravel: false,
    kicker: 'Pattaya free day',
    events: [
      { time: '', title: 'Free day in Pattaya', note: 'Sanctuary of Truth · Nong Nooch Tropical Garden · Pattaya Floating Market · Walking Street' },
      { time: '19:00', title: 'Dinner at Tamarind Villas', note: '' },
    ],
  },
  {
    date: '2023-12-28',
    displayDate: 'Dec 28',
    weekday: 'Thursday',
    city: 'pattaya',
    isTravel: false,
    kicker: 'Family Photoshoot · Celebration Dinner',
    events: [
      { time: '16:00', title: 'Family photoshoot at Tamarind Villas', note: 'Full participation appreciated · Tamarind Exclusive Villas, Bang Sare' },
      { time: '19:00', title: 'Celebration dinner at Tamarind Villas', note: 'Family gathering dinner · Full group' },
    ],
  },
  {
    date: '2023-12-29',
    displayDate: 'Dec 29',
    weekday: 'Friday',
    city: 'travel',
    isTravel: true,
    kicker: 'Pattaya → Bangkok · Nusara',
    events: [
      { time: '', title: 'Return drive Pattaya → Bangkok', note: 'Check out Tamarind Exclusive Villas · ~2h' },
      { time: '17:10', title: 'Aunty Jennifer, Uncle Hong & Shannon depart Don Muang', note: 'Thai Lion Air SL 104 to Singapore' },
      { time: '21:00', title: 'Dinner at Nusara', note: "Asia's 50 Best Restaurants · Party of 6 · Bangkok · Chef Thitid Tassanakajohn's Thai tasting menu" },
    ],
  },
  {
    date: '2023-12-30',
    displayDate: 'Dec 30',
    weekday: 'Saturday',
    city: 'bangkok',
    isTravel: false,
    kicker: 'Marriott lunch · Vijit Chao Phraya River Light Show',
    events: [
      { time: '12:00', title: 'Lunch at Marriott Marquis Queen\'s Park Sukhumvit', note: 'Optional buffet lunch · Sukhumvit Soi 22' },
      { time: '19:00', title: 'Vijit Chao Phraya River Light Show', note: '7–9 PM · 7 main areas along the Chao Phraya · "Several spectacular performances along the riverside" · tourismthailand.org/vijit-chao-phraya-2023' },
    ],
  },
  {
    date: '2023-12-31',
    displayDate: 'Dec 31',
    weekday: 'Sunday',
    city: 'bangkok',
    isTravel: false,
    kicker: 'New Year\'s Eve · Blue by Alain Ducasse ⭐',
    events: [
      { time: '20:30', title: 'New Year\'s Eve dinner at Blue by Alain Ducasse', note: '1-star Michelin · Party of 10 · French haute cuisine · Bangkok · Chef Wilfrid Hocquet · iconsiam.com' },
      { time: '23:00', title: 'New Year\'s Eve countdown', note: 'Bangkok celebrations · Chao Phraya River fireworks' },
    ],
  },
  {
    date: '2024-01-01',
    displayDate: 'Jan 1',
    weekday: 'Monday',
    city: 'travel',
    isTravel: true,
    kicker: 'Departures · New Year\'s Day',
    events: [
      { time: '08:05', title: 'Mike, Uwen & Carl depart Suvarnabhumi', note: 'Japan Airlines JAL 708 to Haneda' },
      { time: '16:40', title: 'Jerilyn & Ananth depart Don Muang', note: 'Thai AirAsia FD 351 to Singapore' },
    ],
  },
  {
    date: '2024-01-02',
    displayDate: 'Jan 2',
    weekday: 'Tuesday',
    city: 'udonthani',
    isTravel: true,
    kicker: 'Udon Thani · Monk Visit',
    events: [
      { time: '', title: 'Full day — Udon Thani Monk Visit', note: 'Paying respects to a highly revered monk · Full day pilgrimage · Udon Thani, northeastern Thailand' },
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

  console.log('Done! Visit travels.luckycommons.com/?trip=thailand-2023');
  process.exit(0);
}

seed().catch(err => {
  console.error('Seed failed:', err);
  process.exit(1);
});