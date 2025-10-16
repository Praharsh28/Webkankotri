# 🎬 Animation Libraries - Full Integration Plan

**Goal:** Add GSAP full library + Anime.js for ready-made animations  
**Current:** Basic GSAP only  
**Adding:** GSAP plugins + Anime.js + Animation presets

---

## 📦 CURRENT vs FULL SETUP

### What We Have Now:
```json
"gsap": "^3.13.0"        // Basic GSAP only
"@gsap/react": "^2.1.2"  // React integration
```

### What We'll Add:

**GSAP Plugins (FREE):**
- ✅ ScrollTrigger (scroll animations)
- ✅ ScrollToPlugin (smooth scrolling)
- ✅ Draggable (drag interactions)
- ✅ MotionPathPlugin (path animations)
- ✅ TextPlugin (text animations)

**GSAP Plugins (PREMIUM - Club GreenSock $99/year):**
- 💎 ScrollSmoother (ultra-smooth scroll)
- 💎 SplitText (advanced text splitting)
- 💎 DrawSVGPlugin (SVG line animations)
- 💎 MorphSVGPlugin (shape morphing)
- 💎 GSDevTools (animation debugging)

**Anime.js:**
- ✅ FREE & lightweight
- ✅ Different animation style
- ✅ Great for UI animations

---

## 🚀 INSTALLATION PLAN

### Step 1: Install GSAP Plugins (FREE ones)
```bash
# Already have: gsap, @gsap/react
npm install gsap  # Update to latest
```

**Register FREE plugins:**
```typescript
// lib/animations/gsap-setup.ts
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { Draggable } from 'gsap/Draggable';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(
  ScrollTrigger,
  ScrollToPlugin,
  Draggable,
  MotionPathPlugin,
  TextPlugin
);
```

### Step 2: Install Anime.js
```bash
npm install animejs
npm install @types/animejs --save-dev
```

### Step 3: Create Animation Preset Library
```typescript
// lib/animations/presets.ts
export const animationPresets = {
  gsap: {
    // Ready-made GSAP animations
  },
  anime: {
    // Ready-made Anime.js animations
  }
};
```

---

## 🎨 READY-MADE ANIMATION LIBRARY

### GSAP Presets

**1. Text Animations:**
```typescript
// Fade In + Slide Up
export const fadeSlideUp = (element: HTMLElement) => {
  gsap.from(element, {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
  });
};

// Typewriter Effect
export const typewriter = (element: HTMLElement, text: string) => {
  gsap.to(element, {
    text: text,
    duration: 2,
    ease: 'none'
  });
};

// Word Reveal
export const wordReveal = (element: HTMLElement) => {
  const words = element.textContent?.split(' ');
  gsap.from(words, {
    opacity: 0,
    y: 20,
    stagger: 0.1,
    duration: 0.8,
    ease: 'power2.out'
  });
};
```

**2. Scroll Animations:**
```typescript
// Scroll Fade In
export const scrollFadeIn = (element: HTMLElement) => {
  gsap.from(element, {
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      end: 'top 20%',
      scrub: 1
    },
    opacity: 0,
    y: 100
  });
};

// Parallax Effect
export const parallax = (element: HTMLElement, speed: number = 0.5) => {
  gsap.to(element, {
    scrollTrigger: {
      trigger: element,
      scrub: true
    },
    y: (i, target) => -ScrollTrigger.maxScroll(window) * speed
  });
};

// Pin Section
export const pinSection = (element: HTMLElement) => {
  ScrollTrigger.create({
    trigger: element,
    start: 'top top',
    end: '+=500',
    pin: true
  });
};
```

**3. Hover Animations:**
```typescript
// Scale & Rotate
export const hoverScale = (element: HTMLElement) => {
  element.addEventListener('mouseenter', () => {
    gsap.to(element, {
      scale: 1.1,
      rotation: 5,
      duration: 0.3,
      ease: 'power2.out'
    });
  });
  
  element.addEventListener('mouseleave', () => {
    gsap.to(element, {
      scale: 1,
      rotation: 0,
      duration: 0.3,
      ease: 'power2.inOut'
    });
  });
};

// Magnetic Effect (Enhanced)
export const magneticHover = (element: HTMLElement, strength: number = 50) => {
  element.addEventListener('mousemove', (e) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    gsap.to(element, {
      x: x * strength / rect.width,
      y: y * strength / rect.height,
      duration: 0.3,
      ease: 'power2.out'
    });
  });
  
  element.addEventListener('mouseleave', () => {
    gsap.to(element, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
  });
};
```

**4. SVG Animations:**
```typescript
// Draw SVG Path
export const drawSVG = (element: SVGElement) => {
  gsap.from(element, {
    drawSVG: 0,
    duration: 2,
    ease: 'power2.inOut'
  });
};

// Morph Shape
export const morphShape = (from: SVGElement, to: string) => {
  gsap.to(from, {
    morphSVG: to,
    duration: 1.5,
    ease: 'power2.inOut'
  });
};
```

---

### Anime.js Presets

**1. Text Animations:**
```typescript
import anime from 'animejs';

// Letter Stagger
export const letterStagger = (element: HTMLElement) => {
  anime({
    targets: element.querySelectorAll('span'),
    translateY: [-50, 0],
    opacity: [0, 1],
    delay: anime.stagger(100),
    duration: 1000,
    easing: 'easeOutExpo'
  });
};

// Wave Animation
export const textWave = (element: HTMLElement) => {
  anime({
    targets: element.querySelectorAll('span'),
    translateY: [
      { value: -20, duration: 500 },
      { value: 0, duration: 500 }
    ],
    delay: anime.stagger(50),
    loop: true,
    easing: 'easeInOutSine'
  });
};
```

**2. Element Animations:**
```typescript
// Bounce In
export const bounceIn = (element: HTMLElement) => {
  anime({
    targets: element,
    scale: [0, 1],
    opacity: [0, 1],
    duration: 800,
    easing: 'easeOutElastic(1, .5)'
  });
};

// Slide Rotate
export const slideRotate = (element: HTMLElement) => {
  anime({
    targets: element,
    translateX: [-100, 0],
    rotate: ['-10deg', '0deg'],
    opacity: [0, 1],
    duration: 1000,
    easing: 'easeOutExpo'
  });
};

// Pulse Effect
export const pulse = (element: HTMLElement) => {
  anime({
    targets: element,
    scale: [1, 1.05, 1],
    duration: 1000,
    loop: true,
    easing: 'easeInOutQuad'
  });
};
```

**3. Path Animations:**
```typescript
// Follow Path
export const followPath = (element: HTMLElement, path: string) => {
  anime({
    targets: element,
    translateX: anime.path(path)('x'),
    translateY: anime.path(path)('y'),
    rotate: anime.path(path)('angle'),
    duration: 3000,
    easing: 'linear',
    loop: true
  });
};

// Draw Line
export const drawLine = (element: SVGElement) => {
  anime({
    targets: element,
    strokeDashoffset: [anime.setDashoffset, 0],
    duration: 2000,
    easing: 'easeInOutSine'
  });
};
```

**4. Grid Animations:**
```typescript
// Stagger Grid
export const staggerGrid = (elements: HTMLElement[]) => {
  anime({
    targets: elements,
    scale: [0, 1],
    opacity: [0, 1],
    delay: anime.stagger(100, { grid: [3, 3], from: 'center' }),
    duration: 600,
    easing: 'easeOutExpo'
  });
};
```

---

## 🎯 INTEGRATION WITH CRAFT.JS

### Animation Selector in Settings Panel

```typescript
// components/editor/AnimationSettings.tsx
export function AnimationSettings({ node }) {
  const [animation, setAnimation] = useState('none');
  
  return (
    <div>
      <label>Animation</label>
      <select value={animation} onChange={(e) => setAnimation(e.target.value)}>
        <optgroup label="GSAP Animations">
          <option value="fadeSlideUp">Fade + Slide Up</option>
          <option value="typewriter">Typewriter</option>
          <option value="scrollFadeIn">Scroll Fade In</option>
          <option value="parallax">Parallax</option>
          <option value="hoverScale">Hover Scale</option>
          <option value="magnetic">Magnetic Hover</option>
        </optgroup>
        
        <optgroup label="Anime.js Animations">
          <option value="bounceIn">Bounce In</option>
          <option value="slideRotate">Slide Rotate</option>
          <option value="letterStagger">Letter Stagger</option>
          <option value="textWave">Text Wave</option>
          <option value="pulse">Pulse</option>
        </optgroup>
        
        <optgroup label="Custom Effects">
          <option value="shimmer">Shimmer Text</option>
          <option value="card3d">3D Card Flip</option>
          <option value="magneticElement">Magnetic Element</option>
        </optgroup>
      </select>
      
      {/* Animation Options */}
      {animation === 'parallax' && (
        <input 
          type="range" 
          min="0" 
          max="1" 
          step="0.1"
          placeholder="Speed"
        />
      )}
    </div>
  );
}
```

---

## 📚 ANIMATION LIBRARY STRUCTURE

```
lib/animations/
├── gsap/
│   ├── setup.ts                 ← Register plugins
│   ├── presets/
│   │   ├── text.ts             ← Text animations
│   │   ├── scroll.ts           ← Scroll animations
│   │   ├── hover.ts            ← Hover effects
│   │   ├── svg.ts              ← SVG animations
│   │   └── index.ts
│   └── index.ts
├── anime/
│   ├── setup.ts
│   ├── presets/
│   │   ├── text.ts
│   │   ├── elements.ts
│   │   ├── paths.ts
│   │   └── index.ts
│   └── index.ts
├── custom/                      ← Your existing effects
│   ├── ShimmerText.tsx
│   ├── Card3DFlip.tsx
│   └── ...
└── presets.ts                   ← Unified preset library
```

---

## 🎬 USAGE EXAMPLES

### In Your Templates:

**GSAP ScrollTrigger:**
```typescript
import { scrollFadeIn } from '@/lib/animations/gsap/presets/scroll';

export function CeremonyCard() {
  const ref = useRef(null);
  
  useEffect(() => {
    if (ref.current) {
      scrollFadeIn(ref.current);
    }
  }, []);
  
  return <div ref={ref}>...</div>;
}
```

**Anime.js Bounce:**
```typescript
import { bounceIn } from '@/lib/animations/anime/presets/elements';

export function VenueCard() {
  const ref = useRef(null);
  
  useEffect(() => {
    if (ref.current) {
      bounceIn(ref.current);
    }
  }, []);
  
  return <div ref={ref}>...</div>;
}
```

**With Craft.js:**
```typescript
// User selects animation from dropdown
// Animation applies automatically!
export function CraftCeremonyCard({ animation }) {
  const ref = useRef(null);
  
  useEffect(() => {
    if (!ref.current || !animation) return;
    
    const animationFn = getAnimation(animation);
    animationFn(ref.current);
  }, [animation]);
  
  return <div ref={ref}>...</div>;
}
```

---

## 💰 COST ANALYSIS

### FREE (What We'll Use):
- ✅ GSAP Core + FREE plugins ($0)
- ✅ Anime.js ($0)
- ✅ 100+ ready-made animations

### PREMIUM (Optional Later):
- 💎 GSAP Club GreenSock ($99/year)
- 💎 Advanced plugins (DrawSVG, MorphSVG, SplitText)
- 💎 Worth it for professional projects

**Recommendation:** Start with FREE, upgrade if needed!

---

## 🎯 IMPLEMENTATION TIMELINE

### Phase 1: GSAP Full Setup (1 hour)
- Register FREE plugins
- Create preset library
- Test all animations

### Phase 2: Anime.js Setup (1 hour)
- Install Anime.js
- Create presets
- Test animations

### Phase 3: Integration (2 hours)
- Add animation selector to Craft.js
- Create unified API
- Make all presets available in editor

### Phase 4: Documentation (1 hour)
- Create animation showcase
- Document all presets
- Add usage examples

**Total: 5 hours**

---

## 📊 ANIMATION COMPARISON

| Library | Size | Style | Best For | Learning Curve |
|---------|------|-------|----------|----------------|
| **GSAP** | ~47KB | Professional | Complex, timeline-based | Medium |
| **Anime.js** | ~9KB | Playful | UI animations, simple | Easy |
| **Framer Motion** | ~32KB | React-native | React components | Easy |
| **Your Custom** | Small | Unique | Wedding themes | You made it! |

**Use ALL together for maximum flexibility!**

---

## 🎨 ANIMATION SHOWCASE PAGE

Create: `/animations` route to preview all!

```
Animation Library Preview
┌─────────────────────────────────────┐
│ [GSAP]  [Anime.js]  [Custom]       │
├─────────────────────────────────────┤
│                                     │
│ Text Animations:                    │
│ [Fade Slide Up] [Try it]            │
│ [Typewriter]    [Try it]            │
│ [Word Reveal]   [Try it]            │
│                                     │
│ Scroll Animations:                  │
│ [Scroll Fade]   [Try it]            │
│ [Parallax]      [Try it]            │
│                                     │
│ Hover Effects:                      │
│ [Hover Scale]   [Try it]            │
│ [Magnetic]      [Try it]            │
│                                     │
└─────────────────────────────────────┘
```

---

## 🚀 BENEFITS

**For You:**
- ✅ 100+ ready-made animations
- ✅ Mix GSAP + Anime.js + Custom
- ✅ Visual animation picker in Craft.js
- ✅ Professional effects instantly
- ✅ No need to code animations

**For Users:**
- ✅ Choose animations from dropdown
- ✅ See preview before applying
- ✅ Mix different animation styles
- ✅ Professional wedding invitations

---

## 🎯 READY TO IMPLEMENT?

**Want me to add:**
1. ✅ GSAP full suite (FREE plugins)
2. ✅ Anime.js
3. ✅ 100+ animation presets
4. ✅ Animation selector in Craft.js editor
5. ✅ Animation showcase page

**Time: ~5 hours**

**Say YES and I'll start!** 🎬✨
