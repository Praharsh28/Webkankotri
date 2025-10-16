# ✨ Animation Library V2 - Documentation

## Advanced Wedding Invitation Animations

**Built with:** Framer Motion, React Spring, Lottie, Custom Canvas

---

## 🎯 Philosophy

**Goal:** Make wedding invitations feel magical, not gimmicky.

### Principles:
1. ✨ **Subtle & Elegant** - Enhance, don't distract
2. 🚀 **Performant** - 60fps on mobile
3. 🎨 **Customizable** - Easy props configuration
4. 🔧 **Reusable** - Works in any template
5. 📱 **Mobile-First** - Touch-friendly

---

## 📦 Installation

Already installed:
```bash
npm install framer-motion @react-spring/web lottie-react
npm install react-player use-sound swiper
npm install yet-another-react-lightbox react-use-measure
```

---

## 🎨 Animation Categories

### 1. Core Animations (Background/Layout)
- ParallaxSection
- FloatingParticles
- VideoBackground
- AudioPlayer
- ScrollTrigger

### 2. Effects (Visual Enhancement)
- FireworksCanvas
- ConfettiExplosion
- SparkleTrail
- GlowEffect
- MorphingBackground

### 3. 3D/Advanced
- FlipCard3D
- ParallaxLayers
- LottiePlayer

### 4. Interactive Components
- CountdownTimer
- PhotoCarousel
- LightboxGallery
- InteractiveTimeline

---

## 📚 Animation Components

### 🌊 ParallaxSection

**Purpose:** Smooth parallax scrolling effect

**Props:**
```typescript
interface ParallaxSectionProps {
  children: React.ReactNode;
  speed?: number;              // -1 to 1 (default: 0.5)
  direction?: 'vertical' | 'horizontal';
  className?: string;
}
```

**Usage:**
```typescript
<ParallaxSection speed={0.5}>
  <h1>Wedding Invitation</h1>
</ParallaxSection>
```

**Best For:**
- Hero sections
- Background images
- Layered content

---

### ✨ FloatingParticles

**Purpose:** Floating animated elements (petals, sparkles, emojis)

**Props:**
```typescript
interface FloatingParticlesProps {
  count?: number;              // Number of particles (default: 50)
  type?: 'petals' | 'sparkles' | 'custom';
  emojis?: string[];           // Custom emojis ['🌸', '✨']
  speed?: 'slow' | 'normal' | 'fast';
  color?: string;              // Particle color
  size?: [number, number];     // Min/max size
  opacity?: [number, number];  // Min/max opacity
}
```

**Usage:**
```typescript
<FloatingParticles 
  count={100}
  type="petals"
  speed="slow"
  color="#D4AF37"
/>

<FloatingParticles 
  count={50}
  emojis={['🪔', '✨', '💐']}
  speed="normal"
/>
```

**Best For:**
- Background ambiance
- Cultural elements (diyas, rangoli)
- Festive atmosphere

---

### 🎥 VideoBackground

**Purpose:** Full-screen video backgrounds with overlay

**Props:**
```typescript
interface VideoBackgroundProps {
  src: string;                 // Video URL
  poster?: string;             // Poster image
  overlay?: number;            // Overlay opacity (0-1)
  overlayColor?: string;       // Overlay color
  muted?: boolean;
  loop?: boolean;
  autoPlay?: boolean;
  children?: React.ReactNode;
}
```

**Usage:**
```typescript
<VideoBackground 
  src="/videos/palace-garden.mp4"
  poster="/images/poster.jpg"
  overlay={0.4}
  overlayColor="rgba(139, 21, 56, 0.5)"
  loop
  muted
>
  <InvitationContent />
</VideoBackground>
```

**Best For:**
- Royal/luxury templates
- Venue showcases
- Ambient backgrounds

---

### 🎵 AudioPlayer

**Purpose:** Background music with controls

**Props:**
```typescript
interface AudioPlayerProps {
  src: string;                 // Audio URL
  autoPlay?: boolean;
  volume?: number;             // 0-1 (default: 0.3)
  loop?: boolean;
  controls?: 'full' | 'minimal' | 'none';
  position?: 'top-right' | 'bottom-right' | 'bottom-left';
}
```

**Usage:**
```typescript
<AudioPlayer 
  src="/music/wedding-theme.mp3"
  autoPlay={false}
  volume={0.3}
  loop
  controls="minimal"
  position="bottom-right"
/>
```

**Best For:**
- Romantic atmosphere
- Traditional music
- Custom playlists

---

### 🎆 FireworksCanvas

**Purpose:** Animated fireworks effect

**Props:**
```typescript
interface FireworksCanvasProps {
  trigger?: 'auto' | 'scroll' | 'click';
  color?: string | string[];   // Single or array of colors
  intensity?: 'low' | 'medium' | 'high';
  duration?: number;           // Duration in ms
  position?: 'fullscreen' | 'section';
}
```

**Usage:**
```typescript
<FireworksCanvas 
  trigger="scroll"
  color={['#D4AF37', '#FF6B9D', '#4ECDC4']}
  intensity="medium"
  duration={3000}
/>
```

**Best For:**
- Celebration moments
- RSVP success
- Section transitions

---

### 🎊 ConfettiExplosion

**Purpose:** Confetti burst effect

**Props:**
```typescript
interface ConfettiExplosionProps {
  trigger?: boolean;           // Trigger explosion
  colors?: string[];
  particleCount?: number;
  spread?: number;             // Degrees (default: 360)
  origin?: { x: number; y: number };
  duration?: number;
}
```

**Usage:**
```typescript
const [showConfetti, setShowConfetti] = useState(false);

<button onClick={() => setShowConfetti(true)}>
  RSVP
</button>

<ConfettiExplosion 
  trigger={showConfetti}
  colors={['#D4AF37', '#8B1538']}
  particleCount={150}
  spread={360}
/>
```

**Best For:**
- RSVP submission
- Special announcements
- Interactive moments

---

### ✨ SparkleTrail

**Purpose:** Sparkle effect following cursor

**Props:**
```typescript
interface SparkleTrailProps {
  color?: string;
  size?: number;
  count?: number;              // Sparkles per frame
  lifetime?: number;           // Ms before fade
  disabled?: boolean;          // Mobile disable
}
```

**Usage:**
```typescript
<SparkleTrail 
  color="#D4AF37"
  size={6}
  count={3}
  lifetime={1000}
  disabled={isMobile}
/>
```

**Best For:**
- Luxury templates
- Interactive elements
- Desktop experience

---

### 🌟 GlowEffect

**Purpose:** Glowing text/elements

**Props:**
```typescript
interface GlowEffectProps {
  children: React.ReactNode;
  glowColor?: string;
  intensity?: number;          // 0-10
  pulseSpeed?: number;         // Seconds per pulse
  blur?: number;               // Blur radius
}
```

**Usage:**
```typescript
<GlowEffect 
  glowColor="#D4AF37"
  intensity={5}
  pulseSpeed={2}
>
  <h1>You're Invited</h1>
</GlowEffect>
```

**Best For:**
- Headings
- Important text
- Call-to-actions

---

### 🎴 FlipCard3D

**Purpose:** 3D card flip animation

**Props:**
```typescript
interface FlipCard3DProps {
  front: React.ReactNode;
  back: React.ReactNode;
  trigger?: 'hover' | 'click';
  direction?: 'horizontal' | 'vertical';
  duration?: number;
}
```

**Usage:**
```typescript
<FlipCard3D 
  front={<InvitationCover />}
  back={<EventDetails />}
  trigger="click"
  direction="horizontal"
/>
```

**Best For:**
- Cover reveals
- Two-sided content
- Interactive storytelling

---

### 📸 PhotoCarousel

**Purpose:** Smooth photo slider

**Props:**
```typescript
interface PhotoCarouselProps {
  images: Array<{ src: string; alt: string; caption?: string }>;
  autoPlay?: boolean;
  interval?: number;           // Ms between slides
  effect?: '3d-coverflow' | 'fade' | 'slide';
  navigation?: boolean;
  pagination?: boolean;
}
```

**Usage:**
```typescript
<PhotoCarousel 
  images={couplePhotos}
  autoPlay
  interval={5000}
  effect="3d-coverflow"
  navigation
  pagination
/>
```

**Best For:**
- Couple photos
- Venue showcase
- Memories gallery

---

### 🖼️ LightboxGallery

**Purpose:** Full-screen image viewer

**Props:**
```typescript
interface LightboxGalleryProps {
  images: Array<{ src: string; alt: string }>;
  thumbnailSize?: 'small' | 'medium' | 'large';
  columns?: number;            // Grid columns
  spacing?: number;            // Gap between images
  animation?: 'fade' | 'zoom' | 'slide';
}
```

**Usage:**
```typescript
<LightboxGallery 
  images={weddingPhotos}
  thumbnailSize="medium"
  columns={3}
  spacing={16}
  animation="zoom"
/>
```

**Best For:**
- Photo galleries
- Venue images
- Guest viewing

---

### ⏱️ CountdownTimer

**Purpose:** Wedding date countdown

**Props:**
```typescript
interface CountdownTimerProps {
  targetDate: Date;
  format?: 'full' | 'compact';
  labels?: {
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
  };
  style?: 'elegant' | 'modern' | 'minimal';
  size?: 'small' | 'medium' | 'large';
}
```

**Usage:**
```typescript
<CountdownTimer 
  targetDate={new Date('2025-06-15')}
  format="full"
  labels={{
    days: 'Days',
    hours: 'Hours',
    minutes: 'Minutes',
    seconds: 'Seconds'
  }}
  style="elegant"
  size="large"
/>
```

**Best For:**
- Building anticipation
- Header sections
- Save the date

---

### 🎬 LottiePlayer

**Purpose:** Complex vector animations

**Props:**
```typescript
interface LottiePlayerProps {
  src: string;                 // Lottie JSON URL
  loop?: boolean;
  autoPlay?: boolean;
  speed?: number;
  width?: number;
  height?: number;
}
```

**Usage:**
```typescript
<LottiePlayer 
  src="/animations/mandala-rotating.json"
  loop
  autoPlay
  speed={0.8}
  width={300}
  height={300}
/>
```

**Best For:**
- Complex illustrations
- Cultural elements
- Brand animations

---

## 🎯 Usage Patterns

### Pattern 1: Hero Section with Multiple Animations

```typescript
<VideoBackground src="/videos/palace.mp4" overlay={0.3}>
  <FloatingParticles type="sparkles" count={100} />
  <ParallaxSection speed={0.3}>
    <GlowEffect glowColor="#D4AF37">
      <h1>You're Invited</h1>
    </GlowEffect>
  </ParallaxSection>
  <AudioPlayer 
    src="/music/theme.mp3"
    controls="minimal"
    position="bottom-right"
  />
</VideoBackground>
```

### Pattern 2: Interactive Photo Section

```typescript
<PhotoCarousel 
  images={couplePhotos}
  effect="3d-coverflow"
  autoPlay
/>
<SparkleTrail color="#gold" disabled={isMobile} />
```

### Pattern 3: Celebration Moment

```typescript
const handleRSVP = () => {
  // Submit RSVP
  setShowFireworks(true);
  setShowConfetti(true);
};

<RSVPForm onSubmit={handleRSVP} />
{showFireworks && <FireworksCanvas trigger="auto" />}
{showConfetti && <ConfettiExplosion trigger={true} />}
```

---

## ⚡ Performance Tips

### 1. **Lazy Load Heavy Animations**
```typescript
const FireworksCanvas = dynamic(() => import('./FireworksCanvas'), {
  ssr: false,
  loading: () => <div>Loading...</div>
});
```

### 2. **Disable on Mobile (When Needed)**
```typescript
{!isMobile && <SparkleTrail />}
```

### 3. **Use `will-change` CSS**
```css
.animated-element {
  will-change: transform, opacity;
}
```

### 4. **Limit Particle Count on Mobile**
```typescript
<FloatingParticles 
  count={isMobile ? 25 : 100}
/>
```

### 5. **Optimize Videos**
- Use H.264 codec
- Keep under 5MB
- Provide poster image
- Consider WebM for better compression

---

## 🎨 Animation Combinations

### Royal Template:
```typescript
<VideoBackground src="/palace.mp4">
  <FloatingParticles emojis={['👑', '💎']} count={50} />
  <ParallaxSection>
    <FlipCard3D 
      front={<RoyalCrest />}
      back={<Details />}
    />
  </ParallaxSection>
  <FireworksCanvas trigger="scroll" />
</VideoBackground>
```

### Traditional Template:
```typescript
<MorphingBackground shapes={['mandala', 'flower']}>
  <FloatingParticles emojis={['🪔', '🌸']} count={75} />
  <LottiePlayer src="/rangoli.json" loop />
  <GlowEffect glowColor="#D4AF37">
    <HeaderSection />
  </GlowEffect>
  <AudioPlayer src="/traditional-music.mp3" />
</MorphingBackground>
```

### Modern Template:
```typescript
<ParallaxLayers>
  <SparkleTrail color="#4ECDC4" />
  <PhotoCarousel effect="fade" autoPlay />
  <CountdownTimer 
    targetDate={weddingDate}
    style="minimal"
  />
  <ConfettiExplosion trigger={rsvpSuccess} />
</ParallaxLayers>
```

---

## 📱 Mobile Considerations

### Auto-Disable Heavy Animations:
```typescript
const isMobile = useMediaQuery('(max-width: 768px)');

<>
  {!isMobile && <SparkleTrail />}
  {!isMobile && <ParticleSystem />}
  <FloatingParticles count={isMobile ? 20 : 100} />
</>
```

### Touch-Friendly Interactions:
```typescript
<FlipCard3D 
  trigger={isMobile ? 'click' : 'hover'}
/>
```

---

## 🎓 AI Agent Instructions

**To use animations in templates:**

1. Import from `/components/animations-v2/`
2. Wrap content with animation components
3. Configure props based on template needs
4. Test on desktop AND mobile
5. Optimize performance (lazy load if needed)

**Example:**
```typescript
import { FloatingParticles, GlowEffect } from '@/components/animations-v2';

export function MyTemplate() {
  return (
    <div>
      <FloatingParticles count={50} type="petals" />
      <GlowEffect glowColor="#gold">
        <h1>Invitation</h1>
      </GlowEffect>
    </div>
  );
}
```

---

## 🚀 Next Steps

**Build Order:**
1. ✅ ParallaxSection
2. ✅ FloatingParticles
3. ✅ VideoBackground
4. ✅ FireworksCanvas
5. ✅ PhotoCarousel
6. ✅ CountdownTimer
7. ✅ AudioPlayer
8. ✅ GlowEffect

**Then:** Combine in first Royal template!

---

**Remember:** Animations should enhance, not overpower. Less is often more. 🎨
