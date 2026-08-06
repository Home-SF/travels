import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// These values are safe to be public — access is enforced by Firebase security rules.
const firebaseConfig = {
  apiKey: 'AIzaSyBsz14W9nE4fpWuwKsHtWkr0KImEFgf17o',
  authDomain: 'paris-london-2026.firebaseapp.com',
  projectId: 'paris-london-2026',
  storageBucket: 'paris-london-2026.firebasestorage.app',
  messagingSenderId: '771202564912',
  appId: '1:771202564912:web:1c3cda000d5ee1b299bef5',
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
export const db      = getFirestore(app);
export const storage = getStorage(app);
