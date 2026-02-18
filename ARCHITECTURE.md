# Portfolio Architecture

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         USER BROWSER                         │
│                    http://localhost:5173                     │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           │ HTTP Requests
                           │
┌──────────────────────────▼──────────────────────────────────┐
│                    REACT FRONTEND (Vite)                     │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐            │
│  │   Pages    │  │ Components │  │    API     │            │
│  │            │  │            │  │            │            │
│  │ - Home     │  │ - Navbar   │  │ - Axios    │            │
│  │ - About    │  │ - Footer   │  │ - Config   │            │
│  │ - Projects │  │ - Cards    │  │ - Calls    │            │
│  │ - Certs    │  │ - Loader   │  │            │            │
│  │ - Contact  │  │            │  │            │            │
│  └────────────┘  └────────────┘  └────────────┘            │
│                                                              │
│  Styling: Custom CSS + Framer Motion                        │
│  Routing: React Router DOM                                  │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           │ API Calls (Axios)
                           │ http://localhost:5000/api
                           │
┌──────────────────────────▼──────────────────────────────────┐
│                    FLASK BACKEND (Python)                    │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐            │
│  │   Routes   │  │   Models   │  │  Database  │            │
│  │            │  │            │  │            │            │
│  │ - Projects │  │ - Project  │  │ - MongoDB  │            │
│  │ - Certs    │  │ - Cert     │  │ - PyMongo  │            │
│  │ - Contact  │  │ - Contact  │  │ - Config   │            │
│  │ - GitHub   │  │            │  │            │            │
│  └────────────┘  └────────────┘  └────────────┘            │
│                                                              │
│  Validation: Pydantic                                        │
│  CORS: Flask-CORS                                            │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           │ Database Operations
                           │
┌──────────────────────────▼──────────────────────────────────┐
│                      MONGODB DATABASE                        │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐            │
│  │  projects  │  │certificates│  │  contacts  │            │
│  │            │  │            │  │            │            │
│  │ - title    │  │ - title    │  │ - name     │            │
│  │ - desc     │  │ - issuer   │  │ - email    │            │
│  │ - tech     │  │ - date     │  │ - message  │            │
│  │ - links    │  │ - image    │  │ - timestamp│            │
│  │ - image    │  │            │  │            │            │
│  └────────────┘  └────────────┘  └────────────┘            │
└─────────────────────────────────────────────────────────────┘
```

---

## Data Flow

### 1. Loading Projects

```
User Opens Projects Page
         │
         ▼
Projects.jsx Component Mounts
         │
         ▼
useEffect Hook Triggers
         │
         ▼
fetchProjects() Called
         │
         ▼
api.js → getProjects()
         │
         ▼
Axios GET Request
         │
         ▼
Flask: /api/projects Route
         │
         ▼
projects.py → get_projects()
         │
         ▼
MongoDB: projects_collection.find()
         │
         ▼
Return JSON Array
         │
         ▼
React State Updated
         │
         ▼
ProjectCard Components Render
         │
         ▼
User Sees Projects
```

### 2. Submitting Contact Form

```
User Fills Contact Form
         │
         ▼
User Clicks Submit
         │
         ▼
handleSubmit() Called
         │
         ▼
api.js → submitContact(data)
         │
         ▼
Axios POST Request
         │
         ▼
Flask: /api/contact Route
         │
         ▼
contact.py → submit_contact()
         │
         ▼
Pydantic Validation
         │
         ▼
MongoDB: contacts_collection.insert_one()
         │
         ▼
Return Success Response
         │
         ▼
React Shows Success Message
         │
         ▼
Form Resets
```

---

## Component Hierarchy

```
App.jsx
│
├── Navbar.jsx
│   └── Navigation Links
│
├── Router
│   │
│   ├── Home.jsx
│   │   ├── Hero Section
│   │   ├── Resume Button
│   │   └── GitHub Link
│   │
│   ├── About.jsx
│   │   ├── About Card
│   │   ├── Skills Grid
│   │   └── Education Card
│   │
│   ├── Projects.jsx
│   │   ├── Loader (conditional)
│   │   └── ProjectCard (multiple)
│   │       ├── Image
│   │       ├── Title
│   │       ├── Description
│   │       ├── Tech Stack
│   │       └── Links
│   │
│   ├── Certificates.jsx
│   │   ├── Loader (conditional)
│   │   └── CertificateCard (multiple)
│   │       ├── Image
│   │       ├── Title
│   │       ├── Issuer
│   │       └── Date
│   │
│   └── Contact.jsx
│       ├── Contact Form
│       │   ├── Name Input
│       │   ├── Email Input
│       │   ├── Message Textarea
│       │   └── Submit Button
│       └── Status Message
│
└── Footer.jsx
    ├── Social Links
    └── Copyright
```

---

## API Routes Structure

```
Flask App (main.py)
│
├── /api/projects
│   ├── GET    → Get all projects
│   ├── POST   → Create project
│   └── GET /:id → Get single project
│
├── /api/certificates
│   ├── GET    → Get all certificates
│   └── POST   → Create certificate
│
├── /api/contact
│   ├── POST   → Submit contact form
│   └── GET    → Get all contacts (admin)
│
├── /api/github/repos
│   └── GET    → Get GitHub repositories
│
└── /api/health
    └── GET    → Health check
```

---

## File Dependencies

### Frontend Dependencies Flow

```
main.jsx
  └── App.jsx
      ├── Navbar.jsx
      │   └── Navbar.css
      │
      ├── Pages
      │   ├── Home.jsx → Home.css
      │   ├── About.jsx → About.css
      │   ├── Projects.jsx → Projects.css
      │   │   └── ProjectCard.jsx → ProjectCard.css
      │   ├── Certificates.jsx → Certificates.css
      │   │   └── CertificateCard.jsx → CertificateCard.css
      │   └── Contact.jsx → Contact.css
      │
      ├── Footer.jsx
      │   └── Footer.css
      │
      └── api.js (used by all pages)
```

### Backend Dependencies Flow

```
main.py
  ├── database.py
  │   └── MongoDB Connection
  │
  ├── routes/
  │   ├── projects.py
  │   │   ├── database.py
  │   │   └── models/project.py
  │   │
  │   ├── certificates.py
  │   │   ├── database.py
  │   │   └── models/certificate.py
  │   │
  │   ├── contact.py
  │   │   ├── database.py
  │   │   └── models/contact.py
  │   │
  │   └── github.py
  │
  └── Flask-CORS
```

---

## State Management

### React State Flow

```
Projects Page State:
┌─────────────────────────┐
│ projects: []            │ ← Empty initially
│ loading: true           │ ← Shows loader
│ error: null             │ ← No error
└─────────────────────────┘
           │
           ▼ API Call
┌─────────────────────────┐
│ projects: [data]        │ ← Populated
│ loading: false          │ ← Hide loader
│ error: null             │ ← Still no error
└─────────────────────────┘
           │
           ▼ Render
    Display Projects


Contact Form State:
┌─────────────────────────┐
│ formData: {             │
│   name: '',             │
│   email: '',            │
│   message: ''           │
│ }                       │
│ status: {               │
│   type: '',             │
│   message: ''           │
│ }                       │
│ loading: false          │
└─────────────────────────┘
           │
           ▼ User Types
┌─────────────────────────┐
│ formData: {             │
│   name: 'John',         │
│   email: 'john@...',    │
│   message: 'Hello'      │
│ }                       │
└─────────────────────────┘
           │
           ▼ Submit
┌─────────────────────────┐
│ loading: true           │ ← Show loading
└─────────────────────────┘
           │
           ▼ Success
┌─────────────────────────┐
│ status: {               │
│   type: 'success',      │
│   message: 'Sent!'      │
│ }                       │
│ formData: reset         │
│ loading: false          │
└─────────────────────────┘
```

---

## Deployment Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         PRODUCTION                           │
└─────────────────────────────────────────────────────────────┘

┌──────────────────┐      ┌──────────────────┐      ┌──────────────────┐
│                  │      │                  │      │                  │
│     VERCEL       │      │     RENDER       │      │  MONGODB ATLAS   │
│   (Frontend)     │◄────►│   (Backend)      │◄────►│   (Database)     │
│                  │      │                  │      │                  │
│  React + Vite    │      │  Flask + Python  │      │  Cloud Database  │
│  Static Files    │      │  REST API        │      │  3 Collections   │
│  CDN Delivery    │      │  Gunicorn        │      │  Auto Backup     │
│                  │      │                  │      │                  │
└──────────────────┘      └──────────────────┘      └──────────────────┘
         │                         │                         │
         │                         │                         │
         ▼                         ▼                         ▼
   your-site.vercel.app    your-api.onrender.com    cluster0.mongodb.net
```

---

## Security Flow

```
Request from Browser
         │
         ▼
HTTPS (Automatic on Vercel/Render)
         │
         ▼
CORS Check (Flask-CORS)
         │
         ▼
Pydantic Validation
         │
         ▼
MongoDB Query
         │
         ▼
Response with CORS Headers
         │
         ▼
Browser Receives Data
```

---

## Animation Flow (Framer Motion)

```
Component Mounts
         │
         ▼
initial={{ opacity: 0, y: 20 }}
         │
         ▼
animate={{ opacity: 1, y: 0 }}
         │
         ▼
transition={{ duration: 0.5 }}
         │
         ▼
Smooth Fade-in Animation
         │
         ▼
User Hovers
         │
         ▼
whileHover={{ scale: 1.05 }}
         │
         ▼
Card Scales Up with Glow
```

---

This architecture provides:
- ✅ Clear separation of concerns
- ✅ Scalable structure
- ✅ Easy to maintain
- ✅ Production ready
- ✅ Secure by default
