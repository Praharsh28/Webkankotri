import { KankotriTheme } from '@/types/theme'

// RESEARCH-BASED: Navy & Rose Gold (Modern Sophistication)
export const modernTheme: KankotriTheme = {
  id: 'modern',
  name: 'Modern Pastel',
  description: 'Contemporary navy and rose gold with refined elegance',
  category: 'modern',
  
  price: 149,
  isPremium: true,
  isFeatured: false,
  
  previewImage: '/previews/modern.jpg',
  previewColors: ['#1A1A40', '#E0AFA0', '#FFF9E6'],
  
  // LIGHT MODERN COLOR PALETTE (Soft Pastels)
  colors: {
    primary: '#4A5568',      // Slate gray (for text)
    secondary: '#E0AFA0',    // Rose gold
    accent: '#D4A5A5',       // Soft rose
    
    text: {
      primary: '#1A202C',    // Very dark gray (readable)
      secondary: '#4A5568',  // Slate gray
      heading: '#2D3748',    // Dark gray
      inverse: '#FFFFFF',    // White
    },
    
    background: {
      primary: '#F5F7FA',    // Very light blue-gray
      secondary: '#FAFBFC',  // Almost white
      card: 'rgba(224, 175, 160, 0.05)',  // Very subtle rose tint
      overlay: 'rgba(255, 255, 255, 0.95)',
    },
    
    border: {
      light: 'rgba(224, 175, 160, 0.25)',
      medium: 'rgba(224, 175, 160, 0.45)',
      heavy: '#E0AFA0',
    },
  },
  
  fonts: {
    heading: {
      english: 'Poppins',
      gujarati: 'Noto Sans Gujarati',
    },
    body: {
      english: 'Inter',
      gujarati: 'Noto Sans Gujarati',
    },
    decorative: 'Dancing Script',
    sizes: {
      xs: '0.75rem', sm: '0.875rem', base: '1rem', lg: '1.125rem',
      xl: '1.25rem', '2xl': '1.5rem', '3xl': '1.875rem', '4xl': '2.25rem',
    },
    weights: { normal: 300, medium: 400, semibold: 500, bold: 600 },
  },
  
  spacing: {
    container: { mobile: '1rem', tablet: '2rem', desktop: '3rem' },
    section: { gap: '2.5rem', padding: '2rem' },
    element: { tight: '0.5rem', normal: '1rem', relaxed: '1.5rem' },
  },
  
  borders: {
    radius: { none: '0', sm: '0.5rem', md: '0.75rem', lg: '1rem', full: '9999px' },
    width: { thin: '1px', normal: '1px', thick: '2px' },
    style: 'solid',
    decorative: { type: 'minimal', pattern: 'geometric' },
  },
  
  // LIGHT MODERN GRADIENT
  backgrounds: {
    pattern: { type: 'gradient', opacity: 1 },
    gradient: {
      from: '#F5F7FA',      // Very light blue-gray
      via: '#FAFBFC',       // Almost white
      to: '#FFF9F5',        // Warm white
      direction: 'to-br',
    },
    effects: { blur: false, overlay: false, opacity: 1 },
  },
  
  animations: {
    enabled: {
      floatingElements: false, sparkle: false, pulse: true, fadeIn: true,
      slideIn: true, shineEffect: false, decorativeCorner: false, confettiBurst: false,
    },
    speed: 'fast',
    floatingEmojis: [],
  },
  
  sectionStyles: {
    header: {
      backgroundColor: 'rgba(224, 175, 160, 0.08)',
      borderColor: '#E0AFA0',
      padding: '3rem 2rem',
      borderRadius: '1rem',
    },
    blessing: {
      backgroundColor: 'rgba(224, 175, 160, 0.05)',
      borderColor: 'rgba(224, 175, 160, 0.35)',
      textColor: '#4A5568',
    },
    'event-main': {
      backgroundColor: 'rgba(224, 175, 160, 0.06)',
      borderColor: '#E0AFA0',
    },
  },
}
