/**
 * Enhanced Traditional Borders
 * 
 * Premium borders with peacock, lotus, paisley, and rangoli motifs
 */

'use client';

import { PeacockMotif, LotusMotif, PaisleyMotif, DiyaMotif, RangoliPattern } from '../symbols/PremiumMotifs';

interface EnhancedBorderProps {
  type: 'peacock' | 'lotus' | 'paisley' | 'diya' | 'rangoli' | 'mixed';
  position?: 'top' | 'bottom' | 'both' | 'corners';
  className?: string;
}

export function EnhancedBorder({ type, position = 'both', className = '' }: EnhancedBorderProps) {
  const showTop = position === 'top' || position === 'both' || position === 'corners';
  const showBottom = position === 'bottom' || position === 'both' || position === 'corners';

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {/* Top Border */}
      {showTop && (
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-4">
            {type === 'peacock' || type === 'mixed' ? (
              <PeacockMotif size={60} color="#2d5016" className="opacity-40" />
            ) : null}
            {type === 'diya' || type === 'mixed' ? (
              <DiyaMotif size={40} color="#d4af37" className="opacity-50" />
            ) : null}
          </div>
          
          {type === 'rangoli' && (
            <RangoliPattern size={50} color="#c41e3a" className="opacity-30" />
          )}
          
          <div className="flex items-center gap-4">
            {type === 'lotus' || type === 'mixed' ? (
              <LotusMotif size={50} color="#c41e3a" className="opacity-40" />
            ) : null}
            {type === 'paisley' || type === 'mixed' ? (
              <PaisleyMotif size={30} color="#2d5016" className="opacity-40" />
            ) : null}
          </div>
        </div>
      )}

      {/* Bottom Border */}
      {showBottom && (
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-4">
            {type === 'lotus' || type === 'mixed' ? (
              <LotusMotif size={50} color="#c41e3a" className="opacity-40 rotate-180" />
            ) : null}
          </div>
          
          {type === 'peacock' && (
            <PeacockMotif size={70} color="#2d5016" className="opacity-30" />
          )}
          
          <div className="flex items-center gap-4">
            {type === 'diya' || type === 'mixed' ? (
              <DiyaMotif size={40} color="#d4af37" className="opacity-50" />
            ) : null}
          </div>
        </div>
      )}

      {/* Corner Decorations */}
      {position === 'corners' && (
        <>
          <div className="absolute top-2 left-2">
            <PaisleyMotif size={40} color="#2d5016" className="opacity-30" />
          </div>
          <div className="absolute top-2 right-2 -scale-x-100">
            <PaisleyMotif size={40} color="#2d5016" className="opacity-30" />
          </div>
          <div className="absolute bottom-2 left-2 -scale-y-100">
            <PaisleyMotif size={40} color="#2d5016" className="opacity-30" />
          </div>
          <div className="absolute bottom-2 right-2 scale-x-[-1] scale-y-[-1]">
            <PaisleyMotif size={40} color="#2d5016" className="opacity-30" />
          </div>
        </>
      )}
    </div>
  );
}

// Decorative corner piece with multiple motifs
export function CornerDecoration({ position = 'top-left', className = '' }: { position?: string; className?: string }) {
  const positionClasses: Record<string, string> = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4 -scale-x-100',
    'bottom-left': 'bottom-4 left-4 -scale-y-100',
    'bottom-right': 'bottom-4 right-4 scale-x-[-1] scale-y-[-1]',
  };

  return (
    <div className={`absolute ${positionClasses[position]} ${className}`}>
      <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
        {/* Ornate corner flourish */}
        <path
          d="M0 0 Q20 0 30 10 Q35 15 35 25 L35 35 Q35 45 30 50 Q20 55 10 55 L0 55"
          stroke="#d4af37"
          strokeWidth="2"
          fill="none"
          opacity="0.6"
        />
        <path
          d="M0 0 Q15 0 25 8 Q30 12 30 20 L30 30 Q30 38 25 42 Q15 47 8 47 L0 47"
          stroke="#2d5016"
          strokeWidth="1.5"
          fill="none"
          opacity="0.4"
        />
        
        {/* Decorative dots */}
        <circle cx="25" cy="25" r="3" fill="#c41e3a" opacity="0.6" />
        <circle cx="35" cy="15" r="2" fill="#d4af37" opacity="0.5" />
        <circle cx="15" cy="35" r="2" fill="#d4af37" opacity="0.5" />
      </svg>
    </div>
  );
}
