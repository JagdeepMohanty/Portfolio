# Customization Guide

## Personalizing Your Portfolio

### 1. Update Personal Information

#### Home Page (`client/src/pages/Home.jsx`)
```jsx
// Line 13-15: Update your name and title
<h1 className="hero-title">
  Hi, I'm <span className="highlight">John Doe</span>
</h1>
<h2 className="hero-subtitle">Full Stack Developer</h2>

// Line 16-19: Update your introduction
<p className="hero-description">
  Your personal introduction here...
</p>

// Line 21-27: Update resume and GitHub links
<a href="/resume.pdf" download className="btn-primary">
<a href="https://github.com/yourusername" target="_blank">
```

#### Footer (`client/src/components/Footer.jsx`)
```jsx
// Line 9-17: Update social links
<a href="https://github.com/yourusername" target="_blank">
<a href="https://linkedin.com/in/yourusername" target="_blank">
<a href="mailto:your.email@example.com">
```

#### About Page (`client/src/pages/About.jsx`)
```jsx
// Line 20-30: Update about text
<p className="about-text">
  Your background and experience...
</p>

// Line 56-59: Update education
<h3 className="education-degree">Your Degree</h3>
<p className="education-school">Your University</p>
<p className="education-year">2018 - 2022</p>
```

### 2. Customize Colors

Edit `client/src/index.css`:

```css
:root {
  --bg-primary: #0C0C0C;        /* Main background */
  --bg-card: #1A1A1A;           /* Card background */
  --gold-primary: #EAB308;      /* Primary gold */
  --gold-accent: #F59E0B;       /* Accent gold */
  --text-primary: #FAFAFA;      /* Main text */
  --text-secondary: #A3A3A3;    /* Secondary text */
}
```

### 3. Add Your Resume

1. Place your resume PDF in `client/public/resume.pdf`
2. Or update the path in Home.jsx:
```jsx
<a href="/path/to/your/resume.pdf" download>
```

### 4. Customize Skills

Edit `client/src/pages/About.jsx`:

```jsx
const skills = [
  { name: 'React', icon: <FaReact /> },
  { name: 'Your Skill', icon: <YourIcon /> },
  // Add more skills...
];
```

Available icon libraries:
- `react-icons/fa` - Font Awesome
- `react-icons/si` - Simple Icons
- `react-icons/md` - Material Design

### 5. Update Navbar Logo

Edit `client/src/components/Navbar.jsx`:

```jsx
// Line 19-21: Change logo text
<Link to="/" className="logo">
  <span className="logo-text">Your Name</span>
</Link>
```

### 6. Modify Page Titles

Edit `client/src/pages/*.jsx`:

```jsx
// Change section titles
<h1 className="section-title">Your Custom Title</h1>
```

### 7. Add Custom Fonts

Edit `client/index.html`:

```html
<link href="https://fonts.googleapis.com/css2?family=YourFont:wght@400;700&display=swap" rel="stylesheet">
```

Then update `client/src/index.css`:

```css
body {
  font-family: 'YourFont', sans-serif;
}
```

### 8. Customize Animations

Edit animation duration in component files:

```jsx
// Slower animation
transition={{ duration: 1.2 }}

// Faster animation
transition={{ duration: 0.3 }}

// Add delay
transition={{ delay: 0.5, duration: 0.8 }}
```

### 9. Add More Pages

1. Create new page in `client/src/pages/NewPage.jsx`
2. Add route in `client/src/App.jsx`:
```jsx
<Route path="/newpage" element={<NewPage />} />
```
3. Add link in `client/src/components/Navbar.jsx`:
```jsx
{ name: 'New Page', path: '/newpage' }
```

### 10. Customize Card Styles

Edit `client/src/index.css`:

```css
.card {
  background: var(--bg-card);
  border-radius: 12px;        /* Change corner radius */
  padding: 24px;              /* Change padding */
  border: 1px solid rgba(234, 179, 8, 0.1);
}

.card:hover {
  transform: translateY(-5px);  /* Change hover lift */
  box-shadow: 0 0 20px rgba(234, 179, 8, 0.3);  /* Change glow */
}
```

### 11. Add GitHub Stats

Install package:
```bash
npm install react-github-calendar
```

Add to About page:
```jsx
import GitHubCalendar from 'react-github-calendar';

<GitHubCalendar username="yourusername" />
```

### 12. Add Contact Information

Edit `client/src/pages/Contact.jsx` to add more fields:

```jsx
<div className="form-group">
  <label htmlFor="phone">Phone</label>
  <input type="tel" id="phone" name="phone" />
</div>
```

### 13. Customize Button Styles

Edit `client/src/index.css`:

```css
.btn-primary {
  background: linear-gradient(135deg, var(--gold-primary), var(--gold-accent));
  padding: 12px 32px;           /* Change size */
  border-radius: 8px;           /* Change corner radius */
  font-weight: 600;
}
```

### 14. Add Loading States

Customize loader in `client/src/index.css`:

```css
.loader {
  width: 50px;                  /* Change size */
  height: 50px;
  border: 4px solid var(--bg-card);
  border-top: 4px solid var(--gold-primary);
}
```

### 15. Mobile Responsiveness

Adjust breakpoints in CSS files:

```css
@media (max-width: 768px) {
  /* Tablet styles */
}

@media (max-width: 480px) {
  /* Mobile styles */
}
```

## Backend Customization

### 1. Add New API Endpoints

Create new route file in `server/routes/`:

```python
from flask import Blueprint, jsonify

new_bp = Blueprint('new', __name__)

@new_bp.route('/endpoint', methods=['GET'])
def get_data():
    return jsonify({"data": "value"}), 200
```

Register in `server/main.py`:
```python
from routes.new import new_bp
app.register_blueprint(new_bp, url_prefix='/api')
```

### 2. Add Data Validation

Edit model files in `server/models/`:

```python
from pydantic import BaseModel, validator

class YourModel(BaseModel):
    field: str
    
    @validator('field')
    def validate_field(cls, v):
        if len(v) < 3:
            raise ValueError('Too short')
        return v
```

### 3. Add Email Notifications

Install package:
```bash
pip install flask-mail
```

Configure in `server/main.py`:
```python
from flask_mail import Mail, Message

app.config['MAIL_SERVER'] = 'smtp.gmail.com'
mail = Mail(app)
```

### 4. Add Rate Limiting

Install package:
```bash
pip install flask-limiter
```

Add to `server/main.py`:
```python
from flask_limiter import Limiter

limiter = Limiter(app, default_limits=["200 per day"])
```

## Tips for Best Results

1. **Keep it Simple**: Don't overcomplicate the design
2. **Test Responsiveness**: Check on different devices
3. **Optimize Images**: Use compressed images for faster loading
4. **Update Content**: Keep projects and certificates current
5. **Use Real Data**: Replace sample data with your actual work
6. **Test Forms**: Ensure contact form works properly
7. **Check Links**: Verify all external links work
8. **SEO**: Update meta tags in index.html
9. **Performance**: Monitor loading times
10. **Accessibility**: Ensure good color contrast

## Need Help?

- Check component files for inline comments
- Review the README.md for setup instructions
- Test changes locally before deploying
- Use browser DevTools for debugging
