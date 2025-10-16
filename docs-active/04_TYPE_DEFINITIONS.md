# 🔧 TYPE DEFINITIONS - Complete Type Reference

**AI Instruction:** Use these exact type definitions. Copy interface declarations from here.

---

## MAIN DATA TYPE

### KankotriData (Complete Wedding Invitation)

```typescript
// SOURCE: types/v2/kankotri.ts
// PURPOSE: Complete data structure for Kankotri template

interface KankotriData {
  // Identifiers
  id: string;                    // Unique ID
  userId: string;                // Creator user ID
  slug: string;                  // URL-friendly slug
  title: string;                 // Admin title (not shown on invite)
  status: 'draft' | 'published';

  // Couple Information
  groom: {
    name: string;                // Short name: "Deep"
    fullName: string;            // Full Gujarati: "શ્રી દીપ કિશોરભાઈ મેસરા"
    fatherName: string;          // પિતાનું નામ
    motherName?: string;         // માતાનું નામ (optional)
    grandfatherName?: string;    // દાદાનું નામ (optional)
    photo?: string;              // Profile photo URL (optional)
  };

  bride: {
    name: string;                // Short name: "Nisha"
    fullName: string;            // Full Gujarati: "શ્રી નિશા મહુલભાઈ મેહતા"
    fatherName: string;
    motherName?: string;
    grandfatherName?: string;
    photo?: string;
  };

  // Host Families (નિમંત્રક)
  hosts: {
    groomSide: FamilyHost[];     // Groom's family hosts
    brideSide: FamilyHost[];     // Bride's family hosts
  };

  // Religious Invocation
  invocation: {
    deity: 'ganesh' | 'om' | 'swastika' | 'both';
    text: string;                // "શ્રી ગણેશાય નમઃ" or custom
    showSymbol: boolean;         // Show symbol SVG
  };

  // Pre-Wedding Ceremonies
  ceremonies: KankotriCeremony[];

  // Main Wedding Details
  wedding: {
    date: Date;                  // MUST be Date object (not string)
    time: string;                // Gujarati time: "૫:૦૦ કલાકે સાંજે"
    venue: {
      name: string;
      address: string;
      city: string;
      state?: string;
      pincode?: string;
      mapUrl?: string;           // Google Maps embed URL
      phone?: string;
    };
  };

  // Family Members Lists
  families: {
    groomFamily: FamilyMember[];
    brideFamily: FamilyMember[];
  };

  // Blessing Givers (Elders)
  blessings: {
    groomElders: Elder[];
    brideElders: Elder[];
  };

  // Invitation Text (Multi-language)
  invitationText: {
    gujarati?: string;           // Primary invitation text
    hindi?: string;
    english?: string;
  };

  // Optional Elements
  couplePhoto?: string;          // Cover page couple photo
  processionDetails?: string;    // વાહોરચ્છા (optional)

  // Page Configuration (which pages to show)
  pages: {
    cover: boolean;
    invocation: boolean;
    invitation: boolean;
    ceremonies: boolean;
    families: boolean;
    blessings: boolean;
    venue: boolean;
  };

  // Template Customization
  customization: KankotriConfig;

  // Metadata
  viewCount: number;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
}
```

---

## SUPPORTING TYPES

### FamilyHost

```typescript
// PURPOSE: Host family member who is inviting
interface FamilyHost {
  name: string;                  // "શ્રી કિશોરભાઈ પોપટભાઈ મેસરા"
  relation?: string;             // "પિતા", "માતા", etc. (optional)
  address?: string;              // Full address (optional)
}

// EXAMPLE USAGE:
const hosts = {
  groomSide: [
    {
      name: 'કિશોરભાઈ પોપટભાઈ મેસરા',
      relation: 'પિતા',
      address: 'A-701, સ્વર્ગિક ટાવર, સરખેજ, અમદાવાદ'
    }
  ],
  brideSide: [
    {
      name: 'મહુલભાઈ કુંડનભાઈ મેહતા',
      relation: 'પિતા',
      address: 'B-502, પ્રશાંતિ રેસિડેન્સી, સટેલાઇટ, અમદાવાદ'
    }
  ]
};
```

### KankotriCeremony

```typescript
// PURPOSE: Pre-wedding ceremony event
interface KankotriCeremony {
  id: string;                    // Unique ID: "mandap", "haldi", etc.
  name: string;                  // English name: "Mandap Muhurat"
  nameGujarati?: string;         // Gujarati name: "મંડપ મુહૂર્ત"
  date: Date;                    // MUST be Date object
  time: string;                  // "૫:૦૦ કલાકે સાંજે"
  venue: string;                 // Venue name/address
  description?: string;          // Optional description
  type: 'mandap' | 'haldi' | 'sangeet' | 'garba' | 'swagatam' | 'vidai' | 'custom';
}

// EXAMPLE USAGE:
const ceremonies = [
  {
    id: 'mandap',
    name: 'Mandap Muhurat',
    nameGujarati: 'મંડપ મુહૂર્ત',
    date: new Date('2025-01-31'),  // Date object!
    time: '૫:૦૦ કલાકે સાંજે',
    venue: 'શ્રી મુરેશભાઈ નારણભાઈ મેહતા ચેરિટેબલ હોલ, સુરત',
    type: 'mandap'
  },
  {
    id: 'haldi',
    name: 'Haldi Ceremony',
    nameGujarati: 'હળદી રસમ',
    date: new Date('2025-01-30'),
    time: 'સવારે ૧૦:૦૦ કલાકે',
    venue: 'વર પક્ષની પ્રાગણ',
    type: 'haldi'
  }
];
```

### FamilyMember

```typescript
// PURPOSE: Extended family member listing
interface FamilyMember {
  name: string;                  // "દિલીપભાઈ પોપટભાઈ મેસરા"
  relation: string;              // "કાકા", "માસી", "ભાઈ", etc.
  prefix?: string;               // "શ્રી", "શ્રીમતી" (optional)
}

// EXAMPLE USAGE:
const families = {
  groomFamily: [
    { name: 'કિશોરભાઈ પોપટભાઈ મેસરા', relation: 'પિતા', prefix: 'શ્રી' },
    { name: 'નિશાબેન કિશોરભાઈ મેસરા', relation: 'માતા', prefix: 'શ્રીમતી' },
    { name: 'દિલીપભાઈ પોપટભાઈ મેસરા', relation: 'કાકા', prefix: 'શ્રી' }
  ],
  brideFamily: [
    { name: 'મહુલભાઈ કુંડનભાઈ મેહતા', relation: 'પિતા', prefix: 'શ્રી' },
    { name: 'ધરતીબેન મહુલભાઈ મેહતા', relation: 'માતા', prefix: 'શ્રીમતી' }
  ]
};
```

### Elder

```typescript
// PURPOSE: Blessing giver (આશીર્વાદકર્તા)
interface Elder {
  name: string;                  // Elder's name
  relation: string;              // "દાદા", "દાદી", "નાના", etc.
  side: 'groom' | 'bride';       // Which side
}

// EXAMPLE USAGE:
const blessings = {
  groomElders: [
    { name: 'પોપટભાઈ નાથાભાઈ મેસરા', relation: 'દાદા', side: 'groom' },
    { name: 'હરતીબેન પોપટભાઈ', relation: 'દાદી', side: 'groom' }
  ],
  brideElders: [
    { name: 'કુંડનભાઈ રમેશભાઈ મેહતા', relation: 'દાદા', side: 'bride' }
  ]
};
```

---

## CONFIGURATION TYPE

### KankotriConfig

```typescript
// PURPOSE: Template customization settings
interface KankotriConfig {
  // Color Scheme
  colors: {
    primary: string;             // Main color (e.g., '#2d5016' green)
    secondary: string;           // Accent color (e.g., '#d4af37' gold)
    accent: string;              // Tertiary color (e.g., '#8B4513' brown)
    background: string;          // Page background (e.g., '#f9f6f0' cream)
    text: string;                // Body text (e.g., '#1a1a1a' dark)
  };

  // Typography
  fonts: {
    gujarati: string;            // "'Noto Sans Gujarati', sans-serif"
    hindi: string;               // "'Noto Sans Devanagari', sans-serif"
    english: string;             // "'Cormorant Garamond', serif"
    decorative: string;          // "'Playfair Display', serif"
  };

  // Religious Symbols
  symbols: {
    ganesh: boolean;
    om: boolean;
    swastika: boolean;
    kalash: boolean;
    lotus: boolean;
  };

  // Decorative Elements
  decorations: {
    borders: 'floral' | 'geometric' | 'traditional' | 'minimal';
    corners: 'leaves' | 'flowers' | 'peacock' | 'none';
    dividers: boolean;
  };

  // Background Pattern
  background: {
    pattern: 'paper' | 'texture' | 'floral' | 'plain';
    opacity: number;             // 0-1
  };

  // Content Settings
  content: {
    language: 'gujarati' | 'hindi' | 'english' | 'mixed';
    showPhotos: boolean;
    ceremoniesCount: number;
  };
}

// DEFAULT CONFIG EXAMPLE:
const defaultConfig: KankotriConfig = {
  colors: {
    primary: '#2d5016',
    secondary: '#d4af37',
    accent: '#8B4513',
    background: '#f9f6f0',
    text: '#1a1a1a',
  },
  fonts: {
    gujarati: "'Noto Sans Gujarati', sans-serif",
    hindi: "'Noto Sans Devanagari', sans-serif",
    english: "'Cormorant Garamond', serif",
    decorative: "'Playfair Display', serif",
  },
  symbols: {
    ganesh: true,
    om: true,
    swastika: false,
    kalash: false,
    lotus: true,
  },
  decorations: {
    borders: 'traditional',
    corners: 'peacock',
    dividers: true,
  },
  background: {
    pattern: 'paper',
    opacity: 0.1,
  },
  content: {
    language: 'mixed',
    showPhotos: true,
    ceremoniesCount: 4,
  },
};
```

---

## CONSTANTS

### Ceremony Types (Gujarati Names)

```typescript
// SOURCE: types/v2/kankotri.ts
export const CEREMONY_TYPES_GU = {
  mandap: 'મંડપ મુહૂર્ત',
  haldi: 'હળદી',
  sangeet: 'સંગીત સંધ્યા',
  garba: 'રાજ ગરબા',
  swagatam: 'સ્વાગતમ ભોજન',
  mehndi: 'મહેંદી',
  vidai: 'વિદાય',
} as const;

// USAGE:
const ceremonyName = CEREMONY_TYPES_GU.mandap; // "મંડપ મુહૂર્ત"
```

### Religious Invocations

```typescript
// SOURCE: types/v2/kankotri.ts
export const INVOCATIONS = {
  ganesh: 'શ્રી ગણેશાય નમઃ',
  om: 'ॐ',
  combined: '॥ શ્રી ગણેશાય નમઃ ॥',
} as const;

// USAGE:
const invocationText = INVOCATIONS.ganesh; // "શ્રી ગણેશાય નમઃ"
```

---

## COMPLETE EXAMPLE DATA

```typescript
// EXAMPLE: Complete KankotriData object
import type { KankotriData } from '@/types/v2/kankotri';

export const exampleKankotri: KankotriData = {
  // Metadata
  id: 'kankotri-deep-nisha',
  userId: 'user-123',
  slug: 'deep-nisha-wedding',
  title: 'Deep & Nisha Wedding Kankotri',
  status: 'published',

  // Groom (વર)
  groom: {
    name: 'Deep',
    fullName: 'શ્રી દીપ કિશોરભાઈ મેસરા',
    fatherName: 'શ્રી કિશોરભાઈ પોપટભાઈ મેસરા',
    motherName: 'શ્રીમતી નિશાબેન કિશોરભાઈ મેસરા',
    grandfatherName: 'શ્રી પોપટભાઈ મેસરા',
    photo: '/images/groom.jpg',
  },

  // Bride (વધુ)
  bride: {
    name: 'Nisha',
    fullName: 'શ્રી નિશા મહુલભાઈ મેહતા',
    fatherName: 'શ્રી મહુલભાઈ કુંડનભાઈ મેહતા',
    motherName: 'શ્રીમતી ધરતીબેન મહુલભાઈ મેહતા',
    grandfatherName: 'શ્રી કુંડનભાઈ મેહતા',
    photo: '/images/bride.jpg',
  },

  // Hosts
  hosts: {
    groomSide: [
      {
        name: 'કિશોરભાઈ પોપટભાઈ મેસરા',
        relation: 'પિતા',
        address: 'A-701, સ્વર્ગિક ટાવર, સરખેજ, અમદાવાદ',
      },
    ],
    brideSide: [
      {
        name: 'મહુલભાઈ કુંડનભાઈ મેહતા',
        relation: 'પિતા',
        address: 'B-502, પ્રશાંતિ રેસિડેન્સી, સટેલાઇટ, અમદાવાદ',
      },
    ],
  },

  // Invocation
  invocation: {
    deity: 'ganesh',
    text: '॥ શ્રી ગણેશાય નમઃ ॥',
    showSymbol: true,
  },

  // Ceremonies
  ceremonies: [
    {
      id: 'mandap',
      name: 'Mandap Muhurat',
      nameGujarati: 'મંડપ મુહૂર્ત',
      date: new Date('2025-01-31'),  // Date object!
      time: '૫:૦૦ કલાકે સાંજે',
      venue: 'શ્રી મુરેશભાઈ નારણભાઈ મેહતા ચેરિટેબલ હોલ, સુરત',
      type: 'mandap',
    },
    {
      id: 'garba',
      name: 'Raj Garba',
      nameGujarati: 'રાજ ગરબા',
      date: new Date('2025-01-30'),
      time: 'રાત્રે ૯:૩૦ કલાકે',
      venue: 'કૃષ્ણકુંજ હોલ, સુરત',
      type: 'garba',
    },
  ],

  // Wedding
  wedding: {
    date: new Date('2025-01-31'),  // Date object!
    time: '૫:૦૦ કલાકે સાંજે',
    venue: {
      name: 'શ્રી મુરેશભાઈ નારણભાઈ મેહતા ચેરિટેબલ હોલ',
      address: 'પાંચરાત્રી રોડ, વરાછા',
      city: 'સુરત',
      state: 'ગુજરાત',
      pincode: '395006',
      mapUrl: 'https://www.google.com/maps/embed?...',
      phone: '૦૨૬૧ ૨૪૨૨૬૨૨',
    },
  },

  // Families
  families: {
    groomFamily: [
      { name: 'કિશોરભાઈ પોપટભાઈ મેસરા', relation: 'પિતા', prefix: 'શ્રી' },
      { name: 'નિશાબેન કિશોરભાઈ મેસરા', relation: 'માતા', prefix: 'શ્રીમતી' },
    ],
    brideFamily: [
      { name: 'મહુલભાઈ કુંડનભાઈ મેહતા', relation: 'પિતા', prefix: 'શ્રી' },
      { name: 'ધરતીબેન મહુલભાઈ મેહતા', relation: 'માતા', prefix: 'શ્રીમતી' },
    ],
  },

  // Blessings
  blessings: {
    groomElders: [
      { name: 'પોપટભાઈ નાથાભાઈ મેસરા', relation: 'દાદા', side: 'groom' },
      { name: 'હરતીબેન પોપટભાઈ', relation: 'દાદી', side: 'groom' },
    ],
    brideElders: [
      { name: 'કુંડનભાઈ રમેશભાઈ મેહતા', relation: 'દાદા', side: 'bride' },
    ],
  },

  // Invitation Text
  invitationText: {
    gujarati: 'અમારા પુત્ર દીપ અને નિશાના લગ્ન સમારોહમાં તમારી હાજરી આપવા વિનંતી',
    english: 'We cordially invite you to bless the sacred union of Deep and Nisha',
  },

  // Optional
  couplePhoto: '/images/deep-nisha-cover.jpg',

  // Pages
  pages: {
    cover: true,
    invocation: true,
    invitation: true,
    ceremonies: true,
    families: false,
    blessings: false,
    venue: true,
  },

  // Config (use default or custom)
  customization: kankotriConfig,

  // Metadata
  viewCount: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
  publishedAt: new Date(),
};
```

---

## IMPORT STATEMENTS

```typescript
// Copy these exact imports

// Type imports
import type { KankotriData } from '@/types/v2/kankotri';
import type { KankotriCeremony } from '@/types/v2/kankotri';
import type { KankotriConfig } from '@/types/v2/kankotri';
import type { FamilyHost, FamilyMember, Elder } from '@/types/v2/kankotri';

// Constant imports
import { CEREMONY_TYPES_GU, INVOCATIONS } from '@/types/v2/kankotri';

// Example data import
import { exampleKankotri } from '@/lib/data/example-kankotri';

// Config import
import { kankotriConfig } from '@/components/templates-v2/themes/KankotriTemplate/kankotri-config';
```

---

## TYPE GUARDS & VALIDATION

```typescript
// Validate Date objects
function isValidDate(date: any): date is Date {
  return date instanceof Date && !isNaN(date.getTime());
}

// Normalize date input
function normalizeDate(date: Date | string | number): Date {
  if (date instanceof Date) return date;
  return new Date(date);
}

// Validate KankotriData
function validateKankotriData(data: any): data is KankotriData {
  return (
    data &&
    typeof data.id === 'string' &&
    data.groom && typeof data.groom.name === 'string' &&
    data.bride && typeof data.bride.name === 'string' &&
    isValidDate(data.wedding.date) &&
    Array.isArray(data.ceremonies)
  );
}

// USAGE:
if (!validateKankotriData(data)) {
  throw new Error('Invalid KankotriData');
}
```

---

## COMMON PATTERNS

### Creating Ceremony

```typescript
const newCeremony: KankotriCeremony = {
  id: 'mehndi',
  name: 'Mehndi Ceremony',
  nameGujarati: 'મહેંદી',
  date: new Date('2025-01-29'),
  time: 'સાંજે ૬:૦૦ કલાકે',
  venue: 'બ્રાઈડ પક્ષની પ્રાગણ',
  type: 'custom',
};
```

### Updating Config Colors

```typescript
const customConfig: KankotriConfig = {
  ...kankotriConfig,
  colors: {
    ...kankotriConfig.colors,
    primary: '#8B0000',    // Change to dark red
    secondary: '#FFD700',  // Gold remains same
  },
};
```

### Adding Family Member

```typescript
const newMember: FamilyMember = {
  name: 'રવિભાઈ કિશોરભાઈ મેસરા',
  relation: 'ભાઈ',
  prefix: 'શ્રી',
};

data.families.groomFamily.push(newMember);
```

---

## RELATED DOCS

- Example data usage: `lib/data/example-kankotri.ts`
- Config defaults: `components/templates-v2/themes/KankotriTemplate/kankotri-config.ts`
- Component props: `02_COMPONENT_CATALOG.md`
- Template implementation: `03_TEMPLATE_BLUEPRINT.md`
