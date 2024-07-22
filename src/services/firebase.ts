

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAb-s80vFW4pCWqfuk6KaotBH-iEzPk1MA",
  authDomain: "newhelpterceirizacao.firebaseapp.com",
  databaseURL: "https://newhelpterceirizacao-default-rtdb.firebaseio.com",
  projectId: "newhelpterceirizacao",
  storageBucket: "newhelpterceirizacao.appspot.com",
  messagingSenderId: "897302937194",
  appId: "1:897302937194:web:87b126b968240a35dd1413",
  measurementId: "G-M0VEW5DCT3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const database = getDatabase(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
