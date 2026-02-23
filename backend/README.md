# Chatbot Backend API

Node.js + Express + MySQL backend for the AI Chatbot application.

## Prerequisites

- Node.js (v14 or higher)
- MySQL (v5.7 or higher)
- npm or yarn

## Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
   - Copy `.env` file and update with your MySQL credentials
   - Update `DB_USER`, `DB_PASSWORD`, and other settings

3. Initialize database:
```bash
npm run init-db
```

This will create the database and all required tables.

## Running the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

Server will run on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (requires auth)

### Chat
- `POST /api/chat/message` - Send message and get bot response (requires auth)
- `GET /api/chat/conversations` - Get all conversations (requires auth)
- `GET /api/chat/messages/:conversationId` - Get messages for a conversation (requires auth)
- `DELETE /api/chat/conversation/:conversationId` - Delete conversation (requires auth)

### Health Check
- `GET /health` - Check server status

## Database Schema

### Users Table
- id (PRIMARY KEY)
- name
- email (UNIQUE)
- password (hashed)
- avatar
- created_at
- updated_at

### Conversations Table
- id (PRIMARY KEY)
- user_id (FOREIGN KEY)
- title
- created_at
- updated_at

### Messages Table
- id (PRIMARY KEY)
- conversation_id (FOREIGN KEY)
- user_id (FOREIGN KEY)
- sender_type (user/bot)
- message_text
- created_at

## Features

- JWT authentication
- Password hashing with bcrypt
- Input validation
- CORS enabled
- Error handling
- Request logging
- Smart bot responses
