/**
 * Modern Kankotri Configuration
 * 
 * Minimalist color palette, modern typography, clean design
 */

import type { KankotriConfig } from '@/types/v2/kankotri';

export const modernKankotriConfig: KankotriConfig = {
  // Modern neutral colors
  colors: {
    primary: '#1a1a1a',      // Near black
    secondary: '#666666',    // Medium gray
    accent: '#2563eb',       // Modern blue
    background: '#ffffff',   // Pure white
    text: '#1a1a1a',         // Near black
  },

  // Modern fonts (sans-serif focused)
  fonts: {
    gujarati: "'Noto Sans Gujarati', sans-serif",
    hindi: "'Noto Sans Devanagari', sans-serif",
    english: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    decorative: "'Playfair Display', serif",
  },

  // Minimal symbols
  symbols: {
    ganesh: false,
    om: true,
    swastika: false,
    kalash: false,
    lotus: false,
  },

  // Minimal decorations
  decorations: {
    borders: 'minimal',
    corners: 'none',
    dividers: true,
  },

  // Clean background
  background: {
    pattern: 'plain',
    opacity: 0,
  },

  // Content settings
  content: {
    language: 'mixed',
    showPhotos: true,
    ceremoniesCount: 4,
  },
};
