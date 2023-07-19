import { initializeApp, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYmwb5SjtGKZyuQ_6TcAx-hFCiviD-Krc",
  authDomain: "gamelink-f87bb.firebaseapp.com",
  projectId: "gamelink-f87bb",
  storageBucket: "gamelink-f87bb.appspot.com",
  messagingSenderId: "934618174500",
  appId: "1:934618174500:web:442ca691cd5e7ae77d74b1"
};

// Initialising Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };