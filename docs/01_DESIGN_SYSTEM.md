# 🎨 COMPLETE DESIGN SYSTEM

**Every visual detail specified for AI implementation**

---

## 📐 DESIGN PRINCIPLES

### 1. Cultural Authenticity
- Use traditional Gujarati motifs (diyas, rangoli, garba)
- Orange, red, pink color schemes (wedding colors)
- Incorporate Gujarati typography where appropriate

### 2. Mobile-First
- Design for 375px width (iPhone SE) first
- Desktop is enhancement
- Touch targets minimum 44px × 44px

### 3. Performance
- Minimize animations on mobile
- Lazy load images
- Use WebP format

### 4. Accessibility
- WCAG 2.1 AA minimum
- Color contrast ratio >4.5:1
- Keyboard navigation
- Screen reader friendly

---

## 🎨 COLOR SYSTEM

### Primary Colors

```typescript
// tailwind.config.ts
export const colors = {
  primary: {
    50: '#FFF7ED',
    100: '#FFEDD5',
    200: '#FED7AA',
    300: '#FDBA74',
    400: '#FB923C',
    500: '#F97316', // Main brand color
    600: '#EA580C',
    700: '#C2410C',
    800: '#9A3412',
    900: '#7C2D12',
  },
  
  secondary: {
    50: '#FDF2F8',
    100: '#FCE7F3',
    200: '#FBCFE8',
    300: '#F9A8D4',
    400: '#F472B6',
    500: '#EC4899', // Pink accent
    600: '#DB2777',
    700: '#BE185D',
    800: '#9D174D',
    900: '#831843',
  },
  
  accent: {
    500: '#EF4444', // Red for important CTAs
    600: '#DC2626',
  },
}
```

### Usage Guidelines

**Primary Orange:**
- Primary buttons
- Links
- Active states
- Brand elements

**Secondary Pink:**
- Secondary buttons
- Highlights
- Decorative elements

**Accent Red:**
- Error states
- Important CTAs
- Urgency indicators

**Neutrals:**
- Text: gray-900 (dark), gray-600 (medium), gray-400 (light)
- Backgrounds: white, gray-50, gray-100
- Borders: gray-200, gray-300

---

## 📝 TYPOGRAPHY

### Font Families

```typescript
// app/layout.tsx - Import these fonts
import { Inter, Playfair_Display, Noto_Sans_Gujarati } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '600', '700'],
})

const gujarati = Noto_Sans_Gujarati({ 
  subsets: ['gujarati'],
  variable: '--font-gujarati',
  display: 'swap',
  weight: ['400', '600', '700'],
})
```

### Typography Scale

```typescript
// Text styles for different use cases
const textStyles = {
  // Display (Hero headings)
  'display-1': 'font-playfair text-6xl font-bold leading-tight',
  'display-2': 'font-playfair text-5xl font-bold leading-tight',
  
  // Headings
  'h1': 'font-playfair text-4xl font-bold leading-tight',
  'h2': 'font-playfair text-3xl font-semibold leading-snug',
  'h3': 'font-inter text-2xl font-semibold leading-snug',
  'h4': 'font-inter text-xl font-semibold leading-normal',
  'h5': 'font-inter text-lg font-semibold leading-normal',
  
  // Body
  'body-lg': 'font-inter text-lg leading-relaxed',
  'body': 'font-inter text-base leading-relaxed',
  'body-sm': 'font-inter text-sm leading-relaxed',
  
  // UI
  'button-lg': 'font-inter text-lg font-semibold',
  'button': 'font-inter text-base font-semibold',
  'button-sm': 'font-inter text-sm font-semibold',
  'label': 'font-inter text-sm font-medium',
  'caption': 'font-inter text-xs',
  
  // Template-specific
  'invitation-title': 'font-playfair text-5xl font-bold leading-tight',
  'invitation-subtitle': 'font-inter text-xl leading-relaxed',
  'gujarati': 'font-gujarati text-lg leading-relaxed',
}
```

### Usage Examples

```tsx
// Hero heading
<h1 className="font-playfair text-6xl font-bold leading-tight text-gray-900">
  Create Your Dream Wedding Invitation
</h1>

// Body text
<p className="font-inter text-lg leading-relaxed text-gray-600">
  Beautiful animations, authentic traditions, ready in 2 minutes
</p>

// Button text
<button className="font-inter text-base font-semibold">
  Try Demo Free
</button>
```

---

## 🔘 BUTTON SYSTEM

### Button Variants

```typescript
// components/ui/button.tsx variants
const buttonVariants = {
  // Primary (orange)
  primary: 'bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700',
  
  // Secondary (pink)
  secondary: 'bg-secondary-500 text-white hover:bg-secondary-600 active:bg-secondary-700',
  
  // Accent (red)
  accent: 'bg-accent-500 text-white hover:bg-accent-600 active:bg-accent-700',
  
  // Outline
  outline: 'border-2 border-primary-500 text-primary-500 hover:bg-primary-50',
  
  // Ghost
  ghost: 'text-primary-500 hover:bg-primary-50',
  
  // Link
  link: 'text-primary-500 underline-offset-4 hover:underline',
}

const buttonSizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
  xl: 'px-10 py-5 text-xl',
}
```

### Button States

```typescript
// All buttons must have these states
const buttonStates = {
  default: 'transition-all duration-200',
  hover: 'hover:scale-[1.02] hover:shadow-lg',
  active: 'active:scale-[0.98]',
  disabled: 'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100',
  loading: 'cursor-wait opacity-75',
}
```

---

## 📦 CARD SYSTEM

### Card Variants

```typescript
const cardVariants = {
  // Default card
  default: 'bg-white border border-gray-200 rounded-xl shadow-sm',
  
  // Elevated card
  elevated: 'bg-white rounded-xl shadow-lg',
  
  // Interactive (hover effect)
  interactive: 'bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg hover:border-primary-300 transition-all duration-200',
  
  // Template card (special)
  template: 'bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300',
}
```

---

## 📋 FORM SYSTEM

### Input Styles

```typescript
const inputVariants = {
  default: 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all',
  error: 'border-red-500 focus:ring-red-500',
  disabled: 'bg-gray-100 cursor-not-allowed',
}
```

### Form Pattern

```tsx
// Label
<label className="block text-sm font-medium text-gray-700 mb-2">
  Groom Name *
</label>

// Input
<input 
  type="text"
  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
  placeholder="Enter groom name"
/>

// Error message
<p className="mt-1 text-sm text-red-600">
  This field is required
</p>
```

---

## 🎭 ANIMATION GUIDELINES

### Standard Durations

```typescript
const durations = {
  instant: 100,
  fast: 150,
  normal: 200,
  slow: 300,
  slower: 500,
}
```

### Common Animations

```tsx
// Fade in
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.3 }}
>

// Slide up
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>

// Float (for diyas)
<motion.div
  animate={{
    y: [0, -10, 0],
    opacity: [0.5, 1, 0.5],
  }}
  transition={{
    duration: 3,
    repeat: Infinity,
    ease: 'easeInOut',
  }}
>
```

---

## 📱 RESPONSIVE BREAKPOINTS

```typescript
const screens = {
  'sm': '640px',   // Mobile landscape
  'md': '768px',   // Tablet
  'lg': '1024px',  // Desktop
  'xl': '1280px',  // Large desktop
  '2xl': '1536px', // Extra large
}
```

### Mobile-First Pattern

```tsx
<div className="
  flex flex-col gap-4        /* Mobile */
  md:flex-row md:gap-8       /* Tablet */
  lg:gap-12                  /* Desktop */
">
```

---

## 🌈 GRADIENT SYSTEM

```typescript
const gradients = {
  primary: 'bg-gradient-to-r from-primary-500 to-primary-600',
  sunset: 'bg-gradient-to-br from-orange-400 via-pink-500 to-red-500',
  wedding: 'bg-gradient-to-br from-orange-900 via-red-800 to-pink-900',
  subtle: 'bg-gradient-to-b from-gray-50 to-white',
}
```

---

## ✅ DESIGN CHECKLIST

Every component must have:
- ✅ Mobile responsive (test on 375px)
- ✅ Hover states
- ✅ Active/focus states
- ✅ Disabled states
- ✅ Loading states
- ✅ Error states
- ✅ Accessibility (ARIA, keyboard nav)

---

This design system ensures visual consistency across the entire app.
