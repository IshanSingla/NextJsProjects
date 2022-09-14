import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth, onAuthStateChanged} from 'firebase/auth'

// const clientCredentials = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
// };
export const firebaseConfig = {
  apiKey: "AIzaSyB-iSA5cwC3oNF4ytR0isNQfGcL4TJ6tzM",
  authDomain: "githubapprover.firebaseapp.com",
  projectId: "githubapprover",
  storageBucket: "githubapprover.appspot.com",
  messagingSenderId: "1015504703342",
  appId: "1:1015504703342:web:4286ba7476b3f70f41bb7f",
  measurementId: "G-F2Y30LH030",
};

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)

export const auth = getAuth(app);
