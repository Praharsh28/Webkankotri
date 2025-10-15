/**
 * Advanced Particle System
 * 
 * Gold dust particles with:
 * - Physics-based movement
 * - Mouse interaction (attraction/repulsion)
 * - Particle connections (lines between nearby)
 * - Depth sorting
 * - Performance optimization
 */

'use client';

import { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  life: number;
}

interface AdvancedParticlesProps {
  count?: number;
  interactive?: boolean;
  connections?: boolean;
}

export function AdvancedParticles({ 
  count = 80,
  interactive = true,
  connections = true,
}: AdvancedParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const animationFrameRef = useRef<number | undefined>(undefined);
  const [isReduced] = useState(() => 
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    if (isReduced) return; // Respect user preferences

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialize particles
    const colors = ['#ffd700', '#b8860b', '#d4af37', '#f4d03f'];
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      z: Math.random(),
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: 1 + Math.random() * 2,
      opacity: 0.3 + Math.random() * 0.4,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 1,
    }));

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseleave', handleMouseLeave);
    }

    // Physics update
    const updateParticles = () => {
      particlesRef.current.forEach((particle, i) => {
        // Mouse interaction
        if (interactive && mouseRef.current.active) {
          const dx = mouseRef.current.x - particle.x;
          const dy = mouseRef.current.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 150;

          if (distance < maxDistance) {
            // Attraction force (subtle)
            const force = (1 - distance / maxDistance) * 0.1;
            particle.vx += (dx / distance) * force;
            particle.vy += (dy / distance) * force;
          }
        }

        // Ambient drift
        particle.vx += (Math.random() - 0.5) * 0.02;
        particle.vy += (Math.random() - 0.5) * 0.02;

        // Damping
        particle.vx *= 0.98;
        particle.vy *= 0.98;

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Clamp velocity
        const maxSpeed = 3;
        const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
        if (speed > maxSpeed) {
          particle.vx = (particle.vx / speed) * maxSpeed;
          particle.vy = (particle.vy / speed) * maxSpeed;
        }
      });
    };

    // Render with connections
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections first (background)
      if (connections) {
        ctx.strokeStyle = 'rgba(212, 175, 55, 0.15)';
        ctx.lineWidth = 0.5;

        for (let i = 0; i < particlesRef.current.length; i++) {
          for (let j = i + 1; j < particlesRef.current.length; j++) {
            const p1 = particlesRef.current[i];
            const p2 = particlesRef.current[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
              const opacity = (1 - distance / 100) * 0.2;
              ctx.globalAlpha = opacity;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }
      }

      // Sort by z-index
      const sorted = [...particlesRef.current].sort((a, b) => a.z - b.z);

      // Draw particles
      sorted.forEach((particle) => {
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = particle.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = particle.color;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * (0.5 + particle.z * 0.5), 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      });
    };

    // Animation loop
    const animate = () => {
      updateParticles();
      render();
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (interactive) {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseleave', handleMouseLeave);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [count, interactive, connections, isReduced]);

  if (isReduced) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-40"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
