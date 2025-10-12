# 🎨 Theme Creation Guide - How to Create Perfect Color Themes

## 📚 **Complete Guide to Creating Wedding Invitation Themes**

This guide explains how to create beautiful, readable, and elegant themes for wedding invitations using proper color theory and best practices.

---

## 🎯 **Core Principles**

### **1. Contrast is KING**
- **Rule:** Text must be easily readable against the background
- **Minimum Contrast Ratio:** 7:1 for body text, 4.5:1 for large text (WCAG AAA)
- **Test your colors:** Use online contrast checkers

### **2. Dark vs Light Themes**
- **Dark Themes:** Light text on dark background (dramatic, luxurious)
- **Light Themes:** Dark text on light background (clean, professional)

### **3. Warmth vs Coolness**
- **Warm colors:** Red, burgundy, gold, orange (traditional, festive)
- **Cool colors:** Blue, navy, slate, purple (modern, sophisticated)
- **Mix wisely:** Warm backgrounds with warm accents, cool with cool

---

## 🌈 **Color Selection Strategy**

### **Step 1: Choose Your Base Color**

Start with the main color that represents the theme's mood:

```typescript
// Traditional Wedding
primary: '#8B1538'  // Deep burgundy - traditional, celebratory

// Royal/Elegant Wedding  
primary: '#722F37'  // Wine - luxurious, refined

// Modern Wedding
primary: '#334155'  // Slate - contemporary, clean
```

**How to choose:**
- Traditional Indian: Burgundy, maroon, deep red, gold
- Royal/Elegant: Wine, deep purple, navy, emerald
- Modern: Slate, navy, charcoal, muted tones
- Festive: Bright red, orange, bright gold

---

### **Step 2: Select Complementary Accent**

Pick a color that complements your base:

```typescript
// For Burgundy/Wine (warm reds):
accent: '#D4AF37'  // Metallic gold ✅ (traditional pairing)
accent: '#E0AFA0'  // Rose gold ✅ (modern twist)

// For Navy/Blue (cool tones):
accent: '#FFC0CB'  // Pink ✅ (romantic contrast)
accent: '#8B5CF6'  // Purple ✅ (modern sophistication)

// For Emerald Green:
accent: '#D4AF37'  // Gold ✅ (luxurious)
accent: '#F7E7CE'  // Champagne ✅ (elegant)
```

**Complementary Color Rules:**
- **Warm + Warm:** Burgundy + Gold ✅
- **Cool + Cool:** Navy + Purple ✅
- **Warm + Cool (carefully):** Red + Blue can work if done right
- **Metallic accents:** Gold, rose gold, silver work with everything

---

### **Step 3: Create Text Colors**

#### **For DARK Themes (dark background):**

```typescript
// DARK THEME EXAMPLE: Burgundy & Gold
colors: {
  // Background colors (DARK)
  background: {
    primary: '#4A0404',    // Very dark burgundy (almost black)
    secondary: '#6B1E3C',  // Deep burgundy
    card: 'rgba(255, 248, 225, 0.12)',  // Subtle warm overlay
  },
  
  // Text colors (LIGHT for contrast)
  text: {
    primary: '#FFFFFF',    // Pure white (maximum readability)
    secondary: '#FBBF24',  // Bright gold (visible accent)
    heading: '#FFFFFF',    // Pure white
    inverse: '#4A0404',    // Dark (for light backgrounds)
  },
  
  // Accent colors
  primary: '#800020',      // Rich burgundy
  secondary: '#D4AF37',    // Metallic gold
  accent: '#F0E68C',       // Soft gold
}
```

#### **For LIGHT Themes (light background):**

```typescript
// LIGHT THEME EXAMPLE: Cream & Burgundy
colors: {
  // Background colors (LIGHT)
  background: {
    primary: '#FFF8F0',    // Warm cream white
    secondary: '#FFF4E6',  // Light cream
    card: 'rgba(139, 21, 56, 0.05)',  // Very subtle burgundy tint
  },
  
  // Text colors (DARK for contrast)
  text: {
    primary: '#4A0404',    // Very dark burgundy (readable)
    secondary: '#8B1538',  // Dark burgundy (accents)
    heading: '#5D1A1D',    // Deep burgundy (strong)
    inverse: '#FFFFFF',    // White (for dark sections)
  },
  
  // Accent colors (same as dark theme)
  primary: '#8B1538',      // Dark burgundy
  secondary: '#B8860B',    // Dark gold
  accent: '#D4AF37',       // Metallic gold
}
```

---

## 🎨 **Color Harmony Formulas**

### **Formula 1: Monochromatic**
Use different shades of ONE color:

```typescript
// Burgundy Monochromatic
primary: '#4A0404'     // Very dark
secondary: '#8B1538'   // Medium dark
accent: '#B91C1C'      // Lighter
text: '#FFFFFF'        // White for contrast
```

### **Formula 2: Analogous**
Use colors next to each other on color wheel:

```typescript
// Red → Orange → Gold
primary: '#DC2626'     // Red
secondary: '#F59E0B'   // Orange
accent: '#FCD34D'      // Gold
```

### **Formula 3: Complementary**
Use opposite colors on color wheel:

```typescript
// Blue ↔ Orange
primary: '#1E3A8A'     // Navy blue
secondary: '#F59E0B'   // Orange
accent: '#FCD34D'      // Gold (harmonious)
```

### **Formula 4: Triadic**
Three colors evenly spaced on color wheel:

```typescript
// Red, Yellow, Blue
primary: '#DC2626'     // Red
secondary: '#EAB308'   // Yellow/Gold  
accent: '#3B82F6'      // Blue
```

---

## 📐 **Opacity & Transparency Guide**

### **Card Overlays:**

```typescript
// SUBTLE (barely visible) - 3-5%
card: 'rgba(139, 21, 56, 0.03)'  // ✅ Very elegant

// LIGHT (gentle tint) - 8-12%
card: 'rgba(139, 21, 56, 0.10)'  // ✅ Good balance

// MEDIUM (noticeable) - 15-20%
card: 'rgba(139, 21, 56, 0.18)'  // ✅ For emphasis

// HEAVY (prominent) - 25-30%
card: 'rgba(139, 21, 56, 0.28)'  // ⚠️ Can be too much
```

### **Border Opacity:**

```typescript
border: {
  light: 'rgba(212, 175, 55, 0.25)',   // Subtle
  medium: 'rgba(212, 175, 55, 0.45)',  // Noticeable
  heavy: '#D4AF37',                    // Solid (1.0)
}
```

**Rule of thumb:**
- Light themes: Use 3-8% opacity
- Dark themes: Use 8-15% opacity
- Borders: 20-50% opacity for elegance

---

## 🎨 **Step-by-Step: Create a New Theme**

### **Example: Creating "Emerald & Gold" Theme**

#### **Step 1: Define the Concept**
```
Name: Emerald Elegance
Mood: Fresh, luxurious, unique
Target: Modern couples who want something different
```

#### **Step 2: Choose Base Colors**
```typescript
// Research: Emerald weddings pair well with gold
primary: '#046307'     // Deep emerald green
secondary: '#D4AF37'   // Metallic gold
accent: '#FFF8E1'      // Warm cream
```

#### **Step 3: Create Dark Version**

```typescript
export const emeraldTheme: KankotriTheme = {
  id: 'emerald',
  name: 'Emerald Elegance',
  description: 'Fresh emerald and gold - luxurious and unique',
  category: 'elegant',
  price: 199,
  isPremium: true,
  
  colors: {
    // Background (DARK emerald)
    background: {
      primary: '#0A472A',    // Very dark emerald
      secondary: '#046307',  // Deep emerald
      card: 'rgba(255, 248, 225, 0.10)',
    },
    
    // Text (LIGHT for contrast)
    text: {
      primary: '#FFFFFF',    // Pure white
      secondary: '#FCD34D',  // Bright gold
      heading: '#FFFFFF',
      inverse: '#0A472A',
    },
    
    // Colors
    primary: '#046307',      // Deep emerald
    secondary: '#D4AF37',    // Metallic gold
    accent: '#F0E68C',       // Soft gold
    
    // Borders
    border: {
      light: 'rgba(212, 175, 55, 0.30)',
      medium: 'rgba(212, 175, 55, 0.50)',
      heavy: '#D4AF37',
    },
  },
  
  // Gradient background
  backgrounds: {
    gradient: {
      from: '#0A472A',     // Very dark emerald
      via: '#046307',      // Deep emerald
      to: '#0F5E32',       // Medium emerald
      direction: 'to-b',
    },
  },
  
  // ... rest of theme config
}
```

#### **Step 4: Create Light Version**

```typescript
export const emeraldLightTheme: KankotriTheme = {
  id: 'emerald-light',
  name: 'Emerald Light',
  description: 'Fresh emerald on cream - elegant and airy',
  
  colors: {
    // Background (LIGHT cream)
    background: {
      primary: '#FFFEF9',    // Warm ivory
      secondary: '#FFF8E1',  // Light cream
      card: 'rgba(4, 99, 7, 0.04)',  // Subtle emerald tint
    },
    
    // Text (DARK for contrast)
    text: {
      primary: '#0A472A',    // Very dark emerald (readable!)
      secondary: '#046307',  // Deep emerald
      heading: '#0F5E32',    // Medium emerald
      inverse: '#FFFFFF',
    },
    
    // Colors (same base, adjusted for light)
    primary: '#046307',      // Deep emerald
    secondary: '#B8860B',    // Dark gold
    accent: '#D4AF37',       // Metallic gold
    
    // Borders (adjusted opacity)
    border: {
      light: 'rgba(184, 134, 11, 0.20)',
      medium: 'rgba(184, 134, 11, 0.40)',
      heavy: '#B8860B',
    },
  },
  
  // Gradient background (light)
  backgrounds: {
    gradient: {
      from: '#FFFEF9',     // Warm ivory
      via: '#FFFCF5',      // Very light cream
      to: '#FFF8E1',       // Light cream
      direction: 'to-b',
    },
  },
}
```

---

## 🎯 **Color Contrast Checker**

### **Test Your Colors:**

```typescript
// GOOD Contrast Examples (7:1+):
'#FFFFFF' on '#4A0404'  // White on dark burgundy ✅
'#4A0404' on '#FFF8F0'  // Dark burgundy on cream ✅
'#0A472A' on '#FFFEF9'  // Dark emerald on ivory ✅

// POOR Contrast Examples (avoid):
'#FEF3C7' on '#FFF8F0'  // Cream on cream ❌
'#8B1538' on '#4A0404'  // Dark on dark ❌
'#D4AF37' on '#FFFFFF'  // Gold on white (barely OK)
```

### **Online Tools:**
- WebAIM Contrast Checker
- Coolors.co Contrast Checker
- Adobe Color Accessibility Tools

---

## 🎨 **Pre-Made Color Palettes**

### **Palette 1: Sunset Romance**
```typescript
primary: '#FF6B6B'     // Coral
secondary: '#FFD93D'   // Sunny yellow
accent: '#6BCB77'      // Mint green
Good for: Fun, vibrant, outdoor weddings
```

### **Palette 2: Midnight Glam**
```typescript
primary: '#2D3561'     // Navy
secondary: '#C05299'   // Magenta
accent: '#6C5F7A'      // Dusty purple
Good for: Evening, glamorous, modern
```

### **Palette 3: Garden Party**
```typescript
primary: '#7FB685'     // Sage green
secondary: '#E8C4A2'   // Tan
accent: '#FFFFFF'      // White
Good for: Outdoor, rustic, natural
```

### **Palette 4: Regal Purple**
```typescript
primary: '#5B2C6F'     // Deep purple
secondary: '#D4AF37'   // Gold
accent: '#FFF8E1'      // Cream
Good for: Royal, luxurious, elegant
```

---

## ⚠️ **Common Mistakes to Avoid**

### **❌ Don't:**
1. Use low contrast (text blends into background)
2. Use too many colors (stick to 3-4)
3. Mix too many warm/cool tones (looks chaotic)
4. Use pure black (#000000) - too harsh
5. Use neon colors - not elegant
6. Forget to test on different screens

### **✅ Do:**
1. Test contrast ratios (aim for 7:1+)
2. Stick to complementary colors
3. Use opacity for subtle effects
4. Choose warm whites over pure white in light themes
5. Use deep colors instead of pure black in dark themes
6. Test themes in both light and dark environments

---

## 📊 **Quick Reference Table**

| Theme Type | Background | Text Primary | Text Secondary | Accent |
|------------|------------|--------------|----------------|--------|
| **Dark Traditional** | #4A0404 | #FFFFFF | #FBBF24 | #D4AF37 |
| **Light Traditional** | #FFF8F0 | #4A0404 | #8B1538 | #D4AF37 |
| **Dark Royal** | #3D0C11 | #FFFFFF | #FBBF24 | #D4AF37 |
| **Light Royal** | #FFFEF9 | #3D0C11 | #722F37 | #D4AF37 |
| **Dark Modern** | #0F1035 | #FFFFFF | #FFC0CB | #A78BFA |
| **Light Modern** | #FAFBFC | #1E293B | #475569 | #EC4899 |

---

## 🛠️ **Tools & Resources**

### **Color Selection:**
- **Coolors.co** - Generate color palettes
- **Adobe Color** - Color wheel and harmony
- **Paletton** - Advanced color scheme designer

### **Contrast Testing:**
- **WebAIM Contrast Checker**
- **Contrast Ratio Calculator**
- **WCAG Contrast Checker**

### **Inspiration:**
- **Dribbble** - Wedding invitation designs
- **Pinterest** - Wedding color palettes
- **Behance** - Professional design work

---

## 📝 **Template for New Theme**

```typescript
import { KankotriTheme } from '@/types/theme'

export const yourTheme: KankotriTheme = {
  // 1. IDENTIFICATION
  id: 'your-theme-id',
  name: 'Your Theme Name',
  description: 'Brief description of the theme',
  category: 'traditional' | 'elegant' | 'modern' | 'festive',
  
  // 2. PRICING
  price: 0,  // 0 for free, or price in rupees
  isPremium: false,
  isFeatured: false,
  
  // 3. PREVIEW
  previewImage: '/previews/your-theme.jpg',
  previewColors: ['#color1', '#color2', '#color3'],
  
  // 4. COLORS
  colors: {
    primary: '#______',      // Main theme color
    secondary: '#______',    // Secondary accent
    accent: '#______',       // Highlight color
    
    text: {
      primary: '#______',    // Main text (dark if light theme, light if dark theme)
      secondary: '#______',  // Accent text
      heading: '#______',    // Headings
      inverse: '#______',    // Opposite (for cards)
    },
    
    background: {
      primary: '#______',    // Main background
      secondary: '#______',  // Alternate background
      card: 'rgba(_, _, _, 0.__)',  // Subtle overlay
      overlay: 'rgba(255, 255, 255, 0.95)',
    },
    
    border: {
      light: 'rgba(_, _, _, 0.25)',
      medium: 'rgba(_, _, _, 0.45)',
      heavy: '#______',
    },
  },
  
  // 5. FONTS (use existing or add new)
  fonts: {
    heading: { english: 'Font Name', gujarati: 'Noto Sans Gujarati' },
    body: { english: 'Inter', gujarati: 'Noto Sans Gujarati' },
    decorative: 'Decorative Font',
    sizes: { /* standard sizes */ },
    weights: { normal: 400, medium: 500, semibold: 600, bold: 700 },
  },
  
  // 6. SPACING (usually standard)
  spacing: { /* copy from existing theme */ },
  
  // 7. BORDERS
  borders: { /* copy from existing theme */ },
  
  // 8. BACKGROUND GRADIENT
  backgrounds: {
    pattern: { type: 'gradient', opacity: 1 },
    gradient: {
      from: '#______',
      via: '#______',   // Optional
      to: '#______',
      direction: 'to-b' | 'to-br' | 'to-r',
    },
    effects: { blur: false, overlay: false, opacity: 1 },
  },
  
  // 9. ANIMATIONS
  animations: { /* copy from similar theme */ },
  
  // 10. SECTION STYLES
  sectionStyles: {
    header: {
      backgroundColor: 'rgba(_, _, _, 0.__)',
      borderColor: '#______',
      padding: '3rem 2rem',
    },
    blessing: {
      backgroundColor: 'rgba(_, _, _, 0.__)',
      borderColor: 'rgba(_, _, _, 0.__)',
      textColor: '#______',
    },
    'event-main': {
      backgroundColor: 'rgba(_, _, _, 0.__)',
      borderColor: '#______',
    },
  },
}
```

---

## ✅ **Checklist Before Publishing Theme**

- [ ] Contrast ratio ≥ 7:1 for all text
- [ ] Tested on both light and dark environments
- [ ] Gradient looks smooth (no harsh transitions)
- [ ] Border opacity is subtle but visible
- [ ] Card overlays are noticeable but not overwhelming
- [ ] Theme matches the described mood/category
- [ ] Both dark and light versions created (if applicable)
- [ ] Added to `/lib/themes/index.ts`
- [ ] Added to demo page theme list
- [ ] Tested all sections (header, blessing, events, etc.)
- [ ] No spelling errors in theme name/description
- [ ] Preview colors accurately represent theme

---

## 🎉 **You're Ready!**

With this guide, you can now create unlimited beautiful, accessible, and elegant wedding invitation themes!

**Key Takeaways:**
1. **Contrast is everything** - test your colors
2. **Stick to 3-4 colors** - don't overcomplicate
3. **Use opacity wisely** - subtle is elegant
4. **Create both dark & light** - give users choice
5. **Test thoroughly** - on different screens and lighting

**Happy theme creating!** 🎨✨
