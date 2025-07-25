// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";

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
async function handleSignup(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    console.log('Signup form submitted'); // Debugging log

    // Get form input values
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirm-password').value.trim();

    // Basic validation
    if (!email || !password || !confirmPassword) {
        alert('All fields are required.');
        return;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
    }

    try {
        // Create a new user in Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        // User successfully registered
        const user = userCredential.user;

        console.log('User registered:', user);

        // Show success message
        alert('Signed up successfully!');

        // Redirect to login page
        window.location.href = 'login.html';
    } catch (error) {
        console.error('Error during registration:', error.message);
        alert('Failed to create account. Please try again.');
    }
}

// Attach the event listener to the form
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.auth-form');
    if (form) {
        form.addEventListener('submit', handleSignup);
    } else {
        console.error('Form with class "auth-form" not found.');
    }
});