import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
initializeApp({ credential: cert(process.env.GOOGLE_APPLICATION_CREDENTIALS) });
const db = getFirestore();
await db.doc('trips/asia-2026/days/2026-12-22').update({
  kicker: 'Travel day — overnight to KL',
  events: [{ time: '00:05', title: 'Flight NH 885 HND → KUL', note: 'Departs 12:05 AM · Seats 4A / 4D / 4C · Boeing 787-8' }],
});
await db.doc('trips/asia-2026/days/2026-12-23').update({
  events: [{ time: '06:45', title: 'Arrive KLIA', note: 'Arrives 6:45 AM MYT' }],
});
console.log('Done ✓');
