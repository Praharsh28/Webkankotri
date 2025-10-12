# 🎁 CARD TEMPLATES (5 Templates)

**General celebration cards for various occasions**

---

## Template 4: Birthday Celebration

### Configuration

```typescript
export const birthdayCelebrationConfig: TemplateConfig = {
  id: 'birthday-celebration',
  name: 'Birthday Celebration',
  description: 'Fun and colorful birthday party invitation',
  category: 'cards',
  price: 149,
  featured: true,
  fields: {
    name: { type: 'text', label: 'Birthday Person Name', required: true },
    age: { type: 'number', label: 'Age (Optional)', required: false },
    date: { type: 'date', label: 'Party Date', required: true },
    time: { type: 'text', label: 'Party Time', required: true },
    venue: { type: 'text', label: 'Venue', required: true },
    message: { type: 'textarea', label: 'Custom Message', required: false },
    primaryColor: { type: 'color', label: 'Theme Color', default: '#EC4899' },
    customPhoto: { type: 'image', label: 'Photo (Optional)', required: false },
  },
}
```

**Animations:** FloatingElements (🎂🎈🎁🎉), Sparkle, Pulse, ConfettiBurst

---

## Template 5: Anniversary Wishes

### Configuration

```typescript
export const anniversaryWishesConfig: TemplateConfig = {
  id: 'anniversary-wishes',
  name: 'Anniversary Celebration',
  description: 'Romantic anniversary celebration invitation',
  category: 'cards',
  price: 149,
  featured: true,
  fields: {
    coupleName: { type: 'text', label: 'Couple Name', required: true },
    yearsMarried: { type: 'number', label: 'Years Together', required: true },
    anniversaryDate: { type: 'date', label: 'Anniversary Date', required: true },
    venue: { type: 'text', label: 'Venue (Optional)', required: false },
    time: { type: 'text', label: 'Time (Optional)', required: false },
    message: { type: 'textarea', label: 'Custom Message', required: false },
    primaryColor: { type: 'color', label: 'Theme Color', default: '#BE123C' },
    customPhoto: { type: 'image', label: 'Couple Photo', required: false },
  },
}
```

**Animations:** FloatingElements (💖💕💗), Pulse, ShineEffect, DecorativeCorner

---

## Template 6: Baby Shower Invitation

### Configuration

```typescript
export const babyShowerConfig: TemplateConfig = {
  id: 'baby-shower',
  name: 'Baby Shower',
  description: 'Sweet baby shower invitation card',
  category: 'cards',
  price: 149,
  featured: false,
  fields: {
    parentName: { type: 'text', label: 'Parent Name(s)', required: true },
    babyName: { type: 'text', label: 'Baby Name (Optional)', required: false },
    gender: { 
      type: 'select', 
      label: 'Gender Theme', 
      required: true,
      validation: { options: ['Boy', 'Girl', 'Surprise'] }
    },
    date: { type: 'date', label: 'Shower Date', required: true },
    time: { type: 'text', label: 'Time', required: true },
    venue: { type: 'text', label: 'Venue', required: true },
    message: { type: 'textarea', label: 'Custom Message', required: false },
    customPhoto: { type: 'image', label: 'Photo (Optional)', required: false },
  },
}
```

**Colors:** Boy (#3B82F6), Girl (#EC4899), Surprise (#A855F7)
**Animations:** FloatingElements (👶🍼🎀), FadeIn, Sparkle

---

## Template 7: Diwali Festival Card

### Configuration

```typescript
export const diwaliFestivalConfig: TemplateConfig = {
  id: 'diwali-festival',
  name: 'Diwali Celebration',
  description: 'Traditional Diwali greeting and invitation',
  category: 'cards',
  price: 99,
  featured: true,
  fields: {
    familyName: { type: 'text', label: 'Your Family Name', required: true },
    greeting: { 
      type: 'select',
      label: 'Greeting',
      required: true,
      validation: { 
        options: [
          'Happy Diwali',
          'Shubh Deepavali',
          'दीपावली की शुभकामनाएं'
        ]
      }
    },
    year: { type: 'number', label: 'Year', required: true, default: new Date().getFullYear() },
    message: { type: 'textarea', label: 'Personal Message', required: false },
    primaryColor: { type: 'color', label: 'Theme Color', default: '#F59E0B' },
    customPhoto: { type: 'image', label: 'Family Photo', required: false },
  },
}
```

**Animations:** FloatingElements (🪔✨💐), AnimatedGradient, Sparkle, DecorativeCorner

---

## Template 8: Engagement Announcement

### Configuration

```typescript
export const engagementAnnouncementConfig: TemplateConfig = {
  id: 'engagement-announcement',
  name: 'Engagement Announcement',
  description: 'Elegant engagement celebration invitation',
  category: 'cards',
  price: 199,
  featured: true,
  fields: {
    groomName: { type: 'text', label: 'Groom Name', required: true },
    brideName: { type: 'text', label: 'Bride Name', required: true },
    engagementDate: { type: 'date', label: 'Engagement Date', required: true },
    time: { type: 'text', label: 'Time', required: true },
    venue: { type: 'text', label: 'Venue', required: true },
    address: { type: 'textarea', label: 'Address', required: true },
    message: { type: 'textarea', label: 'Custom Message', required: false },
    primaryColor: { type: 'color', label: 'Theme Color', default: '#8B5CF6' },
    customPhoto: { type: 'image', label: 'Couple Photo', required: false },
  },
}
```

**Animations:** FloatingElements (💍💖✨), ShineEffect, FadeIn, Pulse

---

## All Template Exports

```typescript
// lib/constants/template-configs.ts

export const allTemplates: TemplateConfig[] = [
  // Kankotri (3)
  garbaNightConfig,
  royalGujaratiWeddingConfig,
  minimalistModernWeddingConfig,
  
  // Cards (5)
  birthdayCelebrationConfig,
  anniversaryWishesConfig,
  babyShowerConfig,
  diwaliFestivalConfig,
  engagementAnnouncementConfig,
]

export const kankotriTemplates = allTemplates.filter(t => t.category === 'kankotri')
export const cardTemplates = allTemplates.filter(t => t.category === 'cards')
```

---

**Implementation Note:** Use animation components from `16_ANIMATION_COMPONENTS.md` for all templates
