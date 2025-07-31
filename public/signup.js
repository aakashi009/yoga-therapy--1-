// Import the shared auth object and Firebase functions
import { auth } from './firebase-config.js';
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

const signupForm = document.getElementById('signup-form');
const messageDisplay = document.getElementById('message-display');

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Clear previous messages
    messageDisplay.textContent = '';
    messageDisplay.className = 'message';

    // --- Basic Validation ---
    if (password.length < 6) {
        messageDisplay.textContent = 'Password must be at least 6 characters long.';
        messageDisplay.classList.add('error');
        return;
    }
    if (password !== confirmPassword) {
        messageDisplay.textContent = 'Passwords do not match.';
        messageDisplay.classList.add('error');
        return;
    }

    // --- Create User with Firebase ---
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up successfully
            const user = userCredential.user;
            console.log('User created successfully:', user);
            
            messageDisplay.textContent = 'Account created! Please go to the login page.';
            messageDisplay.classList.add('success');
            
            // Optional: Redirect to login page after a delay
            setTimeout(() => {
                window.location.href = './index.html';
            }, 2000);
        })
        .catch((error) => {
            console.error("Signup Error:", error.code, error.message);
            // Handle specific errors
            if (error.code === 'auth/email-already-in-use') {
                messageDisplay.textContent = 'This email address is already in use.';
            } else {
                messageDisplay.textContent = 'An error occurred. Please try again.';
            }
            messageDisplay.classList.add('error');
        });
});
