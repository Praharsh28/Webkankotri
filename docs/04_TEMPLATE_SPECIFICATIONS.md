# 🎨 TEMPLATE SPECIFICATIONS

**Complete Garba Night template implementation**

---

## 🎭 GARBA NIGHT TEMPLATE

### Template Overview

**ID:** `garba-night`  
**Name:** Garba Night  
**Category:** Traditional  
**Price:** ₹299  
**Aspect Ratio:** 3:4 (portrait)  
**Target Resolution:** 1080x1440px  

**Visual Style:**
- Dark gradient background (orange-900 → red-800 → pink-900)
- Floating animated diyas (🪔)
- Rangoli-inspired borders
- Traditional Gujarati motifs
- Gold/orange accent colors

---

## 📐 TEMPLATE DATA STRUCTURE

```typescript
// types/template.ts

export interface GarbaNightData {
  groomName: string
  brideName: string
  weddingDate: string // ISO date string
  venue: string
  primaryColor: string // Hex color
  // Optional fields (future)
  groomParents?: string
  brideParents?: string
  events?: Array<{
    name: string
    date: string
    time: string
    venue: string
  }>
  customMessage?: string
}

export interface TemplateConfig {
  id: string
  name: string
  description: string
  category: string
  fields: {
    [key: string]: FieldConfig
  }
}

export interface FieldConfig {
  type: 'text' | 'date' | 'color' | 'textarea' | 'number'
  label: string
  required: boolean
  default?: any
  placeholder?: string
  validation?: {
    min?: number
    max?: number
    pattern?: string
  }
}
```

---

## 🎨 TEMPLATE COMPONENT

**File:** `components/templates/garba-night.tsx`

```typescript
'use client'

import { memo, useMemo, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import type { GarbaNightData } from '@/types/template'

interface GarbaNightTemplateProps {
  data: GarbaNightData
  preview?: boolean
}

function GarbaNightTemplateComponent({ data, preview = false }: GarbaNightTemplateProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Format wedding date
  const formattedDate = useMemo(() => {
    try {
      const date = new Date(data.weddingDate)
      return format(date, 'EEEE, MMMM d, yyyy')
    } catch {
      return data.weddingDate
    }
  }, [data.weddingDate])

  // Generate random positions for diyas (memoized to prevent re-renders)
  const diyas = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2,
      size: 30 + Math.random() * 10,
    }))
  }, [])

  // Generate random positions for decorative dots
  const decorativeDots = useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 2 + Math.random() * 3,
      opacity: 0.3 + Math.random() * 0.4,
    }))
  }, [])

  // Don't render animations until mounted (SSR safety)
  if (!mounted) {
    return (
      <div className="relative w-full aspect-[3/4] bg-gradient-to-br from-orange-900 via-red-800 to-pink-900">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-center p-8">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-4">
              {data.groomName} & {data.brideName}
            </h1>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div 
      className="relative w-full aspect-[3/4] overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${data.primaryColor}10, ${data.primaryColor}30)`,
      }}
    >
      {/* Base gradient background */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-orange-900 via-red-800 to-pink-900"
        style={{
          opacity: 0.95,
        }}
      />

      {/* Decorative dots (stars) */}
      {decorativeDots.map((dot) => (
        <div
          key={`dot-${dot.id}`}
          className="absolute rounded-full bg-yellow-200"
          style={{
            left: `${dot.left}%`,
            top: `${dot.top}%`,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            opacity: dot.opacity,
          }}
        />
      ))}

      {/* Floating diyas */}
      {diyas.map((diya) => (
        <motion.div
          key={`diya-${diya.id}`}
          className="absolute"
          style={{
            left: `${diya.left}%`,
            top: `${diya.top}%`,
            fontSize: `${diya.size}px`,
          }}
          animate={{
            y: [0, -15, 0],
            opacity: [0.4, 0.8, 0.4],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: diya.duration,
            delay: diya.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          🪔
        </motion.div>
      ))}

      {/* Decorative corner elements */}
      <div className="absolute top-0 left-0 w-32 h-32 opacity-20">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
          <path
            d="M0 0 Q50 50 0 100 Z"
            fill="currentColor"
            className="text-yellow-300"
          />
        </svg>
      </div>
      <div className="absolute top-0 right-0 w-32 h-32 opacity-20 transform scale-x-[-1]">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
          <path
            d="M0 0 Q50 50 0 100 Z"
            fill="currentColor"
            className="text-yellow-300"
          />
        </svg>
      </div>

      {/* Main content container */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-8 md:p-12 z-10">
        {/* Top decorative text */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <p className="font-gujarati text-lg md:text-xl text-orange-200 text-center">
            || શ્રી ગણેશાય નમઃ ||
          </p>
        </motion.div>

        {/* Names */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mb-8"
        >
          <h1 className="font-playfair text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4">
            {data.groomName}
          </h1>
          <div className="flex items-center justify-center mb-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="text-4xl md:text-5xl"
            >
              ❀
            </motion.div>
          </div>
          <h1 className="font-playfair text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
            {data.brideName}
          </h1>
        </motion.div>

        {/* Decorative divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-48 h-0.5 bg-gradient-to-r from-transparent via-orange-300 to-transparent mb-8"
        />

        {/* Date */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mb-6"
        >
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
            <span className="text-2xl">📅</span>
            <p className="text-xl md:text-2xl text-orange-100 font-medium">
              {formattedDate}
            </p>
          </div>
        </motion.div>

        {/* Venue */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
            <span className="text-2xl">📍</span>
            <p className="text-lg md:text-xl text-orange-100 font-medium">
              {data.venue}
            </p>
          </div>
        </motion.div>

        {/* Bottom decorative text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-12"
        >
          <p className="text-orange-200 text-center italic text-sm md:text-base">
            Join us in celebrating our union
          </p>
        </motion.div>
      </div>

      {/* Bottom decorative elements */}
      <div className="absolute bottom-0 left-0 w-32 h-32 opacity-20 transform rotate-180">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
          <path
            d="M0 0 Q50 50 0 100 Z"
            fill="currentColor"
            className="text-yellow-300"
          />
        </svg>
      </div>
      <div className="absolute bottom-0 right-0 w-32 h-32 opacity-20 transform rotate-180 scale-x-[-1]">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
          <path
            d="M0 0 Q50 50 0 100 Z"
            fill="currentColor"
            className="text-yellow-300"
          />
        </svg>
      </div>

      {/* Watermark (if preview mode) */}
      {preview && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="transform -rotate-45 opacity-10">
            <p className="font-bold text-6xl text-white">
              PREVIEW
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

// Memoize to prevent unnecessary re-renders
export const GarbaNightTemplate = memo(GarbaNightTemplateComponent)
```

---

## 🎯 TEMPLATE CONFIGURATION

**File:** `lib/constants/template-configs.ts`

```typescript
import type { TemplateConfig } from '@/types/template'

export const GARBA_NIGHT_CONFIG: TemplateConfig = {
  id: 'garba-night',
  name: 'Garba Night',
  description: 'Traditional Gujarati wedding invitation with animated diyas and rangoli-inspired design',
  category: 'traditional',
  fields: {
    groomName: {
      type: 'text',
      label: 'Groom Name',
      required: true,
      placeholder: 'Enter groom\'s full name',
      validation: {
        min: 2,
        max: 50,
      },
    },
    brideName: {
      type: 'text',
      label: 'Bride Name',
      required: true,
      placeholder: 'Enter bride\'s full name',
      validation: {
        min: 2,
        max: 50,
      },
    },
    weddingDate: {
      type: 'date',
      label: 'Wedding Date',
      required: true,
    },
    venue: {
      type: 'text',
      label: 'Venue',
      required: true,
      placeholder: 'Enter venue name and location',
      validation: {
        min: 3,
        max: 100,
      },
    },
    primaryColor: {
      type: 'color',
      label: 'Primary Color',
      required: false,
      default: '#F97316',
    },
  },
}

// Export all template configs
export const TEMPLATE_CONFIGS = {
  'garba-night': GARBA_NIGHT_CONFIG,
  // Add more templates here
}

// Helper to get template config by ID
export function getTemplateConfig(templateId: string): TemplateConfig | null {
  return TEMPLATE_CONFIGS[templateId as keyof typeof TEMPLATE_CONFIGS] || null
}
```

---

## 📱 TEMPLATE RENDERER

**File:** `components/templates/template-renderer.tsx`

**Purpose:** Dynamically render any template by ID

```typescript
'use client'

import { GarbaNightTemplate } from './garba-night'
import type { GarbaNightData } from '@/types/template'

interface TemplateRendererProps {
  templateId: string
  data: any
  preview?: boolean
}

export function TemplateRenderer({ templateId, data, preview = false }: TemplateRendererProps) {
  switch (templateId) {
    case 'garba-night':
      return <GarbaNightTemplate data={data as GarbaNightData} preview={preview} />
    
    // Add more templates here
    // case 'modern-elegant':
    //   return <ModernElegantTemplate data={data} preview={preview} />
    
    default:
      return (
        <div className="w-full aspect-[3/4] bg-gray-200 flex items-center justify-center">
          <p className="text-gray-600">Template not found</p>
        </div>
      )
  }
}
```

---

## 🎨 SAMPLE DATA

**File:** `lib/constants/sample-data.ts`

```typescript
import type { GarbaNightData } from '@/types/template'

export const GARBA_NIGHT_SAMPLE: GarbaNightData = {
  groomName: 'Rohan Patel',
  brideName: 'Priya Shah',
  weddingDate: '2025-12-15',
  venue: 'Grand Taj Palace, Ahmedabad',
  primaryColor: '#F97316',
}

// Export all sample data
export const SAMPLE_DATA = {
  'garba-night': GARBA_NIGHT_SAMPLE,
  // Add more template sample data here
}

export function getSampleData(templateId: string): any {
  return SAMPLE_DATA[templateId as keyof typeof SAMPLE_DATA] || null
}
```

---

## 🎭 ANIMATION PERFORMANCE OPTIMIZATION

### Key Optimizations Applied

1. **Memoization**
   - Template component wrapped in `React.memo()`
   - Random positions calculated once with `useMemo()`
   - Formatted date memoized

2. **GPU Acceleration**
   - Only animate `transform` and `opacity`
   - Use `will-change` sparingly
   - Avoid animating width/height/position

3. **SSR Safety**
   - Check `mounted` state before rendering animations
   - Prevents hydration mismatch errors

4. **Reduced Animation Count**
   - 12 diyas (not 50+)
   - 50 decorative dots (simple, no animation)
   - Strategic placement for visual impact

5. **Performance Monitoring**
   - Target 60fps (16.67ms per frame)
   - Use Chrome DevTools Performance tab
   - Monitor frame rate during editing

---

## 📝 USAGE EXAMPLES

### Basic Usage

```tsx
import { GarbaNightTemplate } from '@/components/templates/garba-night'

const data = {
  groomName: 'Rohan Patel',
  brideName: 'Priya Shah',
  weddingDate: '2025-12-15',
  venue: 'Grand Taj Palace, Ahmedabad',
  primaryColor: '#F97316',
}

<GarbaNightTemplate data={data} />
```

### With Preview Mode

```tsx
<GarbaNightTemplate data={data} preview={true} />
```

### Using Template Renderer

```tsx
import { TemplateRenderer } from '@/components/templates/template-renderer'

<TemplateRenderer 
  templateId="garba-night" 
  data={data} 
  preview={false}
/>
```

---

## 🎨 CUSTOMIZATION OPTIONS

### Color Schemes

```typescript
// Orange (default)
primaryColor: '#F97316'

// Pink
primaryColor: '#EC4899'

// Red
primaryColor: '#EF4444'

// Gold
primaryColor: '#F59E0B'

// Purple
primaryColor: '#A855F7'
```

### Future Enhancement Ideas

1. **Multiple Layouts**
   - Vertical layout (current)
   - Horizontal landscape
   - Square format for Instagram

2. **Additional Fields**
   - Parent names
   - Multiple events (Sangeet, Mehendi, etc.)
   - Custom message
   - Multiple photos

3. **Animation Variants**
   - Subtle (fewer animations)
   - Standard (current)
   - Festive (more animations)

4. **Music Integration**
   - Background music option
   - Gujarati wedding songs

---

This template is production-ready and optimized for performance.
