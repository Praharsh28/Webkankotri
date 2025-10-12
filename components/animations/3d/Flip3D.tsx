'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface Flip3DProps {
  children: ReactNode
  variant?: 'horizontal' | 'vertical'
  trigger?: boolean
  duration?: number
}

const variants = {
  horizontal: {
    rotateY: [0, 180, 360]
  },
  vertical: {
    rotateX: [0, 180, 360]
  }
}

export function Flip3D({ 
  children, 
  variant = 'horizontal', 
  trigger = false,
  duration = 0.8
}: Flip3DProps) {
  const config = variants[variant]
  
  return (
    <motion.div
      style={{ 
        transformStyle: 'preserve-3d',
        perspective: 1000,
        backfaceVisibility: 'visible'
      }}
      initial={{ rotateX: 0, rotateY: 0 }}
      animate={trigger ? config : { rotateX: 0, rotateY: 0 }}
      whileHover={!trigger ? config : undefined}
      transition={{ duration, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  )
}
