// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-short-genrator.firebaseapp.com",
  projectId: "ai-short-genrator",
  storageBucket: "ai-short-genrator.firebasestorage.app",
  messagingSenderId: "384588122696",
  appId: "1:384588122696:web:8fd49f7cb09d1dafa8667d",
  measurementId: "G-1E5LH4QE08"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);