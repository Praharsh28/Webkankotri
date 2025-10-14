/**
 * Enhanced Peacock Motif
 * 
 * Intricate feather details, realistic colors
 * Symbol of beauty and grace in Indian culture
 */

'use client';

import { motion } from 'framer-motion';

interface EnhancedPeacockProps {
  size?: number;
  animate?: boolean;
  className?: string;
}

export function EnhancedPeacock({ 
  size = 150, 
  animate = true,
  className = '' 
}: EnhancedPeacockProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Tail feathers (elaborate fan) */}
      <g id="tail-feathers">
        {[...Array(11)].map((_, i) => {
          const angle = (i - 5) * 15;
          const rad = (angle * Math.PI) / 180;
          const x = 100 + Math.sin(rad) * 75;
          const y = 120 - Math.abs(Math.cos(rad)) * 50;
          const eyeX = 100 + Math.sin(rad) * 85;
          const eyeY = 120 - Math.abs(Math.cos(rad)) * 60;

          return (
            <g key={i}>
              {/* Feather shaft */}
              <motion.line
                x1="100"
                y1="120"
                x2={x}
                y2={y}
                stroke={i % 2 === 0 ? '#1e5631' : '#2d5016'}
                strokeWidth="3"
                opacity="0.8"
                initial={animate ? { pathLength: 0 } : {}}
                animate={animate ? { pathLength: 1 } : {}}
                transition={{ duration: 1.5, delay: i * 0.1 }}
              />

              {/* Feather eye (peacock eye pattern) */}
              <motion.g
                initial={animate ? { scale: 0, opacity: 0 } : {}}
                animate={animate ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 1 + i * 0.1 }}
              >
                {/* Outer ring (blue) */}
                <circle 
                  cx={eyeX} 
                  cy={eyeY} 
                  r="12" 
                  fill="#4169e1" 
                  opacity="0.7"
                />
                {/* Middle ring (green) */}
                <circle 
                  cx={eyeX} 
                  cy={eyeY} 
                  r="8" 
                  fill="#00a86b" 
                  opacity="0.8"
                />
                {/* Inner ring (gold) */}
                <circle 
                  cx={eyeX} 
                  cy={eyeY} 
                  r="5" 
                  fill="#d4af37" 
                  opacity="0.9"
                />
                {/* Center (dark) */}
                <circle 
                  cx={eyeX} 
                  cy={eyeY} 
                  r="2" 
                  fill="#000080"
                />
                {/* Shimmer */}
                <circle 
                  cx={eyeX - 1} 
                  cy={eyeY - 1} 
                  r="1" 
                  fill="#fff" 
                  opacity="0.8"
                />
              </motion.g>

              {/* Feather barbs (fine details) - Fixed for SSR */}
              {[...Array(5)].map((_, j) => {
                const progress = j / 5;
                const barbX = 100 + Math.sin(rad) * 75 * progress;
                const barbY = 120 - Math.abs(Math.cos(rad)) * 50 * progress;
                // Use deterministic variation based on i and j instead of random
                const variation = ((i * 7 + j * 3) % 100) / 100 - 0.5;
                const barbAngle = angle + variation * 30;
                const barbRad = (barbAngle * Math.PI) / 180;
                const barbEndX = barbX + Math.sin(barbRad) * 8;
                const barbEndY = barbY - Math.abs(Math.cos(barbRad)) * 8;

                return (
                  <line
                    key={`barb-${i}-${j}`}
                    x1={barbX}
                    y1={barbY}
                    x2={barbEndX}
                    y2={barbEndY}
                    stroke={j % 2 === 0 ? '#00a86b' : '#4169e1'}
                    strokeWidth="0.5"
                    opacity="0.5"
                  />
                );
              })}
            </g>
          );
        })}
      </g>

      {/* Body */}
      <g id="body">
        {/* Torso (iridescent green) */}
        <ellipse
          cx="100"
          cy="125"
          rx="18"
          ry="28"
          fill="url(#iridescent-green)"
        />

        {/* Neck */}
        <motion.path
          d="M100 97 Q95 105 100 115"
          stroke="url(#neck-gradient)"
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
          animate={animate ? {
            d: [
              "M100 97 Q95 105 100 115",
              "M100 97 Q96 105 100 115",
              "M100 97 Q95 105 100 115",
            ],
          } : {}}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Head */}
        <circle cx="100" cy="92" r="11" fill="#4169e1" />

        {/* Eye */}
        <circle cx="103" cy="91" r="2" fill="#000" />
        <circle cx="103.5" cy="90.5" r="0.5" fill="#fff" />

        {/* Beak */}
        <path
          d="M108 92 L113 92 L110 94 Z"
          fill="#ffa500"
        />

        {/* Crown feathers */}
        {[...Array(5)].map((_, i) => {
          const x = 96 + i * 2;
          const y = 80 + Math.abs(i - 2) * 2;
          return (
            <g key={`crown-${i}`}>
              <line
                x1="100"
                y1="85"
                x2={x}
                y2={y}
                stroke="#00a86b"
                strokeWidth="2"
              />
              <circle cx={x} cy={y} r="2" fill="#d4af37" />
            </g>
          );
        })}

        {/* Wing detail */}
        <path
          d="M85 120 Q80 125 85 135"
          stroke="#1e5631"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          opacity="0.7"
        />
        <path
          d="M115 120 Q120 125 115 135"
          stroke="#1e5631"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          opacity="0.7"
        />

        {/* Legs */}
        <line x1="95" y1="150" x2="95" y2="165" stroke="#8b4513" strokeWidth="3" />
        <line x1="105" y1="150" x2="105" y2="165" stroke="#8b4513" strokeWidth="3" />

        {/* Feet */}
        <path d="M90 165 L95 165 L100 168" stroke="#8b4513" strokeWidth="2" fill="none" />
        <path d="M100 165 L105 165 L110 168" stroke="#8b4513" strokeWidth="2" fill="none" />
      </g>

      {/* Gradients */}
      <defs>
        <linearGradient id="iridescent-green" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#00ff7f" />
          <stop offset="50%" stopColor="#00a86b" />
          <stop offset="100%" stopColor="#1e5631" />
        </linearGradient>

        <linearGradient id="neck-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4169e1" />
          <stop offset="50%" stopColor="#00a86b" />
          <stop offset="100%" stopColor="#1e5631" />
        </linearGradient>
      </defs>

      {/* Animated glow */}
      {animate && (
        <motion.circle
          cx="100"
          cy="120"
          r="90"
          fill="url(#peacock-glow)"
          opacity="0.2"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}

      <defs>
        <radialGradient id="peacock-glow">
          <stop offset="0%" stopColor="#4169e1" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#00a86b" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}
