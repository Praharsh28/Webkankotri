/**
 * Royal Template Configuration
 * 
 * User can edit this file to customize the Royal template.
 * All settings are config-driven for easy maintenance.
 */

import type { TemplateConfig } from '@/types/v2/template';

export const royalConfig: TemplateConfig = {
  // OLD MONEY AESTHETIC - 2025 luxury trends
  colors: {
    primary: '#0d1117',      // True black-navy (heritage, timeless)
    secondary: '#d4af37',    // Classic gold (understated luxury)
    accent: '#f5f5f0',       // Cream/ivory (soft, elegant)
    background: '#0a0a0a',   // Pure black (drama, sophistication)
  },

  // Premium Typography Hierarchy
  fonts: {
    heading: 'Cormorant Garamond', // OLD MONEY serif (display)
    body: 'Montserrat',            // Modern, clean sans-serif
  },

  // Minimal Features - Quiet Luxury
  features: {
    videoBackground: true,   // Ambient only, very subtle
    audioPlayer: false,      // No audio - user choice
    particles: true,         // BARELY noticeable (5-8 only)
    fireworks: true,         // RSVP celebration only
    parallax: false,         // No - too distracting
    countdown: true,         // Timeless countdown
  },

  // Ultra-Subtle Animations
  animations: {
    particleCount: 6,                // MINIMAL (just 6)
    particleSpeed: 'slow',           // Very slow drift
    particleEmojis: ['✨'],          // Tiny sparkles only
    parallaxSpeed: 0.2,              // Barely noticeable
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
