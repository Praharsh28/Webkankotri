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
import { TraditionalBorder, FlowerCorner, OrnateDivider } from '../decorations/TraditionalBorder';

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
    <div className="relative min-h-screen bg-[#f5f5dc] py-12 px-6">
      {/* Traditional palm leaf corners */}
      <TraditionalBorder type="full" color={config.colors.primary} />

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

        {/* Names */}
        <ScrollTrigger animation="fade" delay={0.4}>
          <div className="mb-8 text-center">
            <div className="mb-6">
              <p className="mb-2 font-serif text-5xl font-light tracking-wider text-[#2d5016] md:text-6xl">
                {groomName}
              </p>
              <div className="my-4 flex items-center justify-center gap-3">
                <div className="h-px w-16 bg-[#d4af37]/50" />
                <span className="font-serif text-2xl text-[#d4af37]">Weds</span>
                <div className="h-px w-16 bg-[#d4af37]/50" />
              </div>
              <p className="font-serif text-5xl font-light tracking-wider text-[#2d5016] md:text-6xl">
                {brideName}
              </p>
            </div>
          </div>
        </ScrollTrigger>

        {/* Divider */}
        <OrnateDivider color={config.colors.secondary} />

        {/* Date */}
        <ScrollTrigger animation="fade" delay={0.6}>
          <div className="text-center">
            <div className="inline-block border-t-2 border-b-2 border-[#d4af37]/40 px-12 py-6">
              <p className="mb-1 text-lg font-light text-[#2d5016]">{weekday}</p>
              <p className="font-serif text-6xl font-bold text-[#c41e3a]">{day}</p>
              <p className="mt-1 font-serif text-xl text-[#2d5016]">{monthYear}</p>
            </div>
          </div>
        </ScrollTrigger>

        {/* Bottom decorative flowers */}
        <div className="mt-8 flex justify-center gap-4">
          {[...Array(3)].map((_, i) => (
            <FlowerCorner
              key={i}
              position="top-left"
              color={i === 1 ? '#d4af37' : '#2d5016'}
              className="static opacity-40"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
