// ============================================================
// assets/firebase-config.js
// Firebase web app configuration for travels.luckycommons.com
//
// To find your config:
//   Firebase Console → Project Settings → Your apps → Web app
//   Copy the firebaseConfig object and paste it below.
// ============================================================

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
import { getFirestore }   from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey:            "AIzaSyBsz14W9nE4fpWuwKsHtWkr0KImEFgf17o",
  authDomain:        "paris-london-2026.firebaseapp.com",
  projectId:         "paris-london-2026",
  storageBucket:     "paris-london-2026.firebasestorage.app",
  messagingSenderId: "771202564912",
  appId:             "1:771202564912:web:1c3cda000d5ee1b299bef5",
  measurementId:     "G-G74W0PQX2K",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
