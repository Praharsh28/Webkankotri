# 📦 COMPONENT CATALOG - All Available Components

**AI Instruction:** Reference this when integrating components. Copy import/usage exactly.

---

## MAIN WRAPPER

### KankotriEnhanced (Traditional)
```typescript
// FILE: components/templates-v2/themes/KankotriTemplate/KankotriEnhanced.tsx
// PURPOSE: Traditional Kankotri with heavy animations, professional SVGs
// USAGE: For traditional Gujarati weddings with authentic cultural elements

import { KankotriEnhanced } from '@/components/templates-v2/themes/KankotriTemplate/KankotriEnhanced';
import { exampleKankotri } from '@/lib/data/example-kankotri';

<KankotriEnhanced data={exampleKankotri} />

// PROPS
interface KankotriEnhancedProps {
  data: KankotriData;  // See 04_TYPE_DEFINITIONS.md
}

// FEATURES
- Normalizes dates (new Date(data.wedding.date))
- Wraps in ErrorBoundary
- Heavy animations (PhysicsPetals 50 + AdvancedParticles 80)
- Includes AmbientSound
- Professional SVG symbols (Ganesh, Peacock)
- Paper texture background overlay
- Traditional gold/green color scheme
```

### ModernKankotriEnhanced (PREMIUM EXPERT EDITION) ⭐
```typescript
// FILE: components/templates-v2/themes/ModernKankotri/ModernKankotriEnhanced.tsx
// PURPOSE: MAXIMUM ANIMATIONS - Premium modern template with jaw-dropping effects
// USAGE: High-end weddings, premium clients, WOW factor

import { ModernKankotriEnhanced } from '@/components/templates-v2/themes/ModernKankotri/ModernKankotriEnhanced';
import { exampleKankotri } from '@/lib/data/example-kankotri';

<ModernKankotriEnhanced data={exampleKankotri} />

// PROPS
interface ModernKankotriEnhancedProps {
  data: KankotriData;  // See 04_TYPE_DEFINITIONS.md
}

// FEATURES - 6 ANIMATION LAYERS! 🚀
- Normalizes dates (new Date(data.wedding.date))
- Wraps in ErrorBoundary
- Layer 1: PhysicsPetals (120 falling petals with gravity!)
- Layer 2: AdvancedParticles (150 interactive with connections)
- Layer 3: GoldDustCursor (premium sparkle trail)
- Layer 4: AmbientSound (Web Audio API synthesized)
- Layer 5: MagneticCursor (custom cursor follows smoothly)
- Layer 6: ParticleExplosion (40-particle burst on click!)
- Animated gradient overlays (living colors)
- Scroll reveals on ALL elements
- Gradient text effects
- Hover micro-interactions everywhere
- 5 pages (Cover, Invocation, Ceremonies, Timeline, Venue)
- Bundle: ~6 kB (HEAVY but worth it for premium pricing)
- Price point: $150-300 (vs $20 for basic)
```

### CinematicKankotriEnhanced (ULTRA PREMIUM CINEMATIC) 🎬⭐⭐⭐
```typescript
// FILE: components/templates-v2/themes/CinematicKankotri/CinematicKankotriEnhanced.tsx
// PURPOSE: ULTRA PREMIUM - Movie-quality cinematic template with 3D effects
// USAGE: Ultra-premium weddings, celebrity events, $500+ price point

import { CinematicKankotriEnhanced } from '@/components/templates-v2/themes/CinematicKankotri/CinematicKankotriEnhanced';
import { exampleKankotri } from '@/lib/data/example-kankotri';

<CinematicKankotriEnhanced data={exampleKankotri} />

// PROPS
interface CinematicKankotriEnhancedProps {
  data: KankotriData;  // See 04_TYPE_DEFINITIONS.md
}

// FEATURES - 8+ ANIMATION LAYERS! 🎬
- BLACK + GOLD cinematic color scheme
- 3D PERSPECTIVE transforms (rotateX, rotateY, translateZ)
- 5-LAYER PARALLAX system (each layer different speed)
- PhysicsPetals (200 falling - MASSIVE!)
- AdvancedParticles (200 with connections - HUGE!)
- Mouse-tracking 3D TILT effect (follows cursor)
- Cinematic wipe transitions
- Film grain + vignette overlay
- Animated light rays sweeping
- Shimmer gradient text (animated)
- 3D card flip effects on hover
- Cinematic glow effects
- Letterbox bars (movie style)
- GoldDustCursor + AmbientSound
- Bundle: ~4.3 kB (lightweight but ULTRA premium!)
- Price point: $500-2000 (ultra-premium tier)
- Demo: /template-demo/cinematic-kankotri
```

---

## PAGE COMPONENTS

### KankotriCover
```typescript
// FILE: components/templates-v2/themes/KankotriTemplate/pages/KankotriCover.tsx
// PURPOSE: Cover page with couple names, date, photos, animations

import { KankotriCover } from '@/components/templates-v2/themes/KankotriTemplate/pages/KankotriCover';

<KankotriCover
  groomName="Deep"
  brideName="Nisha"
  weddingDate={normalizedWeddingDate}
  couplePhoto="/images/couple.jpg"
  config={kankotriConfig}
/>

// PROPS
interface KankotriCoverProps {
  groomName: string;
  brideName: string;
  weddingDate: Date;            // MUST be Date object
  couplePhoto?: string;
  config: typeof kankotriConfig;
}

// FEATURES
- UTC-safe date formatting
- ProfessionalGanesh symbol
- EnhancedPeacock decoration
- ConfettiBurst animation
- GoldFrame border
```

### KankotriInvocation
```typescript
// FILE: components/templates-v2/themes/KankotriTemplate/pages/KankotriInvocation.tsx
// PURPOSE: Invocation page with hosts, venue, blessings

import { KankotriInvocation } from '@/components/templates-v2/themes/KankotriTemplate/pages/KankotriInvocation';

<KankotriInvocation
  groomName="Deep"
  brideName="Nisha"
  hosts={data.hosts}
  venue={data.wedding.venue}
  weddingDate={normalizedWeddingDate}
  config={kankotriConfig}
/>

// PROPS
interface KankotriInvocationProps {
  groomName: string;
  brideName: string;
  hosts: {
    groomSide: Array<{ name: string; relation: string; address?: string }>;
    brideSide: Array<{ name: string; relation: string; address?: string }>;
  };
  venue: Venue;
  weddingDate: Date;
  config: typeof kankotriConfig;
}

// FEATURES
- Om symbol
- Hosts list (groom & bride side)
- UTC-safe date/weekday
- Traditional border decorations
```

### KankotriCeremonies
```typescript
// FILE: components/templates-v2/themes/KankotriTemplate/pages/KankotriCeremonies.tsx
// PURPOSE: Pre-wedding ceremonies list (Garba, Haldi, etc.)

import { KankotriCeremonies } from '@/components/templates-v2/themes/KankotriTemplate/pages/KankotriCeremonies';

<KankotriCeremonies
  ceremonies={normalizedCeremonies}
  config={kankotriConfig}
/>

// PROPS
interface KankotriCeremoniesProps {
  ceremonies: Array<{
    id: string;
    name: string;
    nameGujarati: string;
    date: Date;              // MUST be Date object
    time: string;
    venue: string;
    type: 'mandap' | 'swagatam' | 'garba' | 'haldi';
  }>;
  config: typeof kankotriConfig;
}

// FEATURES
- UTC-safe date formatting
- Gujarati + English names
- Type-based icons (Diya, Rangoli, etc.)
- Scroll reveal animations
```

### KankotriVenue
```typescript
// FILE: components/templates-v2/themes/KankotriTemplate/pages/KankotriVenue.tsx
// PURPOSE: Venue details with map embed

import { KankotriVenue } from '@/components/templates-v2/themes/KankotriTemplate/pages/KankotriVenue';

<KankotriVenue
  venue={data.wedding.venue}
  config={kankotriConfig}
/>

// PROPS
interface KankotriVenueProps {
  venue: {
    name: string;
    address: string;
    city: string;
    state?: string;
    pincode?: string;
    mapUrl?: string;          // Google Maps embed URL
    phone?: string;
  };
  config: typeof kankotriConfig;
}

// FEATURES
- Google Maps embed
- Contact information
- Address formatting
- Directions link
```

---

## ANIMATION COMPONENTS

### PhysicsPetals
```typescript
// FILE: components/templates-v2/themes/KankotriTemplate/animations/PhysicsPetals.tsx
// PURPOSE: Physics-based falling flower petals (gravity, wind, drag)

import { PhysicsPetals } from '@/components/templates-v2/themes/KankotriTemplate/animations/PhysicsPetals';

<PhysicsPetals count={50} windStrength={0.5} />

// PROPS
interface PhysicsPetalsProps {
  count?: number;              // Default: 50
  windStrength?: number;       // Default: 0.5 (0-1 range)
  colors?: string[];           // Default: pink/rose palette
}

// DEFAULT COLORS
colors: ['#ff9999', '#ffb3ba', '#ffc8dd', '#f4c2c2', '#ff6b9d']

// PERFORMANCE
- Uses Canvas API
- Respects prefers-reduced-motion
- Deterministic initialization
```

### AdvancedParticles
```typescript
// FILE: components/templates-v2/themes/KankotriTemplate/animations/AdvancedParticles.tsx
// PURPOSE: Interactive particle system with connections

import { AdvancedParticles } from '@/components/templates-v2/themes/KankotriTemplate/animations/AdvancedParticles';

<AdvancedParticles count={80} interactive connections />

// PROPS
interface AdvancedParticlesProps {
  count?: number;              // Default: 80
  interactive?: boolean;       // Default: true (mouse repulsion)
  connections?: boolean;       // Default: true (draw lines between nearby)
}

// PERFORMANCE
- Uses Canvas API
- Mouse interaction optional
- Respects prefers-reduced-motion
- Deterministic particle placement
```

### SmoothScrollReveal
```typescript
// FILE: components/templates-v2/themes/KankotriTemplate/animations/SmoothScrollReveal.tsx
// PURPOSE: Scroll-triggered reveal animations

import { ScrollReveal, FadeIn, SlideUp, CountUp } from '@/components/templates-v2/themes/KankotriTemplate/animations/SmoothScrollReveal';

// Basic reveal
<ScrollReveal animation="fade" delay={0.2}>
  <h1>Revealed on scroll</h1>
</ScrollReveal>

// Animation types
<ScrollReveal animation="slide-up" />
<ScrollReveal animation="scale" />
<ScrollReveal animation="rotate" />
<ScrollReveal animation="blur" />

// Animated counter
<CountUp from={0} to={100} duration={2} />

// PROPS
interface ScrollRevealProps {
  children: ReactNode;
  animation?: 'fade' | 'slide-up' | 'slide-down' | 'scale' | 'rotate' | 'blur';
  delay?: number;             // Default: 0
  duration?: number;          // Default: 0.6
  once?: boolean;             // Default: true (animate only once)
  className?: string;
}
```

### FloatingPetals
```typescript
// FILE: components/templates-v2/themes/KankotriTemplate/animations/FloatingPetals.tsx
// PURPOSE: Simple floating petals (lighter than PhysicsPetals)

import { FloatingPetals } from '@/components/templates-v2/themes/KankotriTemplate/animations/FloatingPetals';

<FloatingPetals count={30} />

// PROPS
interface FloatingPetalsProps {
  count?: number;              // Default: 30
  colors?: string[];
}
```

### GoldDustCursor
```typescript
// FILE: components/templates-v2/themes/KankotriTemplate/animations/GoldDustCursor.tsx
// PURPOSE: Gold particle trail following cursor

import { GoldDustCursor } from '@/components/templates-v2/themes/KankotriTemplate/animations/GoldDustCursor';

<GoldDustCursor />

// PROPS: None (automatically tracks cursor)

// PERFORMANCE
- Desktop only (hidden on mobile)
- Uses Canvas API
- Minimal performance impact
```

---

## SYMBOL COMPONENTS (SVG)

### ProfessionalGanesh
```typescript
// FILE: components/templates-v2/themes/KankotriTemplate/symbols/ProfessionalGanesh.tsx
// PURPOSE: 200+ line detailed Ganesh SVG illustration

import { ProfessionalGanesh } from '@/components/templates-v2/themes/KankotriTemplate/symbols/ProfessionalGanesh';

<ProfessionalGanesh size={150} color="#2d5016" />

// PROPS
interface ProfessionalGaneshProps {
  size?: number;              // Default: 120 (width in px)
  color?: string;             // Default: '#d4af37' (gold)
  className?: string;
}

// USAGE TIPS
- Use on cover/invocation pages
- size={150-200} for hero placement
- size={80-100} for decorative
- Color should match theme (gold/green)
```

### EnhancedPeacock
```typescript
// FILE: components/templates-v2/themes/KankotriTemplate/symbols/EnhancedPeacock.tsx
// PURPOSE: 250+ line detailed peacock SVG illustration

import { EnhancedPeacock } from '@/components/templates-v2/themes/KankotriTemplate/symbols/EnhancedPeacock';

<EnhancedPeacock size={200} color="#2d5016" />

// PROPS
interface EnhancedPeacockProps {
  size?: number;              // Default: 150
  color?: string;             // Default: '#2d5016' (deep green)
  className?: string;
}

// USAGE TIPS
- Decorative corners/borders
- size={150-250} recommended
- Pairs well with gold accents
```

### OmSymbol
```typescript
// FILE: components/templates-v2/themes/KankotriTemplate/symbols/OmSymbol.tsx
// PURPOSE: Om (ॐ) symbol SVG

import { OmSymbol } from '@/components/templates-v2/themes/KankotriTemplate/symbols/OmSymbol';

<OmSymbol size={80} color="#d4af37" />

// PROPS
interface OmSymbolProps {
  size?: number;
  color?: string;
  className?: string;
}
```

### Lotus
```typescript
// FILE: components/templates-v2/themes/KankotriTemplate/symbols/Lotus.tsx
// PURPOSE: Lotus flower symbol

import { Lotus } from '@/components/templates-v2/themes/KankotriTemplate/symbols/Lotus';

<Lotus size={60} color="#ff6b9d" />

// PROPS
interface LotusProps {
  size?: number;
  color?: string;
  className?: string;
}
```

---

## DECORATION COMPONENTS

### TraditionalBorder
```typescript
// FILE: components/templates-v2/themes/KankotriTemplate/decorations/TraditionalBorder.tsx
// PURPOSE: Traditional corner/border decorations

import { TraditionalBorder } from '@/components/templates-v2/themes/KankotriTemplate/decorations/TraditionalBorder';

// Full border (all 4 corners)
<TraditionalBorder type="full" color="#2d5016" />

// Corner decorations only
<TraditionalBorder type="corner" color="#d4af37" />

// PROPS
interface BorderProps {
  type: 'corner' | 'top' | 'bottom' | 'full';
  color?: string;             // Default: '#2d5016'
  className?: string;
}
```

### GoldFrame
```typescript
// FILE: components/templates-v2/themes/KankotriTemplate/decorations/GoldFrame.tsx
// PURPOSE: Premium gold border frame

import { GoldFrame } from '@/components/templates-v2/themes/KankotriTemplate/decorations/GoldFrame';

<GoldFrame />

// PROPS
interface GoldFrameProps {
  className?: string;
}

// FEATURES
- Multi-layer border effect
- Emboss/letterpress styles
- Fixed positioning (covers viewport)
```

---

## AUDIO COMPONENTS

### AmbientSound
```typescript
// FILE: components/templates-v2/themes/KankotriTemplate/audio/AmbientSound.tsx
// PURPOSE: Synthesized tanpura drone using Web Audio API

import { AmbientSound } from '@/components/templates-v2/themes/KankotriTemplate/audio/AmbientSound';

<AmbientSound />

// PROPS: None (auto-plays on user interaction)

// FEATURES
- Starts muted (user must unmute)
- Volume control
- Pause/play toggle
- Web Audio API synthesizer
- No external audio files
```

---

## UTILITY COMPONENTS

### ErrorBoundary
```typescript
// FILE: components/ErrorBoundary.tsx
// PURPOSE: Catch and display React errors gracefully

import { ErrorBoundary } from '@/components/ErrorBoundary';

<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>

// USAGE: Wrap all page components
```

### SkipLink
```typescript
// FILE: components/Accessibility.tsx
// PURPOSE: Skip to main content (accessibility)

import { SkipLink } from '@/components/Accessibility';

<SkipLink />

// USAGE: Add at top of every template
```

### PageLoader
```typescript
// FILE: components/LoadingStates.tsx
// PURPOSE: Loading spinner for Suspense fallback

import { PageLoader } from '@/components/LoadingStates';

<Suspense fallback={<PageLoader />}>
  <YourComponent />
</Suspense>
```

---

## CONFIGURATION

### kankotriConfig
```typescript
// FILE: components/templates-v2/themes/KankotriTemplate/kankotri-config.ts
// PURPOSE: Colors, fonts, layout settings

import { kankotriConfig } from '@/components/templates-v2/themes/KankotriTemplate/kankotri-config';

// USE AS-IS or customize
const customConfig = {
  ...kankotriConfig,
  colors: {
    ...kankotriConfig.colors,
    primary: '#8B4513', // Custom brown
  }
};

<KankotriEnhanced data={{ ...data, customization: customConfig }} />

// STRUCTURE
export const kankotriConfig = {
  colors: {
    primary: '#2d5016',      // Deep green
    secondary: '#d4af37',    // Gold
    accent: '#8B4513',       // Brown
    background: '#f9f6f0',   // Cream
    text: '#1a1a1a',         // Near black
  },
  fonts: {
    gujarati: "'Noto Sans Gujarati', sans-serif",
    english: "'Cormorant Garamond', serif",
    decorative: "'Playfair Display', serif",
  },
  animations: {
    duration: 0.6,
    easing: 'ease-out',
  },
  layout: {
    maxWidth: '1200px',
    padding: '2rem',
  }
};
```

---

## INTEGRATION EXAMPLE

```typescript
// Complete template with all components
import { KankotriEnhanced } from '@/components/templates-v2/themes/KankotriTemplate/KankotriEnhanced';
import { exampleKankotri } from '@/lib/data/example-kankotri';

export default function KankotriDemoPage() {
  return <KankotriEnhanced data={exampleKankotri} />;
}

// That's it! KankotriEnhanced handles:
// ✅ Date normalization
// ✅ Animations (PhysicsPetals, AdvancedParticles)
// ✅ Error boundaries
// ✅ Accessibility (SkipLink)
// ✅ Sound (AmbientSound)
// ✅ All page components
```

---

## COMPONENT DEPENDENCY GRAPH

```
KankotriEnhanced (root)
├─ ErrorBoundary
├─ SkipLink
├─ Suspense
│  ├─ PhysicsPetals
│  └─ AdvancedParticles
├─ AmbientSound
├─ KankotriCover
│  ├─ ProfessionalGanesh
│  ├─ EnhancedPeacock
│  ├─ ConfettiBurst
│  └─ GoldFrame
├─ KankotriInvocation
│  ├─ OmSymbol
│  └─ TraditionalBorder
├─ KankotriCeremonies
│  ├─ Diya (symbol)
│  ├─ Rangoli (symbol)
│  └─ ScrollReveal
└─ KankotriVenue
   └─ (map embed)
```

---

## QUICK REFERENCE: IMPORTS

```typescript
// All in one file for copy-paste
import { KankotriEnhanced } from '@/components/templates-v2/themes/KankotriTemplate/KankotriEnhanced';
import { KankotriCover } from '@/components/templates-v2/themes/KankotriTemplate/pages/KankotriCover';
import { KankotriInvocation } from '@/components/templates-v2/themes/KankotriTemplate/pages/KankotriInvocation';
import { KankotriCeremonies } from '@/components/templates-v2/themes/KankotriTemplate/pages/KankotriCeremonies';
import { KankotriVenue } from '@/components/templates-v2/themes/KankotriTemplate/pages/KankotriVenue';
import { PhysicsPetals } from '@/components/templates-v2/themes/KankotriTemplate/animations/PhysicsPetals';
import { AdvancedParticles } from '@/components/templates-v2/themes/KankotriTemplate/animations/AdvancedParticles';
import { SmoothScrollReveal } from '@/components/templates-v2/themes/KankotriTemplate/animations/SmoothScrollReveal';
import { ProfessionalGanesh } from '@/components/templates-v2/themes/KankotriTemplate/symbols/ProfessionalGanesh';
import { EnhancedPeacock } from '@/components/templates-v2/themes/KankotriTemplate/symbols/EnhancedPeacock';
import { AmbientSound } from '@/components/templates-v2/themes/KankotriTemplate/audio/AmbientSound';
import { kankotriConfig } from '@/components/templates-v2/themes/KankotriTemplate/kankotri-config';
import { exampleKankotri } from '@/lib/data/example-kankotri';
import type { KankotriData } from '@/types/v2/kankotri';
```
