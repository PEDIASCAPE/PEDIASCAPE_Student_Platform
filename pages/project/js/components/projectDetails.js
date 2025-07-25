/**
 * Project Details component for displaying project details
 */
class ProjectDetails {
  constructor() {
    this.detailsContainer = document.getElementById('project-details-view');
    this.detailsTemplate = document.getElementById('project-details-template');
    this.currentProjectId = null;
    
    this.initEventListeners();
  }
  
  /**
   * Initialize global event listeners
   */
  initEventListeners() {
    // Listen for back button clicks (delegated)
    this.detailsContainer.addEventListener('click', (e) => {
      if (e.target.closest('.back-btn')) {
        this.closeProjectDetails();
      }
    });
  }
  
  /**
   * Show project details for a specific project
   * @param {string} projectId - The ID of the project to show
   */
  showProjectDetails(projectId) {
    const project = ProjectsAPI.getProjectById(projectId);
    if (!project) return;
    
    // Store current project ID
    this.currentProjectId = projectId;
    
    // Clear previous content
    this.detailsContainer.innerHTML = '';
    
    // Clone template
    const detailsContent = document.importNode(this.detailsTemplate.content, true);
    
    // Fill in project details
    detailsContent.querySelector('.details-title').textContent = project.title;
    
    // Set difficulty
    const difficultyElem = document.createElement('span');
    difficultyElem.innerHTML = `<i class="fas fa-signal"></i> ${project.difficulty.charAt(0).toUpperCase() + project.difficulty.slice(1)}`;
    detailsContent.querySelector('.details-meta').appendChild(difficultyElem);
    
    // Set estimated time
    const timeElem = document.createElement('span');
    timeElem.innerHTML = `<i class="far fa-clock"></i> ${project.estimatedTime}`;
    detailsContent.querySelector('.details-meta').appendChild(timeElem);
    
    // Set category
    const categoryElem = document.createElement('span');
    categoryElem.innerHTML = `<i class="fas fa-folder"></i> ${project.category}`;
    detailsContent.querySelector('.details-meta').appendChild(categoryElem);
    
    // Add description
    detailsContent.querySelector('.details-description').textContent = project.description;
    
    // Add learning objectives
    const objectivesList = detailsContent.querySelector('.objectives-list');
    if (project.objectives && project.objectives.length > 0) {
      project.objectives.forEach(objective => {
        const li = document.createElement('li');
        li.textContent = objective;
        objectivesList.appendChild(li);
      });
    } else {
      detailsContent.querySelector('.details-objective').style.display = 'none';
    }
    
    // Add steps
    const stepsContainer = detailsContent.querySelector('.steps-container');
    if (project.steps && project.steps.length > 0) {
      project.steps.forEach((step, index) => {
        const stepElem = document.createElement('div');
        stepElem.className = 'step-item';
        
        const stepHeader = document.createElement('div');
        stepHeader.className = 'step-header';
        
        const stepTitle = document.createElement('h4');
        stepTitle.className = 'step-title';
        stepTitle.innerHTML = `<span class="step-number">${index + 1}</span> ${step.title}`;
        stepHeader.appendChild(stepTitle);
        
        stepElem.appendChild(stepHeader);
        
        const stepContent = document.createElement('div');
        stepContent.className = 'step-content';
        stepContent.textContent = step.content;
        stepElem.appendChild(stepContent);
        
        if (step.code) {
          const stepCode = document.createElement('pre');
          stepCode.className = 'step-code';
          stepCode.textContent = step.code;
          stepElem.appendChild(stepCode);
        }
        
        stepsContainer.appendChild(stepElem);
      });
    } else {
      detailsContent.querySelector('.details-steps').style.display = 'none';
    }
    
    // Add tips
    const tipsList = detailsContent.querySelector('.tips-list');
    if (project.tips && project.tips.length > 0) {
      project.tips.forEach(tip => {
        const li = document.createElement('li');
        li.textContent = tip;
        tipsList.appendChild(li);
      });
    } else {
      detailsContent.querySelector('.details-tips').style.display = 'none';
    }
    
    // Add resources
    const resourcesList = detailsContent.querySelector('.resources-list');
    if (project.resources && project.resources.length > 0) {
      project.resources.forEach(resource => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = resource.url;
        a.textContent = resource.text;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        li.appendChild(a);
        resourcesList.appendChild(li);
      });
    } else {
      detailsContent.querySelector('.details-resources').style.display = 'none';
    }
    
    // Set completion status
    const isCompleted = StorageUtil.isProjectCompleted(projectId);
    const progressStatus = detailsContent.querySelector('.progress-status');
    const completeBtn = detailsContent.querySelector('.mark-complete-btn');
    
    if (isCompleted) {
      progressStatus.textContent = 'Completed';
      progressStatus.classList.add('completed');
      completeBtn.textContent = 'Mark as Incomplete';
      completeBtn.classList.add('completed');
    } else {
      progressStatus.textContent = 'Not Started';
      completeBtn.textContent = 'Mark as Complete';
    }
    
    // Add completion toggle handler
    completeBtn.addEventListener('click', () => this.toggleProjectCompletion(projectId));
    
    // Check favorite status
    const isFavorite = StorageUtil.isProjectFavorite(projectId);
    const favoriteBtn = detailsContent.querySelector('.details-actions .favorite-btn');
    if (isFavorite) {
      favoriteBtn.classList.add('active');
      favoriteBtn.innerHTML = '<i class="fas fa-heart"></i><span>Favorited</span>';
    }
    
    // Add favorite toggle handler
    favoriteBtn.addEventListener('click', () => this.toggleFavorite(projectId));
    
    // Check bookmark status
    const isBookmarked = StorageUtil.isProjectBookmarked(projectId);
    const bookmarkBtn = detailsContent.querySelector('.bookmark-btn');
    if (isBookmarked) {
      bookmarkBtn.classList.add('active');
      bookmarkBtn.innerHTML = '<i class="fas fa-bookmark"></i><span>Bookmarked</span>';
    }
    
    // Add bookmark toggle handler
    bookmarkBtn.addEventListener('click', () => this.toggleBookmark(projectId));
    
    // Add similar projects
    const similarProjects = ProjectsAPI.getRelatedProjects(projectId, 3);
    const similarProjectsList = detailsContent.querySelector('.similar-projects-list');
    
    if (similarProjects.length > 0) {
      similarProjects.forEach(relatedProject => {
        const projectItem = document.createElement('div');
        projectItem.className = 'similar-project-item';
        
        const projectLink = document.createElement('a');
        projectLink.href = '#';
        projectLink.innerHTML = `<span class="similar-project-title">${relatedProject.title}</span> <i class="fas fa-chevron-right"></i>`;
        
        projectLink.addEventListener('click', (e) => {
          e.preventDefault();
          this.showProjectDetails(relatedProject.id);
        });
        
        projectItem.appendChild(projectLink);
        similarProjectsList.appendChild(projectItem);
      });
    } else {
      detailsContent.querySelector('.similar-projects').style.display = 'none';
    }
    
    // Add comments
    this.renderComments(projectId, detailsContent.querySelector('.comments-list'));
    
    // Add comment form handler
    const commentForm = detailsContent.querySelector('.comment-form');
    const commentInput = commentForm.querySelector('#comment-input');
    const postCommentBtn = commentForm.querySelector('#post-comment-btn');
    
    postCommentBtn.addEventListener('click', () => {
      const commentText = commentInput.value.trim();
      if (commentText) {
        this.addComment(projectId, commentText);
        commentInput.value = '';
      }
    });
    
    // Add the details to the container
    this.detailsContainer.appendChild(detailsContent);
    
    // Scroll to top
    window.scrollTo(0, 0);
  }
  
  /**
   * Close project details and return to project list
   */
  closeProjectDetails() {
    document.getElementById('project-details-view').classList.remove('active');
    document.getElementById('projects-view').classList.add('active');
    this.currentProjectId = null;
  }
  
  /**
   * Toggle project completion status
   * @param {string} projectId - The project ID
   */
  toggleProjectCompletion(projectId) {
    const isCompleted = StorageUtil.toggleProjectCompletion(projectId);
    
    // Update UI
    const progressStatus = this.detailsContainer.querySelector('.progress-status');
    const completeBtn = this.detailsContainer.querySelector('.mark-complete-btn');
    
    if (isCompleted) {
      progressStatus.textContent = 'Completed';
      progressStatus.classList.add('completed');
      completeBtn.textContent = 'Mark as Incomplete';
      completeBtn.classList.add('completed');
    } else {
      progressStatus.textContent = 'Not Started';
      progressStatus.classList.remove('completed');
      completeBtn.textContent = 'Mark as Complete';
      completeBtn.classList.remove('completed');
    }
    
    // Update completed count in the sidebar
    document.getElementById('completed-count').textContent = StorageUtil.getCompletedProjects().length;
    
    // Update overall progress bar
    this.updateOverallProgress();
  }
  
  /**
   * Update the overall progress bar in the sidebar
   */
  updateOverallProgress() {
    const completedProjects = StorageUtil.getCompletedProjects();
    const totalProjects = ProjectsAPI.getAllProjects().length;
    const progressPercentage = Math.round((completedProjects.length / totalProjects) * 100);
    
    const progressBar = document.getElementById('overall-progress');
    const progressFill = progressBar.querySelector('.progress-fill');
    const progressText = progressBar.querySelector('.progress-text');
    
    progressFill.style.width = `${progressPercentage}%`;
    progressText.textContent = `${progressPercentage}%`;
  }
  
  /**
   * Toggle favorite status for a project
   * @param {string} projectId - The project ID
   */
  toggleFavorite(projectId) {
    const isFavorite = StorageUtil.toggleProjectFavorite(projectId);
    
    // Update button UI
    const favoriteBtn = this.detailsContainer.querySelector('.details-actions .favorite-btn');
    favoriteBtn.classList.toggle('active', isFavorite);
    favoriteBtn.innerHTML = isFavorite ? 
      '<i class="fas fa-heart"></i><span>Favorited</span>' : 
      '<i class="far fa-heart"></i><span>Favorite</span>';
    
    // Update favorites count in the sidebar
    document.getElementById('favorites-count').textContent = StorageUtil.getFavorites().length;
  }
  
  /**
   * Toggle bookmark status for a project
   * @param {string} projectId - The project ID
   */
  toggleBookmark(projectId) {
    const isBookmarked = StorageUtil.toggleProjectBookmark(projectId);
    
    // Update button UI
    const bookmarkBtn = this.detailsContainer.querySelector('.bookmark-btn');
    bookmarkBtn.classList.toggle('active', isBookmarked);
    bookmarkBtn.innerHTML = isBookmarked ? 
      '<i class="fas fa-bookmark"></i><span>Bookmarked</span>' : 
      '<i class="far fa-bookmark"></i><span>Bookmark</span>';
  }
  
  /**
   * Render comments for a project
   * @param {string} projectId - The project ID
   * @param {HTMLElement} container - The container element for comments
   */
  renderComments(projectId, container) {
    const comments = StorageUtil.getProjectComments(projectId);
    
    // Clear container
    container.innerHTML = '';
    
    if (comments.length === 0) {
      const noComments = document.createElement('div');
      noComments.className = 'no-comments';
      noComments.textContent = 'No comments yet. Be the first to share your experience or tips!';
      container.appendChild(noComments);
      return;
    }
    
    // Render each comment
    comments.forEach(comment => {
      const commentElem = document.createElement('div');
      commentElem.className = 'comment';
      
      const commentHeader = document.createElement('div');
      commentHeader.className = 'comment-header';
      
      const commentUser = document.createElement('div');
      commentUser.className = 'comment-user';
      commentUser.textContent = comment.user;
      
      const commentDate = document.createElement('div');
      commentDate.className = 'comment-date';
      commentDate.textContent = new Date(comment.date).toLocaleDateString();
      
      commentHeader.appendChild(commentUser);
      commentHeader.appendChild(commentDate);
      
      const commentBody = document.createElement('div');
      commentBody.className = 'comment-body';
      commentBody.textContent = comment.text;
      
      const commentActions = document.createElement('div');
      commentActions.className = 'comment-actions';
      
      const likeBtn = document.createElement('button');
      likeBtn.className = 'comment-like';
      likeBtn.innerHTML = `<i class="far fa-thumbs-up"></i> ${comment.likes || 0}`;
      
      const replyBtn = document.createElement('button');
      replyBtn.className = 'comment-reply';
      replyBtn.innerHTML = '<i class="far fa-comment"></i> Reply';
      
      commentActions.appendChild(likeBtn);
      commentActions.appendChild(replyBtn);
      
      commentElem.appendChild(commentHeader);
      commentElem.appendChild(commentBody);
      commentElem.appendChild(commentActions);
      
      container.appendChild(commentElem);
    });
  }
  
  /**
   * Add a comment to a project
   * @param {string} projectId - The project ID
   * @param {string} commentText - The comment text
   */
  addComment(projectId, commentText) {
    const newComment = StorageUtil.addProjectComment(projectId, commentText);
    
    // Re-render comments
    this.renderComments(projectId, this.detailsContainer.querySelector('.comments-list'));
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Create global reference to ProjectDetails instance
  window.projectDetails = new ProjectDetails();
});