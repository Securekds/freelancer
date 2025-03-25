import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCQv8XrXpH_PJs_SsRPGrLOw3wmadNW1_Y",
  authDomain: "khadamat-platform.firebaseapp.com",
  projectId: "khadamat-platform",
  storageBucket: "khadamat-platform.appspot.com",
  messagingSenderId: "930174310314",
  appId: "1:930174310314:web:d0a9283e76be281a523dd3",
  measurementId: "G-ZF40YS8K2Q",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // ✅ Correctly initialize auth

export { auth };
