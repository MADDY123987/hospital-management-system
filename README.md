# 🏥 Hospital Management System

A full-stack Hospital Management System that helps hospitals manage patients, doctors, rooms, appointments, admissions, and billing through a modern web interface.

---

## 🌐 Live Demo

| Service | URL |
|--------|-----|
| **Frontend** | [hospital-management-system-rust-zeta.vercel.app](https://hospital-management-system-rust-zeta.vercel.app) |
| **Backend API** | [hospital-backend-xd5h.onrender.com](https://hospital-backend-xd5h.onrender.com) |
| **Example Endpoint** | [/api/patients](https://hospital-backend-xd5h.onrender.com/api/patients) |

---

## ✨ Features

### 👨‍⚕️ Patient Management
- Register new patients
- View all patients
- Admit patients to rooms
- Discharge patients
- Automatic billing generation

### 🩺 Doctor Management
- Add doctors
- View doctor list
- Assign doctors to patients

### 🏥 Room Management
- Add hospital rooms
- View available rooms
- Assign rooms during patient admission

### 📅 Appointment System
- Book doctor appointments
- Track appointments

### 💰 Billing System
- Generate patient bill during discharge
- Deduct patient deposit automatically

---

## 🏗️ System Architecture

```
React + Vite (Frontend)
        │
        ▼
Spring Boot REST API (Backend)
        │
        ▼
 PostgreSQL Database (Neon Cloud)
```

| Layer | Platform |
|-------|----------|
| Frontend | Vercel |
| Backend | Render |
| Database | Neon Cloud (PostgreSQL) |

---

## ⚙️ Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Backend** | Java 21, Spring Boot, Spring Data JPA, Maven, Docker |
| **Frontend** | React, Vite, Axios, Tailwind CSS |
| **Database** | PostgreSQL (Neon Cloud) |
| **Deployment** | Render (Backend), Vercel (Frontend) |

---

## 🔗 API Endpoints

### Patients
```
GET  /api/patients
POST /api/patients
PUT  /api/patients/{patientId}/admit/{doctorId}/{roomId}
PUT  /api/patients/{patientId}/discharge
```

### Doctors
```
GET  /api/doctors
POST /api/doctors
```

### Rooms
```
GET  /api/rooms
GET  /api/rooms/available
POST /api/rooms
```

### Appointments
```
POST /api/appointments
```

---
## 🗄️ Database Stored Procedures

PostgreSQL stored procedures handle critical hospital workflows at the database level. Instead of executing raw SQL from the application layer, the backend calls these procedures via Spring Data JPA's `@Procedure` annotation — ensuring better data consistency, encapsulated logic, and improved transaction handling.

| Procedure | Description |
|-----------|-------------|
| `sp_book_appointment` | Books a new appointment between a patient and doctor |
| `sp_admit_patient` | Admits a patient to a room and assigns a doctor |
| `sp_discharge_patient` | Discharges a patient and generates billing information |

---
## 🐳 Running Locally (Docker)

**Clone the repository:**
```bash
git clone https://github.com/MADDY123987/hospital-management-system.git
cd hospital-management-system
```

**Start with Docker:**
```bash
docker compose up --build
```

> Backend will be available at `http://localhost:8085`

---

## 💻 Running Without Docker

**Backend:**
```bash
cd Hospital-Mangement-System
mvn spring-boot:run
```

**Frontend:**
```bash
cd hospital-frontend
npm install
npm run dev
```

---

## 📊 Future Improvements

- [ ] Authentication (Spring Security + JWT)
- [ ] Role-based access (Admin / Doctor / Staff)
- [ ] Payment gateway integration
- [ ] Patient medical history tracking
- [ ] Dashboard analytics
