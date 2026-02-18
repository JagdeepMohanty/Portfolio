# Deployment Guide

## Frontend Deployment (Vercel)

### Step 1: Prepare Repository
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo-url>
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

5. Add Environment Variables:
   - `VITE_API_URL`: Your backend API URL (e.g., https://your-api.onrender.com/api)

6. Click "Deploy"

### Step 3: Custom Domain (Optional)
- Go to Project Settings → Domains
- Add your custom domain

---

## Backend Deployment (Render)

### Step 1: Prepare for Deployment

Ensure `requirements.txt` includes gunicorn:
```
gunicorn==21.2.0
```

### Step 2: Deploy to Render

1. Go to [render.com](https://render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure service:
   - **Name**: portfolio-api
   - **Root Directory**: `server`
   - **Environment**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn main:app`

5. Add Environment Variables:
   - `MONGO_URI`: Your MongoDB connection string
   - `DATABASE_NAME`: portfolio_db
   - `GITHUB_USERNAME`: Your GitHub username
   - `PORT`: 5000

6. Click "Create Web Service"

### Step 3: Get API URL

After deployment, copy your Render URL (e.g., https://portfolio-api.onrender.com)

---

## MongoDB Setup (MongoDB Atlas)

### Step 1: Create Cluster

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Whitelist IP addresses (0.0.0.0/0 for all IPs)

### Step 2: Get Connection String

1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your database user password

Example:
```
mongodb+srv://username:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

### Step 3: Update Environment Variables

Update `MONGO_URI` in Render with your Atlas connection string.

---

## Update Frontend with Backend URL

After backend is deployed:

1. Go to Vercel project settings
2. Update `VITE_API_URL` environment variable with your Render URL
3. Redeploy frontend

---

## Alternative Deployment Options

### Frontend Alternatives
- **Netlify**: Similar to Vercel
- **GitHub Pages**: For static sites
- **AWS S3 + CloudFront**: For AWS users

### Backend Alternatives
- **Heroku**: Easy deployment (paid)
- **Railway**: Similar to Render
- **AWS EC2**: More control, requires setup
- **DigitalOcean App Platform**: Simple deployment

---

## Post-Deployment Checklist

- [ ] Frontend is accessible
- [ ] Backend API is responding
- [ ] MongoDB connection is working
- [ ] Projects are loading
- [ ] Certificates are loading
- [ ] Contact form is working
- [ ] GitHub integration is working
- [ ] All links are updated
- [ ] Resume download is working
- [ ] Mobile responsive design is working

---

## Monitoring and Maintenance

### Render
- Check logs in Render dashboard
- Monitor service health
- Set up alerts

### Vercel
- Check deployment logs
- Monitor analytics
- Set up custom domain

### MongoDB Atlas
- Monitor database metrics
- Set up backup schedule
- Review security settings

---

## Troubleshooting

### CORS Issues
Add your Vercel domain to Flask CORS configuration in `main.py`:
```python
CORS(app, origins=["https://your-domain.vercel.app"])
```

### Environment Variables Not Working
- Ensure variables are set in deployment platform
- Redeploy after adding variables
- Check variable names match exactly

### Database Connection Failed
- Verify MongoDB Atlas IP whitelist
- Check connection string format
- Ensure database user has correct permissions

### Build Failures
- Check build logs
- Verify all dependencies are in requirements.txt/package.json
- Ensure correct Node.js/Python versions

---

## Security Best Practices

1. **Never commit .env files**
2. **Use environment variables for secrets**
3. **Enable HTTPS** (automatic on Vercel/Render)
4. **Restrict MongoDB IP whitelist** (if possible)
5. **Use strong database passwords**
6. **Keep dependencies updated**
7. **Enable rate limiting** (for production)

---

## Cost Considerations

### Free Tier Limits

**Vercel Free:**
- 100 GB bandwidth/month
- Unlimited projects
- Automatic HTTPS

**Render Free:**
- 750 hours/month
- Sleeps after 15 min inactivity
- 512 MB RAM

**MongoDB Atlas Free:**
- 512 MB storage
- Shared cluster
- No backup

### Upgrade When Needed
- High traffic → Upgrade Vercel/Render
- More data → Upgrade MongoDB
- Better performance → Paid tiers
