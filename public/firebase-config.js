// Import the functions you need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

// Your web app's Firebase configuration
// I have corrected the storageBucket domain to the standard .appspot.com
const firebaseConfig = {
    apiKey: "AIzaSyDXrAKCmdv9u9SGcyFfSaNh-9z_fkUHRcg",
    authDomain: "curethuyoga.firebaseapp.com",
    projectId: "curethuyoga",
    storageBucket: "curethuyoga.appspot.com",
    messagingSenderId: "880241477251",
    appId: "1:880241477251:web:5d6163b47d2a695af07db6",
    measurementId: "G-GKKRGQDXG8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the auth service to be used in other files
export const auth = getAuth(app);
