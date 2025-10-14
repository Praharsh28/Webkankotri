/**
 * Traditional Kankotri (Gujarati/Indian Wedding Invitation) Types
 * 
 * Based on cultural requirements:
 * - Multi-page format (2-7 pages)
 * - Religious invocations
 * - Family-centric content
 * - Multiple ceremonies
 * - NO RSVP
 */

export interface KankotriData {
  id: string;
  userId: string;
  slug: string;
  title: string;
  status: 'draft' | 'published';
  
  // Couple information
  groom: {
    name: string;              // શ્રી દીપ
    fullName: string;          // Full name with title
    fatherName: string;        // પિતાનું નામ
    motherName?: string;       // માતાનું નામ
    grandfatherName?: string;  // દાદાનું નામ
    photo?: string;
  };
  
  bride: {
    name: string;              // શ્રી નિશા
    fullName: string;
    fatherName: string;
    motherName?: string;
    grandfatherName?: string;
    photo?: string;
  };
  
  // Host families (who are inviting)
  hosts: {
    groomSide: FamilyHost[];   // વર પક્ષ
    brideSide: FamilyHost[];   // માસા પક્ષ / વધુ પક્ષ
  };
  
  // Religious invocation
  invocation: {
    deity: 'ganesh' | 'om' | 'swastika' | 'both';
    text: string;              // શ્રી ગણેશાય નમઃ or custom
    showSymbol: boolean;
  };
  
  // Multiple ceremonies
  ceremonies: KankotriCeremony[];
  
  // Venue
  venue: {
    name: string;
    address: string;
    city: string;
    state: string;
    pincode?: string;
    mapUrl?: string;
    phone?: string;
  };
  
  // Family members (both sides)
  families: {
    groomFamily: FamilyMember[];   // અમારા પક્ષ
    brideFamily: FamilyMember[];   // માસા પક્ષ
  };
  
  // Blessing givers (elders)
  blessings: {
    groomElders: Elder[];      // આશીર્વાદકર્તા
    brideElders: Elder[];
  };
  
  // Invitation text (Gujarati/Hindi/English)
  invitationText: {
    gujarati?: string;         // Main invitation text
    hindi?: string;
    english?: string;
  };
  
  // Optional elements
  couplePhoto?: string;        // Cover page photo
  processionDetails?: string;  // વાહોરચ્છા details
  
  // Page configuration
  pages: {
    cover: boolean;
    invocation: boolean;
    invitation: boolean;
    ceremonies: boolean;
    families: boolean;
    blessings: boolean;
    venue: boolean;
  };
  
  // Customization
  customization: KankotriConfig;
  
  // Metadata
  viewCount: number;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
}

export interface FamilyHost {
  name: string;              // શ્રી કિશોરભાઈ પોપટભાઈ મેસરા
  relation?: string;         // પિતા, માતા, etc.
  address?: string;
}

export interface KankotriCeremony {
  id: string;
  name: string;              // મંડપ મુહૂર્ત, હળદી, સંગીત
  nameGujarati?: string;     // માંગલિક કાર્યક્રમ
  date: Date;
  time: string;              // ૪:૦૦ કલાકે
  venue: string;
  description?: string;
  type: 'mandap' | 'haldi' | 'sangeet' | 'garba' | 'swagatam' | 'vidai' | 'custom';
}

export interface FamilyMember {
  name: string;              // શ્રી દિલીપભાઈ પોપટભાઈ મેસરા
  relation: string;          // કાકા, માસી, etc.
  prefix?: string;           // શ્રી, શ્રીમતી
}

export interface Elder {
  name: string;
  relation: string;
  side: 'groom' | 'bride';
}

export interface KankotriConfig {
  // Traditional color scheme
  colors: {
    primary: string;         // Temple green
    secondary: string;       // Temple gold
    accent: string;          // Sacred red
    background: string;      // Cream/beige
    text: string;            // Dark brown
  };
  
  // Typography (support Gujarati fonts)
  fonts: {
    gujarati: string;        // Gujarati font family
    hindi: string;           // Devanagari font
    english: string;         // English font
    decorative: string;      // For titles
  };
  
  // Religious symbols
  symbols: {
    ganesh: boolean;
    om: boolean;
    swastika: boolean;
    kalash: boolean;
    lotus: boolean;
  };
  
  // Decorative elements
  decorations: {
    borders: 'floral' | 'geometric' | 'traditional' | 'minimal';
    corners: 'leaves' | 'flowers' | 'peacock' | 'none';
    dividers: boolean;
  };
  
  // Background
  background: {
    pattern: 'paper' | 'texture' | 'floral' | 'plain';
    opacity: number;
  };
  
  // Content
  content: {
    language: 'gujarati' | 'hindi' | 'english' | 'mixed';
    showPhotos: boolean;
    ceremoniesCount: number;
  };
}

// Ceremony types in Gujarati
export const CEREMONY_TYPES_GU = {
  mandap: 'મંડપ મુહૂર્ત',
  haldi: 'હળદી',
  sangeet: 'સંગીત સંધ્યા',
  garba: 'રાજ ગરબા',
  swagatam: 'સ્વાગતમ ભોજન',
  mehndi: 'મહેંદી',
  vidai: 'વિદાય',
} as const;

// Religious invocations
export const INVOCATIONS = {
  ganesh: 'શ્રી ગણેશાય નમઃ',
  om: 'ॐ',
  combined: '॥ શ્રી ગણેશાય નમઃ ॥',
} as const;
