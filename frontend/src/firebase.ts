import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA9lfc-xHOZRBOtGYMgXNWAXzZGVHIkAq0",
  authDomain: "malairia-c920e.firebaseapp.com",
  projectId: "malairia-c920e",
  storageBucket: "malairia-c920e.firebasestorage.app",
  messagingSenderId: "139062193892",
  appId: "1:139062193892:web:8b497f52a1069d3c7c86f1"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
