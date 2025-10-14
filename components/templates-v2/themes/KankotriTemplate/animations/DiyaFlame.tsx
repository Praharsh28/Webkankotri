/**
 * Animated Diya Flame
 * 
 * Realistic flickering flame with glow
 * Sacred lamp animation
 */

'use client';

import { motion } from 'framer-motion';

interface DiyaFlameProps {
  size?: number;
  color?: string;
  className?: string;
  animate?: boolean;
}

export function DiyaFlame({ 
  size = 60, 
  color = '#d4af37',
  className = '',
  animate = true
}: DiyaFlameProps) {
  return (
    <div className={`relative ${className}`}>
      <svg
        width={size}
        height={size * 0.8}
        viewBox="0 0 100 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Diya bowl */}
        <ellipse cx="50" cy="55" rx="35" ry="15" fill={color} opacity="0.8" />
        <path
          d="M15 55 Q15 45 25 40 L75 40 Q85 45 85 55"
          fill={color}
          opacity="0.9"
        />
        
        {/* Animated flame */}
        <motion.g
          animate={animate ? {
            scaleY: [1, 1.1, 0.95, 1.05, 1],
            scaleX: [1, 0.95, 1.05, 0.98, 1],
            y: [0, -2, 1, -1, 0],
          } : {}}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ transformOrigin: '50px 40px' }}
        >
          {/* Outer flame */}
          <path
            d="M50 40 Q45 30 48 20 Q50 10 52 20 Q55 30 50 40 Z"
            fill="#ff6b35"
            opacity="0.9"
          />
          
          {/* Inner flame */}
          <path
            d="M50 35 Q48 28 49 22 Q50 18 51 22 Q52 28 50 35 Z"
            fill="#ffd700"
          />
          
          {/* Core */}
          <motion.ellipse
            cx="50"
            cy="28"
            rx="3"
            ry="4"
            fill="#fff"
            animate={animate ? {
              opacity: [0.8, 1, 0.7, 0.9, 0.8],
            } : {}}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          />
        </motion.g>
      </svg>

      {/* Glow effect */}
      {animate && (
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2"
          style={{
            width: size * 1.5,
            height: size * 1.5,
            background: 'radial-gradient(circle, rgba(255,215,0,0.3) 0%, transparent 70%)',
            filter: 'blur(20px)',
          }}
          animate={{
            opacity: [0.5, 0.8, 0.6, 0.9, 0.5],
            scale: [1, 1.1, 1.05, 1.15, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}
    </div>
  );
}
