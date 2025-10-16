/**
 * Magnetic Element - Elements Follow Cursor
 * Smooth magnetic attraction effect with GSAP
 */

'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';
import { isDesktop } from '@/lib/utils/device-detection';

interface MagneticElementProps {
  children: ReactNode;
  strength?: number;  // 0-1, how strong the magnetic effect
  className?: string;
}

export function MagneticElement({ 
  children, 
  strength = 0.5,
  className = '' 
}: MagneticElementProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const boundingRef = useRef<DOMRect | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || !isDesktop()) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!boundingRef.current) {
        boundingRef.current = element.getBoundingClientRect();
      }

      const rect = boundingRef.current;
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      gsap.to(element, {
        x: deltaX,
        y: deltaY,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)',
      });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}
