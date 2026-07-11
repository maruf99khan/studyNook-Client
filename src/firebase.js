import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyA8_a7eK7zDlA3AzOtF8EHy1h8TO2PqZBE",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "studynook-ccd35.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "studynook-ccd35",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "studynook-ccd35.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "768642497534",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:768642497534:web:5b2d6bb41a486abff4deaf",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
