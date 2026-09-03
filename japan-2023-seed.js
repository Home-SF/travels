#!/usr/bin/env node
/**
 * Seed script for japan-2023 — full detail version
 * Run from travel-app/ directory:
 *   node japan-2023-seed.js
 */

const admin = require('firebase-admin');
const serviceAccount = require('/Volumes/MacMiniM4-EXT/mikecylee-m4/Downloads/paris-london-2026-firebase-adminsdk-fbsvc-08d317d7ab.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const TRIP_ID = 'japan-2023';

const trip = {
  title: 'Japan 2023',
  dates: { start: '2023-04-06', end: '2023-04-16' },
  cities: [
    { id: 'tokyo',  name: 'Tokyo' },
    { id: 'kyoto',  name: 'Kyoto' },
    { id: 'nagano', name: 'Nagano' },
  ],
  travelers: ['Mike', 'Uwen', 'Carl', 'Poh Thiam', 'Wee Kiat'],
  status: 'completed',
};

const days = [
  {
    date: '2023-04-06',
    displayDate: 'Apr 6',
    weekday: 'Thursday',
    city: 'travel',
    isTravel: true,
    kicker: 'Arrivals · Tokyo',
    events: [
      { time: '', title: 'Arrive Tokyo', note: 'Check in: The Kitano Hotel Tokyo · Kojimachi 2-chome, Chiyoda-ku' },
      { time: '19:00', title: 'Dinner at Otako Honten', note: 'Shinjuku · Classic Tokyo oden restaurant · Counter seating around the steaming pot' },
      { time: '21:00', title: 'Nakameguro cherry blossom illuminations', note: 'Meguro River lined with illuminated sakura · Peak hanami season' },
    ],
  },
  {
    date: '2023-04-07',
    displayDate: 'Apr 7',
    weekday: 'Friday',
    city: 'tokyo',
    isTravel: false,
    kicker: 'teamLab Planets · Toyosu Market · Shibuya Sky',
    events: [
      { time: '', title: 'Toyosu Market', note: 'Tokyo\'s main wholesale seafood market · Moved from Tsukiji · Viewing galleries above the tuna auction floor' },
      { time: '', title: 'teamLab Planets', note: 'Toyosu · Immersive digital art museum · Floating in flowers, crystal universe · Advance tickets required' },
      { time: '', title: 'Shibuya Sky', note: 'Rooftop observatory · Shibuya Scramble Square · 229m · 360° views of Tokyo' },
      { time: '19:30', title: 'NAKED Sakura Shinjuku Gyoen', note: 'Nighttime cherry blossom illumination event · Shinjuku Gyoen National Garden · Limited tickets' },
    ],
  },
  {
    date: '2023-04-08',
    displayDate: 'Apr 8',
    weekday: 'Saturday',
    city: 'tokyo',
    isTravel: false,
    kicker: 'Akanezaka Onuma ⭐ · Shinkansen to Kyoto',
    events: [
      { time: '12:00', title: 'Lunch at Akanezaka Onuma', note: '1-star Michelin · Tokyo · Japanese tasting menu' },
      { time: '', title: 'Shinkansen NOZOMI 233', note: 'Tokyo → Kyoto · Departure from Tokyo Station' },
      { time: '', title: 'Check in: The Royal Park Hotel Iconic Kyoto', note: 'Nakagyo Ward, Kyoto · Central location near Nishiki Market' },
    ],
  },
  {
    date: '2023-04-09',
    displayDate: 'Apr 9',
    weekday: 'Sunday',
    city: 'kyoto',
    isTravel: false,
    kicker: 'Uji · Byōdōin · Nishiki Market · Kushi Tanaka',
    events: [
      { time: '09:00', title: 'Day trip to Uji', note: '20 min south of Kyoto · Famous for matcha tea' },
      { time: '09:30', title: 'Byōdōin Temple', note: 'UNESCO World Heritage Site · Phoenix Hall depicted on the ¥10 coin · 998 AD · ujibyodoin.or.jp' },
      { time: '', title: 'Ujigami Shrine', note: 'Oldest surviving Shinto shrine in Japan · UNESCO · Early Heian period' },
      { time: '', title: 'The Tale of Genji Museum', note: 'Uji · Dedicated to Japan\'s 11th-century classic novel · Genji set partly in Uji' },
      { time: '13:00', title: 'Lunch at Nishiki Market', note: '"Kyoto\'s Kitchen" · 400-year-old covered shopping street · Fresh tofu, pickles, street food' },
      { time: '19:00', title: 'Dinner at Kushi Tanaka', note: 'Michelin Bib Gourmand · Yakitori & kushiyaki · Kyoto' },
    ],
  },
  {
    date: '2023-04-10',
    displayDate: 'Apr 10',
    weekday: 'Monday',
    city: 'kyoto',
    isTravel: false,
    kicker: 'Muromachi Wakuden ⭐ · Ryoan-Ji · Kinkaku-Ji · Gion',
    events: [
      { time: '12:00', title: 'Lunch at Muromachi Wakuden', note: '1-star Michelin · ¥22,000 per person · Private room · Kaiseki cuisine · One of Kyoto\'s most revered traditional restaurants' },
      { time: '14:30', title: 'Ryoan-Ji', note: 'UNESCO World Heritage Site · Zen temple · Famous karesansui (dry landscape) rock garden · 15 rocks arranged so one is always hidden' },
      { time: '15:30', title: 'Kinkaku-Ji', note: 'Temple of the Golden Pavilion · UNESCO · Top two floors entirely covered in gold leaf · Reflected in Kyokochi Pond' },
      { time: '18:00', title: 'Evening in Gion', note: 'Kyoto\'s geisha district · Hanamikōji Street · Historic machiya townhouses · Lantern-lit evenings' },
    ],
  },
  {
    date: '2023-04-11',
    displayDate: 'Apr 11',
    weekday: 'Tuesday',
    city: 'kyoto',
    isTravel: false,
    kicker: 'Fushimi Inari · Miyako Odori · Hyotei ⭐⭐⭐',
    events: [
      { time: '09:00', title: 'Fushimi Inari Taisha', note: 'Head shrine of Inari · Thousands of vermillion torii gates winding up Mt. Inari · Best visited early morning' },
      { time: '11:00', title: 'Tofuku-Ji', note: 'Zen Buddhist temple · Famous autumn maple garden · Impressive Sanmon gate (National Treasure)' },
      { time: '12:00', title: 'Miyako Odori', note: '"Cherry Blossom Dance" · Annual Gion geiko & maiko dance performance · Gion Kobu Kaburenjo Theater · April only' },
      { time: '17:00', title: 'Dinner at Hyotei', note: '3-star Michelin · "Exceptional cuisine, worth a special journey" · Party of 7 · Nanzenji area · 450+ year history · hyotei.co.jp · One of Kyoto\'s most storied kaiseki restaurants' },
    ],
  },
  {
    date: '2023-04-12',
    displayDate: 'Apr 12',
    weekday: 'Wednesday',
    city: 'travel',
    isTravel: true,
    kicker: 'Kyoto → Nagano · Chousenkaku Kameya',
    events: [
      { time: '12:00', title: 'Lunch at Tan Restaurant', note: 'Wakuden group restaurant · Kyoto · Farewell lunch before departure' },
      { time: '', title: 'Shinkansen NOZOMI 24', note: 'Kyoto → Nagoya' },
      { time: '', title: 'Limited Express Shinano 17', note: 'Nagoya → Shiojiri → Matsumoto area · Scenic Central Alps route' },
      { time: '', title: 'Check in: Chousenkaku Kameya', note: 'Traditional ryokan · Suwa, Nagano · Onsen · Lake Suwa views · 3 nights' },
    ],
  },
  {
    date: '2023-04-13',
    displayDate: 'Apr 13',
    weekday: 'Thursday',
    city: 'nagano',
    isTravel: false,
    kicker: 'Snow Monkey Park · Matsumoto Castle hanami',
    events: [
      { time: '09:00', title: 'Jigokudani Monkey Park', note: 'Snow monkeys (Japanese macaques) bathing in natural hot spring pools · Yamanouchi, Nagano · jigokudani-yaenkoen.co.jp' },
      { time: '12:00', title: 'Ogawa No Sho', note: 'Local Nagano specialty: oyaki (stuffed grilled dumplings) · Traditional farmhouse setting' },
      { time: '14:00', title: 'Matsumoto Castle', note: '"Crow Castle" · National Treasure · One of Japan\'s 12 original castles · Black-and-white architecture · Cherry blossoms in the castle grounds' },
      { time: '19:00', title: 'Dinner at Chousenkaku Kameya', note: 'Ryokan kaiseki dinner · Shinshu cuisine · Local mountain vegetables and Suwa produce' },
    ],
  },
  {
    date: '2023-04-14',
    displayDate: 'Apr 14',
    weekday: 'Friday',
    city: 'nagano',
    isTravel: false,
    kicker: 'Narai-Juku · Takato Castle Ruins hanami',
    events: [
      { time: '09:30', title: 'Narai-Juku', note: 'Best-preserved post town on the old Nakasendo highway · Edo-period wooden townhouses · Nagano Alps · naraijuku.net' },
      { time: '13:00', title: 'Takato Castle Ruins Park', note: 'Renowned for "Takato kohigan" cherry trees — famous for their deep pink color · Over 1,500 trees · Ina, Nagano · One of Japan\'s Top 3 Cherry Blossom Spots' },
      { time: '19:00', title: 'Dinner at Chousenkaku Kameya', note: 'Ryokan kaiseki dinner · Shinshu cuisine' },
    ],
  },
  {
    date: '2023-04-15',
    displayDate: 'Apr 15',
    weekday: 'Saturday',
    city: 'travel',
    isTravel: true,
    kicker: 'Suwa → Tokyo · Daigo RAN Kaiseki ⭐⭐',
    events: [
      { time: '', title: 'Checkout: Chousenkaku Kameya', note: 'Ship bags to Tokyo hotel' },
      { time: '10:33', title: 'Azusa 18 Limited Express dep Kami-Suwa', note: 'Car 9, Seats 1A–3A · ¥38,520 total · Arrive Shinjuku 12:42' },
      { time: '13:00', title: 'Arrive Shinjuku · Uber to hotel', note: 'Check in: Karaksa Hotel Premier Tokyo Ginza · 1-6-6 Shimbashi, Minato-ku · Confirmation 3505.671.098 · 2 rooms' },
      { time: '18:00', title: 'Dinner at Daigo RAN Kaiseki', note: '2-star Michelin · 2-3-1 Atago, Minato City, Tokyo · Shojin ryori (vegetarian Buddhist cuisine with contemporary influences) · Party of 7' },
    ],
  },
  {
    date: '2023-04-16',
    displayDate: 'Apr 16',
    weekday: 'Sunday',
    city: 'travel',
    isTravel: true,
    kicker: 'Departures · Owl Cafe · HND',
    events: [
      { time: '', title: 'Checkout: Karaksa Hotel Premier Tokyo Ginza', note: '' },
      { time: '14:00', title: 'Owl Cafe Tokyo', note: 'Reservation for 3 · Akiba Fukurou · 67 Kanda Neribeicho, Chiyoda-ku · Near Akihabara Station · akiba2960.com' },
      { time: '14:30', title: 'Poh Thiam & Wee Kiat: car to HND', note: 'Heycars booking #34385635 · ~24 min · Flight HND→Chicago→Toronto' },
      { time: '20:00', title: 'Uwen, Mike & Carl: car to HND', note: 'Heycars booking #38155545' },
      { time: '00:30', title: 'ANA NH106 HND → LAX', note: 'Mon Apr 17 · Business class · 10h 15m · Uwen, Mike & Carl · Connecting UA 1200 LAX→SFO' },
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

  console.log('Done! Visit travels.luckycommons.com/?trip=japan-2023');
  process.exit(0);
}

seed().catch(err => {
  console.error('Seed failed:', err);
  process.exit(1);
});