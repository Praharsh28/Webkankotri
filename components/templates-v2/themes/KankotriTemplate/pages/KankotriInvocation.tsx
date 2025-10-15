/**
 * Kankotri Invocation Page (Page 2)
 * 
 * Features:
 * - Ganesh symbol (શ્રી ગણેશાય નમઃ)
 * - Host family names
 * - Venue details
 * - Religious blessing
 */

'use client';

import { ScrollTrigger } from '@/components/animations-v2';
import { GaneshSymbol, OmSymbol } from '../symbols/GaneshSymbol';
import { ProfessionalGanesh } from '../symbols/ProfessionalGanesh'; // NEW: Professional version!
import { TraditionalBorder, OrnateDivider } from '../decorations/TraditionalBorder';
import { ScrollReveal } from '../animations/SmoothScrollReveal'; // NEW: Smooth reveals!
import type { FamilyHost } from '@/types/v2/kankotri';

interface KankotriInvocationProps {
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
  };
  weddingDate: Date;
  config: any;
}

export function KankotriInvocation({
  groomName,
  brideName,
  hosts,
  venue,
  weddingDate,
  config,
}: KankotriInvocationProps) {
  const formattedDate = weddingDate.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'UTC',
  });

  const weekday = weddingDate.toLocaleDateString('en-US', {
    weekday: 'long',
    timeZone: 'UTC',
  });

  return (
    <div className="relative min-h-screen bg-[#f5f5dc] py-16 px-6">
      <TraditionalBorder type="full" color={config.colors.primary} />

      <div className="container mx-auto max-w-3xl">
        {/* Ganesh Invocation - UPGRADED! */}
        <ScrollReveal animation="scale" delay={0.2}>
          <div className="mb-12 text-center">
            {/* NEW: Professional Ganesh instead of simple one */}
            <div className="mb-4 flex justify-center">
              <ProfessionalGanesh size={140} animate />
            </div>
            
            {/* Om symbol in decorative frame */}
            <div className="mb-4 inline-block rounded-full border-2 border-[#d4af37]/40 px-8 py-3">
              <p className="font-serif text-4xl font-bold text-[#2d5016]">
                ॐ શ્રી ગણેશાય નમઃ ॐ
              </p>
            </div>
          </div>
        </ScrollReveal>

        <OrnateDivider color={config.colors.secondary} />

        {/* Names with decorative elements */}
        <ScrollTrigger animation="fade" delay={0.4}>
          <div className="mb-12 text-center">
            <p className="mb-6 font-serif text-xl text-[#3e2723]">
              શ્રી{' '}
              <span className="text-3xl font-bold text-[#2d5016]">{groomName}</span>
              {' '}ના સુપુત્ર તથા{' '}
              <span className="text-3xl font-bold text-[#2d5016]">{brideName}</span>
            </p>

            <div className="my-8 flex items-center justify-center gap-4">
              <div className="h-px w-24 bg-[#d4af37]/50" />
              <div className="flex items-center gap-2">
                <span className="text-2xl">💐</span>
                <span className="font-serif text-xl text-[#c41e3a]">⚭</span>
                <span className="text-2xl">💐</span>
              </div>
              <div className="h-px w-24 bg-[#d4af37]/50" />
            </div>

            <p className="font-serif text-lg text-[#3e2723]">
              {weekday}, {formattedDate}
            </p>
          </div>
        </ScrollTrigger>

        {/* Host Information */}
        <ScrollTrigger animation="fade" delay={0.6}>
          <div className="mb-10 rounded-lg border-2 border-[#2d5016]/20 bg-white/60 p-8">
            <p className="mb-4 text-center text-xs uppercase tracking-widest text-[#2d5016]/70">
              ॥ નિમંત્રક ॥
            </p>

            <div className="space-y-4 text-center font-light text-[#3e2723]">
              {hosts.groomSide.map((host, index) => (
                <p key={index} className="text-lg">
                  શ્રી {host.name}
                  {host.address && (
                    <span className="block text-sm text-[#3e2723]/70">{host.address}</span>
                  )}
                </p>
              ))}

              {hosts.brideSide.length > 0 && (
                <>
                  <div className="my-4 flex justify-center">
                    <div className="h-px w-32 bg-[#d4af37]/30" />
                  </div>
                  {hosts.brideSide.map((host, index) => (
                    <p key={index} className="text-lg">
                      શ્રી {host.name}
                      {host.address && (
                        <span className="block text-sm text-[#3e2723]/70">{host.address}</span>
                      )}
                    </p>
                  ))}
                </>
              )}
            </div>
          </div>
        </ScrollTrigger>

        {/* Venue */}
        <ScrollTrigger animation="fade" delay={0.8}>
          <div className="text-center">
            <p className="mb-3 text-xs uppercase tracking-widest text-[#2d5016]/70">
              ॥ શુભ સ્થળ ॥
            </p>
            <p className="mb-2 font-serif text-2xl font-bold text-[#c41e3a]">{venue.name}</p>
            <p className="font-light text-[#3e2723]">{venue.address}</p>
            <p className="font-light text-[#3e2723]">{venue.city}</p>
          </div>
        </ScrollTrigger>
      </div>
    </div>
  );
}
