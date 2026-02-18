# Helpful Commands Reference

## Backend Commands (Flask)

### Setup
```bash
# Navigate to server directory
cd server

# Create virtual environment
python -m venv venv

# Activate virtual environment (Windows)
venv\Scripts\activate

# Activate virtual environment (Mac/Linux)
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Deactivate virtual environment
deactivate
```

### Running
```bash
# Run development server
python main.py

# Run with specific port
PORT=8000 python main.py

# Seed sample data
python seed_data.py

# Test API endpoints
python test_api.py
```

### Database
```bash
# Access MongoDB shell (if local)
mongosh

# Show databases
show dbs

# Use portfolio database
use portfolio_db

# Show collections
show collections

# Find all projects
db.projects.find()

# Find all certificates
db.certificates.find()

# Clear projects
db.projects.deleteMany({})

# Clear certificates
db.certificates.deleteMany({})
```

### Dependencies
```bash
# Install new package
pip install package-name

# Update requirements.txt
pip freeze > requirements.txt

# Install from requirements
pip install -r requirements.txt

# Upgrade package
pip install --upgrade package-name
```

---

## Frontend Commands (React + Vite)

### Setup
```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Install specific package
npm install package-name

# Install dev dependency
npm install -D package-name
```

### Running
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

### Dependencies
```bash
# Install package
npm install package-name

# Install specific version
npm install package-name@version

# Uninstall package
npm uninstall package-name

# Update package
npm update package-name

# Update all packages
npm update

# Check outdated packages
npm outdated

# Audit security
npm audit

# Fix security issues
npm audit fix
```

---

## Git Commands

### Initial Setup
```bash
# Initialize repository
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit"

# Add remote repository
git remote add origin <repository-url>

# Push to GitHub
git push -u origin main
```

### Regular Workflow
```bash
# Check status
git status

# Add specific file
git add filename

# Add all changes
git add .

# Commit with message
git commit -m "Your message"

# Push changes
git push

# Pull latest changes
git pull

# Create new branch
git checkout -b branch-name

# Switch branch
git checkout branch-name

# Merge branch
git merge branch-name

# View commit history
git log

# View remote URL
git remote -v
```

---

## MongoDB Commands

### Local MongoDB
```bash
# Start MongoDB service (Windows)
net start MongoDB

# Stop MongoDB service (Windows)
net stop MongoDB

# Start MongoDB (Mac)
brew services start mongodb-community

# Stop MongoDB (Mac)
brew services stop mongodb-community

# Connect to MongoDB
mongosh
```

### MongoDB Shell Commands
```javascript
// Show all databases
show dbs

// Switch to database
use portfolio_db

// Show collections
show collections

// Insert project
db.projects.insertOne({
  title: "Project Name",
  description: "Description",
  tech_stack: ["React", "Node.js"],
  github_link: "https://github.com/user/repo",
  demo_link: "https://demo.com",
  image_url: "https://image.url"
})

// Find all projects
db.projects.find()

// Find one project
db.projects.findOne({ title: "Project Name" })

// Update project
db.projects.updateOne(
  { title: "Project Name" },
  { $set: { description: "New description" } }
)

// Delete project
db.projects.deleteOne({ title: "Project Name" })

// Count documents
db.projects.countDocuments()

// Drop collection
db.projects.drop()
```

---

## API Testing with cURL

### Projects
```bash
# Get all projects
curl http://localhost:5000/api/projects

# Create project
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Project",
    "description": "Description",
    "tech_stack": ["React", "Flask"],
    "github_link": "https://github.com/user/repo",
    "demo_link": "https://demo.com",
    "image_url": "https://image.url"
  }'
```

### Certificates
```bash
# Get all certificates
curl http://localhost:5000/api/certificates

# Create certificate
curl -X POST http://localhost:5000/api/certificates \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Certificate Name",
    "issuer": "Organization",
    "date": "January 2024",
    "image_url": "https://image.url"
  }'
```

### Contact
```bash
# Submit contact form
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Hello!"
  }'
```

---

## Deployment Commands

### Vercel (Frontend)
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod

# View logs
vercel logs
```

### Render (Backend)
```bash
# Install Render CLI
npm install -g render

# Login to Render
render login

# Deploy (via dashboard or CLI)
```

---

## Useful Development Commands

### Check Versions
```bash
# Node version
node --version

# npm version
npm --version

# Python version
python --version

# pip version
pip --version

# Git version
git --version
```

### Port Management
```bash
# Check what's running on port (Windows)
netstat -ano | findstr :5000

# Kill process on port (Windows)
taskkill /PID <PID> /F

# Check what's running on port (Mac/Linux)
lsof -i :5000

# Kill process on port (Mac/Linux)
kill -9 <PID>
```

### Clean Up
```bash
# Remove node_modules
rm -rf node_modules  # Mac/Linux
rmdir /s node_modules  # Windows

# Remove Python cache
find . -type d -name __pycache__ -exec rm -r {} +  # Mac/Linux

# Clear npm cache
npm cache clean --force

# Clear pip cache
pip cache purge
```

---

## Environment Variables

### View Environment Variables
```bash
# Windows
echo %VARIABLE_NAME%

# Mac/Linux
echo $VARIABLE_NAME

# View all (Windows)
set

# View all (Mac/Linux)
printenv
```

### Set Environment Variables
```bash
# Windows (temporary)
set VARIABLE_NAME=value

# Mac/Linux (temporary)
export VARIABLE_NAME=value

# Permanent: Add to .env file
```

---

## Quick Reference

### Start Everything
```bash
# Terminal 1 - Backend
cd server && venv\Scripts\activate && python main.py

# Terminal 2 - Frontend
cd client && npm run dev
```

### Stop Everything
```bash
# Press Ctrl+C in each terminal
```

### Reset Everything
```bash
# Backend
cd server
deactivate
rm -rf venv
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt

# Frontend
cd client
rm -rf node_modules
npm install
```

---

## Troubleshooting Commands

### Backend Issues
```bash
# Check if Flask is installed
pip show Flask

# Reinstall dependencies
pip install --force-reinstall -r requirements.txt

# Check Python path
which python  # Mac/Linux
where python  # Windows
```

### Frontend Issues
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Check for vulnerabilities
npm audit

# Update dependencies
npm update
```

### Database Issues
```bash
# Check MongoDB status
mongosh --eval "db.adminCommand('ping')"

# Test connection
python -c "from pymongo import MongoClient; print(MongoClient('mongodb://localhost:27017/').server_info())"
```

---

**Keep this file handy for quick reference! 📚**
