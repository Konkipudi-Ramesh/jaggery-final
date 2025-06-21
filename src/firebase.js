// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCDENVQbkEnXMtA6cxkDAwGSyQTGejCLDw",
  authDomain: "ecommerce1-792a7.firebaseapp.com",
  projectId: "ecommerce1-792a7",
  storageBucket: "ecommerce1-792a7.firebasestorage.app",
  messagingSenderId: "297595172435",
  appId: "1:297595172435:web:775fec0bc3fa5e06a078a6",
  measurementId: "G-971NLWED6C"
};
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
