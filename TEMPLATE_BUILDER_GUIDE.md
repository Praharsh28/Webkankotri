# 🎨 Template Builder Guide - AI Agent Friendly

## How to Build Stunning Wedding Invitation Templates

**Target:** ₹149+ value templates with wow factor

---

## 🎯 What Makes a Template Worth ₹149?

### ✅ Must Have:
1. **Video OR rich animation** - Movement creates emotion
2. **Interactive elements** - Carousel, countdown, etc.
3. **Working RSVP** - Saves to database
4. **Unique visual style** - Not just color changes
5. **Mobile-optimized** - 90% of users

### ❌ Not Enough:
1. Just text on gradient background
2. Only basic fade-in animations
3. Static sections
4. One layout style

---

## 📐 Template Structure

### Every Template Has:

```
/components/templates-v2/themes/TemplateName/
├── TemplateName.tsx         # Main template component
├── config.ts                 # Template configuration
├── animations.ts             # Animation settings
├── types.ts                  # Template-specific types
└── README.md                 # Documentation
```

---

## 🔧 Step-by-Step: Build a Template

### **Step 1: Create Template Folder**

```bash
mkdir -p components/templates-v2/themes/RoyalTemplate
cd components/templates-v2/themes/RoyalTemplate
```

### **Step 2: Create Configuration** (`config.ts`)

```typescript
export const royalConfig = {
  id: 'royal',
  name: 'Royal Palace',
  description: 'Luxurious palace-inspired template with video backgrounds',
  category: 'premium',
  price: 149,
  
  // Visual identity
  colors: {
    primary: '#5D1A8B',      // Deep purple
    secondary: '#D4AF37',    // Gold
    accent: '#FF6B9D',       // Pink accent
    background: '#0F0019',    // Dark purple
  },
  
  // Features
  features: {
    videoBackground: true,
    audioPlayer: true,
    photoCarousel: true,
    fireworks: true,
    countdown: true,
  },
  
  // Animation settings
  animations: {
    particles: {
      type: 'custom',
      emojis: ['👑', '💎', '✨'],
      count: 100,
      speed: 'slow',
    },
    parallax: {
      enabled: true,
      speed: 0.5,
    },
    entrance: {
      type: 'curtain-reveal',
      duration: 1.5,
    },
  },
};
```

### **Step 3: Create Main Component** (`RoyalTemplate.tsx`)

```typescript
'use client';

import { useState } from 'react';
import {
  VideoBackground,
  FloatingParticles,
  ParallaxSection,
  FlipCard3D,
  PhotoCarousel,
  CountdownTimer,
  FireworksCanvas,
  AudioPlayer,
} from '@/components/animations-v2';
import { royalConfig } from './config';

interface RoyalTemplateProps {
  data: InvitationData;
}

export function RoyalTemplate({ data }: RoyalTemplateProps) {
  const [showFireworks, setShowFireworks] = useState(false);

  return (
    <div className="relative min-h-screen">
      {/* Video Background */}
      <VideoBackground
        src={data.videoUrl || '/videos/royal-palace.mp4'}
        overlay={0.4}
        overlayColor="rgba(93, 26, 139, 0.5)"
        loop
        muted
      >
        {/* Floating Elements */}
        <FloatingParticles
          emojis={royalConfig.animations.particles.emojis}
          count={royalConfig.animations.particles.count}
          speed={royalConfig.animations.particles.speed}
        />

        {/* Background Music */}
        <AudioPlayer
          src={data.musicUrl || '/music/royal-theme.mp3'}
          volume={0.3}
          loop
          controls="minimal"
          position="bottom-right"
        />

        {/* Hero Section with Parallax */}
        <ParallaxSection speed={0.3}>
          <div className="container mx-auto px-4 py-20 text-center">
            <h1 className="text-6xl font-bold text-white mb-4">
              A Royal Celebration
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-8" />
          </div>
        </ParallaxSection>

        {/* 3D Flip Card for Names */}
        <FlipCard3D
          front={
            <div className="bg-gradient-to-br from-purple-900 to-purple-700 p-12 rounded-lg">
              <div className="text-center">
                <span className="text-6xl mb-4 block">👑</span>
                <h2 className="text-4xl font-bold text-gold">
                  Royal Invitation
                </h2>
                <p className="text-white mt-4">Click to reveal</p>
              </div>
            </div>
          }
          back={
            <div className="bg-white p-12 rounded-lg shadow-2xl">
              <h2 className="text-4xl font-bold text-purple-900 text-center">
                {data.groomName}
              </h2>
              <div className="text-center my-6">
                <span className="text-3xl text-gold">✨ & ✨</span>
              </div>
              <h2 className="text-4xl font-bold text-purple-900 text-center">
                {data.brideName}
              </h2>
            </div>
          }
          trigger="click"
        />

        {/* Countdown Timer */}
        <ParallaxSection speed={0.2}>
          <div className="container mx-auto px-4 py-16">
            <CountdownTimer
              targetDate={new Date(data.weddingDate)}
              style="elegant"
              size="large"
              labels={{
                days: 'Days',
                hours: 'Hours',
                minutes: 'Minutes',
                seconds: 'Seconds',
              }}
            />
          </div>
        </ParallaxSection>

        {/* Photo Carousel */}
        <ParallaxSection speed={0.4}>
          <div className="container mx-auto px-4 py-16">
            <h3 className="text-4xl font-bold text-center text-white mb-12">
              Our Story
            </h3>
            <PhotoCarousel
              images={data.photos}
              effect="3d-coverflow"
              autoPlay
              interval={5000}
              navigation
              pagination
            />
          </div>
        </ParallaxSection>

        {/* Event Details */}
        <ParallaxSection speed={0.3}>
          <div className="container mx-auto px-4 py-16">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-12 max-w-2xl mx-auto">
              <h3 className="text-3xl font-bold text-purple-900 mb-8 text-center">
                Wedding Details
              </h3>
              <div className="space-y-6 text-center">
                <div>
                  <p className="text-lg text-gray-600">Date</p>
                  <p className="text-2xl font-bold text-purple-900">
                    {data.weddingDate}
                  </p>
                </div>
                <div>
                  <p className="text-lg text-gray-600">Venue</p>
                  <p className="text-2xl font-bold text-purple-900">
                    {data.venue}
                  </p>
                </div>
                <div>
                  <p className="text-lg text-gray-600">Time</p>
                  <p className="text-2xl font-bold text-purple-900">
                    {data.time}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ParallaxSection>

        {/* RSVP Section */}
        <ParallaxSection speed={0.2}>
          <div className="container mx-auto px-4 py-16">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-12 max-w-2xl mx-auto">
              <h3 className="text-3xl font-bold text-purple-900 mb-8 text-center">
                RSVP
              </h3>
              <RSVPForm
                invitationId={data.id}
                onSuccess={() => setShowFireworks(true)}
              />
            </div>
          </div>
        </ParallaxSection>

        {/* Fireworks on RSVP */}
        {showFireworks && (
          <FireworksCanvas
            trigger="auto"
            color={['#D4AF37', '#FF6B9D', '#5D1A8B']}
            intensity="high"
            duration={5000}
          />
        )}
      </VideoBackground>
    </div>
  );
}
```

### **Step 4: Export Template**

```typescript
// components/templates-v2/themes/RoyalTemplate/index.ts
export { RoyalTemplate } from './RoyalTemplate';
export { royalConfig } from './config';
```

---

## 🎨 Design Guidelines

### Color Palettes (Research-Based)

**Royal/Luxury:**
- Primary: Deep purple (#5D1A8B)
- Secondary: Gold (#D4AF37)
- Accent: Pink (#FF6B9D)

**Traditional Indian:**
- Primary: Burgundy (#8B1538)
- Secondary: Gold (#B8860B)
- Accent: Saffron (#FF9933)

**Modern Minimal:**
- Primary: Navy (#1E3A8A)
- Secondary: Coral (#FF6B6B)
- Accent: Teal (#4ECDC4)

### Typography

**Headings:**
- Elegant: Playfair Display, Cormorant
- Modern: Inter, Poppins
- Traditional: Noto Serif, Libre Baskerville

**Body:**
- Always: Inter, -apple-system

### Spacing

**Mobile-First:**
```css
padding: 1rem;      /* Mobile */
padding: 2rem;      /* Tablet */
padding: 4rem;      /* Desktop */
```

---

## 🎬 Animation Guidelines

### Entrance Animations

**Hero Section:**
```typescript
<motion.div
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1, ease: 'easeOut' }}
>
  <h1>You're Invited</h1>
</motion.div>
```

**Stagger Children:**
```typescript
<motion.div
  variants={containerVariants}
  initial="hidden"
  animate="visible"
>
  {items.map((item, i) => (
    <motion.div key={i} variants={itemVariants}>
      {item}
    </motion.div>
  ))}
</motion.div>
```

### Scroll Animations

```typescript
import { useInView } from 'framer-motion';

const ref = useRef(null);
const isInView = useInView(ref, { once: true });

<div ref={ref} style={{
  opacity: isInView ? 1 : 0,
  transform: isInView ? 'translateY(0)' : 'translateY(50px)',
  transition: 'all 0.6s ease-out'
}}>
  Content
</div>
```

---

## 📱 Mobile Optimization

### Responsive Design

```typescript
const isMobile = useMediaQuery('(max-width: 768px)');

<FloatingParticles 
  count={isMobile ? 25 : 100}
  speed={isMobile ? 'slow' : 'normal'}
/>

{!isMobile && <SparkleTrail />}
```

### Touch-Friendly

```css
/* Minimum tap target: 44x44px */
.button {
  min-width: 44px;
  min-height: 44px;
  padding: 12px 24px;
}
```

### Performance

```typescript
// Lazy load heavy components
const VideoBackground = dynamic(
  () => import('@/components/animations-v2/VideoBackground'),
  { ssr: false }
);
```

---

## ✅ Template Checklist

Before marking a template complete:

### Visual
- [ ] Video background OR rich animations
- [ ] Floating particles/emojis
- [ ] Parallax scrolling
- [ ] 3D effects (flip card, etc.)
- [ ] Unique color palette
- [ ] Custom typography

### Interactive
- [ ] Photo carousel with lightbox
- [ ] Countdown timer
- [ ] Working RSVP form
- [ ] Background music player
- [ ] Celebration effects (fireworks/confetti)

### Technical
- [ ] Mobile responsive
- [ ] Performance optimized
- [ ] TypeScript types
- [ ] Error handling
- [ ] Loading states

### Data
- [ ] Saves to Supabase
- [ ] Real-time updates
- [ ] Email notifications
- [ ] Calendar integration

---

## 🎯 AI Agent Instructions

**To create a new template:**

1. **Copy this structure:**
```bash
mkdir components/templates-v2/themes/YourTemplate
cd components/templates-v2/themes/YourTemplate
touch YourTemplate.tsx config.ts index.ts README.md
```

2. **Define config first** (colors, features, animations)

3. **Build component using animations from library**

4. **Test on mobile AND desktop**

5. **Ensure RSVP works** (saves to database)

6. **Add celebration effects** (fireworks, confetti)

7. **Document in README.md**

**Example README.md:**
```markdown
# Royal Template

## Features
- Video background
- 3D flip cards
- Photo carousel
- Fireworks on RSVP

## Usage
\`\`\`typescript
import { RoyalTemplate } from '@/components/templates-v2/themes/RoyalTemplate';

<RoyalTemplate data={invitationData} />
\`\`\`

## Props
- `data`: InvitationData object

## Customization
- Change colors in `config.ts`
- Swap video in props
- Modify animations in `animations.ts`
```

---

## 🚀 Next Steps

**Build Order:**
1. ✅ Create Royal template (showcase)
2. ⏳ Create Traditional template
3. ⏳ Create Modern template
4. ⏳ Create more...

**Each template should:**
- Take 2-3 days to build properly
- Be worth ₹149 minimum
- Have unique visual identity
- Include ALL interactive features

---

## 💡 Pro Tips

### Make it Special:
1. **Theme-specific animations** - Royal gets crowns, Traditional gets diyas
2. **Cultural elements** - Mehndi patterns, rangoli, mandalas
3. **Storytelling** - Timeline of relationship, family introductions
4. **Personalization** - Custom videos, photos, music
5. **Surprise moments** - Hidden Easter eggs, special effects

### Avoid:
1. ❌ Just changing colors
2. ❌ Same layout for every template
3. ❌ Static content only
4. ❌ Broken functionality
5. ❌ Poor mobile experience

---

**Remember: Templates should make couples say "WOW, I want THIS for my wedding!" 🎉**
