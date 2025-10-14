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
        <ScrollTrigger animation="fade-up" delay={0.2}>
          <GlowEffect glowColor="#D4AF37" intensity={3} pulseSpeed={3}>
            <h1 className="mb-4 font-serif text-5xl font-bold text-white md:text-7xl">
              {title}
            </h1>
          </GlowEffect>
        </ScrollTrigger>

        <ScrollTrigger animation="fade-up" delay={0.4}>
          <p className="mb-8 text-xl text-white/90 md:text-2xl">
            {subtitle}
          </p>
        </ScrollTrigger>

        <ScrollTrigger animation="scale" delay={0.6}>
          <div className="my-12">
            <div className="mx-auto h-1 w-32 bg-gradient-to-r from-transparent via-gold-500 to-transparent" />
          </div>
        </ScrollTrigger>

        <ScrollTrigger animation="fade-up" delay={0.8}>
          <div className="mb-8 space-y-4">
            <h2 className="font-serif text-4xl font-bold text-gold-400 md:text-6xl">
              {groomName}
            </h2>
            <div className="flex items-center justify-center gap-4">
              <span className="text-3xl text-gold-300">✨</span>
              <span className="font-serif text-2xl text-white">&</span>
              <span className="text-3xl text-gold-300">✨</span>
            </div>
            <h2 className="font-serif text-4xl font-bold text-gold-400 md:text-6xl">
              {brideName}
            </h2>
          </div>
        </ScrollTrigger>

        <ScrollTrigger animation="fade-up" delay={1}>
          <div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
            <p className="mb-2 text-sm uppercase tracking-widest text-white/70">
              Save the Date
            </p>
            <p className="font-serif text-2xl font-bold text-white md:text-3xl">
              {formattedDate}
            </p>
          </div>
        </ScrollTrigger>
      </ParallaxSection>
    </section>
  );
}
