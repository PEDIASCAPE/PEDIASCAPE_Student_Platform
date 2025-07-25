/**
 * Main application entry point
 * Initializes all components and sets up global event listeners
 */
document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
});

/**
 * Initialize the application
 */
function initializeApp() {
  // Initial setup for UI components (most components self-initialize)
  setupGlobalEventListeners();
  
  // Update progress indicators
  updateProgress();
}

/**
 * Set up global event listeners
 */
function setupGlobalEventListeners() {
  // Add category button
  const addCategoryBtn = document.getElementById('add-category-btn');
  if (addCategoryBtn) {
    addCategoryBtn.addEventListener('click', () => {
      // In a real app, this would open a modal to add a custom category
      // For this demo, we'll just show an alert
      alert('Adding custom categories will be available in a future update.');
    });
  }
  
  // Handle window resize for responsive adjustments
  window.addEventListener('resize', () => {
    adjustUIForScreenSize();
  });
  
  // Initial UI adjustment
  adjustUIForScreenSize();
}

/**
 * Adjust UI based on screen size
 */
function adjustUIForScreenSize() {
  const windowWidth = window.innerWidth;
  
  // On smaller screens, collapse sidebar by default
  if (windowWidth < 768) {
    // In a real app, this would implement a mobile-friendly navigation
    // For this demo, we'll just ensure the elements are properly sized
    document.querySelectorAll('.filter-options').forEach(element => {
      element.style.flexDirection = 'column';
    });
  } else {
    document.querySelectorAll('.filter-options').forEach(element => {
      element.style.flexDirection = 'row';
    });
  }
}

/**
 * Update progress indicators
 */
function updateProgress() {
  // Get counts
  const completedProjects = StorageUtil.getCompletedProjects();
  const favoriteProjects = StorageUtil.getFavorites();
  const totalProjects = ProjectsAPI.getAllProjects().length;
  
  // Update sidebar stats
  document.getElementById('completed-count').textContent = completedProjects.length;
  document.getElementById('favorites-count').textContent = favoriteProjects.length;
  
  // Update progress bar
  const progressPercentage = Math.round((completedProjects.length / totalProjects) * 100);
  const progressBar = document.getElementById('overall-progress');
  const progressFill = progressBar.querySelector('.progress-fill');
  const progressText = progressBar.querySelector('.progress-text');
  
  progressFill.style.width = `${progressPercentage}%`;
  progressText.textContent = `${progressPercentage}%`;
}

// Function to redirect to login page
function redirectToLogin() {
  // Redirect to separate login page instead of showing a modal
  window.location.href = '../login.html';
}

// Add function for mobile menu toggle
function toggleDropdown() {
  const dropdown = document.querySelector('.dropdown');
  if (dropdown) {
      dropdown.classList.toggle('active');
  }
}

// Navigation function
function navigateTo(page) {
  window.location.href = page;
}

