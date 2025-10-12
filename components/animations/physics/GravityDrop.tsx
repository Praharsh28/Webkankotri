'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface GravityDropProps {
  children: ReactNode
  delay?: number
  variant?: 'gentle' | 'medium' | 'heavy'
}

const variants = {
  gentle: {
    initial: { y: -100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { type: 'spring', stiffness: 50, damping: 15, mass: 1 }
  },
  medium: {
    initial: { y: -150, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { type: 'spring', stiffness: 80, damping: 12, mass: 1.5 }
  },
  heavy: {
    initial: { y: -200, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { type: 'spring', stiffness: 100, damping: 10, mass: 2, bounce: 0.5 }
  }
}

export function GravityDrop({ children, delay = 0, variant = 'medium' }: GravityDropProps) {
  const config = variants[variant]
  
  return (
    <motion.div
      initial={config.initial}
      animate={config.animate}
      transition={{ ...config.transition, delay }}
    >
      {children}
    </motion.div>
  )
}
