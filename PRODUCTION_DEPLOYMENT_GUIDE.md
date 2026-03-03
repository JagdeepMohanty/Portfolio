# PRODUCTION DEPLOYMENT GUIDE

## Quick Start (5 minutes)

### Frontend Deployment (Netlify)

```bash
# 1. Build frontend
cd client
npm run build

# 2. Deploy to Netlify
# Option A: Via Dashboard
# - Go to https://app.netlify.com
# - Click "Add new site" → "Import an existing project"
# - Connect GitHub repository
# - Build settings:
#   - Base directory: client
#   - Build command: npm run build
#   - Publish directory: dist
# - Deploy

# Option B: Via CLI
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

### Backend Deployment (PM2)

```bash
# 1. Install PM2 globally
npm install -g pm2

# 2. Setup environment
cd server
cp .env.example .env
# Edit .env with production values:
# - NODE_ENV=production
# - GMAIL_USER=your-email@gmail.com
# - GMAIL_PASS=your-app-password
# - ALLOWED_ORIGINS=https://your-domain.com

# 3. Install dependencies
npm install

# 4. Start with PM2
pm2 start ecosystem.config.js --env production

# 5. Save PM2 config
pm2 save

# 6. Setup auto-restart on reboot
pm2 startup
```

---

## Environment Variables

### Frontend (.env - if needed)
```
VITE_API_URL=https://your-backend-domain.com
```

### Backend (.env - REQUIRED)
```
PORT=5000
NODE_ENV=production
GMAIL_USER=your-email@gmail.com
GMAIL_PASS=your-app-password
ALLOWED_ORIGINS=https://your-domain.com,https://www.your-domain.com
```

---

## Verification

### Check Frontend
```bash
# Visit your Netlify domain
# Should see portfolio homepage
# Check browser console: no errors
```

### Check Backend
```bash
# Health check
curl https://your-backend-domain.com/health

# Expected response:
# {
#   "status": "Server is running",
#   "environment": "production",
#   "timestamp": "2024-01-15T10:30:00.000Z"
# }
```

### Test Contact Form
```bash
# Fill contact form on frontend
# Submit message
# Check email inbox for submission
# Verify no errors in backend logs
```

---

## Monitoring

### View Logs
```bash
pm2 logs portfolio-server
```

### Monitor Resources
```bash
pm2 monit
```

### Restart Server
```bash
pm2 restart portfolio-server
```

### Stop Server
```bash
pm2 stop portfolio-server
```

---

## Troubleshooting

### Contact Form Not Working
1. Check backend is running: `pm2 list`
2. Check health endpoint: `curl http://localhost:5000/health`
3. Check CORS: Verify frontend domain in ALLOWED_ORIGINS
4. Check rate limiting: Wait 1 minute between requests
5. Check logs: `pm2 logs portfolio-server`

### GitHub Dashboard Not Loading
1. Check internet connection
2. Check GitHub API rate limit: `curl https://api.github.com/rate_limit`
3. Clear browser cache
4. Hard refresh (Ctrl+Shift+R)

### Email Not Sending
1. Check Gmail credentials in .env
2. Enable "Less secure app access" in Gmail
3. Use App Password instead of regular password
4. Check logs: `pm2 logs portfolio-server`

---

## Security Checklist

- [ ] .env file created with production values
- [ ] ALLOWED_ORIGINS updated with your domain
- [ ] Gmail credentials configured
- [ ] NODE_ENV set to production
- [ ] Rate limiting active (5 req/min)
- [ ] CORS whitelist enforced
- [ ] No console errors
- [ ] Health check responding

---

## Performance Optimization

### Frontend
- ✅ Lazy loading enabled
- ✅ Code splitting active
- ✅ Minification enabled
- ✅ Gzip compression enabled (Netlify)

### Backend
- ✅ Clustering enabled (max instances)
- ✅ Memory limit: 500MB
- ✅ Auto-restart on crash
- ✅ Request size limit: 10KB

---

## Backup & Recovery

### Backup Database (if using)
```bash
# Not applicable - frontend only with static data
```

### Backup Environment
```bash
# Keep .env file safe
# Store in secure location
# Never commit to git
```

### Rollback
```bash
# Netlify: Click previous deploy
# Backend: pm2 restart portfolio-server
```

---

## Scaling

### Increase Rate Limit
Edit `server/middleware/rateLimiter.js`:
```javascript
app.use(rateLimitMiddleware(10, 60000)); // 10 req/min
```

### Increase Memory Limit
Edit `ecosystem.config.js`:
```javascript
max_memory_restart: '1G' // 1GB instead of 500MB
```

### Add More Instances
Edit `ecosystem.config.js`:
```javascript
instances: 4 // Fixed number instead of 'max'
```

---

## Support

### Common Issues
1. **Port already in use**: Change PORT in .env
2. **CORS errors**: Update ALLOWED_ORIGINS
3. **Rate limit exceeded**: Wait 1 minute
4. **Email not sending**: Check Gmail credentials

### Logs Location
```bash
pm2 logs portfolio-server
pm2 logs portfolio-server --err
```

---

## Final Checklist

- [ ] Frontend deployed to Netlify
- [ ] Backend running with PM2
- [ ] Environment variables configured
- [ ] Health check responding
- [ ] Contact form working
- [ ] GitHub dashboard loading
- [ ] No console errors
- [ ] Rate limiting active
- [ ] CORS configured
- [ ] Monitoring setup

---

**Status**: 🚀 READY FOR PRODUCTION  
**Last Updated**: 2024
