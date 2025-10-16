/**
 * Animation Library - Unified Export
 * 
 * All animation presets from GSAP, Anime.js, and custom effects
 */

// GSAP Setup (auto-initializes)
import './gsap-setup';

// GSAP Presets
export * as GsapText from './gsap/presets/text';
export * as GsapScroll from './gsap/presets/scroll';
export * as GsapHover from './gsap/presets/hover';

// Anime.js Presets  
export * as AnimePresets from './anime/presets';

/**
 * Animation Registry
 * 
 * Central registry of all available animations
 * Used by Craft.js editor for animation selection
 */
export const animationRegistry = {
  gsap: {
    text: {
      fadeSlideUp: 'Fade + Slide Up',
      typewriter: 'Typewriter Effect',
      wordReveal: 'Word Reveal',
      letterStagger: 'Letter Stagger',
      glitchText: 'Glitch Effect',
      fadeFromSides: 'Fade From Sides',
      bounceLetters: 'Bounce Letters',
    },
    scroll: {
      scrollFadeIn: 'Scroll Fade In',
      parallax: 'Parallax Effect',
      pinSection: 'Pin Section',
      scrollRevealScale: 'Reveal with Scale',
      horizontalScroll: 'Horizontal Scroll',
      scrollProgress: 'Progress Indicator',
      staggerScroll: 'Stagger on Scroll',
      rotateOnScroll: 'Rotate on Scroll',
    },
    hover: {
      hoverScale: 'Hover Scale',
      magneticHover: 'Magnetic Hover',
      hoverLift: 'Lift on Hover',
      hoverTilt3D: '3D Tilt',
      hoverGlow: 'Glow Effect',
    },
  },
  anime: {
    bounceIn: 'Bounce In',
    slideRotate: 'Slide Rotate',
    pulse: 'Pulse Effect',
    letterStagger: 'Letter Stagger',
    textWave: 'Text Wave',
    staggerGrid: 'Grid Stagger',
    followPath: 'Follow Path',
    drawLine: 'Draw Line',
    elasticBounce: 'Elastic Bounce',
    fadeSlide: 'Fade Slide',
  },
  custom: {
    shimmerText: 'Shimmer Text (Gold)',
    card3DFlip: '3D Card Flip',
    magneticElement: 'Magnetic Element',
    parallaxSection: 'Parallax Layers',
    curtainReveal: 'Curtain Reveal',
    fadeInStagger: 'Fade In Stagger',
    typographyReveal: 'Typography Reveal',
    gradientFlow: 'Gradient Flow',
  },
};

/**
 * Get total animation count
 */
export function getAnimationCount() {
  const gsapCount = Object.values(animationRegistry.gsap).reduce(
    (acc, category) => acc + Object.keys(category).length, 
    0
  );
  const animeCount = Object.keys(animationRegistry.anime).length;
  const customCount = Object.keys(animationRegistry.custom).length;
  
  return {
    gsap: gsapCount,
    anime: animeCount,
    custom: customCount,
    total: gsapCount + animeCount + customCount,
  };
}
