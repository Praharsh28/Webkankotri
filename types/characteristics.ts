// 🎮 CHARACTERISTIC SYSTEM - Like RPG Stats for Kankotri Components

// ============================================================================
// SECTION CHARACTERISTICS
// ============================================================================

export interface SectionCharacteristics {
  // 🎨 VISUAL
  colors: {
    background: string
    text: string
    accent: string
    border: string
  }
  
  // 📐 LAYOUT
  layout: {
    alignment: 'left' | 'center' | 'right' | 'justify'
    width: 'narrow' | 'medium' | 'wide' | 'full'
    height: 'auto' | 'fixed' | 'viewport'
    columns: 1 | 2 | 3 | 4
    direction: 'row' | 'column'
  }
  
  // 📏 SPACING
  spacing: {
    padding: 'none' | 'sm' | 'md' | 'lg' | 'xl'
    margin: 'none' | 'sm' | 'md' | 'lg' | 'xl'
    gap: 'tight' | 'normal' | 'loose'
  }
  
  // ✏️ TYPOGRAPHY
  typography: {
    fontFamily: string
    fontSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
    fontWeight: 'light' | 'normal' | 'medium' | 'semibold' | 'bold'
    lineHeight: 'tight' | 'normal' | 'loose'
    letterSpacing: 'tight' | 'normal' | 'wide'
    textTransform: 'none' | 'uppercase' | 'lowercase' | 'capitalize'
  }
  
  // 🔲 SHAPE & BORDERS
  shape: {
    borderRadius: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
    borderWidth: 'none' | 'thin' | 'medium' | 'thick'
    borderStyle: 'solid' | 'dashed' | 'dotted' | 'double'
    shadow: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  }
  
  // 🎬 ANIMATIONS
  animations: {
    entrance: 'none' | 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'zoom' | 'bounce'
    duration: 'fast' | 'normal' | 'slow'
    delay: number
    hover: 'none' | 'lift' | 'scale' | 'glow' | 'rotate'
    scroll: 'none' | 'parallax' | 'reveal' | 'sticky'
  }
  
  // 🖼️ BACKGROUND
  background: {
    type: 'solid' | 'gradient' | 'pattern' | 'image'
    opacity: number // 0-100
    blur: 'none' | 'sm' | 'md' | 'lg'
    overlay: boolean
  }
  
  // ✨ EFFECTS
  effects: {
    glow: boolean
    glassmorphism: boolean
    neumorphism: boolean
    particles: boolean
    confetti: boolean
  }
}

// ============================================================================
// TEMPLATE CHARACTERISTICS
// ============================================================================

export interface TemplateCharacteristics {
  // 🏗️ STRUCTURE
  structure: {
    layout: 'single-column' | 'two-column' | 'masonry' | 'card-grid'
    containerWidth: 'narrow' | 'medium' | 'wide' | 'full'
    sectionSpacing: 'tight' | 'normal' | 'loose' | 'dramatic'
    fixedHeader: boolean
    fixedFooter: boolean
  }
  
  // 🎨 GLOBAL STYLE
  globalStyle: {
    backgroundType: 'solid' | 'gradient' | 'pattern' | 'animated'
    pageTransition: 'none' | 'fade' | 'slide' | 'zoom'
    scrollBehavior: 'normal' | 'smooth' | 'parallax'
    cursorStyle: 'default' | 'custom' | 'animated'
  }
  
  // 📱 RESPONSIVE
  responsive: {
    mobileLayout: 'stack' | 'collapse' | 'simplified'
    breakpoints: 'standard' | 'custom'
    touchOptimized: boolean
  }
  
  // 🎭 CULTURAL STYLE
  cultural: {
    ornamentStyle: 'minimal' | 'moderate' | 'elaborate'
    decorativeElements: boolean
    traditionalPatterns: boolean
    modernFusion: boolean
  }
}

// ============================================================================
// THEME CHARACTERISTICS
// ============================================================================

export interface ThemeCharacteristics {
  // 🎨 COLOR PALETTE (Extended)
  colors: {
    primary: string
    secondary: string
    accent: string
    background: {
      primary: string
      secondary: string
      tertiary: string
    }
    text: {
      primary: string
      secondary: string
      muted: string
      inverse: string
    }
    border: {
      light: string
      medium: string
      dark: string
    }
  }
  
  // ✏️ TYPOGRAPHY SYSTEM
  typography: {
    fontFamilies: {
      heading: string
      body: string
      accent: string
      code: string
    }
    scale: {
      xs: string
      sm: string
      md: string
      lg: string
      xl: string
      '2xl': string
      '3xl': string
    }
  }
  
  // 📏 SPACING SCALE
  spacing: {
    scale: number[] // [4, 8, 16, 24, 32, 48, 64, 96]
    unit: 'px' | 'rem' | 'em'
  }
  
  // 🎬 ANIMATION PRESETS
  animations: {
    speed: 'slow' | 'normal' | 'fast'
    easing: 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'bounce'
    intensity: 'subtle' | 'moderate' | 'dramatic'
  }
  
  // 🔲 SHAPE SYSTEM
  shapes: {
    borderRadius: {
      sm: string
      md: string
      lg: string
      full: string
    }
    shadows: {
      sm: string
      md: string
      lg: string
      xl: string
    }
  }
}

// ============================================================================
// DEFAULT PRESETS
// ============================================================================

export const DEFAULT_SECTION_CHARACTERISTICS: SectionCharacteristics = {
  colors: {
    background: 'transparent',
    text: 'inherit',
    accent: 'inherit',
    border: 'rgba(0,0,0,0.1)'
  },
  layout: {
    alignment: 'center',
    width: 'medium',
    height: 'auto',
    columns: 1,
    direction: 'column'
  },
  spacing: {
    padding: 'md',
    margin: 'md',
    gap: 'normal'
  },
  typography: {
    fontFamily: 'inherit',
    fontSize: 'md',
    fontWeight: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    textTransform: 'none'
  },
  shape: {
    borderRadius: 'none',
    borderWidth: 'none',
    borderStyle: 'solid',
    shadow: 'none'
  },
  animations: {
    entrance: 'fade',
    duration: 'normal',
    delay: 0,
    hover: 'none',
    scroll: 'none'
  },
  background: {
    type: 'solid',
    opacity: 100,
    blur: 'none',
    overlay: false
  },
  effects: {
    glow: false,
    glassmorphism: false,
    neumorphism: false,
    particles: false,
    confetti: false
  }
}

export const DEFAULT_TEMPLATE_CHARACTERISTICS: TemplateCharacteristics = {
  structure: {
    layout: 'single-column',
    containerWidth: 'medium',
    sectionSpacing: 'normal',
    fixedHeader: false,
    fixedFooter: false
  },
  globalStyle: {
    backgroundType: 'solid',
    pageTransition: 'none',
    scrollBehavior: 'smooth',
    cursorStyle: 'default'
  },
  responsive: {
    mobileLayout: 'stack',
    breakpoints: 'standard',
    touchOptimized: true
  },
  cultural: {
    ornamentStyle: 'moderate',
    decorativeElements: true,
    traditionalPatterns: true,
    modernFusion: false
  }
}

// ============================================================================
// CHARACTERISTIC PRESETS (For Quick Selection)
// ============================================================================

export const SECTION_PRESETS: Record<string, Partial<SectionCharacteristics>> = {
  minimalist: {
    spacing: { padding: 'lg', margin: 'xl', gap: 'loose' },
    shape: { borderRadius: 'none', shadow: 'none' },
    animations: { entrance: 'fade', duration: 'slow' }
  },
  
  ornate: {
    spacing: { padding: 'md', margin: 'md', gap: 'normal' },
    shape: { borderRadius: 'lg', shadow: 'xl', borderWidth: 'thin' },
    animations: { entrance: 'bounce', duration: 'normal' }
  },
  
  modern: {
    spacing: { padding: 'md', margin: 'lg', gap: 'normal' },
    shape: { borderRadius: 'md', shadow: 'md' },
    animations: { entrance: 'slide-up', duration: 'fast' }
  },
  
  elegant: {
    spacing: { padding: 'lg', margin: 'lg', gap: 'normal' },
    shape: { borderRadius: 'lg', shadow: 'lg' },
    animations: { entrance: 'fade', duration: 'slow' }
  }
}

export const TEMPLATE_PRESETS: Record<string, Partial<TemplateCharacteristics>> = {
  traditional: {
    structure: { layout: 'single-column', sectionSpacing: 'normal' },
    cultural: { ornamentStyle: 'elaborate', traditionalPatterns: true }
  },
  
  modern: {
    structure: { layout: 'two-column', sectionSpacing: 'loose' },
    cultural: { ornamentStyle: 'minimal', modernFusion: true }
  },
  
  minimalist: {
    structure: { layout: 'single-column', sectionSpacing: 'dramatic' },
    cultural: { ornamentStyle: 'minimal', decorativeElements: false }
  }
}
