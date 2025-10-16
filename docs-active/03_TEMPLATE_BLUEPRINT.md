# 🎨 TEMPLATE BLUEPRINT - Copy-Paste Starter Code

**AI Instruction:** Copy this code exactly to create new template. Replace placeholders with your values.

---

## STEP 1: Create Folder Structure

```bash
# Create template folder
mkdir -p components/templates-v2/themes/MyTemplate/{pages,animations,symbols,decorations,audio}

# Create files
touch components/templates-v2/themes/MyTemplate/MyTemplateEnhanced.tsx
touch components/templates-v2/themes/MyTemplate/my-template-config.ts
touch components/templates-v2/themes/MyTemplate/pages/Cover.tsx
touch components/templates-v2/themes/MyTemplate/pages/Invocation.tsx
touch components/templates-v2/themes/MyTemplate/pages/Ceremonies.tsx
```

**Folder structure:**
```
components/templates-v2/themes/MyTemplate/
├── MyTemplateEnhanced.tsx       # Main wrapper (COPY CODE BELOW)
├── my-template-config.ts        # Configuration
├── pages/
│   ├── Cover.tsx                # Cover page
│   ├── Invocation.tsx           # Invocation page
│   └── Ceremonies.tsx           # Ceremonies page
├── animations/                  # (optional) Custom animations
├── symbols/                     # (optional) Custom SVG symbols
└── decorations/                 # (optional) Custom decorations
```

---

## STEP 2: Main Wrapper Component

### File: `MyTemplateEnhanced.tsx`

```typescript
/**
 * MyTemplate Enhanced
 * 
 * [DESCRIPTION: Your template description here]
 * Style: [modern/traditional/luxury/minimal]
 * Culture: [Gujarati/Punjabi/South Indian/etc.]
 */

'use client';

import { ErrorBoundary } from '@/components/ErrorBoundary';
import { SkipLink } from '@/components/Accessibility';
import { myTemplateConfig } from './my-template-config';
import { Cover } from './pages/Cover';
import { Invocation } from './pages/Invocation';
import { Ceremonies } from './pages/Ceremonies';
import { PageLoader } from '@/components/LoadingStates';
import type { KankotriData } from '@/types/v2/kankotri';
import { Suspense } from 'react';

// OPTIONAL: Import animations (choose what you need)
import { PhysicsPetals } from '@/components/templates-v2/themes/KankotriTemplate/animations/PhysicsPetals';
import { AdvancedParticles } from '@/components/templates-v2/themes/KankotriTemplate/animations/AdvancedParticles';
import { FloatingPetals } from '@/components/templates-v2/themes/KankotriTemplate/animations/FloatingPetals';
import { SmoothScrollReveal } from '@/components/templates-v2/themes/KankotriTemplate/animations/SmoothScrollReveal';

// OPTIONAL: Import symbols (choose what you need)
import { ProfessionalGanesh } from '@/components/templates-v2/themes/KankotriTemplate/symbols/ProfessionalGanesh';
import { OmSymbol } from '@/components/templates-v2/themes/KankotriTemplate/symbols/OmSymbol';

// OPTIONAL: Import audio
import { AmbientSound } from '@/components/templates-v2/themes/KankotriTemplate/audio/AmbientSound';

interface MyTemplateEnhancedProps {
  data: KankotriData;
}

export function MyTemplateEnhanced({ data }: MyTemplateEnhancedProps) {
  const config = data.customization || myTemplateConfig;

  // REQUIRED: Normalize dates to ensure deterministic rendering
  // This prevents SSR hydration errors
  const normalizedWeddingDate = new Date(data.wedding.date);
  const normalizedCeremonies = Array.isArray(data.ceremonies)
    ? data.ceremonies.map((c) => ({ ...c, date: new Date(c.date) }))
    : [];

  return (
    <ErrorBoundary>
      <div 
        className="relative min-h-screen bg-gradient-to-br from-white to-gray-50"
        style={{ fontFamily: config.fonts.english }}
      >
        {/* Accessibility: Skip to main content */}
        <SkipLink />

        {/* OPTIONAL: Animations Layer */}
        {/* Choose animations based on your template style */}
        <Suspense fallback={null}>
          {/* Example: Physics-based petals for traditional templates */}
          <PhysicsPetals 
            count={50} 
            windStrength={0.5}
            colors={['#ff9999', '#ffb3ba', '#ffc8dd']}
          />
          
          {/* Example: Particles for modern templates */}
          {/* <AdvancedParticles count={80} interactive connections /> */}
          
          {/* Example: Simple floating petals for minimal templates */}
          {/* <FloatingPetals count={30} /> */}
        </Suspense>

        {/* OPTIONAL: Ambient Sound */}
        {/* <AmbientSound /> */}

        {/* OPTIONAL: Background texture/pattern */}
        <div 
          className="pointer-events-none fixed inset-0 z-0 opacity-5"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M30 0L30 60M0 30L60 30\' stroke=\'%23000\' stroke-width=\'0.5\' /%3E%3C/svg%3E")',
          }}
        />

        {/* Main Content */}
        <main id="main-content" className="relative z-10">
          <Suspense fallback={<PageLoader />}>
            {/* Page 1: Cover */}
            {data.pages.cover && (
              <Cover
                groomName={data.groom.name}
                brideName={data.bride.name}
                weddingDate={normalizedWeddingDate}  // Use normalized date
                couplePhoto={data.couplePhoto}
                config={config}
              />
            )}

            {/* Page Break Effect */}
            <div className="h-8 bg-gradient-to-b from-white to-transparent" />

            {/* Page 2: Invocation */}
            {data.pages.invocation && (
              <Invocation
                groomName={data.groom.name}
                brideName={data.bride.name}
                hosts={data.hosts}
                venue={data.wedding.venue}
                weddingDate={normalizedWeddingDate}  // Use normalized date
                config={config}
              />
            )}

            {/* Page Break */}
            <div className="h-8 bg-gradient-to-b from-white to-transparent" />

            {/* Page 3: Ceremonies */}
            {data.pages.ceremonies && normalizedCeremonies.length > 0 && (
              <Ceremonies
                ceremonies={normalizedCeremonies}  // Use normalized ceremonies
                config={config}
              />
            )}
          </Suspense>
        </main>
      </div>
    </ErrorBoundary>
  );
}
```

---

## STEP 3: Configuration File

### File: `my-template-config.ts`

```typescript
/**
 * MyTemplate Configuration
 * 
 * Define colors, fonts, animations, layout
 */

export const myTemplateConfig = {
  // Colors (customize for your template style)
  colors: {
    primary: '#2d5016',      // Main brand color
    secondary: '#d4af37',    // Accent color
    accent: '#8B4513',       // Tertiary color
    background: '#ffffff',   // Page background
    text: '#1a1a1a',         // Body text
    textLight: '#666666',    // Secondary text
    border: '#e5e5e5',       // Borders/dividers
  },

  // Fonts
  fonts: {
    gujarati: "'Noto Sans Gujarati', sans-serif",
    english: "'Playfair Display', serif",      // Luxury serif
    // OR: "'Inter', sans-serif"                // Modern sans
    // OR: "'Cormorant Garamond', serif"        // Traditional serif
    decorative: "'Dancing Script', cursive",   // For names/headings
  },

  // Animation settings
  animations: {
    duration: 0.6,           // Default animation duration (seconds)
    easing: 'ease-out',      // CSS easing function
    staggerDelay: 0.1,       // Delay between staggered items
  },

  // Layout
  layout: {
    maxWidth: '1200px',      // Max content width
    padding: '2rem',         // Page padding
    gap: '3rem',             // Spacing between sections
  },
};

export type MyTemplateConfig = typeof myTemplateConfig;
```

---

## STEP 4: Cover Page Component

### File: `pages/Cover.tsx`

```typescript
/**
 * MyTemplate - Cover Page
 */

'use client';

import type { MyTemplateConfig } from '../my-template-config';

interface CoverProps {
  groomName: string;
  brideName: string;
  weddingDate: Date;        // MUST be Date object
  couplePhoto?: string;
  config: MyTemplateConfig;
}

export function Cover({ 
  groomName, 
  brideName, 
  weddingDate, 
  couplePhoto,
  config 
}: CoverProps) {
  // REQUIRED: UTC-safe date formatting
  const formattedDate = weddingDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',  // ← MUST HAVE
  });

  const monthYear = weddingDate.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',  // ← MUST HAVE
  });

  const day = weddingDate.getUTCDate();  // Use getUTCDate() not getDate()

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center px-6 py-12"
      style={{ 
        backgroundColor: config.colors.background,
        color: config.colors.text,
      }}
    >
      {/* Content Container */}
      <div className="text-center max-w-4xl">
        {/* Optional: Symbol/Icon */}
        {/* <ProfessionalGanesh size={120} color={config.colors.primary} /> */}

        {/* Couple Names */}
        <h1 
          className="text-6xl md:text-8xl mb-6"
          style={{ 
            fontFamily: config.fonts.decorative,
            color: config.colors.primary,
          }}
        >
          {groomName} <span className="text-4xl">&</span> {brideName}
        </h1>

        {/* Subtitle */}
        <p 
          className="text-2xl md:text-3xl mb-8"
          style={{ fontFamily: config.fonts.english }}
        >
          Request the honor of your presence
        </p>

        {/* Date */}
        <div className="mb-12">
          <p className="text-xl mb-2">{formattedDate}</p>
          <p 
            className="text-6xl font-bold"
            style={{ color: config.colors.secondary }}
          >
            {day}
          </p>
          <p className="text-xl">{monthYear}</p>
        </div>

        {/* Optional: Couple Photo */}
        {couplePhoto && (
          <div className="w-64 h-64 mx-auto rounded-full overflow-hidden border-4 border-gold">
            <img 
              src={couplePhoto} 
              alt={`${groomName} and ${brideName}`}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>

      {/* Optional: Decorative elements */}
      {/* <TraditionalBorder type="full" color={config.colors.primary} /> */}
    </section>
  );
}
```

---

## STEP 5: Invocation Page Component

### File: `pages/Invocation.tsx`

```typescript
/**
 * MyTemplate - Invocation Page
 */

'use client';

import type { MyTemplateConfig } from '../my-template-config';
import type { Venue } from '@/types/v2/kankotri';

interface InvocationProps {
  groomName: string;
  brideName: string;
  hosts: {
    groomSide: Array<{ name: string; relation: string; address?: string }>;
    brideSide: Array<{ name: string; relation: string; address?: string }>;
  };
  venue: Venue;
  weddingDate: Date;
  config: MyTemplateConfig;
}

export function Invocation({ 
  groomName, 
  brideName, 
  hosts,
  venue,
  weddingDate,
  config 
}: InvocationProps) {
  // REQUIRED: UTC-safe date formatting
  const formattedDate = weddingDate.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'UTC',  // ← MUST HAVE
  });

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center px-6 py-12"
      style={{ backgroundColor: config.colors.background }}
    >
      <div className="max-w-3xl text-center">
        {/* Invocation Symbol */}
        {/* <OmSymbol size={80} color={config.colors.primary} /> */}

        {/* Hosts */}
        <div className="mb-12">
          <h2 className="text-2xl mb-6" style={{ fontFamily: config.fonts.english }}>
            Together with their families
          </h2>

          {/* Groom's Family */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Groom's Side</h3>
            {hosts.groomSide.map((host, i) => (
              <p key={i} className="text-base">
                {host.name} ({host.relation})
              </p>
            ))}
          </div>

          {/* Bride's Family */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Bride's Side</h3>
            {hosts.brideSide.map((host, i) => (
              <p key={i} className="text-base">
                {host.name} ({host.relation})
              </p>
            ))}
          </div>
        </div>

        {/* Invitation Text */}
        <div className="mb-12">
          <p className="text-xl mb-4" style={{ fontFamily: config.fonts.english }}>
            Request the honor of your presence at the wedding ceremony of
          </p>
          <p 
            className="text-4xl mb-4"
            style={{ 
              fontFamily: config.fonts.decorative,
              color: config.colors.primary,
            }}
          >
            {groomName} & {brideName}
          </p>
          <p className="text-lg">
            On {formattedDate}
          </p>
        </div>

        {/* Venue */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Venue</h3>
          <p className="text-lg">{venue.name}</p>
          <p className="text-base">{venue.address}</p>
          <p className="text-base">{venue.city}, {venue.state}</p>
        </div>
      </div>
    </section>
  );
}
```

---

## STEP 6: Ceremonies Page Component

### File: `pages/Ceremonies.tsx`

```typescript
/**
 * MyTemplate - Ceremonies Page
 */

'use client';

import type { MyTemplateConfig } from '../my-template-config';

interface Ceremony {
  id: string;
  name: string;
  nameGujarati?: string;
  date: Date;              // MUST be Date object
  time: string;
  venue: string;
  type?: string;
}

interface CeremoniesProps {
  ceremonies: Ceremony[];
  config: MyTemplateConfig;
}

export function Ceremonies({ ceremonies, config }: CeremoniesProps) {
  return (
    <section 
      className="relative min-h-screen px-6 py-12"
      style={{ backgroundColor: config.colors.background }}
    >
      <div className="max-w-4xl mx-auto">
        <h2 
          className="text-4xl text-center mb-12"
          style={{ 
            fontFamily: config.fonts.english,
            color: config.colors.primary,
          }}
        >
          Wedding Ceremonies
        </h2>

        {/* Ceremonies List */}
        <div className="space-y-8">
          {ceremonies.map((ceremony) => {
            // REQUIRED: UTC-safe date formatting
            const weekday = ceremony.date.toLocaleDateString('en-US', {
              weekday: 'long',
              timeZone: 'UTC',  // ← MUST HAVE
            });

            const formattedDate = ceremony.date.toLocaleDateString('en-IN', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              timeZone: 'UTC',  // ← MUST HAVE
            });

            return (
              <div 
                key={ceremony.id}
                className="bg-white rounded-lg shadow-md p-6 border-l-4"
                style={{ borderColor: config.colors.primary }}
              >
                <h3 
                  className="text-2xl mb-2"
                  style={{ 
                    fontFamily: config.fonts.decorative,
                    color: config.colors.primary,
                  }}
                >
                  {ceremony.name}
                  {ceremony.nameGujarati && (
                    <span className="block text-lg mt-1">
                      {ceremony.nameGujarati}
                    </span>
                  )}
                </h3>

                <div className="space-y-1 text-base">
                  <p><strong>Date:</strong> {weekday}, {formattedDate}</p>
                  <p><strong>Time:</strong> {ceremony.time}</p>
                  <p><strong>Venue:</strong> {ceremony.venue}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

---

## STEP 7: Create Demo Route

### File: `app/template-demo/my-template/page.tsx`

```typescript
import { MyTemplateEnhanced } from '@/components/templates-v2/themes/MyTemplate/MyTemplateEnhanced';
import { exampleKankotri } from '@/lib/data/example-kankotri';

export default function MyTemplateDemoPage() {
  return <MyTemplateEnhanced data={exampleKankotri} />;
}
```

---

## STEP 8: Test

```bash
# Start dev server
npm run dev

# Visit demo route
# http://localhost:3000/template-demo/my-template

# Check for errors
# - No console errors
# - No hydration warnings
# - Animations working
# - Dates rendering correctly
```

---

## STEP 9: Build & Deploy

```bash
# Build for production
npm run build

# Must pass without errors
# If errors, check:
# 1. All dates use timeZone: 'UTC'
# 2. All useRef have initial values
# 3. No Math.random() in render

# Push to git
git add -A
git commit -m "Add: MyTemplate"
git push origin main

# Vercel auto-deploys
```

---

## ✅ CHECKLIST

```yaml
files_created:
  - [ ] MyTemplateEnhanced.tsx
  - [ ] my-template-config.ts
  - [ ] pages/Cover.tsx
  - [ ] pages/Invocation.tsx
  - [ ] pages/Ceremonies.tsx
  - [ ] app/template-demo/my-template/page.tsx

code_patterns:
  - [ ] All dates use timeZone: 'UTC'
  - [ ] Using getUTCDate() not getDate()
  - [ ] Date normalization in wrapper
  - [ ] ErrorBoundary wrapping
  - [ ] Suspense for animations
  - [ ] SkipLink for accessibility

testing:
  - [ ] npm run dev works
  - [ ] Demo route renders
  - [ ] No console errors
  - [ ] No hydration warnings
  - [ ] npm run build passes

deployment:
  - [ ] Code pushed to git
  - [ ] Vercel build successful
  - [ ] Demo URL accessible
```

---

## 🎨 CUSTOMIZATION IDEAS

### Animations by Style

```typescript
// Traditional template
<PhysicsPetals count={50} windStrength={0.5} />
<ProfessionalGanesh size={150} />
<AmbientSound />

// Modern template
<AdvancedParticles count={80} interactive connections />
<SmoothScrollReveal animation="fade" />

// Minimal template
<FloatingPetals count={20} />
<SmoothScrollReveal animation="slide-up" />

// Luxury template
<PhysicsPetals count={80} />
<AdvancedParticles count={100} />
<GoldDustCursor />
<AmbientSound />
```

### Color Schemes by Culture

```typescript
// Gujarati (traditional)
colors: {
  primary: '#2d5016',    // Deep green
  secondary: '#d4af37',  // Gold
  accent: '#8B4513',     // Brown
}

// Punjabi (vibrant)
colors: {
  primary: '#FF6B35',    // Orange
  secondary: '#FFD700',  // Gold
  accent: '#1E90FF',     // Blue
}

// South Indian (rich)
colors: {
  primary: '#8B0000',    // Dark red
  secondary: '#FFD700',  // Gold
  accent: '#228B22',     // Green
}

// Modern (neutral)
colors: {
  primary: '#2C3E50',    // Dark gray
  secondary: '#E74C3C',  // Coral
  accent: '#ECF0F1',     // Light gray
}
```

---

## 📚 NEXT STEPS

1. **Customize styling** - Update colors, fonts, layout
2. **Add more pages** - Venue, Blessings, RSVP, etc.
3. **Custom animations** - Create unique animations in animations/ folder
4. **Custom symbols** - Add SVG illustrations in symbols/ folder
5. **Test thoroughly** - Check all browsers, devices
6. **Document** - Add comments explaining unique features

**Template is ready for production!** 🎉
