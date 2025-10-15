/**
 * Kankotri Ceremonies Page (Page 3)
 * 
 * Features:
 * - Multiple ceremony listings (માંગલિક કાર્યક્રમો)
 * - Mandap, Haldi, Sangeet, Garba, etc.
 * - Date, time, venue for each
 * - Traditional decorative elements
 */

'use client';

import { ScrollTrigger } from '@/components/animations-v2';
import { TraditionalBorder, OrnateDivider } from '../decorations/TraditionalBorder';
import { StaggerReveal, StaggerItem } from '../animations/SmoothScrollReveal'; // NEW: Stagger animations!
import { BounceIcon } from '../micro-interactions'; // NEW: Bounce effect!
import type { KankotriCeremony } from '@/types/v2/kankotri';

interface KankotriCeremoniesProps {
  ceremonies: KankotriCeremony[];
  config: any;
}

export function KankotriCeremonies({ ceremonies, config }: KankotriCeremoniesProps) {
  return (
    <div className="relative min-h-screen bg-[#f5f5dc] py-16 px-6">
      <TraditionalBorder type="full" color={config.colors.primary} />

      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <ScrollTrigger animation="fade" delay={0.2}>
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs uppercase tracking-widest text-[#2d5016]/70">
              ॥ શુભ મુહૂર્ત ॥
            </p>
            <h2 className="mb-2 font-serif text-4xl font-bold text-[#2d5016]">
              માંગલિક કાર્યક્રમો
            </h2>
            <p className="font-light italic text-[#3e2723]">Wedding Ceremonies</p>
          </div>
        </ScrollTrigger>

        <OrnateDivider color={config.colors.secondary} />

        {/* Ceremonies Grid - UPGRADED with stagger animation! */}
        <StaggerReveal staggerDelay={0.15} className="grid gap-8 md:grid-cols-2">
          {ceremonies.map((ceremony, index) => (
            <StaggerItem key={ceremony.id}>
              <div className="rounded-lg border-2 border-[#2d5016]/20 bg-white/70 p-6 shadow-sm transition-all hover:shadow-md">
                {/* Ceremony Icon/Emoji - NEW: Bounce on hover! */}
                <BounceIcon className="mb-3 text-center text-3xl">
                  {getCeremonyEmoji(ceremony.type)}
                </BounceIcon>

                {/* Ceremony Name */}
                <h3 className="mb-4 text-center font-serif text-2xl font-bold text-[#c41e3a]">
                  {ceremony.nameGujarati || ceremony.name}
                </h3>

                {/* Details */}
                <div className="space-y-2 text-center font-light text-[#3e2723]">
                  <p className="text-sm uppercase tracking-wider text-[#2d5016]/70">
                    {ceremony.date.toLocaleDateString('en-US', {
                      weekday: 'long',
                    })}
                  </p>
                  <p className="text-lg">
                    તા. {ceremony.date.toLocaleDateString('en-IN', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    })}
                  </p>
                  <p className="flex items-center justify-center gap-2">
                    <span className="text-xl">🕐</span>
                    <span>{ceremony.time}</span>
                  </p>
                  <p className="text-sm">{ceremony.venue}</p>
                </div>

                {/* Description if available */}
                {ceremony.description && (
                  <p className="mt-4 border-t border-[#d4af37]/20 pt-3 text-center text-sm italic text-[#3e2723]/70">
                    {ceremony.description}
                  </p>
                )}
              </div>
            </StaggerItem>
          ))}
        </StaggerReveal>

        {/* Bottom decorative text */}
        <ScrollTrigger animation="fade" delay={0.8}>
          <div className="mt-12 text-center">
            <p className="font-serif text-lg italic text-[#2d5016]/70">
              આપના શુભ આશીર્વાદની વિનંતી સાથે
            </p>
          </div>
        </ScrollTrigger>
      </div>
    </div>
  );
}

// Helper function to get ceremony emoji
function getCeremonyEmoji(type: string): string {
  const emojiMap: Record<string, string> = {
    mandap: '🏛️',
    haldi: '🌻',
    sangeet: '🎵',
    garba: '💃',
    swagatam: '🍽️',
    mehndi: '🎨',
    vidai: '👋',
    custom: '🎉',
  };
  return emojiMap[type] || '🎊';
}
