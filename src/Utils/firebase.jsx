// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
import { getAuth } from "firebase/auth";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics only in browser, with measurementId, and over HTTPS
try {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
        const hasMeasurementId = !!firebaseConfig.measurementId && firebaseConfig.measurementId !== 'undefined';
        const isHttps = typeof location !== 'undefined' ? location.protocol === 'https:' : true;
        if (hasMeasurementId && isHttps) {
            getAnalytics(app);
        }
    }
} catch (e) {
    // Silently ignore analytics initialization errors to avoid breaking the app in privacy-focused browsers
    console.warn('Analytics initialization skipped:', e?.message || e);
}

export const auth = getAuth();
