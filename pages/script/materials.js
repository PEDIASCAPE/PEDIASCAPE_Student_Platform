// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyCX0hI8o32hBFUchmEwtyeQLbIezmLyauI",
    authDomain: "pediascape-6b99b.firebaseapp.com",
    projectId: "pediascape-6b99b",
    storageBucket: "pediascape-6b99b.appspot.com",
    messagingSenderId: "128341831687",
    appId: "1:128341831687:web:e44b694935e7ab37013aa2",
    measurementId: "G-J354SK3B93"
};

// DOM Elements
const searchInput = document.getElementById('searchInput');
const courseFilter = document.getElementById('courseFilter');
const yearFilter = document.getElementById('yearFilter');
const materialsGrid = document.getElementById('materialsGrid');
const uploadBtn = document.getElementById('uploadBtn');
const fileInput = document.getElementById('fileInput');
const loginMessage = document.getElementById('loginMessage');
const userInitials = document.getElementById('userInitials');
const logoutButton = document.getElementById('logoutButton');
const userMenu = document.getElementById('userMenu');

// Global variables
let currentUser = null;
let allMaterials = [];

// Initialize Firebase and set up event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Firebase
    try {
        firebase.initializeApp(firebaseConfig);
        
        // Check authentication state
        firebase.auth().onAuthStateChanged(user => {
            currentUser = user;
            updateAuthUI(user);
            loadMaterials();
        });
        
        // Set up event listeners
        searchInput.addEventListener('input', filterMaterials);
        courseFilter.addEventListener('change', filterMaterials);
        yearFilter.addEventListener('change', filterMaterials);
        fileInput.addEventListener('change', handleFileSelection);
        
        // Click outside user menu to close it
        document.addEventListener('click', (event) => {
            const userAvatar = document.getElementById('userInitials');
            const menu = document.getElementById('userMenu');
            
            if (menu && userAvatar && event.target !== userAvatar && !menu.contains(event.target)) {
                menu.classList.remove('active');
            }
        });
        
        // Set up logout functionality
        if (logoutButton) {
            logoutButton.addEventListener('click', () => {
                firebase.auth().signOut()
                    .then(() => {
                        showToast('Logged out successfully', 'success');
                    })
                    .catch(error => {
                        showToast('Error logging out: ' + error.message, 'error');
                    });
            });
        }
        
    } catch (error) {
        showToast("Error connecting to database. Please try again later.", "error");
        console.error("Firebase initialization error:", error);
    }
});

// Toggle user menu dropdown
function toggleUserMenu() {
    if (userMenu) {
        userMenu.classList.toggle('active');
    }
}

// Update UI based on authentication state
function updateAuthUI(user) {
    if (user) {
        // User is signed in
        showToast('Logged in as ' + user.email, 'success');
        uploadBtn.textContent = 'Upload PDF';
        uploadBtn.onclick = openFileDialog;
        
        if (loginMessage) loginMessage.style.display = 'none';
        
        // Update profile display
        const profileLogo = document.querySelector('.profilelogo');
        if (profileLogo) profileLogo.style.display = 'none';
        
        const userProfile = document.querySelector('.user-profile');
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
        uploadBtn.textContent = 'Login to Upload';
        uploadBtn.onclick = redirectToLogin;
        
        if (loginMessage) loginMessage.style.display = 'block';
        
        // Update profile display
        const profileLogo = document.querySelector('.profilelogo');
        if (profileLogo) profileLogo.style.display = 'block';
        
        const userProfile = document.querySelector('.user-profile');
        if (userProfile) {
            userProfile.style.display = 'none';
        }
    }
}

// Function to load materials
function loadMaterials() {
    showLoader();
    materialsGrid.innerHTML = '';
    
    firebase.firestore().collection('materials')
        .orderBy('uploadDate', 'desc')
        .get()
        .then((querySnapshot) => {
            hideLoader();
            
            if (querySnapshot.empty) {
                showEmptyState();
                return;
            }
            
            allMaterials = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                const material = { 
                    id: doc.id,
                    title: data.title || 'Untitled',
                    course: data.course || 'Uncategorized',
                    category: data.category || 'reference',
                    year: data.year || '',
                    fileUrl: data.fileUrl || '',
                    fileName: data.fileName || 'unknown.pdf',
                    uploadedBy: data.uploadedBy || 'anonymous',
                    uploadDate: data.uploadDate || firebase.firestore.Timestamp.now()
                };
                allMaterials.push(material);
            });
            
            displayMaterials(allMaterials);
        })
        .catch((error) => {
            hideLoader();
            showEmptyState("Error loading materials. Please try again later.");
            console.error("Error loading materials:", error);
        });
}

// Function to display materials
function displayMaterials(materials) {
    materialsGrid.innerHTML = '';
    
    if (materials.length === 0) {
        showEmptyState("No materials match your search criteria.");
        return;
    }
    
    materials.forEach(material => {
        // Format date
        let dateString = 'Unknown date';
        if (material.uploadDate && material.uploadDate.toDate) {
            const date = material.uploadDate.toDate();
            dateString = date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        }
        
        const cardElement = document.createElement('div');
        cardElement.classList.add('pdf-card');
        
        // Fix the display for course value by ensuring it's display-friendly
        let displayCourse = material.course;
        if (displayCourse.includes('-')) {
            // Convert kebab-case to Title Case (e.g., "computer-science" to "Computer Science")
            displayCourse = displayCourse.split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
        }
        
        // Format year display
        let yearDisplay = '';
        if (material.year) {
            const yearSuffix = ['th', 'st', 'nd', 'rd'];
            const suffix = material.year > 3 ? yearSuffix[0] : yearSuffix[material.year];
            yearDisplay = ` - ${material.year}${suffix} Year`;
        }
        
        cardElement.innerHTML = `
            <div class="pdf-icon">PDF</div>
            <h3 class="pdf-title">${material.title}</h3>
            <p class="pdf-description">${displayCourse}${yearDisplay}</p>
            <div class="pdf-meta">
                <span class="pdf-category">${material.category}</span>
                <span>Uploaded: ${dateString}</span>
            </div>
            <div class="pdf-actions">
                <button class="action-btn" onclick="viewPDF('${material.fileUrl}')">View</button>
                <button class="action-btn" onclick="downloadPDF('${material.fileUrl}', '${material.fileName}')">Download</button>
                ${material.uploadedBy === (currentUser?.email || '') ? 
                    `<button class="action-btn" onclick="deletePDF('${material.id}')">Delete</button>` : ''}
            </div>
        `;
        materialsGrid.appendChild(cardElement);
    });
}

// Function to filter materials
function filterMaterials() {
    const searchQuery = searchInput.value.toLowerCase();
    const courseValue = courseFilter.value.toLowerCase();
    const yearValue = yearFilter.value;
    
    const filteredMaterials = allMaterials.filter(material => {
        const matchesSearch = 
            material.title.toLowerCase().includes(searchQuery) || 
            material.course.toLowerCase().includes(searchQuery);
        
        const matchesCourse = courseValue === '' || 
            material.course.toLowerCase().includes(courseValue);
        
        const matchesYear = yearValue === '' || 
            material.year === yearValue;
        
        return matchesSearch && matchesCourse && matchesYear;
    });
    
    displayMaterials(filteredMaterials);
}

// Function to open file dialog
function openFileDialog() {
    if (!currentUser) {
        redirectToLogin();
        return;
    }
    
    fileInput.click();
}

// Function to handle file selection
function handleFileSelection(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    if (file.type !== 'application/pdf') {
        showToast('Please select a PDF file', 'error');
        return;
    }
    
    // Show a modal dialog for entering PDF details
    showUploadModal(file);
}

// Function to show upload modal
function showUploadModal(file) {
    // Create modal element
    const modal = document.createElement('div');
    modal.className = 'upload-modal';
    
    // Fix the course options to match dropdown values in your HTML
    modal.innerHTML = `
        <div class="modal-content">
            <h2>Upload PDF</h2>
            <form id="uploadForm">
                <div class="form-group">
                    <label for="pdfTitle">Title</label>
                    <input type="text" id="pdfTitle" required placeholder="Enter PDF title">
                </div>
                <div class="form-group">
                    <label for="pdfCategory">Category</label>
                    <select id="pdfCategory" required>
                        <option value="academic">Academic</option>
                        <option value="research">Research</option>
                        <option value="tutorial">Tutorial</option>
                        <option value="reference">Reference</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="pdfCourse">Course/Subject</label>
                    <select id="pdfCourse" required>
                        <option value="">Select Course</option>
                        <option value="Computer Science">Computer Science</option>
                        <option value="Artificial Intelligence">Artificial Intelligence</option>
                        <option value="Data Science">Data Science</option>
                        <option value="Web Development">Web Development</option>
                        <option value="UI/UX Design">UI/UX Designing</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div id="otherCourseContainer" style="display: none;" class="form-group">
                    <label for="otherCourse">Specify Course</label>
                    <input type="text" id="otherCourse" placeholder="Enter course name">
                </div>
                <div class="form-group">
                    <label for="pdfYear">Year</label>
                    <select id="pdfYear">
                        <option value="">Select Year</option>
                        <option value="1st year">1st Year</option>
                        <option value="2nd year">2nd Year</option>
                        <option value="3rd year">3rd Year</option>
                        <option value="4th year">4th Year</option>
                    </select>
                </div>
                <div class="form-actions">
                    <button type="button" class="cancel-btn" onclick="closeModal()">Cancel</button>
                    <button type="submit" class="submit-btn">Upload</button>
                </div>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add event listener for the course dropdown
    setTimeout(() => {
        const pdfCourse = document.getElementById('pdfCourse');
        const otherCourseContainer = document.getElementById('otherCourseContainer');
        
        if (pdfCourse && otherCourseContainer) {
            pdfCourse.addEventListener('change', function() {
                if (this.value === 'other') {
                    otherCourseContainer.style.display = 'block';
                } else {
                    otherCourseContainer.style.display = 'none';
                }
            });
        }
    }, 100);
    
    // Add event listener for form submission
    document.getElementById('uploadForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const title = document.getElementById('pdfTitle').value;
        const category = document.getElementById('pdfCategory').value;
        let course = document.getElementById('pdfCourse').value;
        
        // Check if "Other" was selected
        if (course === 'other') {
            const otherCourse = document.getElementById('otherCourse').value;
            if (otherCourse.trim() !== '') {
                course = otherCourse;
            }
        }
        
        const year = document.getElementById('pdfYear').value;
        
        uploadPDF(file, title, category, course, year);
        closeModal();
    });
    
    // Show modal with animation
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

// Function to close modal
function closeModal() {
    const modal = document.querySelector('.upload-modal, .login-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    }
}

// Function to upload PDF
function uploadPDF(file, title, category, course, year) {
    if (!currentUser) {
        showToast('You must be logged in to upload files', 'error');
        return;
    }
    
    showLoader();
    
    const timestamp = new Date().getTime();
    const fileName = `${timestamp}_${file.name}`;
    const storageRef = firebase.storage().ref(`materials/${fileName}`);
    const uploadTask = storageRef.put(file);
    
    uploadTask.on('state_changed', 
        (snapshot) => {
            // Progress monitoring if needed
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
        },
        (error) => {
            hideLoader();
            showToast('Upload failed: ' + error.message, 'error');
        },
        () => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                const materialData = {
                    title,
                    category,
                    course,
                    year,
                    fileUrl: downloadURL,
                    fileName: file.name,
                    uploadedBy: currentUser.email,
                    uploadDate: firebase.firestore.FieldValue.serverTimestamp()
                };
                
                firebase.firestore().collection('materials').add(materialData)
                    .then(() => {
                        hideLoader();
                        showToast('PDF uploaded successfully!', 'success');
                        fileInput.value = ''; // Clear the file input
                        loadMaterials(); // Reload materials
                    })
                    .catch((error) => {
                        hideLoader();
                        showToast('Error saving PDF details: ' + error.message, 'error');
                    });
            });
        }
    );
}

// Function to view PDF
function viewPDF(url) {
    window.open(url, '_blank');
}

// Function to download PDF
function downloadPDF(url, fileName) {
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    showToast('Download started', 'success');
}

// Function to delete PDF
function deletePDF(id) {
    if (!currentUser) {
        showToast('You must be logged in to delete PDFs', 'error');
        return;
    }
    
    if (!confirm('Are you sure you want to delete this PDF? This action cannot be undone.')) {
        return;
    }
    
    showLoader();
    
    firebase.firestore().collection('materials').doc(id).get()
        .then((doc) => {
            if (!doc.exists) {
                throw new Error('PDF not found');
            }
            
            const data = doc.data();
            
            if (data.uploadedBy !== currentUser.email) {
                throw new Error('You can only delete PDFs you uploaded');
            }
            
            return firebase.firestore().collection('materials').doc(id).delete().then(() => {
                if (data.fileUrl) {
                    const storageRef = firebase.storage().refFromURL(data.fileUrl);
                    return storageRef.delete();
                }
            });
        })
        .then(() => {
            hideLoader();
            showToast('PDF deleted successfully', 'success');
            loadMaterials();
        })
        .catch((error) => {
            hideLoader();
            showToast('Error deleting PDF: ' + error.message, 'error');
        });
}

// Function to show empty state
function showEmptyState(message = "No materials available yet.") {
    materialsGrid.innerHTML = `
        <div class="empty-state">
            <div class="empty-icon">📚</div>
            <p>${message}</p>
            ${currentUser ? '<p>Upload your first PDF to get started!</p>' : '<p>Log in to upload PDFs.</p>'}
        </div>
    `;
}

// Function to show loader
function showLoader() {
    // Check if loader exists
    if (!document.getElementById('loader')) {
        const loader = document.createElement('div');
        loader.id = 'loader';
        loader.className = 'loader';
        loader.innerHTML = '<div class="spinner"></div>';
        
        // Add CSS for loader
        const style = document.createElement('style');
        style.innerHTML = `
            .loader {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.7);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 2000;
            }
            .spinner {
                width: 50px;
                height: 50px;
                border: 5px solid rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                border-top-color: #fff;
                animation: spin 1s ease-in-out infinite;
            }
            @keyframes spin {
                to { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(loader);
    } else {
        document.getElementById('loader').style.display = 'flex';
    }
}

// Function to hide loader
function hideLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.display = 'none';
    }
}

// Function to show toast notification
function showToast(message, type = 'success') {
    // Remove existing toast if any
    const existingToast = document.getElementById('toast');
    if (existingToast) {
        document.body.removeChild(existingToast);
    }
    
    // Create new toast
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

// Function to redirect to login page
function redirectToLogin() {
    // Redirect to separate login page instead of showing a modal
    window.location.href = '../pages/login.html';
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