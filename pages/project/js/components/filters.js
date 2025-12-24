/**
 * Filters component for category and difficulty filtering
 */
class Filters {
  constructor() {
    this.difficultyButtons = document.querySelectorAll('.difficulty-filters .filter-btn');
    this.categoryFiltersContainer = document.getElementById('category-filters');
    
    this.initFilters();
    this.initEventListeners();
  }
  
  /**
   * Initialize filters
   */
  initFilters() {
    // Populate category filters
    this.populateCategoryFilters();
  }
  
  /**
   * Initialize event listeners
   */
  initEventListeners() {
    // Difficulty filter buttons
    this.difficultyButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active state
        this.difficultyButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Apply filter
        const difficulty = btn.dataset.filter;
        window.projectList.filterByDifficulty(difficulty);
      });
    });
    
    // Search functionality
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    
    searchButton.addEventListener('click', () => {
      const searchTerm = searchInput.value.trim();
      window.projectList.searchProjects(searchTerm);
    });
    
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        searchButton.click();
      }
    });
    
    // Dark mode toggle
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    darkModeToggle.addEventListener('click', this.toggleDarkMode);
    
    // Apply saved theme preference
    const savedTheme = StorageUtil.getThemePreference();
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-mode');
      darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
  }
  
  /**
   * Populate category filters based on available categories
   */
  populateCategoryFilters() {
    const categories = ProjectsAPI.getAllCategories();
    
    // Add "All" category button
    const allBtn = document.createElement('button');
    allBtn.className = 'filter-btn';
    allBtn.dataset.filter = 'all';
    allBtn.textContent = 'All';
    this.categoryFiltersContainer.appendChild(allBtn);
    
    // Add individual category buttons
    categories.forEach(category => {
      const btn = document.createElement('button');
      btn.className = 'filter-btn';
      btn.dataset.filter = category;
      btn.textContent = category;
      this.categoryFiltersContainer.appendChild(btn);
      
      // Add click event
      btn.addEventListener('click', () => {
        // Update active state
        document.querySelectorAll('#category-filters .filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Apply filter
        window.projectList.filterByCategory(category);
      });
    });
    
    // Set "All" as active by default
    allBtn.classList.add('active');
    
    // Add click event for "All" button
    allBtn.addEventListener('click', () => {
      // Update active state
      document.querySelectorAll('#category-filters .filter-btn').forEach(b => b.classList.remove('active'));
      allBtn.classList.add('active');
      
      // Apply filter
      window.projectList.filterByDifficulty('all');
    });
  }
  
  /**
   * Toggle dark mode
   */
  toggleDarkMode() {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    
    if (isDarkMode) {
      darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      StorageUtil.setThemePreference('dark');
    } else {
      darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      StorageUtil.setThemePreference('light');
    }
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Create global reference to Filters instance
  window.filters = new Filters();
});