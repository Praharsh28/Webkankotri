// Utility to convert characteristics to CSS styles

import type { SectionCharacteristics } from '@/types/characteristics'

// Spacing values
const SPACING_VALUES = {
  none: '0',
  sm: '0.5rem',
  md: '1rem',
  lg: '2rem',
  xl: '3rem'
}

// Width values
const WIDTH_VALUES = {
  narrow: '600px',
  medium: '800px',
  wide: '1000px',
  full: '100%'
}

// Border radius values
const RADIUS_VALUES = {
  none: '0',
  sm: '0.25rem',
  md: '0.5rem',
  lg: '1rem',
  xl: '1.5rem',
  full: '9999px'
}

// Shadow values
const SHADOW_VALUES = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
}

// Font size values
const FONT_SIZE_VALUES = {
  xs: '0.75rem',
  sm: '0.875rem',
  md: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
  '3xl': '1.875rem'
}

// Font weight values
const FONT_WEIGHT_VALUES = {
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700'
}

// Line height values
const LINE_HEIGHT_VALUES = {
  tight: '1.25',
  normal: '1.5',
  loose: '1.75'
}

// Letter spacing values
const LETTER_SPACING_VALUES = {
  tight: '-0.025em',
  normal: '0',
  wide: '0.025em'
}

// Border width values
const BORDER_WIDTH_VALUES = {
  none: '0',
  thin: '1px',
  medium: '2px',
  thick: '4px'
}

// Gap values
const GAP_VALUES = {
  tight: '0.5rem',
  normal: '1rem',
  loose: '2rem'
}

export function applyCharacteristics(
  characteristics: Partial<SectionCharacteristics>
): React.CSSProperties {
  const style: React.CSSProperties = {}

  // Colors
  if (characteristics.colors) {
    if (characteristics.colors.background) {
      style.backgroundColor = characteristics.colors.background
    }
    if (characteristics.colors.text) {
      style.color = characteristics.colors.text
    }
    if (characteristics.colors.border) {
      style.borderColor = characteristics.colors.border
    }
  }

  // Layout
  if (characteristics.layout) {
    if (characteristics.layout.alignment) {
      style.textAlign = characteristics.layout.alignment as any
    }
    if (characteristics.layout.width) {
      style.maxWidth = WIDTH_VALUES[characteristics.layout.width]
    }
    if (characteristics.layout.direction) {
      style.flexDirection = characteristics.layout.direction as any
    }
  }

  // Spacing
  if (characteristics.spacing) {
    if (characteristics.spacing.padding) {
      style.padding = SPACING_VALUES[characteristics.spacing.padding]
    }
    if (characteristics.spacing.margin) {
      style.margin = SPACING_VALUES[characteristics.spacing.margin]
    }
    if (characteristics.spacing.gap) {
      style.gap = GAP_VALUES[characteristics.spacing.gap]
    }
  }

  // Typography
  if (characteristics.typography) {
    if (characteristics.typography.fontFamily) {
      style.fontFamily = characteristics.typography.fontFamily
    }
    if (characteristics.typography.fontSize) {
      style.fontSize = FONT_SIZE_VALUES[characteristics.typography.fontSize]
    }
    if (characteristics.typography.fontWeight) {
      style.fontWeight = FONT_WEIGHT_VALUES[characteristics.typography.fontWeight]
    }
    if (characteristics.typography.lineHeight) {
      style.lineHeight = LINE_HEIGHT_VALUES[characteristics.typography.lineHeight]
    }
    if (characteristics.typography.letterSpacing) {
      style.letterSpacing = LETTER_SPACING_VALUES[characteristics.typography.letterSpacing]
    }
    if (characteristics.typography.textTransform) {
      style.textTransform = characteristics.typography.textTransform as any
    }
  }

  // Shape
  if (characteristics.shape) {
    if (characteristics.shape.borderRadius) {
      style.borderRadius = RADIUS_VALUES[characteristics.shape.borderRadius]
    }
    if (characteristics.shape.borderWidth) {
      style.borderWidth = BORDER_WIDTH_VALUES[characteristics.shape.borderWidth]
    }
    if (characteristics.shape.borderStyle) {
      style.borderStyle = characteristics.shape.borderStyle
    }
    if (characteristics.shape.shadow) {
      style.boxShadow = SHADOW_VALUES[characteristics.shape.shadow]
    }
  }

  // Background
  if (characteristics.background) {
    if (characteristics.background.opacity !== undefined) {
      style.opacity = characteristics.background.opacity / 100
    }
  }

  return style
}

export function getAnimationClass(characteristics: Partial<SectionCharacteristics>): string {
  const classes: string[] = []

  if (characteristics.animations) {
    const { entrance, duration, hover } = characteristics.animations

    // Entrance animations
    if (entrance && entrance !== 'none') {
      classes.push(`animate-${entrance}`)
      if (duration) {
        classes.push(`duration-${duration}`)
      }
    }

    // Hover animations
    if (hover && hover !== 'none') {
      classes.push(`hover:${hover}`)
    }
  }

  return classes.join(' ')
}
