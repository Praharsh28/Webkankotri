import type { KankotriTheme, ThemeId, AppliedTheme, ThemeCustomization } from '@/types/theme'
import { traditionalTheme } from './traditional'
import { royalTheme } from './royal'
import { modernTheme } from './modern'
import { traditionalLightTheme } from './traditional-light'
import { royalLightTheme } from './royal-light'
import { modernLightTheme } from './modern-light'

// All available themes
export const THEMES: Record<ThemeId, KankotriTheme> = {
  'traditional': traditionalTheme,
  'royal': royalTheme,
  'modern': modernTheme,
  'traditional-light': traditionalLightTheme,
  'royal-light': royalLightTheme,
  'modern-light': modernLightTheme,
}

// Array of all themes (for listing)
export const ALL_THEMES: KankotriTheme[] = [
  traditionalTheme,
  royalTheme,
  modernTheme,
  traditionalLightTheme,
  royalLightTheme,
  modernLightTheme,
]

// Get theme by ID
export function getTheme(themeId: ThemeId): KankotriTheme {
  return THEMES[themeId]
}

// Get all free themes
export function getFreeThemes(): KankotriTheme[] {
  return ALL_THEMES.filter(theme => !theme.isPremium)
}

// Get all premium themes
export function getPremiumThemes(): KankotriTheme[] {
  return ALL_THEMES.filter(theme => theme.isPremium)
}

// Get featured themes
export function getFeaturedThemes(): KankotriTheme[] {
  return ALL_THEMES.filter(theme => theme.isFeatured)
}

// Apply customizations to a theme
export function applyCustomizations(
  baseThemeId: ThemeId,
  customizations?: ThemeCustomization
): AppliedTheme {
  const baseTheme = getTheme(baseThemeId)
  
  if (!customizations) {
    return { ...baseTheme }
  }
  
  // Deep clone the theme
  const appliedTheme: AppliedTheme = JSON.parse(JSON.stringify(baseTheme))
  
  // Apply color overrides
  if (customizations.colorOverrides) {
    if (customizations.colorOverrides.primary) {
      appliedTheme.colors.primary = customizations.colorOverrides.primary
    }
    if (customizations.colorOverrides.secondary) {
      appliedTheme.colors.secondary = customizations.colorOverrides.secondary
    }
    if (customizations.colorOverrides.accent) {
      appliedTheme.colors.accent = customizations.colorOverrides.accent
    }
  }
  
  // Apply font overrides
  if (customizations.fontOverrides) {
    if (customizations.fontOverrides.headingEnglish) {
      appliedTheme.fonts.heading.english = customizations.fontOverrides.headingEnglish
    }
    if (customizations.fontOverrides.headingGujarati) {
      appliedTheme.fonts.heading.gujarati = customizations.fontOverrides.headingGujarati
    }
  }
  
  // Apply animation overrides
  if (customizations.animationOverrides) {
    if (customizations.animationOverrides.enabled !== undefined) {
      // Disable/enable all animations
      const enabled = customizations.animationOverrides.enabled
      Object.keys(appliedTheme.animations.enabled).forEach(key => {
        appliedTheme.animations.enabled[key as keyof typeof appliedTheme.animations.enabled] = enabled
      })
    }
    if (customizations.animationOverrides.speed) {
      appliedTheme.animations.speed = customizations.animationOverrides.speed
    }
  }
  
  // Store customizations
  appliedTheme.customizations = customizations
  
  return appliedTheme
}

// Get theme CSS variables for use in components
export function getThemeCSSVariables(theme: KankotriTheme): Record<string, string> {
  return {
    // Colors
    '--theme-primary': theme.colors.primary,
    '--theme-secondary': theme.colors.secondary,
    '--theme-accent': theme.colors.accent,
    '--theme-text-primary': theme.colors.text.primary,
    '--theme-text-secondary': theme.colors.text.secondary,
    '--theme-text-heading': theme.colors.text.heading,
    '--theme-bg-primary': theme.colors.background.primary,
    '--theme-bg-secondary': theme.colors.background.secondary,
    '--theme-bg-card': theme.colors.background.card,
    '--theme-border-light': theme.colors.border.light,
    '--theme-border-medium': theme.colors.border.medium,
    '--theme-border-heavy': theme.colors.border.heavy,
    
    // Fonts
    '--theme-font-heading': theme.fonts.heading.english,
    '--theme-font-heading-gu': theme.fonts.heading.gujarati,
    '--theme-font-body': theme.fonts.body.english,
    '--theme-font-body-gu': theme.fonts.body.gujarati,
    '--theme-font-decorative': theme.fonts.decorative,
    
    // Spacing
    '--theme-section-gap': theme.spacing.section.gap,
    '--theme-section-padding': theme.spacing.section.padding,
    
    // Borders
    '--theme-border-radius': theme.borders.radius.md,
    '--theme-border-width': theme.borders.width.normal,
  }
}

// Export individual themes for direct import
export { traditionalTheme, royalTheme, modernTheme, traditionalLightTheme, royalLightTheme, modernLightTheme }
