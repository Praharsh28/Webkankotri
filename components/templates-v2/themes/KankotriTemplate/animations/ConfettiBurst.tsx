/**
 * Confetti Burst Animation
 * 
 * Celebration confetti on page load
 * Using canvas-confetti library
 */

'use client';

import { useEffect } from 'react';
import confetti from 'canvas-confetti';

interface ConfettiBurstProps {
  delay?: number;
  duration?: number;
}

export function ConfettiBurst({ delay = 500, duration = 3000 }: ConfettiBurstProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      // Flower petal colors
      const colors = ['#ff9999', '#ffb3ba', '#ffc8dd', '#f4c2c2', '#d4af37', '#ff9933'];

      // Multiple bursts
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.6 },
          colors: colors,
          shapes: ['circle'],
          gravity: 0.8,
          scalar: 0.8,
        });

        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.6 },
          colors: colors,
          shapes: ['circle'],
          gravity: 0.8,
          scalar: 0.8,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };

      frame();
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, duration]);

  return null;
}

// Continuous gentle confetti
export function GentleConfetti() {
  useEffect(() => {
    const colors = ['#d4af37', '#ffd700', '#b8860b'];
    
    const interval = setInterval(() => {
      confetti({
        particleCount: 1,
        angle: 90,
        spread: 45,
        origin: { x: Math.random(), y: -0.1 },
        colors: colors,
        gravity: 0.4,
        scalar: 0.6,
        drift: Math.random() * 2 - 1,
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return null;
}
