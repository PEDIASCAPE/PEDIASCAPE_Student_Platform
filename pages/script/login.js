// Import Supabase client
import { supabase } from "./supabase-client.js";

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
        // Sign in the user with Supabase Authentication
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            throw error;
        }

        // User successfully logged in
        const user = data.user;

        console.log('User logged in:', user);

        // Ensure profile row exists
        if (user?.id) {
            await supabase
                .from('profiles')
                .upsert({ user_id: user.id, email: email });
        }

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
