// navbar.js - Firebase Authentication for Navbar
import { initializeApp } from "https://cdnjs.cloudflare.com/ajax/libs/firebase/10.6.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://cdnjs.cloudflare.com/ajax/libs/firebase/10.6.0/firebase-auth.js";

// Your Firebase configuration - replace with your actual config
const firebaseConfig = {
    apiKey: "AIzaSyCgz8plPo9kiZw0e5HrlBpGq0NrfT_6kkY",
    authDomain: "pediascape-6b99b.firebaseapp.com",
    projectId: "pediascape-6b99b",
    storageBucket: "pediascape-6b99b.appspot.com",
    messagingSenderId: "128341831687",
    appId: "1:128341831687:web:e44b694935e7ab37013aa2",
    measurementId: "G-J354SK3B93"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// DOM Elements
const profileLogo = document.querySelector('.profilelogo');
const userInitials = document.getElementById('userInitials');
const userMenu = document.getElementById('userMenu');
const logoutButton = document.getElementById('logoutButton');

// Function to generate user avatar with initials
function createUserAvatar(user) {
  if (!userInitials) return; // Safety check
  
  // Create initials from user's email or displayName
  let initials = "U"; // Default initial
  
  if (user.displayName) {
    const nameParts = user.displayName.split(' ');
    if (nameParts.length >= 2) {
      initials = `${nameParts[0][0]}${nameParts[1][0]}`;
    } else {
      initials = nameParts[0][0];
    }
  } else if (user.email) {
    initials = user.email[0].toUpperCase();
  }
  
  // Generate a color based on the user's UID
  const hue = Math.abs(hashCode(user.uid) % 360);
  const color = `hsl(${hue}, 70%, 60%)`;
  
  // Apply styles to the avatar
  userInitials.style.display = 'flex';
  userInitials.style.backgroundColor = color;
  userInitials.style.color = '#fff';
  userInitials.style.width = '40px';
  userInitials.style.height = '40px';
  userInitials.style.borderRadius = '50%';
  userInitials.style.justifyContent = 'center';
  userInitials.style.alignItems = 'center';
  userInitials.style.fontWeight = 'bold';
  userInitials.style.fontSize = '18px';
  userInitials.style.cursor = 'pointer';
  userInitials.textContent = initials;
  
  // Hide the profile.svg
  if (profileLogo) {
    profileLogo.style.display = 'none';
  }
}

// Simple hash function for generating color from UID
function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

// Toggle user menu
function toggleUserMenu() {
  if (userMenu) {
    userMenu.style.display = userMenu.style.display === 'block' ? 'none' : 'block';
  }
}

// Set up auth state observer
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    console.log("User is signed in:", user.email);
    
    // Create user avatar with initials
    createUserAvatar(user);
    
    // Show user menu elements if they exist
    if (userInitials) {
      userInitials.style.display = 'flex';
    }
    
    // Hide profile.svg
    if (profileLogo) {
      profileLogo.style.display = 'none';
    }
    
    // Set up user menu with appropriate links
    if (userMenu) {
      // Ensure user menu is properly styled
      userMenu.style.position = 'absolute';
      userMenu.style.top = '70px';
      userMenu.style.right = '20px';
      userMenu.style.backgroundColor = '#1a1a1a';
      userMenu.style.borderRadius = '8px';
      userMenu.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
      userMenu.style.padding = '10px 0';
      userMenu.style.zIndex = '1000';
      userMenu.style.display = 'none';
    }
  } else {
    // User is signed out
    console.log("User is signed out");
    
    // Hide user avatar
    if (userInitials) {
      userInitials.style.display = 'none';
    }
    
    // Show profile.svg for login
    if (profileLogo) {
      profileLogo.style.display = 'block';
    }
    
    // Hide user menu
    if (userMenu) {
      userMenu.style.display = 'none';
    }
  }
});

// Handle logout
if (logoutButton) {
  logoutButton.addEventListener('click', () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out successfully");
        window.location.href = 'login.html'; // Redirect to login page
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  });
}

// Attach event listeners to DOM elements
document.addEventListener('DOMContentLoaded', () => {
  // Setup toggle function for user avatar
  if (userInitials) {
    userInitials.addEventListener('click', toggleUserMenu);
  }
  
  // Close the menu when clicking outside
  document.addEventListener('click', (e) => {
    if (userMenu && userInitials && e.target !== userInitials && !userInitials.contains(e.target)) {
      userMenu.style.display = 'none';
    }
  });
  
  // Redirect to login if not logged in
  window.redirectToLogin = function() {
    window.location.href = 'login.html';
  }
  
  // Navigation function
  window.navigateTo = function(page) {
    window.location.href = page;
  }
  
  // Toggle mobile dropdown menu
  window.toggleDropdown = function() {
    const dropdown = document.querySelector('.dropdown');
    if (dropdown) {
      dropdown.style.display = dropdown.style.display === 'flex' ? 'none' : 'flex';
    }
  }
});

// Export the auth instance for use in other files
export { auth };

