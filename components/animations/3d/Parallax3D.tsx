'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { ReactNode, useRef } from 'react'

interface Parallax3DProps {
  children: ReactNode
  variant?: 'subtle' | 'medium' | 'dramatic'
  speed?: number
}

export function Parallax3D({ 
  children, 
  variant = 'medium',
  speed 
}: Parallax3DProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  const speeds = {
    subtle: speed || 0.2,
    medium: speed || 0.5,
    dramatic: speed || 1
  }

  const y = useTransform(scrollYProgress, [0, 1], [-50 * speeds[variant], 50 * speeds[variant]])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
    >
      {children}
    </motion.div>
  )
}
