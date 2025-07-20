## 🏆 Leaderboard App

A full-stack leaderboard application where users can be listed, ranked based on points, and managed (added/updated/deleted). The app is built using **Node.js**, **Express**, **MongoDB**, and **React**, styled with **Tailwind CSS**.

---

### 🚀 Features

- Display users with **real-time ranks** based on points
- Add new users
- Claim points for users
- Auto-update ranks on claiming points
- Delete users (with confirmation)
- Responsive UI with **Tailwind CSS**
- Routing using **React Router**
- Footer and Navbar components

---

### 💠 Tech Stack

**Frontend:**

- React.js
- React Router
- Tailwind CSS
- Axios

**Backend:**

- Node.js
- Express.js
- MongoDB
- Mongoose
- CORS & dotenv

---

### 📁 Folder Structure

```
root/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── app.js
│   └── .env
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── App.jsx
│   └── main.jsx
└── README.md
```

---

### ⚙️ Setup Instructions

#### 1. Clone the repo

```bash
git clone https://github.com/your-username/leaderboard-app.git
cd leaderboard-project
```

#### 2. Setup backend

```bash
cd backend
npm install
```

- Create a `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

- Run backend server:

```bash
nodemon app.js
```

#### 3. Setup frontend

```bash
cd ../frontend
npm install
npm run dev
```

---

### 🌐 API Endpoints

| Method | Endpoint               | Description           |
| ------ | ---------------------- | --------------------- |
| GET    | /api/users             | Get all users         |
| POST   | /api/users             | Add a new user        |
| PUT    | /api/users/\:id/points | Claim points for user |
| DELETE | /api/users/\:id        | Delete a user         |

---

### 📸 Screenshots

<p align="center">
  <img src="./frontend/Screenshots/Screenshot 2025-07-20 115408.png" alt="Leaderboard UI" width="500"/>
</p>

---

### 📬 Feedback

If you have any feedback or suggestions, feel free to reach out!

---

