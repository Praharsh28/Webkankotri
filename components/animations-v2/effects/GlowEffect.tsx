'use client';

import type { ReactNode } from 'react';

/**
 * GlowEffect Component
 * 
 * Adds glowing effect to text or elements.
 * Can pulse for extra emphasis.
 * 
 * @example
 * ```tsx
 * <GlowEffect glowColor="#D4AF37" intensity={5} pulseSpeed={2}>
 *   <h1>You're Invited</h1>
 * </GlowEffect>
 * ```
 */

export interface GlowEffectProps {
  /** Content to apply glow to */
  children: ReactNode;
  /** Glow color (hex or rgb) */
  glowColor?: string;
  /** Glow intensity (0-10) */
  intensity?: number;
  /** Pulse animation speed in seconds (0 to disable) */
  pulseSpeed?: number;
  /** Blur radius in pixels */
  blur?: number;
  /** Additional CSS classes */
  className?: string;
}

export function GlowEffect({
  children,
  glowColor = '#FFD700',
  intensity = 5,
  pulseSpeed = 0,
  blur = 10,
  className = '',
}: GlowEffectProps) {
  // Create multiple shadow layers for stronger glow
  const createGlowShadows = () => {
    const shadows = [];
    for (let i = 1; i <= intensity; i++) {
      const spread = i * 2;
      shadows.push(`0 0 ${spread}px ${glowColor}`);
    }
    return shadows.join(', ');
  };

  const glowStyle: React.CSSProperties = {
    textShadow: createGlowShadows(),
    filter: `drop-shadow(0 0 ${blur}px ${glowColor})`,
    ...(pulseSpeed > 0 && {
      animation: `glow-pulse ${pulseSpeed}s ease-in-out infinite`,
    }),
  };

  return (
    <>
      <style jsx>{`
        @keyframes glow-pulse {
          0%, 100% {
            filter: drop-shadow(0 0 ${blur}px ${glowColor});
            opacity: 1;
          }
          50% {
            filter: drop-shadow(0 0 ${blur * 2}px ${glowColor});
            opacity: 0.8;
          }
        }
      `}</style>
      <div style={glowStyle} className={className}>
        {children}
      </div>
    </>
  );
}

/**
 * NeonText Component
 * 
 * Creates neon sign effect for text.
 * More intense than GlowEffect.
 */

export interface NeonTextProps {
  /** Text content */
  children: ReactNode;
  /** Neon color */
  color?: string;
  /** Should flicker? */
  flicker?: boolean;
  /** Additional CSS classes */
  className?: string;
}

export function NeonText({
  children,
  color = '#FF6B9D',
  flicker = false,
  className = '',
}: NeonTextProps) {
  const neonStyle: React.CSSProperties = {
    color: color,
    textShadow: `
      0 0 5px #fff,
      0 0 10px #fff,
      0 0 20px ${color},
      0 0 40px ${color},
      0 0 80px ${color},
      0 0 90px ${color},
      0 0 100px ${color},
      0 0 150px ${color}
    `,
    ...(flicker && {
      animation: 'neon-flicker 3s infinite alternate',
    }),
  };

  return (
    <>
      <style jsx>{`
        @keyframes neon-flicker {
          0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
            opacity: 1;
          }
          20%, 24%, 55% {
            opacity: 0.4;
          }
        }
      `}</style>
      <div style={neonStyle} className={className}>
        {children}
      </div>
    </>
  );
}
