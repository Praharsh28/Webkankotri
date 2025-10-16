# ⚡ AI TEMPLATE CREATION - QUICK START

**Use this for rapid template creation. Full guide: `AI_TEMPLATE_CREATION_GUIDE.md`**

---

## 🎯 5-MINUTE CHECKLIST

### 1. UNDERSTAND (5 min)
- [ ] What type of template? (Wedding, portfolio, etc.)
- [ ] Target audience? (Culture, age, preferences)
- [ ] Budget level? (Premium, mid, budget)
- [ ] Key emotion? (Joy, elegance, excitement)

### 2. RESEARCH (10 min)
- [ ] Google: "[culture] [type] traditional design"
- [ ] Find 3-5 examples for inspiration
- [ ] Note: colors, symbols, typography, layout
- [ ] Document cultural meanings

### 3. DESIGN (10 min)
**Color Palette (8-12 colors):**
- [ ] 3-4 primary colors (from research)
- [ ] 2-3 backgrounds
- [ ] 3-4 text colors
- [ ] Test contrast (WCAG AA)

**Typography:**
- [ ] Heading font
- [ ] Body font
- [ ] Optional accent font

**Layout:**
- [ ] Sketch 3 sections minimum
- [ ] Choose style (minimal/luxury/modern/traditional)

### 4. BUILD (60-120 min)
**File Structure:**
```
[Name]Template/
├── [Name]Template.tsx
├── [name]-config.ts
├── sections/
├── animations/
└── components/
```

**Core Sections:**
- [ ] Hero/Cover
- [ ] Main content (2-3 sections)
- [ ] Footer/CTA

### 5. ANIMATE (30-60 min)
**Essential:**
- [ ] Fade in on load
- [ ] Scroll reveals
- [ ] Hover states

**Premium (add if time):**
- [ ] Stagger animations
- [ ] Parallax
- [ ] Particle effects

### 6. TEST (15 min)
- [ ] Mobile (375px)
- [ ] Tablet (768px)
- [ ] Desktop (1920px)
- [ ] Chrome, Safari, Firefox
- [ ] Lighthouse score >85

### 7. POLISH (30 min)
- [ ] Self-critique (list 10 issues)
- [ ] Fix critical issues
- [ ] Add documentation
- [ ] Create demo data

---

## 🎨 INSTANT COLOR PALETTES

### Wedding - Elegant Gold
```
primary: #1b4d3e    (temple green)
secondary: #b8860b  (sacred gold)
accent: #9d2235     (kumkum red)
background: #f9f6f0 (warm cream)
```

### Wedding - Modern Rose
```
primary: #c41e3a    (rose red)
secondary: #d4af37  (gold)
accent: #2d5016     (forest green)
background: #faf7f2 (ivory)
```

### Portfolio - Professional
```
primary: #1a1a1a    (charcoal)
secondary: #0066cc  (blue)
accent: #ff6b35     (orange)
background: #ffffff (white)
```

### Birthday - Playful
```
primary: #ff6b9d    (pink)
secondary: #ffd93d  (yellow)
accent: #6bcf7f     (green)
background: #fff5f7 (light pink)
```

---

## 🎬 ANIMATION RECIPES

### Recipe 1: Elegant Entrance
```tsx
// 1. Fade in background (0.5s)
// 2. Scale in title (1s, spring)
// 3. Fade in subtitle (1.5s)
// 4. Slide up CTA (2s)
```

### Recipe 2: Letter Reveal
```tsx
<TextReveal delay={0.5} staggerDelay={0.05}>
  {name}
</TextReveal>
```

### Recipe 3: Parallax Depth
```tsx
<ParallaxScroll speed={0.5}>
  <Background />
</ParallaxScroll>
```

### Recipe 4: Scroll Trigger
```tsx
<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
>
  {content}
</motion.div>
```

---

## 📐 LAYOUT PATTERNS

### Pattern 1: Hero-Content-CTA
```
┌─────────────────┐
│   HERO (100vh)  │
│   - Title       │
│   - Subtitle    │
│   - Button      │
├─────────────────┤
│   CONTENT       │
│   - 3 cards     │
├─────────────────┤
│   CTA           │
│   - Form        │
└─────────────────┘
```

### Pattern 2: Split Screen
```
┌────────┬────────┐
│ Image  │ Text   │
│        │ Title  │
│        │ Desc   │
│        │ Button │
├────────┴────────┤
│   Content Grid  │
└─────────────────┘
```

### Pattern 3: Centered
```
┌─────────────────┐
│     Header      │
├─────────────────┤
│                 │
│   Centered      │
│   Content       │
│   Max-width     │
│   800px         │
│                 │
├─────────────────┤
│     Footer      │
└─────────────────┘
```

---

## 🚀 RAPID PROTOTYPING

**30-Minute MVP:**
1. ✅ Create config file (5 min)
2. ✅ Build Hero section (10 min)
3. ✅ Add one content section (10 min)
4. ✅ Basic animations (5 min)
5. ✅ **SHIP IT** then iterate

**2-Hour Polish:**
1. ✅ Add 2 more sections (30 min)
2. ✅ Premium animations (30 min)
3. ✅ Responsive design (30 min)
4. ✅ Testing + fixes (30 min)

---

## ⚡ POWER SHORTCUTS

### Instant SVG Motif
```tsx
<svg viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="40" fill="currentColor" />
</svg>
```

### Instant Paper Texture
```css
.paper-texture {
  background: #f9f6f0;
  background-image: repeating-linear-gradient(
    90deg,
    transparent 0px,
    rgba(0,0,0,.02) 1px,
    transparent 2px,
    transparent 4px
  );
}
```

### Instant Gold Effect
```tsx
<span style={{
  background: 'linear-gradient(135deg, #b8860b, #ffd700, #b8860b)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent'
}}>
  Gold Text
</span>
```

### Instant Parallax
```tsx
const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
<motion.div style={{ y }}>Content</motion.div>
```

---

## 🎯 QUALITY GATES

**Before shipping, verify:**
- [ ] Unique (not a copy)
- [ ] Responsive (mobile works)
- [ ] Fast (loads <3s)
- [ ] Accessible (WCAG AA)
- [ ] Documented (README exists)
- [ ] Demo (sample data provided)

---

## 🔥 COMMON PITFALLS

❌ **Don't:**
- Copy existing templates
- Guess colors (research!)
- Skip mobile testing
- Add too many animations
- Forget accessibility

✅ **Do:**
- Research thoroughly
- Test on real devices
- Iterate multiple times
- Document decisions
- Think about emotion

---

## 📚 WHEN TO USE FULL GUIDE

**Use quick start for:**
- Simple templates
- Tight deadlines
- MVP/prototype
- Learning/practice

**Use full guide for:**
- Premium templates
- Cultural templates
- Complex layouts
- Production quality
- When quality >speed

---

## 🎓 MASTERY PATH

**Beginner:** Follow checklist exactly  
**Intermediate:** Customize steps, add flair  
**Advanced:** Create new patterns, innovate  
**Master:** Write your own guide

---

**Time to create: 2-4 hours**  
**Quality level: Production-ready**

**NOW GO BUILD! 🚀**
