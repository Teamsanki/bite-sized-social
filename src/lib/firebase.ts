import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'demo-mode',
  authDomain: "social-bites.firebaseapp.com",
  projectId: "social-bites",
  storageBucket: "social-bites.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_SENDER_ID || 'demo-mode',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || 'demo-mode'
};

// Initialize Firebase only if we have valid credentials
if (!firebaseConfig.apiKey || firebaseConfig.apiKey === 'demo-mode') {
  console.warn('Firebase API key not found. Authentication features will not work.');
}

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);