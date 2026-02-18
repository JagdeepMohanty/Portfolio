# Portfolio Setup Checklist

## Initial Setup

### Prerequisites
- [ ] Node.js installed (v16+)
- [ ] Python installed (v3.8+)
- [ ] MongoDB installed or Atlas account created
- [ ] Git installed (for deployment)

### Backend Setup
- [ ] Navigate to `server` directory
- [ ] Create virtual environment: `python -m venv venv`
- [ ] Activate virtual environment
- [ ] Install dependencies: `pip install -r requirements.txt`
- [ ] Copy `.env.example` to `.env`
- [ ] Update `MONGO_URI` in `.env`
- [ ] Update `GITHUB_USERNAME` in `.env`
- [ ] Run seed script: `python seed_data.py` (optional)
- [ ] Start server: `python main.py`
- [ ] Verify server at http://localhost:5000

### Frontend Setup
- [ ] Navigate to `client` directory
- [ ] Install dependencies: `npm install`
- [ ] Copy `.env.example` to `.env`
- [ ] Verify `VITE_API_URL` in `.env`
- [ ] Start dev server: `npm run dev`
- [ ] Verify frontend at http://localhost:5173

### Testing
- [ ] Backend health check: http://localhost:5000/api/health
- [ ] Run API tests: `python server/test_api.py`
- [ ] Test all pages in browser
- [ ] Test mobile responsiveness
- [ ] Test contact form submission
- [ ] Verify projects load correctly
- [ ] Verify certificates load correctly

## Customization

### Personal Information
- [ ] Update name in `client/src/pages/Home.jsx`
- [ ] Update title/role in `client/src/pages/Home.jsx`
- [ ] Update introduction in `client/src/pages/Home.jsx`
- [ ] Update about text in `client/src/pages/About.jsx`
- [ ] Update education in `client/src/pages/About.jsx`
- [ ] Update skills if needed in `client/src/pages/About.jsx`

### Links and Assets
- [ ] Update GitHub link in `client/src/pages/Home.jsx`
- [ ] Update GitHub link in `client/src/components/Footer.jsx`
- [ ] Update LinkedIn link in `client/src/components/Footer.jsx`
- [ ] Update email in `client/src/components/Footer.jsx`
- [ ] Add resume PDF to `client/public/resume.pdf`
- [ ] Update logo text in `client/src/components/Navbar.jsx`

### Content
- [ ] Add your projects via API or database
- [ ] Add your certificates via API or database
- [ ] Update project images with real URLs
- [ ] Update certificate images with real URLs
- [ ] Test all external links work

### Styling (Optional)
- [ ] Customize colors in `client/src/index.css`
- [ ] Adjust animations if desired
- [ ] Modify card styles if needed
- [ ] Update fonts if preferred

## Pre-Deployment

### Code Quality
- [ ] Remove console.logs
- [ ] Test all features work
- [ ] Check for broken links
- [ ] Verify mobile responsiveness
- [ ] Test form validation
- [ ] Check error handling

### Environment Variables
- [ ] Backend `.env` configured correctly
- [ ] Frontend `.env` configured correctly
- [ ] No sensitive data in code
- [ ] `.env` files in `.gitignore`

### Git Repository
- [ ] Initialize git: `git init`
- [ ] Add all files: `git add .`
- [ ] Commit: `git commit -m "Initial commit"`
- [ ] Create GitHub repository
- [ ] Add remote: `git remote add origin <url>`
- [ ] Push: `git push -u origin main`

## Deployment

### MongoDB Atlas
- [ ] Create MongoDB Atlas account
- [ ] Create free cluster
- [ ] Create database user
- [ ] Whitelist IP addresses (0.0.0.0/0)
- [ ] Get connection string
- [ ] Test connection locally

### Backend (Render)
- [ ] Create Render account
- [ ] Create new Web Service
- [ ] Connect GitHub repository
- [ ] Set root directory to `server`
- [ ] Set build command: `pip install -r requirements.txt`
- [ ] Set start command: `gunicorn main:app`
- [ ] Add environment variables:
  - [ ] `MONGO_URI`
  - [ ] `DATABASE_NAME`
  - [ ] `GITHUB_USERNAME`
  - [ ] `PORT`
- [ ] Deploy and verify
- [ ] Copy deployed URL

### Frontend (Vercel)
- [ ] Create Vercel account
- [ ] Import GitHub repository
- [ ] Set root directory to `client`
- [ ] Set framework preset to Vite
- [ ] Add environment variable:
  - [ ] `VITE_API_URL` (Render backend URL + /api)
- [ ] Deploy and verify
- [ ] Test all features on deployed site

## Post-Deployment

### Verification
- [ ] Visit deployed frontend URL
- [ ] Test all pages load correctly
- [ ] Test navigation works
- [ ] Test projects load from API
- [ ] Test certificates load from API
- [ ] Test contact form submission
- [ ] Test on mobile device
- [ ] Test on different browsers
- [ ] Verify all links work
- [ ] Check console for errors

### Optional Enhancements
- [ ] Add custom domain (Vercel)
- [ ] Set up analytics
- [ ] Add SEO meta tags
- [ ] Create sitemap
- [ ] Add favicon
- [ ] Set up monitoring
- [ ] Enable HTTPS (automatic)
- [ ] Add rate limiting
- [ ] Set up email notifications

## Maintenance

### Regular Updates
- [ ] Update projects regularly
- [ ] Add new certificates
- [ ] Keep dependencies updated
- [ ] Monitor server logs
- [ ] Check for security updates
- [ ] Backup database regularly
- [ ] Review and respond to contacts

### Performance
- [ ] Monitor loading times
- [ ] Optimize images
- [ ] Check API response times
- [ ] Review error logs
- [ ] Monitor database size

## Troubleshooting

### Common Issues
- [ ] MongoDB connection issues → Check connection string
- [ ] CORS errors → Verify backend URL in frontend .env
- [ ] Port conflicts → Change ports in .env files
- [ ] Build failures → Check logs for missing dependencies
- [ ] API not responding → Verify backend is running
- [ ] Images not loading → Check image URLs are valid

### Getting Help
- [ ] Check README.md
- [ ] Review QUICKSTART.md
- [ ] Read DEPLOYMENT.md
- [ ] Check CUSTOMIZATION.md
- [ ] Review error logs
- [ ] Test API with test_api.py script

## Success Criteria

Your portfolio is ready when:
- ✅ All pages load without errors
- ✅ Projects display correctly
- ✅ Certificates display correctly
- ✅ Contact form works
- ✅ Mobile responsive
- ✅ All links work
- ✅ Deployed and accessible
- ✅ Personal information updated
- ✅ Resume downloadable
- ✅ Professional appearance

---

**Congratulations! Your portfolio is complete! 🎉**
