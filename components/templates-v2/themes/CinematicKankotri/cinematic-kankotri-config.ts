/**
 * Cinematic Kankotri Configuration
 * 
 * Ultra-premium cinematic color palette and settings
 */

import type { KankotriConfig } from '@/types/v2/kankotri';

export const cinematicKankotriConfig: KankotriConfig = {
  // Cinematic colors (black + gold)
  colors: {
    primary: '#ffd700',      // Pure gold
    secondary: '#1a1a1a',    // Near black
    accent: '#ff6b35',       // Cinematic orange-red
    background: '#000000',   // Pure black
    text: '#ffffff',         // Pure white
  },

  // Cinematic fonts
  fonts: {
    gujarati: "'Noto Sans Gujarati', sans-serif",
    hindi: "'Noto Sans Devanagari', sans-serif",
    english: "'Cinzel', 'Playfair Display', serif",  // Elegant, cinematic
    decorative: "'Cinzel Decorative', 'Playfair Display', serif",
  },

  // No traditional symbols (modern cinematic)
  symbols: {
    ganesh: false,
    om: false,
    swastika: false,
    kalash: false,
    lotus: false,
  },

  // Minimal decorations (focus on animations)
  decorations: {
    borders: 'minimal',
    corners: 'none',
    dividers: false,
  },

  // Black cinematic background
  background: {
    pattern: 'plain',
    opacity: 1,
  },

  // Content settings
  content: {
    language: 'mixed',
    showPhotos: true,
    ceremoniesCount: 5,
  },
};
