# 🎯 Element Selector - Visual Communication Tool

**Purpose:** Visually select any element on the page to tell AI what to change  
**Status:** Active in development mode  
**Availability:** `npm run dev` only (not in production builds)

---

## 🚀 How To Use

### Step 1: Start Dev Server
```bash
npm run dev
```

### Step 2: Activate Element Selector

**Method 1 - Keyboard Shortcut:**
- Press `Ctrl + Shift + E`

**Method 2 - Button:**
- Click the blue "Select Element" button (bottom-right corner)

### Step 3: Select Any Element
- Hover over any element → Blue outline appears
- Click the element → Info panel shows on the right

### Step 4: Copy Element Info
- Click "Copy Element Info" button in the panel
- Paste in chat to tell me what to change!

---

## 📋 What Information You Get

When you select an element, the tool shows:

### 1. **Tag Name**
```html
<div>
```

### 2. **CSS Selector**
```css
div.ceremony-card
```

### 3. **Full Path**
```css
div.container > div.grid > div.ceremony-card:nth-child(2)
```

### 4. **Classes**
```
ceremony-card, rounded-lg, shadow-md, p-6
```

### 5. **Text Content**
```
"First ceremony text preview..."
```

### 6. **AI Prompt Suggestion**
```
Tell AI: "Change the div element at: 
div.container > div.grid > div.ceremony-card:nth-child(2)"
```

---

## 💬 How To Communicate Changes To Me

### Example 1: Change Text Color
1. Select the element with Element Selector
2. Copy info
3. Tell me:
```
Change the h2 element at: div.ceremony-card > h2
Make the text color gold instead of red
```

### Example 2: Add Animation
1. Select element
2. Tell me:
```
The element at: div.venue-card
Add a Card3DFlip animation to this
```

### Example 3: Change Layout
1. Select element
2. Tell me:
```
The div.grid element at: main > div.grid
Change from 2 columns to 3 columns on desktop
```

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl + Shift + E` | Toggle element selector on/off |
| `Escape` | Deactivate selector |
| Click element | Select and show info |

---

## 🎨 Visual Indicators

### When Active:
- **Blue outline** on hovered elements
- **Crosshair cursor** when hovering
- **Instructions banner** at top
- **Info panel** when element selected

### When Inactive:
- Only the toggle button shows (bottom-right)

---

## 🔧 Technical Details

### What Gets Captured:
```typescript
{
  element: HTMLElement,           // The actual DOM element
  selector: string,               // CSS selector (e.g., "div.card")
  classes: string[],              // All CSS classes
  text: string,                   // First 100 chars of text
  tag: string,                    // HTML tag name
  path: string                    // Full DOM path
}
```

### Copy Format:
```
Element Info:
Tag: <div>
Selector: div.ceremony-card
Full Path: div.container > div.grid > div.ceremony-card:nth-child(2)
Classes: ceremony-card, rounded-lg, shadow-md, p-6
Text: Haldi Ceremony - તા. 15/12/2024...

Tell AI: "Change the div element at: div.container > div.grid > div.ceremony-card:nth-child(2)"
```

---

## 🎯 Common Use Cases

### 1. **Identify Element for Changes**
- Select element
- Copy path
- Tell me what to change

### 2. **Debug Layout Issues**
- Select misaligned element
- Show me the path
- I'll fix the CSS

### 3. **Add Cinematic Effects**
- Select target element
- Tell me: "Add Card3DFlip here"
- I'll wrap it in the effect

### 4. **Change Text/Content**
- Select text element
- Tell me new content
- I'll update it

### 5. **Style Modifications**
- Select element
- Describe desired style
- I'll apply changes

---

## 🚫 What NOT To Do

❌ **Don't select:**
- The selector UI itself (it's excluded)
- Elements in the info panel
- The toggle button

✅ **Do select:**
- Any page content
- Template elements
- Text, images, cards, buttons
- Layout containers

---

## 🎬 Example Workflow

### Scenario: Change Ceremony Card Color

**Step 1:** Activate selector (`Ctrl + Shift + E`)

**Step 2:** Click on ceremony card

**Step 3:** Copy shows:
```
Element Info:
Tag: <div>
Full Path: div.ceremonies-grid > div.ceremony-card:nth-child(1)
```

**Step 4:** Tell me:
```
Change the div at:
div.ceremonies-grid > div.ceremony-card:nth-child(1)

Make background gradient from cream to gold
```

**Step 5:** I apply the change immediately!

---

## 💡 Pro Tips

### Tip 1: Be Specific
Instead of: "Change the card"  
Say: "Change the div.ceremony-card:nth-child(2)"

### Tip 2: Use Full Path
The full path is most accurate:
```
div.container > section.ceremonies > div.grid > div.card:nth-child(3)
```

### Tip 3: Describe Clearly
Good: "Make text gold and add shimmer effect"  
Better: "Apply ShimmerText with gold gradient to this h2"

### Tip 4: Multiple Changes
Select each element separately if changing multiple things

### Tip 5: Copy Before Deselecting
Always copy the info before clicking away!

---

## 🐛 Troubleshooting

### Selector Not Showing?
- Check you're in dev mode (`npm run dev`)
- Press `Ctrl + Shift + E`
- Refresh the page

### Can't Select Element?
- Make sure selector is active (blue outline on hover)
- Element might be behind another element
- Try selecting parent container instead

### Info Panel Blocking View?
- It's positioned top-right
- Drag it by selecting and repositioning (future feature)
- Or deselect and reselect from different angle

---

## 🎯 Communication Examples

### Example 1: Add Shimmer
```
Element: h2.bride-name
Path: div.cover > div.names > h2:nth-child(2)

Request: Wrap this in ShimmerText with gold colors
```

### Example 2: Change Color
```
Element: div.venue-card
Path: section.venue > div.venue-card

Request: Change background from white to cream (#f5f5dc)
```

### Example 3: Add 3D Effect
```
Element: div.ceremony-card
Path: div.ceremonies-grid > div:nth-child(1)

Request: Wrap in Card3DFlip for 3D hover effect
```

---

## 📊 Benefits

✅ **Visual Communication** - Show exactly what you want  
✅ **Precise Selection** - No ambiguity  
✅ **Copy/Paste** - Easy to share  
✅ **Fast Iteration** - Quick back-and-forth  
✅ **Learn Structure** - See how page is built  

---

## 🚀 Quick Reference

```bash
# Activate
Ctrl + Shift + E

# Select
Click any element

# Copy
Click "Copy Element Info" button

# Deactivate
Press Escape or Ctrl + Shift + E again

# Tell AI
Paste copied info in chat
Describe what you want changed
```

---

## 🎉 You're Ready!

Start dev server and press `Ctrl + Shift + E` to begin selecting elements!

The selector makes it super easy to show me exactly what you want to change - no more "the third card on the second page" confusion! 🎯✨
