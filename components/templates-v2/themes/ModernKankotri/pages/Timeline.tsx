/**
 * Modern Kankotri - Timeline Page (EXPERT EDITION)
 * Animated vertical timeline with scroll-triggered reveals
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

interface TimelineProps {
  weddingDate: Date;
  ceremonies: Ceremony[];
  config: KankotriConfig;
}

export function Timeline({ weddingDate, ceremonies, config }: TimelineProps) {
  return (
    <section 
      className="relative min-h-screen px-6 py-32"
      style={{ backgroundColor: config.colors.background }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header with animation */}
        <ScrollReveal animation="fade" delay={0.1}>
          <div className="text-center mb-20">
            <h2 
              className="text-5xl md:text-6xl font-light tracking-tight mb-4"
              style={{ 
                fontFamily: config.fonts.decorative,
                background: `linear-gradient(135deg, ${config.colors.primary} 0%, ${config.colors.accent} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Our Journey
            </h2>
            <p 
              className="text-lg tracking-wide"
              style={{ 
                fontFamily: config.fonts.english,
                color: config.colors.secondary,
              }}
            >
              A timeline of celebrations leading to our special day
            </p>
          </div>
        </ScrollReveal>

        {/* Animated vertical timeline */}
        <div className="relative">
          {/* Vertical line with gradient */}
          <div 
            className="absolute left-8 top-0 bottom-0 w-px"
            style={{
              background: `linear-gradient(to bottom, transparent, ${config.colors.accent}, transparent)`,
            }}
          />

          {/* Timeline items */}
          <div className="space-y-12">
            {ceremonies.map((ceremony, index) => {
              const formattedDate = ceremony.date.toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                timeZone: 'UTC',
              });

              return (
                <ScrollReveal 
                  key={ceremony.id} 
                  animation="slide-up" 
                  delay={0.1 * (index + 1)}
                >
                  <div className="relative pl-20 group">
                    {/* Timeline dot */}
                    <div 
                      className="absolute left-6 w-5 h-5 rounded-full border-4 transition-all duration-300 group-hover:scale-150 group-hover:shadow-lg"
                      style={{ 
                        borderColor: config.colors.accent,
                        backgroundColor: config.colors.background,
                      }}
                    />

                    {/* Card with hover effect */}
                    <div 
                      className="bg-white p-8 rounded-2xl border transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1"
                      style={{ borderColor: '#f0f0f0' }}
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                        <h3 
                          className="text-2xl md:text-3xl font-light transition-colors duration-300 group-hover:text-blue-600"
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

                        {/* Date pill with animation */}
                        <div 
                          className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 group-hover:scale-105"
                          style={{
                            backgroundColor: `${config.colors.accent}10`,
                            color: config.colors.accent,
                          }}
                        >
                          {formattedDate}
                        </div>
                      </div>

                      {/* Details */}
                      <div 
                        className="space-y-2 text-base"
                        style={{ 
                          fontFamily: config.fonts.english,
                          color: config.colors.text,
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <svg 
                            className="w-5 h-5 flex-shrink-0" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                            style={{ color: config.colors.accent }}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{ceremony.time}</span>
                        </div>

                        <div className="flex items-start gap-3">
                          <svg 
                            className="w-5 h-5 flex-shrink-0 mt-0.5" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                            style={{ color: config.colors.accent }}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span>{ceremony.venue}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

        {/* CTA with animation */}
        <ScrollReveal animation="fade" delay={0.6}>
          <div className="mt-20 text-center">
            <p 
              className="text-lg mb-6"
              style={{ 
                fontFamily: config.fonts.decorative,
                color: config.colors.secondary,
              }}
            >
              Join us in celebrating each moment
            </p>
            <div 
              className="inline-block px-8 py-3 rounded-full text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
              style={{ 
                backgroundColor: config.colors.accent,
              }}
            >
              Save the Dates
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
