/**
 * Modern Kankotri Template - EXPERT EDITION
 * 
 * Style: Sophisticated modern with expert animations
 * Culture: Universal (works for all cultures)
 * Features: Smooth scroll reveals, parallax, gradient animations, interactive particles
 */

'use client';

import { ErrorBoundary } from '@/components/ErrorBoundary';
import { SkipLink } from '@/components/Accessibility';
import { modernKankotriConfig } from './modern-kankotri-config';
import { Cover } from './pages/Cover';
import { Invocation } from './pages/Invocation';
import { Ceremonies } from './pages/Ceremonies';
import { Timeline } from './pages/Timeline';
import { Venue } from './pages/Venue';
import { PageLoader } from '@/components/LoadingStates';
import type { KankotriData } from '@/types/v2/kankotri';
import { Suspense } from 'react';

// MAXIMUM ANIMATIONS - Premium experience
import { AdvancedParticles } from '@/components/templates-v2/themes/KankotriTemplate/animations/AdvancedParticles';
import { PhysicsPetals } from '@/components/templates-v2/themes/KankotriTemplate/animations/PhysicsPetals';
import { GoldDustCursor } from '@/components/templates-v2/themes/KankotriTemplate/animations/GoldDustCursor';
import { AmbientSound } from '@/components/templates-v2/themes/KankotriTemplate/audio/AmbientSound';

interface ModernKankotriEnhancedProps {
  data: KankotriData;
}

export function ModernKankotriEnhanced({ data }: ModernKankotriEnhancedProps) {
  const config = data.customization || modernKankotriConfig;

  // REQUIRED: Normalize dates to ensure deterministic rendering
  const normalizedWeddingDate = new Date(data.wedding.date);
  const normalizedCeremonies = Array.isArray(data.ceremonies)
    ? data.ceremonies.map((c) => ({ ...c, date: new Date(c.date) }))
    : [];

  return (
    <ErrorBoundary>
      <div 
        className="relative min-h-screen bg-white"
        style={{ fontFamily: config.fonts.english }}
      >
        {/* Accessibility */}
        <SkipLink />

        {/* MAXIMUM ANIMATIONS LAYER - JAW-DROPPING EXPERIENCE */}
        <Suspense fallback={null}>
          {/* Layer 1: Physics-based falling petals (HEAVY - 120 petals!) */}
          <PhysicsPetals 
            count={120}
            windStrength={0.7}
            colors={['#e8e8ff', '#f0f0ff', '#d8d8ff', '#c8c8ff']}  // Subtle blue/white
          />
          
          {/* Layer 2: Interactive particle network (MASSIVE - 150 particles!) */}
          <AdvancedParticles 
            count={150}
            interactive
            connections  // Draw connections for complexity
          />
          
          {/* Layer 3: Gold dust cursor trail - enhanced */}
          <GoldDustCursor />
          
          {/* Layer 4: Ambient sound (synthesized modern tones) */}
          <AmbientSound />
        </Suspense>

        {/* Animated gradient overlay - living colors */}
        <div 
          className="pointer-events-none fixed inset-0 z-0"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(37, 99, 235, 0.03) 0%, transparent 50%)',
            animation: 'gradient-shift 15s ease infinite',
          }}
        />

        {/* Subtle animated mesh gradient */}
        <div 
          className="pointer-events-none fixed inset-0 z-0 opacity-[0.015]"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M30 0L30 60M0 30L60 30\' stroke=\'%23000\' stroke-width=\'0.5\' /%3E%3C/svg%3E")',
          }}
        />

        <style jsx global>{`
          @keyframes gradient-shift {
            0%, 100% { 
              transform: translate(0, 0) scale(1);
              opacity: 0.03;
            }
            50% { 
              transform: translate(10%, 10%) scale(1.1);
              opacity: 0.05;
            }
          }
        `}</style>

        {/* Main Content */}
        <main id="main-content" className="relative z-10">
          <Suspense fallback={<PageLoader />}>
            {/* Page 1: Cover */}
            {data.pages.cover && (
              <Cover
                groomName={data.groom.name}
                brideName={data.bride.name}
                weddingDate={normalizedWeddingDate}
                couplePhoto={data.couplePhoto}
                config={config}
              />
            )}

            {/* Minimal divider */}
            <div className="h-px bg-gray-200 max-w-4xl mx-auto" />

            {/* Page 2: Invocation */}
            {data.pages.invocation && (
              <Invocation
                groomName={data.groom.name}
                brideName={data.bride.name}
                hosts={data.hosts}
                venue={data.wedding.venue}
                weddingDate={normalizedWeddingDate}
                config={config}
              />
            )}

            {/* Divider with animation */}
            <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent max-w-4xl mx-auto" />

            {/* Page 3: Ceremonies */}
            {data.pages.ceremonies && normalizedCeremonies.length > 0 && (
              <Ceremonies
                ceremonies={normalizedCeremonies}
                config={config}
              />
            )}

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent max-w-4xl mx-auto" />

            {/* Page 4: Timeline (NEW) */}
            <Timeline
              weddingDate={normalizedWeddingDate}
              ceremonies={normalizedCeremonies}
              config={config}
            />

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent max-w-4xl mx-auto" />

            {/* Page 5: Venue (NEW) */}
            {data.pages.venue && (
              <Venue
                venue={data.wedding.venue}
                weddingDate={normalizedWeddingDate}
                config={config}
              />
            )}
          </Suspense>
        </main>
      </div>
    </ErrorBoundary>
  );
}
