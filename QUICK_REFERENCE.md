# Portfolio Project - Quick Reference Guide

## 🏗️ Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    PORTFOLIO PROJECT                         │
└─────────────────────────────────────────────────────────────┘

┌──────────────────────────┐         ┌──────────────────────────┐
│   FRONTEND (React)       │         │   BACKEND (Express)      │
│   Port: 5173             │         │   Port: 5000             │
├──────────────────────────┤         ├──────────────────────────┤
│ • Navbar                 │         │ • server.js              │
│ • Home Section           │         │ • routes/contactRoute    │
│ • About Section          │         │ • controllers/contact    │
│ • Projects Section       │         │ • config/mailer          │
│ • GitHub Dashboard       │         │ • .env (credentials)     │
│ • Certificates Section   │         │                          │
│ • Contact Form ──────────┼────────→│ POST /api/contact        │
│ • Footer                 │         │                          │
│ • Theme Toggle           │         │ ↓ (Nodemailer)           │
│                          │         │ Gmail SMTP               │
└──────────────────────────┘         └──────────────────────────┘
         ↓
    Netlify Deploy
```

## 📂 Folder Tree (Simplified)

```
Portfolio/
├── client/                    # React Frontend
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── sections/          # Page sections
│   │   ├── hooks/             # Custom React hooks
│   │   ├── services/          # API calls
│   │   ├── data/              # Static data
│   │   ├── assets/            # Images, icons
│   │   └── App.jsx            # Main component
│   ├── package.json
│   └── vite.config.js
│
├── backend/                   # Express Backend
│   ├── server.js              # Main server
│   ├── routes/                # API routes
│   ├── controllers/           # Business logic
│   ├── config/                # Configuration
│   ├── .env                   # Secrets (DO NOT COMMIT)
│   └── package.json
│
└── PROJECT_OVERVIEW.md        # This file
```

## 🔄 Data Flow Diagram

### Contact Form Submission
```
User Input
    ↓
Form Validation (Frontend)
    ↓
POST /api/contact (JSON)
    ↓
Backend Receives Request
    ↓
Validate & Sanitize Input
    ↓
Create HTML Email
    ↓
Nodemailer → Gmail SMTP
    ↓
Email Sent to jagdeepmohanty1807@gmail.com
    ↓
Response to Frontend
    ↓
Show Success/Error Message
```

### GitHub Data Fetching
```
GitHubSection Mounts
    ↓
Fetch Profile Data (GitHub API)
    ↓
Fetch All Repos (with pagination)
    ↓
Cache Data (5 minutes)
    ↓
Calculate Language Stats
    ↓
Fetch Contribution Data
    ↓
Render Dashboard
    ↓
Show Animations
```

## 🎯 Component Hierarchy

```
App.jsx
├── Navbar
├── Main
│   ├── HomeSection
│   ├── AboutSection
│   ├── ProjectsSection
│   ├── EngineeringHighlightsSection
│   ├── GitHubSection
│   │   └── ContributionCalendar
│   ├── CertificatesSection
│   └── ContactSection
├── Footer
└── BackToTopButton
```

## 🔌 API Endpoints

```
Backend: http://localhost:5000

GET  /health
     └─ Response: { status: "Server is running" }

POST /api/contact
     ├─ Request: { name, email, message }
     └─ Response: { success, message/error }
```

## 🎨 Theme Colors

```
Primary Gold:      #EAB308  ████████
Secondary Gold:    #F59E0B  ████████
Dark Background:   #0C0C0C  ████████
Light Text:        #FAFAFA  ████████
Gray Text:         #A3A3A3  ████████
Light Background:  #F5F5F5  ████████
```

## 📱 Responsive Breakpoints

```
Mobile:    < 640px   (phones)
Tablet:    640-1023px (tablets)
Laptop:    1024-1439px (small laptops)
Desktop:   1440px+   (large screens)
```

## 🚀 Deployment Checklist

### Frontend (Netlify)
- [ ] Build: `npm run build`
- [ ] Output: `dist` folder
- [ ] Base: `client` directory
- [ ] Auto-deploy from Git

### Backend (Optional)
- [ ] Set environment variables
- [ ] Configure CORS origins
- [ ] Use PM2 for process management
- [ ] Set up monitoring

## 📊 Technology Stack Summary

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | React 18 | UI Framework |
| Build | Vite | Fast bundler |
| Styling | Inline CSS | No dependencies |
| Animations | Framer Motion | Smooth effects |
| Icons | React Icons | Icon library |
| Charts | Chart.js | Data visualization |
| Backend | Express | Web server |
| Email | Nodemailer | Email service |
| CORS | CORS middleware | Cross-origin requests |
| Config | dotenv | Environment variables |
| Deployment | Netlify | Frontend hosting |

## 🔐 Security Checklist

- [x] Email validation (regex)
- [x] Input sanitization (500 char limit)
- [x] CORS whitelist (localhost only)
- [x] Environment variables (.env)
- [x] Error handling (try/catch)
- [x] No sensitive data in frontend
- [x] Gmail App Password (not regular password)
- [x] HTTPS ready (Netlify)

## 📈 Performance Metrics

- ✅ Lazy loading (React Router)
- ✅ Code splitting (Vite)
- ✅ Data caching (5 min)
- ✅ Optimized images
- ✅ Minified production build
- ✅ CDN ready

## 🎓 Key Features

### Frontend
- ✅ Black + Gold theme
- ✅ Dark/light toggle
- ✅ Glassmorphism design
- ✅ Fully responsive
- ✅ Real GitHub data
- ✅ Custom calendar
- ✅ Contact form
- ✅ SEO optimized

### Backend
- ✅ Express server
- ✅ Email integration
- ✅ Input validation
- ✅ Error handling
- ✅ CORS enabled
- ✅ Health check
- ✅ Production-ready

## 🔧 Quick Commands

```bash
# Frontend
cd client
npm install              # Install dependencies
npm run dev             # Start dev server (5173)
npm run build           # Production build

# Backend
cd backend
npm install             # Install dependencies
npm start               # Start server (5000)
npm run dev             # Dev with auto-reload

# Testing
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","message":"Test"}'
```

## 📞 Contact Form Integration

```javascript
// Frontend sends:
fetch('http://localhost:5000/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name, email, message })
})

// Backend receives and validates
// Nodemailer sends email
// Response: { success: true, message: "..." }
```

## 🎯 Interview Talking Points

1. **Architecture:** Modular, scalable MERN stack
2. **Frontend:** React with Vite, responsive design, real GitHub integration
3. **Backend:** Express with proper routing, email service, validation
4. **Security:** Input validation, sanitization, environment variables
5. **Performance:** Caching, lazy loading, code splitting
6. **Deployment:** Netlify for frontend, ready for backend deployment
7. **Best Practices:** Clean code, error handling, documentation

## 📚 Documentation Files

- `PROJECT_OVERVIEW.md` - Complete project overview
- `backend/README.md` - Backend quick reference
- `backend/SETUP.md` - Detailed backend setup
- `client/README.md` - Frontend documentation (if exists)

## ✅ Production Readiness

- [x] Clean code structure
- [x] Error handling
- [x] Input validation
- [x] Security measures
- [x] Responsive design
- [x] Performance optimized
- [x] Documentation complete
- [x] Ready for deployment

---

**Last Updated:** 2024
**Status:** Production Ready ✅
**Version:** 1.0.0
