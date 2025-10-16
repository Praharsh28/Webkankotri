# 🤖 AI AGENT INSTRUCTIONS - READ THIS FIRST

**Critical instructions for ANY AI agent building this project**

---

## 🎯 YOUR MISSION

You are building **E-Kankotri v2.0** - a digital invitation platform for Gujarati weddings and celebrations.

**This folder contains 27 comprehensive specification documents with ~22,000 lines of production-ready code.**

Your job: Implement EXACTLY what's specified. No improvisation, no "better ideas", just faithful execution.

---

## ⚠️ CRITICAL RULES - NEVER VIOLATE THESE

### 1. READ BEFORE WRITING
```
❌ WRONG: "I'll create the component now..."
✅ CORRECT: Read the spec → Understand fully → Then implement
```

**Never write code without reading the specification first.**

### 2. COPY-PASTE OVER REWRITE
```
❌ WRONG: "I'll implement this differently using X library..."
✅ CORRECT: Use the EXACT code from specifications
```

**The specs contain production-tested code. Use it as-is.**

### 3. NO HARDCODED VALUES
```
❌ WRONG: const url = 'http://localhost:3000'
✅ CORRECT: const url = getAppUrl()

❌ WRONG: const apiKey = 'sk_test_123...'
✅ CORRECT: const apiKey = process.env.RAZORPAY_KEY_ID
```

**Everything must use environment variables. See 22_ENVIRONMENT_URLS_GUIDE.md**

### 4. MOBILE-FIRST ALWAYS
```
❌ WRONG: <div className="text-xl md:text-base">
✅ CORRECT: <div className="text-base md:text-xl">
```

**90% of users are mobile. Design for mobile first, then scale up.**

### 5. NO "IMPROVEMENTS" WITHOUT ASKING
```
❌ WRONG: "I'll add feature X because it's better..."
✅ CORRECT: "Should I add X? It's not in the specs."
```

**If it's not specified, ask the human first.**

### 6. CUSTOMER FIRST
```
❌ WRONG: Log error and continue
✅ CORRECT: Refund customer + notify + log error
```

**Payment failures → Automatic refunds. No exceptions.**

### 7. TYPE SAFETY IS NON-NEGOTIABLE
```
❌ WRONG: const data: any = ...
✅ CORRECT: const data: InvitationData = ...
```

**Use TypeScript strict mode. No 'any' types.**

---

## 📚 DOCUMENT READING ORDER

### Phase 1: Understanding (Read First)
1. `00_AI_AGENT_INSTRUCTIONS.md` ← You are here
2. `00_MASTER_BLUEPRINT.md` - Project overview
3. `YOUR_QUESTIONS_ANSWERED.md` - User requirements
4. `README.md` - Document index

### Phase 2: Foundation (Before Writing Code)
5. `10_TYPESCRIPT_TYPES.md` - All types
6. `11_ENVIRONMENT_CONFIG.md` - Setup
7. `01_DESIGN_SYSTEM.md` - Design tokens
8. `06_DATABASE_SCHEMA.md` - Database

### Phase 3: Implementation (Follow This Order)
9. `00_START_CODING_NOW.md` - Quick start
10. `IMPLEMENTATION_CHECKLIST.md` - Step-by-step tasks
11. Individual specs as needed

### Phase 4: Special Features
12. `16_ANIMATION_COMPONENTS.md` - Animations FIRST
13. `19_GUEST_MANAGEMENT_SYSTEM.md` - Guest features
14. `20_MEDIA_UPLOADS_SYSTEM.md` - Uploads
15. `21_LANGUAGE_TOGGLE_SYSTEM.md` - Bilingual
16. `23_MOBILE_FIRST_DESIGN.md` - Mobile patterns

### Phase 5: Production
17. `24_PAYMENT_REFUND_POLICY.md` - Payment handling
18. `22_ENVIRONMENT_URLS_GUIDE.md` - URLs
19. `12_DEPLOYMENT_GUIDE.md` - Deploy

---

## 🎨 PROJECT-SPECIFIC RULES

### File Organization
```
e-kankotri/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Auth pages (grouped)
│   ├── (dashboard)/       # Dashboard pages (grouped)
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/
│   ├── ui/                # Base components (Button, Input)
│   ├── features/          # Feature components (DemoEditor)
│   ├── animations/        # Animation components (12 total)
│   └── templates/         # Template components (8 total)
├── lib/
│   ├── supabase/          # Supabase client
│   ├── utils/             # Utility functions
│   ├── services/          # Business logic
│   └── constants/         # Constants
├── hooks/                 # Custom React hooks
├── types/                 # TypeScript types
└── contexts/              # React contexts
```

### Naming Conventions
- **Components:** PascalCase (`DemoEditor.tsx`)
- **Utilities:** camelCase (`getAppUrl.ts`)
- **Constants:** SCREAMING_SNAKE_CASE (`UPLOAD_LIMITS`)
- **Types:** PascalCase (`InvitationData`)
- **Hooks:** camelCase starting with 'use' (`useAuth.ts`)

### Import Order
```typescript
// 1. React & Next.js
import { useState } from 'react'
import { useRouter } from 'next/navigation'

// 2. External libraries
import { motion } from 'framer-motion'
import { toast } from 'sonner'

// 3. Internal components
import { Button } from '@/components/ui/button'
import { DemoEditor } from '@/components/features/DemoEditor'

// 4. Utilities & hooks
import { useAuth } from '@/hooks/useAuth'
import { getAppUrl } from '@/lib/utils/urls'

// 5. Types
import type { InvitationData } from '@/types/invitation'
```

---

## 🚨 COMMON MISTAKES TO AVOID

### Mistake 1: Skipping Animation Components
❌ **WRONG:**
```typescript
// Creating animations inline in template
<motion.div animate={{ y: [0, -20, 0] }}>
```

✅ **CORRECT:**
```typescript
// Using pre-built animation component
import { FloatingElements } from '@/components/animations'
<FloatingElements icons={['🪔', '✨']} />
```

**Why:** 16_ANIMATION_COMPONENTS.md has 12 reusable components. Use them!

---

### Mistake 2: Hardcoding URLs
❌ **WRONG:**
```typescript
const shareUrl = `https://ekankotri.com/invitation/${id}`
```

✅ **CORRECT:**
```typescript
import { getInvitationUrl } from '@/lib/utils/urls'
const shareUrl = getInvitationUrl(id)
```

**Why:** URLs must adapt to dev/staging/production automatically.

---

### Mistake 3: Desktop-First CSS
❌ **WRONG:**
```tsx
<Button className="px-8 py-3 md:px-4 md:py-2">
```

✅ **CORRECT:**
```tsx
<Button className="px-4 py-2 md:px-8 md:py-3">
```

**Why:** Mobile-first means write mobile styles first, then add `md:` for desktop.

---

### Mistake 4: Complex Guest Forms
❌ **WRONG:**
```typescript
// One massive form with 10 fields
<form>
  <input name="name" required />
  <input name="email" required />
  <input name="phone" required />
  <input name="address" required />
  <input name="relationship" required />
  <input name="side" required />
  <input name="dietary" required />
  <input name="plusOne" required />
  <input name="notes" required />
  <input name="rsvp" required />
  <button>Submit</button>
</form>
```

✅ **CORRECT:**
```typescript
// Progressive 2-step form from 19_GUEST_MANAGEMENT_SYSTEM.md
// Step 1: Name + Phone only
// Step 2: Everything else (optional)
```

**Why:** User feedback said forms felt like "government forms". Keep it simple!

---

### Mistake 5: Ignoring TypeScript Types
❌ **WRONG:**
```typescript
function createInvitation(data: any) {
  // ...
}
```

✅ **CORRECT:**
```typescript
import type { InvitationData } from '@/types/invitation'

function createInvitation(data: InvitationData) {
  // TypeScript will catch errors
}
```

**Why:** 10_TYPESCRIPT_TYPES.md has ALL types defined. Use them!

---

## 🎯 IMPLEMENTATION STRATEGY

### Step 1: Setup (30 minutes)
```bash
# Follow 00_START_CODING_NOW.md exactly
npx create-next-app@latest e-kankotri --typescript --tailwind --app
cd e-kankotri
npm install [all dependencies from spec]
```

### Step 2: Create Animation Components FIRST (2 hours)
**Why first?** Templates depend on them!

```
components/animations/
├── FloatingElements.tsx
├── AnimatedGradient.tsx
├── ShineEffect.tsx
├── FadeIn.tsx
├── Pulse.tsx
├── Rotate.tsx
├── Typewriter.tsx
├── ConfettiBurst.tsx
├── DecorativeCorner.tsx
├── Sparkle.tsx
├── RevealOnScroll.tsx
├── HoverScale.tsx
└── index.ts
```

### Step 3: Templates (6 hours)
Create all 8 templates using animation components:
- 3 Kankotri templates
- 5 Card templates

### Step 4: Core Features (12 hours)
- DemoEditor
- Payment flow
- PDF generation
- Auth system

### Step 5: Advanced Features (8 hours)
- Guest management
- Media uploads
- Language toggle

### Step 6: Polish & Deploy (4 hours)
- Mobile testing
- Performance optimization
- Deploy to Vercel

**Total: ~32 hours**

---

## 🔍 DECISION FRAMEWORK

### When Something Is Ambiguous:

**Question:** "Should I use library X or Y?"
**Answer:** Check the spec. If it says Framer Motion, use Framer Motion. Don't substitute.

**Question:** "This seems inefficient, can I optimize?"
**Answer:** Only if the spec allows it AND it doesn't break anything.

**Question:** "The spec doesn't mention feature Z"
**Answer:** Don't add it. Ask the human first.

**Question:** "Can I change the color scheme?"
**Answer:** No. Use 01_DESIGN_SYSTEM.md colors exactly.

**Question:** "Should I add comments?"
**Answer:** Yes! Add JSDoc comments for functions, but don't over-comment obvious code.

---

## ✅ QUALITY CHECKLIST

Before marking any component "done":

- [ ] Matches specification exactly
- [ ] TypeScript types from 10_TYPESCRIPT_TYPES.md
- [ ] No hardcoded URLs (uses getAppUrl, etc.)
- [ ] Mobile-first CSS (mobile first, then md:, lg:, etc.)
- [ ] Animation components used (not inline animations)
- [ ] Environment variables for all configs
- [ ] Error handling with try/catch
- [ ] Loading states for async operations
- [ ] Success/error toasts for user feedback
- [ ] Tested on mobile viewport
- [ ] Accessible (keyboard navigation, ARIA labels)

---

## 🚫 ABSOLUTELY FORBIDDEN

### Never Do These:

1. **❌ Change the tech stack**
   - Must use: Next.js, Supabase, Tailwind, Framer Motion
   - Don't substitute with: Vue, Firebase, Bootstrap, etc.

2. **❌ Skip the animation component library**
   - Don't write animations inline
   - Use the 12 pre-built components

3. **❌ Hardcode anything**
   - No hardcoded URLs, API keys, colors, strings
   - Use env vars, constants, and the language system

4. **❌ Desktop-first design**
   - Don't write `lg:text-base text-xl`
   - Always write mobile first: `text-base lg:text-xl`

5. **❌ Ignore payment error handling**
   - Payment failures MUST trigger refunds
   - No exceptions

6. **❌ Complex forms**
   - Keep forms simple and progressive
   - No "government form" feeling

7. **❌ Use 'any' type**
   - TypeScript strict mode
   - All types defined in 10_TYPESCRIPT_TYPES.md

---

## 📖 WHEN YOU'RE STUCK

### If you don't understand something:

1. **Read the relevant spec again** (you probably missed something)
2. **Check related specs** (e.g., types in 10_TYPESCRIPT_TYPES.md)
3. **Look for examples** (specs have full code examples)
4. **Ask the human** (don't guess)

### If something seems wrong in the spec:

1. **Double-check you read it correctly**
2. **Check if there's an updated version**
3. **Point it out to the human** (specs can have errors)
4. **Don't just "fix" it yourself** (ask first)

---

## 🎯 SUCCESS CRITERIA

You've succeeded when:

- ✅ All 27 specs are implemented
- ✅ 8 templates work perfectly
- ✅ Guest management feels frictionless
- ✅ Mobile experience is smooth (90% of users)
- ✅ Payments work with auto-refunds
- ✅ No hardcoded URLs anywhere
- ✅ Language toggle works (EN/GU)
- ✅ Media uploads functional
- ✅ TypeScript compiles with zero errors
- ✅ All tests pass
- ✅ Lighthouse score >90
- ✅ Deployed to Vercel successfully

---

## 🚀 FINAL WORDS

**You are not being creative. You are being precise.**

This is **implementation**, not **innovation**.

Every line of code you write should trace back to a specification document.

If you find yourself thinking "I have a better way..." - **STOP**. Follow the spec.

The human has thought through these decisions. Your job is faithful execution.

---

## 📞 EMERGENCY CONTACTS

If you encounter critical issues:

1. **Check:** `GAP_ANALYSIS_AND_QUESTIONS.md`
2. **Review:** `YOUR_QUESTIONS_ANSWERED.md`
3. **Read:** Relevant specification document
4. **Ask:** The human before proceeding

---

## 🎓 REMEMBER

- **Specs are gospel** - Follow them exactly
- **Mobile-first** - 90% of users
- **Customer-first** - Refunds are automatic
- **No hardcoding** - Everything is dynamic
- **Type-safe** - No 'any' types
- **Animation library** - Use pre-built components
- **Progressive forms** - Not "government forms"
- **Bilingual** - English + Gujarati support

---

**NOW GO BUILD! 🚀**

**Start with: `00_START_CODING_NOW.md`**
