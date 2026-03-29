# Timur Karimov Resource Library API

A RESTful API for managing events, built with **Express**, **TypeScript**, and **Firebase Admin SDK (Firestore)**.

---

## Project Overview

This API provides full CRUD functionality for an event management system. It is secured with Helmet HTTP headers and environment-aware CORS, documented with Swagger UI and Redocly, and validated with Joi on all incoming requests.

**Stack:**
- Runtime: Node.js + TypeScript
- Framework: Express
- Database: Cloud Firestore (Firebase Admin SDK)
- Documentation: Swagger UI (swagger-jsdoc + swagger-ui-express), Redocly
- Validation: Joi
- Security: Helmet, cors

---

## Installation

### Prerequisites

- Node.js v18+
- A Firebase project with Firestore enabled (Native mode)
- A Firebase Admin SDK service account

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/TimurKarimovRRC/Back_end_Development_5_Assignment.git
cd Back_end_Development_5_Assignment

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env
# Edit .env and fill in your Firebase credentials and port
```

### Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```env
# Server
PORT=3001
NODE_ENV=development

# CORS — comma-separated list of allowed origins (production only)
CORS_ALLOWED_ORIGINS=https://your-frontend-domain.com

# Firebase Admin SDK
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
```

> The `FIREBASE_PRIVATE_KEY` must have literal `\n` in the `.env` file. The app replaces them with real newlines at startup.

---

## Running the Server

```bash
# Development (ts-node-dev with auto-reload)
npm run dev

# Production (compile then run)
npm run build
npm start
```

The server starts on the port defined in `PORT` (default: `3001`).

---

## API Documentation

| Environment | URL |
|---|---|
| Local | http://localhost:3001/api-docs |
| Public | https://timurkarimovrrc.github.io/Back_end_Development_5_Assignment/ |

---

## API Examples

### 1. Create an Event

**Request**
```http
POST /api/v1/events
Content-Type: application/json

{
  "name": "Spring Tech Meetup",
  "date": "2026-04-15T18:00:00.000Z",
  "capacity": 100,
  "status": "active",
  "category": "meetup"
}
```

**Response `201 Created`**
```json
{
  "message": "Event created successfully",
  "data": {
    "id": "oCalLqGjifnuNmhnEqVJ",
    "name": "Spring Tech Meetup",
    "date": "2026-04-15T18:00:00.000Z",
    "capacity": 100,
    "registrationCount": 0,
    "status": "active",
    "category": "meetup",
    "createdAt": "2026-03-29T06:14:11.341Z",
    "updatedAt": "2026-03-29T06:14:11.341Z"
  }
}
```

---

### 2. Get All Events

**Request**
```http
GET /api/v1/events
```

**Response `200 OK`**
```json
{
  "message": "Events retrieved successfully",
  "data": [
    {
      "id": "oCalLqGjifnuNmhnEqVJ",
      "name": "Spring Tech Meetup",
      "date": "2026-04-15T18:00:00.000Z",
      "capacity": 100,
      "registrationCount": 0,
      "status": "active",
      "category": "meetup",
      "createdAt": "2026-03-29T06:14:11.341Z",
      "updatedAt": "2026-03-29T06:14:11.341Z"
    }
  ]
}
```

---

### 3. Get Event by ID

**Request**
```http
GET /api/v1/events/oCalLqGjifnuNmhnEqVJ
```

**Response `200 OK`**
```json
{
  "message": "Event retrieved successfully",
  "data": {
    "id": "oCalLqGjifnuNmhnEqVJ",
    "name": "Spring Tech Meetup",
    "date": "2026-04-15T18:00:00.000Z",
    "capacity": 100,
    "registrationCount": 0,
    "status": "active",
    "category": "meetup",
    "createdAt": "2026-03-29T06:14:11.341Z",
    "updatedAt": "2026-03-29T06:14:11.341Z"
  }
}
```

**Response `404 Not Found`**
```json
{
  "error": "Event not found"
}
```

---

### 4. Update an Event

**Request**
```http
PUT /api/v1/events/oCalLqGjifnuNmhnEqVJ
Content-Type: application/json

{
  "name": "Spring Tech Meetup Updated",
  "capacity": 150,
  "status": "active",
  "category": "workshop"
}
```

**Response `200 OK`**
```json
{
  "message": "Event updated successfully",
  "data": {
    "id": "oCalLqGjifnuNmhnEqVJ",
    "name": "Spring Tech Meetup Updated",
    "date": "2026-04-15T18:00:00.000Z",
    "capacity": 150,
    "registrationCount": 0,
    "status": "active",
    "category": "workshop",
    "createdAt": "2026-03-29T06:14:11.341Z",
    "updatedAt": "2026-03-29T06:20:00.000Z"
  }
}
```

---

### 5. Delete an Event

**Request**
```http
DELETE /api/v1/events/oCalLqGjifnuNmhnEqVJ
```

**Response `200 OK`**
```json
{
  "message": "Event deleted successfully"
}
```

---

## Security

See [SECURITY.md](./SECURITY.md) for details on Helmet and CORS configuration.
