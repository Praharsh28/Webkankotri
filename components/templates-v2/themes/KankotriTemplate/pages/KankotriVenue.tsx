/**
 * Kankotri Venue Page (Final Page)
 * 
 * Features:
 * - Venue details with map
 * - Contact information
 * - Closing blessing
 */

'use client';

import { ScrollTrigger } from '@/components/animations-v2';
import { TraditionalBorder, OrnateDivider } from '../decorations/TraditionalBorder';
import { MapPin, Phone } from 'lucide-react';

interface KankotriVenueProps {
  venue: {
    name: string;
    address: string;
    city: string;
    state?: string;
    pincode?: string;
    mapUrl?: string;
    phone?: string;
  };
  config: any;
}

export function KankotriVenue({ venue, config }: KankotriVenueProps) {
  return (
    <div className="relative min-h-screen bg-[#f5f5dc] py-16 px-6">
      <TraditionalBorder type="full" color={config.colors.primary} />

      <div className="container mx-auto max-w-3xl">
        {/* Header */}
        <ScrollTrigger animation="fade" delay={0.2}>
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs uppercase tracking-widest text-[#2d5016]/70">
              ॥ શુભ સ્થળ ॥
            </p>
            <h2 className="mb-2 font-serif text-4xl font-bold text-[#c41e3a]">
              {venue.name}
            </h2>
          </div>
        </ScrollTrigger>

        {/* Venue Details */}
        <ScrollTrigger animation="fade" delay={0.4}>
          <div className="mb-8 rounded-lg border-2 border-[#2d5016]/20 bg-white/70 p-8">
            <div className="space-y-4 text-center">
              <div className="flex items-start justify-center gap-3">
                <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-[#2d5016]" />
                <div className="font-light text-[#3e2723]">
                  <p className="text-lg">{venue.address}</p>
                  <p>{venue.city}{venue.state && `, ${venue.state}`}</p>
                  {venue.pincode && <p>{venue.pincode}</p>}
                </div>
              </div>

              {venue.phone && (
                <div className="flex items-center justify-center gap-3">
                  <Phone className="h-5 w-5 text-[#2d5016]" />
                  <a
                    href={`tel:${venue.phone}`}
                    className="font-light text-[#3e2723] hover:text-[#c41e3a]"
                  >
                    {venue.phone}
                  </a>
                </div>
              )}
            </div>
          </div>
        </ScrollTrigger>

        {/* Map */}
        {venue.mapUrl && (
          <ScrollTrigger animation="fade" delay={0.6}>
            <div className="mb-8 overflow-hidden rounded-lg border-2 border-[#2d5016]/20 shadow-md">
              <iframe
                src={venue.mapUrl}
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Venue location"
              />
            </div>
          </ScrollTrigger>
        )}

        <OrnateDivider color={config.colors.secondary} />

        {/* Closing Blessing */}
        <ScrollTrigger animation="fade" delay={0.8}>
          <div className="text-center">
            <p className="mb-4 font-serif text-lg text-[#2d5016]">
              ॥ શુભ સ્થળ ॥
            </p>
            <p className="mb-6 font-serif text-2xl italic text-[#c41e3a]">
              શ્રી કૃષ્ણાર્પણમસ્તુ
            </p>
            <p className="mb-8 font-light text-[#3e2723]">
              આપની હાજરીથી આ મંગલ કાર્યને ચાર ચાંદ લાગશે
            </p>
            <div className="flex items-center justify-center gap-3">
              <span className="text-2xl">🙏</span>
              <p className="font-serif text-lg text-[#2d5016]">
                આપના આશીર્વાદની અપેક્ષા છે
              </p>
              <span className="text-2xl">🙏</span>
            </div>
          </div>
        </ScrollTrigger>

        {/* Bottom decoration */}
        <div className="mt-12 flex justify-center">
          <svg width="100" height="60" viewBox="0 0 100 60" fill="none">
            <path
              d="M50 10 L30 40 L50 35 L70 40 Z"
              fill="#d4af37"
              opacity="0.3"
            />
            <circle cx="50" cy="20" r="8" fill="#c41e3a" opacity="0.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}
