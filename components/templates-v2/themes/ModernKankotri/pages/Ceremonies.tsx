/**
 * Modern Kankotri - Ceremonies Page (EXPERT EDITION)
 * Animated ceremony cards with hover effects and scroll reveals
 */

'use client';

import { ScrollReveal } from '@/components/templates-v2/themes/KankotriTemplate/animations/SmoothScrollReveal';
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
      className="relative min-h-screen px-6 py-32"
      style={{ backgroundColor: config.colors.background }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Animated header */}
        <ScrollReveal animation="fade" delay={0.1}>
          <h2 
            className="text-5xl md:text-6xl text-center mb-6 font-light tracking-tight"
            style={{ 
              fontFamily: config.fonts.decorative,
              background: `linear-gradient(135deg, ${config.colors.primary} 0%, ${config.colors.accent} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Wedding Events
          </h2>
          <p 
            className="text-center text-lg mb-16"
            style={{ 
              fontFamily: config.fonts.english,
              color: config.colors.secondary,
            }}
          >
            Join us for these special celebrations
          </p>
        </ScrollReveal>

        {/* Animated ceremony cards */}
        <div className="space-y-6">
          {ceremonies.map((ceremony, index) => {
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
              <ScrollReveal 
                key={ceremony.id} 
                animation="slide-up" 
                delay={0.1 * (index + 2)}
              >
                <div 
                  className="bg-white p-8 rounded-2xl border transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1 group"
                  style={{ borderColor: '#f0f0f0' }}
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
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
