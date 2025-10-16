/**
 * Cinematic Kankotri Template - ULTRA PREMIUM
 * 
 * Style: 3D cinematic with movie-like transitions
 * Features: Parallax depth, 3D transforms, cinematic reveals
 * Target: Ultra-premium weddings ($500+ price point)
 */

'use client';

import { ErrorBoundary } from '@/components/ErrorBoundary';
import { SkipLink } from '@/components/Accessibility';
import { cinematicKankotriConfig } from './cinematic-kankotri-config';
import { CinematicCover } from './pages/CinematicCover';
import { PageLoader } from '@/components/LoadingStates';
import type { KankotriData } from '@/types/v2/kankotri';
import { Suspense, useEffect, useRef, useState } from 'react';

// ULTRA PREMIUM ANIMATIONS - Movie-quality
import { AdvancedParticles } from '@/components/templates-v2/themes/KankotriTemplate/animations/AdvancedParticles';
import { PhysicsPetals } from '@/components/templates-v2/themes/KankotriTemplate/animations/PhysicsPetals';
import { GoldDustCursor } from '@/components/templates-v2/themes/KankotriTemplate/animations/GoldDustCursor';
import { AmbientSound } from '@/components/templates-v2/themes/KankotriTemplate/audio/AmbientSound';
import { ParallaxLayers } from './animations/ParallaxLayers';
import { CinematicTransition } from './animations/CinematicTransition';

interface CinematicKankotriEnhancedProps {
  data: KankotriData;
}

export function CinematicKankotriEnhanced({ data }: CinematicKankotriEnhancedProps) {
  const config = data.customization || cinematicKankotriConfig;
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // REQUIRED: Normalize dates
  const normalizedWeddingDate = new Date(data.wedding.date);
  const normalizedCeremonies = Array.isArray(data.ceremonies)
    ? data.ceremonies.map((c) => ({ ...c, date: new Date(c.date) }))
    : [];

  // Track scroll for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <ErrorBoundary>
      <div 
        ref={containerRef}
        className="relative min-h-screen bg-black text-white overflow-x-hidden"
        style={{ 
          fontFamily: config.fonts.english,
          perspective: '1000px',  // Enable 3D space
        }}
      >
        {/* Accessibility */}
        <SkipLink />

        {/* ULTRA PREMIUM ANIMATION LAYERS - 8 LAYERS! */}
        <Suspense fallback={null}>
          {/* Layer 1: Parallax background system (5 depth layers) */}
          <ParallaxLayers scrollY={scrollY} />
          
          {/* Layer 2: MASSIVE physics petals (200!) */}
          <PhysicsPetals 
            count={200}
            windStrength={0.9}
            colors={['#ffd700', '#ffed4e', '#fff9c4', '#fffde7']}  // Gold tones
          />
          
          {/* Layer 3: Particle constellation (200 particles!) */}
          <AdvancedParticles 
            count={200}
            interactive
            connections
          />
          
          {/* Layer 4: Premium gold cursor */}
          <GoldDustCursor />
          
          {/* Layer 5: Cinematic page transitions */}
          <CinematicTransition />
          
          {/* Layer 6: Ambient cinematic sound */}
          <AmbientSound />
        </Suspense>

        {/* Cinematic vignette overlay */}
        <div 
          className="pointer-events-none fixed inset-0 z-10"
          style={{
            background: 'radial-gradient(circle at center, transparent 0%, transparent 40%, rgba(0,0,0,0.4) 100%)',
          }}
        />

        {/* Film grain effect */}
        <div 
          className="pointer-events-none fixed inset-0 z-10 opacity-[0.03] mix-blend-overlay"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
            animation: 'grain 8s steps(10) infinite',
          }}
        />

        {/* Animated light rays */}
        <div className="pointer-events-none fixed inset-0 z-5 opacity-10">
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(45deg, transparent 0%, rgba(255,215,0,0.1) 50%, transparent 100%)',
              animation: 'light-sweep 15s linear infinite',
            }}
          />
        </div>

        <style jsx global>{`
          @keyframes grain {
            0%, 100% { transform: translate(0, 0); }
            10% { transform: translate(-5%, -10%); }
            30% { transform: translate(3%, -15%); }
            50% { transform: translate(12%, 9%); }
            70% { transform: translate(9%, 4%); }
            90% { transform: translate(-1%, 7%); }
          }
          
          @keyframes light-sweep {
            0% { transform: translateX(-100%) rotate(45deg); }
            100% { transform: translateX(200%) rotate(45deg); }
          }

          /* 3D card flip utilities */
          .card-3d {
            transform-style: preserve-3d;
            transition: transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
          }
          .card-3d:hover {
            transform: rotateY(10deg) rotateX(-5deg) scale(1.05);
          }

          /* Cinematic glow */
          .cinematic-glow {
            box-shadow: 
              0 0 20px rgba(255, 215, 0, 0.3),
              0 0 40px rgba(255, 215, 0, 0.2),
              0 0 60px rgba(255, 215, 0, 0.1);
          }
        `}</style>

        {/* Main Content with 3D transforms */}
        <main 
          id="main-content" 
          className="relative z-20"
          style={{
            transformStyle: 'preserve-3d',
          }}
        >
          <Suspense fallback={<PageLoader />}>
            {/* Cinematic Cover with 3D depth */}
            {data.pages.cover && (
              <div
                style={{
                  transform: `translateZ(${scrollY * 0.5}px) scale(${1 - scrollY * 0.0005})`,
                  opacity: 1 - scrollY * 0.002,
                }}
              >
                <CinematicCover
                  groomName={data.groom.name}
                  brideName={data.bride.name}
                  weddingDate={normalizedWeddingDate}
                  couplePhoto={data.couplePhoto}
                  config={config}
                  scrollY={scrollY}
                />
              </div>
            )}

            {/* More pages coming... */}
          </Suspense>
        </main>
      </div>
    </ErrorBoundary>
  );
}
