// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {  getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBboypkSqOJ2xv8uJpfOtOn4cUgq8pElnA",
  authDomain: "social-forum-27d0f.firebaseapp.com",
  projectId: "social-forum-27d0f",
  storageBucket: "social-forum-27d0f.appspot.com",
  messagingSenderId: "39730762310",
  appId: "1:39730762310:web:4c1ce83614cbe07830b047"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
