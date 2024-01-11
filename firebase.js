import {  initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyATECvYvJQG9q2MI_7oDHOJeFfHSqPKgG4",
  authDomain: "bls-world.firebaseapp.com",
  projectId: "bls-world",
  storageBucket: "bls-world.appspot.com",
  messagingSenderId: "257731098561",
  appId: "1:257731098561:web:2ce61122a07410c0d2e140",
  measurementId: "G-T6T8GM7MM4"
};



const app = initializeApp(firebaseConfig);
const auth = getAuth();

const db = getFirestore(app);
export { auth };

export { db };