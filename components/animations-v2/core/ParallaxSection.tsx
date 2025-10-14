'use client';

import { useRef, type ReactNode, type CSSProperties } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import type { ParallaxDirection } from '@/types/v2/animation';

/**
 * ParallaxSection Component
 * 
 * Creates smooth parallax scrolling effect for content.
 * Can be disabled on mobile devices for better performance.
 * 
 * @example
 * ```tsx
 * <ParallaxSection speed={0.5}>
 *   <h1>Beautiful Heading</h1>
 * </ParallaxSection>
 * ```
 * 
 * Speed Guide:
 * - 0: No parallax (normal scroll)
 * - 0.5: Subtle effect (recommended)
 * - 1: Strong effect
 * - Negative values: Reverse direction
 * 
 * Performance:
 * - Uses Framer Motion's optimized transforms
 * - Can be disabled on mobile
 * - Uses will-change for better performance
 */

export interface ParallaxSectionProps {
  /** Content to apply parallax effect to */
  children: ReactNode;
  /** Parallax speed multiplier (-1 to 1). Default: 0.5 */
  speed?: number;
  /** Direction of parallax movement */
  direction?: ParallaxDirection;
  /** Should parallax be disabled? (useful for mobile) */
  disabled?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Inline styles */
  style?: CSSProperties;
}

/**
 * Detects if device is mobile
 */
function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768;
}

export function ParallaxSection({
  children,
  speed = 0.5,
  direction = 'vertical',
  disabled = false,
  className = '',
  style,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = isMobileDevice();

  // Get scroll progress of this element
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Transform scroll progress to movement
  // speed of 0.5 means element moves half as fast as scroll
  const range = 100 * speed;
  const y = useTransform(scrollYProgress, [0, 1], [-range, range]);
  const x = useTransform(scrollYProgress, [0, 1], [-range, range]);

  // Disable parallax if requested or on mobile
  const shouldDisableParallax = disabled || isMobile;

  if (shouldDisableParallax) {
    return (
      <div ref={ref} className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        ...style,
        [direction === 'vertical' ? 'y' : 'x']: direction === 'vertical' ? y : x,
        willChange: 'transform', // Performance hint
      }}
    >
      {children}
    </motion.div>
  );
}
