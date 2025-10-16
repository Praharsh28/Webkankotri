# 📁 Project Structure - WebKankotri v2

## Clean, Focused Architecture

After major cleanup, here's what we have:

---

## 🎯 Core Directories

```
webkankotri/
├── app/                          # Next.js 15 App Router
│   ├── (public)/                 # Public pages
│   ├── (protected)/              # Auth-required pages
│   ├── auth/                     # Login/Signup
│   ├── dashboard/                # User dashboard
│   ├── invite/[slug]/           # Public invitations
│   ├── playground/               # Animation testing (NEW)
│   ├── page.tsx                  # Landing page
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Global styles
│
├── components/
│   ├── animations-v2/            # ✨ NEW Animation Library
│   │   ├── ParallaxSection.tsx
│   │   ├── FloatingParticles.tsx
│   │   ├── VideoBackground.tsx
│   │   ├── FireworksCanvas.tsx
│   │   └── ... (more to come)
│   │
│   ├── templates-v2/             # ✨ NEW Template System
│   │   ├── blocks/               # Reusable blocks
│   │   │   ├── Header/
│   │   │   ├── Events/
│   │   │   └── Gallery/
│   │   ├── themes/               # Full templates
│   │   │   └── RoyalTemplate/
│   │   └── shared/               # Shared components
│   │
│   ├── ui/                       # ✅ KEPT - Reusable UI
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   └── dialog.tsx
│   │
│   └── forms/                    # ✅ KEPT - Form components
│       └── RSVPForm.tsx
│
├── lib/
│   ├── supabase/                 # ✅ KEPT - Database client
│   │   ├── client.ts
│   │   └── server.ts
│   ├── utils/                    # ✅ KEPT - Utilities
│   │   ├── cn.ts
│   │   ├── format.ts
│   │   └── urls.ts
│   └── constants/                # ✅ KEPT - Constants
│       └── upload-limits.ts
│
├── types/
│   ├── v2/                       # ✨ NEW - V2 types
│   │   ├── animation.ts
│   │   ├── template.ts
│   │   └── block.ts
│   ├── user.ts                   # ✅ KEPT
│   ├── guest.ts                  # ✅ KEPT
│   ├── payment.ts                # ✅ KEPT
│   └── template.ts               # ✅ KEPT (simplified)
│
├── supabase/                     # ✅ KEPT - Database
│   └── migrations/
│
└── docs/                         # ✅ KEPT - Essential docs only
    └── (33 technical docs)
```

---

## 🗂️ What Got Removed

### ❌ Deleted (~85 markdown files)
- All status/progress docs
- Old theme guides
- Old animation docs
- Wizard documentation
- Template guides
- Bug fix logs

### ❌ Deleted Code
- `/components/sections/` (19 rigid section components)
- `/components/templates/` (old templates)
- `/components/animations/` (basic animations)
- `/components/editor/` (editor controls)
- `/lib/themes/` (old theme system)
- `/app/create/` (wizard)
- `/app/template-preview/` (old preview)
- `/app/theme-demo/` (old demo)
- `/types/section.ts` (rigid types)
- `/types/theme.ts` (old theme types)

---

## 📝 Documentation (Only 6 Files)

1. **README.md** - Main project overview
2. **DATABASE_REQUIREMENTS.md** - Database schema
3. **DATABASE_SETUP_GUIDE.md** - Setup instructions
4. **REAL_PROBLEMS_AND_SOLUTIONS.md** - What we're solving
5. **ARCHITECTURE_COMPARISON.md** - Why we made these choices
6. **DECISION_SUMMARY.md** - Quick decision reference

**NEW (Coming):**
7. **PROJECT_STRUCTURE.md** (this file)
8. **ANIMATION_LIBRARY_V2.md** - Animation docs
9. **TEMPLATE_BUILDER_GUIDE.md** - How to build templates

---

## 🎨 New Animation Library Structure

```
/components/animations-v2/
├── core/
│   ├── ParallaxSection.tsx      # Parallax scrolling
│   ├── FloatingParticles.tsx    # Particle system
│   ├── VideoBackground.tsx      # Video backgrounds
│   ├── AudioPlayer.tsx          # Background music
│   └── ScrollTrigger.tsx        # Scroll-based triggers
│
├── effects/
│   ├── FireworksCanvas.tsx      # Fireworks effect
│   ├── ConfettiExplosion.tsx    # Confetti burst
│   ├── SparkleTrail.tsx         # Cursor trail
│   ├── GlowEffect.tsx           # Glowing elements
│   └── MorphingBackground.tsx   # Shape morphing
│
├── 3d/
│   ├── FlipCard3D.tsx           # 3D card flip
│   ├── ParallaxLayers.tsx       # Layered parallax
│   └── LottiePlayer.tsx         # Lottie animations
│
├── interactive/
│   ├── CountdownTimer.tsx       # Wedding countdown
│   ├── PhotoCarousel.tsx        # Photo slider
│   ├── LightboxGallery.tsx      # Lightbox viewer
│   └── InteractiveTimeline.tsx  # Timeline slider
│
└── index.ts                      # Export all
```

---

## 📐 New Template System Structure

```
/components/templates-v2/
├── blocks/                       # Mix & match blocks
│   ├── Header/
│   │   ├── CenteredHeader.tsx
│   │   ├── SplitHeader.tsx
│   │   └── GrandHeader.tsx
│   ├── Events/
│   │   ├── TimelineEvents.tsx
│   │   ├── CardEvents.tsx
│   │   └── CalendarEvents.tsx
│   └── Gallery/
│       ├── MasonryGallery.tsx
│       ├── CarouselGallery.tsx
│       └── GridGallery.tsx
│
├── themes/                       # Full templates
│   ├── RoyalTemplate/
│   │   ├── RoyalTemplate.tsx
│   │   ├── royal-config.ts
│   │   ├── royal-animations.ts
│   │   └── README.md
│   └── TraditionalTemplate/
│       └── ... (coming)
│
└── shared/                       # Shared utilities
    ├── TemplateWrapper.tsx
    ├── SectionRenderer.tsx
    └── AnimationOrchestrator.tsx
```

---

## 🔧 Key Technologies

### Frontend
- **Next.js 15.5.4** - App Router
- **React 19.1.0** - Latest React
- **TypeScript 5.7.2** - Strict mode
- **Tailwind CSS 4.0** - Styling
- **Framer Motion 12.0** - Animations

### Animation Libraries (NEW)
- **@react-spring/web** - Spring physics animations
- **lottie-react** - Complex vector animations
- **react-player** - Video playback
- **use-sound** - Sound effects
- **yet-another-react-lightbox** - Image galleries
- **swiper** - Touch sliders

### Backend
- **Supabase** - PostgreSQL database
- **Supabase Auth** - Authentication
- **Vercel** - Hosting

### Forms & Validation
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **@hookform/resolvers** - Form + Zod

---

## 🎯 What Each Folder Does

### `/app/`
**Purpose:** All pages and routes
- Public pages in `(public)/`
- Protected pages in `(protected)/`
- Authentication in `auth/`
- User dashboard in `dashboard/`
- Public invitations in `invite/[slug]/`

### `/components/animations-v2/`
**Purpose:** Reusable animation components
- All animations are standalone
- Can be used in any template
- Props-based configuration
- Performance optimized

### `/components/templates-v2/`
**Purpose:** Template building system
- **blocks/**: Mix-and-match components
- **themes/**: Complete templates
- **shared/**: Template utilities

### `/components/ui/`
**Purpose:** Base UI components
- Button, Input, Card, Dialog
- Used everywhere
- Consistent styling

### `/lib/`
**Purpose:** Business logic and utilities
- Database client
- Helper functions
- Constants

### `/types/v2/`
**Purpose:** TypeScript definitions for new system
- Animation types
- Template types
- Block types

---

## 🚀 Build Process

### Development
```bash
npm run dev        # Start dev server (localhost:3000)
npm run build      # Build for production
npm run type-check # Check TypeScript
```

### Key Routes (After Cleanup)
- `/` - Landing page
- `/auth/login` - Login
- `/auth/signup` - Signup
- `/dashboard` - User dashboard
- `/invite/[slug]` - Public invitation view
- `/playground` - Animation testing (NEW)

---

## 📦 Dependencies

### Production
```json
{
  "@supabase/supabase-js": "^2.75.0",
  "framer-motion": "^11.18.2",
  "@react-spring/web": "^9.7.3",
  "lottie-react": "^2.4.0",
  "react-player": "^2.16.0",
  "swiper": "^11.1.0",
  "react-hook-form": "^7.65.0",
  "zod": "^4.1.12",
  "tailwindcss": "^4.0.0",
  "next": "^15.5.4",
  "react": "^19.1.0"
}
```

---

## 🎓 How to Navigate

### For Developers:
1. Start with this file (PROJECT_STRUCTURE.md)
2. Read ANIMATION_LIBRARY_V2.md for animations
3. Read TEMPLATE_BUILDER_GUIDE.md for templates
4. Check DATABASE_REQUIREMENTS.md for schema

### For AI Agents:
1. PROJECT_STRUCTURE.md - Understand codebase
2. TEMPLATE_BUILDER_GUIDE.md - Build templates
3. ANIMATION_LIBRARY_V2.md - Use animations
4. Follow strict instructions

---

## 🔄 Migration Notes

### What Changed:
- ❌ Old rigid section system → ✅ Flexible block system
- ❌ Hardcoded themes → ✅ Component-based templates
- ❌ Basic animations → ✅ Advanced animation library
- ❌ Create wizard → ✅ (Will rebuild better)

### What Stayed:
- ✅ Authentication system
- ✅ Database schema
- ✅ UI components
- ✅ Utility functions
- ✅ Next.js structure

---

## 📌 Quick Reference

**Need to add an animation?**
→ `/components/animations-v2/`

**Need to create a template?**
→ `/components/templates-v2/themes/`

**Need a reusable block?**
→ `/components/templates-v2/blocks/`

**Need to update types?**
→ `/types/v2/`

**Need to test animations?**
→ `/app/playground/`

---

**Last Updated:** After major cleanup (January 2025)
**Next Steps:** Build animation library, create first stunning template
