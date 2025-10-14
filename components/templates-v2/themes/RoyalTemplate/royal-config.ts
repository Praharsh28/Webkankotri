/**
 * Royal Template Configuration
 * 
 * User can edit this file to customize the Royal template.
 * All settings are config-driven for easy maintenance.
 */

import type { TemplateConfig } from '@/types/v2/template';

export const royalConfig: TemplateConfig = {
  // Refined color palette - Elegant, emotionally resonant
  colors: {
    primary: '#1a1a2e',      // Deep navy (sophistication, not harsh purple)
    secondary: '#c9a961',    // Muted gold (luxury without garishness)
    accent: '#efd9ce',       // Soft rose (warmth, romance)
    background: '#0f0f1e',   // Almost black navy (elegance)
  },

  // Typography
  fonts: {
    heading: 'Playfair Display',  // Elegant serif
    body: 'Inter',                 // Clean sans-serif
  },

  // Feature toggles - LESS IS MORE
  features: {
    videoBackground: true,   // Yes - sets ambiance
    audioPlayer: false,      // No - let users decide on sound
    particles: true,         // Yes but SUBTLE (fewer, slower)
    fireworks: true,         // Yes - only on RSVP (earned moment)
    parallax: false,         // No - too much movement
    countdown: true,         // Yes - creates anticipation
  },

  // Animation settings - SUBTLE & INTENTIONAL
  animations: {
    particleCount: 20,               // Fewer! Just enough to notice (was 100)
    particleSpeed: 'slow',           // Slow and elegant
    particleEmojis: ['✨'],          // Just sparkles - simpler is better
    parallaxSpeed: 0.3,              // Gentler if enabled
  },

  // Content
  content: {
    heroTitle: 'A Royal Celebration',
    heroSubtitle: 'Join us as we begin our forever',
    videoUrl: '/videos/royal-palace.mp4',
    musicUrl: '/music/royal-theme.mp3',
  },
};

// Export default for easy import
export default royalConfig;
