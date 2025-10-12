'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface WaveMotionProps {
  children: ReactNode
  variant?: 'gentle' | 'rolling' | 'ocean'
}

export function WaveMotion({ 
  children, 
  variant = 'rolling'
}: WaveMotionProps) {
  
  const variants = {
    gentle: {
      y: [0, -5, 0, 5, 0],
      x: [0, 3, 0, -3, 0],
      transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
    },
    rolling: {
      y: [0, -10, 0, 10, 0],
      x: [0, 8, 0, -8, 0],
      rotate: [0, 2, 0, -2, 0],
      transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
    },
    ocean: {
      y: [0, -15, 0, 15, 0],
      x: [0, 12, 0, -12, 0],
      scale: [1, 1.02, 1, 0.98, 1],
      transition: { duration: 5, repeat: Infinity, ease: [0.45, 0.05, 0.55, 0.95] }
    }
  }

  return (
    <motion.div animate={variants[variant]}>
      {children}
    </motion.div>
  )
}
