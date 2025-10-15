/**
 * Enhanced Kankotri Template
 * 
 * Integrates all autonomous improvements:
 * - Professional Ganesh & Peacock
 * - Physics-based animations
 * - Ambient sound
 * - Error boundaries
 * - Accessibility features
 * - Performance optimizations
 */

'use client';

import { ErrorBoundary } from '@/components/ErrorBoundary';
import { SkipLink } from '@/components/Accessibility';
import { kankotriConfig } from './kankotri-config';
import { KankotriCover } from './pages/KankotriCover';
import { KankotriInvocation } from './pages/KankotriInvocation';
import { KankotriCeremonies } from './pages/KankotriCeremonies';
import { KankotriVenue } from './pages/KankotriVenue';
import { PhysicsPetals } from './animations/PhysicsPetals';
import { AdvancedParticles } from './animations/AdvancedParticles';
import { AmbientSound } from './audio/AmbientSound';
import { PageLoader } from '@/components/LoadingStates';
import type { KankotriData } from '@/types/v2/kankotri';
import { Suspense } from 'react';

interface KankotriEnhancedProps {
  data: KankotriData;
}

export function KankotriEnhanced({ data }: KankotriEnhancedProps) {
  const config = data.customization || kankotriConfig;

  // Normalize dates to ensure deterministic rendering on server and client
  const normalizedWeddingDate = new Date((data.wedding as any).date);
  const normalizedCeremonies = Array.isArray(data.ceremonies)
    ? data.ceremonies.map((c: any) => ({ ...c, date: new Date(c.date) }))
    : [];

  return (
    <ErrorBoundary>
      <div className="relative min-h-screen" style={{ fontFamily: config.fonts.english }}>
        {/* Accessibility */}
        <SkipLink />

        {/* Advanced Animations Layer */}
        <Suspense fallback={null}>
          <PhysicsPetals count={50} windStrength={0.5} />
          <AdvancedParticles count={80} interactive connections />
        </Suspense>

        {/* Ambient Sound */}
        <AmbientSound />

        {/* Paper texture background overlay */}
        <div 
          className="pointer-events-none fixed inset-0 z-0 bg-repeat opacity-10"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100\' height=\'100\' filter=\'url(%23noise)\' opacity=\'0.3\' /%3E%3C/svg%3E")',
          }}
        />

        {/* Main Content */}
        <main id="main-content" className="relative z-10">
          <Suspense fallback={<PageLoader />}>
            {/* Page 1: Cover */}
            {data.pages.cover && (
              <KankotriCover
                groomName={data.groom.name}
                brideName={data.bride.name}
                weddingDate={normalizedWeddingDate}
                couplePhoto={data.couplePhoto}
                config={config}
              />
            )}

            {/* Page Break Effect */}
            <div className="h-8 bg-gradient-to-b from-[#f9f6f0] to-transparent" />

            {/* Page 2: Invocation */}
            {data.pages.invocation && (
              <KankotriInvocation
                groomName={data.groom.name}
                brideName={data.bride.name}
                hosts={data.hosts}
                venue={data.wedding.venue}
                weddingDate={normalizedWeddingDate}
                config={config}
              />
            )}

            {/* Page Break */}
            <div className="h-8 bg-gradient-to-b from-[#f9f6f0] to-transparent" />

            {/* Page 3: Ceremonies */}
            {data.pages.ceremonies && normalizedCeremonies.length > 0 && (
              <KankotriCeremonies
                ceremonies={normalizedCeremonies}
                config={config}
              />
            )}

            {/* Page Break */}
            <div className="h-8 bg-gradient-to-b from-[#f9f6f0] to-transparent" />

            {/* Page 4: Venue */}
            {data.pages.venue && (
              <KankotriVenue
                venue={data.wedding.venue}
                config={config}
              />
            )}
          </Suspense>
        </main>

        {/* Watermark */}
        <div className="fixed bottom-4 right-4 z-50 text-xs text-[#2d5016]/30">
          Made with 🙏 WebKankotri
        </div>
      </div>
    </ErrorBoundary>
  );
}
