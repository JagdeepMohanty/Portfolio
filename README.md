# Full Stack Developer Portfolio

A premium Black + Gold themed portfolio website built with React.js, Flask, and MongoDB.

## Features

- 🎨 Black + Gold Premium Theme
- ⚡ React.js with Vite
- 🐍 Python Flask Backend
- 🗄️ MongoDB Database
- 🎭 Framer Motion Animations
- 📱 Fully Responsive Design
- 🚀 Production Ready

## Tech Stack

### Frontend
- React.js with Vite
- Framer Motion
- React Router
- Axios
- React Icons

### Backend
- Python Flask
- MongoDB with PyMongo
- Pydantic for validation
- Flask-CORS

## Setup Instructions

### Backend Setup

1. Navigate to server directory:
```bash
cd server
```

2. Create virtual environment:
```bash
python -m venv venv
```

3. Activate virtual environment:
- Windows: `venv\Scripts\activate`
- Mac/Linux: `source venv/bin/activate`

4. Install dependencies:
```bash
pip install -r requirements.txt
```

5. Configure environment variables:
- Copy `.env.example` to `.env`
- Update MongoDB URI and other settings

6. Run the server:
```bash
python main.py
```

Server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
- Copy `.env.example` to `.env`
- Update API URL if needed

4. Run development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## MongoDB Setup

1. Install MongoDB locally or use MongoDB Atlas
2. Update `MONGO_URI` in `server/.env`
3. Database and collections will be created automatically

## Adding Data

### Add Projects via API

```bash
POST http://localhost:5000/api/projects
Content-Type: application/json

{
  "title": "Project Name",
  "description": "Project description",
  "tech_stack": ["React", "Node.js", "MongoDB"],
  "github_link": "https://github.com/username/repo",
  "demo_link": "https://demo.com",
  "image_url": "https://example.com/image.jpg"
}
```

### Add Certificates via API

```bash
POST http://localhost:5000/api/certificates
Content-Type: application/json

{
  "title": "Certificate Name",
  "issuer": "Issuing Organization",
  "date": "January 2024",
  "image_url": "https://example.com/cert.jpg"
}
```

## Color Palette

- Background: `#0C0C0C`
- Card Background: `#1A1A1A`
- Primary Gold: `#EAB308`
- Accent Gold: `#F59E0B`
- Text Primary: `#FAFAFA`
- Text Secondary: `#A3A3A3`

## Deployment

### Deployment Architecture
- **Frontend**: Netlify
- **Backend**: Render
- **Database**: MongoDB Atlas

### Frontend (Netlify)
1. Push code to GitHub
2. Log in to [Netlify](https://netlify.com)
3. Add new site from Git
4. Select your GitHub repository
5. Configure build settings:
   - Base directory: `client`
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Add environment variable:
   - Key: `VITE_API_URL`
   - Value: `https://your-render-backend-url.onrender.com/api`
7. Deploy

### Backend (Render)
1. Push code to GitHub
2. Log in to [Render](https://render.com)
3. Create new Web Service
4. Connect your GitHub repository (server folder)
5. Configure:
   - Build command: `pip install -r requirements.txt`
   - Start command: `gunicorn main:app`
6. Add environment variables:
   - `MONGO_URI`: Your MongoDB Atlas connection string
   - `FLASK_ENV`: `production`
7. Deploy

## GitHub Integration

### Initialize Git Repository
```bash
git init
git branch -M main
git remote add origin https://github.com/JagdeepMohanty/Portfolio.git
```

### Push Frontend to GitHub
```bash
git add client
git commit -m "Added Netlify-ready React frontend"
git push origin main
```

### Push Backend to GitHub
```bash
git add server
git commit -m "Added Flask backend"
git push origin main
```

### Push All Changes
```bash
git add .
git commit -m "Updated portfolio with deployment configurations"
git push origin main
```

## Project Structure

```
Portfolio/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── api/           # API configuration
│   │   └── assets/        # Static assets
│   └── package.json
│
├── server/                # Flask backend
│   ├── routes/           # API routes
│   ├── models/           # Data models
│   ├── database.py       # Database config
│   ├── main.py           # Main application
│   └── requirements.txt
│
└── README.md
```

## API Endpoints

- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create project
- `GET /api/certificates` - Get all certificates
- `POST /api/certificates` - Create certificate
- `POST /api/contact` - Submit contact form
- `GET /api/github/repos` - Get GitHub repositories

## License

MIT License
