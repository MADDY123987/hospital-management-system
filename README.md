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
| | |
|---|---|
| **👨‍⚕️ Patient Management** | **🩺 Doctor Management** |
| ✅ Register new patients | ✅ Add doctors |
| ✅ View all patients | ✅ View doctor list |
| ✅ Admit patients to rooms | ✅ Assign doctors to patients |
| ✅ Discharge patients | |
| ✅ Automatic billing generation | |
| **🏥 Room Management** | **📅 Appointment System** |
| ✅ Add hospital rooms | ✅ Book doctor appointments |
| ✅ View available rooms | ✅ Track appointments |
| ✅ Assign rooms during admission | |
| **💰 Billing System** | |
| ✅ Generate patient bill during discharge | |
| ✅ Deduct patient deposit automatically | |

---

## 🏗️ System Architecture
| Layer | Technology | Platform |
|-------|-----------|----------|
| **Frontend** | React + Vite | Vercel |
| **Backend** | Spring Boot REST API | Render |
| **Database** | PostgreSQL | Neon Cloud |

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
| Method | Endpoint |
|--------|----------|
| `GET` | `/api/patients` |
| `POST` | `/api/patients` |
| `PUT` | `/api/patients/{patientId}/admit/{doctorId}/{roomId}` |
| `PUT` | `/api/patients/{patientId}/discharge` |
| `GET` | `/api/doctors` |
| `POST` | `/api/doctors` |
| `GET` | `/api/rooms` |
| `GET` | `/api/rooms/available` |
| `POST` | `/api/rooms` |
| `POST` | `/api/appointments` |

---

## 🗄️ Database Stored Procedures
PostgreSQL stored procedures handle critical hospital workflows at the database level. Instead of executing raw SQL from the application layer, the backend calls these procedures via Spring Data JPA's `@Procedure` annotation — ensuring better data consistency, encapsulated logic, and improved transaction handling.

| Procedure | Description |
|-----------|-------------|
| `sp_book_appointment` | Books a new appointment between a patient and doctor |
| `sp_admit_patient` | Admits a patient to a room and assigns a doctor |
| `sp_discharge_patient` | Discharges a patient and generates billing information |

---

## 🚀 Running Locally

### With Docker
```bash
git clone https://github.com/MADDY123987/hospital-management-system.git
cd hospital-management-system
docker compose up --build
# Backend → http://localhost:8085
```

### Without Docker
```bash
# Backend
cd Hospital-Mangement-System && mvn spring-boot:run

# Frontend
cd hospital-frontend && npm install && npm run dev
```

---

## 📊 Future Improvements
- [ ] Authentication (Spring Security + JWT)
- [ ] Role-based access (Admin / Doctor / Staff)
- [ ] Payment gateway integration
- [ ] Patient medical history tracking
- [ ] Dashboard analytics
