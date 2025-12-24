// Import Firebase modules using v9 syntax
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { 
    getAuth, 
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCX0hI8o32hBFUchmEwtyeQLbIezmLyauI",
    authDomain: "pediascape-6b99b.firebaseapp.com",
    projectId: "pediascape-6b99b",
    storageBucket: "pediascape-6b99b.appspot.com",
    messagingSenderId: "128341831687",
    appId: "1:128341831687:web:e44b694935e7ab37013aa2",
    measurementId: "G-J354SK3B93"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.addEventListener('DOMContentLoaded', function() {
    console.log("Document loaded, checking authentication status...");
    
    // Check authentication status from Firebase
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in
            console.log("Firebase user is signed in:", user.email);
            
            // Store user data in localStorage
            const userData = {
                userId: user.email,
                name: user.displayName || user.email.split('@')[0]
            };
            localStorage.setItem('user', JSON.stringify(userData));
            
            // Update UI based on authentication
            checkAuthStatus();
        } else {
            // No user is signed in with Firebase
            console.log("No Firebase user is signed in.");
            
            // Check if we have local user data
            const localUser = localStorage.getItem('user');
            if (!localUser) {
                console.log("No local user found either. Redirecting to login page.");
                window.location.href = 'login.html';
            } else {
                // We have local user data, update UI
                console.log("Local user data found. Using that.");
                checkAuthStatus();
            }
        }
    });
    
    // Task storage
    let tasks = {
        // Sample initial tasks
        '2025-04-22': [
            { text: 'Complete JavaScript assignment', completed: false, id: 1 },
            { text: 'Review React basics', completed: true, id: 2 },
            { text: 'Submit Node.js project', completed: false, id: 3 }
        ],
        '2025-04-25': [
            { text: 'Prepare for MongoDB exam', completed: false, id: 4 }
        ],
        '2025-04-28': [
            { text: 'Team meeting at 3PM', completed: false, id: 5 }
        ]
    };
    
    // Calendar elements
    const calendarGrid = document.querySelector('.calendar-grid');
    const currentMonthDisplay = document.getElementById('current-month');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    const selectedDateDisplay = document.getElementById('selected-date-display');
    
    // Todo list elements
    const todoInput = document.querySelector('.todo-input');
    const todoAddBtn = document.querySelector('.todo-add-btn');
    const todoList = document.querySelector('.todo-list');
    
    // Current date information
    const today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();
    let selectedDate = formatDate(today);
    
    // Format date as YYYY-MM-DD for storage
    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    
    // Format date for display
    function formatDisplayDate(dateStr) {
        const months = ["January", "February", "March", "April", "May", "June", 
                        "July", "August", "September", "October", "November", "December"];
        const date = new Date(dateStr);
        return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    }
    
    // Generate a unique ID for tasks
    function generateId() {
        return Date.now();
    }
    
    // Render calendar
    function renderCalendar() {
        // Clear existing calendar days
        const dayElements = document.querySelectorAll('.calendar-day');
        dayElements.forEach(day => day.remove());
        
        // Set current month and year display
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
        currentMonthDisplay.textContent = `${monthNames[currentMonth]} ${currentYear}`;
        
        // Get first day of month and total days in month
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        
        // Create empty cells for days before the first day of month
        for (let i = 0; i < firstDayOfMonth; i++) {
            const emptyDay = document.createElement('div');
            calendarGrid.appendChild(emptyDay);
        }
        
        // Create cells for each day of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('calendar-day');
            dayElement.textContent = day;
            
            // Create date string for task lookup
            const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            
            // Check if this is today
            if (currentYear === today.getFullYear() && 
                currentMonth === today.getMonth() && 
                day === today.getDate()) {
                dayElement.classList.add('current-day');
            }
            
            // Check if this is the selected date
            if (dateStr === selectedDate) {
                dayElement.classList.add('selected-day');
            }
            
            // Check if this day has tasks
            if (tasks[dateStr] && tasks[dateStr].length > 0) {
                dayElement.classList.add('event-day');
            }
            
            // Add click event to select date
            dayElement.addEventListener('click', () => {
                // Remove selected-day class from all days
                document.querySelectorAll('.calendar-day').forEach(day => {
                    day.classList.remove('selected-day');
                });
                
                // Add selected-day class to clicked day
                dayElement.classList.add('selected-day');
                
                // Update selected date
                selectedDate = dateStr;
                selectedDateDisplay.textContent = formatDisplayDate(selectedDate);
                
                // Load tasks for selected date
                loadTasks(selectedDate);
            });
            
            calendarGrid.appendChild(dayElement);
        }
    }
    
    // Load tasks for a specific date
    function loadTasks(dateStr) {
        // Clear existing tasks
        todoList.innerHTML = '';
        
        // Get tasks for selected date
        const dateTasks = tasks[dateStr] || [];
        
        if (dateTasks.length === 0) {
            // Display a message if no tasks
            const noTasksMsg = document.createElement('p');
            noTasksMsg.classList.add('no-tasks');
            noTasksMsg.textContent = 'No tasks for this date. Add one!';
            todoList.appendChild(noTasksMsg);
        } else {
            // Render each task
            dateTasks.forEach(task => {
                const todoItem = createTodoElement(task);
                todoList.appendChild(todoItem);
            });
        }
    }
    
    // Create a todo item element
    function createTodoElement(task) {
        const todoItem = document.createElement('li');
        todoItem.classList.add('todo-item');
        todoItem.dataset.id = task.id;
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('todo-checkbox');
        checkbox.checked = task.completed;
        
        const text = document.createElement('span');
        text.classList.add('todo-text');
        if (task.completed) {
            text.classList.add('completed');
        }
        text.textContent = task.text;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('todo-delete');
        deleteBtn.textContent = '×';
        
        todoItem.appendChild(checkbox);
        todoItem.appendChild(text);
        todoItem.appendChild(deleteBtn);
        
        // Add event listeners
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                text.classList.add('completed');
            } else {
                text.classList.remove('completed');
            }
            
            // Update task in storage
            updateTaskStatus(selectedDate, task.id, checkbox.checked);
        });
        
        deleteBtn.addEventListener('click', () => {
            todoItem.remove();
            deleteTask(selectedDate, task.id);
            
            // Check if there are no more tasks for this date
            if (!tasks[selectedDate] || tasks[selectedDate].length === 0) {
                loadTasks(selectedDate); // This will show the "No tasks" message
                
                // Update calendar to remove event indicator
                document.querySelectorAll('.calendar-day').forEach(day => {
                    if (day.classList.contains('selected-day')) {
                        day.classList.remove('event-day');
                    }
                });
            }
        });
        
        return todoItem;
    }
    
    // Add a new task
    function addTask() {
        const taskText = todoInput.value.trim();
        if (taskText === '') return;
        
        // Create task object
        const newTask = {
            text: taskText,
            completed: false,
            id: generateId()
        };
        
        // Initialize task array for this date if it doesn't exist
        if (!tasks[selectedDate]) {
            tasks[selectedDate] = [];
        }
        
        // Add task to storage
        tasks[selectedDate].push(newTask);
        
        // Clear input
        todoInput.value = '';
        
        // Update task list
        loadTasks(selectedDate);
        
        // Update calendar (add event indicator)
        document.querySelectorAll('.calendar-day').forEach(day => {
            if (day.classList.contains('selected-day')) {
                day.classList.add('event-day');
            }
        });
    }
    
    // Update task status
    function updateTaskStatus(dateStr, taskId, completed) {
        const dateTasks = tasks[dateStr];
        const task = dateTasks.find(t => t.id === taskId);
        if (task) {
            task.completed = completed;
        }
    }
    
    // Delete task
    function deleteTask(dateStr, taskId) {
        const dateTasks = tasks[dateStr];
        if (dateTasks) {
            tasks[dateStr] = dateTasks.filter(t => t.id !== taskId);
            // If there are no more tasks for this date, delete the date property
            if (tasks[dateStr].length === 0) {
                delete tasks[dateStr];
            }
        }
    }
    
    // Initialize calendar
    renderCalendar();
    
    // Load tasks for today's date initially
    loadTasks(selectedDate);
    selectedDateDisplay.textContent = formatDisplayDate(selectedDate);
    
    // Previous month button
    prevMonthBtn.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar();
    });
    
    // Next month button
    nextMonthBtn.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar();
    });
    
    // Add task on button click
    todoAddBtn.addEventListener('click', addTask);
    
    // Add task on Enter key
    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    
    // Set up event listeners for navigation and user menu
    setupNavigationEventListeners();
});

// Authentication related functions
function checkAuthStatus() {
    // Check if user is logged in (using localStorage)
    const user = localStorage.getItem('user');
    if (user) {
        // User is logged in
        const userData = JSON.parse(user);
        
        // Update navigation bar display
        document.getElementById('guestProfileSection').style.display = 'none';
        document.getElementById('userProfileSection').style.display = 'block';
        
        // Set user initials in avatar
        const userInitials = document.getElementById('userInitials');
        const initials = getInitials(userData.name || userData.userId);
        userInitials.textContent = initials;
        
        // Update mobile menu option
        const mobileAuthOption = document.getElementById('mobileAuthOption');
        mobileAuthOption.textContent = 'PROFILE';
        mobileAuthOption.onclick = function() {
            toggleUserMenu();
        };
        
        // Update dashboard user display
        document.getElementById('usernameDisplay').textContent = userData.userId;
        
        // Update dashboard profile image to avatar
        const dashboardProfileImage = document.getElementById('dashboardProfileImage');
        dashboardProfileImage.innerHTML = '';
        const avatarElement = document.createElement('div');
        avatarElement.className = 'user-avatar dashboard-avatar';
        avatarElement.textContent = initials;
        dashboardProfileImage.appendChild(avatarElement);
    } else {
        // User is not logged in
        document.getElementById('guestProfileSection').style.display = 'block';
        document.getElementById('userProfileSection').style.display = 'none';
        
        // Update mobile menu option
        const mobileAuthOption = document.getElementById('mobileAuthOption');
        mobileAuthOption.textContent = 'LOGIN';
        mobileAuthOption.onclick = redirectToLogin;
        
        // Update dashboard user display
        document.getElementById('usernameDisplay').textContent = 'Guest User';
        
        // Update dashboard profile image to default
        const dashboardProfileImage = document.getElementById('dashboardProfileImage');
        dashboardProfileImage.innerHTML = '<img class="profilelogo" src="./imgg/nav/profile.svg" alt="Profile">';
    }
}

// Get initials from name
function getInitials(name) {
    if (!name) return 'U';
    return name.split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);
}

// Toggle user menu
function toggleUserMenu() {
    const userMenu = document.getElementById('userMenu');
    userMenu.style.display = userMenu.style.display === 'block' ? 'none' : 'block';
}

// Redirect to login page
function redirectToLogin() {
    window.location.href = 'login.html';
}

// Navigate to page
function navigateTo(url) {
    window.location.href = url;
}

// Toggle mobile dropdown
function toggleDropdown() {
    const dropdown = document.querySelector('.dropdown');
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

// Logout function
function logout() {
    // Sign out from Firebase
    signOut(auth).then(() => {
        console.log("User signed out from Firebase");
    }).catch((error) => {
        console.error("Error signing out:", error);
    });
    
    // Remove from localStorage
    localStorage.removeItem('user');
    
    // Update UI
    checkAuthStatus();
    
    // Optional: Redirect to home page
    // window.location.href = 'index.html';
}

// Set up event listeners for navigation and user menu
function setupNavigationEventListeners() {
    // Close dropdown menu when clicking outside
    document.addEventListener('click', function(event) {
        const userMenu = document.getElementById('userMenu');
        const userInitials = document.getElementById('userInitials');
        
        if (userMenu && userMenu.style.display === 'block' && 
            event.target !== userMenu && 
            event.target !== userInitials &&
            !userMenu.contains(event.target)) {
            userMenu.style.display = 'none';
        }
    });
    
    // Set up logout button
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', logout);
    }
}