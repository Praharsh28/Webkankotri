/**
 * Parallax Scroll Effects
 * 
 * Elements move at different speeds
 * Creates depth and dimension
 */

'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ReactNode, useRef } from 'react';

interface ParallaxProps {
  children: ReactNode;
  speed?: number; // 0.5 = slow, 2 = fast
  direction?: 'up' | 'down';
  className?: string;
}

export function ParallaxScroll({ 
  children, 
  speed = 0.5,
  direction = 'up',
  className = '' 
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    direction === 'up' 
      ? [100 * speed, -100 * speed]
      : [-100 * speed, 100 * speed]
  );

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ y }}
    >
      {children}
    </motion.div>
  );
}

// Scale on scroll
export function ScaleOnScroll({ 
  children, 
  className = '' 
}: { 
  children: ReactNode; 
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ scale, opacity }}
    >
      {children}
    </motion.div>
  );
}

// Rotate on scroll
export function RotateOnScroll({ 
  children, 
  degrees = 360,
  className = '' 
}: { 
  children: ReactNode; 
  degrees?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, degrees]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ rotate }}
    >
      {children}
    </motion.div>
  );
}
