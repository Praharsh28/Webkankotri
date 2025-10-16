/**
 * Magnetic Cursor Effect
 * Elements smoothly follow cursor with magnetic attraction
 */

'use client';

import { useEffect, useRef } from 'react';

interface MagneticCursorProps {
  strength?: number;  // 0-1, how strong the magnetic effect
}

export function MagneticCursor({ strength = 0.5 }: MagneticCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const followerPos = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      // Smooth following with easing
      const dx = mousePos.current.x - followerPos.current.x;
      const dy = mousePos.current.y - followerPos.current.y;
      
      followerPos.current.x += dx * strength * 0.1;
      followerPos.current.y += dy * strength * 0.1;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${mousePos.current.x}px, ${mousePos.current.y}px)`;
      }

      if (followerRef.current) {
        followerRef.current.style.transform = `translate(${followerPos.current.x}px, ${followerPos.current.y}px)`;
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [strength]);

  // Hide on mobile
  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    return null;
  }

  return (
    <>
      {/* Main cursor */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-difference"
        style={{
          width: '12px',
          height: '12px',
          marginLeft: '-6px',
          marginTop: '-6px',
        }}
      >
        <div className="h-full w-full rounded-full bg-white" />
      </div>

      {/* Follower */}
      <div
        ref={followerRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] mix-blend-difference"
        style={{
          width: '40px',
          height: '40px',
          marginLeft: '-20px',
          marginTop: '-20px',
          transition: 'width 0.3s ease, height 0.3s ease',
        }}
      >
        <div className="h-full w-full rounded-full border-2 border-white opacity-50" />
      </div>

      <style jsx global>{`
        body {
          cursor: none;
        }
        a, button, [role="button"] {
          cursor: none;
        }
      `}</style>
    </>
  );
}
