# 🎨 Using Animations in Kankotri Templates

## 🎯 **How to Add Animations to Your Wedding Invitations**

This guide shows you exactly how to use our 26 animation types in your kankotri templates.

---

## 📋 **Quick Start - 3 Ways to Use Animations**

### **Method 1: Wrap Individual Elements** (Recommended)
```typescript
import { FadeIn, Glow, LetterDrop } from '@/components/animations'

<FadeIn direction="up" delay={0.2}>
  <h1>Raj & Priya</h1>
</FadeIn>

<Glow variant="soft" color="#FBBF24">
  <div className="invitation-date">25th December 2025</div>
</Glow>

<LetterDrop text="Wedding Invitation" variant="cascade" />
```

### **Method 2: Wrap Entire Sections**
```typescript
import { FloatingElements, Sparkle } from '@/components/animations'

<div className="invitation-card">
  <FloatingElements icons={['🪔', '✨', '💐']} count={10} speed="slow" />
  <Sparkle count={15} colors={['#FBBF24', '#D4AF37']} />
  
  {/* Your content here */}
  <HeaderSection {...} />
  <EventSection {...} />
</div>
```

### **Method 3: Background Animations**
```typescript
import { AnimatedGradient, WaveMotion } from '@/components/animations'

<div className="full-invitation">
  <AnimatedGradient colors={['#FFF8F0', '#FFEDD5']} speed={15} />
  
  <div className="content">
    {/* All your sections */}
  </div>
</div>
```

---

## 🎨 **Best Animations for Each Section**

### **1. Header Section (Names)**
```typescript
import { LetterDrop, TextGradient, ShineEffect } from '@/components/animations'

// Option 1: Letter Drop
<LetterDrop 
  text="Raj & Priya" 
  variant="cascade" 
  className="text-6xl font-bold"
/>

// Option 2: Gradient Text
<TextGradient variant="shimmer" colors={['#FBBF24', '#F97316']}>
  <h1>Raj & Priya</h1>
</TextGradient>

// Option 3: Shine Effect
<ShineEffect duration={3}>
  <h1 className="text-gold">Raj & Priya</h1>
</ShineEffect>
```

### **2. Background Decorations**
```typescript
import { FloatingElements, Sparkle } from '@/components/animations'

// Floating diyas and flowers
<FloatingElements 
  icons={['🪔', '🌺', '✨', '💐']} 
  count={12} 
  speed="slow" 
/>

// Golden sparkles
<Sparkle 
  count={20} 
  colors={['#FBBF24', '#D4AF37', '#F0E68C']} 
/>
```

### **3. Event Details**
```typescript
import { FadeIn, RevealOnScroll } from '@/components/animations'

// Fade in with delay
<FadeIn direction="up" delay={0.3}>
  <div className="event-card">
    <h3>Wedding Ceremony</h3>
    <p>25th December 2025</p>
  </div>
</FadeIn>

// Reveal as user scrolls
<RevealOnScroll direction="up">
  <EventSection event={wedding} />
</RevealOnScroll>
```

### **4. Blessing/Message Section**
```typescript
import { Glow, Pulse } from '@/components/animations'

<Glow variant="soft" color="#FBBF24">
  <div className="blessing-box">
    <p>With the blessings of our parents...</p>
  </div>
</Glow>

<Pulse scale={1.02} duration={3}>
  <BlessingSection {...} />
</Pulse>
```

### **5. Photo Gallery**
```typescript
import { HoverScale, Flip3D } from '@/components/animations'

{photos.map((photo, index) => (
  <HoverScale scale={1.05} key={index}>
    <img src={photo} alt="Wedding photo" />
  </HoverScale>
))}

// Or with 3D flip
<Flip3D variant="horizontal">
  <div className="photo-card">
    {/* Front: Photo */}
    {/* Back: Description */}
  </div>
</Flip3D>
```

### **6. RSVP Button**
```typescript
import { Bounce, Glow } from '@/components/animations'

<Bounce variant="playful" continuous={true}>
  <Glow variant="pulsing" color="#EC4899">
    <button className="rsvp-button">
      RSVP Now
    </button>
  </Glow>
</Bounce>
```

### **7. Decorative Corners**
```typescript
import { DecorativeCorner } from '@/components/animations'

<div className="invitation-frame">
  <DecorativeCorner position="top-left" pattern="mandala" color="#D4AF37" />
  <DecorativeCorner position="top-right" pattern="floral" color="#D4AF37" />
  <DecorativeCorner position="bottom-left" pattern="floral" color="#D4AF37" />
  <DecorativeCorner position="bottom-right" pattern="mandala" color="#D4AF37" />
  
  {/* Your content */}
</div>
```

---

## 🎭 **Complete Animated Template Example**

```typescript
'use client'

import {
  // Background
  FloatingElements,
  Sparkle,
  AnimatedGradient,
  
  // Text
  LetterDrop,
  TextGradient,
  ShineEffect,
  
  // Elements
  FadeIn,
  RevealOnScroll,
  Glow,
  Pulse,
  HoverScale,
  
  // Decorations
  DecorativeCorner,
} from '@/components/animations'

export default function AnimatedKankotri({ data }) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Gradient */}
      <AnimatedGradient 
        colors={['#FFF8F0', '#FFEDD5', '#FED7AA']} 
        speed={15} 
        blur={false}
      />
      
      {/* Floating Elements */}
      <FloatingElements 
        icons={['🪔', '🌺', '✨', '💐']} 
        count={12} 
        speed="slow" 
      />
      
      {/* Sparkles */}
      <Sparkle 
        count={20} 
        colors={['#FBBF24', '#D4AF37', '#F0E68C']} 
      />
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto p-8">
        
        {/* Decorative Corners */}
        <DecorativeCorner position="top-left" pattern="mandala" color="#D4AF37" size={100} />
        <DecorativeCorner position="top-right" pattern="floral" color="#D4AF37" size={100} />
        
        {/* Header with Animated Names */}
        <FadeIn direction="up" delay={0}>
          <div className="text-center mb-12">
            <ShineEffect duration={3}>
              <h1 className="text-7xl font-bold text-gold mb-4">
                <LetterDrop text={data.groomName} variant="cascade" />
                <span className="mx-4">❀</span>
                <LetterDrop text={data.brideName} variant="cascade" delay={0.5} />
              </h1>
            </ShineEffect>
          </div>
        </FadeIn>
        
        {/* Blessing Section */}
        <RevealOnScroll direction="up">
          <Glow variant="soft" color="#FBBF24">
            <div className="bg-white/80 backdrop-blur p-8 rounded-xl shadow-lg mb-8">
              <p className="text-center text-lg">
                With the blessings of our parents and families...
              </p>
            </div>
          </Glow>
        </RevealOnScroll>
        
        {/* Event Details */}
        <RevealOnScroll direction="up" delay={0.2}>
          <FadeIn direction="up">
            <Pulse scale={1.02} duration={3}>
              <div className="bg-white/90 backdrop-blur p-10 rounded-xl shadow-xl mb-8">
                <h2 className="text-4xl font-bold text-center mb-6">
                  <TextGradient variant="shimmer" colors={['#FBBF24', '#F97316']}>
                    <span>Wedding Ceremony</span>
                  </TextGradient>
                </h2>
                <div className="text-center space-y-2">
                  <p className="text-2xl">📅 {data.weddingDate}</p>
                  <p className="text-xl">⏰ {data.weddingTime}</p>
                  <p className="text-xl">📍 {data.venue}</p>
                </div>
              </div>
            </Pulse>
          </FadeIn>
        </RevealOnScroll>
        
        {/* RSVP Button */}
        <div className="text-center mt-12">
          <HoverScale scale={1.1}>
            <Bounce variant="soft" continuous={true}>
              <Glow variant="pulsing" color="#EC4899">
                <button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-12 py-4 rounded-full text-xl font-bold shadow-2xl">
                  RSVP Now
                </button>
              </Glow>
            </Bounce>
          </HoverScale>
        </div>
        
        {/* Bottom Corners */}
        <DecorativeCorner position="bottom-left" pattern="floral" color="#D4AF37" size={100} />
        <DecorativeCorner position="bottom-right" pattern="mandala" color="#D4AF37" size={100} />
      </div>
    </div>
  )
}
```

---

## 📦 **Animation Combinations for Different Themes**

### **Traditional Theme**
```typescript
// Background
<FloatingElements icons={['🪔', '🌺', '✨']} count={12} speed="slow" />
<Sparkle count={20} colors={['#FBBF24', '#D4AF37']} />

// Names
<ShineEffect><h1>Names</h1></ShineEffect>

// Decorations
<DecorativeCorner pattern="mandala" color="#D4AF37" />
```

### **Royal Theme**
```typescript
// Background
<AnimatedGradient colors={['#1A0A0A', '#2D1515']} speed={18} />
<FloatingElements icons={['👑', '✨', '💎']} count={10} speed="slow" />

// Names
<TextGradient variant="shimmer" colors={['#D4AF37', '#FFD700']}>
  <h1>Names</h1>
</TextGradient>

// Everything glows
<Glow variant="intense" color="#D4AF37">
  <div>Content</div>
</Glow>
```

### **Modern Theme**
```typescript
// Background
<AnimatedGradient colors={['#FAFBFC', '#F1F5F9']} speed={12} />

// Names
<LetterDrop text="Names" variant="cascade" />

// Clean animations
<FadeIn direction="up">
  <HoverScale scale={1.05}>
    <div>Content</div>
  </HoverScale>
</FadeIn>
```

---

## 💾 **Saving Animation Settings in Database**

When user creates invitation, store:

```typescript
// In invitations table
{
  id: "uuid",
  user_id: "user-uuid",
  template_id: "traditional",
  data: {
    groomName: "Raj",
    brideName: "Priya",
    // ... other data
  },
  animations: {
    background: {
      floatingElements: {
        enabled: true,
        icons: ['🪔', '🌺', '✨'],
        count: 12,
        speed: 'slow'
      },
      sparkle: {
        enabled: true,
        count: 20,
        colors: ['#FBBF24', '#D4AF37']
      }
    },
    header: {
      type: 'ShineEffect',
      duration: 3
    },
    sections: {
      fadeIn: true,
      revealOnScroll: true
    },
    decorations: {
      corners: {
        enabled: true,
        pattern: 'mandala',
        color: '#D4AF37'
      }
    }
  }
}
```

---

## 🎯 **Best Practices**

### **DO:**
✅ Use **2-4 animations** per invitation (not too many!)
✅ Match animation colors to theme colors
✅ Use **subtle** animations for traditional themes
✅ Use **FadeIn** and **RevealOnScroll** for sections
✅ Add **FloatingElements** for background decoration
✅ Use **Glow** to highlight important sections

### **DON'T:**
❌ Don't use more than 5 different animation types
❌ Don't make animations too fast (looks chaotic)
❌ Don't use bright/neon colors (not elegant!)
❌ Don't animate everything (overwhelming)
❌ Don't use heavy animations on mobile

---

## 📱 **Mobile Optimization**

```typescript
// Detect mobile
const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

// Reduce complexity on mobile
<FloatingElements 
  count={isMobile ? 6 : 12}  // Half on mobile
  speed={isMobile ? 'medium' : 'slow'}  // Faster on mobile
/>

<Sparkle 
  count={isMobile ? 10 : 20}  // Fewer particles
/>
```

---

## 🚀 **Next Steps**

1. **Update existing themes** to include default animations
2. **Create animation picker UI** for users to select
3. **Add animation preview** in template customization
4. **Test all animations** on mobile devices
5. **Add to database schema** for saving preferences

---

**Now you can make beautiful, animated kankotri invitations!** 🎨✨
