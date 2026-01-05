AI Resume Builder — Full-Stack AI Application

AI Resume Builder is a modern, full-stack web application that helps users create ATS-friendly, professional resumes using AI-powered content generation and real-time previews.
It combines a sleek frontend experience with a secure, scalable backend architecture.

This project demonstrates real-world full-stack engineering, clean UI/UX, authentication, and AI integration.



🧠 Key Highlights (Why This Project Matters)

End-to-end Full-Stack Architecture

JWT-based authentication with secure password hashing

AI-powered resume suggestions

Live resume preview with instant updates

Modular, scalable codebase

Production-ready deployment setup

🛠️ Tech Stack
Frontend

React (Vite)

Tailwind CSS

Redux Toolkit

Framer Motion (animations)

Backend

Node.js

Express.js

JWT Authentication

Docker (optional)

Database

MongoDB

AI Integration

Google Gemini API (for resume suggestions)

📁 Project Structure
ai-resume-builder/
│
├── frontend/        # React + Tailwind frontend
│├── src/
│└── vite.config.js
│
├── backend/         # Node.js + Express backend
│├── routes/
│├── controllers/
│└── docker-compose.yml
│
└── README.md

✨ Features
🔐 Secure Authentication

User registration & login

Password hashing with bcrypt

JWT-based session handling

📊 Dashboard

View, edit, and manage resumes

Resume version management

🎨 Resume Builder

Structured resume sections

Live editing experience

Clean, professional layouts

🤖 AI Assistance

Smart AI-generated resume suggestions

Improves content quality & clarity

👀 Live Preview

Real-time resume preview while editing

Optimized for print & PDF export

📄 Export

Download resumes in PDF format

⚙️ Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/Eshan-07/ai-resume-builder.git
cd ai-resume-builder

2️⃣ Environment Variables
Backend (backend/.env)
MONGODB_URI=your_mongodb_uri
PORT=5001
JWT_SECRET_KEY=your_secret_key
JWT_SECRET_EXPIRES_IN=1d
NODE_ENV=development
ALLOWED_SITE=http://localhost:5173

Frontend (frontend/.env.local)
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_APP_URL=http://localhost:5001/

🚀 Run Without Docker
Frontend
cd frontend
npm install
npm run dev

Backend
cd backend
npm install
npm run dev

🐳 Run With Docker (Optional)
cd backend
docker-compose up -d


Then start frontend normally.



🧩 What I Learned From This Project

Designing scalable frontend architecture

Managing global state with Redux Toolkit

Building secure authentication flows

Integrating AI APIs into production apps

Handling real-world UI/UX edge cases

Preparing apps for deployment & CI/CD
