'use client'

import { motion } from 'framer-motion'
import { useMemo, useState, useEffect } from 'react'

interface FloatingElement {
  id: number
  icon: string
  left: number
  top: number
  duration: number
  delay: number
  size: number
}

interface FloatingElementsProps {
  icons?: string[]
  count?: number
  speed?: 'slow' | 'medium' | 'fast'
}

export function FloatingElements({
  icons = ['🪔', '✨', '💐', '🎊', '💖', '🌺'],
  count = 12,
  speed = 'medium',
}: FloatingElementsProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const speedMap = {
    slow: { min: 4, max: 6 },
    medium: { min: 3, max: 5 },
    fast: { min: 2, max: 4 },
  }

  const elements = useMemo<FloatingElement[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      icon: icons[i % icons.length],
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: speedMap[speed].min + Math.random() * (speedMap[speed].max - speedMap[speed].min),
      delay: Math.random() * 2,
      size: 20 + Math.random() * 20,
    }))
  }, [count, icons, speed])

  if (!mounted) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute"
          style={{
            left: `${element.left}%`,
            top: `${element.top}%`,
            fontSize: `${element.size}px`,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: element.duration,
            delay: element.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {element.icon}
        </motion.div>
      ))}
    </div>
  )
}
