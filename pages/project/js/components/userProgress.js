/**
 * User Progress component for tracking completion, favorites, etc.
 */
class UserProgress {
  constructor() {
    this.completedCountElement = document.getElementById('completed-count');
    this.favoritesCountElement = document.getElementById('favorites-count');
    this.progressBarElement = document.getElementById('overall-progress');
    this.progressFillElement = this.progressBarElement.querySelector('.progress-fill');
    this.progressTextElement = this.progressBarElement.querySelector('.progress-text');
    
    this.updateProgress();
  }
  
  /**
   * Update progress indicators
   */
  updateProgress() {
    const completedProjects = StorageUtil.getCompletedProjects();
    const favoriteProjects = StorageUtil.getFavorites();
    const totalProjects = ProjectsAPI.getAllProjects().length;
    
    // Update completed count
    this.completedCountElement.textContent = completedProjects.length;
    
    // Update favorites count
    this.favoritesCountElement.textContent = favoriteProjects.length;
    
    // Update progress bar
    const progressPercentage = Math.round((completedProjects.length / totalProjects) * 100);
    this.progressFillElement.style.width = `${progressPercentage}%`;
    this.progressTextElement.textContent = `${progressPercentage}%`;
  }
  
  /**
   * Check if all projects in a given category are completed
   * @param {string} category - The category to check
   * @returns {boolean} True if all projects in the category are completed
   */
  isCategoryCompleted(category) {
    const completedProjects = StorageUtil.getCompletedProjects();
    const categoryProjects = ProjectsAPI.getProjectsByCategory(category);
    
    if (categoryProjects.length === 0) return false;
    
    return categoryProjects.every(project => completedProjects.includes(project.id));
  }
  
  /**
   * Check if all projects of a given difficulty are completed
   * @param {string} difficulty - The difficulty to check
   * @returns {boolean} True if all projects of the difficulty are completed
   */
  isDifficultyCompleted(difficulty) {
    const completedProjects = StorageUtil.getCompletedProjects();
    const difficultyProjects = ProjectsAPI.getProjectsByDifficulty(difficulty);
    
    if (difficultyProjects.length === 0) return false;
    
    return difficultyProjects.every(project => completedProjects.includes(project.id));
  }
  
  /**
   * Get progress percentage for a category
   * @param {string} category - The category to check
   * @returns {number} Percentage of completed projects in the category
   */
  getCategoryProgress(category) {
    const completedProjects = StorageUtil.getCompletedProjects();
    const categoryProjects = ProjectsAPI.getProjectsByCategory(category);
    
    if (categoryProjects.length === 0) return 0;
    
    const completedCategoryProjects = categoryProjects.filter(project => 
      completedProjects.includes(project.id));
    
    return Math.round((completedCategoryProjects.length / categoryProjects.length) * 100);
  }
  
  /**
   * Get progress percentage for a difficulty level
   * @param {string} difficulty - The difficulty to check
   * @returns {number} Percentage of completed projects of the difficulty
   */
  getDifficultyProgress(difficulty) {
    const completedProjects = StorageUtil.getCompletedProjects();
    const difficultyProjects = ProjectsAPI.getProjectsByDifficulty(difficulty);
    
    if (difficultyProjects.length === 0) return 0;
    
    const completedDifficultyProjects = difficultyProjects.filter(project => 
      completedProjects.includes(project.id));
    
    return Math.round((completedDifficultyProjects.length / difficultyProjects.length) * 100);
  }
  
  /**
   * Get recently completed projects
   * @param {number} limit - Maximum number of projects to return
   * @returns {Array} Array of recently completed project objects
   */
  getRecentlyCompleted(limit = 5) {
    // Note: This would require storing completion timestamps in a real app
    const completedProjects = StorageUtil.getCompletedProjects();
    return completedProjects
      .map(id => ProjectsAPI.getProjectById(id))
      .filter(Boolean)
      .slice(0, limit);
  }
  
  /**
   * Generate recommended next projects based on user progress
   * @param {number} limit - Maximum number of projects to return
   * @returns {Array} Array of recommended project objects
   */
  getRecommendedProjects(limit = 3) {
    const completedProjects = StorageUtil.getCompletedProjects();
    const allProjects = ProjectsAPI.getAllProjects();
    
    // Filter out completed projects
    const uncompleted = allProjects.filter(project => !completedProjects.includes(project.id));
    
    // If user hasn't completed any beginner projects, recommend those first
    const beginnerProgress = this.getDifficultyProgress('beginner');
    if (beginnerProgress < 100) {
      const beginnerRecommendations = uncompleted.filter(p => p.difficulty === 'beginner');
      if (beginnerRecommendations.length > 0) {
        return beginnerRecommendations.slice(0, limit);
      }
    }
    
    // If user has completed some beginner projects but not intermediate ones
    const intermediateProgress = this.getDifficultyProgress('intermediate');
    if (beginnerProgress > 30 && intermediateProgress < 50) {
      const intermediateRecommendations = uncompleted.filter(p => p.difficulty === 'intermediate');
      if (intermediateRecommendations.length > 0) {
        return intermediateRecommendations.slice(0, limit);
      }
    }
    
    // If user has made good progress on intermediate projects
    const advancedProgress = this.getDifficultyProgress('advanced');
    if (intermediateProgress > 30 && advancedProgress < 50) {
      const advancedRecommendations = uncompleted.filter(p => p.difficulty === 'advanced');
      if (advancedRecommendations.length > 0) {
        return advancedRecommendations.slice(0, limit);
      }
    }
    
    // Default: return a mix of uncompleted projects
    return uncompleted.slice(0, limit);
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Create global reference to UserProgress instance
  window.userProgress = new UserProgress();
});