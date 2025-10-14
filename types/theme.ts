// Theme System Type Definitions

export type ThemeId = 
  | 'traditional' 
  | 'royal' 
  | 'modern' 
  | 'traditional-light' 
  | 'royal-light' 
  | 'modern-light'

export interface ColorTheme {
  // Primary colors
  primary: string      // Main theme color
  secondary: string    // Secondary accent
  accent: string       // Highlight color
  
  // Text colors
  text: {
    primary: string    // Main text
    secondary: string  // Muted text
    heading: string    // Headings
    inverse: string    // Text on dark bg
  }
  
  // Background colors
  background: {
    primary: string    // Main background
    secondary: string  // Alternate background
    card: string       // Card/section background
    overlay: string    // Overlay/modal background
  }
  
  // Border colors
  border: {
    light: string
    medium: string
    heavy: string
  }
}

export interface FontTheme {
  // Font families
  heading: {
    english: string    // English headings
    gujarati: string   // Gujarati headings
  }
  body: {
    english: string    // English body text
    gujarati: string   // Gujarati body text
  }
  decorative: string   // Decorative/script font
  
  // Font sizes
  sizes: {
    xs: string
    sm: string
    base: string
    lg: string
    xl: string
    '2xl': string
    '3xl': string
    '4xl': string
  }
  
  // Font weights
  weights: {
    normal: number
    medium: number
    semibold: number
    bold: number
  }
}

export interface SpacingTheme {
  // Container padding
  container: {
    mobile: string
    tablet: string
    desktop: string
  }
  
  // Section spacing
  section: {
    gap: string        // Gap between sections
    padding: string    // Section internal padding
  }
  
  // Element spacing
  element: {
    tight: string
    normal: string
    relaxed: string
  }
}

export interface BorderTheme {
  // Border styles
  radius: {
    none: string
    sm: string
    md: string
    lg: string
    full: string
  }
  
  width: {
    thin: string
    normal: string
    thick: string
  }
  
  // Border decorations
  style: 'solid' | 'dashed' | 'dotted' | 'double' | 'none'
  
  // Special decorative borders
  decorative: {
    type: 'ornate' | 'minimal' | 'elegant' | 'none'
    pattern?: string   // Pattern/motif to use
  }
}

export interface BackgroundTheme {
  // Background patterns
  pattern: {
    type: 'none' | 'gradient' | 'texture' | 'mandala' | 'paisley'
    opacity: number
  }
  
  // Gradient configurations
  gradient: {
    from: string
    via?: string
    to: string
    direction: 'to-b' | 'to-r' | 'to-br' | 'to-tr'
  }
  
  // Background effects
  effects: {
    blur: boolean
    overlay: boolean
    opacity: number
  }
}

export interface AnimationPreset {
  // Which animations to enable
  enabled: {
    floatingElements: boolean
    sparkle: boolean
    pulse: boolean
    fadeIn: boolean
    slideIn: boolean
    shineEffect: boolean
    decorativeCorner: boolean
    confettiBurst: boolean
  }
  
  // Animation speeds
  speed: 'slow' | 'normal' | 'fast'
  
  // Floating element emojis (if enabled)
  floatingEmojis?: string[]
}

export interface SectionStyleOverride {
  // Override specific section styles
  backgroundColor?: string
  borderColor?: string
  textColor?: string
  padding?: string
  borderRadius?: string
  customClass?: string
}

export interface KankotriTheme {
  // Theme identification
  id: ThemeId
  name: string
  description: string
  category: 'traditional' | 'modern' | 'elegant' | 'festive'
  
  // Pricing
  price: number        // 0 for free, price for premium
  isPremium: boolean
  isFeatured: boolean
  
  // Preview
  previewImage: string
  previewColors: string[]  // Quick color preview
  
  // Theme styling
  colors: ColorTheme
  fonts: FontTheme
  spacing: SpacingTheme
  borders: BorderTheme
  backgrounds: BackgroundTheme
  animations: AnimationPreset
  
  // Section-specific style overrides (optional)
  sectionStyles?: {
    header?: SectionStyleOverride
    blessing?: SectionStyleOverride
    parents?: SectionStyleOverride
    'event-main'?: SectionStyleOverride
    'event-mehendi'?: SectionStyleOverride
    'event-sangeet'?: SectionStyleOverride
    'event-haldi'?: SectionStyleOverride
    'event-reception'?: SectionStyleOverride
    message?: SectionStyleOverride
    'custom-text'?: SectionStyleOverride
    'family-list'?: SectionStyleOverride
    gallery?: SectionStyleOverride
    timeline?: SectionStyleOverride
    map?: SectionStyleOverride
    hotels?: SectionStyleOverride
    'dress-code'?: SectionStyleOverride
    rsvp?: SectionStyleOverride
    contact?: SectionStyleOverride
  }
}

// User's theme customizations
export interface ThemeCustomization {
  baseThemeId: ThemeId
  
  // Color overrides
  colorOverrides?: {
    primary?: string
    secondary?: string
    accent?: string
  }
  
  // Font overrides
  fontOverrides?: {
    headingEnglish?: string
    headingGujarati?: string
  }
  
  // Animation overrides
  animationOverrides?: {
    enabled?: boolean
    speed?: 'slow' | 'normal' | 'fast'
  }
}

// Complete theme with user customizations applied
export interface AppliedTheme extends KankotriTheme {
  customizations?: ThemeCustomization
}
