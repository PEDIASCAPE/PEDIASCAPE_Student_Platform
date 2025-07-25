/**
 * Project List component for handling project grid/list rendering
 */
class ProjectList {
  constructor() {
    this.projectsContainer = document.getElementById('projects-container');
    this.projectCardTemplate = document.getElementById('project-card-template');
    this.gridViewBtn = document.getElementById('grid-view-btn');
    this.listViewBtn = document.getElementById('list-view-btn');
    
    // View state
    this.currentView = 'grid'; // 'grid' or 'list'
    this.currentFilter = 'all'; // Current filter
    this.showFavoritesOnly = false; // Whether to show only favorites
    
    // Initialize view
    this.initEventListeners();
  }
  
  /**
   * Initialize event listeners
   */
  initEventListeners() {
    // View toggle buttons
    this.gridViewBtn.addEventListener('click', () => this.setView('grid'));
    this.listViewBtn.addEventListener('click', () => this.setView('list'));
    
    // Favorites toggle
    document.getElementById('favorites-toggle').addEventListener('click', () => {
      this.showFavoritesOnly = !this.showFavoritesOnly;
      document.getElementById('favorites-toggle').classList.toggle('active', this.showFavoritesOnly);
      this.renderProjects();
    });
  }
  
  /**
   * Set the current view (grid or list)
   * @param {string} view - The view to set ('grid' or 'list')
   */
  setView(view) {
    if (this.currentView === view) return;
    
    this.currentView = view;
    
    // Update active button
    this.gridViewBtn.classList.toggle('active', view === 'grid');
    this.listViewBtn.classList.toggle('active', view === 'list');
    
    // Update container class
    this.projectsContainer.className = view === 'grid' ? 'projects-grid' : 'projects-list';
    
    // Re-render projects
    this.renderProjects();
  }
  
  /**
   * Render the projects list based on current filters
   * @param {Array} projects - The projects to render (defaults to all projects)
   */
  renderProjects(projects = null) {
    // Clear current projects
    this.projectsContainer.innerHTML = '';
    
    // Get projects to display
    let projectsToDisplay = projects || ProjectsAPI.getAllProjects();
    
    // Apply filters
    if (this.currentFilter !== 'all') {
      if (this.currentFilter === 'beginner' || this.currentFilter === 'intermediate' || this.currentFilter === 'advanced') {
        projectsToDisplay = projectsToDisplay.filter(project => project.difficulty === this.currentFilter);
      } else {
        projectsToDisplay = projectsToDisplay.filter(project => project.category === this.currentFilter);
      }
    }
    
    // Filter by favorites if needed
    if (this.showFavoritesOnly) {
      const favorites = StorageUtil.getFavorites();
      projectsToDisplay = projectsToDisplay.filter(project => favorites.includes(project.id));
    }
    
    // Update header text
    document.querySelector('#projects-view .view-header h2').textContent = 
      this.showFavoritesOnly ? 'Favorite Projects' : 
      this.currentFilter === 'all' ? 'All Projects' : 
      `${this.currentFilter.charAt(0).toUpperCase() + this.currentFilter.slice(1)} Projects`;
    
    // If no projects match, show message
    if (projectsToDisplay.length === 0) {
      const noProjectsMsg = document.createElement('div');
      noProjectsMsg.className = 'no-projects-message';
      noProjectsMsg.textContent = this.showFavoritesOnly ? 
        'You haven\'t added any favorites yet. Click the heart icon on projects you like to add them here.' : 
        'No projects match the current filters.';
      this.projectsContainer.appendChild(noProjectsMsg);
      return;
    }
    
    // Render each project
    projectsToDisplay.forEach(project => {
      const projectCard = this.createProjectCard(project);
      this.projectsContainer.appendChild(projectCard);
    });
    
    // Add animation class to cards
    setTimeout(() => {
      document.querySelectorAll('.project-card').forEach((card, index) => {
        setTimeout(() => {
          card.classList.add('animate-fade-in');
        }, index * 50);
      });
    }, 0);
  }
  
  /**
   * Create a project card element
   * @param {Object} project - The project data
   * @returns {HTMLElement} The project card element
   */
  createProjectCard(project) {
    // Clone the card template
    const card = document.importNode(this.projectCardTemplate.content, true);
    const projectCard = card.querySelector('.project-card');
    
    // Set card data attributes
    projectCard.dataset.id = project.id;
    projectCard.dataset.difficulty = project.difficulty;
    
    // Fill in card content
    const difficultyBadge = card.querySelector('.difficulty-badge');
    difficultyBadge.textContent = project.difficulty.charAt(0).toUpperCase() + project.difficulty.slice(1);
    difficultyBadge.classList.add(project.difficulty);
    
    card.querySelector('.project-title').textContent = project.title;
    card.querySelector('.project-description').textContent = project.description;
    card.querySelector('.estimated-time').textContent = `Est. time: ${project.estimatedTime}`;
    
    // Add tags
    const tagsContainer = card.querySelector('.project-tags');
    project.tags.forEach(tag => {
      const tagElement = document.createElement('span');
      tagElement.className = 'project-tag';
      tagElement.textContent = tag;
      tagsContainer.appendChild(tagElement);
    });
    
    // Check if project is completed
    const isCompleted = StorageUtil.isProjectCompleted(project.id);
    const completionStatus = card.querySelector('.completion-status');
    if (isCompleted) {
      completionStatus.textContent = 'Completed';
      completionStatus.classList.add('completed');
      projectCard.classList.add('completed-project');
    } else {
      completionStatus.textContent = 'Not started';
    }
    
    // Check if project is favorite
    const isFavorite = StorageUtil.isProjectFavorite(project.id);
    const favoriteBtn = card.querySelector('.favorite-btn');
    if (isFavorite) {
      favoriteBtn.classList.add('active');
      favoriteBtn.innerHTML = '<i class="fas fa-heart"></i>';
    }
    
    // Add event listeners
    favoriteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleFavorite(project.id, favoriteBtn);
    });
    
    // View project button click
    card.querySelector('.view-project-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      this.viewProject(project.id);
    });
    
    // Make the whole card clickable
    projectCard.addEventListener('click', () => {
      this.viewProject(project.id);
    });
    
    return card;
  }
  
  /**
   * Toggle favorite status for a project
   * @param {string} projectId - The project ID
   * @param {HTMLElement} buttonElement - The favorite button element
   */
  toggleFavorite(projectId, buttonElement) {
    const isFavorite = StorageUtil.toggleProjectFavorite(projectId);
    
    // Update button UI
    buttonElement.classList.toggle('active', isFavorite);
    buttonElement.innerHTML = isFavorite ? '<i class="fas fa-heart"></i>' : '<i class="far fa-heart"></i>';
    
    // Update favorites count in the sidebar
    document.getElementById('favorites-count').textContent = StorageUtil.getFavorites().length;
    
    // If showing favorites only, re-render to remove unfavorited projects
    if (this.showFavoritesOnly && !isFavorite) {
      this.renderProjects();
    }
  }
  
  /**
   * View a project's details
   * @param {string} projectId - The project ID
   */
  viewProject(projectId) {
    // Hide projects view and show details view
    document.getElementById('projects-view').classList.remove('active');
    document.getElementById('project-details-view').classList.add('active');
    
    // Trigger details view rendering
    window.projectDetails.showProjectDetails(projectId);
  }
  
  /**
   * Filter projects by difficulty
   * @param {string} difficulty - The difficulty level to filter by
   */
  filterByDifficulty(difficulty) {
    this.currentFilter = difficulty;
    this.renderProjects();
  }
  
  /**
   * Filter projects by category
   * @param {string} category - The category to filter by
   */
  filterByCategory(category) {
    this.currentFilter = category;
    this.renderProjects();
  }
  
  /**
   * Search projects by search term
   * @param {string} searchTerm - The search term
   */
  searchProjects(searchTerm) {
    if (!searchTerm.trim()) {
      this.renderProjects();
      return;
    }
    
    const searchResults = ProjectsAPI.getProjectsBySearchTerm(searchTerm);
    this.renderProjects(searchResults);
    
    // Update header text
    document.querySelector('#projects-view .view-header h2').textContent = `Search Results: "${searchTerm}"`;
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Create global reference to ProjectList instance
  window.projectList = new ProjectList();
  
  // Render all projects initially
  window.projectList.renderProjects();
});