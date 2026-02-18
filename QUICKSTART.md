# Quick Start Guide

## Prerequisites
- Node.js (v16 or higher)
- Python (v3.8 or higher)
- MongoDB (local or Atlas)

## 1. Clone and Setup

```bash
cd Portfolio
```

## 2. Backend Setup (Terminal 1)

```bash
cd server

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
copy .env.example .env  # Windows
cp .env.example .env    # Mac/Linux

# Edit .env and update:
# - MONGO_URI (your MongoDB connection string)
# - GITHUB_USERNAME (your GitHub username)

# Seed sample data (optional)
python seed_data.py

# Run server
python main.py
```

Backend will run on: http://localhost:5000

## 3. Frontend Setup (Terminal 2)

```bash
cd client

# Install dependencies
npm install

# Create .env file
copy .env.example .env  # Windows
cp .env.example .env    # Mac/Linux

# Run development server
npm run dev
```

Frontend will run on: http://localhost:5173

## 4. Access the Application

Open your browser and navigate to: http://localhost:5173

## 5. Customize Your Portfolio

### Update Personal Information

1. **Home Page** (`client/src/pages/Home.jsx`):
   - Change "Your Name" to your actual name
   - Update the description

2. **Footer** (`client/src/components/Footer.jsx`):
   - Update GitHub, LinkedIn, and email links

3. **About Page** (`client/src/pages/About.jsx`):
   - Update education details
   - Modify skills if needed

### Add Your Resume

Place your resume PDF in `client/public/resume.pdf`

### Add Projects and Certificates

Use the seed script or add via API:

```bash
# Add a project
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Project",
    "description": "Project description",
    "tech_stack": ["React", "Node.js"],
    "github_link": "https://github.com/username/repo",
    "demo_link": "https://demo.com",
    "image_url": "https://example.com/image.jpg"
  }'
```

## 6. Build for Production

### Frontend
```bash
cd client
npm run build
```

### Backend
The Flask app is production-ready with gunicorn.

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running locally, or
- Use MongoDB Atlas and update MONGO_URI in .env

### Port Already in Use
- Backend: Change PORT in server/.env
- Frontend: Vite will automatically use next available port

### CORS Issues
- Ensure backend is running
- Check VITE_API_URL in client/.env matches backend URL

## Next Steps

1. Customize colors in `client/src/index.css`
2. Add your own projects and certificates
3. Update images and content
4. Deploy to Vercel (frontend) and Render (backend)

## Support

For issues, check:
- MongoDB connection string
- Environment variables are set correctly
- Both servers are running
- No port conflicts
