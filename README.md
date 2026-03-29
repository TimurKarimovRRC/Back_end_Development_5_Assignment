# Timur Karimov Resource Library API

## Project Overview

The Timur Karimov Resource Library API is a REST API built with Node.js, Express, TypeScript, Joi validation, and Firebase Firestore. The purpose of this project is to provide endpoints for managing event records in a clear and structured way.

For this assignment, I improved the project by focusing on two main areas: API documentation and secure configuration. I added OpenAPI documentation with Swagger UI, Joi validation, environment variable support with dotenv, and custom Helmet and CORS settings. My goal was to make the project easier to understand, easier to test, and more professional overall.

---

## Features

- REST API built with Express and TypeScript
- Firebase Firestore database integration
- Joi validation for request bodies and route parameters
- Local Swagger UI documentation
- Public API documentation through GitHub Pages
- Custom Helmet security headers
- Custom CORS configuration
- Environment variable support with dotenv

---

## Technologies Used

- Node.js
- Express
- TypeScript
- Firebase Admin SDK
- Firestore
- Joi
- Swagger JSDoc
- Swagger UI Express
- Helmet
- CORS
- Dotenv

---

## Installation Instructions

### Prerequisites

Before running the project, make sure you have:

- Node.js 20 or newer
- npm
- A Firebase project with Firestore enabled

### Clone the project

```bash
git clone <YOUR_REPOSITORY_URL>
cd Back_end_Development_5_Assignment
```

### Install dependencies

```bash
npm install
```

### Environment Variables

Create a `.env` file in the project root using `.env.example` as a guide.

Example `.env.example`:

```env
NODE_ENV=development
PORT=3001
CORS_ALLOWED_ORIGINS=http://localhost:3001,http://127.0.0.1:5500
SWAGGER_SERVER_URL=http://localhost:3001
```

If you are using a Firebase service account JSON file for local development, keep it local only and make sure it stays in `.gitignore`.

### Start the server

```bash
npm run dev
```

### Build and run the compiled project

```bash
npm run build
npm start
```

---

## Local Documentation Access

When the server is running locally, the Swagger UI documentation is available at:

```text
http://localhost:3001/api-docs
```

---

## Public Documentation

The public API documentation is available through GitHub Pages at:

```text
https://timurkarimovrrc.github.io/Back_end_Development_5_Assignment/
```

If the final deployed URL changes, this link should be updated before submission.

---

## API Request Examples

### 1. Health Check

**Request**

```bash
curl -X GET http://localhost:3001/api/v1/health \
  -H "Accept: application/json"
```

**Response (200 OK)**

```json
{
  "status": "ok",
  "uptime": 123.456,
  "timestamp": "2026-03-29T01:00:00.000Z",
  "version": "v1"
}
```

---

### 2. Get All Events

**Request**

```bash
curl -X GET http://localhost:3001/api/v1/events \
  -H "Accept: application/json"
```

**Response (200 OK)**

```json
{
  "message": "Events retrieved successfully",
  "data": [
    {
      "id": "67fa0f5c2f7d4f7f8d07c123",
      "title": "Spring Tech Meetup",
      "description": "Community meetup for developers and students",
      "eventDate": "2026-04-15T18:00:00.000Z",
      "location": "Winnipeg Innovation Centre"
    }
  ]
}
```

---

### 3. Create Event

**Request**

```bash
curl -X POST http://localhost:3001/api/v1/events \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Tech Meetup",
    "description": "Community meetup for developers and students",
    "eventDate": "2026-12-01T10:00:00.000Z",
    "location": "Winnipeg"
  }'
```

**Response (201 Created)**

```json
{
  "message": "Event created successfully",
  "data": {
    "id": "67fa0f5c2f7d4f7f8d07c123",
    "title": "Tech Meetup",
    "description": "Community meetup for developers and students",
    "eventDate": "2026-12-01T10:00:00.000Z",
    "location": "Winnipeg"
  }
}
```

---

### 4. Get Event by ID

**Request**

```bash
curl -X GET http://localhost:3001/api/v1/events/67fa0f5c2f7d4f7f8d07c123 \
  -H "Accept: application/json"
```

**Response (200 OK)**

```json
{
  "message": "Event retrieved successfully",
  "data": {
    "id": "67fa0f5c2f7d4f7f8d07c123",
    "title": "Tech Meetup",
    "description": "Community meetup for developers and students",
    "eventDate": "2026-12-01T10:00:00.000Z",
    "location": "Winnipeg"
  }
}
```

---

### 5. Update Event

**Request**

```bash
curl -X PUT http://localhost:3001/api/v1/events/67fa0f5c2f7d4f7f8d07c123 \
  -H "Content-Type: application/json" \
  -d '{
    "location": "RRC Polytech Exchange District Campus"
  }'
```

**Response (200 OK)**

```json
{
  "message": "Event updated successfully",
  "data": {
    "id": "67fa0f5c2f7d4f7f8d07c123",
    "title": "Tech Meetup",
    "description": "Community meetup for developers and students",
    "eventDate": "2026-12-01T10:00:00.000Z",
    "location": "RRC Polytech Exchange District Campus"
  }
}
```

---

### 6. Delete Event

**Request**

```bash
curl -X DELETE http://localhost:3001/api/v1/events/67fa0f5c2f7d4f7f8d07c123 \
  -H "Accept: application/json"
```

**Response (200 OK)**

```json
{
  "message": "Event deleted successfully"
}
```

---

## Validation Behavior

This API uses Joi validation middleware for request body and route parameter validation. If validation fails, the API returns a `400 Bad Request` response with a list of validation messages.

Example:

```json
{
  "message": "Validation failed",
  "errors": [
    "\"title\" is required",
    "\"eventDate\" must be in ISO 8601 date format"
  ]
}
```

---

## Security Notes

This project uses:
- custom Helmet configuration for security headers
- custom CORS configuration
- environment variables with dotenv
- Firestore credentials kept outside the public repository

A more detailed explanation of the security choices is available in:

```text
SECURITY.md
```

---

## Project Structure

```text
src/
  api/v1/
    controllers/
    middleware/
    models/
    repositories/
    routes/
    services/
    validation/
  config/
    corsOptions.ts
    env.ts
    helmetOptions.ts
    swagger.ts
    swaggerOptions.ts
  app.ts
  server.ts
scripts/
  generate-openapi.ts
docs/
  index.html
```

---

## Author

Timur Karimov  
RRC Polytech  
Student ID: 0408856