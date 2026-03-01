# Portfolio Quick Reference Guide

## 🚀 Quick Start

```bash
# Development
cd client
npm install
npm run dev

# Production Build
npm run build

# Preview Production Build
npm run preview
```

---

## 📁 Project Structure

```
client/src/
├── components/       # Reusable UI components
├── sections/         # Page sections (Home, About, Projects, GitHub, Contact)
├── data/            # Static data (projects, certificates)
├── services/        # API services (GitHub)
├── hooks/           # Custom React hooks
├── constants/       # Configuration and theme
├── types/           # TypeScript type definitions
├── App.tsx          # Main app component
└── main.tsx         # Entry point
```

---

## 🎨 Navigation Sections

1. **Home** - Hero section with name and title
2. **About** - Bio, skills, education, resume download
3. **Projects** - Project showcase with tech stack
4. **GitHub** - Live GitHub stats and analytics
5. **Contact** - Contact form and social links

---

## 🔧 Key Files to Customize

### Add Projects
**File:** `client/src/data/projects.ts`

```typescript
export const projects: Project[] = [
  {
    id: 1,
    title: "Your Project",
    description: "Description here",
    tech_stack: ["React", "Node.js"],
    github_link: "https://github.com/username/repo",
    demo_link: "https://demo.com",
    image_url: "https://example.com/image.jpg"
  }
];
```

### Update GitHub Username
**File:** `client/src/constants/config.ts`

```typescript
export const APP_CONFIG = {
  githubUsername: 'YourUsername'
};
```

### Update Contact Info
**File:** `client/src/sections/ContactSection.tsx`

Update the `CONTACT_INFO` array with your details.

### Update Resume
**File:** `client/public/resume.pdf`

Replace with your resume PDF.

---

## 🎨 Theme Colors

```typescript
Background: #0C0C0C
Card: #1A1A1A
Primary Gold: #EAB308
Accent Gold: #F59E0B
Text Primary: #FAFAFA
Text Secondary: #A3A3A3
```

**File:** `client/src/constants/theme.ts`

---

## 📱 Responsive Breakpoints

- **Mobile:** < 768px
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px

All sections use:
```typescript
maxWidth: '1100px'
padding: 'clamp(20px, 4vw, 40px)'
```

---

## 🚀 Deployment to Netlify

1. Push code to GitHub
2. Log in to [Netlify](https://netlify.com)
3. Add new site from Git
4. Configure:
   - **Base directory:** `client`
   - **Build command:** `npm run build`
   - **Publish directory:** `client/dist`
5. Deploy!

---

## 🔍 Common Tasks

### Add a New Section
1. Create `client/src/sections/NewSection.tsx`
2. Import in `client/src/App.tsx`
3. Add to navigation in `client/src/components/Navbar.tsx`

### Change Colors
Edit `client/src/constants/theme.ts`

### Update Social Links
Edit:
- `client/src/components/Navbar.tsx` (navbar social icons)
- `client/src/components/Footer.tsx` (footer social icons)
- `client/src/sections/ContactSection.tsx` (contact info)

### Add New Hook
Create in `client/src/hooks/useYourHook.ts`

### Add New Service
Create in `client/src/services/yourService.ts`

---

## 🐛 Troubleshooting

### Build Fails
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### TypeScript Errors
```bash
# Check types
npm run build
```

### Dev Server Issues
```bash
# Restart dev server
npm run dev
```

---

## 📊 Performance Tips

1. **Images:** Use optimized images (WebP format)
2. **Lazy Loading:** Already implemented for sections
3. **Code Splitting:** Automatic with Vite
4. **Caching:** GitHub API has 5-minute cache
5. **Animations:** Keep under 0.3s duration

---

## ✅ Pre-Deployment Checklist

- [ ] Update projects in `data/projects.ts`
- [ ] Add resume PDF to `public/resume.pdf`
- [ ] Update GitHub username in `constants/config.ts`
- [ ] Update contact information
- [ ] Test all links (GitHub, LinkedIn, Email)
- [ ] Test form submission
- [ ] Run `npm run build` successfully
- [ ] Test responsive design (mobile, tablet, desktop)
- [ ] Check all animations work smoothly
- [ ] Verify all sections scroll correctly

---

## 🎯 Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite 7.3** - Build tool
- **Framer Motion** - Animations
- **React Icons** - Icon library
- **Chart.js** - GitHub stats charts

---

## 📝 Notes

- All components use inline styles (no CSS files)
- All components are TypeScript (.tsx)
- All components use React.memo for optimization
- Smooth scroll behavior enabled globally
- SEO meta tags included
- Netlify Forms for contact form

---

## 🔗 Important Links

- **GitHub:** https://github.com/JagdeepMohanty
- **LinkedIn:** https://www.linkedin.com/in/jagdeepmohanty
- **Netlify:** https://netlify.com

---

## 📞 Support

For issues or questions:
1. Check `REFACTOR_COMPLETE.md` for detailed documentation
2. Review component files for inline comments
3. Check console for error messages
4. Verify all dependencies are installed

---

**Last Updated:** 2024
**Version:** 1.0.0
**Status:** Production Ready ✅
