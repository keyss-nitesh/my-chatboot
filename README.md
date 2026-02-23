# Nitesh's AI Chatbot - Full Stack Project

A complete full-stack AI chatbot application with React frontend, Node.js/Express backend, and MySQL database.

## 🚀 Features

- **User Authentication** - Register, Login, JWT-based auth
- **Real-time Chat** - Interactive chatbot with smart responses
- **Database Storage** - All conversations and messages stored in MySQL
- **Responsive Design** - Works on desktop, tablet, and mobile
- **2-3 Second Response Delay** - Realistic typing experience
- **Protected Routes** - Authenticated-only chat access
- **Beautiful UI** - Modern gradient design with animations

## 📁 Project Structure

```
chatboot1/
├── backend/               # Node.js + Express Backend
│   ├── config/           # Database configuration
│   ├── controllers/      # Route controllers
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── middleware/      # Auth middleware
│   ├── utils/           # Utility functions
│   └── server.js        # Main server file
│
├── src/                 # React Frontend
│   ├── api/            # API services
│   ├── components/     # React components
│   ├── context/        # React context (Auth)
│   ├── App.jsx         # Landing page
│   ├── ChatBot.jsx     # Chat interface
│   └── main.jsx        # Entry point
│
└── README.md
```

## 🛠️ Tech Stack

### Frontend
- React 18
- React Router v6
- Axios
- Vite

### Backend
- Node.js
- Express.js
- MySQL2
- JWT (jsonwebtoken)
- Bcrypt.js
- CORS

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14+)
- MySQL (v5.7+)
- npm or yarn

### Step 1: Install Backend Dependencies

```bash
cd backend
npm install
```

### Step 2: Configure Environment Variables

Update `backend/.env` with your MySQL credentials:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=chatbot_db
DB_PORT=3306

PORT=5000
JWT_SECRET=your_secret_key_here
FRONTEND_URL=http://localhost:5173
```

### Step 3: Initialize Database

```bash
cd backend
npm run init-db
```

This will create the database and all required tables.

### Step 4: Install Frontend Dependencies

```bash
cd ..
npm install
```

### Step 5: Start Backend Server

```bash
cd backend
npm run dev
```

Backend will run on: `http://localhost:5000`

### Step 6: Start Frontend (New Terminal)

```bash
npm run dev
```

Frontend will run on: `http://localhost:5173`

## 🎯 How to Use

1. Open `http://localhost:5173` in your browser
2. Click "Start Chatting with AI"
3. Register a new account or login
4. Start chatting with the AI bot!

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile

### Chat
- `POST /api/chat/message` - Send message & get bot response
- `GET /api/chat/conversations` - Get all conversations
- `GET /api/chat/messages/:conversationId` - Get conversation messages
- `DELETE /api/chat/conversation/:conversationId` - Delete conversation

## 💾 Database Schema

### Users
- id, name, email, password, avatar, created_at, updated_at

### Conversations
- id, user_id, title, created_at, updated_at

### Messages
- id, conversation_id, user_id, sender_type, message_text, created_at

## 🎨 Features Implemented

✅ Full-stack architecture with proper folder structure
✅ MySQL database with relationships
✅ JWT authentication
✅ Password hashing with bcrypt
✅ Protected API routes
✅ Input validation
✅ Error handling
✅ CORS enabled
✅ Responsive design (mobile + desktop)
✅ 2-3 second bot response delay
✅ Smart bot responses
✅ User registration & login
✅ Conversation history
✅ Modern UI with animations

## 📱 Mobile App (Coming Soon)

React Native mobile app with same features will be added next!

## 🔐 Security Features

- Password hashing
- JWT token authentication
- Protected routes
- Input validation
- SQL injection prevention
- CORS configuration

## 👨‍💻 Developer

Created by **Nitesh** - Passionate about AI and Full-Stack Development

## 📝 License

ISC

---

Made with ❤️ by Nitesh
