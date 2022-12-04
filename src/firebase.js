// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1hIwjaCirEScTvm-8UCIBtgtD5xEhtBo",
  authDomain: "gestion-des-notes-1eb49.firebaseapp.com",
  databaseURL: "https://gestion-des-notes-1eb49-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "gestion-des-notes-1eb49",
  storageBucket: "gestion-des-notes-1eb49.appspot.com",
  messagingSenderId: "156745760016",
  appId: "1:156745760016:web:cf7f6d95c150507967f995"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);