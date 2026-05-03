# One Million - Checkbox & Authentication System

A complete web application project combining a **real-time checkbox management system** with a **secure OAuth/OIDC authentication server**.

## 📋 Project Overview

This repository contains two integrated applications:

1. **Checkbox App** - A real-time checkbox management interface with live synchronization
2. **OIDC Auth Server** - A secure authentication server handling OAuth 2.0 and OIDC protocols

Both applications work together to provide a secure, real-time collaborative experience.

---

## Project Structure

```
One Million/
├── checkbox/          # Real-time checkbox application
├── oidcAuth/          # OAuth/OIDC authentication server
└── Readme.md          # This file
```

---

## 🎯 Checkbox Application

### What is it?
A Node.js-based web application that allows users to manage checkboxes in real-time with live updates across multiple connections using WebSockets.

### Key Features
- ✅ Real-time checkbox synchronization
- 🔄 WebSocket support via Socket.IO
- ⚡ Redis integration for data caching
- 🌐 Express.js REST API
- 📱 Responsive HTML/CSS frontend

### Technology Stack
- **Runtime**: Node.js
- **Framework**: Express.js v5.2.1
- **Real-time Communication**: Socket.IO v4.8.3
- **Cache/Database**: Redis (ioredis v5.10.1)
- **Configuration**: dotenv v17.4.2

### Setup Instructions

#### Step 1: Navigate to checkbox folder
```bash
cd checkbox
```

#### Step 2: Install dependencies
```bash
npm install
```

#### Step 3: Configure environment
Copy the sample environment file and update it:
```bash
cp env.sample .env
```

Edit `.env` file:
```
PORT=3000
```

#### Step 4: Start the application
- **Development mode** (with auto-reload):
  ```bash
  npm run dev
  ```

- **Production mode**:
  ```bash
  npm start
  ```

#### Step 5: Access the application
Open your browser and go to:
```
http://localhost:3000
```

### How it Works
- Users can click on checkboxes in the web interface
- Changes are instantly synchronized across all connected users
- Redis stores the checkbox states for persistence
- Socket.IO ensures real-time communication between client and server

---

## 🔐 OIDC Authentication Server

### What is it?
A TypeScript-based authentication server that implements OAuth 2.0 and OpenID Connect (OIDC) protocols. It securely manages user authentication and issues tokens for protected resources.

### Key Features
- 🔐 OAuth 2.0 & OIDC protocol support
- 🗄️ PostgreSQL database with Drizzle ORM
- 🔒 JWT token generation
- 🔑 RSA key pair management for token signing
- 📝 User credential management with bcrypt hashing
- ✔️ Input validation with Zod

### Technology Stack
- **Language**: TypeScript
- **Runtime**: Node.js
- **Framework**: Express.js v5.2.1
- **Database**: PostgreSQL with Drizzle ORM v0.45.2
- **Security**: bcryptjs v3.0.3, node-jose v2.2.0
- **Validation**: Zod v4.4.1
- **Development**: TypeScript Watch (tsc-watch)

### Database
- **ORM**: Drizzle ORM (manages schema and migrations)
- **Database**: PostgreSQL
- **Migration Tool**: Drizzle Kit

### Setup Instructions

#### Step 1: Navigate to oidcAuth folder
```bash
cd oidcAuth
```

#### Step 2: Install dependencies
```bash
npm install
```

#### Step 3: Generate RSA Keys
Generate public and private keys for JWT signing:
```bash
bash key.gen.sh
```
This creates keys in the `cert/` directory used for token encryption.

#### Step 4: Configure environment
Create `.env` file from the sample:
```bash
cp env.sample .env
```

Add your database and configuration settings:
```
DATABASE_URL=postgresql://user:password@localhost:5432/oidcdb
```

#### Step 5: Setup Database

- **Generate migrations**:
  ```bash
  npm run db:generate
  ```

- **Apply migrations**:
  ```bash
  npm run db:migrate
  ```

- **View database** (optional - opens Drizzle Studio):
  ```bash
  npm run db:studio
  ```

#### Step 6: Start the authentication server

- **Development mode**:
  ```bash
  npm run dev
  ```

- **Production mode** (requires build):
  ```bash
  npm run build
  npm start
  ```

### API Endpoints

The server provides OAuth/OIDC endpoints:

- **OAuth Routes**: `GET /api/oauth/*`
- **OIDC Routes**: `GET /api/oidc/*`
- **Health Check**: `GET /health`

---

## 🚀 Running Both Applications

### Option 1: Separate Terminals

**Terminal 1 - Start Authentication Server:**
```bash
cd oidcAuth
npm run dev
```

**Terminal 2 - Start Checkbox App:**
```bash
cd checkbox
npm run dev
```

### Option 2: Using Docker Compose

The `oidcAuth` folder includes a `docker-compose.yml` for easy PostgreSQL setup:

```bash
cd oidcAuth
docker-compose up -d
```

This starts PostgreSQL on your system.

---

## 📝 Environment Configuration

### Checkbox App (`.env`)
```
PORT=3000
```

### OIDC Auth Server (`.env`)
```
DATABASE_URL=postgresql://username:password@localhost:5432/oidcdb
```

---

## 🔗 Integration Between Applications

1. **Authentication Flow**:
   - Users authenticate through the OIDC Auth Server
   - Server issues JWT tokens

2. **Protected Resources**:
   - Checkbox app can verify tokens from OIDC server
   - Only authenticated users can access checkbox features

3. **Real-time Collaboration**:
   - Multiple authenticated users see live checkbox updates
   - Socket.IO maintains persistent connections

---

## Dependencies Summary

### Checkbox App
- Express.js - Web server
- Socket.IO - Real-time WebSocket communication
- ioredis - Redis client for caching
- dotenv - Environment variable management

### OIDC Auth Server
- Express.js - Web server
- Drizzle ORM - Database management
- PostgreSQL - Database
- bcryptjs - Password hashing
- node-jose - JWT/JWS operations
- Zod - Schema validation

---

## Development Commands

### Checkbox
```bash
npm run dev       # Development with auto-reload
npm start         # Production start
```

### OIDC Auth Server
```bash
npm run dev              # Development with TypeScript watch
npm run build            # Compile TypeScript to JavaScript
npm start                # Production start
npm run db:generate      # Create database migrations
npm run db:migrate       # Apply database migrations
npm run db:studio        # Open Drizzle Studio
```
