// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: "AIzaSyA-5dr9F8OXvSs4hPlnC5u1WY9KxZ7eGHQ",
  // authDomain: "notion-clone-b5084.firebaseapp.com",
  // projectId: "notion-clone-b5084",
  // storageBucket: "notion-clone-b5084.firebasestorage.app",
  // messagingSenderId: "81135278767",
  // appId: "1:81135278767:web:a00525ddb7baf34c00525a",

  // apiKey: "AIzaSyAYwoU8AAzadCzLsnSxdOohtlLP0S2RztI",
  // authDomain: "notion-clone-b5084.firebaseapp.com",
  // projectId: "notion-clone-b5084",
  // storageBucket: "notion-clone-b5084.firebasestorage.app",
  // messagingSenderId: "81135278767",
  // appId: "1:81135278767:web:2ae8454b5e6c165d00525a",

  apiKey: "AIzaSyCQ3crpXrxzcsJqmvT2V7UQzSZ3ULfG9Z8",
  authDomain: "zafarnotion.firebaseapp.com",
  projectId: "zafarnotion",
  storageBucket: "zafarnotion.firebasestorage.app",
  messagingSenderId: "825854594079",
  appId: "1:825854594079:web:c36952d9d82e2f7bf7d92a",
  measurementId: "G-FRVXKD1SLH",
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };
