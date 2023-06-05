import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyANIJu9YXvLDXfPceFNeb3dOcTjTtlHj14",
  authDomain: "runawaysoles-4e514.firebaseapp.com",
  projectId: "runawaysoles-4e514",
  storageBucket: "runawaysoles-4e514.appspot.com",
  messagingSenderId: "43763524589",
  appId: "1:43763524589:web:d7883208a1d4c1c83f7de4",
  measurementId: "G-BQ5K724C8L",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
