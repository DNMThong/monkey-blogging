import { getFirestore } from "@firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD8Ty3Nxc6NTNT9MMU5Mzb0AG3maZ4VQHU",
  authDomain: "monkey-blogging-71163.firebaseapp.com",
  projectId: "monkey-blogging-71163",
  storageBucket: "monkey-blogging-71163.appspot.com",
  messagingSenderId: "645861010590",
  appId: "1:645861010590:web:9e3761009a37125e4f5f8f",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
