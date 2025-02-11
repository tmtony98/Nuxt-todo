// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDv5QzzXQUo4rQrIsr-9Em_HE26d6ClARI",
  authDomain: "todo-app-3ce25.firebaseapp.com",
  projectId: "todo-app-3ce25",
  storageBucket: "todo-app-3ce25.firebasestorage.app",
  messagingSenderId: "830902503758",
  appId: "1:830902503758:web:0a6206885eebaf2dc0361f",
  measurementId: "G-TSEJ9THT94"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
;
export const db = getFirestore(app)