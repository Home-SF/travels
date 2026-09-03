import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';

if (!getApps().length) {
  const cred = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  initializeApp(cred ? { credential: cert(cred) } : {});
}
const db = getFirestore();

// Add San Francisco to trip cities array (prepend before Tokyo)
await db.doc('trips/asia-2026').update({
  cities: [
    { id: 'sanfrancisco', name: 'San Francisco' },
    { id: 'tokyo',        name: 'Tokyo' },
    { id: 'kualalumpur',  name: 'Kuala Lumpur' },
    { id: 'singapore',    name: 'Singapore' },
  ],
});

// Dec 19 — departure day from San Francisco
await db.doc('trips/asia-2026/days/2026-12-19').set({
  date: '2026-12-19', displayDate: 'Dec 19', weekday: 'Saturday',
  city: 'sanfrancisco', isTravel: false, kicker: 'Departure day',
  events: [
    { time: '16:45', tz: 'PST', title: 'Flight ZG 025 SFO → NRT', note: 'Seats 5K / 5D / 5G · departs 4:45 PM' },
  ],
}, { merge: false });

console.log('Done ✓');
process.exit(0);
