/**
 * Loading States
 * 
 * Beautiful loading indicators for different contexts
 */

'use client';

import { motion } from 'framer-motion';

// Skeleton loader for template preview
export function TemplateSkeleton() {
  return (
    <div className="min-h-screen animate-pulse bg-[#f9f6f0] p-6">
      <div className="container mx-auto max-w-2xl space-y-8">
        {/* Photo skeleton */}
        <div className="h-[400px] rounded-lg bg-[#e8e6e1]" />

        {/* Names skeleton */}
        <div className="space-y-4">
          <div className="mx-auto h-16 w-3/4 rounded bg-[#e8e6e1]" />
          <div className="mx-auto h-12 w-1/4 rounded bg-[#e8e6e1]" />
          <div className="mx-auto h-16 w-3/4 rounded bg-[#e8e6e1]" />
        </div>

        {/* Date skeleton */}
        <div className="mx-auto h-32 w-64 rounded bg-[#e8e6e1]" />

        {/* Diyas skeleton */}
        <div className="flex justify-center gap-12">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-16 w-16 rounded-full bg-[#e8e6e1]" />
          ))}
        </div>
      </div>
    </div>
  );
}

// Lotus loading spinner
export function LotusLoader({ size = 60 }: { size?: number }) {
  return (
    <div className="flex items-center justify-center">
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Rotating petals */}
        {[...Array(8)].map((_, i) => {
          const angle = i * 45;
          return (
            <motion.ellipse
              key={i}
              cx="50"
              cy="50"
              rx="10"
              ry="25"
              fill="#d4af37"
              opacity="0.6"
              transform={`rotate(${angle} 50 50)`}
              animate={{
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.1,
                ease: 'easeInOut',
              }}
            />
          );
        })}

        {/* Center */}
        <motion.circle
          cx="50"
          cy="50"
          r="8"
          fill="#c41e3a"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </svg>
    </div>
  );
}

// Full page loading
export function PageLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#f9f6f0]">
      <div className="text-center">
        <LotusLoader size={80} />
        <motion.p
          className="mt-6 font-serif text-xl text-[#2d5016]"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          Loading...
        </motion.p>
      </div>
    </div>
  );
}

// Diya loading animation
export function DiyaLoader() {
  return (
    <div className="flex items-center justify-center gap-4">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="h-4 w-4 rounded-full bg-[#d4af37]"
          animate={{
            y: [0, -15, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.2,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
