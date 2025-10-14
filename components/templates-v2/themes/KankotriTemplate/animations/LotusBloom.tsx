/**
 * Lotus Bloom Animation
 * 
 * Lotus opens as you scroll
 * Sacred flower with morphing petals
 */

'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface LotusBloomProps {
  size?: number;
  color?: string;
  className?: string;
}

export function LotusBloom({ 
  size = 100, 
  color = '#c41e3a',
  className = '' 
}: LotusBloomProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Animate petal opening
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0, 360]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.div 
      ref={ref}
      className={`relative ${className}`}
      style={{ opacity }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer petals */}
        {[...Array(8)].map((_, i) => {
          const angle = i * 45;
          const petalRotate = useTransform(scrollYProgress, [0, 0.5], [90, angle]);
          const petalScale = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
          
          return (
            <motion.ellipse
              key={i}
              cx="50"
              cy="50"
              rx="15"
              ry="30"
              fill={color}
              opacity={0.7 - i * 0.05}
              style={{
                originX: '50px',
                originY: '50px',
                rotate: petalRotate,
                scale: petalScale,
              }}
            />
          );
        })}
        
        {/* Center - animates last */}
        <motion.circle 
          cx="50" 
          cy="50" 
          r="12" 
          fill="#d4af37" 
          opacity="0.9"
          style={{ scale }}
        />
        <motion.circle 
          cx="50" 
          cy="50" 
          r="6" 
          fill={color}
          style={{ scale, rotate }}
        />
        
        {/* Decorative dots */}
        {[...Array(6)].map((_, i) => {
          const angle = i * 60;
          const rad = (angle * Math.PI) / 180;
          const x = 50 + Math.cos(rad) * 8;
          const y = 50 + Math.sin(rad) * 8;
          return (
            <motion.circle 
              key={i} 
              cx={x} 
              cy={y} 
              r="1.5" 
              fill="#fff"
              style={{ scale }}
            />
          );
        })}
      </svg>
      
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle, ${color}40 0%, transparent 70%)`,
          filter: 'blur(20px)',
          scale,
        }}
      />
    </motion.div>
  );
}
