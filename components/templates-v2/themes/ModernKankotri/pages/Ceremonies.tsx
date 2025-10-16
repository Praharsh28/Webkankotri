/**
 * Modern Kankotri - Ceremonies Page
 * Clean minimal cards for ceremony list
 */

'use client';

import type { KankotriConfig } from '@/types/v2/kankotri';

interface Ceremony {
  id: string;
  name: string;
  nameGujarati?: string;
  date: Date;
  time: string;
  venue: string;
  type?: string;
}

interface CeremoniesProps {
  ceremonies: Ceremony[];
  config: KankotriConfig;
}

export function Ceremonies({ ceremonies, config }: CeremoniesProps) {
  return (
    <section 
      className="relative min-h-screen px-6 py-20"
      style={{ backgroundColor: config.colors.background }}
    >
      <div className="max-w-3xl mx-auto">
        {/* Simple header */}
        <h2 
          className="text-4xl text-center mb-16 font-light tracking-tight"
          style={{ 
            fontFamily: config.fonts.decorative,
            color: config.colors.primary,
          }}
        >
          Wedding Events
        </h2>

        {/* Minimal ceremony cards */}
        <div className="space-y-8">
          {ceremonies.map((ceremony) => {
            // REQUIRED: UTC-safe date formatting
            const weekday = ceremony.date.toLocaleDateString('en-US', {
              weekday: 'long',
              timeZone: 'UTC',  // ← REQUIRED
            });

            const formattedDate = ceremony.date.toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
              timeZone: 'UTC',  // ← REQUIRED
            });

            return (
              <div 
                key={ceremony.id}
                className="border-l-2 pl-6 py-4 transition-all hover:pl-8 duration-300"
                style={{ borderColor: config.colors.accent }}
              >
                {/* Ceremony name */}
                <h3 
                  className="text-2xl mb-2 font-light"
                  style={{ 
                    fontFamily: config.fonts.decorative,
                    color: config.colors.primary,
                  }}
                >
                  {ceremony.name}
                  {ceremony.nameGujarati && (
                    <span 
                      className="block text-lg mt-1"
                      style={{ 
                        fontFamily: config.fonts.gujarati,
                        color: config.colors.secondary,
                      }}
                    >
                      {ceremony.nameGujarati}
                    </span>
                  )}
                </h3>

                {/* Details - clean typography */}
                <div 
                  className="space-y-1 text-base"
                  style={{ 
                    fontFamily: config.fonts.english,
                    color: config.colors.text,
                  }}
                >
                  <p>
                    <span style={{ color: config.colors.secondary }}>Date: </span>
                    {weekday}, {formattedDate}
                  </p>
                  <p>
                    <span style={{ color: config.colors.secondary }}>Time: </span>
                    {ceremony.time}
                  </p>
                  <p>
                    <span style={{ color: config.colors.secondary }}>Venue: </span>
                    {ceremony.venue}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
