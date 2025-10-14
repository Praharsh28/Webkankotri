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
    <section className="relative flex min-h-screen items-center justify-center px-4">
      <ParallaxSection speed={0.3} className="container mx-auto text-center">
        <ScrollTrigger animation="fade-up" delay={0.3}>
          <h1 className="mb-6 font-serif text-5xl font-bold leading-tight text-white md:text-7xl">
            {title}
          </h1>
        </ScrollTrigger>

        <ScrollTrigger animation="fade-up" delay={0.5}>
          <p className="mb-12 text-lg text-white/80 md:text-xl">
            {subtitle}
          </p>
        </ScrollTrigger>

        <ScrollTrigger animation="scale" delay={0.7}>
          <div className="my-16">
            <div className="mx-auto h-px w-24 bg-white/30" />
          </div>
        </ScrollTrigger>

        <ScrollTrigger animation="fade-up" delay={0.9}>
          <div className="mb-12 space-y-6">
            <h2 className="font-serif text-5xl font-light tracking-wide text-amber-200 md:text-6xl">
              {groomName}
            </h2>
            <div className="flex items-center justify-center">
              <span className="font-serif text-xl text-white/60">&</span>
            </div>
            <h2 className="font-serif text-5xl font-light tracking-wide text-amber-200 md:text-6xl">
              {brideName}
            </h2>
          </div>
        </ScrollTrigger>

        <ScrollTrigger animation="fade-up" delay={1.1}>
          <div className="inline-block border border-white/20 bg-white/5 px-8 py-4 backdrop-blur-sm">
            <p className="mb-1 text-xs uppercase tracking-[0.2em] text-white/50">
              Save the Date
            </p>
            <p className="font-serif text-xl text-white md:text-2xl">
              {formattedDate}
            </p>
          </div>
        </ScrollTrigger>
      </ParallaxSection>
    </section>
  );
}
