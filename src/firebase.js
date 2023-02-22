import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBFRN6liNOTdtOPa2Q35xXaJZZBAMieUxo",
  authDomain: "linkedin-clone-ed00a.firebaseapp.com",
  projectId: "linkedin-clone-ed00a",
  storageBucket: "linkedin-clone-ed00a.appspot.com",
  messagingSenderId: "871885401628",
  appId: "1:871885401628:web:ec8d52263dcccfdcdc39d9",
  measurementId: "G-681V00LF7X"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export  { db, auth };