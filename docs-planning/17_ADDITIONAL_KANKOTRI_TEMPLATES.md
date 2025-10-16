# 🎊 ADDITIONAL KANKOTRI TEMPLATES

**2 New Wedding Invitation Templates**

---

## Template 2: Royal Gujarati Wedding

### Overview
- **ID:** `royal-gujarati-wedding`
- **Category:** Kankotri
- **Price:** ₹299
- **Description:** Elegant traditional Gujarati wedding invitation with complete family details
- **Features:** Custom photos, parent names, bilingual text (Gujarati + English)

### Template Configuration

```typescript
// lib/constants/template-configs.ts

export const royalGujaratiWeddingConfig: TemplateConfig = {
  id: 'royal-gujarati-wedding',
  name: 'Royal Gujarati Wedding',
  description: 'Elegant traditional Gujarati wedding invitation with family details',
  category: 'kankotri',
  price: 299,
  featured: true,
  fields: {
    groomName: { type: 'text', label: 'Groom Name', required: true },
    groomFatherName: { type: 'text', label: "Groom's Father Name", required: true },
    groomMotherName: { type: 'text', label: "Groom's Mother Name", required: true },
    brideName: { type: 'text', label: 'Bride Name', required: true },
    brideFatherName: { type: 'text', label: "Bride's Father Name", required: true },
    brideMotherName: { type: 'text', label: "Bride's Mother Name", required: true },
    weddingDate: { type: 'date', label: 'Wedding Date', required: true },
    weddingTime: { type: 'text', label: 'Wedding Time', required: true },
    venue: { type: 'text', label: 'Venue Name', required: true },
    address: { type: 'textarea', label: 'Address', required: true },
    city: { type: 'text', label: 'City', required: true },
    primaryColor: { type: 'color', label: 'Primary Color', default: '#991B1B' },
    secondaryColor: { type: 'color', label: 'Secondary Color', default: '#B45309' },
    customPhoto: { type: 'image', label: 'Couple Photo (Optional)', required: false },
    customMessage: { type: 'textarea', label: 'Custom Message', required: false },
  },
}
```

### Component Code

**File:** `components/templates/royal-gujarati-wedding.tsx`

Use animation components from `16_ANIMATION_COMPONENTS.md`

---

## Template 3: Minimalist Modern Wedding

### Overview
- **ID:** `minimalist-modern-wedding`
- **Category:** Kankotri
- **Price:** ₹249
- **Description:** Clean, modern wedding invitation with photo-first design
- **Features:** Large hero photo, minimalist typography, RSVP link

### Template Configuration

```typescript
// lib/constants/template-configs.ts

export const minimalistModernWeddingConfig: TemplateConfig = {
  id: 'minimalist-modern-wedding',
  name: 'Minimalist Modern Wedding',
  description: 'Clean, modern wedding invitation perfect for contemporary couples',
  category: 'kankotri',
  price: 249,
  featured: false,
  fields: {
    groomName: { type: 'text', label: 'Groom Name', required: true },
    brideName: { type: 'text', label: 'Bride Name', required: true },
    weddingDate: { type: 'date', label: 'Wedding Date', required: true },
    venue: { type: 'text', label: 'Venue Name', required: true },
    city: { type: 'text', label: 'City', required: true },
    primaryColor: { type: 'color', label: 'Primary Color', default: '#1F2937' },
    customPhoto: { type: 'image', label: 'Couple Photo (Required)', required: true },
    rsvpLink: { type: 'text', label: 'RSVP Link (Optional)', required: false },
  },
}
```

---

**Implementation:** Follow same pattern as Garba Night template from `04_TEMPLATE_SPECIFICATIONS.md`
