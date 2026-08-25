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
  // ⚠️  Replace with your actual Firebase web app config:
  apiKey:            "YOUR_API_KEY",
  authDomain:        "paris-london-2026.firebaseapp.com",
  projectId:         "paris-london-2026",
  storageBucket:     "paris-london-2026.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId:             "YOUR_APP_ID",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
