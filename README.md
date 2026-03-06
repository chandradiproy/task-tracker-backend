# Task Tracker API

A secure, scalable RESTful API built with **Node.js, Express, TypeScript, and Prisma ORM**.  
This project implements **User Authentication**, **Role-Based Access Control (RBAC)**, and **Task Management**, strictly fulfilling the requirements of the Backend Hiring Assignment.

---

## 🚀 Tech Stack

- **Node.js & Express** – Core web framework  
- **TypeScript** – Static typing for robust code  
- **Prisma ORM & SQLite** – Type-safe database management (can be swapped to PostgreSQL easily)  
- **Zod** – Schema-based request validation  
- **Bcrypt & JWT** – Password hashing and stateless authentication  
- **Jest & Supertest** – Unit and integration testing  

---

## 🛠️ Setup Instructions

### 1. Prerequisites

Ensure you have the following installed:

- **Node.js (v18+)**
- **npm**

---

### 2. Install Dependencies

Clone the repository and install the required packages:

```bash
npm install
````

---

### 3. Environment Variables

Copy the example environment file and create your `.env` file:

```bash
cp .env.example .env
```

Ensure your `.env` file contains:

* `JWT_SECRET`
* `PORT`

---

### 4. Initialize Database

Push the Prisma schema to create the SQLite database file (`dev.db`):

```bash
npm run db:push
```

---

## 🏃 Running the Server

### Development Mode (Hot Reloading)

```bash
npm run dev
```

Server will start at:

```
http://localhost:3000
```

---

### Production Mode

```bash
npm run build
npm start
```

---

## 🧪 Running Tests

The project includes both **Unit Tests** and **API/Integration Tests**.

### Run Unit Tests

```bash
npm test
```

### Run API / Integration Tests

```bash
npm run test:api
```

---

## 🌐 Sample API Requests

### 1. Register a User

**POST** `/auth/register`

```json
{
  "email": "johndoe@example.com",
  "password": "strongPassword123"
}
```

---

### 2. Login

**POST** `/auth/login`

```json
{
  "email": "johndoe@example.com",
  "password": "strongPassword123"
}
```

Save the returned **JWT token** from the response.

---

### 3. Create a Task (Requires Authentication)

**POST** `/tasks`

Headers:

```
Authorization: Bearer <YOUR_JWT_TOKEN>
Content-Type: application/json
```

Body:

```json
{
  "title": "Complete Backend Assignment",
  "description": "Write code, test, and write README",
  "status": "pending"
}
```

---

### 4. View Own Profile

**GET** `/users/me`

Headers:

```
Authorization: Bearer <YOUR_JWT_TOKEN>
```