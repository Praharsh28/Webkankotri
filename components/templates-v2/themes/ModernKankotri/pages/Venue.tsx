/**
 * Modern Kankotri - Venue Page (EXPERT EDITION)
 * Interactive venue details with map, animations, and directions
 */

'use client';

import { ScrollReveal } from '@/components/templates-v2/themes/KankotriTemplate/animations/SmoothScrollReveal';
import type { KankotriConfig } from '@/types/v2/kankotri';

interface VenueProps {
  venue: {
    name: string;
    address: string;
    city: string;
    state?: string;
    pincode?: string;
    mapUrl?: string;
    phone?: string;
  };
  weddingDate: Date;
  config: KankotriConfig;
}

export function Venue({ venue, weddingDate, config }: VenueProps) {
  const formattedDate = weddingDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });

  return (
    <section 
      className="relative min-h-screen px-6 py-32"
      style={{ backgroundColor: config.colors.background }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <ScrollReveal animation="fade" delay={0.1}>
          <div className="text-center mb-16">
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
              Venue
            </h2>
            <p 
              className="text-lg tracking-wide"
              style={{ 
                fontFamily: config.fonts.english,
                color: config.colors.secondary,
              }}
            >
              Where our celebration unfolds
            </p>
          </div>
        </ScrollReveal>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Venue Details Card */}
          <ScrollReveal animation="slide-up" delay={0.2}>
            <div 
              className="bg-white p-10 rounded-2xl border transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]"
              style={{ borderColor: '#f0f0f0' }}
            >
              {/* Venue name */}
              <h3 
                className="text-3xl md:text-4xl font-light mb-6"
                style={{ 
                  fontFamily: config.fonts.decorative,
                  color: config.colors.primary,
                }}
              >
                {venue.name}
              </h3>

              {/* Date */}
              <div 
                className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-8"
                style={{
                  backgroundColor: `${config.colors.accent}10`,
                  color: config.colors.accent,
                }}
              >
                {formattedDate}
              </div>

              {/* Details list */}
              <div 
                className="space-y-4 text-base"
                style={{ 
                  fontFamily: config.fonts.english,
                  color: config.colors.text,
                }}
              >
                {/* Address */}
                <div className="flex items-start gap-3">
                  <svg 
                    className="w-6 h-6 flex-shrink-0 mt-0.5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    style={{ color: config.colors.accent }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p className="font-medium mb-1">Address</p>
                    <p style={{ color: config.colors.secondary }}>
                      {venue.address}<br />
                      {venue.city}{venue.state && `, ${venue.state}`}
                      {venue.pincode && ` - ${venue.pincode}`}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                {venue.phone && (
                  <div className="flex items-start gap-3">
                    <svg 
                      className="w-6 h-6 flex-shrink-0 mt-0.5" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      style={{ color: config.colors.accent }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <div>
                      <p className="font-medium mb-1">Contact</p>
                      <p style={{ color: config.colors.secondary }}>{venue.phone}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Get Directions Button */}
              <a
                href={venue.mapUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue.name + ' ' + venue.city)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-8 text-center px-8 py-3 rounded-full text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl"
                style={{ 
                  backgroundColor: config.colors.accent,
                }}
              >
                Get Directions →
              </a>
            </div>
          </ScrollReveal>

          {/* Map Embed */}
          <ScrollReveal animation="slide-up" delay={0.3}>
            <div className="relative overflow-hidden rounded-2xl border shadow-lg h-[500px] group">
              {venue.mapUrl ? (
                <iframe
                  src={venue.mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="transition-all duration-500 group-hover:scale-105"
                  title="Venue Location Map"
                />
              ) : (
                <div 
                  className="w-full h-full flex items-center justify-center"
                  style={{ backgroundColor: '#f5f5f5' }}
                >
                  <div className="text-center">
                    <svg 
                      className="w-16 h-16 mx-auto mb-4" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      style={{ color: config.colors.accent }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    <p 
                      className="text-lg"
                      style={{ color: config.colors.secondary }}
                    >
                      Map coming soon
                    </p>
                  </div>
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>

        {/* Additional Info */}
        <ScrollReveal animation="fade" delay={0.4}>
          <div 
            className="mt-12 p-6 bg-blue-50 rounded-xl text-center"
            style={{ backgroundColor: `${config.colors.accent}05` }}
          >
            <p 
              className="text-base"
              style={{ 
                fontFamily: config.fonts.english,
                color: config.colors.secondary,
              }}
            >
              💡 <strong>Pro Tip:</strong> Arrive 30 minutes early to find parking and get comfortable!
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
