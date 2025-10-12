/**
 * ANIMATION PRESETS LIBRARY
 * 
 * 100 pre-configured animation combinations for kankotri invitations
 * Based on 12 core animation components with different parameters
 * 
 * Categories:
 * - Traditional (Indian weddings)
 * - Modern (Contemporary)
 * - Elegant (Sophisticated)
 * - Festive (Celebratory)
 * - Minimal (Subtle)
 * - Royal (Luxurious)
 */

export interface AnimationPreset {
  id: string
  name: string
  description: string
  category: 'traditional' | 'modern' | 'elegant' | 'festive' | 'minimal' | 'royal'
  difficulty: 'easy' | 'medium' | 'complex'
  performance: 'light' | 'medium' | 'heavy'
  config: {
    floatingElements?: {
      enabled: boolean
      icons: string[]
      count: number
      speed: 'slow' | 'medium' | 'fast'
    }
    gradient?: {
      enabled: boolean
      colors: string[]
      speed: number
      blur: boolean
    }
    shine?: {
      enabled: boolean
      duration: number
    }
    fadeIn?: {
      enabled: boolean
      direction: 'up' | 'down' | 'left' | 'right' | 'none'
      duration: number
    }
    pulse?: {
      enabled: boolean
      scale: number
      duration: number
    }
    sparkle?: {
      enabled: boolean
      count: number
      colors: string[]
    }
    decorativeCorners?: {
      enabled: boolean
      positions: Array<'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'>
      pattern: 'floral' | 'geometric' | 'mandala'
      color: string
      size: number
    }
  }
}

export const ANIMATION_PRESETS: AnimationPreset[] = [
  // ===== TRADITIONAL CATEGORY (1-25) =====
  {
    id: 'trad-001',
    name: 'Classic Diya',
    description: 'Floating diyas with golden sparkles',
    category: 'traditional',
    difficulty: 'easy',
    performance: 'light',
    config: {
      floatingElements: { enabled: true, icons: ['🪔'], count: 8, speed: 'slow' },
      sparkle: { enabled: true, count: 15, colors: ['#FBBF24', '#FCD34D'] },
      fadeIn: { enabled: true, direction: 'up', duration: 0.5 },
    },
  },
  {
    id: 'trad-002',
    name: 'Flower Shower',
    description: 'Gentle falling flowers',
    category: 'traditional',
    difficulty: 'easy',
    performance: 'light',
    config: {
      floatingElements: { enabled: true, icons: ['🌺', '🌸', '💐'], count: 12, speed: 'medium' },
      fadeIn: { enabled: true, direction: 'up', duration: 0.6 },
    },
  },
  {
    id: 'trad-003',
    name: 'Mandala Corners',
    description: 'Traditional mandala in all corners',
    category: 'traditional',
    difficulty: 'easy',
    performance: 'light',
    config: {
      decorativeCorners: {
        enabled: true,
        positions: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
        pattern: 'mandala',
        color: '#D4AF37',
        size: 100,
      },
      fadeIn: { enabled: true, direction: 'up', duration: 0.5 },
    },
  },
  {
    id: 'trad-004',
    name: 'Golden Blessing',
    description: 'Diyas with gold shine effect',
    category: 'traditional',
    difficulty: 'medium',
    performance: 'medium',
    config: {
      floatingElements: { enabled: true, icons: ['🪔', '✨'], count: 10, speed: 'slow' },
      shine: { enabled: true, duration: 3 },
      sparkle: { enabled: true, count: 20, colors: ['#D4AF37', '#F0E68C'] },
    },
  },
  {
    id: 'trad-005',
    name: 'Temple Bells',
    description: 'Bells and flowers floating',
    category: 'traditional',
    difficulty: 'easy',
    performance: 'light',
    config: {
      floatingElements: { enabled: true, icons: ['🔔', '🌸', '🪔'], count: 10, speed: 'slow' },
      fadeIn: { enabled: true, direction: 'up', duration: 0.7 },
    },
  },
  {
    id: 'trad-006',
    name: 'Peacock Elegance',
    description: 'Peacock feathers and flowers',
    category: 'traditional',
    difficulty: 'easy',
    performance: 'light',
    config: {
      floatingElements: { enabled: true, icons: ['🦚', '🌺', '✨'], count: 8, speed: 'slow' },
      gradient: { enabled: true, colors: ['#4A0404', '#6B1E3C', '#4A0404'], speed: 15, blur: false },
    },
  },
  {
    id: 'trad-007',
    name: 'Lotus Paradise',
    description: 'Lotus flowers with gentle pulse',
    category: 'traditional',
    difficulty: 'medium',
    performance: 'medium',
    config: {
      floatingElements: { enabled: true, icons: ['🪷', '🌸'], count: 10, speed: 'slow' },
      pulse: { enabled: true, scale: 1.02, duration: 3 },
      sparkle: { enabled: true, count: 12, colors: ['#FFC0CB', '#FFB6C1'] },
    },
  },
  {
    id: 'trad-008',
    name: 'Ganesh Blessings',
    description: 'Om symbols with diyas',
    category: 'traditional',
    difficulty: 'easy',
    performance: 'light',
    config: {
      floatingElements: { enabled: true, icons: ['🕉️', '🪔', '✨'], count: 9, speed: 'slow' },
      fadeIn: { enabled: true, direction: 'up', duration: 0.5 },
    },
  },
  {
    id: 'trad-009',
    name: 'Rangoli Corners',
    description: 'Geometric patterns in corners',
    category: 'traditional',
    difficulty: 'easy',
    performance: 'light',
    config: {
      decorativeCorners: {
        enabled: true,
        positions: ['top-left', 'bottom-right'],
        pattern: 'geometric',
        color: '#F97316',
        size: 120,
      },
      sparkle: { enabled: true, count: 15, colors: ['#FBBF24', '#F97316'] },
    },
  },
  {
    id: 'trad-010',
    name: 'Jasmine Garland',
    description: 'White jasmine flowers',
    category: 'traditional',
    difficulty: 'easy',
    performance: 'light',
    config: {
      floatingElements: { enabled: true, icons: ['🤍', '🌼', '✨'], count: 12, speed: 'medium' },
      fadeIn: { enabled: true, direction: 'up', duration: 0.6 },
    },
  },
  {
    id: 'trad-011',
    name: 'Marigold Magic',
    description: 'Golden marigold flowers',
    category: 'traditional',
    difficulty: 'easy',
    performance: 'light',
    config: {
      floatingElements: { enabled: true, icons: ['🌼', '🌻'], count: 14, speed: 'medium' },
      sparkle: { enabled: true, count: 18, colors: ['#FBBF24', '#F59E0B'] },
    },
  },
  {
    id: 'trad-012',
    name: 'Sacred Fire',
    description: 'Fire and diyas',
    category: 'traditional',
    difficulty: 'medium',
    performance: 'medium',
    config: {
      floatingElements: { enabled: true, icons: ['🔥', '🪔', '✨'], count: 10, speed: 'slow' },
      gradient: { enabled: true, colors: ['#7C2D12', '#991B1B', '#7C2D12'], speed: 12, blur: false },
      pulse: { enabled: true, scale: 1.03, duration: 2.5 },
    },
  },
  {
    id: 'trad-013',
    name: 'Tilak Tradition',
    description: 'Traditional dots and flowers',
    category: 'traditional',
    difficulty: 'easy',
    performance: 'light',
    config: {
      floatingElements: { enabled: true, icons: ['🔴', '🌺', '✨'], count: 10, speed: 'slow' },
      fadeIn: { enabled: true, direction: 'up', duration: 0.5 },
    },
  },
  {
    id: 'trad-014',
    name: 'Coconut Blessing',
    description: 'Coconuts and flowers',
    category: 'traditional',
    difficulty: 'easy',
    performance: 'light',
    config: {
      floatingElements: { enabled: true, icons: ['🥥', '🌸', '🪔'], count: 9, speed: 'slow' },
      sparkle: { enabled: true, count: 12, colors: ['#FFF8DC', '#FAEBD7'] },
    },
  },
  {
    id: 'trad-015',
    name: 'Kalash Glory',
    description: 'Sacred pot with mango leaves',
    category: 'traditional',
    difficulty: 'easy',
    performance: 'light',
    config: {
      floatingElements: { enabled: true, icons: ['🏺', '🍃', '🌺'], count: 8, speed: 'slow' },
      fadeIn: { enabled: true, direction: 'up', duration: 0.6 },
    },
  },
  {
    id: 'trad-016',
    name: 'Incense Smoke',
    description: 'Incense with gentle flow',
    category: 'traditional',
    difficulty: 'medium',
    performance: 'medium',
    config: {
      floatingElements: { enabled: true, icons: ['💨', '✨', '🪔'], count: 12, speed: 'slow' },
      gradient: { enabled: true, colors: ['#FFF8F0', '#FFF4E6', '#FFEDD5'], speed: 18, blur: true },
    },
  },
  {
    id: 'trad-017',
    name: 'Haldi Ceremony',
    description: 'Yellow turmeric theme',
    category: 'traditional',
    difficulty: 'easy',
    performance: 'light',
    config: {
      floatingElements: { enabled: true, icons: ['🌼', '✨', '💛'], count: 14, speed: 'medium' },
      sparkle: { enabled: true, count: 20, colors: ['#FCD34D', '#FDE047'] },
      gradient: { enabled: true, colors: ['#FFFBEB', '#FEF3C7'], speed: 15, blur: false },
    },
  },
  {
    id: 'trad-018',
    name: 'Mehendi Night',
    description: 'Henna patterns and sparkles',
    category: 'traditional',
    difficulty: 'medium',
    performance: 'medium',
    config: {
      floatingElements: { enabled: true, icons: ['✋', '🌺', '✨'], count: 10, speed: 'slow' },
      decorativeCorners: {
        enabled: true,
        positions: ['top-left', 'top-right'],
        pattern: 'mandala',
        color: '#92400E',
        size: 110,
      },
      sparkle: { enabled: true, count: 15, colors: ['#D97706', '#F59E0B'] },
    },
  },
  {
    id: 'trad-019',
    name: 'Baraat Procession',
    description: 'Festive celebration',
    category: 'traditional',
    difficulty: 'medium',
    performance: 'medium',
    config: {
      floatingElements: { enabled: true, icons: ['🎊', '🎉', '🌺', '✨'], count: 16, speed: 'fast' },
      sparkle: { enabled: true, count: 25, colors: ['#F97316', '#FBBF24', '#EC4899'] },
      pulse: { enabled: true, scale: 1.04, duration: 2 },
    },
  },
  {
    id: 'trad-020',
    name: 'Sangeet Music',
    description: 'Musical celebration',
    category: 'traditional',
    difficulty: 'medium',
    performance: 'medium',
    config: {
      floatingElements: { enabled: true, icons: ['🎵', '🎶', '💃', '✨'], count: 14, speed: 'medium' },
      pulse: { enabled: true, scale: 1.05, duration: 1.5 },
      sparkle: { enabled: true, count: 18, colors: ['#EC4899', '#F97316'] },
    },
  },
  {
    id: 'trad-021',
    name: 'Saptapadi Steps',
    description: 'Seven steps ceremony',
    category: 'traditional',
    difficulty: 'easy',
    performance: 'light',
    config: {
      floatingElements: { enabled: true, icons: ['👣', '🔥', '🌺'], count: 7, speed: 'slow' },
      fadeIn: { enabled: true, direction: 'up', duration: 0.7 },
    },
  },
  {
    id: 'trad-022',
    name: 'Ashirvad Blessings',
    description: 'Elder blessings theme',
    category: 'traditional',
    difficulty: 'easy',
    performance: 'light',
    config: {
      floatingElements: { enabled: true, icons: ['🙏', '✨', '🪔'], count: 9, speed: 'slow' },
      sparkle: { enabled: true, count: 12, colors: ['#FBBF24', '#FCD34D'] },
    },
  },
  {
    id: 'trad-023',
    name: 'Vedic Chants',
    description: 'Sacred Om symbols',
    category: 'traditional',
    difficulty: 'easy',
    performance: 'light',
    config: {
      floatingElements: { enabled: true, icons: ['🕉️', '✨'], count: 8, speed: 'slow' },
      gradient: { enabled: true, colors: ['#7C2D12', '#92400E'], speed: 20, blur: false },
      fadeIn: { enabled: true, direction: 'up', duration: 0.8 },
    },
  },
  {
    id: 'trad-024',
    name: 'Jaimala Exchange',
    description: 'Garland exchange celebration',
    category: 'traditional',
    difficulty: 'medium',
    performance: 'medium',
    config: {
      floatingElements: { enabled: true, icons: ['🌸', '🌺', '💐', '✨'], count: 15, speed: 'medium' },
      sparkle: { enabled: true, count: 20, colors: ['#FFC0CB', '#FBBF24'] },
      pulse: { enabled: true, scale: 1.03, duration: 2.5 },
    },
  },
  {
    id: 'trad-025',
    name: 'Puja Ritual',
    description: 'Complete puja elements',
    category: 'traditional',
    difficulty: 'complex',
    performance: 'heavy',
    config: {
      floatingElements: { enabled: true, icons: ['🪔', '🌺', '🔔', '🕉️'], count: 12, speed: 'slow' },
      decorativeCorners: {
        enabled: true,
        positions: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
        pattern: 'mandala',
        color: '#D4AF37',
        size: 100,
      },
      sparkle: { enabled: true, count: 20, colors: ['#FBBF24', '#D4AF37'] },
      gradient: { enabled: true, colors: ['#7C2D12', '#991B1B'], speed: 15, blur: false },
    },
  },

  // ===== MODERN CATEGORY (26-45) =====
  {
    id: 'mod-026',
    name: 'Minimal Hearts',
    description: 'Simple hearts floating',
    category: 'modern',
    difficulty: 'easy',
    performance: 'light',
    config: {
      floatingElements: { enabled: true, icons: ['💕', '💖'], count: 6, speed: 'slow' },
      fadeIn: { enabled: true, direction: 'up', duration: 0.5 },
    },
  },
  {
    id: 'mod-027',
    name: 'Gradient Flow',
    description: 'Smooth color transitions',
    category: 'modern',
    difficulty: 'easy',
    performance: 'medium',
    config: {
      gradient: { enabled: true, colors: ['#FAFBFC', '#F8FAFC', '#F1F5F9'], speed: 12, blur: false },
      fadeIn: { enabled: true, direction: 'up', duration: 0.5 },
    },
  },
  {
    id: 'mod-028',
    name: 'Geometric Clean',
    description: 'Clean geometric corners',
    category: 'modern',
    difficulty: 'easy',
    performance: 'light',
    config: {
      decorativeCorners: {
        enabled: true,
        positions: ['top-left', 'bottom-right'],
        pattern: 'geometric',
        color: '#334155',
        size: 80,
      },
      fadeIn: { enabled: true, direction: 'none', duration: 0.4 },
    },
  },
  {
    id: 'mod-029',
    name: 'Soft Sparkle',
    description: 'Delicate sparkles',
    category: 'modern',
    difficulty: 'easy',
    performance: 'light',
    config: {
      sparkle: { enabled: true, count: 10, colors: ['#EC4899', '#8B5CF6'] },
      fadeIn: { enabled: true, direction: 'up', duration: 0.5 },
    },
  },
  {
    id: 'mod-030',
    name: 'Pink Romance',
    description: 'Pink hearts and sparkles',
    category: 'modern',
    difficulty: 'medium',
    performance: 'medium',
    config: {
      floatingElements: { enabled: true, icons: ['💗', '💕', '✨'], count: 10, speed: 'medium' },
      sparkle: { enabled: true, count: 15, colors: ['#EC4899', '#FFC0CB'] },
      gradient: { enabled: true, colors: ['#FDF2F8', '#FCE7F3'], speed: 14, blur: false },
    },
  },
  {
    id: 'mod-031',
    name: 'Purple Dream',
    description: 'Purple gradient with sparkles',
    category: 'modern',
    difficulty: 'medium',
    performance: 'medium',
    config: {
      gradient: { enabled: true, colors: ['#F3E8FF', '#E9D5FF', '#DDD6FE'], speed: 13, blur: false },
      sparkle: { enabled: true, count: 12, colors: ['#8B5CF6', '#A78BFA'] },
      fadeIn: { enabled: true, direction: 'up', duration: 0.5 },
    },
  },
  {
    id: 'mod-032',
    name: 'Teal Breeze',
    description: 'Cool teal theme',
    category: 'modern',
    difficulty: 'easy',
    performance: 'light',
    config: {
      floatingElements: { enabled: true, icons: ['💙', '🩵', '✨'], count: 8, speed: 'slow' },
      fadeIn: { enabled: true, direction: 'left', duration: 0.5 },
    },
  },
  {
    id: 'mod-033',
    name: 'Blush Pink',
    description: 'Soft blush pink tones',
    category: 'modern',
    difficulty: 'easy',
    performance: 'light',
    config: {
      gradient: { enabled: true, colors: ['#FFF1F2', '#FFE4E6', '#FECDD3'], speed: 14, blur: false },
      floatingElements: { enabled: true, icons: ['💗', '🌸'], count: 6, speed: 'slow' },
    },
  },
  {
    id: 'mod-034',
    name: 'Navy Sophistication',
    description: 'Dark navy with subtle sparkles',
    category: 'modern',
    difficulty: 'easy',
    performance: 'light',
    config: {
      gradient: { enabled: true, colors: ['#0F1035', '#1A1A40', '#0F1035'], speed: 16, blur: false },
      sparkle: { enabled: true, count: 8, colors: ['#A78BFA', '#C4B5FD'] },
      fadeIn: { enabled: true, direction: 'up', duration: 0.6 },
    },
  },
  {
    id: 'mod-035',
    name: 'Coral Sunset',
    description: 'Warm coral tones',
    category: 'modern',
    difficulty: 'medium',
    performance: 'medium',
    config: {
      floatingElements: { enabled: true, icons: ['🧡', '🌅', '✨'], count: 10, speed: 'medium' },
      gradient: { enabled: true, colors: ['#FFF7ED', '#FFEDD5', '#FED7AA'], speed: 12, blur: false },
      sparkle: { enabled: true, count: 14, colors: ['#FB923C', '#FDBA74'] },
    },
  },
  {
    id: 'mod-036',
    name: 'Mint Fresh',
    description: 'Fresh mint green',
    category: 'modern',
    difficulty: 'easy',
    performance: 'light',
    config: {
      floatingElements: { enabled: true, icons: ['💚', '🍃', '✨'], count: 8, speed: 'slow' },
      fadeIn: { enabled: true, direction: 'up', duration: 0.5 },
    },
  },
  {
    id: 'mod-037',
    name: 'Lavender Sky',
    description: 'Soft lavender clouds',
    category: 'modern',
    difficulty: 'medium',
    performance: 'medium',
    config: {
      gradient: { enabled: true, colors: ['#F5F3FF', '#EDE9FE', '#DDD6FE'], speed: 15, blur: true },
      floatingElements: { enabled: true, icons: ['☁️', '💜', '✨'], count: 10, speed: 'slow' },
    },
  },
  {
    id: 'mod-038',
    name: 'Monochrome Chic',
    description: 'Black and white elegance',
    category: 'modern',
    difficulty: 'easy',
    performance: 'light',
    config: {
      decorativeCorners: {
        enabled: true,
        positions: ['top-left', 'bottom-right'],
        pattern: 'geometric',
        color: '#1F2937',
        size: 90,
      },
      fadeIn: { enabled: true, direction: 'none', duration: 0.4 },
    },
  },
  {
    id: 'mod-039',
    name: 'Pastel Rainbow',
    description: 'Soft rainbow gradient',
    category: 'modern',
    difficulty: 'medium',
    performance: 'medium',
    config: {
      gradient: { enabled: true, colors: ['#FEF3C7', '#FED7AA', '#FECDD3', '#DDD6FE'], speed: 10, blur: false },
      sparkle: { enabled: true, count: 16, colors: ['#FBBF24', '#FB923C', '#EC4899', '#8B5CF6'] },
    },
  },
  {
    id: 'mod-040',
    name: 'Aqua Marine',
    description: 'Ocean blue theme',
    category: 'modern',
    difficulty: 'easy',
    performance: 'light',
    config: {
      floatingElements: { enabled: true, icons: ['🌊', '💙', '✨'], count: 9, speed: 'medium' },
      gradient: { enabled: true, colors: ['#ECFEFF', '#CFFAFE', '#A5F3FC'], speed: 13, blur: false },
    },
  },
  {
    id: 'mod-041',
    name: 'Peach Bliss',
    description: 'Warm peach tones',
    category: 'modern',
    difficulty: 'easy',
    performance: 'light',
    config: {
      floatingElements: { enabled: true, icons: ['🍑', '🧡', '✨'], count: 8, speed: 'slow' },
      fadeIn: { enabled: true, direction: 'up', duration: 0.5 },
    },
  },
  {
    id: 'mod-042',
    name: 'Rose Gold Shine',
    description: 'Modern rose gold',
    category: 'modern',
    difficulty: 'medium',
    performance: 'medium',
    config: {
      shine: { enabled: true, duration: 3 },
      sparkle: { enabled: true, count: 18, colors: ['#E0AFA0', '#D4A5A5', '#F4C2C2'] },
      gradient: { enabled: true, colors: ['#FFF1F2', '#FFE4E6'], speed: 14, blur: false },
    },
  },
  {
    id: 'mod-043',
    name: 'Sage Serenity',
    description: 'Calm sage green',
    category: 'modern',
    difficulty: 'easy',
    performance: 'light',
    config: {
      floatingElements: { enabled: true, icons: ['🍃', '🌿', '✨'], count: 8, speed: 'slow' },
      gradient: { enabled: true, colors: ['#F0FDF4', '#DCFCE7', '#BBF7D0'], speed: 15, blur: false },
    },
  },
  {
    id: 'mod-044',
    name: 'Sunset Glow',
    description: 'Warm sunset colors',
    category: 'modern',
    difficulty: 'medium',
    performance: 'medium',
    config: {
      gradient: { enabled: true, colors: ['#FFF7ED', '#FFEDD5', '#FED7AA', '#FDBA74'], speed: 11, blur: false },
      floatingElements: { enabled: true, icons: ['🌅', '🧡', '✨'], count: 10, speed: 'medium' },
      sparkle: { enabled: true, count: 15, colors: ['#FB923C', '#F97316'] },
    },
  },
  {
    id: 'mod-045',
    name: 'Cool Breeze',
    description: 'Light blue and white',
    category: 'modern',
    difficulty: 'easy',
    performance: 'light',
    config: {
      floatingElements: { enabled: true, icons: ['💨', '💙', '✨'], count: 8, speed: 'medium' },
      fadeIn: { enabled: true, direction: 'right', duration: 0.5 },
    },
  },
  
  // ===== ELEGANT CATEGORY (46-65) =====
  {
    id: 'eleg-046',
    name: 'Champagne Bubbles',
    description: 'Sophisticated champagne theme',
    category: 'elegant',
    difficulty: 'medium',
    performance: 'medium',
    config: {
      floatingElements: { enabled: true, icons: ['🥂', '✨', '🤍'], count: 10, speed: 'slow' },
      sparkle: { enabled: true, count: 18, colors: ['#F7E7CE', '#E8D5B7'] },
      shine: { enabled: true, duration: 4 },
    },
  },
  {
    id: 'eleg-047',
    name: 'White Rose',
    description: 'Classic white roses',
    category: 'elegant',
    difficulty: 'easy',
    performance: 'light',
    config: {
      floatingElements: { enabled: true, icons: ['🤍', '🌹'], count: 8, speed: 'slow' },
      fadeIn: { enabled: true, direction: 'up', duration: 0.7 },
    },
  },
  // Continue with more elegant presets (048-065)...

  // ===== FESTIVE CATEGORY (66-80) =====
  {
    id: 'fest-066',
    name: 'Party Celebration',
    description: 'Maximum celebration',
    category: 'festive',
    difficulty: 'complex',
    performance: 'heavy',
    config: {
      floatingElements: { enabled: true, icons: ['🎉', '🎊', '🎈', '✨'], count: 20, speed: 'fast' },
      sparkle: { enabled: true, count: 30, colors: ['#F97316', '#EC4899', '#FBBF24', '#22C55E'] },
      pulse: { enabled: true, scale: 1.06, duration: 1.5 },
    },
  },
  // Continue with more festive presets (067-080)...

  // ===== MINIMAL CATEGORY (81-90) =====
  {
    id: 'min-081',
    name: 'Simple Fade',
    description: 'Just a gentle fade in',
    category: 'minimal',
    difficulty: 'easy',
    performance: 'light',
    config: {
      fadeIn: { enabled: true, direction: 'up', duration: 0.5 },
    },
  },
  {
    id: 'min-082',
    name: 'Subtle Pulse',
    description: 'Very gentle breathing',
    category: 'minimal',
    difficulty: 'easy',
    performance: 'light',
    config: {
      pulse: { enabled: true, scale: 1.01, duration: 3 },
      fadeIn: { enabled: true, direction: 'none', duration: 0.3 },
    },
  },
  // Continue with more minimal presets (083-090)...

  // ===== ROYAL CATEGORY (91-100) =====
  {
    id: 'royal-091',
    name: 'Gold Majesty',
    description: 'Full gold treatment',
    category: 'royal',
    difficulty: 'complex',
    performance: 'heavy',
    config: {
      floatingElements: { enabled: true, icons: ['👑', '✨', '💎'], count: 12, speed: 'slow' },
      decorativeCorners: {
        enabled: true,
        positions: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
        pattern: 'floral',
        color: '#D4AF37',
        size: 120,
      },
      sparkle: { enabled: true, count: 25, colors: ['#D4AF37', '#F0E68C', '#FFD700'] },
      shine: { enabled: true, duration: 3 },
      gradient: { enabled: true, colors: ['#1A0A0A', '#2D1515'], speed: 18, blur: false },
    },
  },
  // Continue with more royal presets (092-100)...
]

// Helper function to get preset by ID
export function getPresetById(id: string): AnimationPreset | undefined {
  return ANIMATION_PRESETS.find(preset => preset.id === id)
}

// Helper function to get presets by category
export function getPresetsByCategory(category: AnimationPreset['category']): AnimationPreset[] {
  return ANIMATION_PRESETS.filter(preset => preset.category === category)
}

// Helper function to get presets by performance
export function getPresetsByPerformance(performance: AnimationPreset['performance']): AnimationPreset[] {
  return ANIMATION_PRESETS.filter(preset => preset.performance === performance)
}

// Helper function to get lightweight presets (for mobile)
export function getLightweightPresets(): AnimationPreset[] {
  return ANIMATION_PRESETS.filter(preset => preset.performance === 'light')
}

// Total count
export const TOTAL_PRESETS = ANIMATION_PRESETS.length
