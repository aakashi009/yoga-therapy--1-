// Import the shared auth object and Firebase functions
import { auth } from './firebase-config.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

// Get references to the HTML elements
const loginForm = document.getElementById('login-form');
const messageDisplay = document.getElementById('message-display');

// Add an event listener for the form submission
loginForm.addEventListener('submit', (e) => {
    // Prevent the default form submission behavior
    e.preventDefault();

    // Get the user's email and password from the input fields
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Display a "Logging in..." message to the user
    messageDisplay.textContent = 'Logging in...';
    messageDisplay.className = 'message'; // Reset class to remove previous error/success styling

    // Use Firebase to sign the user in
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // This block runs if the login is successful
            const user = userCredential.user;
            console.log('User signed in successfully:', user);
            
            // Show a success message
            messageDisplay.textContent = 'Success! Redirecting...';
            messageDisplay.classList.add('success');
            
            // Redirect to the main page of your React application
            // This is the key change for MERN integration
            setTimeout(() => {
                window.location.href = '/'; 
            }, 1000); // 1-second delay to show the success message

        })
        .catch((error) => {
            // This block runs if the login fails
            console.error("Login Error:", error.code, error.message);

            // Show a user-friendly error message
            messageDisplay.textContent = 'Invalid email or password. Please try again.';
            messageDisplay.classList.add('error');
        });
});
