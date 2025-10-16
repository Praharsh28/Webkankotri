# 🎯 Element Selector Pro - Quick Guide

**Professional element picker using industry-grade library**  
**Status:** Active in development mode  
**Library:** @botanicastudios/element-selector + custom AI features

---

## 🚀 Quick Start

### 1. Start Dev Server
```bash
npm run dev
```

### 2. Activate Selector
Press: **`Ctrl + Shift + E`**

### 3. Select Element
- Hover over any element → **Blue overlay appears**
- Click the element → **Info panel shows**

### 4. Copy & Communicate
- Click **"Copy Element Info"** button
- Paste in chat
- Tell AI what you want to change

---

## ✨ Features

### Beautiful Hover Overlay
- **Blue border** (2px solid)
- **Light blue background** (10% opacity)
- **Smooth transitions**
- **Follows scroll** automatically
- Works with ALL elements (SVG, inputs, buttons, etc.)

### Comprehensive Info Panel
**Shows:**
- HTML Tag (gradient purple/blue)
- CSS Selector (blue box)
- XPath (green box) ⭐ NEW!
- Dimensions (orange with icon)
- CSS Classes (purple pills)
- Text Content
- Computed Styles (with color swatches!)
- HTML Attributes (scrollable list)
- AI Prompt Template (green gradient)

### Professional UI
- Gradient headers
- Color-coded sections
- Scrollable content
- Fixed header/footer
- Smooth animations
- Professional shadows

---

## 📋 Copy Format

When you click "Copy Element Info", you get:

```
🎯 ELEMENT SELECTED FOR AI:

Tag: <div>
CSS Selector: div.ceremony-card.rounded-lg
XPath: //div[@class='ceremony-card rounded-lg']

Classes: ceremony-card, rounded-lg, shadow-lg
Text: "Ceremony content preview..."

Dimensions: 450px × 320px
Position: top 500px, left 100px

Styles:
- Color: rgb(62, 39, 35)
- Background: rgb(255, 255, 255)
- Font: 16px "Playfair Display"
- Display: flex
- Position: relative

Attributes:
- class="ceremony-card rounded-lg..."
- data-ceremony="haldi"
- style="transform: none;"

✨ TELL AI:
"Change the <div> element with selector:
div.ceremony-card.rounded-lg

Make it: [describe your changes here]"
```

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl + Shift + E` | Toggle selector on/off |
| `Escape` | Close selector/panel |
| `Click element` | Select and show info |

**Hint shown in bottom-left corner!**

---

## 🎨 Visual Guide

### Button States

**Inactive:**
```
┌─────────────────────┐
│ 🎯 Select Element   │  Blue button
└─────────────────────┘
```

**Active:**
```
┌─────────────────────┐
│ 🎯 Selecting...     │  Green button (pulsing!)
└─────────────────────┘
```

### Hover Effect
```
┌───────────────────────┐
│  ┏━━━━━━━━━━━━━━┓    │
│  ┃ Element      ┃    │  ← Blue border + light fill
│  ┃ Content      ┃    │     Smooth & professional!
│  ┗━━━━━━━━━━━━━━┛    │
└───────────────────────┘
```

---

## 💡 Example Workflow

### Scenario: Change Ceremony Card

**Step 1:** Press `Ctrl + Shift + E`
- Button turns green
- Banner says "Click ANY element to select it!"

**Step 2:** Hover over ceremony card
- Blue overlay appears
- Follows your mouse smoothly

**Step 3:** Click the card
- Info panel appears on right
- Beautiful gradient sections

**Step 4:** Review info
```
Tag: <div>
Selector: div.ceremony-card:nth-of-type(2)
Dimensions: 450px × 320px
Classes: ceremony-card, rounded-lg, shadow-lg, p-6
Background: rgb(255, 255, 255)
```

**Step 5:** Click "Copy Element Info"
- Button shows "✅ Copied to Clipboard!"

**Step 6:** Paste in chat
```
[Paste the copied info]

And change it to: Add gold gradient background
```

**Step 7:** AI applies instantly! 🎬

---

## 🎯 What Makes It Pro?

### vs Basic Selector

| Feature | Basic | Pro |
|---------|-------|-----|
| Library | Custom | Industry-grade |
| Overlay | Simple | Professional smooth |
| UI | Basic | Beautiful gradients |
| Copy | Sometimes fails | Robust with fallback |
| XPath | ❌ | ✅ |
| Color Swatches | ❌ | ✅ |
| Scrollable Content | ❌ | ✅ |
| Performance | Good | Excellent |

---

## 📱 Global & Safe

- ✅ **Works on ALL pages** (root layout)
- ✅ **All element types** (SVG, input, button, div, etc.)
- ✅ **Dev mode only** (disabled in production)
- ✅ **No performance impact** on builds
- ✅ **Professional library** (tested on 1000+ sites)

---

## 🐛 Troubleshooting

### Selector not appearing?
- Check dev mode: `npm run dev`
- Press `Ctrl + Shift + E`
- Check button in bottom-right

### Overlay not showing?
- Make sure selector is active (green button)
- Try clicking the button to toggle

### Copy not working?
- Try clicking button again
- Fallback method should work
- Manual copy from panel if needed

---

## 🎬 Quick Reference

```bash
# Start
npm run dev

# Activate
Ctrl + Shift + E

# Select
Click any element

# Copy
Click "Copy Element Info" button

# Tell AI
Paste info + describe changes
```

---

## 🚀 Ready!

**The professional element selector is live and ready to use!**

Press `Ctrl + Shift + E` on any page and start selecting elements!

No more confusion about which element to change - just select it visually! 🎯✨
