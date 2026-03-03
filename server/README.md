# Portfolio Backend Server

Production-ready Express backend for portfolio contact form.

## Quick Start

```bash
npm install
npm start
```

Server runs on `http://localhost:5000`

## API Endpoints

### POST /api/contact
Send contact form message

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Your message here"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Message sent successfully"
}
```

**Error Response (400/500):**
```json
{
  "success": false,
  "error": "Error message"
}
```

### GET /health
Health check endpoint

**Response (200):**
```json
{
  "status": "Server is running",
  "environment": "development"
}
```

## Environment Setup

1. Create `.env` file:
```
GMAIL_USER=your-email@gmail.com
GMAIL_PASS=your-app-password
PORT=5000
NODE_ENV=development
```

2. Get Gmail App Password:
   - Enable 2-Step Verification
   - Go to https://myaccount.google.com/apppasswords
   - Generate 16-character password

## Development

```bash
npm run dev    # Auto-reload on changes
```

## Production

```bash
npm start      # Run server
```

## Architecture

```
server/
├── index.js                 # Main server
├── routes/contactRoute.js   # Contact endpoint
├── controllers/             # Business logic
├── config/mailer.js         # Email setup
├── .env                     # Credentials
└── package.json
```

## Features

✓ Email validation
✓ Input sanitization
✓ CORS enabled
✓ Error handling
✓ Health check
✓ Production-ready
