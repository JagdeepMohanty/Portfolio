# Backend Setup Guide

## Project Structure
```
backend/
├── server.js                 # Main Express server
├── package.json             # Dependencies
├── .env                     # Environment variables (DO NOT COMMIT)
├── .env.example             # Example env file
├── config/
│   └── mailer.js           # Nodemailer configuration
├── routes/
│   └── contactRoute.js      # Contact form route
├── controllers/
│   └── contactController.js # Contact form logic
└── README.md               # Documentation
```

## Installation Steps

### 1. Navigate to Backend Directory
```bash
cd backend
```

### 2. Install Dependencies
```bash
npm install
```

This installs:
- `express` - Web framework
- `nodemailer` - Email service
- `cors` - Cross-origin requests
- `dotenv` - Environment variables

### 3. Setup Gmail App Password

**Important:** Use Gmail App Password, NOT your regular password

Steps:
1. Go to https://myaccount.google.com/security
2. Enable "2-Step Verification" if not already enabled
3. Go to https://myaccount.google.com/apppasswords
4. Select "Mail" and "Windows Computer"
5. Google generates a 16-character password
6. Copy this password

### 4. Create .env File
```bash
cp .env.example .env
```

Edit `.env`:
```
GMAIL_USER=jagdeepmohanty1807@gmail.com
GMAIL_PASS=pxwxftpwolbrzewe
PORT=5000
NODE_ENV=development
```

Replace `GMAIL_PASS` with your 16-character app password.

### 5. Start Server
```bash
npm start          # Production mode
npm run dev        # Development with auto-reload
```

Expected output:
```
✓ Server running on http://localhost:5000
✓ CORS enabled for frontend
✓ Contact endpoint: POST /api/contact
```

## Testing the API

### Using cURL
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Test message"
  }'
```

### Using Postman
1. Create new POST request
2. URL: `http://localhost:5000/api/contact`
3. Headers: `Content-Type: application/json`
4. Body (raw JSON):
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Test message"
}
```

## Frontend Integration

The React contact form is already configured to use this backend.

When you submit the form:
1. Data is sent to `http://localhost:5000/api/contact`
2. Backend validates and sanitizes input
3. Email is sent to `jagdeepmohanty1807@gmail.com`
4. Response is returned to frontend
5. Success/error message is displayed

## Troubleshooting

### "Cannot find module 'express'"
```bash
npm install
```

### "GMAIL_PASS is undefined"
- Check `.env` file exists
- Verify `GMAIL_PASS` is set correctly
- Use 16-character app password, not regular password

### "CORS error"
- Ensure backend is running on port 5000
- Frontend must be on `http://localhost:5173` (Vite default)
- CORS is configured for localhost

### "Email not sending"
- Verify Gmail credentials are correct
- Check 2-Step Verification is enabled
- Use App Password, not regular password
- Check internet connection

### "Port 5000 already in use"
```bash
# Change PORT in .env to 5001 or another port
PORT=5001
```

## Production Deployment

### Environment Variables
Never commit `.env` file. Set environment variables on your hosting platform:
- Heroku: Config Vars
- Vercel: Environment Variables
- AWS: Systems Manager Parameter Store

### CORS Configuration
Update CORS origins for production:
```javascript
app.use(cors({
  origin: ['https://yourdomain.com', 'https://www.yourdomain.com'],
  credentials: true
}));
```

### Deployment Platforms

**Heroku:**
```bash
heroku create your-app-name
git push heroku main
```

**Vercel (Serverless):**
- Use Vercel Functions instead of Express
- Requires different setup

**AWS EC2:**
- Deploy Node.js application
- Use PM2 for process management
- Configure security groups

## Security Checklist

✓ Environment variables not committed
✓ Email validation implemented
✓ Input sanitization (500 char limit)
✓ CORS whitelist configured
✓ Error messages don't expose internals
✓ Try/catch error handling
✓ Gmail App Password used (not regular password)

## Support

For issues:
1. Check console logs
2. Verify .env configuration
3. Test with cURL/Postman
4. Check Gmail account settings
