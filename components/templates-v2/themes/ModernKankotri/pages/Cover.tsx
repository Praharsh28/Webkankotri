/**
 * Modern Kankotri - Cover Page
 * Minimalist design with lots of white space
 */

'use client';

import type { KankotriConfig } from '@/types/v2/kankotri';

interface CoverProps {
  groomName: string;
  brideName: string;
  weddingDate: Date;
  couplePhoto?: string;
  config: KankotriConfig;
}

export function Cover({ 
  groomName, 
  brideName, 
  weddingDate, 
  couplePhoto,
  config 
}: CoverProps) {
  // REQUIRED: UTC-safe date formatting
  const formattedDate = weddingDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',  // ← REQUIRED
  });

  const day = weddingDate.getUTCDate();
  const month = weddingDate.toLocaleDateString('en-US', {
    month: 'short',
    timeZone: 'UTC',
  });

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center px-6 py-20"
      style={{ backgroundColor: config.colors.background }}
    >
      <div className="text-center max-w-2xl">
        {/* Simple date badge */}
        <div className="mb-12">
          <div 
            className="inline-block px-6 py-2 border rounded-full text-sm tracking-wider"
            style={{ 
              borderColor: '#e5e5e5',
              color: config.colors.secondary,
            }}
          >
            {formattedDate}
          </div>
        </div>

        {/* Couple Names - minimalist */}
        <h1 
          className="text-7xl md:text-8xl mb-2 font-light tracking-tight"
          style={{ 
            fontFamily: config.fonts.decorative,
            color: config.colors.primary,
          }}
        >
          {groomName}
        </h1>

        {/* Ampersand */}
        <div 
          className="text-2xl my-6"
          style={{ color: config.colors.accent }}
        >
          &
        </div>

        <h1 
          className="text-7xl md:text-8xl mb-12 font-light tracking-tight"
          style={{ 
            fontFamily: config.fonts.decorative,
            color: config.colors.primary,
          }}
        >
          {brideName}
        </h1>

        {/* Subtitle - minimal */}
        <p 
          className="text-lg tracking-wide uppercase mb-16"
          style={{ 
            fontFamily: config.fonts.english,
            color: config.colors.secondary,
            letterSpacing: '0.2em',
          }}
        >
          are getting married
        </p>

        {/* Date number - large and minimal */}
        <div className="mb-8">
          <div 
            className="text-8xl font-light mb-2"
            style={{ color: config.colors.accent }}
          >
            {day}
          </div>
          <div 
            className="text-xl uppercase tracking-wider"
            style={{ color: config.colors.secondary }}
          >
            {month}
          </div>
        </div>

        {/* Optional couple photo - clean circular */}
        {couplePhoto && (
          <div className="mt-16">
            <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-2 border-gray-100">
              <img 
                src={couplePhoto} 
                alt={`${groomName} and ${brideName}`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
