# 📱 MOBILE-FIRST DESIGN GUIDELINES

**90% of users will be mobile - Design for mobile first!**

---

## 🎯 CRITICAL REQUIREMENT

From user request:
> "90 percent of our users will be mobile user so make sure you plan ahead this. For now web is enough."

---

## 📐 DESIGN PRINCIPLES

### 1. Mobile-First CSS (Tailwind)

**Always write mobile styles first, then add desktop breakpoints:**

```tsx
// ✅ CORRECT - Mobile first
<div className="text-base md:text-lg lg:text-xl">
  {/* 
    - Default (mobile): text-base (16px)
    - Tablet: text-lg (18px)
    - Desktop: text-xl (20px)
  */}
</div>

// ❌ WRONG - Desktop first
<div className="text-xl md:text-base">
  {/* This assumes desktop first */}
</div>
```

### 2. Touch-Friendly Targets

**Minimum tap target: 44x44px (iOS guideline)**

```tsx
// ✅ CORRECT
<Button className="h-12 px-6 text-base">
  Large enough for fingers
</Button>

// ❌ WRONG
<Button className="h-8 px-2 text-xs">
  Too small for mobile
</Button>
```

### 3. Generous Spacing

```tsx
// ✅ CORRECT - Mobile-friendly spacing
<div className="p-6 space-y-6">
  <Button className="w-full h-12">Full width</Button>
  <Button className="w-full h-12">Easy to tap</Button>
</div>

// ❌ WRONG - Too cramped
<div className="p-2 space-y-2">
  <Button className="w-auto h-8">Small</Button>
</div>
```

---

## 📱 RESPONSIVE BREAKPOINTS

```typescript
// tailwind.config.ts - Already configured

screens: {
  'sm': '640px',  // Small tablets
  'md': '768px',  // Tablets
  'lg': '1024px', // Small laptops
  'xl': '1280px', // Desktops
  '2xl': '1536px' // Large screens
}
```

### Usage Pattern

```tsx
<div className="
  w-full           /* Mobile: full width */
  md:w-2/3         /* Tablet: 2/3 width */
  lg:w-1/2         /* Desktop: 1/2 width */
  p-4              /* Mobile: 1rem padding */
  md:p-6           /* Tablet: 1.5rem padding */
  lg:p-8           /* Desktop: 2rem padding */
">
  Content
</div>
```

---

## 🎨 MOBILE-OPTIMIZED COMPONENTS

### Navigation (Mobile)

```tsx
// components/layout/MobileNav.tsx
'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="lg"
        className="md:hidden h-12 w-12"
        onClick={() => setOpen(!open)}
      >
        {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </Button>

      {/* Full-screen mobile menu */}
      {open && (
        <div className="fixed inset-0 z-50 bg-white md:hidden">
          <div className="p-6 space-y-6">
            <Button
              variant="ghost"
              size="lg"
              className="absolute top-4 right-4 h-12 w-12"
              onClick={() => setOpen(false)}
            >
              <X className="w-6 h-6" />
            </Button>
            
            {/* Large tap targets */}
            <nav className="space-y-4 mt-16">
              <a href="/" className="block p-4 text-xl font-semibold">
                Home
              </a>
              <a href="/templates" className="block p-4 text-xl font-semibold">
                Templates
              </a>
              <a href="/pricing" className="block p-4 text-xl font-semibold">
                Pricing
              </a>
            </nav>

            <Button className="w-full h-14 text-lg">
              Sign In
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
```

### Form Inputs (Mobile)

```tsx
// components/ui/MobileInput.tsx

export function MobileInput(props: InputProps) {
  return (
    <input
      {...props}
      className="
        h-14              /* Tall enough for easy typing */
        px-4              /* Comfortable padding */
        text-base         /* Prevents iOS zoom on focus */
        rounded-lg
        border-2
        w-full
        focus:border-orange-500
        focus:ring-4
        focus:ring-orange-100
      "
    />
  )
}
```

### Bottom Sheet (Mobile)

```tsx
// components/ui/BottomSheet.tsx
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

export function BottomSheet({ open, onClose, children }: any) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />
          
          {/* Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 max-h-[90vh] overflow-y-auto"
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-4 pb-2">
              <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
            </div>
            
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2"
            >
              <X className="w-6 h-6" />
            </button>
            
            {/* Content with safe padding */}
            <div className="p-6 pb-safe">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
```

---

## 📐 MOBILE LAYOUT PATTERNS

### Stack on Mobile, Grid on Desktop

```tsx
<div className="
  flex flex-col space-y-4    /* Mobile: vertical stack */
  md:flex-row md:space-y-0 md:gap-6  /* Desktop: horizontal */
">
  <div className="flex-1">Column 1</div>
  <div className="flex-1">Column 2</div>
</div>
```

### Full Width on Mobile

```tsx
<div className="
  container 
  px-4           /* Mobile: small padding */
  md:px-6        /* Tablet: medium padding */
  lg:px-8        /* Desktop: large padding */
  mx-auto
">
  <div className="
    w-full          /* Mobile: full width */
    md:w-11/12      /* Tablet: slightly narrower */
    lg:w-10/12      /* Desktop: comfortable reading width */
    mx-auto
  ">
    Content
  </div>
</div>
```

### Hide on Mobile, Show on Desktop

```tsx
<div className="hidden md:block">
  Only visible on desktop
</div>

<div className="md:hidden">
  Only visible on mobile
</div>
```

---

## 🎯 MOBILE-SPECIFIC OPTIMIZATIONS

### 1. Virtual Keyboard Handling

```tsx
'use client'

import { useEffect, useState } from 'react'

export function useKeyboardHeight() {
  const [keyboardHeight, setKeyboardHeight] = useState(0)

  useEffect(() => {
    const handleResize = () => {
      // Detect if keyboard is open
      if (typeof window !== 'undefined' && window.visualViewport) {
        const viewport = window.visualViewport
        const keyboardOpen = viewport.height < window.innerHeight
        if (keyboardOpen) {
          setKeyboardHeight(window.innerHeight - viewport.height)
        } else {
          setKeyboardHeight(0)
        }
      }
    }

    window.visualViewport?.addEventListener('resize', handleResize)
    return () => {
      window.visualViewport?.removeEventListener('resize', handleResize)
    }
  }, [])

  return keyboardHeight
}
```

### 2. Prevent Zoom on Input Focus

```tsx
// Add to all input fields
<input
  type="text"
  className="text-base"  /* 16px minimum to prevent iOS zoom */
/>

// Or in globals.css
@media screen and (max-width: 768px) {
  input, select, textarea {
    font-size: 16px !important;
  }
}
```

### 3. Safe Area Insets (Notch Support)

```css
/* app/globals.css */

/* Safe area padding for iPhone notch */
.pb-safe {
  padding-bottom: env(safe-area-inset-bottom);
}

.pt-safe {
  padding-top: env(safe-area-inset-top);
}

/* Fixed bottom buttons */
.fixed-bottom-button {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  padding-bottom: calc(1rem + env(safe-area-inset-bottom));
  background: white;
  border-top: 1px solid #e5e7eb;
}
```

### 4. Sticky Bottom CTA (Mobile)

```tsx
export function StickyMobileCTA({ children }: { children: React.ReactNode }) {
  return (
    <div className="
      md:hidden            /* Only on mobile */
      fixed-bottom-button
      z-40
      shadow-lg
    ">
      {children}
    </div>
  )
}
```

---

## 📊 MOBILE EDITOR LAYOUT

```tsx
// components/features/MobileEditor.tsx

export function MobileEditor() {
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit')

  return (
    <div className="h-screen flex flex-col md:flex-row">
      {/* Mobile: Tabs, Desktop: Side-by-side */}
      <div className="md:hidden flex border-b">
        <button
          onClick={() => setActiveTab('edit')}
          className={`flex-1 py-4 text-lg font-semibold ${
            activeTab === 'edit' ? 'border-b-2 border-orange-500' : ''
          }`}
        >
          Edit
        </button>
        <button
          onClick={() => setActiveTab('preview')}
          className={`flex-1 py-4 text-lg font-semibold ${
            activeTab === 'preview' ? 'border-b-2 border-orange-500' : ''
          }`}
        >
          Preview
        </button>
      </div>

      {/* Edit Panel */}
      <div className={`
        flex-1 overflow-y-auto p-4
        ${activeTab === 'edit' ? 'block' : 'hidden'}
        md:block md:w-1/2 md:border-r
      `}>
        {/* Form fields */}
      </div>

      {/* Preview Panel */}
      <div className={`
        flex-1 overflow-y-auto p-4 bg-gray-50
        ${activeTab === 'preview' ? 'block' : 'hidden'}
        md:block md:w-1/2
      `}>
        {/* Live preview */}
      </div>
    </div>
  )
}
```

---

## 🎨 MOBILE TEMPLATE CARDS

```tsx
export function MobileTemplateCard({ template }: any) {
  return (
    <Card className="
      overflow-hidden
      active:scale-98 transition-transform  /* Touch feedback */
    ">
      {/* Image */}
      <div className="aspect-[3/4] relative">
        <img
          src={template.preview}
          alt={template.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Info */}
      <div className="p-4 space-y-3">
        <h3 className="text-lg font-semibold">
          {template.name}
        </h3>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-orange-600">
            ₹{template.price}
          </span>
          <Button size="lg" className="h-12 px-6">
            Customize
          </Button>
        </div>
      </div>
    </Card>
  )
}
```

---

## ⚡ PERFORMANCE FOR MOBILE

### 1. Image Optimization

```tsx
import Image from 'next/image'

<Image
  src="/template.jpg"
  alt="Template"
  width={800}
  height={1000}
  loading="lazy"
  quality={85}  /* Lower for mobile */
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

### 2. Lazy Load Components

```tsx
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <div>Loading...</div>,
  ssr: false  /* Don't load on server */
})
```

### 3. Reduce JavaScript Bundle

```tsx
// Use CSS animations instead of JS when possible
<div className="animate-pulse">
  {/* Pure CSS, no JS overhead */}
</div>
```

---

## 📋 MOBILE TESTING CHECKLIST

- [ ] All buttons are at least 44x44px
- [ ] Font size is at least 16px on inputs
- [ ] Forms work with virtual keyboard
- [ ] Navigation is easy with one hand
- [ ] Scrolling is smooth (60fps)
- [ ] Images load fast on 3G
- [ ] No horizontal scroll
- [ ] Safe area insets handled (iPhone notch)
- [ ] Touch gestures feel responsive
- [ ] Modals/dialogs are full-screen on mobile

---

## 🎯 MOBILE-FIRST MANTRA

```
1. Design for mobile FIRST
2. Add desktop enhancements LATER
3. Test on actual mobile devices
4. Optimize for touch, not mouse
5. Prioritize speed and simplicity
```

---

**90% mobile users = 100% mobile-first design!**
