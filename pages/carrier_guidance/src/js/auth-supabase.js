
import { supabase } from '../../../script/supabase-client.js';

// Global variables
let currentUser = null;
let userAssessmentHistory = [];

// Initialize Auth
async function initializeAuth() {
    try {
        // Check authentication state
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
            currentUser = user;
            updateAuthUI(user);
        } else {
            updateAuthUI(null);
        }

        // Listen for auth changes
        supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_OUT') {
                currentUser = null;
                updateAuthUI(null);
            } else if (session?.user) {
                currentUser = session.user;
                updateAuthUI(currentUser);
            }
        });

        // Set up logout button
        const logoutButton = document.getElementById('logoutButton');
        if (logoutButton) {
            logoutButton.addEventListener('click', async () => {
                const { error } = await supabase.auth.signOut();
                if (error) {
                    showToast('Error logging out: ' + error.message, 'error');
                } else {
                    showToast('Logged out successfully', 'success');
                }
            });
        }

        // Click outside user menu to close it
        document.addEventListener('click', (event) => {
            const userMenu = document.getElementById('userMenu');
            const userInitials = document.getElementById('userInitials');
            
            if (userMenu && userInitials && 
                event.target !== userInitials && 
                !userMenu.contains(event.target)) {
                userMenu.classList.remove('active');
            }
        });

    } catch (error) {
        console.error("Auth initialization error:", error);
        showToast("Error initializing authentication", "error");
    }
}

// Toggle user menu dropdown
function toggleUserMenu() {
    const userMenu = document.getElementById('userMenu');
    if (userMenu) {
        userMenu.classList.toggle('active');
    }
}

// Update UI based on authentication state
function updateAuthUI(user) {
    // Find auth-related elements
    const profileLogo = document.querySelector('.profilelogo');
    const userProfile = document.querySelector('.user-profile');
    const userInitials = document.getElementById('userInitials');
    
    if (user) {
        // User is signed in
        // showToast('Logged in as ' + user.email, 'success'); // Optional: prevent toast spam on page load
        
        // Update profile display - hide profile.svg and show user avatar
        if (profileLogo) profileLogo.style.display = 'none';
        
        if (userProfile) {
            userProfile.style.display = 'flex';
            
            // Set user initials in avatar
            if (userInitials) {
                const email = user.email || '';
                const initials = email.charAt(0).toUpperCase();
                userInitials.textContent = initials;
            }
        }
    } else {
        // User is signed out
        // Update profile display - show profile.svg and hide user avatar
        if (profileLogo) profileLogo.style.display = 'block';
        
        if (userProfile) {
            userProfile.style.display = 'none';
        }
    }
}

// Save assessment results to user's history
async function saveAssessmentResults(results) {
    return;
}

// Load user's assessment history
async function loadUserAssessmentHistory() {
    userAssessmentHistory = [];
    if (window.location.href.includes('dashboard.html')) {
        displayAssessmentHistory();
    }
}

// Display assessment history on dashboard
function displayAssessmentHistory() {
    const historyContainer = document.getElementById('assessment-history');
    if (!historyContainer) return;
    
    if (userAssessmentHistory.length === 0) {
        historyContainer.innerHTML = `
            <div class="empty-state">
                <p>You haven't taken any assessments yet.</p>
                <button class="btn primary-btn" onclick="navigateTo('../carrier_guidance/index.html')">
                    Take Your First Assessment
                </button>
            </div>
        `;
        return;
    }
    
    let historyHTML = `
        <h3>Your Assessment History</h3>
        <div class="history-list">
    `;
    
    userAssessmentHistory.forEach(item => {
        const formattedDate = item.date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        // Safely access the first match if it exists
        const topMatch = item.results?.matches && item.results.matches.length > 0
            ? `<p><strong>Top match:</strong> ${item.results.matches[0].title} (${item.results.matches[0].percentage}%)</p>`
            : `<p>No matches found</p>`;
        
        historyHTML += `
            <div class="history-item">
                <div class="history-header">
                    <span class="history-date">${formattedDate}</span>
                    <button class="view-btn" onclick="viewAssessmentDetails('${item.id}')">View Details</button>
                </div>
                <div class="history-summary">
                    ${topMatch}
                </div>
            </div>
        `;
    });
    
    historyHTML += `</div>`;
    historyContainer.innerHTML = historyHTML;
}

// View assessment details
function viewAssessmentDetails(assessmentId) {
    const assessment = userAssessmentHistory.find(item => item.id === assessmentId);
    if (!assessment) return;
    
    // Create modal for viewing assessment details
    const modal = document.createElement('div');
    modal.className = 'modal assessment-details-modal';
    
    let matchesHTML = '';
    assessment.results.matches.forEach(match => {
        // Create skills HTML
        let skillsHTML = '';
        match.skills.forEach(skill => {
            skillsHTML += `<span class="skill-tag">${skill}</span>`;
        });
        
        matchesHTML += `
            <div class="career-match">
                <div class="match-percentage">
                    <div class="percentage-bar">
                        <div class="percentage-fill" style="width: ${match.percentage}%"></div>
                    </div>
                    <span class="percentage-text">${match.percentage}%</span>
                </div>
                <h5 class="match-title">${match.title}</h5>
                <p class="match-description">${match.description}</p>
                <div class="match-skills">
                    ${skillsHTML}
                </div>
            </div>
        `;
    });
    
    const formattedDate = assessment.date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Assessment Results</h2>
                <span class="close-modal" onclick="closeModal()">&times;</span>
            </div>
            <div class="modal-body">
                <p class="assessment-date">Taken on ${formattedDate}</p>
                
                <h3 class="result-title">${assessment.results.title}</h3>
                <p class="result-description">${assessment.results.description}</p>
                
                <h4>Your Career Matches</h4>
                <div class="career-matches">
                    ${matchesHTML}
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn primary-btn" onclick="closeModal()">Close</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Show modal with animation
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

// Close modal
function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    }
}

// Show toast notification
function showToast(message, type = 'success') {
    // Remove existing toast if any
    const existingToast = document.getElementById('toast');
    if (existingToast) {
        document.body.removeChild(existingToast);
    }
    
    // Create CSS if it doesn't exist
    if (!document.getElementById('toast-styles')) {
        const style = document.createElement('style');
        style.id = 'toast-styles';
        style.innerHTML = `
            .toast {
                position: fixed;
                bottom: 20px;
                right: 20px;
                padding: 12px 20px;
                border-radius: 4px;
                color: white;
                font-weight: 500;
                opacity: 0;
                transform: translateY(20px);
                transition: all 0.3s ease;
                z-index: 1000;
                max-width: 300px;
            }
            .toast.success {
                background-color: #4CAF50;
            }
            .toast.error {
                background-color: #F44336;
            }
            .toast.info {
                background-color: #2196F3;
            }
            .toast.show {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(style);
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // Show toast with animation
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // Hide after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (document.body.contains(toast)) {
                document.body.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// Redirect to login page
function redirectToLogin() {
    if (currentUser) {
        window.location.href = '../Dashboard.html';
        return;
    }
    window.location.href = '../login.html';
}

// Navigate to a page
function navigateTo(page) {
    window.location.href = page;
}

// Make the viewAssessmentDetails and closeModal functions available globally
window.viewAssessmentDetails = viewAssessmentDetails;
window.closeModal = closeModal;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeAuth);

export { 
    currentUser, 
    saveAssessmentResults, 
    redirectToLogin, 
    toggleUserMenu,
    navigateTo
};
