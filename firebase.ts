// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-5dr9F8OXvSs4hPlnC5u1WY9KxZ7eGHQ",
  authDomain: "notion-clone-b5084.firebaseapp.com",
  projectId: "notion-clone-b5084",
  storageBucket: "notion-clone-b5084.firebasestorage.app",
  messagingSenderId: "81135278767",
  appId: "1:81135278767:web:a00525ddb7baf34c00525a",
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };
