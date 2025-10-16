/**
 * Cinematic Cover Page - ULTRA PREMIUM
 * 3D transforms, cinematic reveals, movie-quality animations
 */

'use client';

import { ScrollReveal } from '@/components/templates-v2/themes/KankotriTemplate/animations/SmoothScrollReveal';
import type { KankotriConfig } from '@/types/v2/kankotri';
import { useState, useEffect } from 'react';

interface CinematicCoverProps {
  groomName: string;
  brideName: string;
  weddingDate: Date;
  couplePhoto?: string;
  config: KankotriConfig;
  scrollY: number;
}

export function CinematicCover({ 
  groomName, 
  brideName, 
  weddingDate, 
  couplePhoto,
  config,
  scrollY
}: CinematicCoverProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Track mouse for 3D tilt effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // REQUIRED: UTC-safe date formatting
  const formattedDate = weddingDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center px-6 py-20"
      style={{
        background: 'radial-gradient(circle at center, rgba(26, 26, 26, 1) 0%, #000000 100%)',
      }}
    >
      {/* 3D Tilting container */}
      <div 
        className="relative max-w-5xl w-full"
        style={{
          transform: `
            perspective(1000px) 
            rotateY(${mousePos.x * 0.05}deg) 
            rotateX(${-mousePos.y * 0.05}deg)
            translateZ(50px)
          `,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.1s ease-out',
        }}
      >
        {/* Cinematic letterbox bars */}
        <div className="absolute -top-32 left-0 right-0 h-24 bg-black z-30 opacity-80" />
        <div className="absolute -bottom-32 left-0 right-0 h-24 bg-black z-30 opacity-80" />

        {/* Main content with layered 3D depth */}
        <div className="relative z-10 text-center">
          {/* Date badge with 3D lift */}
          <ScrollReveal animation="fade" delay={0.2}>
            <div 
              className="mb-16 inline-block"
              style={{
                transform: 'translateZ(100px)',
                transformStyle: 'preserve-3d',
              }}
            >
              <div 
                className="px-8 py-3 rounded-full text-sm tracking-[0.3em] uppercase cinematic-glow"
                style={{ 
                  background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(255, 107, 53, 0.1) 100%)',
                  border: '1px solid rgba(255, 215, 0, 0.3)',
                  color: config.colors.primary,
                  backdropFilter: 'blur(10px)',
                }}
              >
                {formattedDate}
              </div>
            </div>
          </ScrollReveal>

          {/* Names with MASSIVE 3D effect */}
          <div className="space-y-8 mb-16">
            <ScrollReveal animation="slide-up" delay={0.3}>
              <h1 
                className="text-8xl md:text-9xl font-light tracking-tight relative"
                style={{ 
                  fontFamily: config.fonts.decorative,
                  transform: 'translateZ(150px)',
                  transformStyle: 'preserve-3d',
                }}
              >
                <span
                  className="block relative"
                  style={{
                    background: `linear-gradient(135deg, ${config.colors.primary} 0%, #fff 50%, ${config.colors.primary} 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    backgroundSize: '200% 200%',
                    animation: 'shimmer 3s ease-in-out infinite',
                    textShadow: `
                      0 0 80px rgba(255, 215, 0, 0.5),
                      0 0 120px rgba(255, 215, 0, 0.3),
                      0 10px 40px rgba(0, 0, 0, 0.8)
                    `,
                  }}
                >
                  {groomName}
                </span>
              </h1>
            </ScrollReveal>

            {/* Cinematic divider with animation */}
            <ScrollReveal animation="scale" delay={0.4}>
              <div 
                className="flex items-center justify-center gap-4 my-8"
                style={{ transform: 'translateZ(120px)' }}
              >
                <div 
                  className="h-px w-32 bg-gradient-to-r from-transparent via-gold to-transparent"
                  style={{
                    background: `linear-gradient(90deg, transparent 0%, ${config.colors.primary} 50%, transparent 100%)`,
                    animation: 'pulse-width 2s ease-in-out infinite',
                  }}
                />
                <div 
                  className="text-5xl cinematic-glow"
                  style={{ 
                    color: config.colors.accent,
                    animation: 'float 3s ease-in-out infinite',
                  }}
                >
                  ✦
                </div>
                <div 
                  className="h-px w-32 bg-gradient-to-r from-transparent via-gold to-transparent"
                  style={{
                    background: `linear-gradient(90deg, transparent 0%, ${config.colors.primary} 50%, transparent 100%)`,
                    animation: 'pulse-width 2s ease-in-out infinite',
                  }}
                />
              </div>
            </ScrollReveal>

            <ScrollReveal animation="slide-up" delay={0.5}>
              <h1 
                className="text-8xl md:text-9xl font-light tracking-tight"
                style={{ 
                  fontFamily: config.fonts.decorative,
                  transform: 'translateZ(150px)',
                }}
              >
                <span
                  className="block"
                  style={{
                    background: `linear-gradient(135deg, #fff 0%, ${config.colors.primary} 50%, #fff 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    backgroundSize: '200% 200%',
                    animation: 'shimmer 3s ease-in-out infinite 0.5s',
                    textShadow: `
                      0 0 80px rgba(255, 215, 0, 0.5),
                      0 0 120px rgba(255, 215, 0, 0.3),
                      0 10px 40px rgba(0, 0, 0, 0.8)
                    `,
                  }}
                >
                  {brideName}
                </span>
              </h1>
            </ScrollReveal>
          </div>

          {/* Subtitle with typing effect */}
          <ScrollReveal animation="fade" delay={0.6}>
            <p 
              className="text-2xl tracking-[0.4em] uppercase mb-20"
              style={{ 
                fontFamily: config.fonts.english,
                color: 'rgba(255, 255, 255, 0.6)',
                transform: 'translateZ(80px)',
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)',
              }}
            >
              A Cinematic Love Story
            </p>
          </ScrollReveal>

          {/* Optional couple photo with 3D card effect */}
          {couplePhoto && (
            <ScrollReveal animation="scale" delay={0.7}>
              <div 
                className="mt-20 inline-block card-3d cinematic-glow"
                style={{
                  transform: 'translateZ(200px)',
                  transformStyle: 'preserve-3d',
                }}
              >
                <div 
                  className="relative w-80 h-80 rounded-2xl overflow-hidden border-2"
                  style={{ 
                    borderColor: config.colors.primary,
                    boxShadow: `
                      0 25px 50px rgba(0, 0, 0, 0.8),
                      0 0 60px rgba(255, 215, 0, 0.3),
                      inset 0 0 20px rgba(255, 215, 0, 0.1)
                    `,
                  }}
                >
                  <img 
                    src={couplePhoto} 
                    alt={`${groomName} and ${brideName}`}
                    className="w-full h-full object-cover"
                    style={{
                      filter: 'brightness(1.1) contrast(1.1) saturate(1.2)',
                    }}
                  />
                  {/* Photo overlay gradient */}
                  <div 
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, transparent 50%, rgba(255, 107, 53, 0.1) 100%)',
                      mixBlendMode: 'overlay',
                    }}
                  />
                </div>
              </div>
            </ScrollReveal>
          )}
        </div>

        {/* Decorative 3D geometric shapes */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div 
            className="absolute top-1/4 left-10 w-20 h-20 border-2 opacity-20"
            style={{
              borderColor: config.colors.primary,
              transform: `translateZ(50px) rotate(${scrollY * 0.1}deg)`,
              animation: 'float 6s ease-in-out infinite',
            }}
          />
          <div 
            className="absolute bottom-1/3 right-10 w-16 h-16 rounded-full border-2 opacity-20"
            style={{
              borderColor: config.colors.accent,
              transform: `translateZ(30px) rotate(${-scrollY * 0.15}deg)`,
              animation: 'float 5s ease-in-out infinite 1s',
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes pulse-width {
          0%, 100% { transform: scaleX(1); opacity: 0.5; }
          50% { transform: scaleX(1.5); opacity: 1; }
        }
      `}</style>
    </section>
  );
}
