/**
 * Animation System Types for WebKankotri V2
 * 
 * Defines TypeScript interfaces for all animation components
 */

import type { ReactNode, CSSProperties } from 'react';

/**
 * Common animation props shared across components
 */
export interface BaseAnimationProps {
  /** Additional CSS classes */
  className?: string;
  /** Inline styles */
  style?: CSSProperties;
  /** Should animation be disabled? (useful for low-end devices) */
  disabled?: boolean;
}

/**
 * Device capability detection results
 */
export interface DeviceCapabilities {
  /** Is mobile device? */
  isMobile: boolean;
  /** Is low-end device? (< 4 CPU cores) */
  isLowEnd: boolean;
  /** Has good network connection? */
  hasGoodConnection: boolean;
  /** Can play video? */
  canPlayVideo: boolean;
}

/**
 * Particle animation types
 */
export type ParticleType = 'petals' | 'sparkles' | 'custom';
export type ParticleSpeed = 'slow' | 'normal' | 'fast';

/**
 * Animation trigger types
 */
export type AnimationTrigger = 'auto' | 'scroll' | 'click' | 'hover';

/**
 * Animation intensity levels
 */
export type AnimationIntensity = 'low' | 'medium' | 'high';

/**
 * Parallax direction
 */
export type ParallaxDirection = 'vertical' | 'horizontal';

/**
 * Countdown timer style
 */
export type CountdownStyle = 'elegant' | 'modern' | 'minimal';

/**
 * Carousel effect types
 */
export type CarouselEffect = '3d-coverflow' | 'fade' | 'slide' | 'cube';

/**
 * Audio player control types
 */
export type AudioControls = 'full' | 'minimal' | 'none';

/**
 * Position types for floating elements
 */
export type CornerPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
