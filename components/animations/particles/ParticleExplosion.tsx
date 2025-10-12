'use client'

import { motion } from 'framer-motion'
import { useMemo } from 'react'

interface ParticleExplosionProps {
  variant?: 'burst' | 'cascade' | 'fountain'
  particleCount?: number
  colors?: string[]
  trigger?: boolean
}

export function ParticleExplosion({ 
  variant = 'burst', 
  particleCount = 30,
  colors = ['#FBBF24', '#F97316', '#EC4899', '#8B5CF6'],
  trigger = false
}: ParticleExplosionProps) {
  
  const particles = useMemo(() => {
    return Array.from({ length: particleCount }, (_, i) => {
      const angle = (360 / particleCount) * i
      const distance = variant === 'burst' ? 150 : variant === 'cascade' ? 100 : 120
      
      return {
        id: i,
        angle,
        distance,
        color: colors[i % colors.length],
        size: 4 + Math.random() * 8,
        delay: variant === 'cascade' ? i * 0.02 : 0
      }
    })
  }, [particleCount, variant, colors])

  const getAnimation = (particle: typeof particles[0]) => {
    const radians = (particle.angle * Math.PI) / 180
    const x = Math.cos(radians) * particle.distance
    const y = Math.sin(radians) * particle.distance

    switch (variant) {
      case 'burst':
        return {
          x: [0, x],
          y: [0, y],
          opacity: [1, 0],
          scale: [1, 0.5]
        }
      case 'cascade':
        return {
          x: [0, x * 0.7],
          y: [0, y * 0.7, y],
          opacity: [1, 1, 0],
          scale: [1, 1.2, 0.3]
        }
      case 'fountain':
        return {
          x: [0, x * 0.5],
          y: [0, -particle.distance, y],
          opacity: [1, 1, 0],
          scale: [1, 1.5, 0.2]
        }
    }
  }

  if (!trigger) return null

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
      {particles.map(particle => (
        <motion.div
          key={`${particle.id}-${trigger}`}
          className="absolute rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
          }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={getAnimation(particle)}
          transition={{
            duration: 4,
            delay: particle.delay,
            ease: 'easeOut'
          }}
        />
      ))}
    </div>
  )
}
