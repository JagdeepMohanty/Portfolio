# Quick Reference: Framer Motion Usage

## ✅ Correct Import Syntax

```javascript
// Basic motion components
import { motion } from 'framer-motion';

// With AnimatePresence for conditional rendering
import { motion, AnimatePresence } from 'framer-motion';
```

## ✅ Correct Usage Examples

### Basic Animation
```javascript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

### Hover Animation
```javascript
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Click Me
</motion.button>
```

### Scroll Animation
```javascript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
  Content
</motion.div>
```

### Conditional Rendering with AnimatePresence
```javascript
<AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      Modal Content
    </motion.div>
  )}
</AnimatePresence>
```

## ❌ Common Mistakes to Avoid

### 1. Missing Import
```javascript
// ❌ WRONG - Will cause "motion is not defined"
<motion.div>Content</motion.div>

// ✅ CORRECT
import { motion } from 'framer-motion';
<motion.div>Content</motion.div>
```

### 2. Wrong Import Path
```javascript
// ❌ WRONG
import motion from 'framer-motion';

// ✅ CORRECT
import { motion } from 'framer-motion';
```

### 3. Missing AnimatePresence
```javascript
// ❌ WRONG - exit animations won't work
{isOpen && (
  <motion.div exit={{ opacity: 0 }}>
    Content
  </motion.div>
)}

// ✅ CORRECT
<AnimatePresence>
  {isOpen && (
    <motion.div exit={{ opacity: 0 }}>
      Content
    </motion.div>
  )}
</AnimatePresence>
```

## 📋 All Motion Components Available

- `motion.div`
- `motion.button`
- `motion.a`
- `motion.span`
- `motion.p`
- `motion.h1`, `motion.h2`, `motion.h3`, etc.
- `motion.section`
- `motion.nav`
- `motion.form`
- `motion.input`
- `motion.textarea`
- And any other HTML element: `motion.{element}`

## 🎨 Common Animation Props

### Initial State
```javascript
initial={{ opacity: 0, y: 20, scale: 0.9 }}
```

### Animated State
```javascript
animate={{ opacity: 1, y: 0, scale: 1 }}
```

### Exit State (requires AnimatePresence)
```javascript
exit={{ opacity: 0, y: -20, scale: 0.9 }}
```

### Hover State
```javascript
whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0,0,0,0.3)" }}
```

### Tap State
```javascript
whileTap={{ scale: 0.95 }}
```

### Scroll Into View
```javascript
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, amount: 0.3 }}
```

### Transition
```javascript
transition={{ 
  duration: 0.5, 
  delay: 0.2, 
  ease: "easeInOut" 
}}
```

## 🚀 Performance Tips

1. **Use `viewport={{ once: true }}`** for scroll animations to prevent re-triggering
2. **Avoid animating expensive properties** like `width`, `height` - use `scale` instead
3. **Use `will-change` CSS property** for smoother animations
4. **Lazy load sections** that use heavy animations
5. **Limit simultaneous animations** on mobile devices

## 📦 Current Project Usage

All files using motion in this project:
- `src/components/Navbar.jsx`
- `src/components/ProjectCard.jsx`
- `src/components/CertificateCard.jsx`
- `src/sections/HomeSection.jsx`
- `src/sections/AboutSection.jsx`
- `src/sections/ProjectsSection.jsx`
- `src/sections/EngineeringHighlightsSection.jsx`
- `src/sections/GitHubSection.jsx`
- `src/sections/CertificatesSection.jsx`
- `src/sections/ContactSection.jsx`

All imports are ✅ CORRECT and ✅ VERIFIED.

## 🔧 Troubleshooting

If you see "motion is not defined":
1. Check import statement at top of file
2. Ensure framer-motion is installed: `npm list framer-motion`
3. Clear cache: `rm -rf node_modules .vite dist && npm install`
4. Restart dev server: `npm run dev`

## 📚 Documentation

Official Framer Motion docs: https://www.framer.com/motion/
