Certainly! Here's the updated README file with the **Team Credits** section added at the end:

```markdown
# PEDIASCAPE: Comprehensive E-Learning Platform

## Overview

PEDIASCAPE is an innovative web-based e-learning platform designed to address the diverse academic and career planning needs of undergraduate students. By combining personalized career guidance, curated study materials, hands-on projects, an intelligent AI chatbot, and an interactive user dashboard, PEDIASCAPE aims to empower students for both academic and professional success.

## Features

- **User Authentication**
  - Secure registration, login, and session management for students and mentors.
- **Study Materials Repository**
  - Centralized hub for textbooks, notes, PDFs, and video content, searchable by subject and category.
- **Career Roadmaps**
  - Visual, step-by-step guidance for multiple technology and professional domains aligning skills with industry roles.
- **Projects Hub**
  - Access to curated project ideas across different skill levels and domains to foster practical coding and teamwork.
- **Career Guidance Module**
  - Personalized assessments and AI-driven recommendations to guide students toward suitable job roles and learning paths.
- **PSAI Chatbot**
  - Integrated virtual assistant for instant academic support, roadmap generation, and learning tips.
- **User Dashboard**
  - Personalized interface featuring calendar, to-do lists, quick links to major platform modules, and notifications.

## Technology Stack

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Backend:** Node.js
- **Database:** Firebase (for authentication, real-time data, storage)
- **Other Tools:** REST API, Postman (testing), Responsive design for multi-device access

## Getting Started

### Prerequisites

- Node.js v18+
- Firebase v9.0+
- Modern browser (Chrome, Firefox, Edge, Safari)
- Visual Studio Code (recommended)

### Installation

1. **Clone the Repository**
   ```
   git clone https://github.com//PEDIASCAPE_Student_Platform.git
   cd PEDIASCAPE_Student_Platform
   ```

2. **Install Dependencies**
   ```
   npm install
   ```

### Configure Firebase and Gemini API

#### 1. Create and Configure Your Firebase Project

- Go to the [Firebase console](https://console.firebase.google.com/) and create a **new Firebase project** with a unique name.
- Add a new web app if you haven’t already.
- Locate your project’s configuration keys (apiKey, authDomain, projectId, etc.).

**Important:**  
Use your own Firebase configuration by replacing placeholders in the project with your Firebase details. Update all relevant scripts/files where Firebase is initialized (commonly in a file like `firebaseConfig.js`).

Example:
```
// firebaseConfig.js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  // other config values...
};
export default firebaseConfig;
```

#### 2. Set Up Gemini AI API Integration

- Register for Google Gemini AI API access.
- Obtain your **Gemini API Key**.
- At the root of your project folder, create a `.env` file if it does not exist.
- Add your Gemini API key in `.env`:
  ```
  GEMINI_API_KEY=your_gemini_api_key_here
  ```

Make sure your server script (`server.js`) is configured to load environment variables using a package like `dotenv`:

```
require('dotenv').config();
const geminiApiKey = process.env.GEMINI_API_KEY;
```

#### 3. Update Scripts

- Review your project scripts (frontend and backend) to ensure you replace all Firebase config placeholders with your actual project details.
- Ensure your `.env` file is loaded properly and the Gemini API key is accessible where required.

### 4. Run the AI Chatbot Server

After completing all configurations, start the AI chatbot server by running:

```
node server.js
```

This command will launch the server and make the AI chatbot available on your configured routes/ports.

## Usage

### Main Modules

- **Study Materials:** Browse, upload, and download academic resources.
- **Career Roadmaps:** Explore visual learning and career paths for various domains (Web Dev, AI, Data Science, Mobile, DevOps, Cybersecurity).
- **Projects:** Filter and select beginner to advanced project ideas, view details and solutions.
- **Career Guidance:** Take assessments, get personalized recommendations, and view suitable career roles with required skills.
- **PSAI Chatbot:** Chat with the integrated AI for instant help, study tips, and roadmap suggestions.
- **Dashboard:** Track your progress, manage your calendar and tasks, and quickly access important features.

## Sample Screens

- Landing page with navigation to all key modules
- Secure login and registration interface
- Dashboard with calendar and to-do widgets
- Visual interactive roadmaps with recommended resources
- Project listing with categories and skills highlighted
- Personalized career assessment and results interface
- Integrated AI assistant chat panel

## Contributing

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add your feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request for review.

## License

This project is licensed for educational purposes. For specific use or distribution rights, please consult the supervisors or project leads.

## Acknowledgments

- Developed by the Batch-1 (PEDIASCAPE team) at Bharat Institute of Engineering and Technology.
- Special thanks to all faculty, mentors, and contributors for their ongoing support.

## Contact

For questions, suggestions, or collaborations, please use the GitHub Issues page or contact the listed project members in the main report.

## 🙌 Team Credits

- Built by Batch-1 as a part of academic curriculum 2025
  - Soumya Sudhir Nayak (Team Lead)
  - Indrakanti Kevin 
  - Rishith Goud Kanrapally
  - Shaik Abid
  - Sri Ram Puneeth
```




## Contact

For questions or collaboration requests, please use the Issues section or contact the maintainers.

PEDIASCAPE – Empowering students through unified academic and career support
