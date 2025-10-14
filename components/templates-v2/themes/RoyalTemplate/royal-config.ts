/**
 * Royal Template Configuration
 * 
 * User can edit this file to customize the Royal template.
 * All settings are config-driven for easy maintenance.
 */

import type { TemplateConfig } from '@/types/v2/template';

export const royalConfig: TemplateConfig = {
  // Color scheme - Deep purple, gold, pink
  colors: {
    primary: '#5D1A8B',      // Deep purple
    secondary: '#D4AF37',    // Gold
    accent: '#FF6B9D',       // Pink
    background: '#0F0019',   // Dark purple background
  },

  // Typography
  fonts: {
    heading: 'Playfair Display',  // Elegant serif for headings
    body: 'Inter',                 // Clean sans-serif for body
  },

  // Feature toggles - Enable/disable features
  features: {
    videoBackground: true,   // Show video background
    audioPlayer: true,       // Show background music player
    particles: true,         // Show floating particles
    fireworks: true,         // Show fireworks on RSVP
    parallax: true,          // Enable parallax scrolling
    countdown: true,         // Show countdown timer
  },

  // Animation settings
  animations: {
    particleCount: 100,              // Number of particles (auto-reduces on mobile)
    particleSpeed: 'slow',           // Animation speed
    particleEmojis: ['👑', '💎', '✨'], // Particle emojis (royal theme)
    parallaxSpeed: 0.5,              // Parallax effect strength (0-1)
  },

  // Content
  content: {
    heroTitle: 'A Royal Celebration',
    heroSubtitle: 'Join us as we begin our forever',
    videoUrl: '/videos/royal-palace.mp4',  // Background video
    musicUrl: '/music/royal-theme.mp3',    // Background music
  },
};

// Export default for easy import
export default royalConfig;
