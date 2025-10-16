/**
 * Modern Kankotri Template
 * 
 * Style: Minimalist, clean, contemporary
 * Culture: Universal (works for all cultures)
 * Features: Subtle animations, modern typography, lots of white space
 */

'use client';

import { ErrorBoundary } from '@/components/ErrorBoundary';
import { SkipLink } from '@/components/Accessibility';
import { modernKankotriConfig } from './modern-kankotri-config';
import { Cover } from './pages/Cover';
import { Invocation } from './pages/Invocation';
import { Ceremonies } from './pages/Ceremonies';
import { PageLoader } from '@/components/LoadingStates';
import type { KankotriData } from '@/types/v2/kankotri';
import { Suspense } from 'react';

// Minimal animations for modern style
import { FloatingPetals } from '@/components/templates-v2/themes/KankotriTemplate/animations/FloatingPetals';

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

        {/* Minimal Animation Layer - subtle floating petals only */}
        <Suspense fallback={null}>
          <FloatingPetals 
            count={20}  // Much less than traditional (was 50)
            colors={['#f5f5f5', '#e8e8e8', '#fafafa']}  // Subtle grays
          />
        </Suspense>

        {/* Subtle grid pattern background */}
        <div 
          className="pointer-events-none fixed inset-0 z-0 opacity-[0.02]"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M30 0L30 60M0 30L60 30\' stroke=\'%23000\' stroke-width=\'0.5\' /%3E%3C/svg%3E")',
          }}
        />

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

            {/* Divider */}
            <div className="h-px bg-gray-200 max-w-4xl mx-auto" />

            {/* Page 3: Ceremonies */}
            {data.pages.ceremonies && normalizedCeremonies.length > 0 && (
              <Ceremonies
                ceremonies={normalizedCeremonies}
                config={config}
              />
            )}
          </Suspense>
        </main>
      </div>
    </ErrorBoundary>
  );
}
