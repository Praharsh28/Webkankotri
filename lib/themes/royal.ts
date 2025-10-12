import { KankotriTheme } from '@/types/theme'

// RESEARCH-BASED: Wine & Champagne (Classic Luxury)
export const royalTheme: KankotriTheme = {
  id: 'royal',
  name: 'Royal Maroon',
  description: 'Luxurious wine and champagne with timeless elegance',
  category: 'elegant',
  
  price: 99,
  isPremium: true,
  isFeatured: true,
  
  previewImage: '/previews/royal.jpg',
  previewColors: ['#722F37', '#D4AF37', '#FFF9E6'],
  
  // LIGHT ELEGANT COLOR PALETTE (Wine & Champagne)
  colors: {
    primary: '#722F37',      // Wine (for text)
    secondary: '#B8860B',    // Dark gold
    accent: '#D4AF37',       // Metallic gold
    
    text: {
      primary: '#3D0C11',    // Very dark wine (readable)
      secondary: '#722F37',  // Wine
      heading: '#5D1A1D',    // Deep wine
      inverse: '#FFFFFF',    // White
    },
    
    background: {
      primary: '#FBF8F5',    // Warm ivory white
      secondary: '#FFF9F0',  // Light champagne
      card: 'rgba(114, 47, 55, 0.05)',  // Very subtle wine tint
      overlay: 'rgba(255, 255, 255, 0.95)',
    },
    
    border: {
      light: 'rgba(212, 175, 55, 0.25)',
      medium: 'rgba(184, 134, 11, 0.45)',
      heavy: '#D4AF37',
    },
  },
  
  fonts: {
    heading: {
      english: 'Cormorant Garamond',
      gujarati: 'Noto Serif Gujarati',
    },
    body: {
      english: 'Inter',
      gujarati: 'Noto Sans Gujarati',
    },
    decorative: 'Tangerine',
    sizes: {
      xs: '0.75rem', sm: '0.875rem', base: '1rem', lg: '1.125rem',
      xl: '1.25rem', '2xl': '1.5rem', '3xl': '2rem', '4xl': '2.5rem',
    },
    weights: { normal: 400, medium: 500, semibold: 600, bold: 700 },
  },
  
  spacing: {
    container: { mobile: '1.5rem', tablet: '3rem', desktop: '5rem' },
    section: { gap: '4rem', padding: '3rem' },
    element: { tight: '0.75rem', normal: '1.25rem', relaxed: '2rem' },
  },
  
  borders: {
    radius: { none: '0', sm: '0.125rem', md: '0.25rem', lg: '0.5rem', full: '9999px' },
    width: { thin: '1px', normal: '3px', thick: '5px' },
    style: 'double',
    decorative: { type: 'elegant', pattern: 'gold-leaf' },
  },
  
  // LIGHT ELEGANT GRADIENT
  backgrounds: {
    pattern: { type: 'gradient', opacity: 1 },
    gradient: {
      from: '#FBF8F5',      // Warm ivory
      via: '#FFF9F0',       // Light champagne
      to: '#FFF9E6',        // Pale champagne
      direction: 'to-b',
    },
    effects: { blur: false, overlay: false, opacity: 1 },
  },
  
  animations: {
    enabled: {
      floatingElements: false, sparkle: false, pulse: false, fadeIn: true,
      slideIn: true, shineEffect: true, decorativeCorner: true, confettiBurst: false,
    },
    speed: 'slow',
    floatingEmojis: [],
  },
  
  sectionStyles: {
    header: {
      backgroundColor: 'rgba(212, 175, 55, 0.08)',
      borderColor: '#D4AF37',
      padding: '4rem 3rem',
      borderRadius: '0.5rem',
    },
    blessing: {
      backgroundColor: 'rgba(114, 47, 55, 0.05)',
      borderColor: 'rgba(212, 175, 55, 0.35)',
      textColor: '#722F37',
    },
    'event-main': {
      backgroundColor: 'rgba(212, 175, 55, 0.06)',
      borderColor: '#D4AF37',
    },
  },
}
