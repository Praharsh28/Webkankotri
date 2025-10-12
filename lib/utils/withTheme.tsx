import { KankotriTheme } from '@/types/theme'
import { useThemeStyles } from '@/lib/hooks/useThemeStyles'

/**
 * Higher-order component to wrap sections with default theme styling
 * This provides a fallback theme for sections that haven't been updated yet
 */
export function withDefaultTheme<P extends { theme?: KankotriTheme }>(
  Component: React.ComponentType<P & { theme: KankotriTheme }>
) {
  return function ThemedComponent(props: P) {
    // If no theme provided, use a default minimal theme
    const defaultTheme: KankotriTheme = {
      id: 'traditional',
      name: 'Default',
      description: 'Default theme',
      category: 'traditional',
      price: 0,
      isPremium: false,
      isFeatured: false,
      previewImage: '',
      previewColors: [],
      colors: {
        primary: '#DC2626',
        secondary: '#F59E0B',
        accent: '#FCD34D',
        text: {
          primary: '#FEF3C7',
          secondary: '#FDE68A',
          heading: '#FFFFFF',
          inverse: '#7C2D12',
        },
        background: {
          primary: '#7C2D12',
          secondary: '#991B1B',
          card: 'rgba(254, 243, 199, 0.05)',
          overlay: 'rgba(0, 0, 0, 0.7)',
        },
        border: {
          light: 'rgba(252, 211, 77, 0.2)',
          medium: 'rgba(245, 158, 11, 0.4)',
          heavy: '#F59E0B',
        },
      },
      fonts: {
        heading: { english: 'Playfair Display', gujarati: 'Noto Sans Gujarati' },
        body: { english: 'Inter', gujarati: 'Noto Sans Gujarati' },
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
      backgrounds: {
        pattern: { type: 'gradient', opacity: 1 },
        gradient: { from: '#7C2D12', to: '#7C2D12', direction: 'to-b' },
        effects: { blur: true, overlay: true, opacity: 0.95 },
      },
      animations: {
        enabled: {
          floatingElements: true, sparkle: true, pulse: true, fadeIn: true,
          slideIn: false, shineEffect: true, decorativeCorner: true, confettiBurst: false,
        },
        speed: 'normal',
        floatingEmojis: ['🪔', '✨', '💐', '🌟'],
      },
    }

    const theme = props.theme || defaultTheme
    return <Component {...props} theme={theme} />
  }
}
