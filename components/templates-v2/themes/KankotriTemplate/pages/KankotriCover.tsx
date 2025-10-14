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
import { EnhancedBorder, CornerDecoration } from '../decorations/EnhancedBorders';
import { GoldFoilText, GoldFoilBorder } from '../effects/GoldFoilText';
import { LotusMotif, DiyaMotif } from '../symbols/PremiumMotifs';

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
    <div className="relative min-h-screen bg-[#f5f5dc] paper-texture py-12 px-6">
      {/* Enhanced decorative borders with premium motifs */}
      <EnhancedBorder type="mixed" position="corners" />
      
      {/* Decorative corner flourishes */}
      <CornerDecoration position="top-left" />
      <CornerDecoration position="top-right" />
      <CornerDecoration position="bottom-left" />
      <CornerDecoration position="bottom-right" />

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

        {/* Names with Gold Foil Effect */}
        <ScrollTrigger animation="fade" delay={0.4}>
          <div className="mb-8 text-center">
            <div className="mb-6">
              <GoldFoilText intensity="strong">
                <p className="mb-2 font-serif text-5xl font-light tracking-[0.1em] md:text-7xl">
                  {groomName}
                </p>
              </GoldFoilText>
              
              <div className="my-6 flex items-center justify-center gap-4">
                <LotusMotif size={40} color="#c41e3a" className="opacity-60" />
                <GoldFoilText intensity="medium">
                  <span className="font-serif text-3xl">Weds</span>
                </GoldFoilText>
                <LotusMotif size={40} color="#c41e3a" className="opacity-60 -scale-x-100" />
              </div>
              
              <GoldFoilText intensity="strong">
                <p className="font-serif text-5xl font-light tracking-[0.1em] md:text-7xl">
                  {brideName}
                </p>
              </GoldFoilText>
            </div>
          </div>
        </ScrollTrigger>

        {/* Divider */}
        <OrnateDivider color={config.colors.secondary} />

        {/* Date with Enhanced Border */}
        <ScrollTrigger animation="fade" delay={0.6}>
          <div className="flex justify-center">
            <GoldFoilBorder className="px-12 py-6 glow-gold">
              <div className="text-center">
                <p className="mb-1 text-sm uppercase tracking-[0.3em] text-[#2d5016]/70">{weekday}</p>
                <GoldFoilText intensity="strong">
                  <p className="font-serif text-7xl font-bold">{day}</p>
                </GoldFoilText>
                <p className="mt-1 font-serif text-xl text-[#2d5016]">{monthYear}</p>
              </div>
            </GoldFoilBorder>
          </div>
        </ScrollTrigger>

        {/* Bottom decorative diyas */}
        <ScrollTrigger animation="fade" delay={0.8}>
          <div className="mt-12 flex justify-center gap-8">
            {[...Array(5)].map((_, i) => (
              <DiyaMotif
                key={i}
                size={50}
                color="#d4af37"
                className="opacity-60 animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` } as any}
              />
            ))}
          </div>
        </ScrollTrigger>
      </div>
    </div>
  );
}
