/**
 * 3D Card Flip - Cinematic 3D Rotation
 * Cards flip in 3D space with GSAP
 */

'use client';

import { useEffect, useRef, ReactNode, useState } from 'react';
import { gsap } from 'gsap';
import { hasHoverCapability } from '@/lib/utils/device-detection';

interface Card3DFlipProps {
  children: ReactNode;
  front?: ReactNode;
  back?: ReactNode;
  duration?: number;
  className?: string;
}

export function Card3DFlip({ 
  children, 
  front,
  back,
  duration = 0.8,
  className = '' 
}: Card3DFlipProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    setCanHover(hasHoverCapability());
  }, []);

  const handleFlip = () => {
    if (!canHover) return; // Only on desktop
    
    const newFlipped = !isFlipped;
    setIsFlipped(newFlipped);

    gsap.to(cardRef.current, {
      rotationY: newFlipped ? 180 : 0,
      duration,
      ease: 'power2.inOut',
    });
  };

  if (!front && !back) {
    // Simple 3D hover tilt
    return (
      <div
        ref={cardRef}
        className={className}
        style={{
          transformStyle: 'preserve-3d',
          perspective: '1000px',
        }}
        onMouseEnter={() => canHover && gsap.to(cardRef.current, {
          rotationY: 5,
          rotationX: -5,
          duration: 0.3,
          ease: 'power2.out',
        })}
        onMouseLeave={() => canHover && gsap.to(cardRef.current, {
          rotationY: 0,
          rotationX: 0,
          duration: 0.3,
          ease: 'power2.out',
        })}
      >
        {children}
      </div>
    );
  }

  // Full flip card
  return (
    <div
      className={`relative ${className}`}
      style={{ perspective: '1000px' }}
      onClick={handleFlip}
    >
      <div
        ref={cardRef}
        style={{
          transformStyle: 'preserve-3d',
          transition: 'none', // GSAP handles animation
        }}
      >
        {/* Front */}
        <div
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          {front || children}
        </div>

        {/* Back */}
        {back && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            {back}
          </div>
        )}
      </div>
    </div>
  );
}
