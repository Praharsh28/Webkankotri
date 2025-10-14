import { KankotriTheme } from '@/types/theme'

// LIGHT ELEGANT: White & Slate (White Background)
export const modernLightTheme: KankotriTheme = {
  id: 'modern-light',
  name: 'Modern Light',
  description: 'Clean white and slate - contemporary sophistication',
  category: 'modern',
  
  price: 149,
  isPremium: true,
  isFeatured: false,
  
  previewImage: '/previews/modern-light.jpg',
  previewColors: ['#FAFBFC', '#334155', '#EC4899'],
  
  // LIGHT COLOR PALETTE
  colors: {
    primary: '#334155',      // Slate (for text)
    secondary: '#EC4899',    // Pink accent
    accent: '#8B5CF6',       // Purple accent
    
    text: {
      primary: '#1E293B',    // Very dark slate (readable)
      secondary: '#475569',  // Medium slate
      heading: '#0F172A',    // Almost black slate
      inverse: '#FFFFFF',    // White
    },
    
    background: {
      primary: '#FAFBFC',    // Cool off-white
      secondary: '#F1F5F9',  // Light gray
      card: 'rgba(51, 65, 85, 0.03)',  // Very subtle slate tint
      overlay: 'rgba(255, 255, 255, 0.95)',
    },
    
    border: {
      light: 'rgba(236, 72, 153, 0.20)',
      medium: 'rgba(139, 92, 246, 0.30)',
      heavy: '#EC4899',
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
  
  // LIGHT GRADIENT
  backgrounds: {
    pattern: { type: 'gradient', opacity: 1 },
    gradient: {
      from: '#FAFBFC',     // Cool white
      via: '#F8FAFC',      // Very light
      to: '#F1F5F9',       // Light gray
      direction: 'to-br',
    },
    effects: { blur: false, overlay: false, opacity: 1 },
  },
  
  animations: {
    enabled: {
      floatingElements: true, sparkle: true, pulse: true, fadeIn: true,
      slideIn: true, shineEffect: true, decorativeCorner: true, confettiBurst: false,
    },
    speed: 'fast',
    floatingEmojis: ['✨', '💫', '⭐', '🌟'],
  },
  
  sectionStyles: {
    header: {
      backgroundColor: 'rgba(236, 72, 153, 0.05)',
      borderColor: 'rgba(236, 72, 153, 0.25)',
      padding: '3rem 2rem',
      borderRadius: '1rem',
    },
    blessing: {
      backgroundColor: 'rgba(139, 92, 246, 0.04)',
      borderColor: 'rgba(139, 92, 246, 0.20)',
      textColor: '#475569',
    },
    'event-main': {
      backgroundColor: 'rgba(51, 65, 85, 0.03)',
      borderColor: 'rgba(236, 72, 153, 0.25)',
    },
  },
}
