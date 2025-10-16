/**
 * Fade In Stagger - Cinematic Sequential Reveals
 * Elements fade in one after another with smooth timing
 */

'use client';

import { useEffect, useRef, Children, cloneElement, ReactElement } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FadeInStaggerProps {
  children: React.ReactNode;
  stagger?: number;
  duration?: number;
  ease?: string;
  from?: 'bottom' | 'top' | 'left' | 'right';
  className?: string;
}

export function FadeInStagger({ 
  children, 
  stagger = 0.15,
  duration = 0.8,
  ease = 'power3.out',
  from = 'bottom',
  className = '' 
}: FadeInStaggerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.children;
    if (elements.length === 0) return;

    // Set initial state based on direction
    const initialState: any = { opacity: 0 };
    switch (from) {
      case 'bottom':
        initialState.y = 40;
        break;
      case 'top':
        initialState.y = -40;
        break;
      case 'left':
        initialState.x = -40;
        break;
      case 'right':
        initialState.x = 40;
        break;
    }

    gsap.set(elements, initialState);

    // Animate on scroll
    ScrollTrigger.create({
      trigger: container,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(elements, {
          opacity: 1,
          x: 0,
          y: 0,
          duration,
          stagger,
          ease,
        });
      },
      once: true,
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [stagger, duration, ease, from]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
