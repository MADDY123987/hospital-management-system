🏥 Hospital Management System

A full-stack Hospital Management System that allows hospitals to manage patients, doctors, rooms, appointments, admissions, and billing through a modern web interface.

The system is built using Spring Boot (backend) and React + Vite (frontend) with PostgreSQL as the database and deployed using Render and Vercel.

⸻

🌐 Live Demo

Frontend
👉 https://hospital-management-system-rust-zeta.vercel.app

Backend API
👉 https://hospital-backend-xd5h.onrender.com

Example API Endpoint
👉 https://hospital-backend-xd5h.onrender.com/api/patients

⸻

🧠 Features

Patient Management
	•	Register new patients
	•	View all patients
	•	Admit and discharge patients
	•	Generate billing during discharge

Doctor Management
	•	Add doctors
	•	View available doctors

Room Management
	•	Add hospital rooms
	•	View room availability
	•	Assign rooms during admission

Appointment System
	•	Book appointments with doctors
	•	Automatic appointment tracking

Billing System
	•	Calculate patient billing
	•	Deduct deposit and generate final bill

⸻

🏗️ System Architecture

Frontend
React + Vite

Backend
Spring Boot REST API

Database
PostgreSQL (Neon Cloud DB)

Deployment
Frontend → Vercel
Backend → Render

⸻

⚙️ Tech Stack

Backend
	•	Java 21
	•	Spring Boot
	•	Spring Data JPA
	•	REST API
	•	Maven
	•	Docker

Frontend
	•	React
	•	Vite
	•	Axios
	•	Tailwind CSS

Database
	•	PostgreSQL (Neon)

Deployment
	•	Render (Backend)
	•	Vercel (Frontend)

⸻

📁 Project Structure

hospital-management-system
│
├── Hospital-Mangement-System   # Spring Boot Backend
│   ├── Controller
│   ├── Service
│   ├── Model
│   ├── DTO
│   └── Config
│
├── hospital-frontend           # React Frontend
│   ├── components
│   ├── pages
│   └── config.js
│
└── docker-compose.yml


⸻

🔗 API Endpoints

Patients

GET    /api/patients
POST   /api/patients
PUT    /api/patients/{patientId}/admit/{doctorId}/{roomId}
PUT    /api/patients/{patientId}/discharge

Doctors

GET  /api/doctors
POST /api/doctors

Rooms

GET  /api/rooms
GET  /api/rooms/available
POST /api/rooms

Appointments

POST /api/appointments


⸻

🐳 Running Locally (Docker)

Clone the repository

git clone https://github.com/MADDY123987/hospital-management-system.git
cd hospital-management-system

Run using Docker

docker compose up --build

Backend will run on

http://localhost:8085


⸻

💻 Running Without Docker

Backend

cd Hospital-Mangement-System
mvn spring-boot:run

Frontend

cd hospital-frontend
npm install
npm run dev


⸻

📊 Future Improvements
	•	Authentication (Spring Security + JWT)
	•	Role based access (Admin / Doctor / Staff)
	•	Payment gateway integration
	•	Patient medical history tracking
	•	Dashboard analytics

⸻

👨‍💻 Author

Madhavan R
B.Tech CSE – VIT Vellore

GitHub
https://github.com/MADDY123987

LinkedIn
https://linkedin.com/in/madhavan-r
