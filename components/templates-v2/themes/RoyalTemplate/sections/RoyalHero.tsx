'use client';

import { GlowEffect, ParallaxSection, ScrollTrigger } from '@/components/animations-v2';
import type { CoupleInfo } from '@/types/v2/template';

interface RoyalHeroProps {
  groomName: string;
  brideName: string;
  weddingDate: Date;
  title: string;
  subtitle: string;
}

export function RoyalHero({
  groomName,
  brideName,
  weddingDate,
  title,
  subtitle,
}: RoyalHeroProps) {
  const formattedDate = weddingDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <section className="relative flex min-h-screen items-center justify-center px-6 py-24">
      <div className="container mx-auto max-w-4xl text-center">
        {/* Monogram/Crest placeholder */}
        <ScrollTrigger animation="fade" delay={0.2}>
          <div className="mb-16 flex justify-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full border border-amber-500/30">
              <span className="font-serif text-3xl text-amber-500/70">&</span>
            </div>
          </div>
        </ScrollTrigger>

        {/* Title - Typography driven */}
        <ScrollTrigger animation="fade" delay={0.5}>
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-white/40">
            You Are Cordially Invited To
          </p>
          <h1 className="mb-8 font-serif text-4xl font-light leading-relaxed tracking-wide text-white md:text-6xl lg:text-7xl">
            {title}
          </h1>
        </ScrollTrigger>

        {/* Hairline divider */}
        <ScrollTrigger animation="fade" delay={0.8}>
          <div className="mx-auto my-16 h-px w-32 bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
        </ScrollTrigger>

        {/* Names - Large, elegant */}
        <ScrollTrigger animation="fade" delay={1}>
          <div className="mb-16 space-y-8">
            <h2 className="font-serif text-6xl font-light tracking-wider text-amber-400/90 md:text-7xl lg:text-8xl">
              {groomName}
            </h2>
            <div className="my-8">
              <span className="font-serif text-2xl font-light text-white/50">&</span>
            </div>
            <h2 className="font-serif text-6xl font-light tracking-wider text-amber-400/90 md:text-7xl lg:text-8xl">
              {brideName}
            </h2>
          </div>
        </ScrollTrigger>

        {/* Date - Refined frame */}
        <ScrollTrigger animation="fade" delay={1.3}>
          <div className="mx-auto inline-block border-t border-b border-amber-500/20 px-12 py-6">
            <p className="mb-2 text-[10px] uppercase tracking-[0.35em] text-white/30">
              Save the Date
            </p>
            <p className="font-serif text-xl font-light text-white md:text-2xl">
              {formattedDate}
            </p>
          </div>
        </ScrollTrigger>
      </div>
    </section>
  );
}
