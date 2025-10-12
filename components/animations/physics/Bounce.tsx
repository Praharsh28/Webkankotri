'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface BounceProps {
  children: ReactNode
  variant?: 'soft' | 'playful' | 'energetic'
  continuous?: boolean
}

const variants = {
  soft: {
    animate: { 
      y: [0, -10, 0],
      transition: { 
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  },
  playful: {
    animate: { 
      y: [0, -20, 0],
      transition: { 
        duration: 1.5,
        repeat: Infinity,
        ease: [0.6, 0.01, 0.05, 0.95]
      }
    }
  },
  energetic: {
    animate: { 
      y: [0, -30, -25, -30, 0],
      transition: { 
        duration: 1,
        repeat: Infinity,
        ease: 'easeOut',
        times: [0, 0.4, 0.5, 0.6, 1]
      }
    }
  }
}

export function Bounce({ children, variant = 'playful', continuous = true }: BounceProps) {
  const config = variants[variant]
  
  return (
    <motion.div
      animate={continuous ? config.animate : undefined}
      whileHover={!continuous ? config.animate : undefined}
    >
      {children}
    </motion.div>
  )
}
