'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface ShapeMorphProps {
  children: ReactNode
  duration?: number
}

export function ShapeMorph({ children, duration = 4 }: ShapeMorphProps) {
  return (
    <motion.div 
      animate={{
        borderRadius: [
          '30% 70% 70% 30% / 30% 30% 70% 70%', 
          '70% 30% 30% 70% / 70% 70% 30% 30%', 
          '30% 70% 70% 30% / 30% 30% 70% 70%'
        ]
      }}
      transition={{ 
        duration, 
        repeat: Infinity, 
        ease: 'easeInOut' 
      }}
      style={{ overflow: 'hidden' }}
    >
      {children}
    </motion.div>
  )
}
