/**
 * Kankotri Cover Page (Page 1)
 * 
 * Features:
 * - Couple photo
 * - Names in decorative frame
 * - Wedding date
 * - Traditional floral decorations
 */

'use client';

import { ScrollTrigger } from '@/components/animations-v2';
import { OrnateDivider } from '../decorations/TraditionalBorder';
import { CornerDecoration } from '../decorations/EnhancedBorders';
import { PremiumGoldFoil, EmbossedText, GoldFoilFrame } from '../effects/PremiumGoldFoil';
import { LotusMotif, DiyaMotif, PaisleyMotif } from '../symbols/PremiumMotifs';
import { authenticKankotriColors } from '../kankotri-colors-v2';

interface KankotriCoverProps {
  groomName: string;
  brideName: string;
  weddingDate: Date;
  couplePhoto?: string;
  config: any;
}

export function KankotriCover({
  groomName,
  brideName,
  weddingDate,
  couplePhoto,
  config,
}: KankotriCoverProps) {
  const formattedDate = weddingDate.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const monthYear = weddingDate.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  const day = weddingDate.getDate();
  const weekday = weddingDate.toLocaleDateString('en-US', {
    weekday: 'long',
  });

  return (
    <div className="relative min-h-screen paper-texture py-16 px-6">
      {/* Refined corner decorations - Less clutter */}
      <CornerDecoration position="top-left" />
      <CornerDecoration position="top-right" />
      <CornerDecoration position="bottom-left" />
      <CornerDecoration position="bottom-right" />
      
      {/* Subtle paisley accents */}
      <div className="absolute top-20 left-20 opacity-20">
        <PaisleyMotif size={80} color={authenticKankotriColors.templeGreen} />
      </div>
      <div className="absolute top-20 right-20 opacity-20 -scale-x-100">
        <PaisleyMotif size={80} color={authenticKankotriColors.templeGreen} />
      </div>

      <div className="container mx-auto max-w-2xl">
        {/* Couple Photo with decorative frame */}
        {couplePhoto && (
          <ScrollTrigger animation="fade" delay={0.2}>
            <div className="relative mb-8">
              <div className="relative overflow-hidden rounded-lg border-4 border-[#d4af37]/30">
                <img
                  src={couplePhoto}
                  alt={`${groomName} & ${brideName}`}
                  className="h-[400px] w-full object-cover"
                />
                {/* Decorative overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#f5f5dc] via-[#f5f5dc]/80 to-transparent" />
              </div>
              
              {/* Decorative flourish on photo */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
                <svg width="200" height="40" viewBox="0 0 200 40" fill="none">
                  <path
                    d="M10 20 Q50 10, 100 20 T190 20"
                    stroke="#2d5016"
                    strokeWidth="2"
                    fill="none"
                  />
                  <circle cx="100" cy="20" r="15" fill="#f5f5dc" stroke="#d4af37" strokeWidth="2" />
                  <path
                    d="M95 15 L100 25 L105 15"
                    fill="none"
                    stroke="#c41e3a"
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </div>
          </ScrollTrigger>
        )}

        {/* Names with Premium Gold Foil - REFINED */}
        <ScrollTrigger animation="fade" delay={0.4}>
          <div className="mb-12 text-center">
            {/* Groom Name */}
            <PremiumGoldFoil intensity="strong" enableShimmer>
              <h2 className="mb-4 font-serif text-6xl font-light tracking-[0.15em] md:text-8xl">
                {groomName}
              </h2>
            </PremiumGoldFoil>
            
            {/* Divider with Lotus */}
            <div className="my-8 flex items-center justify-center gap-6">
              <LotusMotif size={50} color={authenticKankotriColors.kumkumRed} className="opacity-70" />
              <EmbossedText depth="medium">
                <span className="font-serif text-3xl tracking-wide" style={{ color: authenticKankotriColors.templeGreen }}>
                  Weds
                </span>
              </EmbossedText>
              <LotusMotif size={50} color={authenticKankotriColors.kumkumRed} className="opacity-70 -scale-x-100" />
            </div>
            
            {/* Bride Name */}
            <PremiumGoldFoil intensity="strong" enableShimmer>
              <h2 className="font-serif text-6xl font-light tracking-[0.15em] md:text-8xl">
                {brideName}
              </h2>
            </PremiumGoldFoil>
          </div>
        </ScrollTrigger>

        {/* Divider */}
        <OrnateDivider color={authenticKankotriColors.sacredGold} />

        {/* Date with Premium Gold Frame */}
        <ScrollTrigger animation="fade" delay={0.6}>
          <div className="flex justify-center">
            <GoldFoilFrame thickness={3} className="px-16 py-8">
              <div className="text-center">
                <EmbossedText depth="subtle">
                  <p className="mb-2 text-[10px] uppercase tracking-[0.35em]" style={{ color: authenticKankotriColors.templeGreen }}>
                    {weekday}
                  </p>
                </EmbossedText>
                
                <PremiumGoldFoil intensity="strong" enableShimmer>
                  <p className="font-serif text-8xl font-bold leading-none">
                    {day}
                  </p>
                </PremiumGoldFoil>
                
                <EmbossedText depth="subtle">
                  <p className="mt-3 font-serif text-2xl" style={{ color: authenticKankotriColors.darkBrown }}>
                    {monthYear}
                  </p>
                </EmbossedText>
              </div>
            </GoldFoilFrame>
          </div>
        </ScrollTrigger>

        {/* Bottom decorative diyas - Reduced to 3 for less clutter */}
        <ScrollTrigger animation="fade" delay={0.8}>
          <div className="mt-16 flex justify-center gap-12">
            {[...Array(3)].map((_, i) => (
              <DiyaMotif
                key={i}
                size={60}
                color={authenticKankotriColors.sacredGold}
                className="opacity-70 animate-pulse"
                style={{ animationDelay: `${i * 0.3}s` } as any}
              />
            ))}
          </div>
        </ScrollTrigger>
      </div>
    </div>
  );
}
