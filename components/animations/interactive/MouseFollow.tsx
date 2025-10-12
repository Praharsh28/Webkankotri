'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import { ReactNode, useEffect } from 'react'

interface MouseFollowProps {
  children: ReactNode
  variant?: 'subtle' | 'smooth' | 'magnetic'
  strength?: number
}

export function MouseFollow({ 
  children, 
  variant = 'smooth',
  strength = 1
}: MouseFollowProps) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = {
    subtle: { stiffness: 50, damping: 20 },
    smooth: { stiffness: 100, damping: 30 },
    magnetic: { stiffness: 200, damping: 20 }
  }

  const x = useSpring(mouseX, springConfig[variant])
  const y = useSpring(mouseY, springConfig[variant])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = document.body.getBoundingClientRect()
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      
      mouseX.set((e.clientX - centerX) * 0.02 * strength)
      mouseY.set((e.clientY - centerY) * 0.02 * strength)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY, strength])

  return (
    <motion.div style={{ x, y }}>
      {children}
    </motion.div>
  )
}
