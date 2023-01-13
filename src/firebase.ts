import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyAmB-ZOG-2h6oFThi0PvF_t9oXfbFHVciY",
  authDomain: "parhinken.firebaseapp.com",
  databaseURL: "https://sparhinken-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "sparhinken",
  storageBucket: "sparhinken.appspot.com",
  messagingSenderId: "166803273429",
  appId: "1:166803273429:web:5c38bdae2f1eca6af3545c",
  measurementId: "G-5PDM38FTQ4"
});

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export { auth , db};

