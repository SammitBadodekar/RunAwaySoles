import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB29SxFiMyZfn46x1idRnSpzkijY62h4Jg",
  authDomain: "runawaysoles-59ae3.firebaseapp.com",
  projectId: "runawaysoles-59ae3",
  storageBucket: "runawaysoles-59ae3.appspot.com",
  messagingSenderId: "364644241832",
  appId: "1:364644241832:web:1400c770e5703166464d9d",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
