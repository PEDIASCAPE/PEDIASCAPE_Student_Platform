/**
 * Comments component for managing project comments
 */
class Comments {
  constructor() {
    this.commentsContainer = null;
    this.commentForm = null;
    this.currentProjectId = null;
  }
  
  /**
   * Initialize comments for a project
   * @param {string} projectId - The project ID
   * @param {HTMLElement} container - Container for comments
   * @param {HTMLElement} form - Comment form element
   */
  init(projectId, container, form) {
    this.currentProjectId = projectId;
    this.commentsContainer = container;
    this.commentForm = form;
    
    // Load and render comments
    this.renderComments();
    
    // Set up form handling
    this.initCommentForm();
  }
  
  /**
   * Initialize comment form
   */
  initCommentForm() {
    const commentInput = this.commentForm.querySelector('textarea');
    const submitButton = this.commentForm.querySelector('button');
    
    submitButton.addEventListener('click', () => {
      const commentText = commentInput.value.trim();
      if (commentText) {
        this.addComment(commentText);
        commentInput.value = '';
      }
    });
  }
  
  /**
   * Render comments for the current project
   */
  renderComments() {
    const comments = StorageUtil.getProjectComments(this.currentProjectId);
    this.commentsContainer.innerHTML = '';
    
    if (comments.length === 0) {
      const noCommentsMsg = document.createElement('div');
      noCommentsMsg.className = 'no-comments';
      noCommentsMsg.textContent = 'No comments yet. Be the first to share your tips or experience!';
      this.commentsContainer.appendChild(noCommentsMsg);
      return;
    }
    
    comments.forEach(comment => {
      const commentElem = this.createCommentElement(comment);
      this.commentsContainer.appendChild(commentElem);
    });
  }
  
  /**
   * Create a comment element
   * @param {Object} comment - Comment data
   * @returns {HTMLElement} Comment element
   */
  createCommentElement(comment) {
    const commentElem = document.createElement('div');
    commentElem.className = 'comment';
    commentElem.dataset.id = comment.id;
    
    const header = document.createElement('div');
    header.className = 'comment-header';
    
    const user = document.createElement('div');
    user.className = 'comment-user';
    user.textContent = comment.user;
    
    const date = document.createElement('div');
    date.className = 'comment-date';
    const commentDate = new Date(comment.date);
    date.textContent = commentDate.toLocaleDateString() + ' ' + 
      commentDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    
    header.appendChild(user);
    header.appendChild(date);
    
    const body = document.createElement('div');
    body.className = 'comment-body';
    body.textContent = comment.text;
    
    const actions = document.createElement('div');
    actions.className = 'comment-actions';
    
    const likeBtn = document.createElement('button');
    likeBtn.className = 'comment-like';
    likeBtn.innerHTML = `<i class="far fa-thumbs-up"></i> ${comment.likes || 0}`;
    likeBtn.addEventListener('click', () => this.likeComment(comment.id));
    
    const replyBtn = document.createElement('button');
    replyBtn.className = 'comment-reply';
    replyBtn.innerHTML = '<i class="far fa-comment"></i> Reply';
    replyBtn.addEventListener('click', () => this.replyToComment(comment.id));
    
    actions.appendChild(likeBtn);
    actions.appendChild(replyBtn);
    
    commentElem.appendChild(header);
    commentElem.appendChild(body);
    commentElem.appendChild(actions);
    
    return commentElem;
  }
  
  /**
   * Add a new comment
   * @param {string} text - Comment text
   */
  addComment(text) {
    const newComment = StorageUtil.addProjectComment(this.currentProjectId, text);
    
    // Remove no comments message if it exists
    const noComments = this.commentsContainer.querySelector('.no-comments');
    if (noComments) {
      this.commentsContainer.removeChild(noComments);
    }
    
    // Add the new comment to the list
    const commentElem = this.createCommentElement(newComment);
    this.commentsContainer.insertBefore(commentElem, this.commentsContainer.firstChild);
    
    // Add animation
    commentElem.classList.add('animate-fade-in');
  }
  
  /**
   * Like a comment
   * @param {string} commentId - Comment ID
   */
  likeComment(commentId) {
    // In a real app, this would update the comment in storage
    // For now, we'll just update the UI
    const commentElem = this.commentsContainer.querySelector(`[data-id="${commentId}"]`);
    if (commentElem) {
      const likeBtn = commentElem.querySelector('.comment-like');
      const likeCount = parseInt(likeBtn.textContent.trim().split(' ')[1] || '0');
      likeBtn.innerHTML = `<i class="fas fa-thumbs-up"></i> ${likeCount + 1}`;
      likeBtn.classList.add('liked');
    }
  }
  
  /**
   * Reply to a comment
   * @param {string} commentId - Comment ID
   */
  replyToComment(commentId) {
    // In a real app, this would open a reply form
    // For now, we'll focus the comment input and add a prefix
    const commentElem = this.commentsContainer.querySelector(`[data-id="${commentId}"]`);
    if (commentElem) {
      const user = commentElem.querySelector('.comment-user').textContent;
      const commentInput = this.commentForm.querySelector('textarea');
      commentInput.value = `@${user} `;
      commentInput.focus();
    }
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Create global reference to Comments instance
  window.comments = new Comments();
});