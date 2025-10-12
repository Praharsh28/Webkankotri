'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface PulseProps {
  children: ReactNode
  scale?: number
  duration?: number
  repeat?: boolean
}

export function Pulse({
  children,
  scale = 1.05,
  duration = 2,
  repeat = true,
}: PulseProps) {
  return (
    <motion.div
      animate={{
        scale: [1, scale, 1],
      }}
      transition={{
        duration,
        repeat: repeat ? Infinity : 0,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  )
}
