# Realtime Chat App (WhatsApp-style)

A full-stack realtime web chat application with:
- **Frontend:** React + Vite
- **Backend:** Java 17 + Spring Boot + WebSocket (STOMP/SockJS)
- **Database:** PostgreSQL

## Features
- Join chat with a username
- Send/receive messages in realtime
- Persist messages to PostgreSQL
- Load recent message history on startup

## Project structure
- `frontend/` React app
- `backend/` Spring Boot API + WebSocket server
- `docker-compose.yml` PostgreSQL service

## Prerequisites
- Java 17+
- Maven 3.9+
- Node.js 18+
- Docker (for PostgreSQL)

## Run locally

### 1) Start PostgreSQL
```bash
docker compose up -d
```

### 2) Run backend
```bash
cd backend
mvn spring-boot:run
```
Backend runs at `http://localhost:8080`

### 3) Run frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend runs at `http://localhost:5173`

> Optional: configure API base URL with `VITE_API_URL` in `frontend/.env`.

## API / WebSocket
- REST history: `GET /api/messages`
- WebSocket endpoint: `/ws` (SockJS)
- STOMP send destination: `/app/chat.send`
- STOMP subscribe destination: `/topic/public`
