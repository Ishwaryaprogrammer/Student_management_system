# 🎓 Student Management System

A full-stack web application to efficiently manage student records.
Built using **Node.js, Express.js, MongoDB, HTML, CSS, and JavaScript**, this system supports complete CRUD operations along with advanced features like search, sorting, pagination, CSV export, and dark mode.

---

## 🚀 Features

### 🔐 Authentication

* Admin login system
* Prevents unauthorized access

### ➕ Add Student

* Add new student records
* Validations:

  * All fields are required
  * Age must be greater than 0
  * Valid email format
  * Email must be unique

### 📋 View Students

* Displays all students in a structured table
* Clean and responsive UI using Bootstrap

### 🔍 Search

* Search students by name
* Case-insensitive filtering

### 🔄 Sorting

* Sort records by:

  * Name
  * Age

### 📄 Pagination

* Displays limited records per page
* Navigation using Next & Previous buttons

### ✏️ Update Student

* Edit existing student details
* Form auto-filled for easy updates

### ❌ Delete Student

* Delete student with confirmation prompt

### 🎯 Department Filter

* Filter students by department:

  * IT
  * CSE
  * ECE

### 📤 Export to CSV

* Download student data in CSV format

### 🌙 Dark Mode

* Toggle between light and dark themes

### 🔔 Notifications

* Toast messages for success and error feedback

---

## 🛠️ Tech Stack

### Frontend

* HTML
* CSS (Bootstrap 5)
* JavaScript (Fetch API)

### Backend

* Node.js
* Express.js

### Database

* MongoDB (Mongoose)

---

## 📂 Project Structure

```
project/
│
├── server.js
├── public/
│   ├── index.html
│   └── app.js
```

---

## ⚙️ Installation & Setup

### 1. Clone Repository

```
git clone https://github.com/your-username/student-management-system.git
cd student-management-system
```

### 2. Install Dependencies

```
npm install express mongoose
```

### 3. Start MongoDB

```
mongod
```

### 4. Run Server

```
node server.js
```

### 5. Open Application

```
http://localhost:3000
```

---

## 🔑 Login Credentials

```
Username: admin
Password: 1234
```

---

## 📡 API Endpoints

| Method | Endpoint          | Description       |
| ------ | ----------------- | ----------------- |
| POST   | /api/login        | Admin login       |
| GET    | /api/students     | Get all students  |
| GET    | /api/students/:id | Get student by ID |
| POST   | /api/students     | Create student    |
| PUT    | /api/students/:id | Update student    |
| DELETE | /api/students/:id | Delete student    |

---

## 🧠 Architecture & Design

* Follows **REST API principles**
* Backend structured using **OOP (Service Class)**
* Separation of concerns:

  * Model (Schema)
  * Service (Business Logic)
  * Routes (API Layer)

---

## ✅ Validations

* Required field validation
* Email format validation using regex
* Duplicate email prevention
* Age must be greater than zero

---

## 💡 Key Highlights

* Full CRUD functionality
* Clean and responsive UI
* Real-time updates without page reload
* Efficient data handling with pagination
* Export functionality for external usage

---

## 🚀 Future Enhancements

* JWT-based authentication
* Role-based access control
* Dashboard with analytics and charts
* Cloud deployment (Render / Railway)

---

## 👩‍💻 Author

**Ishwarya S**
B.E. Computer Science Engineering

---

## 📜 License

This project is developed for educational and learning purposes.
