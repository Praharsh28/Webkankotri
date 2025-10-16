# 🎯 MASTER AI BUILD BLUEPRINT

**E-Kankotri v2.0 - Complete AI Implementation Specification**

---

## 🎨 PROJECT VISION

**Build a production-ready Gujarati wedding invitation platform that:**
- Creates stunning animated invitations in under 2 minutes
- Works flawlessly on mobile (80% of traffic)
- Has silky-smooth 60fps animations
- Converts 10%+ of demo users to paying customers
- Generates ₹1,00,000+ revenue in first 3 months

---

## 📊 PROJECT SCOPE

### What We're Building (MVP)

**3 Core Features:**
1. **Template Gallery** - Video previews, instant demo mode
2. **Live Editor** - Real-time preview, debounced updates
3. **Payment & Download** - Razorpay integration, PDF generation

**1 Template to Start:**
- Garba Night (animated Gujarati traditional style)
- Can be duplicated for more templates later

**User Flow:**
```
Landing → See animated preview → Click "Try Now" → 
Edit in demo mode (no login) → Love it → Pay ₹299 → 
Sign up → Download PDF → Share via WhatsApp
```

---

## 🏗️ TECHNICAL ARCHITECTURE

### Stack (Non-Negotiable)

```
Frontend:
- Next.js 15.5.4 (App Router)
- React 19.1.0
- TypeScript 5
- Tailwind CSS 4
- Framer Motion 12 (animations)
- shadcn/ui (components)

Backend:
- Supabase (PostgreSQL + Auth + Storage)
- Row-level security

Integrations:
- Razorpay (payments)
- Resend (emails)
- Vercel (hosting)

Key Libraries:
- react-hook-form + zod (forms)
- @react-pdf/renderer (PDF generation)
- date-fns (dates)
- lucide-react (icons)
```

### Performance Targets

```
Landing Page:     <2s load time, <100kb bundle
Demo Editor:      <2s load, <150kb bundle
Template Render:  60fps animations
Real-time Preview: <800ms debounce
PDF Generation:   <3s
```

---

## 📁 PROJECT STRUCTURE

```
e-kankotri-v2/
├── app/
│   ├── (public)/
│   │   ├── page.tsx                    # Landing page
│   │   ├── templates/page.tsx          # Gallery (if needed)
│   │   └── t/[id]/try/page.tsx         # Demo mode
│   │
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   │
│   ├── (dashboard)/
│   │   ├── page.tsx                    # Dashboard
│   │   └── i/[slug]/
│   │       ├── edit/page.tsx
│   │       └── download/page.tsx
│   │
│   ├── i/[slug]/page.tsx               # Public invitation
│   │
│   ├── api/
│   │   ├── checkout/route.ts
│   │   ├── verify-payment/route.ts
│   │   ├── generate-pdf/route.ts
│   │   └── send-email/route.ts
│   │
│   ├── layout.tsx
│   └── globals.css
│
├── components/
│   ├── ui/                             # shadcn components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── label.tsx
│   │   └── ...
│   │
│   ├── templates/
│   │   ├── garba-night.tsx
│   │   ├── template-renderer.tsx
│   │   └── template-config.ts
│   │
│   ├── features/
│   │   ├── TemplateCard.tsx
│   │   ├── TemplateGallery.tsx
│   │   ├── DemoEditor.tsx
│   │   ├── LivePreview.tsx
│   │   ├── PaymentModal.tsx
│   │   ├── PDFDownload.tsx
│   │   └── WhatsAppShare.tsx
│   │
│   ├── animations/
│   │   ├── FloatingDiya.tsx
│   │   ├── FadeIn.tsx
│   │   ├── SlideUp.tsx
│   │   └── animation-variants.ts
│   │
│   ├── forms/
│   │   ├── InvitationForm.tsx
│   │   ├── ColorPicker.tsx
│   │   └── DatePicker.tsx
│   │
│   └── layouts/
│       ├── LandingLayout.tsx
│       ├── DashboardLayout.tsx
│       └── EditorLayout.tsx
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── middleware.ts
│   │
│   ├── utils/
│   │   ├── cn.ts
│   │   ├── debounce.ts
│   │   └── format-date.ts
│   │
│   ├── validations/
│   │   ├── invitation-schema.ts
│   │   └── payment-schema.ts
│   │
│   └── constants/
│       ├── template-configs.ts
│       ├── colors.ts
│       └── fonts.ts
│
├── hooks/
│   ├── useDebounce.ts
│   ├── useAuth.ts
│   ├── useInvitation.ts
│   └── usePayment.ts
│
├── types/
│   ├── template.ts
│   ├── invitation.ts
│   ├── payment.ts
│   └── database.ts
│
└── public/
    ├── fonts/
    ├── videos/
    └── images/
```

---

## 🗄️ DATABASE SCHEMA

```sql
-- Templates (admin-managed, static data)
CREATE TABLE templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  template_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  thumbnail_url TEXT,
  preview_video_url TEXT,
  price_tier TEXT NOT NULL, -- 'free', 'basic', 'premium'
  config JSONB NOT NULL,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Invitations (user-created)
CREATE TABLE invitations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  template_id TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  data JSONB NOT NULL, -- All customization data
  status TEXT DEFAULT 'draft', -- 'draft', 'published'
  payment_status TEXT DEFAULT 'unpaid', -- 'unpaid', 'paid'
  payment_id TEXT,
  payment_amount INTEGER,
  payment_date TIMESTAMPTZ,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Users (managed by Supabase Auth, extended profile)
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security Policies
ALTER TABLE invitations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own invitations"
  ON invitations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create invitations"
  ON invitations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own invitations"
  ON invitations FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Public can view published invitations"
  ON invitations FOR SELECT
  USING (status = 'published');
```

---

## 🎨 DESIGN SYSTEM

### Color Palette

```typescript
// Primary Colors
const colors = {
  // Orange (Primary)
  orange: {
    50: '#FFF7ED',
    100: '#FFEDD5',
    200: '#FED7AA',
    300: '#FDBA74',
    400: '#FB923C',
    500: '#F97316', // Primary
    600: '#EA580C',
    700: '#C2410C',
    800: '#9A3412',
    900: '#7C2D12',
  },
  
  // Red (Accent)
  red: {
    500: '#EF4444',
    600: '#DC2626',
  },
  
  // Pink (Accent)
  pink: {
    500: '#EC4899',
    600: '#DB2777',
  },
  
  // Neutrals
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  }
}
```

### Typography

```typescript
// Font Families
const fonts = {
  display: 'Playfair Display, serif', // For headings
  body: 'Inter, sans-serif',          // For body text
  gujarati: 'Noto Sans Gujarati, sans-serif', // For Gujarati text
}

// Font Sizes (Tailwind scale)
const fontSize = {
  xs: '0.75rem',    // 12px
  sm: '0.875rem',   // 14px
  base: '1rem',     // 16px
  lg: '1.125rem',   // 18px
  xl: '1.25rem',    // 20px
  '2xl': '1.5rem',  // 24px
  '3xl': '1.875rem', // 30px
  '4xl': '2.25rem', // 36px
  '5xl': '3rem',    // 48px
  '6xl': '3.75rem', // 60px
}

// Font Weights
const fontWeight = {
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
}
```

### Spacing Scale

```typescript
// Tailwind spacing (use consistently)
const spacing = {
  0: '0',
  1: '0.25rem',  // 4px
  2: '0.5rem',   // 8px
  3: '0.75rem',  // 12px
  4: '1rem',     // 16px
  6: '1.5rem',   // 24px
  8: '2rem',     // 32px
  12: '3rem',    // 48px
  16: '4rem',    // 64px
  20: '5rem',    // 80px
  24: '6rem',    // 96px
}
```

### Border Radius

```typescript
const borderRadius = {
  sm: '0.125rem',   // 2px
  DEFAULT: '0.25rem', // 4px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  full: '9999px',
}
```

---

## 🎭 ANIMATION SYSTEM

### Core Principles

1. **Only animate `transform` and `opacity`** (GPU-accelerated)
2. **60fps target** (16.67ms per frame)
3. **Use Framer Motion** for complex animations
4. **CSS for simple transitions**
5. **Memoize all animated components**

### Animation Variants

```typescript
// lib/constants/animations.ts
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
}

export const slideUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
}

export const float = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
}

export const pulse = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [1, 0.8, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
}
```

---

## 📄 CORE FEATURES BREAKDOWN

### Feature 1: Landing Page

**Purpose:** Convert visitors to demo users

**Components:**
- Hero section with video background
- Value propositions (3 cards)
- Template showcase (1-3 cards with video)
- Social proof (user count + reviews)
- CTA buttons (Try Demo Free)

**Key Metrics:**
- Bounce rate <40%
- CTA click rate >20%

---

### Feature 2: Template Gallery (Optional)

**Purpose:** Let users browse templates

**Components:**
- Template card with video preview
- Category filters
- Search (if >10 templates)

**Initially:** Just show 1 template, so might skip this page

---

### Feature 3: Demo Mode (CRITICAL)

**Purpose:** Let users try before buying

**URL:** `/t/garba-night/try`

**Components:**
- Split screen (editor left, preview right on desktop)
- Pre-filled with sample data
- Form fields (names, date, venue, colors)
- Live preview (updates after 800ms debounce)
- Payment CTA (Download for ₹299)

**Key Features:**
- No login required
- Real-time preview
- 60fps animations
- Mobile responsive (stack vertically)

**Conversion Goal:** 15%+ of demo users pay

---

### Feature 4: Payment Flow

**Purpose:** Convert demo users to paying customers

**Flow:**
1. User clicks "Download for ₹299"
2. Payment modal opens (Razorpay)
3. User enters card details
4. Payment processes
5. On success: Create account + redirect to download

**Components:**
- PaymentModal.tsx
- Razorpay integration
- Success/failure handling
- Email confirmation

---

### Feature 5: Authentication

**Purpose:** Secure user data

**Flow:**
- Automatic signup after payment
- OR manual login/signup
- Supabase Auth (email/password)

**Components:**
- Login form
- Signup form
- Password reset (email)

---

### Feature 6: Dashboard

**Purpose:** Let users manage invitations

**Features:**
- List all invitations (cards)
- Create new
- Edit existing
- Delete
- Download PDF
- View public link

**Components:**
- DashboardLayout
- InvitationCard
- CreateButton

---

### Feature 7: PDF Generation

**Purpose:** Deliver final product

**Technology:** @react-pdf/renderer

**Requirements:**
- Match template design exactly
- High resolution (300 DPI)
- A4 size
- No watermark (paid users)
- Generate <3 seconds

---

### Feature 8: WhatsApp Share

**Purpose:** Easy sharing

**Mechanism:**
- Generate unique public URL
- Pre-filled message template
- Open WhatsApp web/app

**Message Template:**
```
🎊 You're invited to [Groom] & [Bride]'s wedding!

📅 [Date]
📍 [Venue]

View your invitation: [URL]
```

---

## 🎯 SUCCESS CRITERIA

### Technical

- ✅ <2s page load
- ✅ 60fps animations
- ✅ Works on mobile (iOS + Android)
- ✅ Zero runtime errors
- ✅ TypeScript strict mode
- ✅ 90+ Lighthouse score

### Business

- ✅ 15% demo → payment conversion
- ✅ <5% refund rate
- ✅ 10 customers in first week
- ✅ ₹50,000 revenue in first month

### User Experience

- ✅ Create invitation in <2 minutes
- ✅ Demo works without login
- ✅ Preview updates smoothly
- ✅ Payment flow <60 seconds
- ✅ PDF downloads instantly

---

## 📝 DOCUMENT INDEX

This Master Blueprint links to:

1. **01_TECHNICAL_ARCHITECTURE.md** - Detailed tech specs
2. **02_DESIGN_SYSTEM.md** - Complete design tokens
3. **03_COMPONENT_SPECIFICATIONS.md** - Every component spec
4. **04_TEMPLATE_SPECIFICATIONS.md** - Garba Night template details
5. **05_API_SPECIFICATIONS.md** - All API endpoints
6. **06_DATABASE_SCHEMA.md** - Complete schema + RLS
7. **07_FEATURE_SPECIFICATIONS.md** - Feature-by-feature breakdown
8. **08_USER_FLOWS.md** - User journey maps
9. **09_PERFORMANCE_REQUIREMENTS.md** - Performance budget
10. **10_DEPLOYMENT_GUIDE.md** - How to deploy

---

## 🚀 DEVELOPMENT PHASES

### Phase 1: Foundation (AI Session 1)
- Project setup
- Design system implementation
- Core UI components
- Landing page

### Phase 2: Core Features (AI Session 2-3)
- Template component
- Demo editor
- Live preview
- Animation system

### Phase 3: Payment & Auth (AI Session 4)
- Razorpay integration
- Supabase auth
- Payment flow

### Phase 4: Dashboard & PDF (AI Session 5)
- User dashboard
- PDF generation
- WhatsApp share

### Phase 5: Polish & Deploy (AI Session 6)
- Performance optimization
- Error handling
- Testing
- Deployment

---

## ✅ READY FOR AI CODING

This blueprint provides:
- ✅ Clear technical stack
- ✅ Complete project structure
- ✅ Database schema
- ✅ Design system
- ✅ Feature breakdown
- ✅ Success criteria

**Next:** Read detailed specifications in AI_BUILD_SPECS folder

**Start Coding:** After reading all 10 specification documents
