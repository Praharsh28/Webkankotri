'use client';

import { useEffect } from 'react';
import confetti from 'canvas-confetti';

/**
 * ConfettiExplosion Component
 * 
 * Triggers confetti burst effect.
 * Lightweight, uses canvas-confetti library.
 * 
 * @example
 * ```tsx
 * const [showConfetti, setShowConfetti] = useState(false);
 * 
 * <button onClick={() => setShowConfetti(true)}>
 *   Celebrate!
 * </button>
 * 
 * <ConfettiExplosion
 *   trigger={showConfetti}
 *   colors={['#D4AF37', '#8B1538']}
 *   onComplete={() => setShowConfetti(false)}
 * />
 * ```
 */

export interface ConfettiExplosionProps {
  /** Trigger confetti (set to true to start) */
  trigger: boolean;
  /** Confetti colors */
  colors?: string[];
  /** Number of confetti particles */
  particleCount?: number;
  /** Spread angle in degrees (default: 360 for full circle) */
  spread?: number;
  /** Origin point (x and y as 0-1) */
  origin?: { x: number; y: number };
  /** Duration in milliseconds */
  duration?: number;
  /** Callback when animation completes */
  onComplete?: () => void;
}

export function ConfettiExplosion({
  trigger,
  colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'],
  particleCount = 150,
  spread = 360,
  origin = { x: 0.5, y: 0.5 },
  duration = 3000,
  onComplete,
}: ConfettiExplosionProps) {
  useEffect(() => {
    if (!trigger) return;

    // Fire confetti
    const fire = () => {
      confetti({
        particleCount,
        spread,
        origin,
        colors,
        ticks: duration / 10,
        gravity: 1,
        scalar: 1,
        drift: 0,
        shapes: ['square', 'circle'],
        zIndex: 9999,
      });
    };

    // Fire multiple bursts for better effect
    fire();
    const timeout1 = setTimeout(fire, 100);
    const timeout2 = setTimeout(fire, 200);

    // Complete callback
    const completeTimeout = setTimeout(() => {
      onComplete?.();
    }, duration);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(completeTimeout);
    };
  }, [trigger, particleCount, spread, origin, colors, duration, onComplete]);

  return null;
}

/**
 * ConfettiCannon Component
 * 
 * Continuous confetti from sides (like a cannon).
 * Good for celebration moments.
 */

export interface ConfettiCannonProps {
  /** Should cannon be active? */
  active: boolean;
  /** Duration in milliseconds */
  duration?: number;
  /** Callback when complete */
  onComplete?: () => void;
}

export function ConfettiCannon({
  active,
  duration = 5000,
  onComplete,
}: ConfettiCannonProps) {
  useEffect(() => {
    if (!active) return;

    const startTime = Date.now();
    let animationFrame: number;

    const frame = () => {
      const elapsed = Date.now() - startTime;
      
      if (elapsed >= duration) {
        onComplete?.();
        return;
      }

      // Fire from left
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors: ['#FFD700', '#FF6B9D', '#4ECDC4'],
      });

      // Fire from right
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors: ['#FFD700', '#FF6B9D', '#4ECDC4'],
      });

      animationFrame = requestAnimationFrame(frame);
    };

    animationFrame = requestAnimationFrame(frame);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [active, duration, onComplete]);

  return null;
}
