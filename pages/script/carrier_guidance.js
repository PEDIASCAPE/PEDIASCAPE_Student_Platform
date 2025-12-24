/* --- app.js --- */
// // Main application file
// import { questions } from './questions.js';
// import { calculateResults } from './results.js';
// import { animations } from './animations.js';

// DOM Elements
const welcomeScreen = document.getElementById('welcome-screen');
const questionScreen = document.getElementById('question-screen');
const resultsScreen = document.getElementById('results-screen');

const startBtn = document.getElementById('start-btn');
const questionContainer = document.getElementById('question-container');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progressBar = document.getElementById('progress');
const questionCounter = document.getElementById('question-counter');
const resultsContainer = document.getElementById('results-container');
const restartBtn = document.getElementById('restart-btn');

// Application state
let currentQuestionIndex = 0;
let userAnswers = [];

// Initialize the application
function initApp() {
  startBtn.addEventListener('click', startQuiz);
  prevBtn.addEventListener('click', showPreviousQuestion);
  nextBtn.addEventListener('click', showNextQuestion);
  restartBtn.addEventListener('click', restartQuiz);
  
  // Pre-populate user answers array with nulls
  userAnswers = Array(questions.length).fill(null);
}

// Start the quiz
function startQuiz() {
  animations.fadeOut(welcomeScreen, () => {
    animations.fadeIn(questionScreen);
    showQuestion(currentQuestionIndex);
    updateProgress();
  });
}

// Show a specific question
function showQuestion(index) {
  // Clear the question container
  questionContainer.innerHTML = '';
  
  // Create the question element
  const question = questions[index];
  const questionElement = document.createElement('div');
  questionElement.classList.add('question');
  
  // Create question title
  const titleElement = document.createElement('h3');
  titleElement.classList.add('question-title');
  titleElement.textContent = question.text;
  questionElement.appendChild(titleElement);
  
  // Create options
  const optionsContainer = document.createElement('div');
  optionsContainer.classList.add('options');
  
  question.options.forEach((option, optionIndex) => {
    const optionElement = document.createElement('div');
    optionElement.classList.add('option');
    optionElement.textContent = option.text;
    
    // Check if this option is selected
    if (userAnswers[index] === optionIndex) {
      optionElement.classList.add('selected');
    }
    
    // Add click event listener
    optionElement.addEventListener('click', () => {
      // Remove selected class from all options
      const options = optionsContainer.querySelectorAll('.option');
      options.forEach(opt => opt.classList.remove('selected'));
      
      // Add selected class to clicked option
      optionElement.classList.add('selected');
      
      // Update user answers
      userAnswers[index] = optionIndex;
      
      // Enable next button
      nextBtn.disabled = false;
    });
    
    optionsContainer.appendChild(optionElement);
  });
  
  questionElement.appendChild(optionsContainer);
  questionContainer.appendChild(questionElement);
  
  // Update button states
  prevBtn.disabled = index === 0;
  nextBtn.disabled = userAnswers[index] === null;
  
  // Update question counter
  questionCounter.textContent = `Question ${index + 1}/${questions.length}`;
}

// Show the next question
function showNextQuestion() {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    animations.fadeOut(questionContainer, () => {
      showQuestion(currentQuestionIndex);
      animations.fadeIn(questionContainer);
    });
    updateProgress();
  } else {
    showResults();
  }
}

// Show the previous question
function showPreviousQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    animations.fadeOut(questionContainer, () => {
      showQuestion(currentQuestionIndex);
      animations.fadeIn(questionContainer);
    });
    updateProgress();
  }
}

// Update progress bar
function updateProgress() {
  const percentage = ((currentQuestionIndex + 1) / questions.length) * 100;
  progressBar.style.width = `${percentage}%`;
}

// Show the results
function showResults() {
  animations.fadeOut(questionScreen, () => {
    // Calculate results
    const results = calculateResults(userAnswers, questions);
    
    // Display results
    displayResults(results);
    
    // Show results screen
    animations.fadeIn(resultsScreen);
  });
}

// Display results
function displayResults(results) {
  resultsContainer.innerHTML = '';
  
  // Create results header
  const resultTitle = document.createElement('h3');
  resultTitle.classList.add('result-title');
  resultTitle.textContent = results.title;
  resultsContainer.appendChild(resultTitle);
  
  const resultDescription = document.createElement('p');
  resultDescription.classList.add('result-description');
  resultDescription.textContent = results.description;
  resultsContainer.appendChild(resultDescription);
  
  // Create career matches section
  const careerMatchesTitle = document.createElement('h4');
  careerMatchesTitle.textContent = 'Your Top Career Matches';
  careerMatchesTitle.style.marginBottom = 'var(--space-2)';
  resultsContainer.appendChild(careerMatchesTitle);
  
  const careerMatches = document.createElement('div');
  careerMatches.classList.add('career-matches');
  
  // Add each career match
  results.matches.forEach(match => {
    const matchElement = document.createElement('div');
    matchElement.classList.add('career-match');
    
    // Create percentage bar
    const percentageBar = document.createElement('div');
    percentageBar.classList.add('match-percentage');
    
    const bar = document.createElement('div');
    bar.classList.add('percentage-bar');
    
    const fill = document.createElement('div');
    fill.classList.add('percentage-fill');
    bar.appendChild(fill);
    
    const percentText = document.createElement('span');
    percentText.classList.add('percentage-text');
    percentText.textContent = `${match.percentage}%`;
    
    percentageBar.appendChild(bar);
    percentageBar.appendChild(percentText);
    matchElement.appendChild(percentageBar);
    
    // Career title
    const matchTitle = document.createElement('h5');
    matchTitle.classList.add('match-title');
    matchTitle.textContent = match.title;
    matchElement.appendChild(matchTitle);
    
    // Career description
    const matchDescription = document.createElement('p');
    matchDescription.classList.add('match-description');
    matchDescription.textContent = match.description;
    matchElement.appendChild(matchDescription);
    
    // Skills
    const skillsContainer = document.createElement('div');
    skillsContainer.classList.add('match-skills');
    
    match.skills.forEach(skill => {
      const skillTag = document.createElement('span');
      skillTag.classList.add('skill-tag');
      skillTag.textContent = skill;
      skillsContainer.appendChild(skillTag);
    });
    
    matchElement.appendChild(skillsContainer);
    careerMatches.appendChild(matchElement);
  });
  
  resultsContainer.appendChild(careerMatches);
  
  // Animate percentage bars after a short delay
  setTimeout(() => {
    const fills = document.querySelectorAll('.percentage-fill');
    fills.forEach((fill, index) => {
      const percentage = results.matches[index].percentage;
      fill.style.width = `${percentage}%`;
    });
  }, 500);
}

// Restart the quiz
function restartQuiz() {
  // Reset state
  currentQuestionIndex = 0;
  userAnswers = Array(questions.length).fill(null);
  
  // Reset UI
  animations.fadeOut(resultsScreen, () => {
    animations.fadeIn(welcomeScreen);
  });
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);

/* --- questions.js --- */
// Questions data

export const questions = [
  {
    text: "Which aspect of software development interests you the most?",
    options: [
      { text: "Creating user interfaces and visual components", careers: ["frontend", "ui_developer", "react_developer"] },
      { text: "Building server-side logic and databases", careers: ["backend", "database_engineer", "api_developer"] },
      { text: "Mobile app development", careers: ["mobile_developer", "react_native", "ios_developer"] },
      { text: "System architecture and infrastructure", careers: ["devops", "cloud_engineer", "system_architect"] }
    ]
  },
  {
    text: "What's your preferred programming paradigm?",
    options: [
      { text: "Object-Oriented Programming", careers: ["java_developer", "c_sharp_developer", "backend"] },
      { text: "Functional Programming", careers: ["frontend", "react_developer", "node_developer"] },
      { text: "Full-Stack Development", careers: ["fullstack", "mern_developer", "web_developer"] },
      { text: "Low-level Programming", careers: ["systems_programmer", "embedded_developer", "c_developer"] }
    ]
  },
  {
    text: "Which technology stack interests you most?",
    options: [
      { text: "React, TypeScript, and Modern Frontend Tools", careers: ["frontend", "react_developer", "typescript_developer"] },
      { text: "Node.js, Express, and MongoDB", careers: ["backend", "node_developer", "api_developer"] },
      { text: "Python, Django, and PostgreSQL", careers: ["python_developer", "backend", "database_engineer"] },
      { text: "Cloud Services (AWS, Azure, GCP)", careers: ["cloud_engineer", "devops", "system_architect"] }
    ]
  },
  {
    text: "How do you prefer to solve technical problems?",
    options: [
      { text: "Through user-centric design and iteration", careers: ["frontend", "ui_developer", "ux_engineer"] },
      { text: "By optimizing algorithms and performance", careers: ["backend", "algorithm_engineer", "performance_engineer"] },
      { text: "Using data structures and system design", careers: ["systems_engineer", "backend", "algorithm_engineer"] },
      { text: "Through automation and tooling", careers: ["devops", "automation_engineer", "tooling_developer"] }
    ]
  },
  {
    text: "What type of projects excite you?",
    options: [
      { text: "Interactive web applications", careers: ["frontend", "react_developer", "web_developer"] },
      { text: "Scalable backend systems", careers: ["backend", "systems_engineer", "cloud_engineer"] },
      { text: "Cross-platform mobile apps", careers: ["mobile_developer", "react_native", "flutter_developer"] },
      { text: "Developer tools and infrastructure", careers: ["devops", "tooling_developer", "platform_engineer"] }
    ]
  },
  {
    text: "Which aspect of software quality do you value most?",
    options: [
      { text: "User experience and accessibility", careers: ["frontend", "ui_developer", "ux_engineer"] },
      { text: "Performance and scalability", careers: ["backend", "performance_engineer", "systems_engineer"] },
      { text: "Code maintainability and testing", careers: ["qa_engineer", "test_automation", "quality_engineer"] },
      { text: "Security and reliability", careers: ["security_engineer", "reliability_engineer", "devops"] }
    ]
  },
  {
    text: "What's your ideal development environment?",
    options: [
      { text: "Modern web technologies and frameworks", careers: ["frontend", "web_developer", "javascript_developer"] },
      { text: "Server-side development with strong typing", careers: ["backend", "java_developer", "c_sharp_developer"] },
      { text: "Cross-platform development tools", careers: ["mobile_developer", "fullstack", "react_native"] },
      { text: "Cloud and container platforms", careers: ["devops", "cloud_engineer", "platform_engineer"] }
    ]
  },
  {
    text: "How do you prefer to work with data?",
    options: [
      { text: "Through APIs and state management", careers: ["frontend", "react_developer", "api_developer"] },
      { text: "Database design and optimization", careers: ["database_engineer", "backend", "data_engineer"] },
      { text: "Data visualization and analytics", careers: ["data_visualization", "frontend", "analytics_engineer"] },
      { text: "Big data and distributed systems", careers: ["big_data_engineer", "distributed_systems", "backend"] }
    ]
  },
  {
    text: "What's your approach to learning new technologies?",
    options: [
      { text: "Following latest frontend trends", careers: ["frontend", "javascript_developer", "web_developer"] },
      { text: "Deep diving into documentation", careers: ["backend", "systems_engineer", "api_developer"] },
      { text: "Building side projects", careers: ["fullstack", "mobile_developer", "indie_developer"] },
      { text: "Contributing to open source", careers: ["open_source_developer", "community_engineer", "developer_advocate"] }
    ]
  },
  {
    text: "How do you handle technical debt?",
    options: [
      { text: "Regular refactoring and modernization", careers: ["frontend", "technical_lead", "architect"] },
      { text: "Performance optimization and scaling", careers: ["backend", "performance_engineer", "systems_engineer"] },
      { text: "Automated testing and CI/CD", careers: ["qa_engineer", "devops", "automation_engineer"] },
      { text: "Documentation and code reviews", careers: ["technical_writer", "lead_developer", "quality_engineer"] }
    ]
  },
  {
    text: "What interests you in software architecture?",
    options: [
      { text: "Component design and state management", careers: ["frontend", "react_developer", "architect"] },
      { text: "Microservices and API design", careers: ["backend", "systems_architect", "api_developer"] },
      { text: "Cloud-native architectures", careers: ["cloud_architect", "devops", "platform_engineer"] },
      { text: "Distributed systems", careers: ["distributed_systems", "backend", "systems_engineer"] }
    ]
  },
  {
    text: "How do you prefer to collaborate with others?",
    options: [
      { text: "Cross-functional team collaboration", careers: ["frontend", "fullstack", "product_engineer"] },
      { text: "Technical mentorship and leadership", careers: ["technical_lead", "engineering_manager", "architect"] },
      { text: "Code reviews and pair programming", careers: ["senior_developer", "lead_developer", "mentor"] },
      { text: "Documentation and knowledge sharing", careers: ["technical_writer", "developer_advocate", "documentation_engineer"] }
    ]
  },
  {
    text: "What type of development challenges motivate you?",
    options: [
      { text: "Creating seamless user experiences", careers: ["frontend", "ux_engineer", "ui_developer"] },
      { text: "Solving complex algorithmic problems", careers: ["algorithm_engineer", "backend", "systems_engineer"] },
      { text: "Building scalable distributed systems", careers: ["distributed_systems", "backend", "cloud_engineer"] },
      { text: "Automating development workflows", careers: ["devops", "automation_engineer", "tooling_developer"] }
    ]
  },
  {
    text: "Which development methodology do you prefer?",
    options: [
      { text: "Rapid prototyping and iteration", careers: ["frontend", "product_engineer", "startup_developer"] },
      { text: "Test-driven development", careers: ["qa_engineer", "backend", "quality_engineer"] },
      { text: "DevOps and continuous deployment", careers: ["devops", "release_engineer", "platform_engineer"] },
      { text: "Agile and sprint planning", careers: ["scrum_master", "technical_lead", "project_manager"] }
    ]
  },
  {
    text: "What's your ideal technical specialization?",
    options: [
      { text: "Frontend frameworks and libraries", careers: ["frontend", "react_developer", "javascript_developer"] },
      { text: "Backend systems and databases", careers: ["backend", "database_engineer", "systems_engineer"] },
      { text: "DevOps and infrastructure", careers: ["devops", "platform_engineer", "site_reliability_engineer"] },
      { text: "Mobile and cross-platform development", careers: ["mobile_developer", "react_native", "flutter_developer"] }
    ]
  }
];

// Career data for results
export const careerData = {
  "frontend": {
    title: "Frontend Developer",
    description: "Specialize in creating responsive, interactive user interfaces using modern JavaScript frameworks like React.",
    skills: ["React", "TypeScript", "CSS", "Web Performance"]
  },
  "backend": {
    title: "Backend Developer",
    description: "Build server-side applications, APIs, and database systems that power web applications.",
    skills: ["Node.js", "Databases", "API Design", "System Architecture"]
  },
  "fullstack": {
    title: "Full Stack Developer",
    description: "Develop both client and server-side applications, bridging frontend and backend technologies.",
    skills: ["Frontend", "Backend", "Databases", "System Design"]
  },
  "devops": {
    title: "DevOps Engineer",
    description: "Manage infrastructure, deployment pipelines, and automation to improve development workflows.",
    skills: ["CI/CD", "Cloud Platforms", "Infrastructure as Code", "Monitoring"]
  },
  "mobile_developer": {
    title: "Mobile Developer",
    description: "Create native or cross-platform mobile applications for iOS and Android platforms.",
    skills: ["React Native", "Mobile UI", "App Performance", "Native APIs"]
  },
  "cloud_engineer": {
    title: "Cloud Engineer",
    description: "Design and maintain cloud infrastructure using services like AWS, Azure, or GCP.",
    skills: ["Cloud Services", "Infrastructure", "Scalability", "Security"]
  },
  "systems_engineer": {
    title: "Systems Engineer",
    description: "Design and optimize complex software systems focusing on performance and scalability.",
    skills: ["System Design", "Performance", "Scalability", "Architecture"]
  },
  "qa_engineer": {
    title: "QA Engineer",
    description: "Ensure software quality through automated testing and quality assurance processes.",
    skills: ["Test Automation", "Quality Assurance", "CI/CD", "Testing Frameworks"]
  },
  "security_engineer": {
    title: "Security Engineer",
    description: "Focus on application security, implementing best practices and security measures.",
    skills: ["Security", "Penetration Testing", "Security Protocols", "Risk Assessment"]
  },
  "data_engineer": {
    title: "Data Engineer",
    description: "Build and maintain data pipelines and infrastructure for large-scale data processing.",
    skills: ["Data Processing", "ETL", "Data Warehousing", "Big Data"]
  },
  "ui_developer": {
    title: "UI Developer",
    description: "Specialize in creating beautiful, responsive user interfaces with attention to detail.",
    skills: ["UI Design", "CSS", "Animation", "Responsive Design"]
  },
  "react_developer": {
    title: "React Developer",
    description: "Build modern web applications using React and its ecosystem of tools and libraries.",
    skills: ["React", "State Management", "Component Design", "Performance"]
  },
  "node_developer": {
    title: "Node.js Developer",
    description: "Develop scalable server-side applications using Node.js and related technologies.",
    skills: ["Node.js", "Express", "API Design", "Async Programming"]
  },
  "technical_lead": {
    title: "Technical Lead",
    description: "Lead development teams while maintaining technical excellence and mentoring others.",
    skills: ["Leadership", "Architecture", "Mentoring", "Project Planning"]
  },
  "platform_engineer": {
    title: "Platform Engineer",
    description: "Build and maintain development platforms and infrastructure for engineering teams.",
    skills: ["Infrastructure", "Developer Tools", "Automation", "Platform Design"]
  }
}

/* --- animations.js --- */
// Animation utilities

export const animations = {
  // Fade out an element and execute a callback when complete
  fadeOut: (element, callback) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      element.classList.remove('active');
      if (callback) callback();
    }, 300); // Match transition duration
  },
  
  // Fade in an element
  fadeIn: (element) => {
    setTimeout(() => {
      element.classList.add('active');
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }, 50); // Small delay to ensure the display change has taken effect
  },
  
  // Slide elements in from the side
  slideIn: (elements, direction = 'left', staggerDelay = 100) => {
    elements.forEach((element, index) => {
      element.style.opacity = '0';
      element.style.transform = direction === 'left' 
        ? 'translateX(-20px)' 
        : 'translateX(20px)';
      
      setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateX(0)';
      }, index * staggerDelay);
    });
  },
  
  // Pulse animation
  pulse: (element) => {
    element.classList.add('pulse');
    setTimeout(() => {
      element.classList.remove('pulse');
    }, 600); // Animation duration
  }
};

/* --- results.js --- */
// Results calculation logic

import { careerData } from './questions.js';

// Calculate results based on user answers
export function calculateResults(userAnswers, questions) {
  // Initialize career scores
  const careerScores = {};
  
  // Process each answer
  userAnswers.forEach((answerIndex, questionIndex) => {
    if (answerIndex !== null) {
      const question = questions[questionIndex];
      const answer = question.options[answerIndex];
      
      // Add points to each career associated with this answer
      answer.careers.forEach(career => {
        if (!careerScores[career]) {
          careerScores[career] = 0;
        }
        careerScores[career] += 1;
      });
    }
  });
  
  // Convert to array for sorting
  const careers = Object.entries(careerScores).map(([career, score]) => ({
    career,
    score,
    percentage: Math.round((score / userAnswers.length) * 100)
  }));
  
  // Sort by score (descending)
  careers.sort((a, b) => b.score - a.score);
  
  // Get top 5 careers
  const topCareers = careers.slice(0, 5);
  
  // Map career data based on category score
  const careerCategories = {
    technical: getTechnicalScore(careerScores),
    creative: getCreativeScore(careerScores),
    analytical: getAnalyticalScore(careerScores),
    interpersonal: getInterpersonalScore(careerScores)
  };
  
  // Get the dominant category
  const dominantCategory = Object.entries(careerCategories)
    .sort((a, b) => b[1] - a[1])
    [0][0];
  
  // Create result matches with error handling
  const matches = topCareers
    .map(careerScore => {
      // Find the best matching actual career from our data
      const actualCareer = findBestMatchingCareer(careerScore.career);
      const careerInfo = careerData[actualCareer];

      // Skip if no career data is found
      if (!careerInfo) {
        console.warn(`No career data found for ${actualCareer}`);
        return null;
      }

      return {
        title: careerInfo.title,
        description: careerInfo.description,
        percentage: careerScore.percentage,
        skills: careerInfo.skills || []
      };
    })
    .filter(match => match !== null); // Remove any null entries
  
  // Create the results object
  return {
    title: getResultTitle(dominantCategory),
    description: getResultDescription(dominantCategory),
    matches: matches
  };
}

// Find the best matching career from our careerData
function findBestMatchingCareer(careerCategory) {
  // If the exact category exists in careerData, use it
  if (careerData[careerCategory]) {
    return careerCategory;
  }
  
  // Otherwise map to the closest match
  const careerMappings = {
    "corporate": "finance",
    "administration": "project_management",
    "arts": "design",
    "media": "marketing",
    "sports": "education",
    "travel": "sales",
    "field_work": "research",
    "tech": "software_development",
    "digital_nomad": "entrepreneurship",
    "content_creation": "marketing",
    "engineering": "software_development",
    "management": "project_management",
    "operations": "project_management",
    "quality_assurance": "software_development",
    "accounting": "finance",
    "counseling": "hr",
    "development": "software_development",
    "government": "consulting",
    "remote_work": "software_development",
    "startup": "entrepreneurship",
    "medicine": "healthcare",
    "law": "consulting",
    "product_development": "product_management",
    "nonprofit": "education",
    "business": "finance",
    "technical_writing": "research",
    "training": "education",
    "architecture": "design",
    "data_analysis": "data_science",
    "academia": "research",
    "trades": "entrepreneurship",
    "specialized_medicine": "healthcare",
    "executive": "consulting",
    "corporate": "finance",
    "journalism": "marketing",
    "event_planning": "project_management",
    "emergency_services": "healthcare",
    "self_employment": "entrepreneurship",
    "remote_technical": "software_development",
    "manufacturing": "project_management",
    "it": "software_development",
    "writing": "marketing"
  };
  
  // Get the mapped career or use a default that we know exists in careerData
  const mappedCareer = careerMappings[careerCategory];
  return careerData[mappedCareer] ? mappedCareer : "consulting";
}

// Calculate technical score
function getTechnicalScore(careerScores) {
  const technicalCareers = [
    "data_science", "engineering", "software_development", "it",
    "technical_writing", "development", "tech", "remote_technical"
  ];
  
  return calculateCategoryScore(careerScores, technicalCareers);
}

// Calculate creative score
function getCreativeScore(careerScores) {
  const creativeCareers = [
    "design", "arts", "media", "writing", "marketing", "content_creation",
    "architecture", "product_development", "creative"
  ];
  
  return calculateCategoryScore(careerScores, creativeCareers);
}

// Calculate analytical score
function getAnalyticalScore(careerScores) {
  const analyticalCareers = [
    "data_science", "research", "finance", "analysis", "data_analysis",
    "accounting", "quality_assurance"
  ];
  
  return calculateCategoryScore(careerScores, analyticalCareers);
}

// Calculate interpersonal score
function getInterpersonalScore(careerScores) {
  const interpersonalCareers = [
    "sales", "hr", "education", "counseling", "healthcare", "management",
    "training", "consulting"
  ];
  
  return calculateCategoryScore(careerScores, interpersonalCareers);
}

// Calculate category score based on career scores
function calculateCategoryScore(careerScores, careers) {
  let score = 0;
  
  careers.forEach(career => {
    if (careerScores[career]) {
      score += careerScores[career];
    }
  });
  
  return score;
}

// Get result title based on dominant category
function getResultTitle(category) {
  const titles = {
    technical: "Technology and Innovation Professional",
    creative: "Creative and Design Specialist",
    analytical: "Analytical Problem Solver",
    interpersonal: "People-Oriented Professional"
  };
  
  return titles[category] || "Versatile Professional";
}

// Get result description based on dominant category
function getResultDescription(category) {
  const descriptions = {
    technical: "You thrive in environments where you can apply technical skills to solve complex problems. Your logical approach and attention to detail make you well-suited for careers in technology and engineering fields.",
    creative: "Your creative thinking and innovative approach set you apart. You excel in environments where you can express your creativity and develop original solutions and designs.",
    analytical: "You have a natural ability to analyze information and draw meaningful conclusions. Your methodical approach to problem-solving makes you valuable in roles requiring careful analysis and strategic thinking.",
    interpersonal: "Your strength lies in connecting with others and building relationships. You thrive in environments where you can collaborate, communicate, and work directly with people."
  };
  
  return descriptions[category] || "You have a balanced skill set that makes you adaptable to various professional environments. Your versatility allows you to succeed in different types of roles and industries.";
}

