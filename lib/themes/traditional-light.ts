import { KankotriTheme } from '@/types/theme'

// LIGHT ELEGANT: Cream & Burgundy (White Background)
export const traditionalLightTheme: KankotriTheme = {
  id: 'traditional-light',
  name: 'Traditional Light',
  description: 'Elegant cream and burgundy on white - sophisticated and polished',
  category: 'traditional',
  
  price: 0,
  isPremium: false,
  isFeatured: true,
  
  previewImage: '/previews/traditional-light.jpg',
  previewColors: ['#FFF8F0', '#8B1538', '#D4AF37'],
  
  // LIGHT COLOR PALETTE
  colors: {
    primary: '#8B1538',      // Dark burgundy (for text)
    secondary: '#B8860B',    // Dark gold
    accent: '#D4AF37',       // Metallic gold
    
    text: {
      primary: '#4A0404',    // Very dark burgundy (readable)
      secondary: '#8B1538',  // Dark burgundy
      heading: '#5D1A1D',    // Deep burgundy
      inverse: '#FFFFFF',    // White
    },
    
    background: {
      primary: '#FFF8F0',    // Warm cream white
      secondary: '#FFF4E6',  // Light cream
      card: 'rgba(139, 21, 56, 0.05)',  // Very subtle burgundy tint
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
      english: 'Playfair Display',
      gujarati: 'Noto Sans Gujarati',
    },
    body: {
      english: 'Inter',
      gujarati: 'Noto Sans Gujarati',
    },
    decorative: 'Great Vibes',
    sizes: {
      xs: '0.75rem', sm: '0.875rem', base: '1rem', lg: '1.125rem',
      xl: '1.25rem', '2xl': '1.5rem', '3xl': '1.875rem', '4xl': '2.25rem',
    },
    weights: { normal: 400, medium: 500, semibold: 600, bold: 700 },
  },
  
  spacing: {
    container: { mobile: '1rem', tablet: '2rem', desktop: '4rem' },
    section: { gap: '3rem', padding: '2rem' },
    element: { tight: '0.5rem', normal: '1rem', relaxed: '1.5rem' },
  },
  
  borders: {
    radius: { none: '0', sm: '0.25rem', md: '0.5rem', lg: '1rem', full: '9999px' },
    width: { thin: '1px', normal: '2px', thick: '4px' },
    style: 'solid',
    decorative: { type: 'ornate', pattern: 'mandala' },
  },
  
  // LIGHT GRADIENT
  backgrounds: {
    pattern: { type: 'gradient', opacity: 1 },
    gradient: {
      from: '#FFF8F0',     // Warm cream
      via: '#FFFBF5',      // Very light cream
      to: '#FFF4E6',       // Light cream
      direction: 'to-b',
    },
    effects: { blur: false, overlay: false, opacity: 1 },
  },
  
  animations: {
    enabled: {
      floatingElements: true, sparkle: true, pulse: true, fadeIn: true,
      slideIn: false, shineEffect: true, decorativeCorner: true, confettiBurst: false,
    },
    speed: 'normal',
    floatingEmojis: ['🪔', '✨', '💐', '🌟'],
  },
  
  sectionStyles: {
    header: {
      backgroundColor: 'rgba(212, 175, 55, 0.08)',
      borderColor: '#D4AF37',
      padding: '3rem 2rem',
    },
    blessing: {
      backgroundColor: 'rgba(139, 21, 56, 0.05)',
      borderColor: 'rgba(212, 175, 55, 0.35)',
      textColor: '#8B1538',
    },
    'event-main': {
      backgroundColor: 'rgba(212, 175, 55, 0.06)',
      borderColor: '#D4AF37',
    },
  },
}
