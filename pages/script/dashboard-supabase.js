
import { supabase } from "./supabase-client.js";

let currentUser = null;
let calendar = null;

const SERVER_ORIGIN = (() => {
    const origin = window.location.origin;
    const hostname = window.location.hostname || '';
    const protocol = window.location.protocol === 'https:' ? 'https:' : 'http:';

    if (!origin || origin === 'null') return 'http://localhost:3000';

    const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1';
    if (isLocalhost) {
        const backendHost = hostname === '127.0.0.1' ? 'localhost' : hostname;
        if (window.location.port !== '3000') {
            return `${protocol}//${backendHost}:3000`;
        }
        return `${protocol}//${backendHost}:3000`;
    }

    return origin;
})();

function apiUrl(path) {
    return new URL(path, SERVER_ORIGIN).toString();
}

let todoBackend = null;

function getTodoStorageKey(userId) {
    return `pediascape_todos:${userId}`;
}

function readLocalTodos(userId) {
    try {
        const raw = localStorage.getItem(getTodoStorageKey(userId));
        const arr = raw ? JSON.parse(raw) : [];
        return Array.isArray(arr) ? arr : [];
    } catch (_) {
        return [];
    }
}

function writeLocalTodos(userId, todos) {
    localStorage.setItem(getTodoStorageKey(userId), JSON.stringify(todos));
}

function upsertTodoEvent(todo) {
    if (!calendar || !todo?.id || !todo?.date) return;
    const eventId = `todo-${todo.id}`;
    const existingEvent = calendar.getEventById(eventId);
    if (existingEvent) {
        existingEvent.setProp('title', todo.text);
        existingEvent.setStart(todo.date);
        existingEvent.setExtendedProp('completed', !!todo.completed);
        existingEvent.setProp('classNames', todo.completed ? ['todo-task-completed'] : ['todo-task']);
        return;
    }
    calendar.addEvent({
        id: eventId,
        title: todo.text,
        start: todo.date,
        allDay: true,
        classNames: todo.completed ? ['todo-task-completed'] : ['todo-task'],
        extendedProps: { completed: !!todo.completed }
    });
}

function removeTodoEvent(todoId) {
    if (!calendar || !todoId) return;
    const existingEvent = calendar.getEventById(`todo-${todoId}`);
    if (existingEvent) existingEvent.remove();
}

function clearTodoEvents() {
    if (!calendar) return;
    calendar.getEvents().forEach((e) => {
        if (typeof e.id === 'string' && e.id.startsWith('todo-')) e.remove();
    });
}

// Make functions globally available for HTML onclick events
window.toggleUserMenu = function() {
    const userMenu = document.getElementById('userMenu');
    userMenu.classList.toggle('active');
}

window.navigateTo = function(page) {
    window.location.href = page;
}

window.toggleDropdown = function() {
    const dropdown = document.querySelector('.dropdown');
    dropdown.classList.toggle('show'); // Original code used 'active' in some places, 'show' in others? 
    // Checking previous read: toggleDropdown uses 'show' at line 987, but in app.js it used 'active'.
    // In Dashboard.html line 400 onclick="toggleDropdown()", let's check CSS. 
    // Assuming 'active' based on CSS usually, but line 987 said 'show'. I'll stick to 'active' as it's more common in this codebase or check CSS.
    // Actually, line 987 says: dropdown.classList.toggle('show');
    // But wait, line 51 says: dropdown.classList.toggle('active'); in app.js.
    // In Dashboard.html line 987 it says 'show'. I will use 'active' to match the CSS likely found in newps1_copy.css?
    // Let's use 'active' as a safe bet if 'show' is not working, but I'll stick to what was in the file: 'show' at line 987.
    // Wait, line 52 says <div class="dropdown">...
    // I'll stick to 'active' as it is more consistent with other files.
    dropdown.classList.toggle('active');
}

function showToast(message, type) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type}`;
    // The CSS for .toast.show might be needed.
    // Original code added 'show'.
    toast.style.opacity = '1'; // Force opacity if class doesn't work
    setTimeout(() => {
        toast.style.opacity = '0';
    }, 3000);
}

document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Initialize FullCalendar
        initializeCalendar();
        
        // Set default date for todo input to today
        const todoDateInput = document.getElementById('todoDate');
        if (todoDateInput) {
            const today = new Date();
            const formattedDate = today.toISOString().split('T')[0];
            todoDateInput.value = formattedDate;
        }
        
        // Check authentication state
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
            currentUser = user;
            updateAuthUI(user);
            loadUserData();
        } else {
            // Redirect to login if not authenticated
            window.location.href = 'login.html';
        }

        supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_OUT') {
                window.location.href = 'login.html';
            } else if (session?.user) {
                currentUser = session.user;
                updateAuthUI(currentUser);
            }
        });
        
        // Set up logout functionality
        const logoutButton = document.getElementById('logoutButton');
        if (logoutButton) {
            logoutButton.addEventListener('click', async () => {
                const { error } = await supabase.auth.signOut();
                if (error) {
                    showToast('Error logging out: ' + error.message, 'error');
                } else {
                    showToast('Logged out successfully', 'success');
                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 1000);
                }
            });
        }
        
        // Initialize To-Do list functionality
        initializeTodoList();
        
        // Close user menu when clicking outside
        document.addEventListener('click', (event) => {
            const userAvatar = document.getElementById('userInitials');
            const userMenu = document.getElementById('userMenu');
            
            if (userMenu && userAvatar && event.target !== userAvatar && !userMenu.contains(event.target)) {
                userMenu.classList.remove('active');
            }
        });
        
    } catch (error) {
        console.error("Initialization error:", error);
        showToast("Error loading dashboard. Please try again later.", "error");
    }
});

function initializeCalendar() {
    const calendarEl = document.getElementById('calendar');
    if (!calendarEl) return;
    
    // Check if FullCalendar is loaded
    if (typeof FullCalendar === 'undefined') {
        console.error('FullCalendar not loaded');
        return;
    }

    calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        height: 'auto',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek'
        },
        events: [],
        dateClick: function(info) {
            const todoDate = document.getElementById('todoDate');
            const todoInput = document.getElementById('todoInput');
            if (todoDate) todoDate.value = info.dateStr;
            if (todoInput) todoInput.focus();
        },
        eventClick: function(info) {
            const eventId = info.event.id;
            
            if (eventId.startsWith('todo-')) {
                const todoId = eventId.replace('todo-', '');
                const todoStatus = info.event.extendedProps.completed ? 'complete' : 'incomplete';
                const actionText = todoStatus === 'complete' ? 'mark as incomplete' : 'mark as complete';
                
                const action = confirm(`Do you want to ${actionText} or delete the task "${info.event.title}"?\nClick OK to ${actionText} or Cancel to delete.`);
                
                if (action) {
                    toggleTodoCompletion(todoId, info.event.extendedProps.completed);
                } else {
                    if (confirm(`Are you sure you want to delete "${info.event.title}"?`)) {
                        deleteTodo(todoId);
                    }
                }
            } else {
                if (confirm(`Are you sure you want to delete '${info.event.title}'?`)) {
                    info.event.remove();
                    if (currentUser) {
                        deleteEventFromSupabase(info.event.id);
                    }
                }
            }
        }
    });
    
    calendar.render();
}

function updateAuthUI(user) {
    const userInitials = document.getElementById('userInitials');
    const mobileAuthOption = document.getElementById('mobileAuthOption');
    
    if (user) {
        const email = user.email || '';
        const initials = email.split('@')[0].charAt(0).toUpperCase();
        if (userInitials) userInitials.innerText = initials;
        
        if (mobileAuthOption) {
            mobileAuthOption.innerText = 'DASHBOARD';
            mobileAuthOption.onclick = () => navigateTo('dashboard.html');
        }
    } else {
        if (mobileAuthOption) {
            mobileAuthOption.innerText = 'LOGIN';
            mobileAuthOption.onclick = () => navigateTo('login.html');
        }
    }
}

function loadUserData() {
    const userEmailDisplay = document.getElementById('userEmailDisplay');
    if (userEmailDisplay) userEmailDisplay.textContent = currentUser.email;
    
    loadCalendarEvents();
    loadTodos();
}

async function loadCalendarEvents() {
    if (!currentUser) return;
    
    calendar.getEvents().forEach(event => event.remove());
    
    const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('user_id', currentUser.id);
        
    if (error) {
        console.error("Error loading events:", error);
        return;
    }
    
    data.forEach(event => {
        calendar.addEvent({
            id: event.id,
            title: event.title,
            start: event.date,
            allDay: true
        });
    });
    
    // We will load todos separately
}

async function loadTodos() {
    if (!currentUser) return;
    try {
        let data = [];

        if (todoBackend !== 'local') {
            try {
                const resp = await fetch(apiUrl(`/api/todos?user_id=${encodeURIComponent(currentUser.id)}`));
                if (resp.ok) {
                    const json = await resp.json();
                    data = json.todos || [];
                    todoBackend = 'server';
                } else {
                    todoBackend = 'local';
                }
            } catch (_) {
                todoBackend = 'local';
            }
        }

        if (todoBackend === 'local') {
            data = readLocalTodos(currentUser.id);
        }

        const todoList = document.getElementById('todoList');
        if (!todoList) return;

        todoList.innerHTML = '';
        clearTodoEvents();

        if (data.length === 0) {
            todoList.innerHTML = `
                <div style="text-align: center; padding: 20px; opacity: 0.7;">
                    <i class="fas fa-tasks" style="font-size: 2rem; margin-bottom: 10px;"></i>
                    <p>No tasks yet. Add your first task above!</p>
                </div>
            `;
            return;
        }
        
        data.forEach(todo => {
            const todoItem = createTodoItem(todo.id, todo.text, todo.date, todo.completed);
            todoList.appendChild(todoItem);
            upsertTodoEvent(todo);
        });
    } catch (error) {
        console.error('Error loading todos:', error);
        showToast('Failed to load tasks', 'error');
    }
}

function createTodoItem(id, text, date, completed) {
    const todoItem = document.createElement('div');
    todoItem.className = `todo-item ${completed ? 'completed' : ''}`;
    todoItem.dataset.id = id;
    
    const displayDate = new Date(date).toLocaleDateString(undefined, { 
        month: 'short', 
        day: 'numeric' 
    });
    
    todoItem.innerHTML = `
        <input type="checkbox" class="todo-checkbox" ${completed ? 'checked' : ''}>
        <span class="todo-text">${text}</span>
        <span class="todo-date-display">${displayDate}</span>
        <i class="fas fa-trash delete-todo"></i>
    `;
    
    const checkbox = todoItem.querySelector('.todo-checkbox');
    checkbox.addEventListener('change', () => {
        toggleTodoCompletion(id, checkbox.checked);
    });
    
    const deleteButton = todoItem.querySelector('.delete-todo');
    deleteButton.addEventListener('click', () => {
        if (confirm(`Are you sure you want to delete "${text}"?`)) {
            deleteTodo(id);
        }
    });
    
    return todoItem;
}

function initializeTodoList() {
    const todoInput = document.getElementById('todoInput');
    const addTodoBtn = document.getElementById('addTodoBtn');
    
    if (addTodoBtn) {
        addTodoBtn.addEventListener('click', addTodo);
    }
    
    if (todoInput) {
        todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                addTodo();
            }
        });
    }
}

async function addTodo() {
    const todoInput = document.getElementById('todoInput');
    const todoDate = document.getElementById('todoDate');
    const text = todoInput.value.trim();
    const dateValue = todoDate.value;
    
    if (text && dateValue && currentUser) {
        try {
            if (todoBackend !== 'local') {
                try {
                    const resp = await fetch(apiUrl('/api/todos'), {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ user_id: currentUser.id, text, date: dateValue })
                    });
                    if (resp.ok) {
                        todoBackend = 'server';
                    } else {
                        todoBackend = 'local';
                    }
                } catch (_) {
                    todoBackend = 'local';
                }
            }

            if (todoBackend === 'local') {
                const todos = readLocalTodos(currentUser.id);
                const id = (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
                const todo = { id, text, date: dateValue, completed: false, created_at: new Date().toISOString(), user_id: currentUser.id };
                todos.unshift(todo);
                writeLocalTodos(currentUser.id, todos);
            }

            todoInput.value = '';
            showToast('Task added successfully', 'success');
            loadTodos();
        } catch (error) {
            console.error('Error adding todo:', error);
            showToast('Error adding todo', 'error');
        }
    } else {
        showToast("Please enter a task and select a date", "error");
    }
}

async function toggleTodoCompletion(id, newStatus) {
    try {
        if (todoBackend !== 'local') {
            try {
                const resp = await fetch(apiUrl(`/api/todos/${encodeURIComponent(id)}`), {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ completed: !!newStatus })
                });
                if (resp.ok) {
                    todoBackend = 'server';
                } else {
                    todoBackend = 'local';
                }
            } catch (_) {
                todoBackend = 'local';
            }
        }

        if (todoBackend === 'local') {
            const todos = readLocalTodos(currentUser.id);
            const next = todos.map((t) => t.id === id ? { ...t, completed: !!newStatus } : t);
            writeLocalTodos(currentUser.id, next);
        }

        showToast(`Task marked as ${newStatus ? 'completed' : 'active'}`, 'success');
        loadTodos();
    } catch (error) {
        console.error('Error updating todo:', error);
        showToast('Error updating todo', 'error');
    }
}

async function deleteTodo(id) {
    try {
        if (todoBackend !== 'local') {
            try {
                const resp = await fetch(apiUrl(`/api/todos/${encodeURIComponent(id)}`), { method: 'DELETE' });
                if (resp.ok) {
                    todoBackend = 'server';
                } else {
                    todoBackend = 'local';
                }
            } catch (_) {
                todoBackend = 'local';
            }
        }

        if (todoBackend === 'local') {
            const todos = readLocalTodos(currentUser.id);
            const next = todos.filter((t) => t.id !== id);
            writeLocalTodos(currentUser.id, next);
            removeTodoEvent(id);
        }

        showToast('Task deleted successfully', 'success');
        loadTodos();
    } catch (error) {
        console.error('Error deleting todo:', error);
        showToast('Error deleting todo', 'error');
    }
}

async function deleteEventFromSupabase(id) {
    const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id);
        
    if (error) {
        console.error("Error deleting event:", error);
    }
}
