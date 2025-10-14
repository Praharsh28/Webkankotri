/**
 * Traditional Kankotri Configuration
 * 
 * Based on traditional Gujarati wedding invitations:
 * - Cream/beige paper texture
 * - Green and gold traditional colors
 * - Religious symbols
 * - Multi-page format
 */

import type { KankotriConfig } from '@/types/v2/kankotri';

export const kankotriConfig: KankotriConfig = {
  // Traditional Sacred Colors
  colors: {
    primary: '#2d5016',      // Temple green (पवित्र हरा)
    secondary: '#d4af37',    // Temple gold (सोने का)
    accent: '#c41e3a',       // Sacred red (पवित्र लाल)
    background: '#f5f5dc',   // Cream/beige (कागज)
    text: '#3e2723',         // Dark brown (भूरा)
  },
  
  // Gujarati Font Support
  fonts: {
    gujarati: 'Noto Sans Gujarati',     // ગુજરાતી
    hindi: 'Noto Sans Devanagari',      // हिंदी
    english: 'Cormorant Garamond',      // English (elegant serif)
    decorative: 'Noto Serif Gujarati',  // For special text
  },
  
  // Religious Symbols (Pavitra Chinh)
  symbols: {
    ganesh: true,      // 🕉️ Ganesh - Obstacle remover
    om: true,          // ॐ Om - Sacred sound
    swastika: true,    // 卐 Swastika - Auspicious
    kalash: true,      // Kalash - Holy pot
    lotus: true,       // Lotus - Purity
  },
  
  // Traditional Decorations
  decorations: {
    borders: 'floral',       // Floral vine borders
    corners: 'leaves',       // Palm leaves in corners
    dividers: true,          // Ornate dividers between sections
  },
  
  // Paper Texture Background
  background: {
    pattern: 'paper',        // Textured paper effect
    opacity: 0.95,           // Slight transparency
  },
  
  // Content Settings
  content: {
    language: 'gujarati',    // Primary language
    showPhotos: true,        // Cover photo
    ceremoniesCount: 4,      // Default ceremony count
  },
};

// Default page configuration
export const defaultPages = {
  cover: true,           // Page 1: Photo + Names + Date
  invocation: true,      // Page 2: Ganesh + Host families
  invitation: true,      // Page 3: Gujarati invitation text
  ceremonies: true,      // Page 4: Multiple ceremonies
  families: false,       // Page 5: Family lists (optional)
  blessings: false,      // Page 6: Elders (optional)
  venue: true,           // Page 7: Venue details
};

export default kankotriConfig;
