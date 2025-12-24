/**
 * Favorites component for managing favorite projects
 */
class Favorites {
  constructor() {
    this.favoritesBtn = document.getElementById('favorites-toggle');
    this.favoritesCountElement = document.getElementById('favorites-count');
    
    this.initEventListeners();
    this.updateFavoritesCount();
  }
  
  /**
   * Initialize event listeners
   */
  initEventListeners() {
    // Toggle favorites view
    this.favoritesBtn.addEventListener('click', () => {
      this.toggleFavoritesView();
    });
  }
  
  /**
   * Toggle favorites view
   */
  toggleFavoritesView() {
    window.projectList.showFavoritesOnly = !window.projectList.showFavoritesOnly;
    this.favoritesBtn.classList.toggle('active', window.projectList.showFavoritesOnly);
    window.projectList.renderProjects();
  }
  
  /**
   * Update favorites count in the UI
   */
  updateFavoritesCount() {
    const favorites = StorageUtil.getFavorites();
    this.favoritesCountElement.textContent = favorites.length;
  }
  
  /**
   * Add a project to favorites
   * @param {string} projectId - The project ID
   * @returns {boolean} Whether the project is now favorited
   */
  addToFavorites(projectId) {
    const isFavorite = StorageUtil.isProjectFavorite(projectId);
    
    // If already favorited, do nothing
    if (isFavorite) return true;
    
    // Add to favorites
    StorageUtil.toggleProjectFavorite(projectId);
    this.updateFavoritesCount();
    
    return true;
  }
  
  /**
   * Remove a project from favorites
   * @param {string} projectId - The project ID
   */
  removeFromFavorites(projectId) {
    const isFavorite = StorageUtil.isProjectFavorite(projectId);
    
    // If not favorited, do nothing
    if (!isFavorite) return;
    
    // Remove from favorites
    StorageUtil.toggleProjectFavorite(projectId);
    this.updateFavoritesCount();
    
    // If showing favorites only, re-render to remove unfavorited projects
    if (window.projectList.showFavoritesOnly) {
      window.projectList.renderProjects();
    }
  }
  
  /**
   * Toggle favorite status for a project
   * @param {string} projectId - The project ID
   * @returns {boolean} New favorite status
   */
  toggleFavorite(projectId) {
    const isFavorite = StorageUtil.toggleProjectFavorite(projectId);
    this.updateFavoritesCount();
    
    // If showing favorites only and unfavorited, re-render to remove unfavorited projects
    if (window.projectList.showFavoritesOnly && !isFavorite) {
      window.projectList.renderProjects();
    }
    
    return isFavorite;
  }
  
  /**
   * Get all favorite projects
   * @returns {Array} Array of favorite project objects
   */
  getAllFavorites() {
    const favoriteIds = StorageUtil.getFavorites();
    return favoriteIds.map(id => ProjectsAPI.getProjectById(id)).filter(Boolean);
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Create global reference to Favorites instance
  window.favorites = new Favorites();
});