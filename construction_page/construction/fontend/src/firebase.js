import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAOtt-adIFS-XLHYbR6SqxX9sOCtZhFTZc",
  authDomain: "edusync-aba6a.firebaseapp.com",
  projectId: "edusync-aba6a",
  storageBucket: "edusync-aba6a.appspot.com",
  messagingSenderId: "1055910860585",
  appId: "1:1055910860585:web:4f303384d2674293a88938",
  measurementId: "G-0YT49N0GHQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
