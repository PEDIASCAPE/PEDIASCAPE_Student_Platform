## 🎓 PEDIASCAPE - Student E Learning & Guidance Platform

PEDIASCAPE is an innovative web-based e-learning platform designed to address the diverse academic and career planning needs of students. It combines personalized career guidance, curated study materials, hands-on projects, an intelligent AI chatbot, and an interactive user dashboard to empower students for both academic and professional success.


## ✨ Features
📚 Student-focused e-learning experience with responsive UI across all devices

🗺️ Roadmaps module with interactive visual roadmap graphs powered by dagreD3

🤖 PSAI Chatbot powered by Hugging Face Inference API (Qwen 2.5 Coder)

🔐 Supabase integration for authentication, real-time data, and file storage

🔗 REST-based backend APIs (Node.js) with Postman testing support

📊 Interactive user dashboard for progress tracking and personalized recommendations

🎯 Career guidance module with domain-specific learning paths

## 🛠️ Tech Stack

Component	Technology
Frontend:	HTML5, CSS3, JavaScript (ES6+)

Backend:	Node.js (REST API)

Database/Auth:	Supabase (PostgreSQL, Auth, Realtime, Storage)

AI Chatbot:	Hugging Face Inference API (Qwen 2.5 Coder 7B Instruct)

Deployment	Docker-ready, Cloud-agnostic

## 📦 What's New (Latest Updates)
## 🎨 Roadmaps Module - UI/UX Improvements
Fixed node label overflow (e.g., "Mobile Development") by removing fixed node dimensions and enabling auto-sizing in the dagreD3 graph


Added robust node label wrapping with multi-line support, including handling long unbroken words by chunking before wrapping


Improved grid-card containment with safer title/description wrapping and clamping in the Roadmaps listing


## ⚙️ Roadmaps Module - Functionality & Interactions
Restored all buttons across Roadmaps module by preventing click interception and restoring missing handlers:

Disabled pointer events on rotated "ROADMAPS" side header + adjusted stacking


Added global navigation/menu handlers (toggleDropdown(), navigateTo(), redirectToLogin(), toggleUserMenu())


Fixed roadmap node click reliability by binding handlers to rendered node groups (g.node) and mapping nodes via stable IDs (data-node-id)


Confirmed sidebar links open correctly in new tabs


## 🎭 Modal / Roadmap Launch Flow
Roadmap cards now open the visualizer inside a modal iframe

URL pattern: roadmap-visualizer.html?roadmap=<domain>.json


Modal features:

Close button + overlay-click to close

Consistent flexbox display

Disables background scroll while open

Smooth animations and transitions

## ✅ Verification Performed
✓ Navbar links, mobile dropdown, profile menu

✓ Roadmap cards, node clicks, sidebar open/close

✓ External resource links (new tab opening)

✓ Editor diagnostics: Clean (GetDiagnostics returned [])


## 🚀 Getting Started
Prerequisites
Before you begin, ensure you have:

Node.js (v18 LTS or higher) — Download

Git — Download

Supabase account (URL + anon key) — Sign up

Hugging Face access token (for chatbot) — Get token

1️⃣ Clone the Repository

git clone https://github.com/PEDIASCAPE/PEDIASCAPE_Student_Platform.git
cd PEDIASCAPE_Student_Platform

2️⃣ Configure Environment Variables
Create a .env file in the project root. Never commit this file to version control (it's protected by .gitignore).

# Supabase Configuration
```SUPABASE_URL=https://your-project.supabase.co```

```SUPABASE_ANON_KEY=YOUR ANON KEY```

# PSAI Chatbot (Hugging Face)
```HUGGINGFACE_API_KEY=hf_YOUR_API_KEY_HERE```

```HUGGINGFACE_MODEL=Qwen/Qwen2.5-Coder-7B-Instruct```

# Server Configuration (Optional)
NODE_ENV=development
PORT=3000
⚠️ Security Note: Keep your API keys safe. Never share your .env file or commit it to the repository.

3️⃣ Install Dependencies
If your project has a Node.js backend:


``# Install all dependencies
npm install``

Or if you have separate frontend and backend folders:


# Backend dependencies
``cd backend && npm install``

# Frontend dependencies (if applicable)
``cd ../frontend && npm install``

4️⃣ Run Locally
Backend (Express/Node.js):


# Production mode
``npm start``

# Development mode with auto-reload
``npm run dev``
Frontend (Static HTML/CSS/JS):

Option A — Using npx serve:

bash
npx serve .
Option B — Using your IDE's Live Server extension:

Right-click on index.html → "Open with Live Server"

The application should now be accessible at:

Frontend: http://localhost:3000 (or IDE's Live Server port)

Backend API: http://localhost:3000/api (if running together)

## 🤖 PSAI Chatbot (Hugging Face / Qwen 2.5)
PSAI is an intelligent AI assistant powered by the Qwen 2.5 Coder 7B model via Hugging Face Inference API.

Configuration
Required environment variables:

HUGGINGFACE_API_KEY — Your Hugging Face API token

HUGGINGFACE_MODEL — Model identifier (default: Qwen/Qwen2.5-Coder-7B-Instruct)


## 🔐 Security & Best Practices
Environment Variables
✅ Do store sensitive keys in .env (excluded by .gitignore)

❌ Don't hardcode API keys in source files

❌ Don't commit .env file to Git

## API Key Management
Rotate keys regularly in Supabase and Hugging Face dashboards

If accidentally exposed:

Immediately regenerate/rotate the key

Update your .env file

Monitor account activity for unauthorized access

## CORS & Authentication
Frontend and backend should have matching CORS configurations

Use Supabase JWT tokens for authenticated API requests

Validate tokens on the backend before processing requests

🤝 Contributing
We welcome contributions from the community! Here's how to get involved:

Step 1: Fork the Repository
Click the Fork button at the top-right of this repo.

Step 2: Create a Feature Branch
bash
git checkout -b feature/your-feature-name

Step 3: Make Your Changes
Write clean, readable code

Add comments for complex logic

Follow existing code style

Step 4: Commit Your Changes
bash
git commit -m "Add: brief description of your changes"

Step 5: Push to Your Fork
bash
git push origin feature/your-feature-name

Step 6: Open a Pull Request
Go to the original repo

Click Pull Request and describe your changes


Special Thanks
Faculty and mentors at Bharat Institute of Engineering and Technology

All contributors and community members who have provided feedback and suggestions

The open-source community for amazing libraries and frameworks

Batch: 1 (2025)
Academic Curriculum: Software Engineering & Web Development

📞 Contact & Support
Questions or Issues?
📌 GitHub Issues: Create an issue

💬 Discussions: Join discussions

📧 Email: Contact project leads via the GitHub Issues page

## Resources
Supabase Documentation

Hugging Face Inference API

Node.js Documentation

dagreD3 Documentation

## 📊 Project Statistics
Total Features: 7+

API Endpoints: 10+

Responsive Breakpoints: 5 (Mobile, Tablet, Desktop, Large, Extra-Large)

AI Models Integrated: 1 (Qwen 2.5 Coder)

Database Modules: 4 (Auth, Realtime, Storage, Vectors)



## 💬 Testimonials
"PEDIASCAPE transformed my learning journey by connecting guidance with actionable resources." — Student, Batch 2024

"The roadmap visualizer made career planning so much clearer!" — Academic Advisor


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
 
## 📜 License
This project is licensed for educational purposes. For specific use or distribution rights, please consult the supervisors or project leads.

License Type: Educational Use
Institution: Bharat Institute of Engineering and Technology
Academic Year: 2024–2025

## PEDIASCAPE – Empowering students through unified academic and career support
