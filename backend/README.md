# Portfolio Backend - Contact Form API

Production-ready Express backend for portfolio contact form with Gmail integration.

## Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create `.env` file:
```
GMAIL_USER=your-email@gmail.com
GMAIL_PASS=your-app-password
PORT=5000
```

### 3. Get Gmail App Password
1. Enable 2-Factor Authentication on Gmail
2. Go to https://myaccount.google.com/apppasswords
3. Select Mail and Windows Computer
4. Copy the generated 16-character password
5. Paste in `.env` as `GMAIL_PASS`

### 4. Run Server
```bash
npm start          # Production
npm run dev        # Development with auto-reload
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

## Frontend Integration

```javascript
const handleSubmit = async (formData) => {
  const response = await fetch('http://localhost:5000/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });
  
  const data = await response.json();
  if (data.success) {
    console.log('Message sent!');
  }
};
```

## Features

✓ Email validation
✓ Input sanitization
✓ CORS enabled
✓ Error handling
✓ HTML email templates
✓ Environment variables
✓ Production-ready

## Security

- Email format validation
- Input length limits (500 chars)
- CORS whitelist
- Error messages don't expose internals
- Environment variables for credentials
