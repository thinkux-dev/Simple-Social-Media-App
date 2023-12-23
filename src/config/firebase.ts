// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZz1ElV_lGiDb_FDymmFjnzKe7ixcugxI",
  authDomain: "react-course-73f7d.firebaseapp.com",
  projectId: "react-course-73f7d",
  storageBucket: "react-course-73f7d.appspot.com",
  messagingSenderId: "1032236122492",
  appId: "1:1032236122492:web:5516f2ef752e06b7bd24f9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);