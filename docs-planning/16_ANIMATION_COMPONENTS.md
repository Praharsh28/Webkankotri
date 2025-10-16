# ✨ REUSABLE ANIMATION COMPONENTS LIBRARY

**Pre-built animation components for instant template creation**

---

## 🎯 PURPOSE

This library provides ready-made animation components that AI can use when creating new templates. Instead of coding animations from scratch, just import and use these components.

---

## 📦 INSTALLATION

All animations use Framer Motion (already installed):
```bash
npm install framer-motion
```

---

## 🎨 ANIMATION COMPONENTS

### 1. Floating Elements (Decorative)

**File:** `components/animations/FloatingElements.tsx`

```typescript
'use client'

import { motion } from 'framer-motion'
import { useMemo } from 'react'

interface FloatingElement {
  id: number
  icon: string
  left: number
  top: number
  duration: number
  delay: number
  size: number
}

interface FloatingElementsProps {
  icons?: string[]
  count?: number
  speed?: 'slow' | 'medium' | 'fast'
}

export function FloatingElements({
  icons = ['🪔', '✨', '💐', '🎊', '💖', '🌺'],
  count = 12,
  speed = 'medium',
}: FloatingElementsProps) {
  const speedMap = {
    slow: { min: 4, max: 6 },
    medium: { min: 3, max: 5 },
    fast: { min: 2, max: 4 },
  }

  const elements = useMemo<FloatingElement[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      icon: icons[i % icons.length],
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: speedMap[speed].min + Math.random() * (speedMap[speed].max - speedMap[speed].min),
      delay: Math.random() * 2,
      size: 20 + Math.random() * 20,
    }))
  }, [count, icons, speed])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute"
          style={{
            left: `${element.left}%`,
            top: `${element.top}%`,
            fontSize: `${element.size}px`,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: element.duration,
            delay: element.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {element.icon}
        </motion.div>
      ))}
    </div>
  )
}
```

**Usage:**
```typescript
<FloatingElements icons={['🪔', '✨', '💐']} count={12} speed="medium" />
```

---

### 2. Gradient Background Animations

**File:** `components/animations/AnimatedGradient.tsx`

```typescript
'use client'

import { motion } from 'framer-motion'

interface AnimatedGradientProps {
  colors?: string[]
  speed?: number
  blur?: boolean
}

export function AnimatedGradient({
  colors = ['#FFF7ED', '#FFEDD5', '#FED7AA', '#FDBA74'],
  speed = 10,
  blur = false,
}: AnimatedGradientProps) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(45deg, ${colors.join(', ')})`,
          backgroundSize: '400% 400%',
          filter: blur ? 'blur(100px)' : 'none',
        }}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  )
}
```

**Usage:**
```typescript
<AnimatedGradient colors={['#FFF7ED', '#FFEDD5']} speed={10} blur />
```

---

### 3. Shine/Shimmer Effect

**File:** `components/animations/ShineEffect.tsx`

```typescript
'use client'

import { motion } from 'framer-motion'

interface ShineEffectProps {
  children: React.ReactNode
  duration?: number
  delay?: number
}

export function ShineEffect({ 
  children, 
  duration = 2, 
  delay = 0 
}: ShineEffectProps) {
  return (
    <div className="relative overflow-hidden">
      {children}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        initial={{ x: '-100%' }}
        animate={{ x: '200%' }}
        transition={{
          duration,
          delay,
          repeat: Infinity,
          repeatDelay: 3,
          ease: 'easeInOut',
        }}
      />
    </div>
  )
}
```

**Usage:**
```typescript
<ShineEffect duration={2}>
  <h1>Shiny Text</h1>
</ShineEffect>
```

---

### 4. Fade In Animation

**File:** `components/animations/FadeIn.tsx`

```typescript
'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface FadeInProps {
  children: ReactNode
  delay?: number
  duration?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  distance?: number
}

export function FadeIn({
  children,
  delay = 0,
  duration = 0.5,
  direction = 'up',
  distance = 20,
}: FadeInProps) {
  const directionOffset = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  }

  return (
    <motion.div
      initial={{ opacity: 0, ...directionOffset[direction] }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
```

**Usage:**
```typescript
<FadeIn delay={0.2} direction="up">
  <h1>Fades in from bottom</h1>
</FadeIn>
```

---

### 5. Pulsing Animation

**File:** `components/animations/Pulse.tsx`

```typescript
'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface PulseProps {
  children: ReactNode
  scale?: number
  duration?: number
  repeat?: boolean
}

export function Pulse({
  children,
  scale = 1.05,
  duration = 2,
  repeat = true,
}: PulseProps) {
  return (
    <motion.div
      animate={{
        scale: [1, scale, 1],
      }}
      transition={{
        duration,
        repeat: repeat ? Infinity : 0,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  )
}
```

**Usage:**
```typescript
<Pulse scale={1.1} duration={2}>
  <div>Pulsing element</div>
</Pulse>
```

---

### 6. Rotating Animation

**File:** `components/animations/Rotate.tsx`

```typescript
'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface RotateProps {
  children: ReactNode
  duration?: number
  clockwise?: boolean
}

export function Rotate({
  children,
  duration = 20,
  clockwise = true,
}: RotateProps) {
  return (
    <motion.div
      animate={{
        rotate: clockwise ? 360 : -360,
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      {children}
    </motion.div>
  )
}
```

**Usage:**
```typescript
<Rotate duration={20} clockwise>
  <div>🌸</div>
</Rotate>
```

---

### 7. Typewriter Effect

**File:** `components/animations/Typewriter.tsx`

```typescript
'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface TypewriterProps {
  text: string
  speed?: number
  delay?: number
  className?: string
}

export function Typewriter({
  text,
  speed = 50,
  delay = 0,
  className = '',
}: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayedText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }
    }, delay + currentIndex * speed)

    return () => clearTimeout(timeout)
  }, [currentIndex, text, speed, delay])

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {displayedText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
      >
        |
      </motion.span>
    </motion.span>
  )
}
```

**Usage:**
```typescript
<Typewriter text="Welcome to our wedding!" speed={50} />
```

---

### 8. Confetti Burst

**File:** `components/animations/ConfettiBurst.tsx`

```typescript
'use client'

import { useEffect, useState } from 'react'
import confetti from 'canvas-confetti'

interface ConfettiBurstProps {
  trigger?: boolean
  particleCount?: number
  spread?: number
  colors?: string[]
}

export function ConfettiBurst({
  trigger = false,
  particleCount = 100,
  spread = 70,
  colors = ['#F97316', '#EC4899', '#FBBF24', '#22C55E'],
}: ConfettiBurstProps) {
  useEffect(() => {
    if (trigger) {
      confetti({
        particleCount,
        spread,
        origin: { y: 0.6 },
        colors,
      })
    }
  }, [trigger, particleCount, spread, colors])

  return null
}
```

**Usage:**
```typescript
const [celebrate, setCelebrate] = useState(false)

<ConfettiBurst trigger={celebrate} particleCount={100} />
<Button onClick={() => setCelebrate(true)}>Celebrate!</Button>
```

---

### 9. Decorative Corner

**File:** `components/animations/DecorativeCorner.tsx`

```typescript
'use client'

import { motion } from 'framer-motion'

interface DecorativeCornerProps {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  pattern?: 'floral' | 'geometric' | 'mandala'
  color?: string
  size?: number
}

export function DecorativeCorner({
  position,
  pattern = 'floral',
  color = '#F97316',
  size = 100,
}: DecorativeCornerProps) {
  const positionClasses = {
    'top-left': 'top-0 left-0',
    'top-right': 'top-0 right-0 rotate-90',
    'bottom-left': 'bottom-0 left-0 -rotate-90',
    'bottom-right': 'bottom-0 right-0 rotate-180',
  }

  const patterns = {
    floral: (
      <svg width={size} height={size} viewBox="0 0 100 100">
        <path
          d="M0,0 Q50,0 50,50 Q50,0 100,0 L100,100 L0,100 Z"
          fill={color}
          opacity="0.1"
        />
      </svg>
    ),
    geometric: (
      <svg width={size} height={size} viewBox="0 0 100 100">
        <rect x="0" y="0" width="100" height="100" fill={color} opacity="0.1" />
        <circle cx="50" cy="50" r="30" fill={color} opacity="0.1" />
      </svg>
    ),
    mandala: (
      <svg width={size} height={size} viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" fill="none" stroke={color} strokeWidth="2" opacity="0.2" />
        <circle cx="50" cy="50" r="30" fill="none" stroke={color} strokeWidth="2" opacity="0.2" />
        <circle cx="50" cy="50" r="20" fill="none" stroke={color} strokeWidth="2" opacity="0.2" />
      </svg>
    ),
  }

  return (
    <motion.div
      className={`absolute ${positionClasses[position]} pointer-events-none`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {patterns[pattern]}
    </motion.div>
  )
}
```

**Usage:**
```typescript
<DecorativeCorner position="top-left" pattern="floral" color="#F97316" />
```

---

### 10. Sparkle Effect

**File:** `components/animations/Sparkle.tsx`

```typescript
'use client'

import { motion } from 'framer-motion'
import { useMemo } from 'react'

interface SparkleProps {
  count?: number
  colors?: string[]
}

export function Sparkle({ 
  count = 20,
  colors = ['#FBBF24', '#FCD34D', '#FEF3C7'] 
}: SparkleProps) {
  const sparkles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 2 + 1,
      delay: Math.random() * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
    }))
  }, [count, colors])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute rounded-full"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            width: sparkle.size,
            height: sparkle.size,
            backgroundColor: sparkle.color,
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: sparkle.duration,
            delay: sparkle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
```

**Usage:**
```typescript
<Sparkle count={20} colors={['#FBBF24', '#FCD34D']} />
```

---

### 11. Reveal on Scroll

**File:** `components/animations/RevealOnScroll.tsx`

```typescript
'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, ReactNode } from 'react'

interface RevealOnScrollProps {
  children: ReactNode
  direction?: 'up' | 'down' | 'left' | 'right'
  delay?: number
}

export function RevealOnScroll({
  children,
  direction = 'up',
  delay = 0,
}: RevealOnScrollProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const directionOffset = {
    up: { y: 50 },
    down: { y: -50 },
    left: { x: 50 },
    right: { x: -50 },
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...directionOffset[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  )
}
```

**Usage:**
```typescript
<RevealOnScroll direction="up" delay={0.2}>
  <h2>Reveals when scrolled into view</h2>
</RevealOnScroll>
```

---

### 12. Hover Scale

**File:** `components/animations/HoverScale.tsx`

```typescript
'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface HoverScaleProps {
  children: ReactNode
  scale?: number
  duration?: number
}

export function HoverScale({
  children,
  scale = 1.05,
  duration = 0.2,
}: HoverScaleProps) {
  return (
    <motion.div
      whileHover={{ scale }}
      whileTap={{ scale: scale * 0.95 }}
      transition={{ duration }}
    >
      {children}
    </motion.div>
  )
}
```

**Usage:**
```typescript
<HoverScale scale={1.1}>
  <Card>Hover me!</Card>
</HoverScale>
```

---

## 🎨 PRE-BUILT TEMPLATE ANIMATIONS

### Template Container

**File:** `components/animations/TemplateContainer.tsx`

```typescript
'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface TemplateContainerProps {
  children: ReactNode
  backgroundColor?: string
}

export function TemplateContainer({
  children,
  backgroundColor = '#7C2D12',
}: TemplateContainerProps) {
  return (
    <motion.div
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  )
}
```

---

## 📦 ANIMATION LIBRARY INDEX

**File:** `components/animations/index.ts`

```typescript
export { FloatingElements } from './FloatingElements'
export { AnimatedGradient } from './AnimatedGradient'
export { ShineEffect } from './ShineEffect'
export { FadeIn } from './FadeIn'
export { Pulse } from './Pulse'
export { Rotate } from './Rotate'
export { Typewriter } from './Typewriter'
export { ConfettiBurst } from './ConfettiBurst'
export { DecorativeCorner } from './DecorativeCorner'
export { Sparkle } from './Sparkle'
export { RevealOnScroll } from './RevealOnScroll'
export { HoverScale } from './HoverScale'
export { TemplateContainer } from './TemplateContainer'
```

---

## 🎯 USAGE IN TEMPLATES

### Example: Creating a New Template with Animations

```typescript
'use client'

import { memo } from 'react'
import {
  TemplateContainer,
  FloatingElements,
  FadeIn,
  DecorativeCorner,
  ShineEffect,
} from '@/components/animations'

export const MyNewTemplate = memo(function MyNewTemplate({ data }) {
  return (
    <TemplateContainer backgroundColor="#7C2D12">
      {/* Floating decorations */}
      <FloatingElements icons={['🪔', '✨', '💐']} count={12} />
      
      {/* Decorative corners */}
      <DecorativeCorner position="top-left" pattern="floral" />
      <DecorativeCorner position="bottom-right" pattern="floral" />
      
      {/* Content with animations */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <FadeIn delay={0.2}>
          <ShineEffect>
            <h1 className="font-playfair text-6xl text-white text-center">
              {data.groomName}
            </h1>
          </ShineEffect>
        </FadeIn>
        
        <FadeIn delay={0.4}>
          <p className="text-center text-2xl text-white mt-4">
            ❀
          </p>
        </FadeIn>
        
        <FadeIn delay={0.6}>
          <h2 className="font-playfair text-6xl text-white text-center">
            {data.brideName}
          </h2>
        </FadeIn>
      </div>
    </TemplateContainer>
  )
})
```

---

## ✅ CHECKLIST FOR AI

When creating new templates, use these animations:

- [ ] `TemplateContainer` - Wraps entire template
- [ ] `FloatingElements` - Add decorative floating icons
- [ ] `DecorativeCorner` - Add corner decorations
- [ ] `FadeIn` - Animate text/elements entrance
- [ ] `ShineEffect` - Add shimmer to important text
- [ ] `Pulse` or `HoverScale` - Make interactive elements engaging

---

## 🎨 ANIMATION COMBINATIONS

### For Traditional Templates:
```typescript
<FloatingElements icons={['🪔', '🌺', '💐']} />
<DecorativeCorner pattern="mandala" />
<FadeIn direction="up" />
```

### For Modern Templates:
```typescript
<AnimatedGradient blur />
<ShineEffect />
<RevealOnScroll />
```

### For Fun/Celebration Templates:
```typescript
<Sparkle count={30} />
<Pulse />
<ConfettiBurst trigger={true} />
```

---

**All animations are 60fps optimized and mobile-friendly!**
