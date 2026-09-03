import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

if (!getApps().length) {
  const cred = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  initializeApp(cred ? { credential: cert(cred) } : {});
}
const db = getFirestore();

await db.doc('trips/asia-2026/days/2026-12-22').set({
  date: '2026-12-22', displayDate: 'Dec 22', weekday: 'Tuesday',
  city: 'tokyo', isTravel: false, kicker: 'Day 2 in Tokyo', events: [],
}, { merge: false });

await db.doc('trips/asia-2026/days/2026-12-23').set({
  date: '2026-12-23', displayDate: 'Dec 23', weekday: 'Wednesday',
  city: 'kualalumpur', isTravel: false, kicker: 'KL arrival',
  events: [
    { time: '00:05', tz: 'JST', title: 'Flight NH 885 HND → KLIA', note: 'Seats 4A / 4D / 4C · Boeing 787-8 · 7h 40m' },
    { time: '06:45', tz: 'MYT', title: 'Arrive KLIA', note: 'Kuala Lumpur International Airport' },
  ],
}, { merge: false });

console.log('Done ✓');
process.exit(0);
