'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface HoverScaleProps {
  children: ReactNode
  scale?: number
  duration?: number
}

export function HoverScale({
  children,
  scale = 1.05,
  duration = 0.2,
}: HoverScaleProps) {
  return (
    <motion.div
      whileHover={{ scale }}
      whileTap={{ scale: scale * 0.95 }}
      transition={{ duration }}
    >
      {children}
    </motion.div>
  )
}
