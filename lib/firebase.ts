// lib/firebase.ts

import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration.
// This is the same config you use in the public folder.
const firebaseConfig = {
    apiKey: "AIzaSyDXrAKCmdv9u9SGcyFfSaNh-9z_fkUHRcg",
    authDomain: "curethuyoga.firebaseapp.com",
    projectId: "curethuyoga",
    storageBucket: "curethuyoga.appspot.com",
    messagingSenderId: "880241477251",
    appId: "1:880241477251:web:5d6163b47d2a695af07db6",
    measurementId: "G-GKKRGQDXG8"
};

// Initialize Firebase for your Next.js app.
// The 'getApps' check prevents re-initializing the app on every hot-reload.
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// Export the auth service so your components can use it.
export const auth = getAuth(app);
