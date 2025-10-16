# 🤖 AI QUICK SCAN - Read This First

**AI Instruction:** Read this file in 10 seconds. Get instant project context.

---

## PROJECT IDENTITY

```yaml
name: WebKankotri
type: Digital Wedding Invitation Platform
target: Gujarati weddings (expandable to all cultures)
status: 72% production-ready
tech: Next.js 15 + React 19 + TypeScript + Supabase
deployment: Vercel (live)
repo: github.com/Praharsh28/Webkankotri
demo: /template-demo/kankotri
```

---

## CURRENT STATE (Oct 16, 2025)

```yaml
build_status: ALL_ERRORS_FIXED ✅
vercel_deployment: LIVE ✅
typescript_compilation: PASSING ✅
latest_commit: b77f21b
blockers: NONE

completed:
  - 3 templates (Royal, Kankotri Enhanced, Modern Kankotri PREMIUM)
  - 13 animation systems (physics-based + custom)
  - Modern Kankotri: 6 animation layers (270+ animated elements!)
  - Professional SVG illustrations
  - SSR hydration fixes (UTC dates)
  - Error handling, accessibility
  - Documentation cleanup (62 → 50 files)
  - AI-first documentation system
  - ANIMATION_PHILOSOPHY.md (premium product strategy)

missing_high_priority:
  - Template gallery UI
  - Live editor interface
  - Export functionality (PDF, image)
  - Mobile performance optimization
  - Testing (comprehensive checklist exists)
  - 8 more templates (target: 10 total)

missing_medium_priority:
  - User dashboard
  - Payment integration
  - API documentation
```

---

## FILE STRUCTURE

```
/components/templates-v2/themes/KankotriTemplate/
├── KankotriEnhanced.tsx          # ⭐ MAIN WRAPPER - Study this first
├── pages/
│   ├── KankotriCover.tsx         # Cover page with animations
│   ├── KankotriInvocation.tsx    # Invocation page
│   ├── KankotriCeremonies.tsx    # Ceremonies list
│   └── KankotriVenue.tsx         # Venue with map
├── animations/
│   ├── PhysicsPetals.tsx         # Physics-based falling petals
│   ├── AdvancedParticles.tsx     # Interactive particle system
│   ├── SmoothScrollReveal.tsx    # Scroll animations
│   └── [7 more animation components]
├── symbols/
│   ├── ProfessionalGanesh.tsx    # 200+ line SVG
│   ├── EnhancedPeacock.tsx       # 250+ line SVG
│   └── [6 more symbols]
├── audio/
│   └── AmbientSound.tsx          # Web Audio API synthesizer
└── kankotri-config.ts            # Color, fonts, layout config

/app/template-demo/kankotri/
└── page.tsx                       # Demo route (renders KankotriEnhanced)

/lib/data/
└── example-kankotri.ts            # Sample data structure

/types/v2/
├── kankotri.ts                    # KankotriData interface
├── template.ts                    # Template types
└── animation.ts                   # Animation types
```

---

## CRITICAL PATTERNS (SSR-Safe)

```typescript
// PATTERN 1: UTC Date Formatting (REQUIRED)
weddingDate.toLocaleDateString('en-US', {
  weekday: 'long',
  timeZone: 'UTC'  // ← MUST HAVE or hydration error
});

// PATTERN 2: Use getUTCDate() not getDate()
const day = weddingDate.getUTCDate();  // ✅ Correct
const day = weddingDate.getDate();     // ❌ Hydration error

// PATTERN 3: Normalize Date Inputs
const normalizedDate = new Date(data.wedding.date);  // Ensure Date object

// PATTERN 4: Deterministic Animations (no Math.random in render)
x: ((index * 7 + seed * 3) % 100) / 100  // ✅ Deterministic
x: Math.random()                          // ❌ Hydration error

// PATTERN 5: useRef with Initial Value
const ref = useRef<number | undefined>(undefined);  // ✅ TypeScript safe
const ref = useRef<number>();                       // ❌ Compilation error
```

---

## COMPONENT USAGE QUICK REF

```typescript
// Import
import { KankotriEnhanced } from '@/components/templates-v2/themes/KankotriTemplate/KankotriEnhanced';
import { exampleKankotri } from '@/lib/data/example-kankotri';

// Render
<KankotriEnhanced data={exampleKankotri} />

// Animation Components
import { PhysicsPetals } from '.../animations/PhysicsPetals';
<PhysicsPetals count={50} windStrength={0.5} />

import { AdvancedParticles } from '.../animations/AdvancedParticles';
<AdvancedParticles count={80} interactive connections />

import { ProfessionalGanesh } from '.../symbols/ProfessionalGanesh';
<ProfessionalGanesh size={150} color="#2d5016" />
```

---

## DATA STRUCTURE

```typescript
// TYPE: KankotriData (SOURCE: types/v2/kankotri.ts)
interface KankotriData {
  id: string;
  userId: string;
  slug: string;
  
  groom: {
    name: string;           // "Deep"
    fullName: string;       // "શ્રી દીપ કિશોરભાઈ મેસરા"
    fatherName: string;
    motherName: string;
    photo?: string;
  };
  
  bride: {
    // Same structure as groom
  };
  
  wedding: {
    date: Date;             // MUST be Date object
    time: string;           // "૫:૦૦ કલાકે સાંજે"
    venue: {
      name: string;
      address: string;
      city: string;
      mapUrl?: string;
    };
  };
  
  ceremonies: Array<{
    id: string;
    name: string;
    nameGujarati: string;
    date: Date;             // MUST be Date object
    time: string;
    venue: string;
    type: 'mandap' | 'swagatam' | 'garba' | 'haldi';
  }>;
  
  pages: {
    cover: boolean;
    invocation: boolean;
    ceremonies: boolean;
    venue: boolean;
  };
  
  customization?: typeof kankotriConfig;
}
```

---

## AI TASK QUICK START

### Building New Template?
1. Read: `03_TEMPLATE_BLUEPRINT.md` (copy-paste starter)
2. Read: `01_CODE_PATTERNS.md` (SSR-safe patterns)
3. Read: `02_COMPONENT_CATALOG.md` (available components)

### Fixing Bug?
1. Read: `01_CODE_PATTERNS.md` (find anti-pattern)
2. Apply fix pattern
3. Test with `npm run dev`

### Adding Feature?
1. Read: `02_COMPONENT_CATALOG.md` (find components)
2. Read: `04_TYPE_DEFINITIONS.md` (check types)
3. Integrate with existing code

### Deploying?
1. Run: `npm run build` (must pass)
2. Push to main branch
3. Vercel auto-deploys

---

## NEXT DOCS TO READ

```yaml
building_template: 03_TEMPLATE_BLUEPRINT.md → 01_CODE_PATTERNS.md
fixing_hydration: 01_CODE_PATTERNS.md
understanding_types: 04_TYPE_DEFINITIONS.md
full_roadmap: PROJECT_STATUS.md
testing: TESTING_CHECKLIST.md
```

---

## AI OPTIMIZATION NOTE

**This project is AI-first.** 
- Docs optimized for machine parsing, not human reading
- Code examples > explanations
- Structured data > prose
- Copy-paste ready snippets
- Zero inference required

**Humans only see:** Website output (beautiful templates)  
**AI reads:** Code, docs, builds everything
