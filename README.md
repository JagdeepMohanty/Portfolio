# Full Stack Developer Portfolio

A premium Black + Gold themed portfolio website built with React.js. This is a **frontend-only** application that is fully deployable on Netlify with no backend dependencies.

## Features

- 🎨 Black + Gold Premium Theme
- ⚡ React.js with Vite
- 🎭 Framer Motion Animations
- 📱 Fully Responsive Design
- 🚀 Production Ready
- ☁️ Netlify Forms for Contact
- 📦 Static Data - No Database Required

## Tech Stack

### Frontend
- React.js with Vite
- Framer Motion
- React Router
- React Icons

### Backend
- **None** - Fully frontend-only application

### Database
- **None** - Data is stored statically in JavaScript files

## Quick Start

### Frontend Setup

1. Navigate to client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Run development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

### Building for Production

```bash
cd client
npm run build
```

The build output will be in the `dist` folder, ready for deployment.

## Project Structure

```
Portfolio/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── data/         # Static data (projects, certificates)
│   │   ├── api/          # API service (static data exports)
│   │   └── assets/       # Static assets
│   ├── public/           # Public assets
│   ├── netlify.toml      # Netlify configuration
│   └── package.json
│
├── README.md              # This file
├── ARCHITECTURE.md        # Architecture documentation
├── CHECKLIST.md           # Development checklist
├── COMMANDS.md            # Useful commands
├── CUSTOMIZATION.md       # Customization guide
├── DEPLOYMENT.md          # Deployment instructions
├── DOCUMENTATION_INDEX.md # Documentation index
├── ENVIRONMENT.md        # Environment setup
├── PROJECT_SUMMARY.md    # Project summary
└── QUICKSTART.md         # Quick start guide
```

## Adding Projects

Edit `client/src/data/projects.js` to add or modify projects:

```javascript
export const projects = [
  {
    id: 1,
    title: "Your Project Name",
    description: "Project description",
    tech_stack: ["React", "Node.js", "MongoDB"],
    github_link: "https://github.com/username/repo",
    demo_link: "https://demo.com",
    image_url: "https://example.com/image.jpg"
  }
];
```

## Adding Certificates

Edit `client/src/data/certificates.js` to add or modify certificates:

```javascript
export const certificates = [
  {
    id: 1,
    title: "Certificate Name",
    issuer: "Issuing Organization",
    date: "January 2024",
    image_url: "https://example.com/cert.jpg"
  }
];
```

## Color Palette

- Background: `#0C0C0C`
- Card Background: `#1A1A1A`
- Primary Gold: `#EAB308`
- Accent Gold: `#F59E0B`
- Text Primary: `#FAFAFA`
- Text Secondary: `#A3A3A3`

## Deployment

### Deploy to Netlify

1. Push code to GitHub
2. Log in to [Netlify](https://netlify.com)
3. Add new site from Git
4. Select your GitHub repository
5. Configure build settings:
   - Base directory: `client`
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Deploy

That's it! Your portfolio will be deployed automatically.

### Netlify Forms

The contact form uses Netlify Forms for handling submissions. No additional configuration is required - just deploy to Netlify and the form will work automatically.

## GitHub Cleanup (Remove Backend)

If you previously had a server folder and want to remove it from your repository:

```bash
# Remove server folder from git tracking
git rm -r server

# Commit the changes
git commit -m "Removed backend, converted to frontend-only Netlify portfolio"

# Push to GitHub
git push origin main
```

## License

MIT License
