/**
 * Gold Foil Effect Component
 * 
 * Simulates luxurious gold foil stamping effect
 * for premium text elements
 */

'use client';

import { ReactNode } from 'react';

interface GoldFoilTextProps {
  children: ReactNode;
  className?: string;
  intensity?: 'subtle' | 'medium' | 'strong';
}

export function GoldFoilText({ 
  children, 
  className = '',
  intensity = 'medium'
}: GoldFoilTextProps) {
  const intensityClasses = {
    subtle: 'bg-gradient-to-br from-[#d4af37] via-[#f4d03f] to-[#c9a961]',
    medium: 'bg-gradient-to-br from-[#c9a961] via-[#f4d03f] via-[#ffd700] to-[#d4af37]',
    strong: 'bg-gradient-to-br from-[#b8860b] via-[#ffd700] via-[#f4d03f] to-[#daa520]',
  };

  return (
    <span
      className={`
        relative inline-block
        ${intensityClasses[intensity]}
        bg-clip-text text-transparent
        ${className}
      `}
      style={{
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        textShadow: '0 0 20px rgba(212, 175, 55, 0.3)',
      }}
    >
      {children}
      {/* Shimmer effect overlay */}
      <span
        className="absolute inset-0 animate-shimmer"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
          backgroundSize: '200% 100%',
        }}
      />
    </span>
  );
}

export function GoldFoilBorder({ 
  children, 
  className = '' 
}: { children: ReactNode; className?: string }) {
  return (
    <div 
      className={`relative ${className}`}
      style={{
        border: '2px solid transparent',
        backgroundImage: 'linear-gradient(#f5f5dc, #f5f5dc), linear-gradient(135deg, #c9a961, #ffd700, #d4af37, #f4d03f)',
        backgroundOrigin: 'border-box',
        backgroundClip: 'padding-box, border-box',
      }}
    >
      {children}
    </div>
  );
}
