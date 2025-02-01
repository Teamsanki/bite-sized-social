import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCWfoNPl2TQke0v9YuBSWJxQRU9PWvvVXo",
  authDomain: "social-bite-skofficial.firebaseapp.com",
  databaseURL: "https://social-bite-skofficial-default-rtdb.firebaseio.com",
  projectId: "social-bite-skofficial",
  storageBucket: "social-bite-skofficial.appspot.com",
  messagingSenderId: "239722707022",
  appId: "1:239722707022:web:57d9b173f2163e85be2b1f",
  measurementId: "G-EJE8L74022"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);