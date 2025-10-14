'use client';

import { useEffect, useRef, useMemo } from 'react';
import type { ParticleType, ParticleSpeed } from '@/types/v2/animation';

/**
 * FloatingParticles Component
 * 
 * Creates floating animated elements (emojis, shapes) across the screen.
 * Optimized for mobile with particle count reduction.
 * 
 * @example
 * ```tsx
 * // Floating flower petals
 * <FloatingParticles type="petals" count={100} speed="slow" />
 * 
 * // Custom emojis (royal theme)
 * <FloatingParticles 
 *   emojis={['👑', '💎', '✨']} 
 *   count={50}
 *   speed="normal"
 * />
 * ```
 * 
 * Performance:
 * - Auto-reduces particle count on mobile devices
 * - Uses CSS transforms for smooth 60fps animation
 * - Lightweight DOM manipulation
 * - Can be disabled on low-end devices
 */

export interface FloatingParticlesProps {
  /** Number of particles to render. Auto-reduces on mobile */
  count?: number;
  /** Predefined particle type */
  type?: ParticleType;
  /** Custom emojis/characters to use (overrides type) */
  emojis?: string[];
  /** Animation speed */
  speed?: ParticleSpeed;
  /** Particle color (only for sparkles type) */
  color?: string;
  /** Min and max size in pixels [min, max] */
  size?: [number, number];
  /** Min and max opacity [min, max] */
  opacity?: [number, number];
  /** Should particles be disabled? */
  disabled?: boolean;
  /** Additional CSS classes */
  className?: string;
}

interface Particle {
  id: number;
  emoji: string;
  x: number; // Starting x position (%)
  y: number; // Starting y position (%)
  size: number; // Font size (px)
  opacity: number; // 0-1
  duration: number; // Animation duration (s)
  delay: number; // Animation delay (s)
}

const PREDEFINED_EMOJIS: Record<ParticleType, string[]> = {
  petals: ['🌸', '🌺', '🌼', '🌻', '🌹'],
  sparkles: ['✨', '⭐', '💫', '🌟'],
  custom: [],
};

const SPEED_MULTIPLIERS: Record<ParticleSpeed, number> = {
  slow: 1.5,
  normal: 1,
  fast: 0.7,
};

/**
 * Detects if device is mobile or low-end
 */
function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}

/**
 * Generates random particles with varied properties
 */
function generateParticles(
  count: number,
  emojis: string[],
  sizeRange: [number, number],
  opacityRange: [number, number],
  speedMultiplier: number
): Particle[] {
  const particles: Particle[] = [];
  
  for (let i = 0; i < count; i++) {
    particles.push({
      id: i,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: sizeRange[0] + Math.random() * (sizeRange[1] - sizeRange[0]),
      opacity: opacityRange[0] + Math.random() * (opacityRange[1] - opacityRange[0]),
      duration: (15 + Math.random() * 10) * speedMultiplier,
      delay: Math.random() * 5,
    });
  }
  
  return particles;
}

export function FloatingParticles({
  count = 50,
  type = 'petals',
  emojis,
  speed = 'normal',
  color,
  size = [20, 40],
  opacity = [0.4, 0.8],
  disabled = false,
  className = '',
}: FloatingParticlesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMemo(() => isMobileDevice(), []);
  
  // Reduce particle count on mobile
  const adjustedCount = isMobile ? Math.min(count, Math.floor(count / 4)) : count;
  
  // Use custom emojis if provided, otherwise use predefined
  const particleEmojis = emojis || PREDEFINED_EMOJIS[type];
  
  // Generate particles with random properties
  const particles = useMemo(
    () => generateParticles(
      adjustedCount,
      particleEmojis,
      size,
      opacity,
      SPEED_MULTIPLIERS[speed]
    ),
    [adjustedCount, particleEmojis, size, opacity, speed]
  );

  // Don't render if disabled or no emojis available
  if (disabled || particleEmojis.length === 0) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none fixed inset-0 z-10 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute animate-float-gentle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            fontSize: `${particle.size}px`,
            opacity: particle.opacity,
            color: type === 'sparkles' ? color : undefined,
            animation: `float-gentle ${particle.duration}s ease-in-out ${particle.delay}s infinite`,
            willChange: 'transform', // Performance hint
          }}
        >
          {particle.emoji}
        </div>
      ))}
    </div>
  );
}

// Add these animations to your global CSS or Tailwind config
/**
 * CSS Animation (add to globals.css):
 * 
 * @keyframes float-gentle {
 *   0%, 100% {
 *     transform: translate(0, 0) rotate(0deg);
 *   }
 *   25% {
 *     transform: translate(10px, -20px) rotate(5deg);
 *   }
 *   50% {
 *     transform: translate(-5px, -40px) rotate(-3deg);
 *   }
 *   75% {
 *     transform: translate(-15px, -20px) rotate(7deg);
 *   }
 * }
 */
