/**
 * Parallax Section - Cinematic Depth Effect
 * Creates movie-like depth with multiple scroll speeds
 */

'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxSectionProps {
  children: ReactNode;
  speed?: number;  // 0.5 = slow (background), 1.5 = fast (foreground)
  className?: string;
}

export function ParallaxSection({ children, speed = 1, className = '' }: ParallaxSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    // Only enable parallax on desktop (smooth experience)
    if (window.innerWidth < 768) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    tl.to(element, {
      y: (i, target) => {
        // Calculate parallax offset based on speed
        return (speed - 1) * 100;
      },
      ease: 'none',
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [speed]);

  return (
    <div ref={sectionRef} className={className}>
      {children}
    </div>
  );
}
