import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "todo-go-go.firebaseapp.com",
  projectId: "todo-go-go",
  storageBucket: "todo-go-go.appspot.com",
  messagingSenderId: "710748477158",
  appId: "1:710748477158:web:c00b856f18f0acb150cd27",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
