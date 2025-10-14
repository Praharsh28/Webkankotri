'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * ScrollTrigger Component
 * 
 * Reveals content with animation when scrolled into view.
 * Multiple animation types available.
 * 
 * @example
 * ```tsx
 * <ScrollTrigger animation="fade-up">
 *   <h2>This fades in and slides up</h2>
 * </ScrollTrigger>
 * ```
 */

export interface ScrollTriggerProps {
  /** Content to animate */
  children: ReactNode;
  /** Animation type */
  animation?: 'fade' | 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'scale' | 'none';
  /** Animation duration in seconds */
  duration?: number;
  /** Delay before animation starts */
  delay?: number;
  /** Trigger animation only once? */
  once?: boolean;
  /** Amount of element that must be visible (0-1) */
  threshold?: number;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Get animation variants based on type
 */
function getAnimationVariants(animation: string) {
  const variants = {
    'fade': {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    'fade-up': {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0 },
    },
    'fade-down': {
      hidden: { opacity: 0, y: -50 },
      visible: { opacity: 1, y: 0 },
    },
    'fade-left': {
      hidden: { opacity: 0, x: 50 },
      visible: { opacity: 1, x: 0 },
    },
    'fade-right': {
      hidden: { opacity: 0, x: -50 },
      visible: { opacity: 1, x: 0 },
    },
    'scale': {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 },
    },
    'none': {
      hidden: {},
      visible: {},
    },
  };

  return variants[animation as keyof typeof variants] || variants['fade-up'];
}

export function ScrollTrigger({
  children,
  animation = 'fade-up',
  duration = 0.6,
  delay = 0,
  once = true,
  threshold = 0.1,
  className = '',
}: ScrollTriggerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: threshold });

  const variants = getAnimationVariants(animation);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{
        duration,
        delay,
        ease: 'easeOut',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * StaggerChildren Component
 * 
 * Animates child elements with staggered timing.
 * 
 * @example
 * ```tsx
 * <StaggerChildren>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </StaggerChildren>
 * ```
 */

export interface StaggerChildrenProps {
  children: ReactNode;
  /** Time between each child animation (seconds) */
  staggerDelay?: number;
  /** Animation type for children */
  animation?: ScrollTriggerProps['animation'];
  /** Trigger only once? */
  once?: boolean;
  /** Additional CSS classes */
  className?: string;
}

export function StaggerChildren({
  children,
  staggerDelay = 0.1,
  animation = 'fade-up',
  once = true,
  className = '',
}: StaggerChildrenProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: 0.1 });

  const variants = getAnimationVariants(animation);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants}
      className={className}
    >
      {Array.isArray(children)
        ? children.map((child, index) => (
            <motion.div key={index} variants={variants}>
              {child}
            </motion.div>
          ))
        : <motion.div variants={variants}>{children}</motion.div>
      }
    </motion.div>
  );
}
