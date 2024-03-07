
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDfGtyudWyK4TXBFCsVnBpgFbIw6EvnBVM",
  authDomain: "matwise-142e6.firebaseapp.com",
  projectId: "matwise-142e6",
  storageBucket: "matwise-142e6.appspot.com",
  messagingSenderId: "652132048218",
  appId: "1:652132048218:web:6904e84596c19e5b8de763",
  measurementId: "G-P9J52V9C9Q"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);


export { app, auth, db, storage };
