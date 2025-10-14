'use client';

import { ScrollTrigger } from '@/components/animations-v2';
import { MapPin, Phone, Globe } from 'lucide-react';
import type { VenueInfo, AccommodationInfo } from '@/types/v2/template';

interface RoyalVenueProps {
  venue: VenueInfo;
  accommodation?: AccommodationInfo[];
}

export function RoyalVenue({ venue, accommodation }: RoyalVenueProps) {
  return (
    <section className="bg-gray-50 py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <ScrollTrigger animation="fade-up">
          <h2 className="mb-12 text-center font-serif text-4xl font-bold text-purple-900 md:text-5xl">
            Venue & Stay
          </h2>
        </ScrollTrigger>

        {/* Main Venue */}
        <ScrollTrigger animation="fade-up" delay={0.2}>
          <div className="mb-16 rounded-lg bg-white p-8 shadow-lg">
            <h3 className="mb-6 font-serif text-3xl font-bold text-purple-900">
              Wedding Venue
            </h3>

            <div className="mb-6 space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-purple-600" />
                <div>
                  <p className="font-bold text-gray-900">{venue.name}</p>
                  <p className="text-gray-600">{venue.address}</p>
                </div>
              </div>
            </div>

            {venue.mapUrl && (
              <div className="overflow-hidden rounded-lg">
                <iframe
                  src={venue.mapUrl}
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Venue location map"
                />
              </div>
            )}

            {venue.coordinates && !venue.mapUrl && (
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${venue.coordinates.lat},${venue.coordinates.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-6 py-3 text-white transition-colors hover:bg-purple-700"
              >
                <MapPin className="h-5 w-5" />
                Open in Google Maps
              </a>
            )}
          </div>
        </ScrollTrigger>

        {/* Accommodation */}
        {accommodation && accommodation.length > 0 && (
          <div>
            <ScrollTrigger animation="fade-up">
              <h3 className="mb-8 text-center font-serif text-3xl font-bold text-purple-900">
                Recommended Stay
              </h3>
            </ScrollTrigger>

            <div className="grid gap-6 md:grid-cols-2">
              {accommodation.map((hotel, index) => (
                <ScrollTrigger
                  key={index}
                  animation="fade-up"
                  delay={0.2 * (index + 1)}
                >
                  <div className="rounded-lg bg-white p-6 shadow-md">
                    <h4 className="mb-4 text-xl font-bold text-purple-900">
                      {hotel.name}
                    </h4>

                    <div className="space-y-3 text-gray-600">
                      <div className="flex items-start gap-3">
                        <MapPin className="mt-1 h-4 w-4 flex-shrink-0" />
                        <p className="text-sm">{hotel.address}</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 flex-shrink-0" />
                        <a
                          href={`tel:${hotel.phone}`}
                          className="text-sm text-purple-600 hover:underline"
                        >
                          {hotel.phone}
                        </a>
                      </div>

                      {hotel.website && (
                        <div className="flex items-center gap-3">
                          <Globe className="h-4 w-4 flex-shrink-0" />
                          <a
                            href={hotel.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-purple-600 hover:underline"
                          >
                            Visit Website
                          </a>
                        </div>
                      )}
                    </div>

                    {hotel.mapUrl && (
                      <a
                        href={hotel.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-2 text-sm text-purple-600 hover:underline"
                      >
                        <MapPin className="h-4 w-4" />
                        View on Map
                      </a>
                    )}
                  </div>
                </ScrollTrigger>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
