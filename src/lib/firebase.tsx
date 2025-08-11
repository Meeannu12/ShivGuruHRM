// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // for Firestore
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyDaDHr0c_8FtiuORrtLMUww5gg_ZzxscyE",
  authDomain: "shivguruhrm.firebaseapp.com",
  projectId: "shivguruhrm",
  storageBucket: "shivguruhrm.firebasestorage.app",
  messagingSenderId: "410702183512",
  appId: "1:410702183512:web:8ffd42026593419dd65e2d",
  measurementId: "G-KPRLY26PWJ",
};

// Initialize Firebase
// export const app = initializeApp(firebaseConfig);
// export const auth = firebaseConfig;
// const analytics = getAnalytics(app);
// export const db = getFirestore(app); // Firestore
// export const db = getDatabase(app); // Realtime DB (if using that)

export const app = initializeApp(firebaseConfig);

// 🔥 Auth & DB exports
export const auth = getAuth(app); // 👈 Add this
// export const db = getDatabase(app); // ✅ Realtime Database instance
export const db = getFirestore(app);

export const dbreal = getDatabase(app);
