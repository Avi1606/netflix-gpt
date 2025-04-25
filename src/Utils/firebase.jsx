// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
import { getAuth } from "firebase/auth";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAIg7EsY5jKoJCOI_5hygPqu7DpPHgrdZI",
    authDomain: "netflixgpt-e41b5.firebaseapp.com",
    projectId: "netflixgpt-e41b5",
    storageBucket: "netflixgpt-e41b5.firebasestorage.app",
    messagingSenderId: "131667426666",
    appId: "1:131667426666:web:3235a9b3e60cb5e1c7b913",
    measurementId: "G-J2RXE93217"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();