/**
 * Modern Kankotri - Cover Page (EXPERT EDITION)
 * Sophisticated animations: scroll reveals, parallax, gradient effects
 */

'use client';

import { ScrollReveal } from '@/components/templates-v2/themes/KankotriTemplate/animations/SmoothScrollReveal';
import type { KankotriConfig } from '@/types/v2/kankotri';

interface CoverProps {
  groomName: string;
  brideName: string;
  weddingDate: Date;
  couplePhoto?: string;
  config: KankotriConfig;
}

export function Cover({ 
  groomName, 
  brideName, 
  weddingDate, 
  couplePhoto,
  config 
}: CoverProps) {
  // REQUIRED: UTC-safe date formatting
  const formattedDate = weddingDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',  // ← REQUIRED
  });

  const day = weddingDate.getUTCDate();
  const month = weddingDate.toLocaleDateString('en-US', {
    month: 'short',
    timeZone: 'UTC',
  });

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden"
      style={{ backgroundColor: config.colors.background }}
    >
      {/* Animated background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-10 animate-float-slow"
          style={{ background: config.colors.accent }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-10 animate-float-slower"
          style={{ background: config.colors.primary }}
        />
      </div>

      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -30px) scale(1.1); }
        }
        @keyframes float-slower {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-30px, 30px) scale(1.1); }
        }
        .animate-float-slow {
          animation: float-slow 20s ease-in-out infinite;
        }
        .animate-float-slower {
          animation: float-slower 25s ease-in-out infinite;
        }
      `}</style>

      <div className="text-center max-w-2xl relative z-10">
        {/* Animated date badge with scroll reveal */}
        <ScrollReveal animation="fade" delay={0.1}>
          <div className="mb-12">
            <div 
              className="inline-block px-6 py-2 border rounded-full text-sm tracking-wider transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{ 
                borderColor: '#e5e5e5',
                color: config.colors.secondary,
              }}
            >
              {formattedDate}
            </div>
          </div>
        </ScrollReveal>

        {/* Couple Names with staggered reveal + gradient text */}
        <ScrollReveal animation="slide-up" delay={0.2}>
          <h1 
            className="text-7xl md:text-8xl mb-2 font-light tracking-tight transition-all duration-500 hover:scale-105"
            style={{ 
              fontFamily: config.fonts.decorative,
              background: `linear-gradient(135deg, ${config.colors.primary} 0%, ${config.colors.accent} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {groomName}
          </h1>
        </ScrollReveal>

        {/* Animated ampersand with rotation */}
        <ScrollReveal animation="scale" delay={0.3}>
          <div 
            className="text-3xl my-6 inline-block transition-transform duration-300 hover:rotate-12"
            style={{ color: config.colors.accent }}
          >
            &
          </div>
        </ScrollReveal>

        <ScrollReveal animation="slide-up" delay={0.4}>
          <h1 
            className="text-7xl md:text-8xl mb-12 font-light tracking-tight transition-all duration-500 hover:scale-105"
            style={{ 
              fontFamily: config.fonts.decorative,
              background: `linear-gradient(135deg, ${config.colors.accent} 0%, ${config.colors.primary} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {brideName}
          </h1>
        </ScrollReveal>

        {/* Subtitle with reveal */}
        <ScrollReveal animation="fade" delay={0.5}>
          <p 
            className="text-lg tracking-wide uppercase mb-16"
            style={{ 
              fontFamily: config.fonts.english,
              color: config.colors.secondary,
              letterSpacing: '0.2em',
            }}
          >
            are getting married
          </p>
        </ScrollReveal>

        {/* Date number with scale animation */}
        <ScrollReveal animation="scale" delay={0.6}>
          <div className="mb-8">
            <div 
              className="text-8xl font-light mb-2 transition-all duration-300 hover:scale-110"
              style={{ 
                color: config.colors.accent,
                textShadow: '0 0 40px rgba(37, 99, 235, 0.1)',
              }}
            >
              {day}
            </div>
            <div 
              className="text-xl uppercase tracking-wider"
              style={{ color: config.colors.secondary }}
            >
              {month}
            </div>
          </div>
        </ScrollReveal>

        {/* Optional couple photo with reveal + hover effect */}
        {couplePhoto && (
          <ScrollReveal animation="scale" delay={0.7}>
            <div className="mt-16">
              <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-2 border-gray-100 transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:border-blue-200">
                <img 
                  src={couplePhoto} 
                  alt={`${groomName} and ${brideName}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
