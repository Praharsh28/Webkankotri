# 🎨 Theme Creation - Quick Reference Cheat Sheet

## ⚡ **TL;DR - Create a Theme in 5 Minutes**

### **Step 1: Pick Your Colors**
```typescript
// Choose ONE base color
Dark Theme BG: #4A0404 (deep burgundy)
Light Theme BG: #FFF8F0 (warm cream)

// Choose ONE accent  
Accent: #D4AF37 (metallic gold)
```

### **Step 2: Set Text Colors**
```typescript
// Dark theme → Light text
text: '#FFFFFF' (white)

// Light theme → Dark text
text: '#4A0404' (very dark burgundy)
```

### **Step 3: Apply Opacity**
```typescript
// Card overlays
Dark themes: rgba(255, 248, 225, 0.10)  // 10%
Light themes: rgba(139, 21, 56, 0.05)   // 5%
```

### **Step 4: Test Contrast**
```
Minimum: 7:1 ratio
Use: webaim.org/resources/contrastchecker
```

### **Step 5: Create Gradient**
```typescript
gradient: {
  from: '#darkest',
  via: '#medium',
  to: '#lighter',
}
```

---

## 🎨 **Color Formula Cheat Sheet**

### **Traditional Wedding Colors:**
```
Base: #8B1538 (burgundy), #DC2626 (red), #722F37 (wine)
Accent: #D4AF37 (gold), #B8860B (dark gold)
Text (dark): #FFFFFF (white), #FBBF24 (bright gold)
Text (light): #4A0404 (very dark), #8B1538 (dark burgundy)
```

### **Modern Wedding Colors:**
```
Base: #334155 (slate), #1E3A8A (navy), #581C87 (purple)
Accent: #EC4899 (pink), #A78BFA (purple), #10B981 (emerald)
Text (dark): #FFFFFF (white), #FFC0CB (pink)
Text (light): #1E293B (dark slate), #475569 (medium slate)
```

### **Elegant Wedding Colors:**
```
Base: #0F172A (almost black), #3D0C11 (deep wine)
Accent: #D4AF37 (gold), #E0AFA0 (rose gold)
Text (dark): #FFFFFF (white), #FBBF24 (gold)
Text (light): #0F172A (almost black), #3D0C11 (deep wine)
```

---

## 📐 **Opacity Rules**

```typescript
// Card backgrounds
Light themes: 0.03 - 0.08 (very subtle)
Dark themes: 0.10 - 0.15 (slightly more)

// Borders
Light: 0.20 - 0.30 (barely there)
Medium: 0.40 - 0.50 (noticeable)
Heavy: 1.0 (solid)

// Section backgrounds
All themes: 0.05 - 0.12 (subtle depth)
```

---

## ✅ **Quick Contrast Check**

```
✅ GOOD (7:1+):
#FFFFFF on #4A0404  ✓
#4A0404 on #FFF8F0  ✓
#0A472A on #FFFEF9  ✓

❌ BAD (< 4.5:1):
#FEF3C7 on #FFF8F0  ✗
#8B1538 on #4A0404  ✗
#D4AF37 on #FFFFFF  ✗ (borderline)
```

---

## 🎨 **Popular Pairings**

| Base Color | Best Accent | Feel |
|------------|-------------|------|
| Burgundy (#8B1538) | Gold (#D4AF37) | Traditional |
| Wine (#722F37) | Gold (#D4AF37) | Elegant |
| Navy (#1E3A8A) | Rose Gold (#E0AFA0) | Modern |
| Emerald (#046307) | Gold (#D4AF37) | Unique |
| Purple (#581C87) | Gold (#FBBF24) | Royal |
| Slate (#334155) | Pink (#EC4899) | Contemporary |

---

## 🚀 **Copy-Paste Template**

```typescript
export const myTheme: KankotriTheme = {
  id: 'my-theme',
  name: 'My Theme',
  description: 'Description here',
  category: 'traditional',
  price: 0,
  isPremium: false,
  isFeatured: false,
  
  colors: {
    primary: '#______',
    secondary: '#______',
    accent: '#______',
    
    text: {
      primary: '#______',
      secondary: '#______',
      heading: '#______',
      inverse: '#______',
    },
    
    background: {
      primary: '#______',
      secondary: '#______',
      card: 'rgba(_, _, _, 0.__)',
      overlay: 'rgba(255, 255, 255, 0.95)',
    },
    
    border: {
      light: 'rgba(_, _, _, 0.25)',
      medium: 'rgba(_, _, _, 0.45)',
      heavy: '#______',
    },
  },
  
  // Copy fonts, spacing, borders from existing theme
  fonts: { /* ... */ },
  spacing: { /* ... */ },
  borders: { /* ... */ },
  
  backgrounds: {
    pattern: { type: 'gradient', opacity: 1 },
    gradient: {
      from: '#______',
      via: '#______',
      to: '#______',
      direction: 'to-b',
    },
    effects: { blur: false, overlay: false, opacity: 1 },
  },
  
  animations: { /* ... */ },
  
  sectionStyles: {
    header: {
      backgroundColor: 'rgba(_, _, _, 0.10)',
      borderColor: '#______',
      padding: '3rem 2rem',
    },
    blessing: {
      backgroundColor: 'rgba(_, _, _, 0.08)',
      borderColor: 'rgba(_, _, _, 0.35)',
      textColor: '#______',
    },
    'event-main': {
      backgroundColor: 'rgba(_, _, _, 0.10)',
      borderColor: '#______',
    },
  },
}
```

---

## 🎯 **Must Remember**

1. **Contrast ≥ 7:1** - Always test
2. **3-4 colors max** - Keep it simple
3. **Opacity subtle** - Less is more
4. **Test on screens** - Light & dark environments
5. **Both versions** - Dark & light for choice

---

## 🛠️ **Essential Tools**

- **Colors:** coolors.co
- **Contrast:** webaim.org/resources/contrastchecker  
- **Inspiration:** pinterest.com (search "wedding colors")

---

## 📊 **Current Themes Reference**

```typescript
// Use these as examples:
Traditional Dark: /lib/themes/traditional.ts
Traditional Light: /lib/themes/traditional-light.ts
Royal Dark: /lib/themes/royal.ts
Royal Light: /lib/themes/royal-light.ts
Modern Dark: /lib/themes/modern.ts
Modern Light: /lib/themes/modern-light.ts
```

---

**Done! Quick reference for creating themes anytime!** 🎨
