'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface ShineEffectProps {
  children: ReactNode
  duration?: number
  delay?: number
}

export function ShineEffect({ 
  children, 
  duration = 2, 
  delay = 0 
}: ShineEffectProps) {
  return (
    <div className="relative overflow-hidden">
      {children}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        initial={{ x: '-100%' }}
        animate={{ x: '200%' }}
        transition={{
          duration,
          delay,
          repeat: Infinity,
          repeatDelay: 3,
          ease: 'easeInOut',
        }}
      />
    </div>
  )
}
