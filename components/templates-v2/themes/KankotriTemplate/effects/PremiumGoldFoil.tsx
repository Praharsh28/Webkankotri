/**
 * Premium Gold Foil Effect V2
 * 
 * Multi-layered realistic gold foil with:
 * - Base shadow layer
 * - Main gold gradient
 * - Highlight shimmer
 * - Edge definition
 * - Subtle grain texture
 */

'use client';

import { ReactNode } from 'react';

interface PremiumGoldFoilProps {
  children: ReactNode;
  className?: string;
  intensity?: 'subtle' | 'medium' | 'strong';
  enableShimmer?: boolean;
}

export function PremiumGoldFoil({ 
  children, 
  className = '',
  intensity = 'medium',
  enableShimmer = true,
}: PremiumGoldFoilProps) {
  const intensityStyles = {
    subtle: {
      background: 'linear-gradient(120deg, #b8860b 0%, #d4af37 50%, #b8860b 100%)',
      textShadow: '0 1px 0 #8b7500, 0 1px 2px rgba(0,0,0,0.2)',
      filter: 'drop-shadow(0 0 8px rgba(184, 134, 11, 0.3))',
    },
    medium: {
      background: 'linear-gradient(135deg, #8b7500 0%, #b8860b 25%, #ffd700 50%, #b8860b 75%, #8b7500 100%)',
      textShadow: '0 1px 0 #8b7500, 0 2px 0 #7a6600, 0 3px 2px rgba(0,0,0,0.3)',
      filter: 'drop-shadow(0 0 12px rgba(255, 215, 0, 0.4))',
    },
    strong: {
      background: 'linear-gradient(90deg, #8b6914 0%, #ffd700 45%, #fff 50%, #ffd700 55%, #8b6914 100%)',
      textShadow: '0 1px 0 #8b7500, 0 2px 0 #7a6600, 0 3px 0 #6b5500, 0 4px 3px rgba(0,0,0,0.4)',
      filter: 'drop-shadow(0 0 16px rgba(255, 215, 0, 0.6))',
    },
  };

  const style = intensityStyles[intensity];

  return (
    <span
      className={`
        relative inline-block
        bg-clip-text text-transparent
        ${className}
      `}
      style={{
        background: style.background,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        textShadow: style.textShadow,
        filter: style.filter,
        backgroundSize: enableShimmer ? '200% 100%' : '100% 100%',
        animation: enableShimmer ? 'goldShimmer 4s ease-in-out infinite' : 'none',
      }}
    >
      {children}
    </span>
  );
}

// Embossed text effect (letterpress)
export function EmbossedText({ 
  children, 
  className = '',
  depth = 'medium' 
}: { 
  children: ReactNode; 
  className?: string;
  depth?: 'subtle' | 'medium' | 'strong';
}) {
  const depthStyles = {
    subtle: {
      textShadow: '0 1px 1px rgba(255,255,255,0.8), 0 -1px 1px rgba(0,0,0,0.3)',
    },
    medium: {
      textShadow: '0 2px 3px rgba(255,255,255,0.9), 0 -1px 2px rgba(0,0,0,0.4)',
    },
    strong: {
      textShadow: '0 3px 5px rgba(255,255,255,1), 0 -2px 3px rgba(0,0,0,0.5)',
    },
  };

  return (
    <span
      className={`inline-block ${className}`}
      style={depthStyles[depth]}
    >
      {children}
    </span>
  );
}

// Letterpress effect (debossed)
export function LetterpressText({ 
  children, 
  className = '' 
}: { 
  children: ReactNode; 
  className?: string;
}) {
  return (
    <span
      className={`inline-block ${className}`}
      style={{
        textShadow: '0 -1px 1px rgba(255,255,255,0.8), 0 1px 1px rgba(0,0,0,0.5)',
        color: '#3e2723',
      }}
    >
      {children}
    </span>
  );
}

// Premium border with gold foil
export function GoldFoilFrame({ 
  children, 
  className = '',
  thickness = 2 
}: { 
  children: ReactNode; 
  className?: string;
  thickness?: number;
}) {
  return (
    <div 
      className={`relative ${className}`}
      style={{
        border: `${thickness}px solid transparent`,
        backgroundImage: `
          linear-gradient(#f9f6f0, #f9f6f0),
          linear-gradient(135deg, 
            #8b7500 0%,
            #b8860b 25%,
            #ffd700 50%,
            #b8860b 75%,
            #8b7500 100%
          )
        `,
        backgroundOrigin: 'border-box',
        backgroundClip: 'padding-box, border-box',
        boxShadow: `
          inset 0 0 0 1px rgba(255,215,0,0.3),
          0 0 20px rgba(184,134,11,0.3),
          0 4px 8px rgba(0,0,0,0.1)
        `,
      }}
    >
      {children}
    </div>
  );
}
