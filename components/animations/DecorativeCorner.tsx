'use client'

import { motion } from 'framer-motion'

interface DecorativeCornerProps {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  pattern?: 'floral' | 'geometric' | 'mandala'
  color?: string
  size?: number
}

export function DecorativeCorner({
  position,
  pattern = 'floral',
  color = '#F97316',
  size = 100,
}: DecorativeCornerProps) {
  const positionClasses = {
    'top-left': 'top-0 left-0',
    'top-right': 'top-0 right-0 rotate-90',
    'bottom-left': 'bottom-0 left-0 -rotate-90',
    'bottom-right': 'bottom-0 right-0 rotate-180',
  }

  const patterns = {
    floral: (
      <svg width={size} height={size} viewBox="0 0 100 100">
        <path
          d="M0,0 Q50,0 50,50 Q50,0 100,0 L100,100 L0,100 Z"
          fill={color}
          opacity="0.1"
        />
      </svg>
    ),
    geometric: (
      <svg width={size} height={size} viewBox="0 0 100 100">
        <rect x="0" y="0" width="100" height="100" fill={color} opacity="0.1" />
        <circle cx="50" cy="50" r="30" fill={color} opacity="0.1" />
      </svg>
    ),
    mandala: (
      <svg width={size} height={size} viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" fill="none" stroke={color} strokeWidth="2" opacity="0.2" />
        <circle cx="50" cy="50" r="30" fill="none" stroke={color} strokeWidth="2" opacity="0.2" />
        <circle cx="50" cy="50" r="20" fill="none" stroke={color} strokeWidth="2" opacity="0.2" />
      </svg>
    ),
  }

  return (
    <motion.div
      className={`absolute ${positionClasses[position]} pointer-events-none`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {patterns[pattern]}
    </motion.div>
  )
}
