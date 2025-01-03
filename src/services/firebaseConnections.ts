// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6w5aNJX8-LOEm5x8XlSts-xZMaGGg0Ek",
  authDomain: "tonico-links.firebaseapp.com",
  projectId: "tonico-links",
  storageBucket: "tonico-links.firebasestorage.app",
  messagingSenderId: "994941162716",
  appId: "1:994941162716:web:56ec03983d8b8d3d26d019"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };