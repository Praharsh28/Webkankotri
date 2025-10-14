'use client';

import { useEffect, useRef } from 'react';
import type { AnimationTrigger, AnimationIntensity } from '@/types/v2/animation';

/**
 * FireworksCanvas Component
 * 
 * Creates fireworks animation using canvas.
 * Can be triggered automatically, on scroll, or manually.
 * 
 * @example
 * ```tsx
 * <FireworksCanvas
 *   trigger="auto"
 *   color={['#D4AF37', '#FF6B9D', '#5D1A8B']}
 *   intensity="medium"
 *   duration={3000}
 * />
 * ```
 */

export interface FireworksCanvasProps {
  /** When to trigger fireworks */
  trigger?: AnimationTrigger | boolean;
  /** Fireworks colors (array for random, string for single) */
  color?: string | string[];
  /** Animation intensity */
  intensity?: AnimationIntensity;
  /** Duration in milliseconds */
  duration?: number;
  /** Callback when animation completes */
  onComplete?: () => void;
  /** Additional CSS classes */
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
}

export function FireworksCanvas({
  trigger = false,
  color = ['#FFD700', '#FF6B9D', '#4ECDC4', '#FF4757'],
  intensity = 'medium',
  duration = 3000,
  onComplete,
  className = '',
}: FireworksCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const startTimeRef = useRef<number | null>(null);

  const colors = Array.isArray(color) ? color : [color];

  // Intensity settings
  const intensitySettings = {
    low: { count: 50, frequency: 500 },
    medium: { count: 100, frequency: 300 },
    high: { count: 150, frequency: 200 },
  };

  const settings = intensitySettings[intensity];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !trigger) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    startTimeRef.current = Date.now();

    // Create firework explosion
    const createFirework = (x: number, y: number) => {
      const particleCount = settings.count;
      const newParticles: Particle[] = [];

      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = 2 + Math.random() * 3;
        
        newParticles.push({
          x,
          y,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          alpha: 1,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }

      particlesRef.current = [...particlesRef.current, ...newParticles];
    };

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;

      const elapsed = Date.now() - (startTimeRef.current || 0);
      
      // Clear canvas with fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter((particle) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += 0.1; // Gravity
        particle.alpha -= 0.01;

        // Draw particle
        if (particle.alpha > 0) {
          ctx.globalAlpha = particle.alpha;
          ctx.fillStyle = particle.color;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
          ctx.fill();
          return true;
        }
        return false;
      });

      ctx.globalAlpha = 1;

      // Stop after duration
      if (elapsed >= duration) {
        particlesRef.current = [];
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
        onComplete?.();
        return;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    // Create fireworks at intervals
    const intervalId = setInterval(() => {
      const elapsed = Date.now() - (startTimeRef.current || 0);
      if (elapsed >= duration) {
        clearInterval(intervalId);
        return;
      }

      const x = Math.random() * canvas.width;
      const y = Math.random() * (canvas.height * 0.6);
      createFirework(x, y);
    }, settings.frequency);

    // Start animation
    animate();

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      clearInterval(intervalId);
      window.removeEventListener('resize', resize);
    };
  }, [trigger, duration, intensity, colors, settings, onComplete]);

  if (!trigger) return null;

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none fixed inset-0 z-50 ${className}`}
      aria-hidden="true"
    />
  );
}
