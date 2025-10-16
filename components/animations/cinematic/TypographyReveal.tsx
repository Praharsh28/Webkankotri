/**
 * Typography Reveal - Cinematic Text Animation
 * Letter-by-letter or word-by-word reveals with GSAP
 */

'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TypographyRevealProps {
  children: ReactNode;
  type?: 'chars' | 'words' | 'lines';
  stagger?: number;  // Delay between each element
  duration?: number;
  ease?: string;
  className?: string;
}

export function TypographyReveal({ 
  children, 
  type = 'chars',
  stagger = 0.03,
  duration = 0.6,
  ease = 'power3.out',
  className = '' 
}: TypographyRevealProps) {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    // Simple fade-in animation (no text splitting needed)
    gsap.set(element, { 
      opacity: 0, 
      y: 30,
    });

    // Animate on scroll
    ScrollTrigger.create({
      trigger: element,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(element, {
          opacity: 1,
          y: 0,
          duration,
          ease,
        });
      },
      once: true,
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [stagger, duration, ease]);

  return (
    <div ref={textRef} className={className}>
      {children}
    </div>
  );
}
