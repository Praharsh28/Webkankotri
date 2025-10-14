/**
 * Physics-Based Petal System
 * 
 * Realistic falling petals with:
 * - Real physics simulation
 * - Wind effects
 * - Rotation and tumbling
 * - Depth sorting (3D effect)
 * - Collision detection
 */

'use client';

import { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  z: number; // Depth (for 3D effect)
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  size: number;
  opacity: number;
  color: string;
  wobble: number;
  wobbleSpeed: number;
  mass: number;
}

interface PhysicsPetalsProps {
  count?: number;
  windStrength?: number;
  colors?: string[];
}

export function PhysicsPetals({ 
  count = 50,
  windStrength = 0.5,
  colors = ['#ff9999', '#ffb3ba', '#ffc8dd', '#f4c2c2', '#ff6b9d']
}: PhysicsPetalsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const petalsRef = useRef<Petal[]>([]);
  const animationFrameRef = useRef<number>();
  const windRef = useRef({ x: 0, y: 0 });
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialize petals with physics properties
    petalsRef.current = Array.from({ length: count }, () => {
      const z = Math.random(); // 0 (far) to 1 (near)
      const depthScale = 0.3 + z * 0.7; // Smaller when far, larger when near
      
      return {
        x: Math.random() * canvas.width,
        y: -Math.random() * canvas.height - 50,
        z,
        vx: (Math.random() - 0.5) * 2,
        vy: 1 + Math.random() * 2,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.1,
        size: (8 + Math.random() * 12) * depthScale,
        opacity: (0.3 + Math.random() * 0.4) * (0.5 + z * 0.5),
        color: colors[Math.floor(Math.random() * colors.length)],
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.02 + Math.random() * 0.03,
        mass: 0.5 + Math.random() * 0.5,
      };
    });

    // Physics simulation
    const updatePhysics = (deltaTime: number) => {
      // Update wind (sinusoidal for natural effect)
      timeRef.current += deltaTime;
      windRef.current.x = Math.sin(timeRef.current * 0.001) * windStrength;
      windRef.current.y = Math.cos(timeRef.current * 0.0005) * 0.2;

      petalsRef.current.forEach((petal) => {
        // Gravity
        const gravity = 0.05 * petal.mass;
        petal.vy += gravity;

        // Wind force (stronger on lighter petals)
        const windForce = (2 - petal.mass) * 0.5;
        petal.vx += windRef.current.x * windForce;
        petal.vy += windRef.current.y * windForce;

        // Air resistance
        const drag = 0.98;
        petal.vx *= drag;
        petal.vy *= drag;

        // Wobble (side-to-side motion)
        petal.wobble += petal.wobbleSpeed;
        const wobbleForce = Math.sin(petal.wobble) * 0.3;
        petal.vx += wobbleForce;

        // Update position
        petal.x += petal.vx;
        petal.y += petal.vy;

        // Rotation (tumbling effect)
        petal.rotation += petal.rotationSpeed;
        petal.rotationSpeed += (Math.random() - 0.5) * 0.002; // Slight variation

        // Bounds checking with wrapping
        if (petal.y > canvas.height + 50) {
          petal.y = -50;
          petal.x = Math.random() * canvas.width;
          petal.vy = 1 + Math.random() * 2;
          petal.vx = (Math.random() - 0.5) * 2;
        }

        if (petal.x < -50) petal.x = canvas.width + 50;
        if (petal.x > canvas.width + 50) petal.x = -50;

        // Clamp velocities (prevent runaway)
        const maxSpeed = 5;
        petal.vx = Math.max(-maxSpeed, Math.min(maxSpeed, petal.vx));
        petal.vy = Math.max(-maxSpeed, Math.min(maxSpeed, petal.vy));
      });
    };

    // Render with depth sorting
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Sort by z-index (far to near)
      const sortedPetals = [...petalsRef.current].sort((a, b) => a.z - b.z);

      sortedPetals.forEach((petal) => {
        ctx.save();
        ctx.translate(petal.x, petal.y);
        ctx.rotate(petal.rotation);
        ctx.globalAlpha = petal.opacity;

        // Draw petal (ellipse)
        ctx.fillStyle = petal.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, petal.size, petal.size * 1.5, 0, 0, Math.PI * 2);
        ctx.fill();

        // Add subtle shadow for depth
        if (petal.z > 0.5) {
          ctx.shadowBlur = 5;
          ctx.shadowColor = 'rgba(0,0,0,0.2)';
          ctx.shadowOffsetY = 2;
        }

        ctx.restore();
      });
    };

    // Animation loop with delta time
    let lastTime = performance.now();
    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      updatePhysics(deltaTime);
      render();

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate(performance.now());

    return () => {
      window.removeEventListener('resize', resize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [count, windStrength, colors]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-10"
      style={{ mixBlendMode: 'multiply' }}
    />
  );
}
