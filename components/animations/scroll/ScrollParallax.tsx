'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { ReactNode, useRef } from 'react'

interface ScrollParallaxProps {
  children: ReactNode
  variant?: 'slow' | 'medium' | 'fast'
  direction?: 'up' | 'down'
}

export function ScrollParallax({ 
  children, 
  variant = 'medium',
  direction = 'up'
}: ScrollParallaxProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  const speeds = {
    slow: 30,
    medium: 60,
    fast: 100
  }

  const range = speeds[variant] * (direction === 'up' ? -1 : 1)
  const y = useTransform(scrollYProgress, [0, 1], [-range, range])

  return (
    <motion.div ref={ref} style={{ y }}>
      {children}
    </motion.div>
  )
}
