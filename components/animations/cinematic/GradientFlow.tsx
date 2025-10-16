/**
 * Gradient Flow - Animated Color Gradients
 * Creates living, breathing color effects
 */

'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface GradientFlowProps {
  colors?: string[];
  duration?: number;
  className?: string;
}

export function GradientFlow({ 
  colors = ['#ffd700', '#ff6b35', '#2563eb'],
  duration = 8,
  className = '' 
}: GradientFlowProps) {
  const gradientRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = gradientRef.current;
    if (!element) return;

    // Animate gradient position
    const tl = gsap.timeline({ repeat: -1, yoyo: true });

    tl.to(element, {
      backgroundPosition: '200% 50%',
      duration,
      ease: 'power1.inOut',
    });

    return () => {
      tl.kill();
    };
  }, [duration]);

  return (
    <div
      ref={gradientRef}
      className={`pointer-events-none ${className}`}
      style={{
        background: `linear-gradient(135deg, ${colors.join(', ')})`,
        backgroundSize: '200% 200%',
        backgroundPosition: '0% 50%',
      }}
    />
  );
}

/**
 * Shimmer Text Effect - Premium Gold Shimmer
 */
interface ShimmerTextProps {
  children: React.ReactNode;
  colors?: string[];
  duration?: number;
  className?: string;
}

export function ShimmerText({ 
  children, 
  colors = ['#d4af37', '#ffffff', '#d4af37'],
  duration = 3,
  className = '' 
}: ShimmerTextProps) {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    const tl = gsap.timeline({ repeat: -1 });

    tl.to(element, {
      backgroundPosition: '200% center',
      duration,
      ease: 'linear',
    });

    return () => {
      tl.kill();
    };
  }, [duration]);

  return (
    <span
      ref={textRef}
      className={`inline-block ${className}`}
      style={{
        background: `linear-gradient(90deg, ${colors.join(', ')})`,
        backgroundSize: '200% auto',
        backgroundPosition: '0% center',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}
    >
      {children}
    </span>
  );
}
