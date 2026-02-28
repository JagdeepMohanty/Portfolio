# Contact Component

A production-ready modern "Get In Touch" section with glassmorphism design, smooth animations, and full responsiveness using **internal CSS only**.

## Files

- **Contact.jsx** - React component with internal CSS (styles object + `<style>` tag)

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

✅ **Internal CSS Only** - All styling inside the component (no external CSS file)  
✅ **Glassmorphism Design** - Modern glass-effect cards with backdrop blur  
✅ **Fully Responsive** - Desktop (50/50 split), tablet & mobile (stacked)  
✅ **Smooth Animations** - Fade-in, hover, and success message animations  
✅ **Form Validation** - Built-in HTML5 validation  
✅ **Success Message** - Animated 3-second success feedback  
✅ **Contact Info Card** - Email, GitHub, LinkedIn, Location with icons  
✅ **Social Icons Row** - Bottom row with hover scale animation  
✅ **Modern Icons** - Using react-icons (FaGithub, FaLinkedin, FaEnvelope, etc.)  

## Component Structure

### Header Section
- Heading: "Get In Touch" with gradient text
- Subheading with project invitation
- Center aligned

### Left Card - Contact Info
- Email (clickable mailto link)
- GitHub (clickable external link)
- LinkedIn (clickable external link)
- Location (static display)
- Hover effects with glow and slide animation (translateX 5px)

### Right Card - Contact Form
- Name input with user icon
- Email input with envelope icon
- Message textarea with paper plane icon
- Icons positioned inside inputs (left side)
- Focus glow animation with blue border
- Submit button with gradient and hover lift
- Success message overlay

### Bottom Row - Social Icons
- GitHub, LinkedIn, Email icons
- Circular glassmorphism design (50px × 50px)
- Scale animation on hover (1.15x)
- Glow effect

## Design Specifications

### Glassmorphism Effect
```css
background: rgba(17, 24, 39, 0.6);
backdrop-filter: blur(10px);
-webkit-backdrop-filter: blur(10px);
border: 1px solid rgba(255,255,255,0.08);
border-radius: 12px;
```

### Color Scheme
- Background: `#0f172a`
- Card: `rgba(17, 24, 39, 0.6)`
- Accent: `#3b82f6` (Blue)
- Accent Secondary: `#06b6d4` (Cyan)
- Text Primary: `#e5e7eb`
- Text Secondary: `#9ca3af`
- Border: `rgba(255,255,255,0.08)`

## Internal CSS Structure

The component uses two styling approaches:

1. **Styles Object** - For inline styles
2. **`<style>` Tag** - For animations, hover effects, and media queries

```jsx
const styles = {
  section: { /* ... */ },
  container: { /* ... */ },
  // ... more styles
};

const internalCSS = `
  @keyframes fadeIn { /* ... */ }
  .info-item:hover { /* ... */ }
  @media (max-width: 768px) { /* ... */ }
`;
```

## Animations

- **fadeIn**: Section entrance animation (0.8s)
- **successFade**: Success message animation (3s with scale)
- **Hover effects**: Scale, glow, transform, translateX
- **Focus effects**: Input highlight with blue glow
- **Button hover**: translateY(-2px) with shadow

## Responsive Breakpoints

### Desktop (> 1024px)
- Two column layout (50% / 50%)
- 30px gap between cards
- 80px vertical padding

### Tablet (768px - 1024px)
- Stacked layout
- 20px gap
- 60px vertical padding

### Mobile (< 768px)
- Fully stacked layout
- 20px gap
- 40px vertical padding
- Full width inputs

## Customization

Update contact information in Contact.jsx:

```jsx
// Email
href="mailto:jagdeep@email.com"

// GitHub
href="https://github.com/JagdeepMohanty"

// LinkedIn
href="https://linkedin.com/in/jagdeep"

// Location
<span style={styles.value}>India</span>
```

## Form Functionality

- Uses React useState for form data management
- HTML5 validation (required fields)
- Success message displays for 3 seconds
- Form resets after submission
- Prevents default form submission

## Browser Support

- Modern browsers with backdrop-filter support
- Fallback for older browsers (no blur effect)
- Fully functional without backdrop-filter

## Why Internal CSS?

- **Single file component** - Everything in one place
- **No external dependencies** - No separate CSS file needed
- **Easy to maintain** - All styles visible in component
- **Portable** - Copy one file to reuse
- **Production ready** - Optimized for deployment
