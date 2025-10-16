/**
 * Cinematic Transition Effect
 * Movie-like wipe transitions between sections
 */

'use client';

import { useEffect, useState } from 'react';

export function CinematicTransition() {
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Trigger transition on route change or major scroll milestones
    const handleTransition = () => {
      setIsTransitioning(true);
      setTimeout(() => setIsTransitioning(false), 1000);
    };

    // Listen for custom transition events
    window.addEventListener('cinematic-transition', handleTransition);
    
    return () => {
      window.removeEventListener('cinematic-transition', handleTransition);
    };
  }, []);

  if (!isTransitioning) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* Wipe effect - slides across screen */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-gold to-transparent"
        style={{
          animation: 'wipe 1s cubic-bezier(0.65, 0, 0.35, 1)',
          background: 'linear-gradient(90deg, transparent 0%, #ffd700 50%, transparent 100%)',
        }}
      />

      <style jsx>{`
        @keyframes wipe {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}
