import { KankotriTheme } from '@/types/theme'
import { CSSProperties } from 'react'

/**
 * Helper hook to generate theme-based styles
 */
export function useThemeStyles(theme: KankotriTheme) {
  // Helper to create CSS custom properties
  const getCSSVariables = (): CSSProperties => ({
    '--theme-primary': theme.colors.primary,
    '--theme-secondary': theme.colors.secondary,
    '--theme-accent': theme.colors.accent,
    '--theme-text-primary': theme.colors.text.primary,
    '--theme-text-secondary': theme.colors.text.secondary,
    '--theme-text-heading': theme.colors.text.heading,
    '--theme-bg-card': theme.colors.background.card,
    '--theme-border-light': theme.colors.border.light,
    '--theme-border-medium': theme.colors.border.medium,
    '--theme-border-heavy': theme.colors.border.heavy,
  } as CSSProperties)

  // Text color classes
  const text = {
    primary: { color: theme.colors.text.primary },
    secondary: { color: theme.colors.text.secondary },
    heading: { color: theme.colors.text.heading },
  }

  // Background colors
  const bg = {
    primary: { backgroundColor: theme.colors.primary },
    secondary: { backgroundColor: theme.colors.secondary },
    card: { backgroundColor: theme.colors.background.card },
  }

  // Border colors
  const border = {
    light: { borderColor: theme.colors.border.light },
    medium: { borderColor: theme.colors.border.medium },
    heavy: { borderColor: theme.colors.border.heavy },
  }

  // Font families
  const font = {
    headingEn: { fontFamily: theme.fonts.heading.english },
    headingGu: { fontFamily: theme.fonts.heading.gujarati },
    bodyEn: { fontFamily: theme.fonts.body.english },
    bodyGu: { fontFamily: theme.fonts.body.gujarati },
    decorative: { fontFamily: theme.fonts.decorative },
  }

  // Gradient styles
  const gradient = {
    background: {
      background: `linear-gradient(${theme.backgrounds.gradient.direction}, ${theme.backgrounds.gradient.from}, ${theme.backgrounds.gradient.via || theme.backgrounds.gradient.from}, ${theme.backgrounds.gradient.to})`,
    },
    divider: (color: string) => ({
      background: `linear-gradient(to right, transparent, ${color}, transparent)`,
    }),
  }

  return {
    getCSSVariables,
    text,
    bg,
    border,
    font,
    gradient,
    theme, // Return theme for direct access
  }
}
