/**
 * Modern Kankotri - Invocation Page
 * Clean, minimal invitation text
 */

'use client';

import type { KankotriConfig, FamilyHost } from '@/types/v2/kankotri';

interface InvocationProps {
  groomName: string;
  brideName: string;
  hosts: {
    groomSide: FamilyHost[];
    brideSide: FamilyHost[];
  };
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

export function Invocation({ 
  groomName, 
  brideName, 
  hosts,
  venue,
  weddingDate,
  config 
}: InvocationProps) {
  // REQUIRED: UTC-safe date formatting
  const formattedDate = weddingDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',  // ← REQUIRED
  });

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center px-6 py-20"
      style={{ backgroundColor: config.colors.background }}
    >
      <div className="max-w-2xl text-center">
        {/* Simple invitation text */}
        <p 
          className="text-sm uppercase tracking-widest mb-8"
          style={{ 
            fontFamily: config.fonts.english,
            color: config.colors.secondary,
            letterSpacing: '0.3em',
          }}
        >
          Together with their families
        </p>

        {/* Hosts - minimal list */}
        <div className="mb-12 space-y-1">
          {hosts.groomSide.slice(0, 2).map((host, i) => (
            <p 
              key={i} 
              className="text-base"
              style={{ 
                fontFamily: config.fonts.english,
                color: config.colors.text,
              }}
            >
              {host.name}
            </p>
          ))}
          <p className="text-sm my-2" style={{ color: config.colors.secondary }}>
            and
          </p>
          {hosts.brideSide.slice(0, 2).map((host, i) => (
            <p 
              key={i} 
              className="text-base"
              style={{ 
                fontFamily: config.fonts.english,
                color: config.colors.text,
              }}
            >
              {host.name}
            </p>
          ))}
        </div>

        {/* Main invitation */}
        <div className="my-16">
          <p 
            className="text-lg mb-6 tracking-wide"
            style={{ 
              fontFamily: config.fonts.english,
              color: config.colors.text,
            }}
          >
            Request the honor of your presence
            <br />
            at the wedding celebration of
          </p>

          <p 
            className="text-4xl mb-6 font-light"
            style={{ 
              fontFamily: config.fonts.decorative,
              color: config.colors.primary,
            }}
          >
            {groomName} & {brideName}
          </p>

          <p 
            className="text-base"
            style={{ 
              fontFamily: config.fonts.english,
              color: config.colors.secondary,
            }}
          >
            {formattedDate}
          </p>
        </div>

        {/* Venue - clean format */}
        <div className="mt-16 pt-16 border-t" style={{ borderColor: '#e5e5e5' }}>
          <p 
            className="text-sm uppercase tracking-widest mb-4"
            style={{ color: config.colors.secondary }}
          >
            Venue
          </p>
          <p 
            className="text-xl mb-2"
            style={{ 
              fontFamily: config.fonts.decorative,
              color: config.colors.primary,
            }}
          >
            {venue.name}
          </p>
          <p className="text-base" style={{ color: config.colors.text }}>
            {venue.address}
          </p>
          <p className="text-base" style={{ color: config.colors.text }}>
            {venue.city}, {venue.state}
          </p>
        </div>
      </div>
    </section>
  );
}
