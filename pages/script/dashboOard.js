// Ensure Firebase is initialized in your project
        import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
        import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";
        // Your Firebase configuration
        const firebaseConfig = {
            apiKey: "AIzaSyCX0hI8o32hBFUchmEwtyeQLbIezmLyauI",
            authDomain: "pediascape-6b99b.firebaseapp.com",
            projectId: "pediascape-6b99b",
            storageBucket: "pediascape-6b99b.firebasestorage.app",
            messagingSenderId: "128341831687",
            appId: "1:128341831687:web:e44b694935e7ab37013aa2",
            measurementId: "G-J354SK3B93"
        };
    
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        const auth = getAuth(firebase.app());
        
document.addEventListener('DOMContentLoaded', () => {
    // Check if Firebase Auth is available
    if (firebase && firebase.auth) {
        console.log(firebase); // This should log the Firebase object if it's loaded correctly

        // Get the currently logged-in user
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in, log the email
                console.log("User is signed in:", user.email);

                // Retrieve the email
                const userEmail = user.email;

                // Select the element where the username should be displayed
                const userNameElement = document.querySelector('.dashcon h3');

                // Update the element with the user's email
                if (userNameElement) {
                    userNameElement.textContent = userEmail;
                } else {
                    console.error("UserName element not found.");
                }
            } else {
                // No user is signed in, log and redirect to login page
                console.log("No user is signed in. Redirecting to login page.");
                window.location.href = 'login.html';
            }
        });
    } else {
        console.error('Firebase is not initialized or Firebase Auth is unavailable.');
    }
});