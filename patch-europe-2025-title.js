#!/usr/bin/env node
const admin = require('firebase-admin');
const serviceAccount = require('/Volumes/MacMiniM4-EXT/mikecylee-m4/Downloads/paris-london-2026-firebase-adminsdk-fbsvc-08d317d7ab.json');

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

admin.firestore().collection('trips').doc('europe-2025')
  .update({ title: 'Mediterranean Cruise 2025' })
  .then(() => { console.log('✓ Title updated'); process.exit(0); })
  .catch(err => { console.error(err); process.exit(1); });