# 🏗️ WebKankotri Architecture

## 🎯 **Core Concept: Section-Based Templates with Visual Themes**

---

## **The Problem with Fixed Templates**

❌ **Old Approach:**
```
Template 1: Fixed Header + Fixed Event + Fixed Parents (Red theme)
Template 2: Fixed Header + Fixed Event + Fixed Parents (Blue theme)
Template 3: Fixed Header + Fixed Event + Fixed Parents (Green theme)
```

**Issues:**
- Duplicate code for each template
- User locked into one layout
- Hard to maintain
- Limited flexibility

---

## ✅ **Our Solution: Section System + Visual Themes**

### **Architecture:**

```
┌─────────────────────────────────────────────────┐
│         USER CREATES INVITATION                 │
├─────────────────────────────────────────────────┤
│                                                 │
│  Step 1: Choose Visual Theme                    │
│  ┌──────────────────────────────────────────┐  │
│  │ ○ Traditional (Red/Gold, Ornate)         │  │
│  │ ○ Royal (Maroon/Gold, Elegant)           │  │
│  │ ○ Modern (Pastel, Minimal)               │  │
│  └──────────────────────────────────────────┘  │
│                                                 │
│  Step 2: Select Sections (Toggle/Reorder)       │
│  ┌──────────────────────────────────────────┐  │
│  │ ✓ Header (Names)                         │  │
│  │ ✓ Blessing                               │  │
│  │ ✓ Parents                                │  │
│  │ ✓ Event Details                          │  │
│  │ ✓ Custom Text                            │  │
│  │ ☐ Family List                            │  │
│  │ ☐ Gallery                                │  │
│  └──────────────────────────────────────────┘  │
│                                                 │
│  Step 3: Edit Content (Inline Forms)            │
│  ┌──────────────────────────────────────────┐  │
│  │ Edit groom/bride names ✏️                │  │
│  │ Edit dates, venues ✏️                    │  │
│  │ Edit messages ✏️                         │  │
│  └──────────────────────────────────────────┘  │
│                                                 │
│  Step 4: Customize Colors (Optional)            │
│  ┌──────────────────────────────────────────┐  │
│  │ Override theme colors if needed          │  │
│  └──────────────────────────────────────────┘  │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## 📦 **What is a "Template"?**

### **Template = Visual Theme (NOT Layout)**

A template is a **collection of styles** that get applied to sections:

```typescript
interface KankotriTheme {
  id: string                    // 'traditional' | 'royal' | 'modern'
  name: string                  // "Traditional Gujarati"
  description: string           // "Red/gold ornate design"
  
  // Visual Styling
  colors: ColorTheme            // Primary, secondary, accent colors
  fonts: FontTheme              // Font families for different elements
  spacing: SpacingTheme         // Padding, margins
  borders: BorderTheme          // Border styles, decorations
  backgrounds: BackgroundTheme  // Gradients, patterns
  
  // Animation Presets
  animations: AnimationPreset   // Which animations to use
  
  // Section-Specific Overrides
  sectionStyles: {
    header?: SectionStyleOverride
    blessing?: SectionStyleOverride
    // ... other sections
  }
}
```

---

## 🎨 **How Themes Work**

### **Same Sections, Different Visuals:**

**Traditional Theme:**
```tsx
<HeaderSection 
  data={userData}
  theme={{
    colors: { primary: '#DC2626', secondary: '#F59E0B' },
    fonts: { heading: 'Playfair Display', body: 'Inter' },
    decorations: 'ornate-borders',
    animations: ['float-elements', 'sparkle']
  }}
/>
```

**Modern Theme:**
```tsx
<HeaderSection 
  data={userData}  // SAME DATA
  theme={{
    colors: { primary: '#6366F1', secondary: '#A78BFA' },
    fonts: { heading: 'Poppins', body: 'Inter' },
    decorations: 'minimal-lines',
    animations: ['fade-in', 'slide-up']
  }}
/>
```

**Result:** Same content, completely different look!

---

## 🗂️ **File Structure**

```
/types
  /theme.ts              ← Theme type definitions
  /section.ts            ← Section types (existing)

/lib
  /themes/
    /traditional.ts      ← Traditional theme config
    /royal.ts            ← Royal theme config
    /modern.ts           ← Modern theme config
    /index.ts            ← Export all themes

/components
  /sections/             ← Section components (existing)
    HeaderSection.tsx    ← Now accepts theme prop
    EventSection.tsx     ← Now accepts theme prop
    ...
  
  /templates/
    SectionBasedTemplate.tsx  ← Main renderer (accepts theme)
  
  /theme/
    ThemeSelector.tsx    ← Choose visual theme
    ThemePreview.tsx     ← Preview theme before choosing

/app
  /create/
    page.tsx             ← Theme selection + Section editing
```

---

## 🔄 **Data Flow**

### **1. User Journey:**

```
1. User visits /create
2. Chooses theme: "Traditional"
3. Theme loads with default sections
4. User toggles sections on/off
5. User reorders sections
6. User edits section content
7. User optionally overrides colors
8. User saves to database
```

### **2. Database Storage:**

```typescript
// invitations table
{
  id: "uuid",
  user_id: "uuid",
  theme_id: "traditional",        // Which visual theme
  sections: [                     // Which sections, in order
    { type: 'header', enabled: true, data: {...} },
    { type: 'blessing', enabled: true, data: {...} },
    { type: 'parents', enabled: true, data: {...} },
    { type: 'event-main', enabled: true, data: {...} },
  ],
  color_overrides: {              // Optional custom colors
    primary: "#FF0000"
  },
  created_at: "2025-01-01",
  status: "draft"
}
```

### **3. Rendering:**

```typescript
// Load invitation
const invitation = await getInvitation(id)
const theme = THEMES[invitation.theme_id]

// Render
<SectionBasedTemplate
  theme={theme}
  sections={invitation.sections}
  colorOverrides={invitation.color_overrides}
/>
```

---

## 🎨 **Three Visual Themes**

### **Theme 1: Traditional Gujarati** 🪔
**ID:** `traditional`
**Colors:** Red (#DC2626), Orange (#F59E0B), Gold (#FCD34D)
**Style:** Ornate borders, traditional patterns, rich gradients
**Animations:** FloatingElements (🪔✨💐), Sparkle, Pulse
**Fonts:** Playfair Display (headings), Noto Sans Gujarati
**Decorations:** Corner mandalas, paisley patterns

### **Theme 2: Royal Maroon** 👑
**ID:** `royal`
**Colors:** Maroon (#881337), Gold (#CA8A04), Cream (#FEF3C7)
**Style:** Elegant borders, sophisticated, formal
**Animations:** ShineEffect, FadeIn, DecorativeCorner
**Fonts:** Cormorant Garamond (headings), Inter
**Decorations:** Gold leaf borders, classic motifs

### **Theme 3: Modern Pastel** 🌸
**ID:** `modern`
**Colors:** Blush (#FCA5A5), Mint (#6EE7B7), Lavender (#DDD6FE)
**Style:** Clean lines, minimal, contemporary
**Animations:** SlideIn, FadeIn, subtle Pulse
**Fonts:** Poppins (headings), Inter
**Decorations:** Thin borders, simple geometric shapes

---

## 🏗️ **Implementation Plan**

### **Phase 1: Theme System (TODAY) - 6 hours**
✅ Create theme type definitions
✅ Build 3 theme configurations
✅ Update sections to accept theme props
✅ Create theme selector UI
✅ Test all 3 themes with existing sections

### **Phase 2: Database (NEXT) - 6-8 hours**
⏳ Supabase setup
⏳ Store: theme_id + sections + overrides
⏳ User authentication
⏳ Save/Load functionality

### **Phase 3: PDF + Payment (AFTER) - 7-10 hours**
⏳ PDF generation (respects theme)
⏳ Razorpay integration
⏳ Download flow

---

## ✅ **Benefits of This Approach**

### **For Users:**
✅ Choose beautiful pre-designed themes
✅ Full control over content (sections)
✅ Flexibility to customize colors
✅ Easy to preview different looks
✅ No design skills needed

### **For Development:**
✅ No code duplication
✅ Easy to add new themes
✅ Easy to add new sections
✅ Maintainable codebase
✅ Themes + Sections = Infinite combinations

### **Business:**
✅ Different pricing for themes (premium themes)
✅ Easy to create seasonal themes
✅ Users can switch themes anytime
✅ Upsell opportunities

---

## 📊 **Example: Same Data, 3 Different Looks**

### **Data (Same for all):**
```typescript
const invitation = {
  groomName: "Raj Patel",
  brideName: "Priya Shah",
  weddingDate: "2025-02-14",
  venue: "Grand Heritage Hall",
  sections: ['header', 'blessing', 'event']
}
```

### **Traditional Theme:**
```
🪔 ══════════════════════════════════ 🪔
       राज पटेल & प्रिया शाह
          ♥ February 14, 2025 ♥
        Grand Heritage Hall
🪔 ══════════════════════════════════ 🪔
[Red/Gold ornate design with sparkles]
```

### **Royal Theme:**
```
╔═══════════════════════════════════╗
║      Raj Patel & Priya Shah       ║
║                                   ║
║      February 14, 2025            ║
║      Grand Heritage Hall          ║
╚═══════════════════════════════════╝
[Maroon/Gold elegant formal design]
```

### **Modern Theme:**
```
┌───────────────────────────────────┐
│   Raj Patel                       │
│        &                          │
│   Priya Shah                      │
│                                   │
│   February 14, 2025               │
│   Grand Heritage Hall             │
└───────────────────────────────────┘
[Pastel minimal clean design]
```

---

## 🚀 **Next Steps**

1. ✅ Create theme type system
2. ✅ Build 3 theme configs
3. ✅ Update section components
4. ✅ Build theme selector
5. ⏳ Database integration
6. ⏳ PDF generation
7. ⏳ Payment

**This is the RIGHT architecture!** 🎯
