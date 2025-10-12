'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface GlowProps {
  children: ReactNode
  variant?: 'soft' | 'intense' | 'pulsing'
  color?: string
}

export function Glow({ 
  children, 
  variant = 'soft',
  color = '#FBBF24'
}: GlowProps) {
  
  const variants = {
    soft: {
      boxShadow: [
        `0 0 10px ${color}40`,
        `0 0 20px ${color}60`,
        `0 0 10px ${color}40`
      ],
      transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
    },
    intense: {
      boxShadow: [
        `0 0 20px ${color}60`,
        `0 0 40px ${color}90`,
        `0 0 20px ${color}60`
      ],
      transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
    },
    pulsing: {
      boxShadow: [
        `0 0 5px ${color}30`,
        `0 0 30px ${color}70`,
        `0 0 50px ${color}90`,
        `0 0 30px ${color}70`,
        `0 0 5px ${color}30`
      ],
      scale: [1, 1.02, 1.05, 1.02, 1],
      transition: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }
    }
  }

  return (
    <motion.div
      animate={variants[variant]}
      style={{ borderRadius: '8px' }}
    >
      {children}
    </motion.div>
  )
}
