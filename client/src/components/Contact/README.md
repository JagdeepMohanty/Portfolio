# Contact Component

A production-ready modern "Get In Touch" section with glassmorphism design, smooth animations, and full responsiveness.

## Usage

```jsx
import Contact from './components/Contact/Contact';

function App() {
  return (
    <div>
      <Contact />
    </div>
  );
}
```

## Features

✅ **Glassmorphism Design** - Modern glass-effect cards with backdrop blur
✅ **Fully Responsive** - Desktop, tablet, and mobile optimized
✅ **Smooth Animations** - Fade-in, hover, and success message animations
✅ **Internal CSS Only** - No external CSS files required
✅ **Form Validation** - Built-in HTML5 validation
✅ **Success Message** - Animated success feedback on form submission
✅ **Social Icons** - GitHub, LinkedIn, and Email with hover effects
✅ **Contact Info Card** - Email, GitHub, LinkedIn, and Location
✅ **Modern Icons** - Using react-icons library

## Component Structure

- **Header Section**: "Get In Touch" heading with subheading
- **Left Card**: Contact information with clickable links
- **Right Card**: Contact form with name, email, and message fields
- **Bottom Row**: Social media icons with hover animations

## Styling

All styles are internal using:
- CSS-in-JS styles object
- `<style>` tag for animations and media queries
- No external CSS files

## Customization

Update the contact information in the component:
- Email: `jagdeep@email.com`
- GitHub: `https://github.com/JagdeepMohanty`
- LinkedIn: `https://linkedin.com/in/jagdeep`
- Location: `India`

## Color Scheme

- Background: `#0f172a`
- Card: `rgba(17, 24, 39, 0.6)` with backdrop blur
- Accent: `#3b82f6` (Blue)
- Accent Secondary: `#06b6d4` (Cyan)
- Text Primary: `#e5e7eb`
- Text Secondary: `#9ca3af`
- Border: `rgba(255,255,255,0.08)`

## Responsive Breakpoints

- Desktop: > 1024px (Two column layout)
- Tablet: 768px - 1024px (Stacked layout)
- Mobile: < 768px (Stacked layout with adjusted padding)
