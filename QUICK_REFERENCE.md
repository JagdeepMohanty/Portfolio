# Portfolio Quick Reference Guide

## 🚀 Quick Start

### Development
```bash
cd client
npm install
npm run dev
```
Runs on `http://localhost:5173`

### Production Build
```bash
cd client
npm run build
```
Output: `dist/` folder (ready for deployment)

---

## 📁 Project Structure

```
Portfolio/
├── client/                    # React + Vite frontend
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   │   ├── CertificateCard.jsx
│   │   │   ├── ProjectCard.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ErrorBoundary.jsx
│   │   │   └── LoadingScreen.jsx
│   │   ├── sections/         # Page sections (lazy-loaded)
│   │   │   ├── HomeSection.jsx
│   │   │   ├── AboutSection.jsx
│   │   │   ├── ProjectsSection.jsx
│   │   │   ├── EngineeringHighlightsSection.jsx
│   │   │   ├── GitHubSection.jsx
│   │   │   ├── CertificatesSection.jsx
│   │   │   └── ContactSection.jsx
│   │   ├── hooks/            # Custom React hooks
│   │   │   ├── useTheme.js
│   │   │   ├── useScroll.js
│   │   │   └── useSEO.js
│   │   ├── services/         # API services
│   │   │   └── githubService.js
│   │   ├── data/             # Static data
│   │   │   ├── projects.js
│   │   │   └── certificates.js
│   │   ├── constants/        # Configuration
│   │   │   └── config.js
│   │   ├── assets/           # Images and media
│   │   ├── App.jsx           # Main app component
│   │   └── main.jsx          # Entry point
│   ├── public/               # Static files
│   ├── index.html            # HTML template
│   ├── vite.config.js        # Vite configuration
│   ├── package.json          # Dependencies
│   ├── netlify.toml          # Netlify config
│   └── README.md
├── .github/workflows/        # CI/CD pipelines
├── README.md                 # Root documentation
└── .gitignore
```

---

## 🎨 Color Theme

- **Background Dark**: `#0C0C0C`
- **Background Light**: `#F5F5F5`
- **Card Dark**: `#1A1A1A`
- **Card Light**: `#FFFFFF`
- **Primary Gold**: `#EAB308`
- **Accent Gold**: `#F59E0B`
- **Text Primary**: `#FAFAFA` (dark) / `#1A1A1A` (light)
- **Text Secondary**: `#A3A3A3` (dark) / `#666666` (light)

---

## 📊 Performance Metrics

| Metric | Value | Status |
|--------|-------|--------|
| Total Bundle | 214 KB | ✅ Optimized |
| Gzipped Size | 69.26 KB | ✅ Excellent |
| Build Time | 6.49s | ✅ Fast |
| Modules | 460 | ✅ Optimized |
| Sections | 7 (lazy-loaded) | ✅ Code-split |

---

## 🔧 Key Features

### 1. Lazy Loading
All sections use `React.lazy()` for code splitting:
- HomeSection
- AboutSection
- ProjectsSection
- EngineeringHighlightsSection
- GitHubSection
- CertificatesSection
- ContactSection

### 2. Memoization
- Components wrapped with `memo()`
- Expensive calculations use `useMemo()`
- Event handlers use `useCallback()`

### 3. GitHub Integration
- Live profile data
- Contribution graph
- Language statistics
- Streak stats
- Repository count and stars

### 4. Contact Form
- Mailto-based (no backend)
- Email: jagdeepmohanty1807@gmail.com
- Form validation
- Success feedback

### 5. Theme Toggle
- Dark/Light mode
- Persistent theme
- Smooth transitions

---

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

All layouts use `clamp()` for fluid scaling without media queries.

---

## 🚀 Deployment

### Netlify
1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Deploy!

### Vercel
1. Import project
2. Framework: Vite
3. Build command: `npm run build`
4. Output: `dist`
5. Deploy!

### GitHub Pages
1. Build locally: `npm run build`
2. Push `dist` folder to `gh-pages` branch
3. Enable GitHub Pages in settings

---

## 📝 Adding Content

### Add Project
Edit `client/src/data/projects.js`:
```javascript
{
  id: 1,
  title: "Project Name",
  description: "Short description",
  tech_stack: ["React", "Node.js"],
  github_link: "https://github.com/...",
  demo_link: "https://demo.com",
  image_url: "https://image.jpg"
}
```

### Add Certificate
Edit `client/src/data/certificates.js`:
```javascript
{
  id: 1,
  title: "Certificate Name",
  issuer: "Organization",
  date: "January 2024",
  image_url: "https://cert.jpg"
}
```

---

## 🔍 SEO

- ✅ Meta title: "Jagdeep Mohanty | Full Stack Developer"
- ✅ Meta description: Optimized for search engines
- ✅ Open Graph tags for social sharing
- ✅ Twitter card tags
- ✅ Robots meta tag: index, follow
- ✅ Semantic HTML structure

---

## 🛠️ Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📦 Dependencies

### Core
- React 19.2.0
- React DOM 19.2.0
- Vite 7.3.1

### UI & Animation
- Framer Motion 12.34.1
- React Icons 5.5.0

### Data Visualization
- Chart.js 4.5.1
- React ChartJS 2 5.3.1

---

## ✅ Production Checklist

- ✅ All sections lazy-loaded
- ✅ Memoization applied
- ✅ Bundle optimized
- ✅ SEO configured
- ✅ Mobile responsive
- ✅ Dark/Light theme
- ✅ GitHub stats live
- ✅ Contact form working
- ✅ Error boundaries
- ✅ Accessibility compliant
- ✅ No console logs
- ✅ Production build tested

---

## 🎯 Next Steps

1. **Deploy**: Push to Netlify/Vercel
2. **Monitor**: Check Lighthouse scores
3. **Share**: Send portfolio link to recruiters
4. **Update**: Add new projects and certificates
5. **Maintain**: Keep dependencies updated

---

## 📞 Contact

Email: jagdeepmohanty1807@gmail.com
GitHub: https://github.com/JagdeepMohanty
Portfolio: https://jagdeepmohanty.netlify.app

---

**Status**: ✅ Production Ready | 🚀 Ready for Deployment
