# Contact Component

A production-ready modern "Get In Touch" section with glassmorphism design, smooth animations, and full responsiveness.

## Files

- **Contact.jsx** - React component
- **Contact.css** - Styling with glassmorphism and animations

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
✅ **Fully Responsive** - Desktop (50/50 split), tablet & mobile (stacked)  
✅ **Smooth Animations** - Fade-in, hover, and success message animations  
✅ **External CSS** - Clean separation with Contact.css  
✅ **Form Validation** - Built-in HTML5 validation  
✅ **Success Message** - Animated 3-second success feedback  
✅ **Contact Info Card** - Email, GitHub, LinkedIn, Location with icons  
✅ **Social Icons Row** - Bottom row with hover scale animation  
✅ **Modern Icons** - Using react-icons (FaGithub, FaLinkedin, FaEnvelope, etc.)  

## Component Structure

### Header Section
- Heading: "Get In Touch"
- Subheading with project invitation
- Center aligned with gradient text

### Left Card - Contact Info
- Email (clickable mailto link)
- GitHub (clickable external link)
- LinkedIn (clickable external link)
- Location (static display)
- Hover effects with glow and slide animation

### Right Card - Contact Form
- Name input with user icon
- Email input with envelope icon
- Message textarea with paper plane icon
- Icons positioned inside inputs (left side)
- Focus glow animation
- Submit button with gradient and hover lift
- Success message overlay

### Bottom Row - Social Icons
- GitHub, LinkedIn, Email icons
- Circular glassmorphism design
- Scale animation on hover (1.15x)
- Glow effect

## Design Specifications

### Glassmorphism Effect
```css
background: rgba(17, 24, 39, 0.6);
backdrop-filter: blur(10px);
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

## Animations

- **fadeIn**: Section entrance animation (0.8s)
- **successFade**: Success message animation (3s)
- **Hover effects**: Scale, glow, and transform animations
- **Focus effects**: Input highlight with blue glow

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
- 20px card padding
- 40px vertical padding
- Full width submit button
- 15px social icon gap

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
<span className="info-value">India</span>
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
