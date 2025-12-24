// Import Supabase client
import { supabase } from "./supabase-client.js";

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
        // Create a new user in Supabase Authentication
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        if (error) {
            throw error;
        }

        // User successfully registered
        const user = data.user;

        console.log('User registered:', user);

        // If a session exists, ensure profile row exists (email confirmation may defer session)
        const { data: current } = await supabase.auth.getUser();
        const uid = current?.user?.id;
        if (uid) {
            await supabase
                .from('profiles')
                .upsert({ user_id: uid, email });
        }

        // Show success message
        alert('Signed up successfully! Please check your email for verification.');

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
