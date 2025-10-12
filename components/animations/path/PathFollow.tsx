'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface PathFollowProps {
  children: ReactNode
  variant?: 'infinity' | 'circle' | 'wave'
  duration?: number
}

export function PathFollow({ children, variant = 'infinity', duration = 4 }: PathFollowProps) {
  // Using x,y coordinates instead of offset-path for better browser support
  const paths = {
    infinity: {
      x: [0, 100, 200, 100, 0, -100, -200, -100, 0],
      y: [0, -50, 0, 50, 0, 50, 0, -50, 0],
    },
    circle: {
      x: [0, 100, 100, 0, -100, -100, 0],
      y: [100, 50, -50, -100, -50, 50, 100],
    },
    wave: {
      x: [0, 50, 100, 150, 200, 150, 100, 50, 0],
      y: [0, -40, 0, 40, 0, -40, 0, 40, 0],
    }
  }

  return (
    <motion.div
      animate={paths[variant]}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    >
      {children}
    </motion.div>
  )
}
