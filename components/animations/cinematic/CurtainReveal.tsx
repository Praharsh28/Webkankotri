/**
 * Curtain Reveal - Cinematic Page Transitions
 * Elegant wipe/curtain effects between sections
 */

'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CurtainRevealProps {
  children: ReactNode;
  direction?: 'left' | 'right' | 'top' | 'bottom';
  color?: string;
  duration?: number;
  className?: string;
}

export function CurtainReveal({ 
  children, 
  direction = 'right',
  color = '#d4af37',  // Gold
  duration = 1.2,
  className = '' 
}: CurtainRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const curtain = curtainRef.current;
    if (!container || !curtain) return;

    // Initial state
    gsap.set(curtain, {
      [direction === 'left' || direction === 'right' ? 'scaleX' : 'scaleY']: 1,
      transformOrigin: direction === 'left' ? 'right' :
                      direction === 'right' ? 'left' :
                      direction === 'top' ? 'bottom' : 'top',
    });

    // Create scroll-triggered animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        end: 'top 20%',
        scrub: 1,
      },
    });

    tl.to(curtain, {
      [direction === 'left' || direction === 'right' ? 'scaleX' : 'scaleY']: 0,
      duration,
      ease: 'power3.inOut',
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [direction, duration]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Curtain overlay */}
      <div
        ref={curtainRef}
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ backgroundColor: color }}
      />
      
      {/* Content */}
      <div className="relative z-0">
        {children}
      </div>
    </div>
  );
}
