/**
 * Refined Traditional Color Palette V2
 * 
 * Based on actual Indian wedding card colors:
 * - Deeper, richer tones
 * - More culturally authentic
 * - Better for print (CMYK friendly)
 */

export const authenticKankotriColors = {
  // Primary Colors (Sacred & Auspicious)
  templeGreen: '#1b4d3e',        // Deep forest green (sacred trees)
  sacredGold: '#b8860b',         // DarkGoldenRod (authentic gold)
  kumkumRed: '#9d2235',          // Deep red (kumkum/sindoor)
  weddingSaffron: '#ff9933',     // Saffron (auspicious)
  
  // Background & Paper
  creamPaper: '#f9f6f0',         // Warm cream (handmade paper feel)
  ivorySoft: '#faf7f2',          // Soft ivory
  beigeWarm: '#f5f1e8',          // Warm beige
  
  // Text Colors
  darkBrown: '#3e2723',          // Rich brown (readable)
  goldDark: '#8b6914',           // Dark gold (hierarchy)
  greenDark: '#0d3025',          // Very dark green (contrast)
  
  // Accent Colors
  marigoldYellow: '#ffb300',     // Marigold flower
  roseRed: '#c41e3a',            // Rose/hibiscus
  petalPink: '#f4c2c2',          // Soft pink
  leafGreen: '#4a7c59',          // Medium green
  
  // Metallics (for effects)
  goldHighlight: '#ffd700',      // Bright gold (shimmer)
  goldDeep: '#8b7500',           // Deep gold (shadow)
  bronzeAntique: '#cd7f32',      // Antique bronze
  copperRich: '#b87333',         // Copper accent
  
  // Neutral Shades
  white: '#ffffff',
  offWhite: '#fafaf8',
  lightGray: '#e8e6e1',
  mediumGray: '#c4c0b8',
  charcoal: '#2c2826',
} as const;

// Pre-defined gradient combinations
export const goldGradients = {
  // Multi-layer gold foil effect
  premium: `
    linear-gradient(135deg, 
      #8b7500 0%,
      #b8860b 25%,
      #ffd700 50%,
      #b8860b 75%,
      #8b7500 100%
    )
  `,
  
  // Subtle shimmer
  subtle: `
    linear-gradient(120deg,
      #b8860b 0%,
      #d4af37 50%,
      #b8860b 100%
    )
  `,
  
  // Strong metallic
  metallic: `
    linear-gradient(90deg,
      #8b6914 0%,
      #ffd700 45%,
      #fff 50%,
      #ffd700 55%,
      #8b6914 100%
    )
  `,
};

// Color combinations for different sections
export const sectionColors = {
  cover: {
    background: authenticKankotriColors.creamPaper,
    text: authenticKankotriColors.templeGreen,
    accent: authenticKankotriColors.sacredGold,
    highlight: authenticKankotriColors.kumkumRed,
  },
  
  invocation: {
    background: authenticKankotriColors.ivorySoft,
    text: authenticKankotriColors.darkBrown,
    accent: authenticKankotriColors.weddingSaffron,
    highlight: authenticKankotriColors.sacredGold,
  },
  
  ceremonies: {
    background: authenticKankotriColors.beigeWarm,
    text: authenticKankotriColors.greenDark,
    accent: authenticKankotriColors.marigoldYellow,
    highlight: authenticKankotriColors.roseRed,
  },
};
