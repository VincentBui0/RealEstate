// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "realestate-7e604.firebaseapp.com",
  projectId: "realestate-7e604",
  storageBucket: "realestate-7e604.appspot.com",
  messagingSenderId: "242061639633",
  appId: "1:242061639633:web:89bf9fc413e42571932af0",
  measurementId: "G-PERNN9423E"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);