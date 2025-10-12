'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface RotateProps {
  children: ReactNode
  duration?: number
  clockwise?: boolean
}

export function Rotate({
  children,
  duration = 20,
  clockwise = true,
}: RotateProps) {
  return (
    <motion.div
      animate={{
        rotate: clockwise ? 360 : -360,
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      {children}
    </motion.div>
  )
}
