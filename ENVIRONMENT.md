# Environment Setup Guide

## Prerequisites Installation

### 1. Node.js and npm

#### Windows
1. Download from [nodejs.org](https://nodejs.org/)
2. Run installer (LTS version recommended)
3. Verify installation:
```bash
node --version
npm --version
```

#### Mac
```bash
# Using Homebrew
brew install node

# Verify
node --version
npm --version
```

#### Linux
```bash
# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify
node --version
npm --version
```

---

### 2. Python

#### Windows
1. Download from [python.org](https://www.python.org/downloads/)
2. Run installer
3. ✅ Check "Add Python to PATH"
4. Verify installation:
```bash
python --version
pip --version
```

#### Mac
```bash
# Using Homebrew
brew install python

# Verify
python3 --version
pip3 --version
```

#### Linux
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install python3 python3-pip python3-venv

# Verify
python3 --version
pip3 --version
```

---

### 3. MongoDB

#### Option A: Local Installation

**Windows:**
1. Download from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Run installer
3. Install as Windows Service
4. Verify:
```bash
mongosh
```

**Mac:**
```bash
# Using Homebrew
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community

# Verify
mongosh
```

**Linux:**
```bash
# Ubuntu/Debian
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod

# Verify
mongosh
```

#### Option B: MongoDB Atlas (Cloud - Recommended)

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account
3. Create free cluster (M0)
4. Create database user
5. Whitelist IP: 0.0.0.0/0 (allow all)
6. Get connection string
7. Use in `.env` file

**Pros of Atlas:**
- ✅ No local installation needed
- ✅ Free tier available
- ✅ Automatic backups
- ✅ Easy to use
- ✅ Works from anywhere

---

### 4. Git (Optional - for deployment)

#### Windows
Download from [git-scm.com](https://git-scm.com/download/win)

#### Mac
```bash
brew install git
```

#### Linux
```bash
sudo apt install git
```

Verify:
```bash
git --version
```

---

## Environment Configuration

### Backend Environment (.env)

Create `server/.env`:

```env
# MongoDB Configuration
MONGO_URI=mongodb://localhost:27017/
# OR for MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority

# Database Name
DATABASE_NAME=portfolio_db

# GitHub Integration (optional)
GITHUB_USERNAME=your_github_username

# Server Port
PORT=5000
```

### Frontend Environment (.env)

Create `client/.env`:

```env
# Backend API URL
VITE_API_URL=http://localhost:5000/api

# For production (after deploying backend):
# VITE_API_URL=https://your-backend.onrender.com/api
```

---

## Virtual Environment Setup

### Python Virtual Environment

#### Why Use Virtual Environment?
- ✅ Isolates project dependencies
- ✅ Prevents version conflicts
- ✅ Easy to manage packages
- ✅ Reproducible environment

#### Create Virtual Environment

**Windows:**
```bash
cd server
python -m venv venv
venv\Scripts\activate
```

**Mac/Linux:**
```bash
cd server
python3 -m venv venv
source venv/bin/activate
```

#### Verify Activation
You should see `(venv)` in your terminal prompt:
```
(venv) C:\Portfolio\server>
```

#### Install Dependencies
```bash
pip install -r requirements.txt
```

#### Deactivate (when done)
```bash
deactivate
```

---

## IDE Setup

### VS Code (Recommended)

#### Install Extensions
1. **Python** - Microsoft
2. **ES7+ React/Redux/React-Native snippets**
3. **Prettier** - Code formatter
4. **ESLint** - JavaScript linter
5. **MongoDB for VS Code**

#### Settings
Create `.vscode/settings.json`:
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "python.linting.enabled": true,
  "python.linting.pylintEnabled": true,
  "python.formatting.provider": "autopep8"
}
```

---

## Port Configuration

### Default Ports
- **Frontend**: 5173 (Vite default)
- **Backend**: 5000 (Flask default)
- **MongoDB**: 27017 (MongoDB default)

### Change Ports if Needed

#### Backend Port
Edit `server/.env`:
```env
PORT=8000
```

#### Frontend Port
Edit `client/vite.config.js`:
```javascript
export default defineConfig({
  server: {
    port: 3000
  }
})
```

---

## Firewall Configuration

### Windows Firewall
If you have issues connecting:
1. Open Windows Defender Firewall
2. Click "Allow an app through firewall"
3. Add Python and Node.js

### Mac Firewall
```bash
# Allow incoming connections
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --add /usr/local/bin/node
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --add /usr/local/bin/python3
```

---

## Testing Your Setup

### 1. Test Python
```bash
python --version
# Should show: Python 3.8+ or higher
```

### 2. Test Node.js
```bash
node --version
# Should show: v16.0.0 or higher

npm --version
# Should show: 8.0.0 or higher
```

### 3. Test MongoDB
```bash
mongosh
# Should connect to MongoDB shell

# In MongoDB shell:
show dbs
exit
```

### 4. Test Virtual Environment
```bash
cd server
python -m venv test_venv
# Should create test_venv folder without errors
rm -rf test_venv  # Clean up
```

---

## Common Setup Issues

### Issue: Python not found
**Solution:**
- Windows: Reinstall Python with "Add to PATH" checked
- Mac/Linux: Use `python3` instead of `python`

### Issue: pip not found
**Solution:**
```bash
python -m ensurepip --upgrade
```

### Issue: MongoDB connection failed
**Solution:**
- Check MongoDB is running: `mongosh`
- Use MongoDB Atlas instead
- Check firewall settings

### Issue: Port already in use
**Solution:**
```bash
# Windows - Find process on port 5000
netstat -ano | findstr :5000
# Kill process
taskkill /PID <PID> /F

# Mac/Linux - Find process on port 5000
lsof -i :5000
# Kill process
kill -9 <PID>
```

### Issue: Permission denied
**Solution:**
```bash
# Windows: Run as Administrator
# Mac/Linux: Use sudo
sudo npm install -g <package>
```

### Issue: Virtual environment not activating
**Solution:**
```bash
# Windows - Enable script execution
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Then try activating again
venv\Scripts\activate
```

---

## Environment Checklist

Before starting development, verify:

- [ ] Node.js installed (v16+)
- [ ] npm installed (v8+)
- [ ] Python installed (v3.8+)
- [ ] pip installed
- [ ] MongoDB installed OR Atlas account created
- [ ] Git installed (optional)
- [ ] VS Code installed (recommended)
- [ ] Backend `.env` file created
- [ ] Frontend `.env` file created
- [ ] Virtual environment created
- [ ] Dependencies installed
- [ ] MongoDB connection tested
- [ ] Ports available (5000, 5173, 27017)

---

## Quick Environment Test

Run this to test everything:

```bash
# Test Node.js
node --version && npm --version

# Test Python
python --version && pip --version

# Test MongoDB
mongosh --eval "db.version()"

# Test Git
git --version

# All commands should succeed without errors
```

---

## Next Steps

Once your environment is set up:

1. ✅ Follow **QUICKSTART.md** to run the project
2. ✅ Use **COMMANDS.md** for helpful commands
3. ✅ Check **CHECKLIST.md** for setup steps
4. ✅ Read **CUSTOMIZATION.md** to personalize

---

## Environment Variables Reference

### Backend (.env)
```env
MONGO_URI=<your-mongodb-connection-string>
DATABASE_NAME=portfolio_db
GITHUB_USERNAME=<your-github-username>
PORT=5000
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

### Production (.env)
```env
# Backend
MONGO_URI=<atlas-connection-string>
DATABASE_NAME=portfolio_db
GITHUB_USERNAME=<your-github-username>
PORT=5000

# Frontend
VITE_API_URL=https://your-backend.onrender.com/api
```

---

**Your environment is ready! Start building! 🚀**
