import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC_aGSjmFbldAArS7wq97CY2V-PuZarl3I",
    authDomain: "awsomeproject-91925.firebaseapp.com",
    projectId: "awsomeproject-91925",
    storageBucket: "awsomeproject-91925.appspot.com",
    messagingSenderId: "983098055118",
    appId: "1:983098055118:web:1bc42ac4289a18c56eb39f",
    measurementId: "G-PNHM41PC81"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth, db }