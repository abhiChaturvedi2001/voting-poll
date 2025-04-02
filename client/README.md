# Voting App - Local Setup Guide

## 🛠️ Prerequisites
Make sure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

## 🚀 Getting Started

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-username/voting-app.git
cd voting-app
```

### 2️⃣ Install Dependencies
Navigate to the **client** and **server** directories and install dependencies.

#### Frontend (React + Vite)
```sh
cd client
npm install  # or yarn install
```

#### Backend (Node.js + Express)
```sh
cd ../server
npm install  # or yarn install
```

### 3️⃣ Setup Environment Variables
Create a `.env` file in both the `server` directories.

#### Client (`client/.env`)
```env
VITE_API_URL=http://localhost:5000/api
```

#### Server (`server/.env`)
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 4️⃣ Start the Development Servers

#### Start Frontend (Vite)
```sh
cd client
npm run dev  # or yarn dev
```

#### Start Backend (Express.js)
```sh
cd ../server
npm start  # or yarn start
```

### 5️⃣ Access the App
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:4040/`


## 🛠️ Common Issues & Fixes
**Issue: `@vitejs/plugin-react` not found**
- Run `npm install @vitejs/plugin-react --save-dev`

  ```

## 🤝 Contributing
Feel free to fork the repo, create a branch, and submit a PR!

## 📜 License
This project is licensed under the MIT License.

