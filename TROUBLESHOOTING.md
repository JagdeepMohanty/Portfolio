# 🔧 Quick Troubleshooting Guide

## Common Issues & Solutions

### 1. React Error #130
**Status**: ✅ FIXED

**What was wrong:**
- GitHubCalendar import was returning an object instead of a component

**How it was fixed:**
- Implemented dynamic import with `import('react-github-calendar')`
- Added proper component validation
- Conditional rendering with fallback UI

**Code:**
```javascript
const [GitHubCalendar, setGitHubCalendar] = useState(null);

useEffect(() => {
  import('react-github-calendar')
    .then((module) => {
      const CalendarComponent = module.default || module.GitHubCalendar || module;
      if (typeof CalendarComponent === 'function' || 
          (CalendarComponent && typeof CalendarComponent.$$typeof !== 'undefined')) {
        setGitHubCalendar(() => CalendarComponent);
      }
    })
    .catch((error) => {
      console.warn('Failed to load GitHubCalendar:', error);
    });
}, []);
```

---

### 2. GitHub Calendar Theme Error
**Status**: ✅ FIXED

**Error Message:**
```
theme.dark must contain exactly 2 or 5 colors, X passed.
theme.light must contain exactly 2 or 5 colors, X passed.
```

**Solution:**
- Created stable theme object OUTSIDE component
- Used exactly 5 colors for both dark and light
- Removed maxLevel property

**Code:**
```javascript
const GITHUB_THEME = {
  dark: [
    '#0d1117',  // level 0
    '#3a2a00',  // level 1
    '#7a5a00',  // level 2
    '#eab308',  // level 3
    '#facc15'   // level 4
  ],
  light: [
    '#0d1117',
    '#3a2a00',
    '#7a5a00',
    '#eab308',
    '#facc15'
  ]
};

// Usage
<GitHubCalendar
  username="JagdeepMohanty"
  theme={GITHUB_THEME}
  blockSize={14}
  blockMargin={4}
  fontSize={14}
/>
```

**Important Rules:**
- Without maxLevel → Use exactly 5 colors
- With maxLevel={3} → Use exactly 4 colors
- With maxLevel={4} → Use exactly 5 colors
- Never mix incorrectly

---

### 3. Build Errors

**If build fails:**

```bash
# Clear cache
rm -rf node_modules/.cache
rm -rf dist

# Reinstall dependencies
npm install

# Rebuild
npm run build
```

---

### 4. GitHub API Rate Limit

**Error:** 403 Forbidden or rate limit exceeded

**Solution:**
- GitHub API allows 60 requests/hour (unauthenticated)
- Wait 1 hour or use authenticated requests
- Data is cached after first successful fetch

**To add authentication (optional):**
```javascript
const response = await fetch(url, {
  headers: {
    'Authorization': `token YOUR_GITHUB_TOKEN`
  }
});
```

---

### 5. Calendar Not Loading

**Symptoms:**
- "Loading contribution calendar..." message persists
- Calendar doesn't appear

**Solutions:**

1. **Check network connection**
2. **Verify GitHub username is correct**
3. **Check browser console for errors**
4. **Clear browser cache**

**Debug:**
```javascript
// Add to useEffect
console.log('GitHubCalendar loaded:', !!GitHubCalendar);
```

---

### 6. Charts Not Rendering

**Symptoms:**
- Empty space where charts should be
- No data displayed

**Solutions:**

1. **Check data is being fetched:**
```javascript
console.log('Contribution Data:', contributionData);
console.log('Stats:', stats);
```

2. **Verify data format:**
```javascript
// Contribution data should be:
[
  { date: 'Jan 1', commits: 5 },
  { date: 'Jan 2', commits: 3 },
  ...
]

// Language data should be:
[
  ['JavaScript', 10],
  ['Python', 5],
  ...
]
```

3. **Check ResponsiveContainer parent has height**

---

### 7. Deployment Issues

**Netlify Build Fails:**

1. **Check build settings:**
   - Base directory: `client`
   - Build command: `npm run build`
   - Publish directory: `dist`

2. **Check netlify.toml:**
```toml
[build]
  base = "client"
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

3. **Environment variables:**
   - No environment variables needed for basic setup
   - Add GitHub token if using authenticated API

---

### 8. Theme Not Persisting

**Issue:** Theme resets on page reload

**Solution:** Already implemented in App.jsx
```javascript
const [theme, setTheme] = useState(() => {
  return localStorage.getItem('theme') || 'dark';
});

useEffect(() => {
  localStorage.setItem('theme', theme);
}, [theme]);
```

---

### 9. Mobile Responsiveness Issues

**Solutions:**

1. **Check viewport meta tag in index.html:**
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

2. **Test responsive breakpoints:**
   - Mobile: < 768px
   - Tablet: 768px - 1024px
   - Desktop: > 1024px

3. **Use browser DevTools device emulation**

---

### 10. Performance Issues

**Slow loading:**

1. **Optimize images:**
   - Use WebP format
   - Compress images
   - Use appropriate sizes

2. **Lazy load components:**
```javascript
const LazyComponent = lazy(() => import('./Component'));
```

3. **Memoize expensive calculations:**
```javascript
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

---

## Quick Fixes

### Clear Everything and Start Fresh:
```bash
# Navigate to client folder
cd client

# Remove node_modules and cache
rm -rf node_modules
rm -rf .cache
rm -rf dist

# Reinstall
npm install

# Build
npm run build

# Test locally
npm run preview
```

---

## Verification Checklist

Before deploying, verify:

- [ ] `npm run build` succeeds
- [ ] No console errors in browser
- [ ] All sections load correctly
- [ ] GitHub data displays
- [ ] Charts render properly
- [ ] Calendar shows contributions
- [ ] Theme toggle works
- [ ] Mobile view looks good
- [ ] All links work
- [ ] Forms submit correctly

---

## Getting Help

1. **Check browser console** (F12)
2. **Check build logs** in terminal
3. **Verify all dependencies** are installed
4. **Test in incognito mode** (rules out cache issues)
5. **Check GitHub API status**: https://www.githubstatus.com/

---

## Contact & Support

If issues persist:
1. Check the PRODUCTION_READY_SUMMARY.md
2. Review component code
3. Verify API responses
4. Test with different browsers

---

**Last Updated**: 2024
**Status**: All Known Issues Resolved ✅
