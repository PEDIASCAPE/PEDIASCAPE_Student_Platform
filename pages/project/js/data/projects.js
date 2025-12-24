/**
 * Project data for DevProjects Hub
 * Contains 50 projects arranged by difficulty level: beginner, intermediate, and advanced
 */
const PROJECTS_DATA = [
  // BEGINNER PROJECTS
  {
    id: 'b1',
    title: 'Interactive To-Do List',
    description: 'Create a simple to-do list application that allows users to add, edit, mark as complete, and delete tasks.',
    difficulty: 'beginner',
    estimatedTime: '3-4 hours',
    category: 'DOM Manipulation',
    tags: ['HTML', 'CSS', 'JavaScript'],
    objectives: [
      'Learn DOM manipulation',
      'Implement event handling',
      'Store data in localStorage',
      'Style using CSS'
    ],
    steps: [
      {
        title: 'Setup the project structure',
        content: 'Create the necessary HTML, CSS, and JavaScript files and link them together.',
        code: 'mkdir todo-app\ncd todo-app\ntouch index.html style.css app.js'
      },
      {
        title: 'Create the HTML structure',
        content: 'Build the HTML structure for the to-do list, including a form for adding tasks and a container for the list items.',
        code: '<!-- Main container -->\n<div class="container">\n  <h1>To-Do List</h1>\n  \n  <!-- Task form -->\n  <form id="task-form">\n    <input type="text" id="task-input" placeholder="Add a new task...">\n    <button type="submit">Add</button>\n  </form>\n  \n  <!-- Task list -->\n  <ul id="task-list"></ul>\n</div>'
      },
      {
        title: 'Style with CSS',
        content: 'Add styles to make your to-do list visually appealing and user-friendly.',
        code: '/* Basic styling for the to-do list */\n.container {\n  max-width: 500px;\n  margin: 0 auto;\n  padding: 20px;\n}\n\n/* Style for task items */\n.task-item {\n  display: flex;\n  justify-content: space-between;\n  padding: 10px;\n  margin-bottom: 10px;\n  background-color: #f5f5f5;\n  border-radius: 5px;\n}\n\n.completed {\n  text-decoration: line-through;\n  opacity: 0.7;\n}'
      },
      {
        title: 'Implement JavaScript functionality',
        content: 'Add JavaScript to handle adding, editing, completing, and deleting tasks.',
        code: '// Select DOM elements\nconst taskForm = document.getElementById(\'task-form\');\nconst taskInput = document.getElementById(\'task-input\');\nconst taskList = document.getElementById(\'task-list\');\n\n// Event listener for form submission\ntaskForm.addEventListener(\'submit\', function(e) {\n  e.preventDefault();\n  addTask();\n});\n\nfunction addTask() {\n  const taskText = taskInput.value.trim();\n  \n  if (taskText !== \'\') {\n    // Create task element\n    const taskItem = document.createElement(\'li\');\n    taskItem.classList.add(\'task-item\');\n    \n    taskItem.innerHTML = `\n      <span class="task-text">${taskText}</span>\n      <div class="task-actions">\n        <button class="complete-btn">Complete</button>\n        <button class="edit-btn">Edit</button>\n        <button class="delete-btn">Delete</button>\n      </div>\n    `;\n    \n    // Add task to list\n    taskList.appendChild(taskItem);\n    \n    // Clear input field\n    taskInput.value = \'\';\n    \n    // Add event listeners to buttons\n    // (Complete, edit, and delete functionality would go here)\n  }\n}'
      }
    ],
    tips: [
      'Use localStorage to persist tasks even when the browser is closed',
      'Implement keyboard shortcuts for better usability',
      'Consider adding due dates or priority levels as an enhancement',
      'Add animations for a better user experience'
    ],
    resources: [
      { text: 'MDN Web Docs: DOM Manipulation', url: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Manipulating_documents' },
      { text: 'localStorage API Guide', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage' }
    ]
  },
  {
    id: 'b2',
    title: 'Responsive Navigation Menu',
    description: 'Build a responsive navigation menu that transforms into a hamburger menu on mobile devices.',
    difficulty: 'beginner',
    estimatedTime: '2-3 hours',
    category: 'Responsive Design',
    tags: ['HTML', 'CSS', 'JavaScript'],
    objectives: [
      'Learn responsive design principles',
      'Implement CSS media queries',
      'Create toggle functionality with JavaScript',
      'Implement smooth animations'
    ],
    steps: [
      {
        title: 'Set up HTML structure',
        content: 'Create the basic HTML structure for your navigation menu.',
        code: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Responsive Navigation</title>\n  <link rel="stylesheet" href="styles.css">\n</head>\n<body>\n  <header>\n    <div class="logo">Logo</div>\n    <nav class="nav">\n      <ul class="nav-list">\n        <li><a href="#">Home</a></li>\n        <li><a href="#">About</a></li>\n        <li><a href="#">Services</a></li>\n        <li><a href="#">Portfolio</a></li>\n        <li><a href="#">Contact</a></li>\n      </ul>\n    </nav>\n    <div class="menu-toggle">\n      <span class="bar"></span>\n      <span class="bar"></span>\n      <span class="bar"></span>\n    </div>\n  </header>\n  <script src="script.js"></script>\n</body>\n</html>'
      },
      {
        title: 'Add desktop styles',
        content: 'Style the navigation for desktop view first.',
        code: '* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\nbody {\n  font-family: Arial, sans-serif;\n}\n\nheader {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1rem 2rem;\n  background-color: #333;\n  color: white;\n}\n\n.logo {\n  font-size: 1.5rem;\n  font-weight: bold;\n}\n\n.nav-list {\n  display: flex;\n  list-style: none;\n}\n\n.nav-list li {\n  margin-left: 1.5rem;\n}\n\n.nav-list a {\n  color: white;\n  text-decoration: none;\n  transition: color 0.3s ease;\n}\n\n.nav-list a:hover {\n  color: #f8a100;\n}\n\n.menu-toggle {\n  display: none;\n  cursor: pointer;\n}'
      },
      {
        title: 'Add mobile styles with media queries',
        content: 'Implement media queries to adjust the navigation for smaller screens.',
        code: '@media screen and (max-width: 768px) {\n  .nav {\n    position: fixed;\n    top: 0;\n    right: -100%;\n    width: 70%;\n    height: 100vh;\n    background-color: #333;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    transition: right 0.5s ease;\n  }\n  \n  .nav.active {\n    right: 0;\n  }\n  \n  .nav-list {\n    flex-direction: column;\n    align-items: center;\n  }\n  \n  .nav-list li {\n    margin: 1.5rem 0;\n  }\n  \n  .menu-toggle {\n    display: block;\n    z-index: 1000;\n  }\n  \n  .bar {\n    display: block;\n    width: 25px;\n    height: 3px;\n    margin: 5px auto;\n    background-color: white;\n    transition: all 0.3s ease;\n  }\n  \n  .menu-toggle.active .bar:nth-child(1) {\n    transform: translateY(8px) rotate(45deg);\n  }\n  \n  .menu-toggle.active .bar:nth-child(2) {\n    opacity: 0;\n  }\n  \n  .menu-toggle.active .bar:nth-child(3) {\n    transform: translateY(-8px) rotate(-45deg);\n  }\n}'
      },
      {
        title: 'Implement JavaScript toggle',
        content: 'Add JavaScript to toggle the menu when the hamburger icon is clicked.',
        code: 'const menuToggle = document.querySelector(\'.menu-toggle\');\nconst nav = document.querySelector(\'.nav\');\n\nmenuToggle.addEventListener(\'click\', () => {\n  menuToggle.classList.toggle(\'active\');\n  nav.classList.toggle(\'active\');\n});\n\n// Close menu when clicking outside\ndocument.addEventListener(\'click\', (e) => {\n  if (!menuToggle.contains(e.target) && !nav.contains(e.target) && nav.classList.contains(\'active\')) {\n    menuToggle.classList.remove(\'active\');\n    nav.classList.remove(\'active\');\n  }\n});'
      }
    ],
    tips: [
      'Always test on multiple screen sizes',
      'Use the hamburger menu sparingly; it hides navigation options',
      'Consider using ARIA attributes for better accessibility',
      'Use custom properties (CSS variables) for consistent colors and transitions'
    ],
    resources: [
      { text: 'CSS Media Queries', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries' },
      { text: 'Mobile-First Design Strategy', url: 'https://www.uxpin.com/studio/blog/a-hands-on-guide-to-mobile-first-design/' }
    ]
  },
  {
    id: 'b3',
    title: 'Simple Calculator',
    description: 'Build a basic calculator that can perform addition, subtraction, multiplication, and division.',
    difficulty: 'beginner',
    estimatedTime: '3-5 hours',
    category: 'DOM Manipulation',
    tags: ['HTML', 'CSS', 'JavaScript'],
    objectives: [
      'Practice HTML structure for a calculator interface',
      'Style a calculator with CSS Grid',
      'Implement calculator logic with JavaScript',
      'Handle number inputs and operations'
    ],
    steps: [
      {
        title: 'Set up HTML structure',
        content: 'Create the basic calculator layout with HTML.',
        code: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Simple Calculator</title>\n  <link rel="stylesheet" href="styles.css">\n</head>\n<body>\n  <div class="calculator">\n    <div class="display">\n      <div class="previous-operand"></div>\n      <div class="current-operand">0</div>\n    </div>\n    <button class="span-two">AC</button>\n    <button>DEL</button>\n    <button>÷</button>\n    <button>1</button>\n    <button>2</button>\n    <button>3</button>\n    <button>×</button>\n    <button>4</button>\n    <button>5</button>\n    <button>6</button>\n    <button>+</button>\n    <button>7</button>\n    <button>8</button>\n    <button>9</button>\n    <button>-</button>\n    <button>.</button>\n    <button>0</button>\n    <button class="span-two">=</button>\n  </div>\n  <script src="script.js"></script>\n</body>\n</html>'
      },
      {
        title: 'Style the calculator',
        content: 'Use CSS Grid to create the calculator layout.',
        code: '*, *::before, *::after {\n  box-sizing: border-box;\n  font-family: "Helvetica Neue", sans-serif;\n  font-weight: normal;\n}\n\nbody {\n  margin: 0;\n  padding: 0;\n  background: linear-gradient(to right, #00AAFF, #00FF6C);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 100vh;\n}\n\n.calculator {\n  background-color: rgba(255, 255, 255, .9);\n  border-radius: 10px;\n  width: 400px;\n  max-width: 90vw;\n  overflow: hidden;\n  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  grid-gap: 1px;\n  padding: 1px;\n}\n\n.display {\n  grid-column: 1 / -1;\n  background-color: rgba(0, 0, 0, .75);\n  color: white;\n  padding: 20px;\n  text-align: right;\n}\n\n.previous-operand {\n  font-size: 1.5rem;\n  color: rgba(255, 255, 255, .75);\n}\n\n.current-operand {\n  font-size: 2.5rem;\n}\n\nbutton {\n  background-color: rgba(255, 255, 255, .75);\n  border: none;\n  outline: none;\n  font-size: 1.5rem;\n  padding: 20px;\n  cursor: pointer;\n  transition: background-color 0.2s ease;\n}\n\nbutton:hover {\n  background-color: rgba(255, 255, 255, .9);\n}\n\n.span-two {\n  grid-column: span 2;\n}'
      },
      {
        title: 'Implement calculator logic',
        content: 'Add JavaScript to make the calculator functional.',
        code: '// Select DOM elements\nconst previousOperandElement = document.querySelector(\'.previous-operand\');\nconst currentOperandElement = document.querySelector(\'.current-operand\');\nconst buttons = document.querySelectorAll(\'button\');\n\n// Calculator state\nlet currentOperand = \'\';\nlet previousOperand = \'\';\nlet operation = undefined;\n\n// Add event listeners to buttons\nbuttons.forEach(button => {\n  button.addEventListener(\'click\', () => {\n    // Handle different button types\n    if (button.innerText === \'AC\') {\n      clear();\n    } else if (button.innerText === \'DEL\') {\n      deleteNumber();\n    } else if (button.innerText === \'=\') {\n      compute();\n    } else if (button.innerText === \'+\' || button.innerText === \'-\' || button.innerText === \'×\' || button.innerText === \'÷\') {\n      setOperation(button.innerText);\n    } else {\n      appendNumber(button.innerText);\n    }\n    \n    updateDisplay();\n  });\n});\n\n// Functions for calculator operations\nfunction clear() {\n  currentOperand = \'\';\n  previousOperand = \'\';\n  operation = undefined;\n}\n\nfunction deleteNumber() {\n  currentOperand = currentOperand.toString().slice(0, -1);\n}\n\nfunction appendNumber(number) {\n  if (number === \'.\' && currentOperand.includes(\'.\')) return;\n  currentOperand = currentOperand.toString() + number.toString();\n}\n\nfunction setOperation(op) {\n  if (currentOperand === \'\') return;\n  if (previousOperand !== \'\') {\n    compute();\n  }\n  operation = op;\n  previousOperand = currentOperand;\n  currentOperand = \'\';\n}\n\nfunction compute() {\n  let computation;\n  const prev = parseFloat(previousOperand);\n  const current = parseFloat(currentOperand);\n  if (isNaN(prev) || isNaN(current)) return;\n  \n  switch (operation) {\n    case \'+\':\n      computation = prev + current;\n      break;\n    case \'-\':\n      computation = prev - current;\n      break;\n    case \'×\':\n      computation = prev * current;\n      break;\n    case \'÷\':\n      computation = prev / current;\n      break;\n    default:\n      return;\n  }\n  \n  currentOperand = computation;\n  operation = undefined;\n  previousOperand = \'\';\n}\n\nfunction getDisplayNumber(number) {\n  const stringNumber = number.toString();\n  const integerDigits = parseFloat(stringNumber.split(\'.\')[0]);\n  const decimalDigits = stringNumber.split(\'.\')[1];\n  let integerDisplay;\n  \n  if (isNaN(integerDigits)) {\n    integerDisplay = \'\';\n  } else {\n    integerDisplay = integerDigits.toLocaleString(\'en\', { maximumFractionDigits: 0 });\n  }\n  \n  if (decimalDigits != null) {\n    return `${integerDisplay}.${decimalDigits}`;\n  } else {\n    return integerDisplay;\n  }\n}\n\nfunction updateDisplay() {\n  currentOperandElement.innerText = getDisplayNumber(currentOperand) || \'0\';\n  if (operation != null) {\n    previousOperandElement.innerText = `${getDisplayNumber(previousOperand)} ${operation}`;\n  } else {\n    previousOperandElement.innerText = \'\';\n  }\n}'
      },
      {
        title: 'Add keyboard support',
        content: 'Enhance your calculator by adding keyboard support.',
        code: '// Add keyboard support\ndocument.addEventListener(\'keydown\', (event) => {\n  if (event.key >= \'0\' && event.key <= \'9\') {\n    appendNumber(event.key);\n  } else if (event.key === \'.\') {\n    appendNumber(\'.\');\n  } else if (event.key === \'+\') {\n    setOperation(\'+\');\n  } else if (event.key === \'-\') {\n    setOperation(\'-\');\n  } else if (event.key === \'*\') {\n    setOperation(\'×\');\n  } else if (event.key === \'/\') {\n    setOperation(\'÷\');\n  } else if (event.key === \'Enter\' || event.key === \'=\') {\n    event.preventDefault();\n    compute();\n  } else if (event.key === \'Backspace\') {\n    deleteNumber();\n  } else if (event.key === \'Escape\') {\n    clear();\n  }\n  \n  updateDisplay();\n});'
      }
    ],
    tips: [
      'Focus on user experience by adding keyboard support',
      'Handle edge cases like division by zero',
      'Add visual feedback when buttons are pressed',
      'Use CSS transitions for smooth animations'
    ],
    resources: [
      { text: 'JavaScript Number Methods', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number' },
      { text: 'CSS Grid Layout', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout' }
    ]
  },
  {
    id: 'b4',
    title: 'Form Validation',
    description: 'Create a form with client-side validation for common input types like email, password, and phone numbers.',
    difficulty: 'beginner',
    estimatedTime: '3-4 hours',
    category: 'Forms',
    tags: ['HTML', 'CSS', 'JavaScript', 'Validation'],
    objectives: [
      'Learn form validation techniques',
      'Implement regular expressions for validation',
      'Provide user feedback for form errors',
      'Create responsive form layout'
    ],
    steps: [],
    tips: [],
    resources: []
  },
  {
    id: 'b5',
    title: 'Image Slider',
    description: 'Build a responsive image slider/carousel with navigation controls and indicators.',
    difficulty: 'beginner',
    estimatedTime: '3-4 hours',
    category: 'DOM Manipulation',
    tags: ['HTML', 'CSS', 'JavaScript', 'Animation'],
    objectives: [],
    steps: [],
    tips: [],
    resources: []
  },
  {
    id: 'b6',
    title: 'Analog Clock',
    description: 'Create an analog clock with hour, minute, and second hands using HTML, CSS, and JavaScript.',
    difficulty: 'beginner',
    estimatedTime: '2-3 hours',
    category: 'Animation',
    tags: ['HTML', 'CSS', 'JavaScript', 'Date API'],
    objectives: [],
    steps: [],
    tips: [],
    resources: []
  },
  {
    id: 'b7',
    title: 'Random Quote Generator',
    description: 'Build a random quote generator that displays inspirational quotes and allows users to share them on social media.',
    difficulty: 'beginner',
    estimatedTime: '2-3 hours',
    category: 'API Integration',
    tags: ['HTML', 'CSS', 'JavaScript', 'API'],
    objectives: [],
    steps: [],
    tips: [],
    resources: []
  },
  {
    id: 'b8',
    title: 'Tip Calculator',
    description: 'Create a calculator that helps users determine appropriate tip amounts based on the bill and service quality.',
    difficulty: 'beginner',
    estimatedTime: '2-3 hours',
    category: 'DOM Manipulation',
    tags: ['HTML', 'CSS', 'JavaScript'],
    objectives: [],
    steps: [],
    tips: [],
    resources: []
  },
  {
    id: 'b9',
    title: 'Password Generator',
    description: 'Build a tool to generate secure passwords with customizable options for length and character types.',
    difficulty: 'beginner',
    estimatedTime: '2-3 hours',
    category: 'DOM Manipulation',
    tags: ['HTML', 'CSS', 'JavaScript', 'Security'],
    objectives: [],
    steps: [],
    tips: [],
    resources: []
  },
  {
    id: 'b10',
    title: 'BMI Calculator',
    description: 'Create a BMI (Body Mass Index) calculator with visual indicators and health suggestions.',
    difficulty: 'beginner',
    estimatedTime: '2-3 hours',
    category: 'DOM Manipulation',
    tags: ['HTML', 'CSS', 'JavaScript', 'Health'],
    objectives: [],
    steps: [],
    tips: [],
    resources: []
  },
  {
    id: 'b11',
    title: 'Simple Weather App',
    description: 'Build a basic weather application that displays current weather conditions based on user location or search.',
    difficulty: 'beginner',
    estimatedTime: '3-4 hours',
    category: 'API Integration',
    tags: ['HTML', 'CSS', 'JavaScript', 'API', 'Geolocation'],
    objectives: [],
    steps: [],
    tips: [],
    resources: []
  },
  {
    id: 'b12',
    title: 'Countdown Timer',
    description: 'Create a customizable countdown timer for events, with visual and audio notifications.',
    difficulty: 'beginner',
    estimatedTime: '2-3 hours',
    category: 'DOM Manipulation',
    tags: ['HTML', 'CSS', 'JavaScript', 'Date API'],
    objectives: [],
    steps: [],
    tips: [],
    resources: []
  },
  
  // INTERMEDIATE PROJECTS
  {
    id: 'i1',
    title: 'Task Management App',
    description: 'Build a comprehensive task management application with categories, priorities, due dates, and filtering options.',
    difficulty: 'intermediate',
    estimatedTime: '8-10 hours',
    category: 'CRUD Applications',
    tags: ['HTML', 'CSS', 'JavaScript', 'LocalStorage'],
    objectives: [
      'Implement CRUD operations for tasks',
      'Create filtering and sorting functionality',
      'Use localStorage for persistent data storage',
      'Design a responsive, user-friendly interface'
    ],
    steps: [
      {
        title: 'Project Setup and Structure',
        content: 'Create the project files and set up the basic structure.',
        code: 'mkdir task-manager\ncd task-manager\ntouch index.html style.css app.js'
      },
      {
        title: 'Design the Task Data Model',
        content: 'Define what a task object looks like with all necessary properties.',
        code: '// Task data model example\nconst sampleTask = {\n  id: "unique-id-123",\n  title: "Complete project",\n  description: "Finish the task management app",\n  dueDate: "2025-08-15",\n  priority: "high", // low, medium, high\n  category: "work", // personal, work, study, etc.\n  completed: false,\n  createdAt: "2025-08-01T12:00:00.000Z"\n};'
      },
      {
        title: 'Create HTML Structure',
        content: 'Build the HTML structure for the task management app, including navigation, forms, and task lists.',
        code: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Task Management App</title>\n  <link rel="stylesheet" href="style.css">\n  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">\n</head>\n<body>\n  <div class="app-container">\n    <header class="app-header">\n      <h1>Task Manager</h1>\n      <div class="search-container">\n        <input type="text" id="search-input" placeholder="Search tasks...">\n        <button id="search-btn"><i class="fas fa-search"></i></button>\n      </div>\n    </header>\n    \n    <main class="app-main">\n      <aside class="sidebar">\n        <div class="categories">\n          <h2>Categories</h2>\n          <ul id="category-list">\n            <li class="active" data-category="all">All Tasks</li>\n            <li data-category="work">Work</li>\n            <li data-category="personal">Personal</li>\n            <li data-category="study">Study</li>\n            <li data-category="other">Other</li>\n          </ul>\n          <button id="add-category-btn">+ Add Category</button>\n        </div>\n        \n        <div class="filters">\n          <h2>Filters</h2>\n          <div class="filter-group">\n            <h3>Status</h3>\n            <div class="filter-options">\n              <label><input type="checkbox" data-filter="status" value="completed"> Completed</label>\n              <label><input type="checkbox" data-filter="status" value="active"> Active</label>\n            </div>\n          </div>\n          \n          <div class="filter-group">\n            <h3>Priority</h3>\n            <div class="filter-options">\n              <label><input type="checkbox" data-filter="priority" value="high"> High</label>\n              <label><input type="checkbox" data-filter="priority" value="medium"> Medium</label>\n              <label><input type="checkbox" data-filter="priority" value="low"> Low</label>\n            </div>\n          </div>\n          \n          <div class="filter-group">\n            <h3>Due Date</h3>\n            <div class="filter-options">\n              <label><input type="checkbox" data-filter="date" value="today"> Today</label>\n              <label><input type="checkbox" data-filter="date" value="week"> This Week</label>\n              <label><input type="checkbox" data-filter="date" value="month"> This Month</label>\n            </div>\n          </div>\n        </div>\n      </aside>\n      \n      <section class="tasks-container">\n        <div class="tasks-header">\n          <h2 id="current-category">All Tasks</h2>\n          <div class="tasks-actions">\n            <select id="sort-select">\n              <option value="dueDate">Sort by Due Date</option>\n              <option value="priority">Sort by Priority</option>\n              <option value="title">Sort by Title</option>\n              <option value="createdAt">Sort by Created Date</option>\n            </select>\n            <button id="add-task-btn" class="primary-btn">+ Add Task</button>\n          </div>\n        </div>\n        \n        <div id="tasks-list" class="tasks-list">\n          <!-- Tasks will be dynamically added here -->\n        </div>\n      </section>\n    </main>\n  </div>\n  \n  <!-- Task Form Modal -->\n  <div id="task-modal" class="modal">\n    <div class="modal-content">\n      <span class="close-btn">&times;</span>\n      <h2 id="modal-title">Add New Task</h2>\n      <form id="task-form">\n        <input type="hidden" id="task-id">\n        <div class="form-group">\n          <label for="task-title">Title</label>\n          <input type="text" id="task-title" required>\n        </div>\n        <div class="form-group">\n          <label for="task-description">Description</label>\n          <textarea id="task-description"></textarea>\n        </div>\n        <div class="form-row">\n          <div class="form-group">\n            <label for="task-due-date">Due Date</label>\n            <input type="date" id="task-due-date">\n          </div>\n          <div class="form-group">\n            <label for="task-priority">Priority</label>\n            <select id="task-priority">\n              <option value="low">Low</option>\n              <option value="medium">Medium</option>\n              <option value="high">High</option>\n            </select>\n          </div>\n        </div>\n        <div class="form-group">\n          <label for="task-category">Category</label>\n          <select id="task-category">\n            <option value="work">Work</option>\n            <option value="personal">Personal</option>\n            <option value="study">Study</option>\n            <option value="other">Other</option>\n          </select>\n        </div>\n        <div class="form-actions">\n          <button type="button" id="cancel-btn">Cancel</button>\n          <button type="submit" class="primary-btn">Save Task</button>\n        </div>\n      </form>\n    </div>\n  </div>\n  \n  <!-- Task Template -->\n  <template id="task-template">\n    <div class="task-item">\n      <div class="task-checkbox">\n        <input type="checkbox" class="task-complete-checkbox">\n      </div>\n      <div class="task-content">\n        <h3 class="task-title"></h3>\n        <p class="task-description"></p>\n        <div class="task-meta">\n          <span class="task-category"></span>\n          <span class="task-due-date"></span>\n        </div>\n      </div>\n      <div class="task-priority"></div>\n      <div class="task-actions">\n        <button class="edit-task-btn"><i class="fas fa-edit"></i></button>\n        <button class="delete-task-btn"><i class="fas fa-trash"></i></button>\n      </div>\n    </div>\n  </template>\n  \n  <script src="app.js"></script>\n</body>\n</html>'
      },
      {
        title: 'Implement Task Management Logic',
        content: 'Create the core functionality for managing tasks including adding, editing, and deleting tasks.',
        code: '// Task Management App Logic\n\n// DOM Elements\nconst tasksList = document.getElementById(\'tasks-list\');\nconst taskForm = document.getElementById(\'task-form\');\nconst taskModal = document.getElementById(\'task-modal\');\nconst addTaskBtn = document.getElementById(\'add-task-btn\');\nconst modalCloseBtn = document.querySelector(\'.close-btn\');\nconst cancelBtn = document.getElementById(\'cancel-btn\');\nconst taskTemplate = document.getElementById(\'task-template\');\n\n// State\nlet tasks = [];\nlet currentFilter = \'all\';\nlet currentSort = \'dueDate\';\n\n// Load tasks from localStorage\nfunction loadTasks() {\n  const savedTasks = localStorage.getItem(\'tasks\');\n  if (savedTasks) {\n    tasks = JSON.parse(savedTasks);\n  }\n  renderTasks();\n}\n\n// Save tasks to localStorage\nfunction saveTasks() {\n  localStorage.setItem(\'tasks\', JSON.stringify(tasks));\n}\n\n// Generate unique ID\nfunction generateId() {\n  return Date.now().toString(36) + Math.random().toString(36).substr(2);\n}\n\n// Filter and sort tasks\nfunction getFilteredTasks() {\n  let filtered = [...tasks];\n  \n  // Apply category filter\n  if (currentFilter !== \'all\') {\n    filtered = filtered.filter(task => task.category === currentFilter);\n  }\n  \n  // Apply status filters\n  const statusFilters = document.querySelectorAll(\'input[data-filter="status"]:checked\');\n  if (statusFilters.length > 0) {\n    const statusValues = Array.from(statusFilters).map(input => input.value);\n    filtered = filtered.filter(task => {\n      if (statusValues.includes(\'completed\') && task.completed) return true;\n      if (statusValues.includes(\'active\') && !task.completed) return true;\n      return false;\n    });\n  }\n  \n  // Apply priority filters\n  const priorityFilters = document.querySelectorAll(\'input[data-filter="priority"]:checked\');\n  if (priorityFilters.length > 0) {\n    const priorityValues = Array.from(priorityFilters).map(input => input.value);\n    filtered = filtered.filter(task => priorityValues.includes(task.priority));\n  }\n  \n  // Apply date filters\n  const dateFilters = document.querySelectorAll(\'input[data-filter="date"]:checked\');\n  if (dateFilters.length > 0) {\n    const dateValues = Array.from(dateFilters).map(input => input.value);\n    const today = new Date();\n    today.setHours(0, 0, 0, 0);\n    \n    const weekStart = new Date(today);\n    weekStart.setDate(today.getDate() - today.getDay());\n    \n    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);\n    \n    filtered = filtered.filter(task => {\n      if (!task.dueDate) return false;\n      \n      const dueDate = new Date(task.dueDate);\n      dueDate.setHours(0, 0, 0, 0);\n      \n      if (dateValues.includes(\'today\') && dueDate.getTime() === today.getTime()) return true;\n      if (dateValues.includes(\'week\') && dueDate >= weekStart && dueDate <= new Date(weekStart.getTime() + 7 * 24 * 60 * 60 * 1000)) return true;\n      if (dateValues.includes(\'month\') && dueDate >= monthStart && dueDate <= new Date(today.getFullYear(), today.getMonth() + 1, 0)) return true;\n      \n      return false;\n    });\n  }\n  \n  // Sort tasks\n  filtered.sort((a, b) => {\n    switch(currentSort) {\n      case \'dueDate\':\n        if (!a.dueDate) return 1;\n        if (!b.dueDate) return -1;\n        return new Date(a.dueDate) - new Date(b.dueDate);\n      case \'priority\':\n        const priorityOrder = { high: 1, medium: 2, low: 3 };\n        return priorityOrder[a.priority] - priorityOrder[b.priority];\n      case \'title\':\n        return a.title.localeCompare(b.title);\n      case \'createdAt\':\n        return new Date(b.createdAt) - new Date(a.createdAt);\n      default:\n        return 0;\n    }\n  });\n  \n  return filtered;\n}\n\n// Render tasks list\nfunction renderTasks() {\n  tasksList.innerHTML = \'\';\n  const filteredTasks = getFilteredTasks();\n  \n  if (filteredTasks.length === 0) {\n    tasksList.innerHTML = \'<div class="no-tasks">No tasks found. Add a new task to get started!</div>\';\n    return;\n  }\n  \n  filteredTasks.forEach(task => {\n    const taskNode = document.importNode(taskTemplate.content, true);\n    const taskItem = taskNode.querySelector(\'.task-item\');\n    \n    taskItem.dataset.id = task.id;\n    taskNode.querySelector(\'.task-title\').textContent = task.title;\n    taskNode.querySelector(\'.task-description\').textContent = task.description || \'No description\';\n    taskNode.querySelector(\'.task-category\').textContent = task.category;\n    \n    const dueDateElem = taskNode.querySelector(\'.task-due-date\');\n    if (task.dueDate) {\n      const dueDate = new Date(task.dueDate);\n      dueDateElem.textContent = `Due: ${dueDate.toLocaleDateString()}`;\n      \n      // Highlight overdue tasks\n      if (dueDate < new Date() && !task.completed) {\n        dueDateElem.classList.add(\'overdue\');\n      }\n    } else {\n      dueDateElem.textContent = \'No due date\';\n    }\n    \n    const priorityElem = taskNode.querySelector(\'.task-priority\');\n    priorityElem.textContent = task.priority;\n    priorityElem.classList.add(`priority-${task.priority}`);\n    \n    const checkbox = taskNode.querySelector(\'.task-complete-checkbox\');\n    checkbox.checked = task.completed;\n    if (task.completed) {\n      taskItem.classList.add(\'completed\');\n    }\n    \n    checkbox.addEventListener(\'change\', () => toggleTaskCompletion(task.id));\n    taskNode.querySelector(\'.edit-task-btn\').addEventListener(\'click\', () => openEditTaskModal(task.id));\n    taskNode.querySelector(\'.delete-task-btn\').addEventListener(\'click\', () => deleteTask(task.id));\n    \n    tasksList.appendChild(taskNode);\n  });\n}\n\n// Add new task\nfunction addTask(taskData) {\n  const newTask = {\n    id: generateId(),\n    title: taskData.title,\n    description: taskData.description,\n    dueDate: taskData.dueDate,\n    priority: taskData.priority,\n    category: taskData.category,\n    completed: false,\n    createdAt: new Date().toISOString()\n  };\n  \n  tasks.push(newTask);\n  saveTasks();\n  renderTasks();\n}\n\n// Update existing task\nfunction updateTask(taskId, taskData) {\n  const taskIndex = tasks.findIndex(task => task.id === taskId);\n  if (taskIndex === -1) return;\n  \n  tasks[taskIndex] = {\n    ...tasks[taskIndex],\n    ...taskData,\n    updatedAt: new Date().toISOString()\n  };\n  \n  saveTasks();\n  renderTasks();\n}\n\n// Delete task\nfunction deleteTask(taskId) {\n  if (confirm(\'Are you sure you want to delete this task?\')) {\n    tasks = tasks.filter(task => task.id !== taskId);\n    saveTasks();\n    renderTasks();\n  }\n}\n\n// Toggle task completion status\nfunction toggleTaskCompletion(taskId) {\n  const taskIndex = tasks.findIndex(task => task.id === taskId);\n  if (taskIndex === -1) return;\n  \n  tasks[taskIndex].completed = !tasks[taskIndex].completed;\n  saveTasks();\n  renderTasks();\n}\n\n// Open modal for adding new task\nfunction openAddTaskModal() {\n  document.getElementById(\'modal-title\').textContent = \'Add New Task\';\n  document.getElementById(\'task-id\').value = \'\';\n  taskForm.reset();\n  \n  // Set default due date to tomorrow\n  const tomorrow = new Date();\n  tomorrow.setDate(tomorrow.getDate() + 1);\n  document.getElementById(\'task-due-date\').value = tomorrow.toISOString().split(\'T\')[0];\n  \n  taskModal.style.display = \'flex\';\n}\n\n// Open modal for editing task\nfunction openEditTaskModal(taskId) {\n  const task = tasks.find(task => task.id === taskId);\n  if (!task) return;\n  \n  document.getElementById(\'modal-title\').textContent = \'Edit Task\';\n  document.getElementById(\'task-id\').value = task.id;\n  document.getElementById(\'task-title\').value = task.title;\n  document.getElementById(\'task-description\').value = task.description || \'\';\n  document.getElementById(\'task-due-date\').value = task.dueDate || \'\';\n  document.getElementById(\'task-priority\').value = task.priority;\n  document.getElementById(\'task-category\').value = task.category;\n  \n  taskModal.style.display = \'flex\';\n}\n\n// Close task modal\nfunction closeTaskModal() {\n  taskModal.style.display = \'none\';\n}\n\n// Initialize the app\nfunction init() {\n  // Load tasks\n  loadTasks();\n  \n  // Event Listeners\n  addTaskBtn.addEventListener(\'click\', openAddTaskModal);\n  modalCloseBtn.addEventListener(\'click\', closeTaskModal);\n  cancelBtn.addEventListener(\'click\', closeTaskModal);\n  \n  // Form submission\n  taskForm.addEventListener(\'submit\', function(e) {\n    e.preventDefault();\n    \n    const taskData = {\n      title: document.getElementById(\'task-title\').value,\n      description: document.getElementById(\'task-description\').value,\n      dueDate: document.getElementById(\'task-due-date\').value,\n      priority: document.getElementById(\'task-priority\').value,\n      category: document.getElementById(\'task-category\').value\n    };\n    \n    const taskId = document.getElementById(\'task-id\').value;\n    if (taskId) {\n      updateTask(taskId, taskData);\n    } else {\n      addTask(taskData);\n    }\n    \n    closeTaskModal();\n  });\n  \n  // Category selection\n  document.querySelectorAll(\'#category-list li\').forEach(item => {\n    item.addEventListener(\'click\', function() {\n      document.querySelector(\'#category-list li.active\').classList.remove(\'active\');\n      this.classList.add(\'active\');\n      \n      currentFilter = this.dataset.category;\n      document.getElementById(\'current-category\').textContent = \n        currentFilter === \'all\' ? \'All Tasks\' : `${currentFilter.charAt(0).toUpperCase() + currentFilter.slice(1)} Tasks`;\n      \n      renderTasks();\n    });\n  });\n  \n  // Sort selection\n  document.getElementById(\'sort-select\').addEventListener(\'change\', function() {\n    currentSort = this.value;\n    renderTasks();\n  });\n  \n  // Filter checkboxes\n  document.querySelectorAll(\'.filter-options input[type="checkbox"]\').forEach(checkbox => {\n    checkbox.addEventListener(\'change\', renderTasks);\n  });\n  \n  // Search functionality\n  document.getElementById(\'search-btn\').addEventListener(\'click\', function() {\n    const searchTerm = document.getElementById(\'search-input\').value.toLowerCase();\n    if (!searchTerm) {\n      renderTasks();\n      return;\n    }\n    \n    const searchResults = tasks.filter(task => {\n      return (\n        task.title.toLowerCase().includes(searchTerm) ||\n        (task.description && task.description.toLowerCase().includes(searchTerm))\n      );\n    });\n    \n    renderFilteredResults(searchResults);\n  });\n  \n  // Search input - search on Enter key\n  document.getElementById(\'search-input\').addEventListener(\'keyup\', function(e) {\n    if (e.key === \'Enter\') {\n      document.getElementById(\'search-btn\').click();\n    }\n  });\n}\n\n// Render filtered search results\nfunction renderFilteredResults(filteredTasks) {\n  tasksList.innerHTML = \'\';\n  \n  if (filteredTasks.length === 0) {\n    tasksList.innerHTML = \'<div class="no-tasks">No tasks match your search.</div>\';\n    return;\n  }\n  \n  filteredTasks.forEach(task => {\n    // Same rendering logic as in renderTasks function\n    // This could be refactored to avoid code duplication\n    const taskNode = document.importNode(taskTemplate.content, true);\n    const taskItem = taskNode.querySelector(\'.task-item\');\n    \n    taskItem.dataset.id = task.id;\n    taskNode.querySelector(\'.task-title\').textContent = task.title;\n    taskNode.querySelector(\'.task-description\').textContent = task.description || \'No description\';\n    taskNode.querySelector(\'.task-category\').textContent = task.category;\n    \n    const dueDateElem = taskNode.querySelector(\'.task-due-date\');\n    if (task.dueDate) {\n      const dueDate = new Date(task.dueDate);\n      dueDateElem.textContent = `Due: ${dueDate.toLocaleDateString()}`;\n      \n      if (dueDate < new Date() && !task.completed) {\n        dueDateElem.classList.add(\'overdue\');\n      }\n    } else {\n      dueDateElem.textContent = \'No due date\';\n    }\n    \n    const priorityElem = taskNode.querySelector(\'.task-priority\');\n    priorityElem.textContent = task.priority;\n    priorityElem.classList.add(`priority-${task.priority}`);\n    \n    const checkbox = taskNode.querySelector(\'.task-complete-checkbox\');\n    checkbox.checked = task.completed;\n    if (task.completed) {\n      taskItem.classList.add(\'completed\');\n    }\n    \n    checkbox.addEventListener(\'change\', () => toggleTaskCompletion(task.id));\n    taskNode.querySelector(\'.edit-task-btn\').addEventListener(\'click\', () => openEditTaskModal(task.id));\n    taskNode.querySelector(\'.delete-task-btn\').addEventListener(\'click\', () => deleteTask(task.id));\n    \n    tasksList.appendChild(taskNode);\n  });\n}\n\n// Initialize the app when the DOM is loaded\ndocument.addEventListener(\'DOMContentLoaded\', init);'
      }
    ],
    tips: [
      'Break down the functionality into smaller modules for better code organization',
      'Test your app on multiple devices with different screen sizes',
      'Consider accessibility features such as keyboard navigation and ARIA labels',
      'Add form validation to prevent invalid task submissions',
      'Implement task categories with color coding for better visual organization'
    ],
    resources: [
      { text: 'localStorage API Reference', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage' },
      { text: 'Working with Dates in JavaScript', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Numbers_and_dates#date_object' },
      { text: 'Modal Dialog Implementation', url: 'https://www.w3schools.com/howto/howto_css_modals.asp' }
    ]
  },
  {
    id: 'i2',
    title: 'Budget Tracker',
    description: 'Create a budget tracking application that helps users manage income, expenses, and savings goals with visualizations.',
    difficulty: 'intermediate',
    estimatedTime: '8-10 hours',
    category: 'CRUD Applications',
    tags: ['HTML', 'CSS', 'JavaScript', 'LocalStorage', 'Charts'],
    objectives: [],
    steps: [],
    tips: [],
    resources: []
  },
  {
    id: 'i3',
    title: 'Recipe Book App',
    description: 'Build a recipe management app with search, filtering, meal planning, and nutritional information tracking.',
    difficulty: 'intermediate',
    estimatedTime: '10-12 hours',
    category: 'CRUD Applications',
    tags: ['HTML', 'CSS', 'JavaScript', 'API Integration'],
    objectives: [],
    steps: [],
    tips: [],
    resources: []
  },
  {
    id: 'i4',
    title: 'E-commerce Product Page',
    description: 'Develop a responsive e-commerce product page with product details, gallery, size/color selection, and cart functionality.',
    difficulty: 'intermediate',
    estimatedTime: '6-8 hours',
    category: 'E-commerce',
    tags: ['HTML', 'CSS', 'JavaScript', 'LocalStorage'],
    objectives: [],
    steps: [],
    tips: [],
    resources: []
  },
  {
    id: 'i5',
    title: 'Real-time Chat Application',
    description: 'Create a chat application with real-time messaging, user statuses, and chat rooms.',
    difficulty: 'intermediate',
    estimatedTime: '10-12 hours',
    category: 'Real-time Applications',
    tags: ['HTML', 'CSS', 'JavaScript', 'WebSockets'],
    objectives: [],
    steps: [],
    tips: [],
    resources: []
  },
  {
    id: 'i6',
    title: 'Interactive Quiz Game',
    description: 'Build a quiz application with multiple categories, timed questions, score tracking, and leaderboards.',
    difficulty: 'intermediate',
    estimatedTime: '8-10 hours',
    category: 'Games',
    tags: ['HTML', 'CSS', 'JavaScript', 'LocalStorage'],
    objectives: [],
    steps: [],
    tips: [],
    resources: []
  },
  {
    id: 'i7',
    title: 'Job Board Application',
    description: 'Create a job listing platform with search, filtering, application tracking, and saved job functionality.',
    difficulty: 'intermediate',
    estimatedTime: '10-12 hours',
    category: 'CRUD Applications',
    tags: ['HTML', 'CSS', 'JavaScript', 'API Integration'],
    objectives: [],
    steps: [],
    tips: [],
    resources: []
  },
  {
    id: 'i8',
    title: 'Movie Database Explorer',
    description: 'Build a movie database explorer with details, ratings, reviews, watch lists, and recommendations.',
    difficulty: 'intermediate',
    estimatedTime: '8-10 hours',
    category: 'API Integration',
    tags: ['HTML', 'CSS', 'JavaScript', 'External API'],
    objectives: [],
    steps: [],
    tips: [],
    resources: []
  },
  {
    id: 'i9',
    title: 'Virtual Keyboard',
    description: 'Create an on-screen virtual keyboard with key highlighting, special characters, and mobile support.',
    difficulty: 'intermediate',
    estimatedTime: '6-8 hours',
    category: 'DOM Manipulation',
    tags: ['HTML', 'CSS', 'JavaScript', 'Events'],
    objectives: [],
    steps: [],
    tips: [],
    resources: []
  },
  {
    id: 'i10',
    title: 'Markdown Note Editor',
    description: 'Develop a markdown-based note-taking app with live preview, organization, and export functions.',
    difficulty: 'intermediate',
    estimatedTime: '8-10 hours',
    category: 'Text Processing',
    tags: ['HTML', 'CSS', 'JavaScript', 'Markdown'],
    objectives: [],
    steps: [],
    tips: [],
    resources: []
  },
  {
    id: 'i11',
    title: 'Calendar & Event Planner',
    description: 'Build a calendar application with event creation, reminders, recurring events, and different views.',
    difficulty: 'intermediate',
    estimatedTime: '10-12 hours',
    category: 'CRUD Applications',
    tags: ['HTML', 'CSS', 'JavaScript', 'Date API'],
    objectives: [],
    steps: [],
    tips: [],
    resources: []
  },
  {
    id: 'i12',
    title: 'Weather Dashboard',
    description: 'Create a comprehensive weather dashboard with current conditions, forecasts, multiple locations, and weather maps.',
    difficulty: 'intermediate',
    estimatedTime: '8-10 hours',
    category: 'API Integration',
    tags: ['HTML', 'CSS', 'JavaScript', 'External API', 'Charts'],
    objectives: [],
    steps: [],
    tips: [],
    resources: []
  },
  {
    id: 'i13',
    title: 'Kanban Board',
    description: 'Build a drag-and-drop kanban board for task management with customizable columns and card details.',
    difficulty: 'intermediate',
    estimatedTime: '10-12 hours',
    category: 'CRUD Applications',
    tags: ['HTML', 'CSS', 'JavaScript', 'Drag & Drop API'],
    objectives: [],
    steps: [],
    tips: [],
    resources: []
  },
  {
    id: 'i14',
    title: 'Multi-step Form',
    description: 'Create a multi-step form with validation, progress tracking, and data persistence between steps.',
    difficulty: 'intermediate',
    estimatedTime: '6-8 hours',
    category: 'Forms',
    tags: ['HTML', 'CSS', 'JavaScript', 'Form Validation'],
    objectives: [],
    steps: [],
    tips: [],
    resources: []
  },
  {
    id: 'i15',
    title: 'Music Player',
    description: 'Develop a music player with playlist management, audio controls, visualizations, and search functionality.',
    difficulty: 'intermediate',
    estimatedTime: '8-10 hours',
    category: 'Media',
    tags: ['HTML', 'CSS', 'JavaScript', 'Audio API'],
    objectives: [],
    steps: [],
    tips: [],
    resources: []
  },
  {
    id: 'i16',
    title: 'Cryptocurrency Dashboard',
    description: 'Build a cryptocurrency monitoring dashboard with real-time prices, historical charts, and portfolio tracking.',
    difficulty: 'intermediate',
    estimatedTime: '10-12 hours',
    category: 'API Integration',
    tags: ['HTML', 'CSS', 'JavaScript', 'External API', 'Charts'],
    objectives: [],
    steps: [],
    tips: [],
    resources: []
  },
  
  // ADVANCED PROJECTS
  {
    id: 'a1',
    title: 'Single-Page Application (SPA) Framework',
    description: 'Create your own lightweight single-page application framework with routing, state management, and component architecture.',
    difficulty: 'advanced',
    estimatedTime: '15-20 hours',
    category: 'Frameworks',
    tags: ['HTML', 'CSS', 'JavaScript', 'Architecture'],
    objectives: [
      'Implement client-side routing without libraries',
      'Create a state management system',
      'Build a component-based architecture',
      'Implement virtual DOM for efficient rendering',
      'Add event handling and lifecycle hooks'
    ],
    steps: [
      {
        title: 'Project Setup',
        content: 'Set up your project structure for the SPA framework.',
        code: 'mkdir mini-spa-framework\ncd mini-spa-framework\nmkdir src\ntouch src/index.js src/router.js src/component.js src/state.js src/vdom.js\ntouch index.html style.css'
      },
      {
        title: 'Create the Component Class',
        content: 'Define a base Component class that will be the foundation of your framework.',
        code: '// Component.js - Base component class\n\nclass Component {\n  constructor(props = {}) {\n    this.props = props;\n    this.state = {};\n    this.element = null;\n  }\n\n  /**\n   * Set component state and trigger re-render\n   * @param {Object} newState - New state object to merge with existing state\n   */\n  setState(newState) {\n    this.state = { ...this.state, ...newState };\n    this.updateElement();\n  }\n\n  /**\n   * Update the DOM element with the latest render output\n   */\n  updateElement() {\n    const newElement = this.render();\n    if (this.element && this.element.parentNode) {\n      this.element.parentNode.replaceChild(newElement, this.element);\n    }\n    this.element = newElement;\n    this.afterRender();\n  }\n\n  /**\n   * Convert HTML string to DOM element\n   * @param {String} html - HTML string to convert\n   * @returns {HTMLElement} The created DOM element\n   */\n  createElementFromHTML(html) {\n    const div = document.createElement(\'div\');\n    div.innerHTML = html.trim();\n    return div.firstChild;\n  }\n\n  /**\n   * Lifecycle method: Called before component renders\n   */\n  beforeRender() {}\n\n  /**\n   * Lifecycle method: Called after component renders\n   */\n  afterRender() {}\n\n  /**\n   * Lifecycle method: Called when component is mounted to DOM\n   */\n  onMount() {}\n\n  /**\n   * Lifecycle method: Called when component will be removed from DOM\n   */\n  onUnmount() {}\n\n  /**\n   * Render method to be implemented by subclasses\n   * @returns {HTMLElement} The rendered DOM element\n   */\n  render() {\n    // This should be overridden by child classes\n    const element = document.createElement(\'div\');\n    element.textContent = \'Component\';\n    return element;\n  }\n\n  /**\n   * Mount component to DOM\n   * @param {HTMLElement} container - DOM element to mount component to\n   */\n  mount(container) {\n    this.beforeRender();\n    this.element = this.render();\n    container.appendChild(this.element);\n    this.onMount();\n    this.afterRender();\n  }\n\n  /**\n   * Unmount component from DOM\n   */\n  unmount() {\n    if (this.element && this.element.parentNode) {\n      this.onUnmount();\n      this.element.parentNode.removeChild(this.element);\n    }\n  }\n}\n\nexport default Component;'
      },
      {
        title: 'Implement Router',
        content: 'Create a client-side router to handle navigation without page reloads.',
        code: '// Router.js - Client-side router\n\nclass Router {\n  constructor(routes = [], rootElement = null) {\n    this.routes = routes;\n    this.rootElement = rootElement || document.getElementById(\'app\');\n    this.currentComponent = null;\n    \n    // Bind methods\n    this.navigate = this.navigate.bind(this);\n    this.handlePopState = this.handlePopState.bind(this);\n    \n    // Initialize\n    this.initialize();\n  }\n  \n  /**\n   * Initialize the router\n   */\n  initialize() {\n    // Handle browser back/forward buttons\n    window.addEventListener(\'popstate\', this.handlePopState);\n    \n    // Intercept link clicks for client-side navigation\n    document.addEventListener(\'click\', (e) => {\n      // Only process link clicks\n      if (e.target.tagName === \'A\') {\n        const href = e.target.getAttribute(\'href\');\n        \n        // Only handle internal links\n        if (href && href.startsWith(\'/\')) {\n          e.preventDefault();\n          this.navigate(href);\n        }\n      }\n    });\n    \n    // Initial route\n    this.handlePopState();\n  }\n  \n  /**\n   * Handle popstate event (browser back/forward)\n   */\n  handlePopState() {\n    const path = window.location.pathname;\n    this.renderRoute(path);\n  }\n  \n  /**\n   * Navigate to a new route\n   * @param {String} path - The route path to navigate to\n   */\n  navigate(path) {\n    if (window.location.pathname !== path) {\n      // Update browser history\n      window.history.pushState({}, \'\', path);\n      this.renderRoute(path);\n    }\n  }\n  \n  /**\n   * Add a new route\n   * @param {String} path - Route path\n   * @param {Component} componentClass - Component class to render for this route\n   * @param {Object} props - Props to pass to the component\n   */\n  addRoute(path, componentClass, props = {}) {\n    this.routes.push({ path, componentClass, props });\n  }\n  \n  /**\n   * Find a route that matches the given path\n   * @param {String} path - Route path to match\n   * @returns {Object|null} Matching route or null if not found\n   */\n  findRoute(path) {\n    // First try exact match\n    let route = this.routes.find(route => route.path === path);\n    \n    // If no exact match, try pattern matching\n    if (!route) {\n      route = this.routes.find(route => {\n        // Convert route path to regex pattern\n        if (route.path.includes(\':\')) {\n          const pattern = route.path\n            .replace(/:[^\\s/]+/g, \'([\\\\w-]+)\')\n            .replace(/\\//g, \'\\\\/\');\n          const regex = new RegExp(`^${pattern}$`);\n          return regex.test(path);\n        }\n        return false;\n      });\n      \n      // Extract params if it\'s a pattern match\n      if (route) {\n        const params = {};\n        const pathParts = path.split(\'/\');\n        const routeParts = route.path.split(\'/\');\n        \n        routeParts.forEach((part, index) => {\n          if (part.startsWith(\':\')) {\n            const paramName = part.slice(1);\n            params[paramName] = pathParts[index];\n          }\n        });\n        \n        // Clone the route and add params\n        route = { \n          ...route, \n          props: { ...route.props, params } \n        };\n      }\n    }\n    \n    return route || this.routes.find(route => route.path === \'*\') || null;\n  }\n  \n  /**\n   * Render the component for a given route path\n   * @param {String} path - Route path to render\n   */\n  renderRoute(path) {\n    // Clear the root element\n    if (this.currentComponent) {\n      this.currentComponent.unmount();\n      this.currentComponent = null;\n    }\n    \n    // Find matching route\n    const route = this.findRoute(path);\n    \n    if (route) {\n      // Create and mount the component\n      const { componentClass, props } = route;\n      this.currentComponent = new componentClass(props);\n      this.currentComponent.mount(this.rootElement);\n      \n      // Update document title if component has a title property\n      if (this.currentComponent.title) {\n        document.title = this.currentComponent.title;\n      }\n    } else {\n      // No route found, render 404\n      this.rootElement.innerHTML = \'<h1>404 - Page Not Found</h1>\';\n    }\n  }\n}\n\nexport default Router;'
      },
      {
        title: 'Create State Management',
        content: 'Build a simple state management system with subscriptions and updates.',
        code: '// State.js - Simple state management\n\nclass Store {\n  constructor(initialState = {}) {\n    this.state = initialState;\n    this.listeners = [];\n  }\n  \n  /**\n   * Get the current state\n   * @returns {Object} Current state\n   */\n  getState() {\n    return this.state;\n  }\n  \n  /**\n   * Update the state\n   * @param {Object|Function} update - Object to merge with state or function that returns new state\n   */\n  setState(update) {\n    const newState = typeof update === \'function\'\n      ? update(this.state)\n      : { ...this.state, ...update };\n    \n    this.state = newState;\n    this.notifyListeners();\n  }\n  \n  /**\n   * Subscribe to state changes\n   * @param {Function} listener - Callback function to call on state change\n   * @returns {Function} Unsubscribe function\n   */\n  subscribe(listener) {\n    this.listeners.push(listener);\n    \n    // Return unsubscribe function\n    return () => {\n      this.listeners = this.listeners.filter(l => l !== listener);\n    };\n  }\n  \n  /**\n   * Notify all listeners of state change\n   */\n  notifyListeners() {\n    this.listeners.forEach(listener => listener(this.state));\n  }\n  \n  /**\n   * Create actions object with bound methods\n   * @param {Object} actions - Object with action methods\n   * @returns {Object} Bound actions object\n   */\n  createActions(actions) {\n    const boundActions = {};\n    \n    Object.keys(actions).forEach(key => {\n      boundActions[key] = (...args) => {\n        const actionResult = actions[key](this.state, ...args);\n        \n        if (typeof actionResult === \'object\') {\n          // If action returns an object, update state immediately\n          this.setState(actionResult);\n        } else if (typeof actionResult === \'function\') {\n          // If action returns a function, it\'s an async action\n          actionResult((update) => {\n            this.setState(update);\n          });\n        }\n      };\n    });\n    \n    return boundActions;\n  }\n}\n\nexport default Store;'
      },
      {
        title: 'Build a Virtual DOM',
        content: 'Create a simple virtual DOM implementation for efficient rendering.',
        code: '// vdom.js - Simple virtual DOM implementation\n\n/**\n * Create a virtual DOM node\n * @param {String} type - HTML tag or component type\n * @param {Object} props - Properties and attributes\n * @param {...(Object|String)} children - Child nodes\n * @returns {Object} Virtual DOM node\n */\nfunction h(type, props = {}, ...children) {\n  return { type, props, children: children.flat() };\n}\n\n/**\n * Compare two virtual DOM nodes\n * @param {Object} oldNode - Old virtual node\n * @param {Object} newNode - New virtual node\n * @returns {Boolean} Whether nodes are the same\n */\nfunction areNodesEqual(oldNode, newNode) {\n  // Different types\n  if (oldNode.type !== newNode.type) {\n    return false;\n  }\n  \n  // Compare props\n  const oldPropsKeys = Object.keys(oldNode.props);\n  const newPropsKeys = Object.keys(newNode.props);\n  \n  if (oldPropsKeys.length !== newPropsKeys.length) {\n    return false;\n  }\n  \n  // Check if any props differ\n  for (const key of oldPropsKeys) {\n    if (oldNode.props[key] !== newNode.props[key]) {\n      // Special handling for event handlers and style objects\n      if (key === \'style\' && typeof oldNode.props[key] === \'object\' && typeof newNode.props[key] === \'object\') {\n        const oldStyleKeys = Object.keys(oldNode.props[key]);\n        const newStyleKeys = Object.keys(newNode.props[key]);\n        \n        if (oldStyleKeys.length !== newStyleKeys.length) {\n          return false;\n        }\n        \n        for (const styleKey of oldStyleKeys) {\n          if (oldNode.props[key][styleKey] !== newNode.props[key][styleKey]) {\n            return false;\n          }\n        }\n      } else {\n        return false;\n      }\n    }\n  }\n  \n  // Simple check for children length\n  if (oldNode.children.length !== newNode.children.length) {\n    return false;\n  }\n  \n  return true;\n}\n\n/**\n * Create a real DOM element from a virtual node\n * @param {Object} vnode - Virtual DOM node\n * @returns {HTMLElement} Real DOM element\n */\nfunction createElement(vnode) {\n  // Text nodes\n  if (typeof vnode === \'string\' || typeof vnode === \'number\') {\n    return document.createTextNode(vnode);\n  }\n  \n  // Handle null or undefined\n  if (vnode == null) {\n    return document.createTextNode(\'\');\n  }\n  \n  // Create element\n  const element = document.createElement(vnode.type);\n  \n  // Set props\n  if (vnode.props) {\n    Object.entries(vnode.props).forEach(([name, value]) => {\n      // Special handling for event handlers\n      if (name.startsWith(\'on\') && typeof value === \'function\') {\n        const eventName = name.toLowerCase().substring(2);\n        element.addEventListener(eventName, value);\n      }\n      // Special handling for style object\n      else if (name === \'style\' && typeof value === \'object\') {\n        Object.entries(value).forEach(([cssName, cssValue]) => {\n          element.style[cssName] = cssValue;\n        });\n      }\n      // Special handling for className (class)\n      else if (name === \'className\') {\n        element.setAttribute(\'class\', value);\n      }\n      // Regular attributes\n      else if (name !== \'key\' && name !== \'children\') {\n        element.setAttribute(name, value);\n      }\n    });\n  }\n  \n  // Create and append children\n  if (vnode.children) {\n    vnode.children.forEach(child => {\n      const childElement = createElement(child);\n      element.appendChild(childElement);\n    });\n  }\n  \n  return element;\n}\n\n/**\n * Update a DOM element with changes from virtual nodes\n * @param {HTMLElement} element - DOM element to update\n * @param {Object} oldVNode - Old virtual node\n * @param {Object} newVNode - New virtual node\n * @param {Number} index - Child index\n */\nfunction updateElement(element, oldVNode, newVNode, index = 0) {\n  // If new node doesn\'t exist, remove old node\n  if (!newVNode) {\n    element.removeChild(element.childNodes[index]);\n    return;\n  }\n  \n  // If old node doesn\'t exist, create new node\n  if (!oldVNode) {\n    element.appendChild(createElement(newVNode));\n    return;\n  }\n  \n  // If nodes are different types, replace the old node\n  if (!areNodesEqual(oldVNode, newVNode)) {\n    element.replaceChild(\n      createElement(newVNode),\n      element.childNodes[index]\n    );\n    return;\n  }\n  \n  // If both are text nodes, update text content\n  if (typeof oldVNode === \'string\' && typeof newVNode === \'string\') {\n    if (oldVNode !== newVNode) {\n      element.childNodes[index].nodeValue = newVNode;\n    }\n    return;\n  }\n  \n  // Update props\n  const oldProps = oldVNode.props || {};\n  const newProps = newVNode.props || {};\n  \n  // Update changed props\n  for (const [name, value] of Object.entries(newProps)) {\n    if (value !== oldProps[name]) {\n      if (name.startsWith(\'on\') && typeof value === \'function\') {\n        const eventName = name.toLowerCase().substring(2);\n        // Remove old event listener if it exists\n        if (typeof oldProps[name] === \'function\') {\n          element.childNodes[index].removeEventListener(eventName, oldProps[name]);\n        }\n        element.childNodes[index].addEventListener(eventName, value);\n      } else if (name === \'style\' && typeof value === \'object\') {\n        const oldStyle = oldProps.style || {};\n        for (const [cssName, cssValue] of Object.entries(value)) {\n          if (cssValue !== oldStyle[cssName]) {\n            element.childNodes[index].style[cssName] = cssValue;\n          }\n        }\n        // Remove old styles that aren\'t in new styles\n        for (const cssName of Object.keys(oldStyle)) {\n          if (!(cssName in value)) {\n            element.childNodes[index].style[cssName] = \'\';\n          }\n        }\n      } else if (name === \'className\') {\n        element.childNodes[index].setAttribute(\'class\', value);\n      } else if (name !== \'key\' && name !== \'children\') {\n        element.childNodes[index].setAttribute(name, value);\n      }\n    }\n  }\n  \n  // Remove old props that aren\'t in new props\n  for (const name of Object.keys(oldProps)) {\n    if (!(name in newProps)) {\n      if (name.startsWith(\'on\') && typeof oldProps[name] === \'function\') {\n        const eventName = name.toLowerCase().substring(2);\n        element.childNodes[index].removeEventListener(eventName, oldProps[name]);\n      } else if (name === \'className\') {\n        element.childNodes[index].removeAttribute(\'class\');\n      } else if (name !== \'key\' && name !== \'children\') {\n        element.childNodes[index].removeAttribute(name);\n      }\n    }\n  }\n  \n  // Update children recursively\n  const oldChildren = oldVNode.children || [];\n  const newChildren = newVNode.children || [];\n  const maxLength = Math.max(oldChildren.length, newChildren.length);\n  \n  for (let i = 0; i < maxLength; i++) {\n    updateElement(\n      element.childNodes[index],\n      oldChildren[i],\n      newChildren[i],\n      i\n    );\n  }\n}\n\nexport { h, createElement, updateElement };'
      },
      {
        title: 'Create the Main Entry Point',
        content: 'Tie everything together with a main file that exports all the pieces of your framework.',
        code: '// index.js - Main entry point for the framework\n\nimport Component from \'./component.js\';\nimport Router from \'./router.js\';\nimport Store from \'./state.js\';\nimport { h, createElement, updateElement } from \'./vdom.js\';\n\n// Create and export the mini-framework\nconst MiniSPA = {\n  Component,\n  Router,\n  Store,\n  h,\n  createElement,\n  updateElement,\n  \n  /**\n   * Initialize the application\n   * @param {Object} options - Configuration options\n   * @param {HTMLElement} options.rootElement - Root DOM element for the app\n   * @param {Array} options.routes - Array of route definitions\n   * @param {Object} options.initialState - Initial state for the store\n   * @returns {Object} The initialized application\n   */\n  createApp(options = {}) {\n    const { rootElement, routes = [], initialState = {} } = options;\n    \n    // Create store with initial state\n    const store = new Store(initialState);\n    \n    // Create router with routes\n    const router = new Router(routes, rootElement);\n    \n    return {\n      store,\n      router,\n      \n      /**\n       * Mount the app to a DOM element\n       * @param {HTMLElement|String} element - Element or selector to mount to\n       */\n      mount(element) {\n        const mountElement = typeof element === \'string\'\n          ? document.querySelector(element)\n          : element;\n          \n        if (!mountElement) {\n          console.error(`Could not find element ${element} to mount app`);\n          return;\n        }\n        \n        // Initialize router\n        router.initialize();\n      }\n    };\n  }\n};\n\n// Make available as global or as module\nif (typeof window !== \'undefined\') {\n  window.MiniSPA = MiniSPA;\n}\n\nexport default MiniSPA;\nexport { Component, Router, Store, h };'
      },
      {
        title: 'Create an Example App',
        content: 'Build a simple example app that uses your framework to demonstrate its capabilities.',
        code: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>MiniSPA Framework Example</title>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <div id="app"></div>\n  \n  <script type="module">\n    import MiniSPA, { Component, h } from \'./src/index.js\';\n    \n    // Create a Home component\n    class Home extends Component {\n      constructor(props) {\n        super(props);\n        this.state = {\n          count: 0\n        };\n        this.title = \'Home - MiniSPA Example\';\n      }\n      \n      incrementCount = () => {\n        this.setState({ count: this.state.count + 1 });\n      };\n      \n      render() {\n        return this.createElementFromHTML(`\n          <div class="page">\n            <h1>Home Page</h1>\n            <p>Welcome to MiniSPA Framework!</p>\n            <p>This is a lightweight single-page application framework built from scratch.</p>\n            \n            <div class="counter">\n              <p>Count: ${this.state.count}</p>\n              <button id="increment-btn">Increment</button>\n            </div>\n            \n            <nav>\n              <a href="/about">Go to About</a>\n              <a href="/contact">Go to Contact</a>\n            </nav>\n          </div>\n        `);\n      }\n      \n      afterRender() {\n        // Add event listener to button\n        const incrementBtn = this.element.querySelector(\'#increment-btn\');\n        if (incrementBtn) {\n          incrementBtn.addEventListener(\'click\', this.incrementCount);\n        }\n      }\n      \n      onUnmount() {\n        // Clean up event listeners\n        const incrementBtn = this.element.querySelector(\'#increment-btn\');\n        if (incrementBtn) {\n          incrementBtn.removeEventListener(\'click\', this.incrementCount);\n        }\n      }\n    }\n    \n    // Create an About component\n    class About extends Component {\n      constructor(props) {\n        super(props);\n        this.title = \'About - MiniSPA Example\';\n      }\n      \n      render() {\n        return this.createElementFromHTML(`\n          <div class="page">\n            <h1>About Page</h1>\n            <p>This is the about page of our MiniSPA Framework example.</p>\n            <p>The framework includes:</p>\n            <ul>\n              <li>Client-side routing with parameterized routes</li>\n              <li>Component-based architecture with lifecycle methods</li>\n              <li>State management with subscriptions</li>\n              <li>Simple virtual DOM implementation</li>\n            </ul>\n            \n            <nav>\n              <a href="/">Go to Home</a>\n              <a href="/contact">Go to Contact</a>\n            </nav>\n          </div>\n        `);\n      }\n    }\n    \n    // Create a Contact component\n    class Contact extends Component {\n      constructor(props) {\n        super(props);\n        this.state = {\n          name: \'\',\n          email: \'\',\n          message: \'\',\n          submitted: false\n        };\n        this.title = \'Contact - MiniSPA Example\';\n      }\n      \n      handleSubmit = (e) => {\n        e.preventDefault();\n        this.setState({ submitted: true });\n      };\n      \n      handleInputChange = (e) => {\n        const { name, value } = e.target;\n        this.setState({ [name]: value });\n      };\n      \n      render() {\n        if (this.state.submitted) {\n          return this.createElementFromHTML(`\n            <div class="page">\n              <h1>Thank You!</h1>\n              <p>Your message has been submitted.</p>\n              <button id="back-btn">Back to Contact</button>\n              \n              <nav>\n                <a href="/">Go to Home</a>\n                <a href="/about">Go to About</a>\n              </nav>\n            </div>\n          `);\n        }\n        \n        return this.createElementFromHTML(`\n          <div class="page">\n            <h1>Contact Page</h1>\n            <p>Get in touch with us!</p>\n            \n            <form id="contact-form">\n              <div class="form-group">\n                <label for="name">Name:</label>\n                <input type="text" id="name" name="name" value="${this.state.name}" required>\n              </div>\n              \n              <div class="form-group">\n                <label for="email">Email:</label>\n                <input type="email" id="email" name="email" value="${this.state.email}" required>\n              </div>\n              \n              <div class="form-group">\n                <label for="message">Message:</label>\n                <textarea id="message" name="message" rows="4" required>${this.state.message}</textarea>\n              </div>\n              \n              <button type="submit">Send Message</button>\n            </form>\n            \n            <nav>\n              <a href="/">Go to Home</a>\n              <a href="/about">Go to About</a>\n            </nav>\n          </div>\n        `);\n      }\n      \n      afterRender() {\n        if (this.state.submitted) {\n          const backBtn = this.element.querySelector(\'#back-btn\');\n          if (backBtn) {\n            backBtn.addEventListener(\'click\', () => {\n              this.setState({\n                submitted: false,\n                name: \'\',\n                email: \'\',\n                message: \'\'\n              });\n            });\n          }\n        } else {\n          const form = this.element.querySelector(\'#contact-form\');\n          const nameInput = this.element.querySelector(\'#name\');\n          const emailInput = this.element.querySelector(\'#email\');\n          const messageInput = this.element.querySelector(\'#message\');\n          \n          if (form) {\n            form.addEventListener(\'submit\', this.handleSubmit);\n          }\n          \n          if (nameInput) {\n            nameInput.addEventListener(\'input\', this.handleInputChange);\n          }\n          \n          if (emailInput) {\n            emailInput.addEventListener(\'input\', this.handleInputChange);\n          }\n          \n          if (messageInput) {\n            messageInput.addEventListener(\'input\', this.handleInputChange);\n          }\n        }\n      }\n      \n      onUnmount() {\n        if (this.state.submitted) {\n          const backBtn = this.element.querySelector(\'#back-btn\');\n          if (backBtn) {\n            backBtn.removeEventListener(\'click\', () => {});\n          }\n        } else {\n          const form = this.element.querySelector(\'#contact-form\');\n          const nameInput = this.element.querySelector(\'#name\');\n          const emailInput = this.element.querySelector(\'#email\');\n          const messageInput = this.element.querySelector(\'#message\');\n          \n          if (form) {\n            form.removeEventListener(\'submit\', this.handleSubmit);\n          }\n          \n          if (nameInput) {\n            nameInput.removeEventListener(\'input\', this.handleInputChange);\n          }\n          \n          if (emailInput) {\n            emailInput.removeEventListener(\'input\', this.handleInputChange);\n          }\n          \n          if (messageInput) {\n            messageInput.removeEventListener(\'input\', this.handleInputChange);\n          }\n        }\n      }\n    }\n    \n    // Create a UserProfile component to demonstrate parameterized routes\n    class UserProfile extends Component {\n      constructor(props) {\n        super(props);\n        this.title = `User Profile - MiniSPA Example`;\n      }\n      \n      render() {\n        const { params } = this.props;\n        const userId = params?.id || \'unknown\';\n        \n        return this.createElementFromHTML(`\n          <div class="page">\n            <h1>User Profile</h1>\n            <p>Viewing profile for user ID: ${userId}</p>\n            \n            <nav>\n              <a href="/">Go to Home</a>\n              <a href="/about">Go to About</a>\n              <a href="/contact">Go to Contact</a>\n            </nav>\n          </div>\n        `);\n      }\n    }\n    \n    // Create a NotFound component\n    class NotFound extends Component {\n      constructor(props) {\n        super(props);\n        this.title = \'Page Not Found - MiniSPA Example\';\n      }\n      \n      render() {\n        return this.createElementFromHTML(`\n          <div class="page">\n            <h1>404 - Page Not Found</h1>\n            <p>The page you are looking for does not exist.</p>\n            \n            <nav>\n              <a href="/">Go to Home</a>\n            </nav>\n          </div>\n        `);\n      }\n    }\n    \n    // Define routes\n    const routes = [\n      { path: \'/\', componentClass: Home },\n      { path: \'/about\', componentClass: About },\n      { path: \'/contact\', componentClass: Contact },\n      { path: \'/user/:id\', componentClass: UserProfile },\n      { path: \'*\', componentClass: NotFound }\n    ];\n    \n    // Initialize the app\n    const app = MiniSPA.createApp({\n      rootElement: document.getElementById(\'app\'),\n      routes,\n      initialState: {\n        user: null,\n        theme: \'light\'\n      }\n    });\n    \n    // Mount the app\n    app.mount(\'#app\');\n  </script>\n</body>\n</html>'
      }
    ],
    tips: [
      'Focus on learning how each part of modern frameworks work under the hood',
      'Implement type checking mechanisms for component props',
      'Add performance optimizations like memoization and lazy loading',
      'Write comprehensive documentation for your framework',
      'Build a simple CLI tool to scaffold new projects using your framework'
    ],
    resources: [
      { text: 'Understanding the Virtual DOM', url: 'https://reactjs.org/docs/faq-internals.html' },
      { text: 'History API for Client-Side Routing', url: 'https://developer.mozilla.org/en-US/docs/Web/API/History_API' },
      { text: 'State Management Design Patterns', url: 'https://redux.js.org/understanding/thinking-in-redux/motivation' }
    ]
  },
  {
    id: 'a2',
    title: 'Custom Database with Indexing',
    description: 'Create an in-memory JavaScript database with indexing, querying, sorting, and persistence capabilities.',
    difficulty: 'advanced',
    estimatedTime: '12-15 hours',
    category: 'Databases',
    tags: ['JavaScript', 'Data Structures', 'Algorithms'],
    objectives: [],
    steps: [],
    tips: [],
    resources: []
  },
  {
    id: 'a3',
    title: 'WebSocket-based Collaborative Editor',
    description: 'Build a real-time collaborative text editor with operational transforms or CRDT for conflict resolution.',
    difficulty: 'advanced',
    estimatedTime: '15-20 hours',
    category: 'Real-time Applications',
    tags: ['JavaScript', 'WebSockets', 'CRDT', 'Collaboration'],
    objectives: [],
    steps: [],
    tips: [],
    resources: []
  },
  {
    id: 'a4',
    title: 'Neural Network from Scratch',
    description: 'Implement a simple neural network library with backpropagation, different activation functions, and training capabilities.',
    difficulty: 'advanced',
    estimatedTime: '12-15 hours',
    category: 'Machine Learning',
    tags: ['JavaScript', 'Neural Networks', 'Math'],
    objectives: [],
    steps: [],
    tips: [],
    resources: []
  },
  {
    id: 'a5',
    title: 'WebGL 3D Game Engine',
    description: 'Create a basic 3D game engine with rendering, physics, collision detection, and game object management.',
    difficulty: 'advanced',
    estimatedTime: '15-20 hours',
    category: 'Graphics',
    tags: ['JavaScript', 'WebGL', 'Game Development', '3D'],
    objectives: [],
    steps: [],
    tips: [],
    resources: []
  },
  {
    id: 'a6',
    title: 'PDF Generator Library',
    description: 'Build a library for generating PDF documents with text formatting, images, tables, and pagination.',
    difficulty: 'advanced',
    estimatedTime: '12-15 hours',
    category: 'Document Processing',
    tags: ['JavaScript', 'PDF', 'Canvas API'],
    objectives: [],
    steps: [],
    tips: [],
    resources: []
  },
  {
    id: 'a7',
    title: 'Custom JavaScript Testing Framework',
    description: 'Create a testing framework with assertion libraries, test runners, mocking capabilities, and coverage reporting.',
    difficulty: 'advanced',
    estimatedTime: '10-12 hours',
    category: 'Testing',
    tags: ['JavaScript', 'TDD', 'Unit Testing'],
    objectives: [],
    steps: [],
    tips: [],
    resources: []
  },
  {
    id: 'a8',
    title: 'Web Audio Synthesizer',
    description: 'Develop a complete synthesizer with oscillators, filters, envelopes, effects, and a musical keyboard interface.',
    difficulty: 'advanced',
    estimatedTime: '12-15 hours',
    category: 'Audio',
    tags: ['JavaScript', 'Web Audio API', 'Music'],
    objectives: [],
    steps: [],
    tips: [],
    resources: []
  },
  {
    id: 'a9',
    title: 'Visual Code Editor',
    description: 'Build a web-based code editor with syntax highlighting, autocompletion, linting, and execution capabilities.',
    difficulty: 'advanced',
    estimatedTime: '15-20 hours',
    category: 'Developer Tools',
    tags: ['JavaScript', 'CodeMirror', 'Parsing'],
    objectives: [],
    steps: [],
    tips: [],
    resources: []
  },
  {
    id: 'a10',
    title: 'WebRTC Video Chat Application',
    description: 'Create a peer-to-peer video chat application with room creation, screen sharing, and text chat.',
    difficulty: 'advanced',
    estimatedTime: '12-15 hours',
    category: 'WebRTC',
    tags: ['JavaScript', 'WebRTC', 'Real-time Communication'],
    objectives: [],
    steps: [],
    tips: [],
    resources: []
  },
  {
    id: 'a11',
    title: 'Client-Side Search Engine',
    description: 'Build a full-text search engine with indexing, relevance scoring, and advanced query operators.',
    difficulty: 'advanced',
    estimatedTime: '10-12 hours',
    category: 'Search',
    tags: ['JavaScript', 'Algorithms', 'Data Structures'],
    objectives: [],
    steps: [],
    tips: [],
    resources: []
  },
  {
    id: 'a12',
    title: 'Interactive Data Visualization Framework',
    description: 'Create a framework for building interactive, animated data visualizations with various chart types and interactions.',
    difficulty: 'advanced',
    estimatedTime: '12-15 hours',
    category: 'Data Visualization',
    tags: ['JavaScript', 'SVG', 'D3.js', 'Canvas'],
    objectives: [],
    steps: [],
    tips: [],
    resources: []
  }
];

// Extract all unique categories from projects
function getAllCategories() {
  const categoriesSet = new Set();
  PROJECTS_DATA.forEach(project => {
    if (project.category) {
      categoriesSet.add(project.category);
    }
  });
  return Array.from(categoriesSet);
}

// Function to get projects by difficulty
function getProjectsByDifficulty(difficulty) {
  return PROJECTS_DATA.filter(project => project.difficulty === difficulty);
}

// Function to get projects by category
function getProjectsByCategory(category) {
  return PROJECTS_DATA.filter(project => project.category === category);
}

// Function to get projects by search term
function getProjectsBySearchTerm(term) {
  const searchTerm = term.toLowerCase();
  return PROJECTS_DATA.filter(project => {
    return (
      project.title.toLowerCase().includes(searchTerm) ||
      project.description.toLowerCase().includes(searchTerm) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
      project.category.toLowerCase().includes(searchTerm)
    );
  });
}

// Function to get related projects
function getRelatedProjects(projectId, limit = 3) {
  const project = PROJECTS_DATA.find(p => p.id === projectId);
  if (!project) return [];
  
  // Find projects with same category or tags
  const relatedProjects = PROJECTS_DATA.filter(p => {
    if (p.id === projectId) return false; // Exclude current project
    
    // Check if category matches
    const categoryMatch = p.category === project.category;
    
    // Check if any tags match
    const tagsMatch = p.tags.some(tag => project.tags.includes(tag));
    
    return categoryMatch || tagsMatch;
  });
  
  // Sort by relevance (more tag matches = higher relevance)
  relatedProjects.sort((a, b) => {
    const aTagMatches = a.tags.filter(tag => project.tags.includes(tag)).length;
    const bTagMatches = b.tags.filter(tag => project.tags.includes(tag)).length;
    
    if (aTagMatches !== bTagMatches) {
      return bTagMatches - aTagMatches;
    }
    
    // If tag matches are equal, prioritize same difficulty
    if (a.difficulty === project.difficulty && b.difficulty !== project.difficulty) {
      return -1;
    }
    if (b.difficulty === project.difficulty && a.difficulty !== project.difficulty) {
      return 1;
    }
    
    return 0;
  });
  
  return relatedProjects.slice(0, limit);
}

function slugifyTitle(title) {
  return String(title || '')
    .toLowerCase()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40) || 'project';
}

function uniqStrings(arr) {
  return Array.from(new Set((arr || []).filter(Boolean).map(s => String(s))));
}

function resourcesFromTags(tags = []) {
  const lowerTags = uniqStrings(tags).map(t => t.toLowerCase());
  const resources = [];

  const add = (text, url) => {
    if (!url || resources.some(r => r.url === url)) return;
    resources.push({ text, url });
  };

  if (lowerTags.some(t => t.includes('html'))) add('MDN: HTML', 'https://developer.mozilla.org/en-US/docs/Web/HTML');
  if (lowerTags.some(t => t.includes('css'))) add('MDN: CSS', 'https://developer.mozilla.org/en-US/docs/Web/CSS');
  if (lowerTags.some(t => t.includes('javascript'))) add('MDN: JavaScript', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript');
  if (lowerTags.some(t => t.includes('dom'))) add('MDN: DOM', 'https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model');
  if (lowerTags.some(t => t.includes('localstorage'))) add('MDN: Web Storage', 'https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API');
  if (lowerTags.some(t => t.includes('fetch'))) add('MDN: Fetch API', 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API');
  if (lowerTags.some(t => t.includes('api'))) add('MDN: Web APIs', 'https://developer.mozilla.org/en-US/docs/Web/API');
  if (lowerTags.some(t => t.includes('websocket'))) add('MDN: WebSocket API', 'https://developer.mozilla.org/en-US/docs/Web/API/WebSocket');
  if (lowerTags.some(t => t.includes('geolocation'))) add('MDN: Geolocation API', 'https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API');
  if (lowerTags.some(t => t.includes('drag') || t.includes('drop'))) add('MDN: Drag and Drop API', 'https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API');
  if (lowerTags.some(t => t.includes('markdown'))) add('CommonMark Spec', 'https://spec.commonmark.org/');
  if (lowerTags.some(t => t.includes('date'))) add('MDN: Date', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date');
  if (lowerTags.some(t => t.includes('chart') || t.includes('visualization'))) add('Chart.js Docs', 'https://www.chartjs.org/docs/latest/');
  if (lowerTags.some(t => t.includes('react'))) add('React Docs', 'https://react.dev/learn');
  if (lowerTags.some(t => t.includes('node'))) add('Node.js Docs', 'https://nodejs.org/en/docs');
  if (lowerTags.some(t => t.includes('express'))) add('Express Guide', 'https://expressjs.com/en/guide/routing.html');
  if (lowerTags.some(t => t.includes('typescript'))) add('TypeScript Handbook', 'https://www.typescriptlang.org/docs/handbook/intro.html');
  if (lowerTags.some(t => t.includes('d3'))) add('D3.js Documentation', 'https://d3js.org/');
  if (lowerTags.some(t => t.includes('webrtc'))) add('MDN: WebRTC', 'https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API');
  if (lowerTags.some(t => t.includes('web audio'))) add('MDN: Web Audio API', 'https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API');
  if (lowerTags.some(t => t.includes('service worker') || t.includes('pwa'))) add('MDN: Progressive Web Apps', 'https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps');
  if (lowerTags.some(t => t.includes('canvas'))) add('MDN: Canvas API', 'https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API');
  if (lowerTags.some(t => t.includes('svg'))) add('MDN: SVG', 'https://developer.mozilla.org/en-US/docs/Web/SVG');
  if (lowerTags.some(t => t.includes('codemirror'))) add('CodeMirror Docs', 'https://codemirror.net/docs/');
  if (lowerTags.some(t => t.includes('pdf'))) add('MDN: Canvas API Tutorial', 'https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial');
  if (lowerTags.some(t => t.includes('crypto'))) add('MDN: Web Crypto API', 'https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API');
  if (lowerTags.some(t => t.includes('animation'))) add('MDN: CSS Animations', 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations/Using_CSS_animations');
  if (lowerTags.some(t => t.includes('validation') || t.includes('form'))) add('MDN: Constraint Validation', 'https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation');
  if (lowerTags.some(t => t.includes('webgl'))) add('MDN: WebGL API', 'https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API');
  if (lowerTags.some(t => t.includes('webgl'))) add('Learn WebGL', 'https://learnwebgl.brown37.net/');
  if (lowerTags.some(t => t.includes('neural') || t.includes('machine learning'))) add('Neural Networks and Deep Learning', 'http://neuralnetworksanddeeplearning.com/');
  if (lowerTags.some(t => t.includes('neural') || t.includes('math'))) add('3Blue1Brown: Neural Networks', 'https://www.3blue1brown.com/topics/neural-networks');
  if (lowerTags.some(t => t.includes('math'))) add('Khan Academy: Linear Algebra', 'https://www.khanacademy.org/math/linear-algebra');
  if (lowerTags.some(t => t.includes('algorithm') || t.includes('data structure'))) add('VisuAlgo: Data Structures & Algorithms', 'https://visualgo.net/en');
  if (lowerTags.some(t => t.includes('crdt'))) add('CRDT Tech', 'https://crdt.tech/');
  if (lowerTags.some(t => t.includes('collaboration'))) add('Yjs Documentation', 'https://docs.yjs.dev/');
  if (lowerTags.some(t => t.includes('parsing'))) add('Pratt Parsing', 'https://matklad.github.io/2020/04/13/simple-but-powerful-pratt-parsing.html');
  if (lowerTags.some(t => t.includes('testing') || t.includes('tdd') || t.includes('unit'))) add('Testing JavaScript', 'https://testingjavascript.com/');
  if (lowerTags.some(t => t.includes('security'))) add('OWASP Top 10', 'https://owasp.org/www-project-top-ten/');

  add('freeCodeCamp: JavaScript', 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures-v8/');
  add('web.dev Guides', 'https://web.dev/learn/');

  return resources.slice(0, 8);
}

function generateObjectives(project) {
  const tags = uniqStrings(project.tags || []);
  const techs = tags.length ? tags.join(', ') : 'web fundamentals';
  const category = String(project.category || 'this area');
  const difficulty = String(project.difficulty || 'beginner');
  const lowerTags = tags.map(t => t.toLowerCase());

  const domain = [];
  if (lowerTags.some(t => t.includes('external api') || t.includes('api integration'))) domain.push('Fetch and display data from an external API with loading/error states');
  if (lowerTags.some(t => t.includes('api'))) domain.push('Work with async/await, JSON parsing, and request error handling');
  if (lowerTags.some(t => t.includes('localstorage'))) domain.push('Persist user data using localStorage');
  if (lowerTags.some(t => t.includes('drag') || t.includes('drop'))) domain.push('Implement drag-and-drop interactions for a better UX');
  if (lowerTags.some(t => t.includes('websocket'))) domain.push('Implement real-time features using WebSockets');
  if (lowerTags.some(t => t.includes('webrtc'))) domain.push('Implement peer-to-peer media communication with WebRTC fundamentals');
  if (lowerTags.some(t => t.includes('chart') || t.includes('visualization'))) domain.push('Visualize data using charts and interactive UI elements');
  if (lowerTags.some(t => t.includes('markdown'))) domain.push('Parse and render Markdown safely with a live preview');
  if (lowerTags.some(t => t.includes('security'))) domain.push('Apply secure defaults and avoid common web security mistakes');
  if (lowerTags.some(t => t.includes('webgl'))) domain.push('Render and manipulate 3D scenes using WebGL fundamentals');
  if (lowerTags.some(t => t.includes('crdt') || t.includes('collaboration'))) domain.push('Handle concurrent edits and conflict resolution in collaborative workflows');
  if (lowerTags.some(t => t.includes('algorithm') || t.includes('data structure'))) domain.push('Apply core data structures and algorithms to real features');
  if (lowerTags.some(t => t.includes('neural') || t.includes('machine learning'))) domain.push('Implement backpropagation and training loops from scratch');
  if (lowerTags.some(t => t.includes('pdf'))) domain.push('Generate structured documents with pagination, layout, and rendering');

  const common = [
    `Build a complete ${difficulty}-level project from scratch`,
    `Practice core concepts in ${category}`,
    `Improve problem-solving and debugging skills`,
    `Create a portfolio-ready deliverable`,
  ];

  const techObjective = tags.length ? `Apply ${techs} in a real project` : null;
  const obj = techObjective ? [techObjective, ...domain, ...common] : [...domain, ...common];
  return obj.slice(0, 5);
}

function generateSteps(project) {
  const title = String(project.title || 'Project');
  const slug = slugifyTitle(project.title);
  const category = String(project.category || 'Project');
  const difficulty = String(project.difficulty || 'beginner');
  const tags = uniqStrings(project.tags || []);
  const lowerTags = tags.map(t => t.toLowerCase());
  const lowerTitle = title.toLowerCase();
  const description = String(project.description || '').trim();

  const hasApi = lowerTags.some(t => t.includes('external api') || t.includes('api integration') || t === 'api' || t.includes('fetch'));
  const hasLocalStorage = lowerTags.some(t => t.includes('localstorage'));
  const hasDragDrop = lowerTags.some(t => t.includes('drag') || t.includes('drop'));
  const hasCharts = lowerTags.some(t => t.includes('chart') || t.includes('visualization'));
  const hasDate = lowerTags.some(t => t.includes('date')) || lowerTitle.includes('timer') || lowerTitle.includes('countdown') || lowerTitle.includes('calendar');
  const hasValidation = lowerTags.some(t => t.includes('validation')) || category.toLowerCase().includes('form') || lowerTitle.includes('validation');
  const hasAnimation = lowerTags.some(t => t.includes('animation')) || category.toLowerCase().includes('animation') || lowerTitle.includes('slider') || lowerTitle.includes('clock');
  const hasAudio = lowerTags.some(t => t.includes('audio')) || category.toLowerCase().includes('audio') || lowerTitle.includes('music') || lowerTitle.includes('synth');
  const hasWebSocket = lowerTags.some(t => t.includes('websocket')) || category.toLowerCase().includes('real-time');
  const hasWebRTC = lowerTags.some(t => t.includes('webrtc'));
  const hasMarkdown = lowerTags.some(t => t.includes('markdown'));
  const hasSecurity = lowerTags.some(t => t.includes('security')) || lowerTitle.includes('password');
  const hasCanvas = lowerTags.some(t => t.includes('canvas')) || lowerTitle.includes('canvas');
  const hasPdf = lowerTags.some(t => t.includes('pdf')) || category.toLowerCase().includes('document');
  const hasSearch = lowerTags.some(t => t.includes('search')) || category.toLowerCase().includes('search');
  const hasAlgorithm = lowerTags.some(t => t.includes('algorithm') || t.includes('data structure'));
  const hasWebGL = lowerTags.some(t => t.includes('webgl'));
  const hasEditor = lowerTags.some(t => t.includes('codemirror') || t.includes('code editor')) || lowerTitle.includes('editor');
  const hasCollaboration = lowerTags.some(t => t.includes('crdt') || t.includes('collaboration'));

  const setupCode = `mkdir ${slug}\ncd ${slug}\n# Create: index.html, style.css, app.js`;
  const advancedSetupCode =
    `mkdir ${slug}\ncd ${slug}\n# Choose your structure: /src, /server, /public\n# Add: README.md, .gitignore\n# Create your entry files, then start building features`;

  const htmlBody = (() => {
    if (hasValidation || lowerTitle.includes('bmi') || lowerTitle.includes('tip calculator')) {
      return `
    <section class="card">
      <h2>Inputs</h2>
      <form id="main-form" class="form">
        <label class="field">
          <span class="label">Field 1</span>
          <input id="field1" class="input" type="text" placeholder="Enter value" />
          <small class="error" id="field1-error"></small>
        </label>
        <label class="field">
          <span class="label">Field 2</span>
          <input id="field2" class="input" type="text" placeholder="Enter value" />
          <small class="error" id="field2-error"></small>
        </label>
        <button class="btn" type="submit">Submit</button>
      </form>
    </section>

    <section class="card">
      <h2>Output</h2>
      <div id="output" class="output">—</div>
    </section>
`.trim();
    }

    if (hasDate) {
      return `
    <section class="card">
      <h2>Configure</h2>
      <div class="row">
        <input id="target-datetime" class="input" type="datetime-local" />
        <button id="start-btn" class="btn" type="button">Start</button>
        <button id="reset-btn" class="btn secondary" type="button">Reset</button>
      </div>
      <small class="muted">Pick a date/time and start the timer.</small>
    </section>

    <section class="card">
      <h2>Countdown</h2>
      <div id="timer" class="timer">
        <div class="time-box"><div id="days" class="num">0</div><div class="cap">Days</div></div>
        <div class="time-box"><div id="hours" class="num">0</div><div class="cap">Hours</div></div>
        <div class="time-box"><div id="minutes" class="num">0</div><div class="cap">Minutes</div></div>
        <div class="time-box"><div id="seconds" class="num">0</div><div class="cap">Seconds</div></div>
      </div>
      <div id="status" class="muted"></div>
    </section>
`.trim();
    }

    if (lowerTitle.includes('slider') || lowerTitle.includes('carousel')) {
      return `
    <section class="card">
      <h2>Carousel</h2>
      <div class="carousel" id="carousel">
        <button class="btn icon" id="prev-btn" type="button" aria-label="Previous">◀</button>
        <div class="viewport">
          <img id="slide" class="slide" alt="Slide" />
        </div>
        <button class="btn icon" id="next-btn" type="button" aria-label="Next">▶</button>
      </div>
      <div class="row">
        <button class="btn secondary" id="play-btn" type="button">Play</button>
        <button class="btn secondary" id="pause-btn" type="button">Pause</button>
      </div>
      <div id="dots" class="dots"></div>
    </section>
`.trim();
    }

    if (hasAudio) {
      return `
    <section class="card">
      <h2>Player</h2>
      <audio id="audio" controls class="audio"></audio>
      <div class="row">
        <button id="prev-track" class="btn secondary" type="button">Prev</button>
        <button id="next-track" class="btn secondary" type="button">Next</button>
      </div>
    </section>

    <section class="card">
      <h2>Playlist</h2>
      <ul id="playlist" class="list"></ul>
    </section>
`.trim();
    }

    if (hasCharts) {
      return `
    <section class="card">
      <h2>Controls</h2>
      <div class="row">
        <button id="refresh-btn" class="btn" type="button">Refresh</button>
        <button id="randomize-btn" class="btn secondary" type="button">Randomize</button>
      </div>
      <small class="muted">Start with a simple bar chart, then add filters and time ranges.</small>
    </section>

    <section class="card">
      <h2>Chart</h2>
      <canvas id="chart" width="900" height="420"></canvas>
    </section>
`.trim();
    }

    if (hasMarkdown) {
      return `
    <section class="grid">
      <div class="card">
        <h2>Editor</h2>
        <textarea id="md-input" class="textarea" placeholder="Write Markdown..."></textarea>
        <div class="row">
          <button id="save-btn" class="btn" type="button">Save</button>
          <button id="export-btn" class="btn secondary" type="button">Export</button>
        </div>
      </div>
      <div class="card">
        <h2>Preview</h2>
        <div id="preview" class="preview"></div>
      </div>
    </section>
`.trim();
    }

    if (lowerTitle.includes('quiz') || category.toLowerCase().includes('game')) {
      return `
    <section class="card">
      <h2>Quiz</h2>
      <div id="hud" class="row">
        <div class="pill">Score: <span id="score">0</span></div>
        <div class="pill">Question: <span id="index">1</span></div>
      </div>
      <div id="question" class="question">Click Start</div>
      <div id="answers" class="answers"></div>
      <div class="row">
        <button id="start-btn" class="btn" type="button">Start</button>
        <button id="restart-btn" class="btn secondary" type="button">Restart</button>
      </div>
    </section>
`.trim();
    }

    if (lowerTitle.includes('password')) {
      return `
    <section class="card">
      <h2>Generator</h2>
      <div class="row">
        <input id="length" class="input" type="number" min="6" max="64" value="16" />
        <button id="generate-btn" class="btn" type="button">Generate</button>
        <button id="copy-btn" class="btn secondary" type="button">Copy</button>
      </div>
      <div class="checks">
        <label><input id="use-upper" type="checkbox" checked /> Uppercase</label>
        <label><input id="use-lower" type="checkbox" checked /> Lowercase</label>
        <label><input id="use-num" type="checkbox" checked /> Numbers</label>
        <label><input id="use-symbol" type="checkbox" /> Symbols</label>
      </div>
      <pre id="password" class="output"></pre>
    </section>
`.trim();
    }

    if (hasApi) {
      return `
    <section class="card">
      <h2>Search</h2>
      <form id="search-form" class="row">
        <input id="query" class="input" type="text" placeholder="Type and search..." />
        <button class="btn" type="submit">Search</button>
      </form>
      <div id="status" class="muted"></div>
    </section>

    <section class="card">
      <h2>Results</h2>
      <div id="results" class="grid results"></div>
    </section>
`.trim();
    }

    return `
    <section class="card">
      <h2>Workspace</h2>
      <div class="row">
        <input id="input" class="input" type="text" placeholder="Add item..." />
        <button id="add-btn" class="btn" type="button">Add</button>
      </div>
      <ul id="list" class="list"></ul>
    </section>
`.trim();
  })();

  const htmlTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <div class="container">
    <header class="header">
      <h1>${title}</h1>
      ${description ? `<p class="subtitle">${description}</p>` : ''}
    </header>

${htmlBody.split('\n').map(line => `    ${line}`.replace(/\s+$/g, '')).join('\n')}
  </div>

  <script src="app.js"></script>
</body>
</html>`;

  const cssTemplate = `:root {
  --bg: #0b1220;
  --card: #111a2e;
  --text: #e8eefc;
  --muted: #a7b3d1;
  --accent: #5b8cff;
  --border: rgba(255, 255, 255, 0.1);
}

* { box-sizing: border-box; }
body {
  margin: 0;
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  background: radial-gradient(1200px 800px at 20% 10%, #1a2b57 0%, var(--bg) 60%);
  color: var(--text);
}

.container { max-width: 980px; margin: 0 auto; padding: 24px; }
.header { margin-bottom: 16px; }
.subtitle { color: var(--muted); margin-top: 6px; }

.card {
  background: rgba(17, 26, 46, 0.92);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 16px;
  margin: 14px 0;
}

.row { display: flex; gap: 10px; flex-wrap: wrap; align-items: center; }
.grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
@media (max-width: 860px) { .grid { grid-template-columns: 1fr; } }

.input, .textarea {
  width: min(520px, 100%);
  padding: 12px 12px;
  border-radius: 10px;
  border: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.06);
  color: var(--text);
}
.textarea { min-height: 280px; resize: vertical; }

.btn {
  padding: 10px 14px;
  border-radius: 10px;
  border: 1px solid var(--border);
  background: linear-gradient(180deg, rgba(91, 140, 255, 0.9), rgba(60, 105, 225, 0.9));
  color: white;
  cursor: pointer;
}
.btn.secondary { background: rgba(255, 255, 255, 0.08); }
.btn.icon { width: 44px; height: 44px; display: grid; place-items: center; }

.muted { color: var(--muted); }
.list { list-style: none; padding: 0; margin: 12px 0 0; }
.list li {
  padding: 10px 12px;
  border: 1px solid var(--border);
  border-radius: 10px;
  margin: 8px 0;
  background: rgba(255, 255, 255, 0.04);
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.error { color: #ffb4b4; min-height: 16px; display: block; }
.output {
  border: 1px dashed var(--border);
  border-radius: 10px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.04);
  overflow: auto;
}

.timer { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
@media (max-width: 760px) { .timer { grid-template-columns: repeat(2, 1fr); } }
.time-box { border: 1px solid var(--border); border-radius: 12px; padding: 12px; text-align: center; }
.num { font-size: 32px; font-weight: 700; }
.cap { color: var(--muted); font-size: 12px; }

.carousel { display: grid; grid-template-columns: auto 1fr auto; gap: 12px; align-items: center; }
.viewport { border-radius: 12px; overflow: hidden; border: 1px solid var(--border); background: rgba(255, 255, 255, 0.04); }
.slide { width: 100%; height: 340px; object-fit: cover; display: block; }
.dots { display: flex; gap: 8px; margin-top: 10px; }
.dots button { width: 10px; height: 10px; border-radius: 999px; border: 1px solid var(--border); background: rgba(255, 255, 255, 0.15); cursor: pointer; }
.dots button.active { background: var(--accent); }

.results { grid-template-columns: repeat(3, 1fr); }
@media (max-width: 860px) { .results { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 520px) { .results { grid-template-columns: 1fr; } }
.pill { padding: 8px 10px; border: 1px solid var(--border); border-radius: 999px; background: rgba(255, 255, 255, 0.04); }
.question { font-size: 18px; margin: 12px 0; }
.answers { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
@media (max-width: 520px) { .answers { grid-template-columns: 1fr; } }
.answers button { text-align: left; }

.preview { min-height: 280px; border: 1px solid var(--border); border-radius: 12px; padding: 12px; background: rgba(255, 255, 255, 0.04); }
`;

  const jsSkeleton = (() => {
    const lines = [];
    const add = (s) => lines.push(String(s));
    add(`const state = {`);
    if (hasApi) add(`  query: '',`);
    if (hasLocalStorage) add(`  items: [],`);
    if (lowerTitle.includes('quiz') || category.toLowerCase().includes('game')) {
      add(`  score: 0,`);
      add(`  index: 0,`);
      add(`  questions: [],`);
    }
    if (hasCharts) add(`  series: [],`);
    if (hasDate) add(`  targetMs: null,`);
    if (hasAudio) add(`  playlist: [],`);
    add(`};`);
    add('');
    add(`function $(selector) {`);
    add(`  return document.querySelector(selector);`);
    add(`}`);
    add('');
    add(`function safeJsonParse(value, fallback) {`);
    add(`  try { return JSON.parse(value); } catch { return fallback; }`);
    add(`}`);
    add('');
    if (hasLocalStorage) {
      add(`function loadState() {`);
      add(`  const raw = localStorage.getItem('${slug}:state');`);
      add(`  const data = safeJsonParse(raw, null);`);
      add(`  if (data && Array.isArray(data.items)) state.items = data.items;`);
      add(`}`);
      add('');
      add(`function saveState() {`);
      add(`  localStorage.setItem('${slug}:state', JSON.stringify({ items: state.items }));`);
      add(`}`);
      add('');
    }
    add(`function render() {`);
    if (hasLocalStorage) {
      add(`  const list = $('#list');`);
      add(`  if (list) {`);
      add(`    list.innerHTML = '';`);
      add(`    state.items.forEach((item, idx) => {`);
      add(`      const li = document.createElement('li');`);
      add(`      li.innerHTML = \`<span>\${item.text}</span><button class="btn secondary" data-remove="\${idx}">Remove</button>\`;`);
      add(`      list.appendChild(li);`);
      add(`    });`);
      add(`  }`);
    } else if (hasApi) {
      add(`  $('#status') && ($('#status').textContent = state.query ? 'Searching…' : '');`);
    } else {
      add(`  // Update UI based on state`);
    }
    add(`}`);
    add('');
    add(`function init() {`);
    if (hasLocalStorage) {
      add(`  loadState();`);
      add(`  render();`);
      add('');
      add(`  const addBtn = $('#add-btn');`);
      add(`  const input = $('#input');`);
      add(`  addBtn && addBtn.addEventListener('click', () => {`);
      add(`    const text = String(input && input.value || '').trim();`);
      add(`    if (!text) return;`);
      add(`    state.items.unshift({ text, done: false });`);
      add(`    input.value = '';`);
      add(`    saveState();`);
      add(`    render();`);
      add(`  });`);
      add('');
      add(`  document.addEventListener('click', (e) => {`);
      add(`    const btn = e.target && e.target.closest && e.target.closest('[data-remove]');`);
      add(`    if (!btn) return;`);
      add(`    const idx = Number(btn.getAttribute('data-remove'));`);
      add(`    if (!Number.isFinite(idx)) return;`);
      add(`    state.items.splice(idx, 1);`);
      add(`    saveState();`);
      add(`    render();`);
      add(`  });`);
    } else if (hasApi) {
      add(`  const form = $('#search-form');`);
      add(`  const input = $('#query');`);
      add(`  form && form.addEventListener('submit', async (e) => {`);
      add(`    e.preventDefault();`);
      add(`    state.query = String(input && input.value || '').trim();`);
      add(`    if (!state.query) return;`);
      add(`    await searchAndRender(state.query);`);
      add(`  });`);
    } else if (hasDate) {
      add(`  const startBtn = $('#start-btn');`);
      add(`  const resetBtn = $('#reset-btn');`);
      add(`  const input = $('#target-datetime');`);
      add(`  startBtn && startBtn.addEventListener('click', () => {`);
      add(`    const value = input && input.value;`);
      add(`    state.targetMs = value ? new Date(value).getTime() : null;`);
      add(`    tick();`);
      add(`  });`);
      add(`  resetBtn && resetBtn.addEventListener('click', () => {`);
      add(`    state.targetMs = null;`);
      add(`    tick();`);
      add(`  });`);
      add(`  setInterval(tick, 1000);`);
    } else {
      add(`  render();`);
    }
    add(`}`);
    add('');
    if (hasApi) {
      add(`async function searchAndRender(query) {`);
      add(`  const status = $('#status');`);
      add(`  const results = $('#results');`);
      add(`  if (status) status.textContent = 'Loading…';`);
      add(`  if (results) results.innerHTML = '';`);
      add('');
      add(`  try {`);
      add(`    const url = \`https://api.example.com/search?q=\${encodeURIComponent(query)}\`;`);
      add(`    const res = await fetch(url);`);
      add(`    if (!res.ok) throw new Error('Request failed: ' + res.status);`);
      add(`    const data = await res.json();`);
      add(`    const items = Array.isArray(data.items) ? data.items : [];`);
      add(`    if (status) status.textContent = items.length ? '' : 'No results.';`);
      add(`    if (results) {`);
      add(`      items.slice(0, 12).forEach(item => {`);
      add(`        const card = document.createElement('div');`);
      add(`        card.className = 'card';`);
      add(`        card.innerHTML = \`<h3>\${item.title || 'Item'}</h3><p class="muted">\${item.subtitle || ''}</p>\`;`);
      add(`        results.appendChild(card);`);
      add(`      });`);
      add(`    }`);
      add(`  } catch (err) {`);
      add(`    if (status) status.textContent = String(err && err.message || err);`);
      add(`  }`);
      add(`}`);
      add('');
    }
    if (hasDate) {
      add(`function tick() {`);
      add(`  const status = $('#status');`);
      add(`  if (!state.targetMs) {`);
      add(`    ['days','hours','minutes','seconds'].forEach(id => { const el = $('#' + id); if (el) el.textContent = '0'; });`);
      add(`    if (status) status.textContent = 'Not started';`);
      add(`    return;`);
      add(`  }`);
      add(`  const diff = Math.max(0, state.targetMs - Date.now());`);
      add(`  const days = Math.floor(diff / 86400000);`);
      add(`  const hours = Math.floor((diff % 86400000) / 3600000);`);
      add(`  const minutes = Math.floor((diff % 3600000) / 60000);`);
      add(`  const seconds = Math.floor((diff % 60000) / 1000);`);
      add(`  const set = (id, v) => { const el = $('#' + id); if (el) el.textContent = String(v); };`);
      add(`  set('days', days); set('hours', hours); set('minutes', minutes); set('seconds', seconds);`);
      add(`  if (status) status.textContent = diff === 0 ? 'Done!' : '';`);
      add(`}`);
      add('');
    }
    add(`document.addEventListener('DOMContentLoaded', init);`);
    return lines.join('\n');
  })();

  const coreProcedure = (() => {
    if (hasWebRTC) {
      return {
        title: 'Implement WebRTC flow',
        content: 'Create signaling, then establish peer connections, media tracks, and cleanup logic. Start with one-to-one video, then add reconnection and device switching.',
        code: `// Pseudocode: signaling + peer connection
// 1) Connect to signaling server (WebSocket)
// 2) Create RTCPeerConnection with STUN/TURN
// 3) getUserMedia() -> add tracks to peer connection
// 4) Exchange offer/answer + ICE candidates
// 5) Render remote stream on <video> element`
      };
    }
    if (hasWebSocket) {
      return {
        title: 'Implement real-time communication',
        content: 'Define message shapes, connect client to server, broadcast updates, and keep the UI consistent when messages arrive out-of-order.',
        code: `// Client pseudocode
const ws = new WebSocket('ws://localhost:8080');
ws.addEventListener('message', (e) => {
  const msg = JSON.parse(e.data);
  // apply msg to state then render()
});

function sendMessage(type, payload) {
  ws.send(JSON.stringify({ type, payload, ts: Date.now() }));
}`
      };
    }
    if (hasCollaboration) {
      return {
        title: 'Add collaborative conflict resolution',
        content: 'Model edits as operations, merge changes deterministically, and sync state efficiently. Start with simple last-write-wins, then graduate to CRDT/OT as needed.',
        code: `// Pseudocode outline
// - Represent each edit as an operation (opId, clientId, baseVersion)
// - Apply ops locally and broadcast
// - On receive: transform/merge op into local state
// - Resolve conflicts deterministically (e.g., CRDT rules)`
      };
    }
    if (hasEditor) {
      return {
        title: 'Implement editor features',
        content: 'Support large documents, keep editor state stable, and implement shortcuts/commands. Start with plain textarea, then add rich editor features.',
        code: `// Procedures
// 1) Keep a single source of truth (document text)
// 2) Track selection/cursor position
// 3) Add commands: find/replace, go-to-line, indent/outdent
// 4) Add persistence + export/import`
      };
    }
    if (hasWebGL) {
      return {
        title: 'Render a basic 3D scene',
        content: 'Build a render loop, camera controls, geometry buffers, and shaders. Start with a rotating cube, then add lighting and textures.',
        code: `// Pseudocode: render loop
initGL();
loadShaders();
createBuffers();
function frame(t) {
  updateCamera(t);
  drawScene();
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);`
      };
    }
    if (hasPdf) {
      return {
        title: 'Implement document layout and rendering',
        content: 'Define a layout model (pages, margins, flow), paginate content, then render text/images/tables. Start by exporting a simple “report” first.',
        code: `// Pseudocode: pagination
pages = [];
cursor = { page: 0, y: marginTop };
for each block in blocks:
  if cursor.y + block.height > pageHeight - marginBottom:
    new page; cursor.y = marginTop
  place block at cursor; cursor.y += block.height`
      };
    }
    if (hasSearch) {
      return {
        title: 'Build indexing and search',
        content: 'Tokenize documents, build an inverted index, then score results and return matches with snippets. Start with prefix search, then add ranking.',
        code: `// Pseudocode: inverted index
index = new Map(); // token -> Set(docId)
for each doc:
  tokens = tokenize(doc.text)
  for each token:
    if !index.has(token) index.set(token, new Set())
    index.get(token).add(doc.id)

function search(q) {
  qTokens = tokenize(q)
  return intersect(index[t] for t in qTokens)
}`
      };
    }
    if (hasAlgorithm) {
      return {
        title: 'Design core data structures and algorithms',
        content: 'Pick the correct structures for your features (maps, heaps, tries, graphs). Define invariants and write small tests for correctness.',
        code: `// Procedure checklist
// - Define operations: insert/remove/query and their complexity targets
// - Choose structure: Map, Heap, Trie, Graph, etc.
// - Write invariants (must always be true)
// - Test with edge cases and random inputs`
      };
    }
    if (hasCharts) {
      return {
        title: 'Render and update charts',
        content: 'Turn raw data into series, render a simple chart first, then add interactions (hover tooltips, filtering, ranges).',
        code: `// Canvas bar chart starter (no libraries)
const canvas = document.getElementById('chart');
const ctx = canvas.getContext('2d');

function drawBars(values) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const w = canvas.width / values.length;
  values.forEach((v, i) => {
    const h = Math.max(0, v) * (canvas.height - 40);
    ctx.fillStyle = '#5b8cff';
    ctx.fillRect(i * w + 10, canvas.height - h - 20, w - 20, h);
  });
}`
      };
    }
    if (hasDragDrop) {
      return {
        title: 'Add drag-and-drop interactions',
        content: 'Implement drag start/over/drop handlers, update your state, then re-render. Ensure keyboard fallbacks and clear drop targets.',
        code: `// Basic drag & drop pattern
function onDragStart(e) {
  e.dataTransfer.setData('text/plain', e.target.dataset.id);
}
function onDrop(e) {
  e.preventDefault();
  const id = e.dataTransfer.getData('text/plain');
  const targetCol = e.currentTarget.dataset.column;
  moveItem(id, targetCol);
  render();
}`
      };
    }
    if (hasApi) {
      return {
        title: 'Integrate an API (loading, error, mapping)',
        content: 'Choose a public API, define endpoints, and handle loading/error states. Map response fields into a UI card layout.',
        code: `// API integration checklist
// 1) Build URL with encodeURIComponent
// 2) Show loading spinner/text
// 3) fetch() -> check res.ok -> parse JSON
// 4) Validate shape (Array.isArray)
// 5) Render results, handle empty state`
      };
    }
    if (hasMarkdown) {
      return {
        title: 'Parse and preview Markdown',
        content: 'Start with plain text preview, then progressively add support for headings, lists, links, and code blocks. Keep output safe.',
        code: `// Pseudocode: minimal Markdown rendering
// - Split into lines
// - If line starts with "# " => <h1>
// - If line starts with "- " => list item
// - Else => paragraph
// - Never set innerHTML from untrusted input without sanitizing`
      };
    }
    if (hasAudio) {
      return {
        title: 'Implement playback and playlist logic',
        content: 'Model a playlist array, current track index, and controls (next/prev, seek). Keep UI in sync with audio events.',
        code: `// Core state
const state = { tracks: [], idx: 0 };

function loadTrack(idx) {
  state.idx = idx;
  audio.src = state.tracks[idx].url;
  audio.play();
  renderPlaylist();
}

audio.addEventListener('ended', () => loadTrack((state.idx + 1) % state.tracks.length));`
      };
    }
    if (hasSecurity) {
      return {
        title: 'Add secure defaults and validation',
        content: 'Validate inputs, avoid unsafe HTML injection, and ensure generated secrets are strong. Treat user input as untrusted.',
        code: `// Password generator example approach
const pools = {
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lower: 'abcdefghijklmnopqrstuvwxyz',
  num: '0123456789',
  sym: '!@#$%^&*()_+-=[]{};:,.?'
};
// Pick from selected pools, enforce at least 1 from each checked pool`
      };
    }
    if (hasDate) {
      return {
        title: 'Handle time, intervals, and edge cases',
        content: 'Compute diffs from timestamps, update UI on intervals, and handle invalid dates and timezone issues.',
        code: `// Time diff formula
diffMs = max(0, targetMs - nowMs)
days = floor(diffMs / 86400000)
hours = floor((diffMs % 86400000) / 3600000)
minutes = floor((diffMs % 3600000) / 60000)
seconds = floor((diffMs % 60000) / 1000)`
      };
    }
    if (hasAnimation || hasCanvas) {
      return {
        title: 'Implement animation and state updates',
        content: 'Choose CSS animations for simple UI effects, or requestAnimationFrame for Canvas-driven animations. Keep rendering smooth.',
        code: `// requestAnimationFrame loop
let last = performance.now();
function frame(t) {
  const dt = t - last; last = t;
  update(dt);
  draw();
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);`
      };
    }
    return {
      title: 'Implement core functionality',
      content: 'Add the main features one by one. After each feature, test it in the browser and keep your UI/state consistent.',
      code: `// Procedure
// 1) Pick one feature
// 2) Update state/data model
// 3) Update UI rendering
// 4) Add event handlers
// 5) Test + iterate`
    };
  })();

  const persistenceOrExtension = (() => {
    if (hasLocalStorage) {
      return {
        title: 'Add persistence (save/load)',
        content: 'Store your state in localStorage. Make sure you can load existing data and handle version changes without breaking old users.',
        code: `// Save/load example
function saveState(state) {
  localStorage.setItem('${slug}:state', JSON.stringify(state));
}
function loadState() {
  const raw = localStorage.getItem('${slug}:state');
  return raw ? JSON.parse(raw) : { items: [] };
}`
      };
    }
    if (hasValidation) {
      return {
        title: 'Add validation and user feedback',
        content: 'Validate each input, show inline messages, and prevent submission when invalid. Keep error messages specific and actionable.',
        code: `function validate(fields) {
  const errors = {};
  if (!fields.field1) errors.field1 = 'This field is required';
  if (fields.field2 && fields.field2.length < 3) errors.field2 = 'Minimum 3 characters';
  return errors;
}`
      };
    }
    if (hasApi) {
      return {
        title: 'Add caching and rate limiting',
        content: 'Cache recent responses in memory/localStorage, debounce search input, and avoid sending repeated requests for the same query.',
        code: `// Debounce helper
function debounce(fn, ms) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
}`
      };
    }
    if (difficulty === 'advanced') {
      return {
        title: 'Architect for scale',
        content: 'Split the code into modules, define stable interfaces, and add basic tests or invariant checks for the tricky parts.',
        code: `// Suggested structure
// /src
//   /core   (state, reducers, domain)
//   /ui     (rendering, components)
//   /infra  (storage, api, sockets)
//   index.js`
      };
    }
    return {
      title: 'Enhance features and UX',
      content: 'Add improvements like keyboard shortcuts, better empty states, animations, and accessibility labels.',
      code: `// Checklist
// - empty states
// - loading states
// - keyboard navigation
// - ARIA labels for controls`
    };
  })();

  const base = [
    {
      title: 'Set up the project structure',
      content: 'Create the folder and files. Keep it plain HTML/CSS/JS first; add tooling only if you need it.',
      code: difficulty === 'advanced' ? advancedSetupCode : setupCode
    },
    {
      title: 'Create the HTML structure',
      content: 'Build the UI skeleton with meaningful IDs/classes so JavaScript can target elements predictably.',
      code: htmlTemplate
    },
    {
      title: 'Style with CSS (layout + components)',
      content: 'Start with base styles, then add component styling for the project UI. Make sure it is responsive.',
      code: cssTemplate
    },
    {
      title: 'Plan state, data model, and event wiring',
      content: `Define the state you will store and the main procedures for ${category}. Connect UI events to functions.`,
      code: jsSkeleton
    },
    coreProcedure,
    persistenceOrExtension,
    {
      title: 'Handle edge cases and validation',
      content: 'Add input validation, empty states, error handling, and accessibility basics (labels, focus states).',
      code: `// Edge-case checklist
// - empty input
// - network failure / timeout
// - invalid data shape
// - very large lists / performance
// - keyboard accessibility`
    },
    {
      title: 'Test, refactor, and document',
      content: 'Test the main flows, remove duplication, and write a short README with setup + usage + screenshots.',
      code: `// Quick manual test plan
// - happy path: create/use core feature
// - error path: invalid input / offline
// - refresh: state restored correctly (if applicable)`
    },
    {
      title: 'Deploy and share',
      content: 'Deploy to GitHub Pages or Netlify. Include screenshots and a short usage guide.',
      code: `# GitHub Pages (simple static site)
git init
git add .
git commit -m "Initial commit"
# Push to GitHub then enable Pages in repo settings`
    },
  ];

  if (difficulty === 'beginner') return base.slice(0, 6);
  if (difficulty === 'intermediate') return base.slice(0, 8);
  return base.slice(0, 9);
}

function generateTips(project) {
  const difficulty = String(project.difficulty || 'beginner');
  const title = String(project.title || 'Project');
  const tags = uniqStrings(project.tags || []);
  const lowerTags = tags.map(t => t.toLowerCase());
  const lowerTitle = title.toLowerCase();
  const category = String(project.category || '').toLowerCase();

  const tips = [
    'Start small: get a minimal version working before adding extras',
    'Keep functions short and focused; name variables clearly',
    'Use browser DevTools (Console/Network/Elements) to debug faster',
    'Test after every change to avoid hard-to-find bugs later',
    `Write a short README explaining how to use "${title}"`,
  ];

  if (lowerTags.some(t => t.includes('api'))) {
    tips.unshift('Design your UI for loading, empty, and error states from day one');
  }
  if (lowerTags.some(t => t.includes('localstorage'))) {
    tips.unshift('Version your saved data shape so you can evolve it safely');
  }
  if (lowerTags.some(t => t.includes('validation')) || category.includes('form')) {
    tips.unshift('Show validation errors next to the field and keep messages actionable');
  }
  if (lowerTitle.includes('password') || lowerTags.some(t => t.includes('security'))) {
    tips.unshift('Avoid unsafe HTML injection; treat all user input as untrusted');
  }
  if (lowerTags.some(t => t.includes('websocket')) || lowerTags.some(t => t.includes('webrtc'))) {
    tips.unshift('Log message/connection state during development, then remove noisy logs before final');
  }

  if (difficulty === 'advanced') {
    tips.unshift('Add instrumentation/logging during development, then remove noisy logs before final');
  }

  return tips.slice(0, 6);
}

function enrichProject(project) {
  if (!project) return project;

  const hasObjectives = Array.isArray(project.objectives) && project.objectives.length > 0;
  const hasSteps = Array.isArray(project.steps) && project.steps.length > 0;
  const hasTips = Array.isArray(project.tips) && project.tips.length > 0;
  const hasResources = Array.isArray(project.resources) && project.resources.length > 0;

  return {
    ...project,
    objectives: hasObjectives ? project.objectives : generateObjectives(project),
    steps: hasSteps ? project.steps : generateSteps(project),
    tips: hasTips ? project.tips : generateTips(project),
    resources: hasResources ? project.resources : resourcesFromTags(project.tags || []),
  };
}

function withEnrichment(projects) {
  return (projects || []).map(enrichProject);
}

// Export the data and utility functions
const ProjectsAPI = {
  getAllProjects: () => withEnrichment(PROJECTS_DATA),
  getProjectById: (id) => enrichProject(PROJECTS_DATA.find(project => project.id === id)),
  getBeginnerProjects: () => withEnrichment(getProjectsByDifficulty('beginner')),
  getIntermediateProjects: () => withEnrichment(getProjectsByDifficulty('intermediate')),
  getAdvancedProjects: () => withEnrichment(getProjectsByDifficulty('advanced')),
  getProjectsByDifficulty: (difficulty) => withEnrichment(getProjectsByDifficulty(difficulty)),
  getProjectsByCategory: (category) => withEnrichment(getProjectsByCategory(category)),
  getProjectsBySearchTerm: (term) => withEnrichment(getProjectsBySearchTerm(term)),
  getAllCategories,
  getRelatedProjects: (projectId, limit = 3) => withEnrichment(getRelatedProjects(projectId, limit))
};
