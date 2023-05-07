// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

//Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_NqHebAmy0-Y9yZPGcidqbOtH1gfbtOg",
  authDomain: "youchat-422a4.firebaseapp.com",
  projectId: "youchat-422a4",
  storageBucket: "youchat-422a4.appspot.com",
  messagingSenderId: "329682312052",
  appId: "1:329682312052:web:f15898debeca0c831b2a21",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth();

export { db, auth };
