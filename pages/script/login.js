// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCgz8plPo9kiZw0e5HrlBpGq0NrfT_6kkY",
    authDomain: "pediascape-6b99b.firebaseapp.com",
    projectId: "pediascape-6b99b",
    storageBucket: "pediascape-6b99b.firebasestorage.app",
    messagingSenderId: "128341831687",
    appId: "1:128341831687:web:e44b694935e7ab37013aa2",
    measurementId: "G-J354SK3B93"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Function to handle the form submission
async function handleLogin(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get form input values
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    // Basic validation
    if (!email || !password) {
        alert('Email and password are required.');
        return;
    }

    try {
        // Sign in the user with Firebase Authentication
        const userCredential = await signInWithEmailAndPassword(auth, email, password);

        // User successfully logged in
        const user = userCredential.user;

        console.log('User logged in:', user);

        // Show success message
        alert('Logged in successfully!');

        // Redirect to the dashboard page
        window.location.href = 'Dashboard.html';
    } catch (error) {
        console.error('Error during login:', error.message);
        alert('Failed to log in. Please check your credentials and try again.');
    }
}

// Attach the event listener to the form
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.auth-form');
    if (form) {
        form.addEventListener('submit', handleLogin);
    } else {
        console.error('Form with class "auth-form" not found.');
    }
});