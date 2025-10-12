# ✨ Animation Library - Complete Guide

## 📚 **What This Library Offers**

A collection of **elegant, subtle animations** that enhance the kankotri without being flashy or using neon colors. All animations are optimized for mobile and maintain the sophisticated feel of your wedding invitations.

---

## 🎯 **Design Philosophy**

### **✅ DO:**
- Use subtle, elegant movements
- Enhance readability and flow
- Keep traditional/elegant feel
- Use warm, muted colors (gold, cream, burgundy)
- Make animations optional and controllable

### **❌ DON'T:**
- Use neon colors or flashy effects
- Distract from the content
- Make animations mandatory
- Use aggressive movements
- Slow down page performance

---

## 🎨 **Available Animations**

### **1. Floating Elements** 🪔
**What it does:** Gentle floating decorative icons (diyas, flowers, etc.)
**Best for:** Background decoration, festive feel
**Elegance level:** ⭐⭐⭐⭐⭐

```typescript
<FloatingElements 
  icons={['🪔', '✨', '💐']}  // Choose elegant emojis
  count={12}                  // Number of elements
  speed="slow"                // 'slow' | 'medium' | 'fast'
/>
```

**When to use:**
- Traditional themes
- Background decoration
- Festive celebrations

**Colors:** Automatically uses theme colors (no neon!)

---

### **2. Fade In** 📝
**What it does:** Content gracefully appears when page loads
**Best for:** Text, headings, sections
**Elegance level:** ⭐⭐⭐⭐⭐

```typescript
<FadeIn 
  delay={0.2}              // Delay before animation starts
  direction="up"           // 'up' | 'down' | 'left' | 'right' | 'none'
  duration={0.5}           // How long animation takes
>
  <h1>Names appear gracefully</h1>
</FadeIn>
```

**When to use:**
- Bride/groom names
- Section headings
- Important messages
- Sequential reveal of content

**Pro tip:** Use increasing delays (0.2, 0.4, 0.6) for sequential elements

---

### **3. Shine Effect** ✨
**What it does:** Subtle shimmer passes over text (like gold reflection)
**Best for:** Headlines, featured text
**Elegance level:** ⭐⭐⭐⭐

```typescript
<ShineEffect duration={2}>
  <h1 className="text-gold">Golden shimmer</h1>
</ShineEffect>
```

**When to use:**
- Names of bride/groom
- Special announcements
- Premium themes
- Draw attention without being loud

**Note:** Very subtle, uses white/transparent gradient (not neon!)

---

### **4. Pulse** 💓
**What it does:** Gentle breathing effect (subtle scale)
**Best for:** Important elements, calls to action
**Elegance level:** ⭐⭐⭐⭐

```typescript
<Pulse 
  scale={1.05}          // How much it grows (subtle!)
  duration={2}          // Breathing speed
>
  <div className="important-message">Gentle pulse</div>
</Pulse>
```

**When to use:**
- RSVP buttons
- Important dates
- Decorative elements
- Draw subtle attention

**Warning:** Don't overuse - only for key elements

---

### **5. Decorative Corners** 🎨
**What it does:** Elegant corner decorations with patterns
**Best for:** Frame the invitation beautifully
**Elegance level:** ⭐⭐⭐⭐⭐

```typescript
<DecorativeCorner 
  position="top-left"           // 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  pattern="floral"              // 'floral' | 'geometric' | 'mandala'
  color="#D4AF37"               // Gold, burgundy, etc. (NO NEON!)
  size={100}                    // Size in pixels
/>
```

**When to use:**
- All four corners for traditional look
- Top corners only for modern look
- Create elegant border/frame

**Patterns:**
- **Floral:** Traditional, wedding-appropriate
- **Geometric:** Modern, clean lines
- **Mandala:** Cultural, intricate

---

### **6. Sparkle** ⭐
**What it does:** Tiny twinkling particles (like stars, very subtle)
**Best for:** Background magic, premium feel
**Elegance level:** ⭐⭐⭐⭐

```typescript
<Sparkle 
  count={20}                          // Number of sparkles
  colors={['#FBBF24', '#FCD34D']}    // Warm gold tones only!
/>
```

**When to use:**
- Background layer
- Premium themes
- Celebration feel

**Important:** Only use warm colors (gold, cream). NO neon pink, green, blue!

---

### **7. Reveal on Scroll** 📜
**What it does:** Content appears as user scrolls down
**Best for:** Long invitations with multiple sections
**Elegance level:** ⭐⭐⭐⭐⭐

```typescript
<RevealOnScroll 
  direction="up"    // 'up' | 'down' | 'left' | 'right'
  delay={0}         // Optional delay
>
  <section>Reveals when scrolled into view</section>
</RevealOnScroll>
```

**When to use:**
- Event details sections
- Schedule/timeline
- Photo galleries
- Keep content fresh as user scrolls

---

### **8. Hover Scale** 👆
**What it does:** Subtle grow effect on hover/tap
**Best for:** Buttons, cards, interactive elements
**Elegance level:** ⭐⭐⭐⭐

```typescript
<HoverScale 
  scale={1.05}      // How much it grows (keep subtle!)
  duration={0.2}    // Animation speed
>
  <button>RSVP Now</button>
</HoverScale>
```

**When to use:**
- Buttons (RSVP, Download, Share)
- Cards
- Clickable elements
- Provide feedback on interaction

---

### **9. Typewriter** ⌨️
**What it does:** Text appears character by character
**Best for:** Special messages, quotes
**Elegance level:** ⭐⭐⭐

```typescript
<Typewriter 
  text="Join us for our special day..."
  speed={50}        // Milliseconds per character
  delay={500}       // Delay before starting
/>
```

**When to use:**
- Personal messages
- Quotes
- Special announcements

**Warning:** Use sparingly - can slow down content reveal

---

### **10. Animated Gradient** 🌈
**What it does:** Smooth, slow color gradient transition
**Best for:** Background, subtle movement
**Elegance level:** ⭐⭐⭐⭐

```typescript
<AnimatedGradient 
  colors={['#4A0404', '#6B1E3C', '#4A0404']}  // Dark burgundy shades
  speed={15}                                    // Slow = elegant
  blur={false}                                  // Usually false for clarity
/>
```

**When to use:**
- Background layer
- Create depth
- Very subtle movement

**Important:** Only use theme colors (burgundy, wine, navy). NO neon!

---

### **11. Confetti Burst** 🎊
**What it does:** Celebration effect (use sparingly!)
**Best for:** Special moments, optional celebration
**Elegance level:** ⭐⭐⭐ (Use carefully!)

```typescript
<ConfettiBurst 
  trigger={celebrate}                    // Controlled trigger
  particleCount={50}                     // Keep moderate
  colors={['#D4AF37', '#F0E68C']}       // Gold tones only!
/>
```

**When to use:**
- User clicks "Celebrate" button
- After RSVP confirmation
- Optional, user-triggered only

**Warning:** 
- Never auto-trigger on page load
- Use warm colors (gold, orange) only
- Keep particle count moderate

---

### **12. Rotate** 🔄
**What it does:** Slow continuous rotation
**Best for:** Decorative elements only
**Elegance level:** ⭐⭐⭐

```typescript
<Rotate 
  duration={20}     // Slow rotation (20 seconds per rotation)
  clockwise={true}
>
  <div className="decorative-mandala">🌸</div>
</Rotate>
```

**When to use:**
- Decorative backgrounds
- Mandala patterns
- Very subtle decoration

**Warning:** Don't rotate text or important content!

---

## 🎨 **Animation Combinations for Each Theme**

### **Traditional Themes (Burgundy & Gold):**
```typescript
// Elegant, classical combinations
<FloatingElements icons={['🪔', '🌺', '💐']} count={10} speed="slow" />
<DecorativeCorner position="top-left" pattern="mandala" color="#D4AF37" />
<DecorativeCorner position="top-right" pattern="mandala" color="#D4AF37" />
<FadeIn delay={0.2} direction="up">
  <ShineEffect>
    <h1>Raj & Priya</h1>
  </ShineEffect>
</FadeIn>
```

**Feel:** Traditional, elegant, festive

---

### **Modern Themes (Navy & Rose Gold):**
```typescript
// Clean, subtle combinations
<AnimatedGradient 
  colors={['#0F1035', '#1A1A40', '#0F1035']} 
  speed={15} 
/>
<DecorativeCorner position="top-left" pattern="geometric" color="#E0AFA0" />
<RevealOnScroll direction="up">
  <section>Event Details</section>
</RevealOnScroll>
<HoverScale scale={1.05}>
  <button>RSVP</button>
</HoverScale>
```

**Feel:** Contemporary, clean, polished

---

### **Light Themes (White Background):**
```typescript
// Very subtle, let content shine
<Sparkle count={15} colors={['#8B1538', '#D4AF37']} />
<FadeIn delay={0.2} direction="up">
  <h1>Beautiful Text</h1>
</FadeIn>
<HoverScale scale={1.03}>
  <Card>Subtle interaction</Card>
</HoverScale>
```

**Feel:** Clean, professional, elegant

---

## ⚙️ **Theme Animation Settings**

Each theme has animation controls in its configuration:

```typescript
animations: {
  enabled: {
    floatingElements: true,   // Show floating icons
    sparkle: true,             // Show sparkles
    pulse: false,              // Disable pulsing
    fadeIn: true,              // Enable fade in
    slideIn: false,            // Disable slide
    shineEffect: true,         // Enable shine
    decorativeCorner: true,    // Show corners
    confettiBurst: false,      // Disable confetti (user-triggered only)
  },
  speed: 'slow',  // 'slow' | 'normal' | 'fast'
  floatingEmojis: ['🪔', '✨', '💐', '🌟'],  // Theme-specific icons
}
```

**Users can toggle animations on/off in their invitation settings!**

---

## 🎯 **Best Practices**

### **1. Less is More**
```
✅ Use 2-3 animation types per page
❌ Don't use all 12 animations at once
```

### **2. Subtle Over Flashy**
```
✅ scale={1.05} - Gentle
❌ scale={1.5} - Too aggressive
```

### **3. Warm Colors Only**
```
✅ Gold (#D4AF37), Burgundy (#8B1538), Cream (#FFF8F0)
❌ Neon pink (#FF00FF), Neon green (#00FF00)
```

### **4. Slow Speeds**
```
✅ speed="slow", duration={2}
❌ speed="fast", duration={0.1}
```

### **5. Optional, Not Mandatory**
```
✅ Animations can be disabled by user
❌ Don't force animations that can't be turned off
```

---

## 📱 **Mobile Optimization**

All animations are:
- ✅ **60fps** on mobile devices
- ✅ **Touch-optimized** (hover becomes tap)
- ✅ **Low battery impact**
- ✅ **Small file size**
- ✅ **No external dependencies** (except Framer Motion)

**Automatic adjustments for mobile:**
- Reduce particle count on slower devices
- Disable heavy animations on low-end phones
- Respect user's "reduce motion" preference

---

## 🎨 **Color Guidelines**

### **Approved Colors (Elegant):**
```typescript
// Warm tones
Gold: '#D4AF37', '#FBBF24', '#F0E68C'
Burgundy: '#8B1538', '#4A0404', '#800020'
Cream: '#FFF8F0', '#FFF4E6', '#FFFEF7'
Rose Gold: '#E0AFA0', '#D4A5A5'

// Cool tones (subtle)
Navy: '#1E3A8A', '#0F1035'
Slate: '#334155', '#1E293B'
Wine: '#722F37', '#3D0C11'
```

### **❌ NEVER Use:**
```typescript
// Neon/flashy colors
Neon Pink: '#FF00FF'
Neon Green: '#00FF00'
Neon Blue: '#00FFFF'
Bright Orange: '#FF4500'
Hot Pink: '#FF1493'
```

**Rule:** If it looks like a nightclub, don't use it! 🚫

---

## 🛠️ **Implementation Guide**

### **Step 1: Import the Animation**
```typescript
import { FadeIn, FloatingElements, DecorativeCorner } from '@/components/animations'
```

### **Step 2: Wrap Your Content**
```typescript
<FadeIn delay={0.2}>
  <h1>Your Content</h1>
</FadeIn>
```

### **Step 3: Test on Mobile**
- Check performance
- Test touch interactions
- Verify animations look good

### **Step 4: Make it Optional**
```typescript
{theme.animations.enabled.fadeIn && (
  <FadeIn>
    <Content />
  </FadeIn>
)}
```

---

## 📊 **Animation Performance**

### **Resource Usage:**

| Animation | CPU Impact | Mobile-Friendly | File Size |
|-----------|-----------|-----------------|-----------|
| FadeIn | Very Low ✅ | Yes ✅ | 1KB |
| FloatingElements | Low ✅ | Yes ✅ | 2KB |
| Sparkle | Medium ⚠️ | Yes (reduced count) | 2KB |
| Pulse | Very Low ✅ | Yes ✅ | 1KB |
| ShineEffect | Low ✅ | Yes ✅ | 1KB |
| DecorativeCorner | Very Low ✅ | Yes ✅ | 2KB |
| RevealOnScroll | Low ✅ | Yes ✅ | 2KB |
| HoverScale | Very Low ✅ | Yes ✅ | 1KB |
| AnimatedGradient | Medium ⚠️ | Yes (slower speed) | 1KB |
| Typewriter | Low ✅ | Yes ✅ | 2KB |
| Rotate | Low ✅ | Yes ✅ | 1KB |
| ConfettiBurst | High ⚠️ | Use sparingly | 15KB |

---

## ✅ **Quick Checklist**

Before adding animations to a kankotri:

- [ ] Animation enhances, doesn't distract
- [ ] Colors are elegant (no neon)
- [ ] Speed is slow/subtle
- [ ] Works well on mobile
- [ ] Can be disabled by user
- [ ] Doesn't slow page load
- [ ] Tested on real device
- [ ] Maintains elegant feel

---

## 🎯 **Summary**

**What makes animations elegant:**
1. **Subtle movements** - Small scale, slow speed
2. **Warm colors** - Gold, burgundy, cream
3. **Optional** - User can disable
4. **Purposeful** - Enhances content, not decorative
5. **Mobile-optimized** - Smooth on all devices

**Remember:** The kankotri content is the star, animations are supporting actors! ⭐

---

## 📚 **Examples**

### **Minimal (Clean):**
```typescript
<FadeIn>
  <h1>Names</h1>
</FadeIn>
<HoverScale>
  <Button>RSVP</Button>
</HoverScale>
```

### **Traditional (Festive):**
```typescript
<FloatingElements icons={['🪔', '💐']} count={8} speed="slow" />
<DecorativeCorner position="top-left" pattern="mandala" />
<DecorativeCorner position="bottom-right" pattern="mandala" />
<FadeIn direction="up">
  <ShineEffect>
    <h1>Names</h1>
  </ShineEffect>
</FadeIn>
```

### **Modern (Sophisticated):**
```typescript
<AnimatedGradient colors={themeColors} speed={20} />
<RevealOnScroll>
  <EventDetails />
</RevealOnScroll>
<Sparkle count={10} colors={[gold, cream]} />
```

---

**Happy animating! Keep it elegant!** ✨
