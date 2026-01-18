🌍 Real-Time Environmental Monitoring and Alert Dashboard
📌 Overview

This project is a real-time environmental monitoring dashboard that simulates IoT sensor data and detects anomalies in environmental metrics such as temperature, humidity, and air quality. The system processes live sensor streams, stores time-series data efficiently, analyzes anomalies using AI, and notifies users through real-time alerts and email notifications.

The application demonstrates real-time systems, event-driven architecture, time-series data handling, and AI integration, making it suitable for IoT monitoring and smart environment use cases.

🚀 Features

🔄 Real-time sensor data streaming using Socket.IO

📊 Live data visualization with React and Recharts

🧠 AI-based anomaly explanation using Google Gemini

⚠️ Threshold-based anomaly detection

📩 Email alert notifications using Nodemailer

🗂️ Time-series data storage using MongoDB (Atlas)

🐳 Dockerized setup using Docker & Docker Compose

🎥 Sensor simulation script to mimic IoT devices

🏗️ Tech Stack
Frontend

React (Vite)

Tailwind CSS

Recharts

Socket.IO Client

Backend

Node.js

Express.js

Socket.IO

MongoDB (Time-Series Collections)

Google Gemini API

Nodemailer

DevOps / Tools

Docker

Docker Compose

MongoDB Atlas

🧩 System Architecture
Sensor Simulator
      ↓ (Socket.IO)
Backend Server
      ↓
MongoDB (Time-Series)
      ↓
Threshold + AI Analysis
      ↓
Real-time Alert (Socket.IO) + Email Notification
      ↓
React Dashboard

📁 Project Structure
env-monitoring-dashboard/
│
├── backend/
│   ├── src/
│   │   ├── config/          # DB & Gemini config
│   │   ├── models/          # Mongoose schemas
│   │   ├── services/        # Anomaly & alert logic
│   │   ├── socket/          # Socket.IO handlers
│   │   └── index.js         # Backend entry point
│   ├── Dockerfile
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/      # UI components
│   │   ├── services/        # Socket connection
│   │   └── App.jsx
│   ├── Dockerfile
│   └── package.json
│
├── sensor-simulator/
│   └── simulateSensors.js   # IoT sensor simulation
│
├── docker-compose.yml
└── README.md

📊 MongoDB Time-Series Design

Database: env-monitoring

Collection: sensor_data (Time-Series)

timeField: timestamp

metaField: sensorType

Sample Document
{
  "sensorType": "temperature",
  "value": 36.5,
  "unit": "°C",
  "timestamp": "2026-01-18T18:30:00Z"
}

⚙️ Environment Variables (backend/.env)
PORT=5000

# MongoDB Atlas
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/env-monitoring

# Gemini AI
GEMINI_API_KEY=your_gemini_api_key

# Email (Nodemailer)
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_SECURE=false
MAIL_USER=your_email@gmail.com
MAIL_PASS=your_app_password

FROM_EMAIL=your_email@gmail.com
FROM_NAME=Env Monitoring System
ALERT_EMAIL=your_email@gmail.com


⚠️ .env is ignored via .gitignore and should never be committed.

▶️ Running the Project (Manual)
1️⃣ Start Backend
cd backend
npm install
npm run start

2️⃣ Start Frontend
cd frontend
npm install
npm run dev


Open: http://localhost:3000

3️⃣ Run Sensor Simulator
cd sensor-simulator
npm install
node simulateSensors.js

🐳 Running with Docker
1️⃣ Build and run containers
docker compose up --build

2️⃣ Run sensor simulator (outside Docker)
cd sensor-simulator
node simulateSensors.js

📡 Real-Time Alerts

Alerts are pushed to the frontend using Socket.IO

No REST polling is used

Email alerts are sent using Nodemailer

AI explanations are generated using Google Gemini

Fallback logic ensures alerts still work if AI API fails

🧠 Design Decisions

Socket.IO over REST for alerts to ensure real-time updates

MongoDB Time-Series collections for efficient historical queries

AI fallback handling to prevent system crashes

Docker Compose for one-command setup

📌 Future Enhancements

User authentication and multi-user dashboards

SMS alerts integration

Alert severity levels

Historical analytics dashboard

Deployment on cloud platforms

👨‍💻 Author

Mohammad Aamir
Final Year B.Tech Student
MERN Stack Developer