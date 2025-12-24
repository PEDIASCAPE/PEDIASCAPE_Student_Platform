/**
 * Storage utility for managing user data in local storage
 */
const StorageUtil = (function() {
  // Key constants for local storage
  const KEYS = {
    COMPLETED_PROJECTS: 'devhub_completed_projects',
    FAVORITES: 'devhub_favorites',
    BOOKMARKS: 'devhub_bookmarks',
    COMMENTS: 'devhub_comments',
    THEME: 'devhub_theme'
  };

  /**
   * Get data from local storage
   * @param {string} key - Storage key
   * @param {*} defaultValue - Default value if not found
   * @returns {*} Retrieved data or default value
   */
  function get(key, defaultValue = null) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultValue;
    } catch (error) {
      console.error('Error retrieving data from local storage:', error);
      return defaultValue;
    }
  }

  /**
   * Save data to local storage
   * @param {string} key - Storage key
   * @param {*} data - Data to save
   */
  function save(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving data to local storage:', error);
    }
  }

  /**
   * Check if project is completed
   * @param {string} projectId - Project ID
   * @returns {boolean} Whether project is completed
   */
  function isProjectCompleted(projectId) {
    const completedProjects = get(KEYS.COMPLETED_PROJECTS, []);
    return completedProjects.includes(projectId);
  }

  /**
   * Toggle project completion status
   * @param {string} projectId - Project ID
   * @returns {boolean} New completion status
   */
  function toggleProjectCompletion(projectId) {
    const completedProjects = get(KEYS.COMPLETED_PROJECTS, []);
    const isCompleted = completedProjects.includes(projectId);
    
    let newCompletedProjects;
    if (isCompleted) {
      newCompletedProjects = completedProjects.filter(id => id !== projectId);
    } else {
      newCompletedProjects = [...completedProjects, projectId];
    }
    
    save(KEYS.COMPLETED_PROJECTS, newCompletedProjects);
    return !isCompleted;
  }

  /**
   * Get all completed projects
   * @returns {string[]} Array of completed project IDs
   */
  function getCompletedProjects() {
    return get(KEYS.COMPLETED_PROJECTS, []);
  }

  /**
   * Check if project is favorited
   * @param {string} projectId - Project ID
   * @returns {boolean} Whether project is favorited
   */
  function isProjectFavorite(projectId) {
    const favorites = get(KEYS.FAVORITES, []);
    return favorites.includes(projectId);
  }

  /**
   * Toggle project favorite status
   * @param {string} projectId - Project ID
   * @returns {boolean} New favorite status
   */
  function toggleProjectFavorite(projectId) {
    const favorites = get(KEYS.FAVORITES, []);
    const isFavorite = favorites.includes(projectId);
    
    let newFavorites;
    if (isFavorite) {
      newFavorites = favorites.filter(id => id !== projectId);
    } else {
      newFavorites = [...favorites, projectId];
    }
    
    save(KEYS.FAVORITES, newFavorites);
    return !isFavorite;
  }

  /**
   * Get all favorited projects
   * @returns {string[]} Array of favorited project IDs
   */
  function getFavorites() {
    return get(KEYS.FAVORITES, []);
  }

  /**
   * Check if project is bookmarked
   * @param {string} projectId - Project ID
   * @returns {boolean} Whether project is bookmarked
   */
  function isProjectBookmarked(projectId) {
    const bookmarks = get(KEYS.BOOKMARKS, []);
    return bookmarks.includes(projectId);
  }

  /**
   * Toggle project bookmark status
   * @param {string} projectId - Project ID
   * @returns {boolean} New bookmark status
   */
  function toggleProjectBookmark(projectId) {
    const bookmarks = get(KEYS.BOOKMARKS, []);
    const isBookmarked = bookmarks.includes(projectId);
    
    let newBookmarks;
    if (isBookmarked) {
      newBookmarks = bookmarks.filter(id => id !== projectId);
    } else {
      newBookmarks = [...bookmarks, projectId];
    }
    
    save(KEYS.BOOKMARKS, newBookmarks);
    return !isBookmarked;
  }

  /**
   * Get all bookmarked projects
   * @returns {string[]} Array of bookmarked project IDs
   */
  function getBookmarks() {
    return get(KEYS.BOOKMARKS, []);
  }

  /**
   * Get comments for a project
   * @param {string} projectId - Project ID
   * @returns {Array} Project comments
   */
  function getProjectComments(projectId) {
    const allComments = get(KEYS.COMMENTS, {});
    return allComments[projectId] || [];
  }

  /**
   * Add comment to a project
   * @param {string} projectId - Project ID
   * @param {string} comment - Comment text
   */
  function addProjectComment(projectId, commentText) {
    const allComments = get(KEYS.COMMENTS, {});
    const projectComments = allComments[projectId] || [];
    
    const newComment = {
      id: Date.now().toString(),
      text: commentText,
      user: 'You',
      date: new Date().toISOString(),
      likes: 0
    };
    
    allComments[projectId] = [newComment, ...projectComments];
    save(KEYS.COMMENTS, allComments);
    return newComment;
  }

  /**
   * Get user theme preference
   * @returns {string} Theme preference ('light' or 'dark')
   */
  function getThemePreference() {
    return get(KEYS.THEME, 'light');
  }

  /**
   * Set user theme preference
   * @param {string} theme - Theme preference ('light' or 'dark')
   */
  function setThemePreference(theme) {
    save(KEYS.THEME, theme);
  }

  // Public API
  return {
    isProjectCompleted,
    toggleProjectCompletion,
    getCompletedProjects,
    isProjectFavorite,
    toggleProjectFavorite,
    getFavorites,
    isProjectBookmarked,
    toggleProjectBookmark,
    getBookmarks,
    getProjectComments,
    addProjectComment,
    getThemePreference,
    setThemePreference
  };
})();