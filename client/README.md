# Portfolio Frontend

This is the frontend-only React application for my portfolio website.

## Tech Stack

- React.js with Vite
- Framer Motion for animations
- React Router for navigation
- React Icons

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── components/    # Reusable UI components
├── pages/         # Page components (Home, About, Projects, etc.)
├── data/          # Static data (projects.js, certificates.js)
├── api/           # API service (uses static data)
├── assets/        # Images and static assets
├── App.jsx        # Main app component
├── main.jsx       # Entry point
└── index.css      # Global styles
```

## Customization

- Edit `src/data/projects.js` to add/modify projects
- Edit `src/data/certificates.js` to add/modify certificates
- Modify colors in `src/index.css` to change the theme

## Deployment

The app is configured for Netlify deployment. Just connect your GitHub repository and Netlify will handle the rest.
