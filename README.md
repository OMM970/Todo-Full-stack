# 📝 Todo List Full-Stack Web Application

A full-stack Todo List web application that allows users to securely manage daily tasks with authentication, task status tracking, and priority handling. This project focuses on backend development using Spring Boot along with a simple and responsive frontend.

---

## 🚀 Features

- User registration and login with JWT-based authentication  
- Create, update, delete, and view tasks  
- Task status management (TODO, IN_PROGRESS, COMPLETED)  
- Task priority handling using enums  
- Secure access to user-specific tasks  
- Centralized exception handling  
- Responsive and user-friendly UI  

---

## 🛠️ Tech Stack

### Backend
- Java  
- Spring Boot  
- Spring Security  
- JWT Authentication  
- Hibernate & JPA  
- PostgreSQL  

### Frontend
- HTML  
- CSS  
- JavaScript  

### Tools
- Git & GitHub  
- IntelliJ IDEA  
- Postman  

---

## 📐 Architecture

The application follows a layered architecture:
- Controller Layer – Handles HTTP requests  
- Service Layer – Contains business logic and transactions  
- Repository Layer – Manages database operations  
- Security Layer – Handles authentication and authorization  

This structure ensures clean separation of concerns and maintainability.

---

## 🔐 Authentication Flow

1. User registers with email and password  
2. Password is encrypted before storage  
3. User logs in and receives a JWT token  
4. Token is required to access protected APIs  
5. Each request is validated for authorization  

---

## 📊 Task Management

- Tasks include:
  - Title and description  
  - Status (Enum)  
  - Priority (Enum)  
- Default task status is set during creation  
- Transactions ensure data consistency  

---

## 🗄️ Database

- PostgreSQL is used for persistent storage  
- Hibernate and JPA handle ORM mapping  
- Enums maintain structured task states  

---

## ▶️ How to Run

### Prerequisites
- Java 17+  
- PostgreSQL  
- Maven  

### Steps..

```bash
git clone https://github.com/OMM970/Todo-Full-stack.git
cd Todo-Full-stack
mvn spring-boot:run

