# 🎨 Craft.js Implementation Plan

**Goal:** Add visual drag-and-drop editor to ALL templates  
**Timeline:** 1 day (6-8 hours)  
**Status:** Ready to implement

---

## ✅ COMPATIBILITY CHECK

### Your Current Setup:
- ✅ Next.js 15 (Perfect!)
- ✅ React 19 (Compatible!)
- ✅ TypeScript (Supported!)
- ✅ Tailwind CSS (Works great!)
- ✅ Component-based architecture (IDEAL!)
- ✅ GSAP animations (Will keep working!)

**Craft.js Compatibility: 💯 PERFECT!**

---

## 🏗️ ARCHITECTURE PLAN

### Where It Fits:
```
Your App Structure:
├── app/
│   ├── (protected)/
│   │   └── editor/              ← NEW! Visual editor route
│   │       └── [templateId]/    ← Edit any template
│   │           └── page.tsx
│   ├── template-demo/           ← Existing (keep as-is)
│   └── layout.tsx
├── components/
│   ├── templates-v2/            ← Existing templates
│   │   └── themes/
│   │       ├── KankotriTemplate/
│   │       └── RoyalTemplate/
│   ├── editor/                  ← NEW! Editor components
│   │   ├── EditorLayout.tsx
│   │   ├── Toolbox.tsx
│   │   ├── SettingsPanel.tsx
│   │   └── Viewport.tsx
│   └── craft-wrappers/          ← NEW! Wrapped components
│       ├── CraftKankotri/
│       └── CraftRoyal/
```

---

## 📋 IMPLEMENTATION STEPS

### Phase 1: Setup (30 min)

**1.1 Install Craft.js**
```bash
npm install @craftjs/core @craftjs/layers
npm install react-contenteditable  # For inline editing
```

**1.2 Create Editor Route**
```
app/(protected)/editor/[templateId]/page.tsx
```

### Phase 2: Wrap Existing Components (2 hours)

**2.1 Create Craft Wrappers**
Make your existing components "editable" without changing original files!

**Example:**
```typescript
// components/craft-wrappers/CraftKankotri/CraftKankotriCover.tsx
import { useNode } from '@craftjs/core';
import { KankotriCover } from '@/components/templates-v2/themes/KankotriTemplate';

export function CraftKankotriCover({ data }) {
  const { connectors: { connect, drag } } = useNode();
  
  return (
    <div ref={ref => connect(drag(ref))}>
      <KankotriCover data={data} />
    </div>
  );
}

// Settings for this component
CraftKankotriCover.craft = {
  displayName: 'Cover Section',
  props: {
    data: {
      brideName: 'Nisha',
      groomName: 'Deep',
      // ... defaults
    }
  },
  related: {
    settings: CraftKankotriCoverSettings
  }
};
```

**2.2 Wrap ALL Template Components**
- KankotriCover → CraftKankotriCover
- KankotriCeremonies → CraftKankotriCeremonies
- KankotriVenue → CraftKankotriVenue
- RoyalTemplate components → Craft versions

### Phase 3: Create Editor UI (2 hours)

**3.1 Editor Layout**
```typescript
// components/editor/EditorLayout.tsx
export function EditorLayout() {
  return (
    <Editor resolver={allCraftComponents}>
      <div className="flex h-screen">
        {/* Left Sidebar - Toolbox */}
        <Toolbox />
        
        {/* Center - Canvas */}
        <Viewport />
        
        {/* Right Sidebar - Settings */}
        <SettingsPanel />
      </div>
    </Editor>
  );
}
```

**3.2 Toolbox (Drag to Add)**
```typescript
// components/editor/Toolbox.tsx
- List of all components
- Drag to canvas to add
- Categories: Cover, Ceremonies, Venue, Custom
```

**3.3 Settings Panel**
```typescript
// components/editor/SettingsPanel.tsx
- Edit selected component
- Change text, images, colors
- Upload files
- Style controls
```

### Phase 4: Add Basic Elements (1 hour)

**4.1 Text Block**
```typescript
// components/craft-wrappers/basic/CraftText.tsx
- Editable text
- Font size, color, alignment
- Drag & drop
```

**4.2 Image Block**
```typescript
// components/craft-wrappers/basic/CraftImage.tsx
- Upload image
- Resize, crop
- Alt text
```

**4.3 Video Block**
```typescript
// components/craft-wrappers/basic/CraftVideo.tsx
- YouTube/Vimeo URL
- Upload video file
- Controls
```

### Phase 5: Save/Load System (1-2 hours)

**5.1 Save Template**
```typescript
// Save to Supabase
const saveTemplate = async (templateData) => {
  await supabase
    .from('templates')
    .upsert({
      id: templateId,
      data: serialize(templateData),
      updated_at: new Date()
    });
};
```

**5.2 Load Template**
```typescript
// Load from Supabase
const loadTemplate = async (templateId) => {
  const { data } = await supabase
    .from('templates')
    .select('*')
    .eq('id', templateId)
    .single();
    
  return deserialize(data.data);
};
```

### Phase 6: Testing & Polish (1-2 hours)

**6.1 Test All Features**
- Drag components
- Add text/image/video
- Edit inline
- Save/load
- Export

**6.2 Add Keyboard Shortcuts**
- Ctrl+S: Save
- Ctrl+Z: Undo
- Ctrl+Y: Redo
- Delete: Remove component

---

## 📁 NEW FILE STRUCTURE

```
webkankotri/
├── app/
│   └── (protected)/
│       └── editor/
│           ├── layout.tsx                    ← NEW
│           └── [templateId]/
│               └── page.tsx                  ← NEW (main editor)
├── components/
│   ├── editor/                               ← NEW
│   │   ├── EditorLayout.tsx                 ← Editor wrapper
│   │   ├── Toolbox.tsx                      ← Component library
│   │   ├── SettingsPanel.tsx                ← Edit properties
│   │   ├── Viewport.tsx                     ← Canvas/preview
│   │   ├── TopBar.tsx                       ← Save, Preview, etc.
│   │   └── LayersPanel.tsx                  ← Component tree
│   ├── craft-wrappers/                       ← NEW
│   │   ├── CraftKankotri/
│   │   │   ├── CraftKankotriCover.tsx
│   │   │   ├── CraftKankotriCeremonies.tsx
│   │   │   ├── CraftKankotriVenue.tsx
│   │   │   └── settings/                    ← Settings components
│   │   │       ├── CoverSettings.tsx
│   │   │       └── ...
│   │   ├── CraftRoyal/
│   │   │   └── ...
│   │   └── basic/                           ← Basic elements
│   │       ├── CraftText.tsx
│   │       ├── CraftImage.tsx
│   │       ├── CraftVideo.tsx
│   │       └── CraftContainer.tsx
│   └── templates-v2/                         ← Existing (unchanged!)
│       └── themes/
├── lib/
│   └── craft/                                ← NEW
│       ├── resolver.ts                      ← Component registry
│       ├── serialize.ts                     ← Save/load helpers
│       └── defaults.ts                      ← Default props
└── types/
    └── craft.ts                              ← NEW (TypeScript types)
```

---

## 🎯 HOW YOU'LL USE IT

### Step 1: Access Editor
```
Visit: /editor/new-kankotri
or
Visit: /editor/existing-template-id
```

### Step 2: Visual Interface
```
┌──────────────────────────────────────────────────────┐
│ [Save] [Preview] [Undo] [Redo] [Export]             │
├──────┬─────────────────────────────────┬─────────────┤
│      │                                 │             │
│ 📦   │   📱 Cover Section       [⋮][×]│  Settings   │
│ Tool │   ├─ Bride: Nisha              │  ┌────────┐ │
│ box  │   ├─ Groom: Deep               │  │Bride   │ │
│      │   └─ Image: [📤]               │  │[Nisha] │ │
│ Cover│                                 │  │        │ │
│ Cere │   💐 Ceremonies          [⋮][×]│  │Groom   │ │
│ Venue│   ├─ Haldi                     │  │[Deep]  │ │
│ ───  │   └─ Mehendi                   │  │        │ │
│ Text │                                 │  │[Upload]│ │
│ Image│   📍 Venue               [⋮][×]│  └────────┘ │
│ Video│   └─ Address                   │             │
│      │                                 │             │
│      │   [+ Add Section]               │             │
└──────┴─────────────────────────────────┴─────────────┘
```

### Step 3: Edit Operations

**Move Component:**
1. Grab [⋮] icon
2. Drag up/down
3. Drop → Reordered!

**Add New Element:**
1. Drag "Text" from toolbox
2. Drop on canvas
3. Type content
4. Style in settings panel

**Edit Existing:**
1. Click component
2. Settings show on right
3. Change values
4. See live update

**Save:**
1. Click [Save]
2. Template saved to database
3. Can load anytime

---

## 🔥 KEEPING YOUR ANIMATIONS

**IMPORTANT:** Your cinematic effects STAY WORKING!

**How:**
```typescript
// Original component (unchanged)
export function KankotriCover({ data }) {
  return (
    <ShimmerText>      ← Cinematic effect works!
      <h1>{data.brideName}</h1>
    </ShimmerText>
  );
}

// Craft wrapper (just adds drag capability)
export function CraftKankotriCover({ data }) {
  const { connectors: { connect, drag } } = useNode();
  return (
    <div ref={ref => connect(drag(ref))}>
      <KankotriCover data={data} />  ← Original component!
    </div>
  );
}
```

**Result:**
- ✅ ShimmerText works
- ✅ Card3DFlip works
- ✅ All GSAP animations work
- ✅ Physics effects work
- ✅ Everything preserved!

---

## 💾 DATABASE CHANGES NEEDED

**New Table: `templates`**
```sql
CREATE TABLE templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  type TEXT NOT NULL, -- 'kankotri', 'royal', etc.
  data JSONB NOT NULL, -- Serialized Craft.js state
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**New Table: `template_versions`** (optional)
```sql
CREATE TABLE template_versions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  template_id UUID REFERENCES templates(id),
  data JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## ⏱️ IMPLEMENTATION TIMELINE

### Day 1: Full Implementation (6-8 hours)

**Morning Session (3-4 hours):**
- ✅ Install Craft.js
- ✅ Create editor route
- ✅ Wrap Kankotri components
- ✅ Create basic editor layout

**Afternoon Session (3-4 hours):**
- ✅ Add toolbox & settings
- ✅ Create basic elements (text, image, video)
- ✅ Implement save/load
- ✅ Test everything

**End of Day:**
- ✅ Working editor
- ✅ Can edit Kankotri template
- ✅ Can add/move/delete components
- ✅ Can save/load templates

---

## 🧪 TESTING CHECKLIST

After implementation, test:

**Basic Operations:**
- [ ] Drag component to reorder
- [ ] Add new text block
- [ ] Add new image
- [ ] Add new video
- [ ] Delete component
- [ ] Undo/redo

**Template Editing:**
- [ ] Edit bride name (see ShimmerText effect)
- [ ] Upload cover photo
- [ ] Change ceremony details
- [ ] Move venue section
- [ ] Add custom message

**Save/Load:**
- [ ] Save template
- [ ] Load template
- [ ] Changes persist
- [ ] Can create multiple templates

**Animations:**
- [ ] ShimmerText still works
- [ ] Card3DFlip still works
- [ ] Floating petals still work
- [ ] All effects preserved

---

## 🎯 BENEFITS

**For You (Developer):**
- ✅ Visual editing (no code needed!)
- ✅ Fast template creation
- ✅ Easy customization
- ✅ Version control

**For Future:**
- ✅ Can give access to non-developers
- ✅ Users can customize their templates
- ✅ Scalable to many templates
- ✅ Professional editing experience

---

## 🚀 READY TO START?

**I'll implement in this order:**

**Hour 1-2:** Setup + wrap Kankotri components  
**Hour 3-4:** Create editor UI  
**Hour 5-6:** Add basic elements + save/load  
**Hour 7-8:** Testing + polish  

**Result:** Full visual editor for ALL your templates!

**Want me to start now?** 🎨✨
