'use client'

import { motion } from 'framer-motion'
import type { SectionCharacteristics } from '@/types/characteristics'
import { applyCharacteristics } from '@/lib/utils/applyCharacteristics'

interface CharacteristicWrapperProps {
  children: React.ReactNode
  characteristics: Partial<SectionCharacteristics>
  className?: string
}

export function CharacteristicWrapper({ 
  children, 
  characteristics,
  className = ''
}: CharacteristicWrapperProps) {
  const style = applyCharacteristics(characteristics)
  
  // Animation settings
  const animation = characteristics.animations
  const entrance = animation?.entrance || 'none'
  const duration = animation?.duration === 'fast' ? 0.3 : animation?.duration === 'slow' ? 1 : 0.6
  const delay = (animation?.delay || 0) / 1000

  // Effects
  const effects = characteristics.effects || {}
  const effectClasses = []
  
  if (effects.glow) {
    effectClasses.push('shadow-[0_0_30px_rgba(139,92,246,0.5)]')
  }
  if (effects.glassmorphism) {
    effectClasses.push('backdrop-blur-lg bg-opacity-30')
  }
  if (effects.neumorphism) {
    effectClasses.push('shadow-[inset_4px_4px_8px_rgba(0,0,0,0.1),inset_-4px_-4px_8px_rgba(255,255,255,0.7)]')
  }

  // Hover effects
  const hoverEffect = animation?.hover || 'none'
  const hoverClasses: Record<string, string> = {
    lift: 'hover:-translate-y-2 transition-transform',
    scale: 'hover:scale-105 transition-transform',
    glow: 'hover:shadow-lg transition-shadow',
    rotate: 'hover:rotate-1 transition-transform',
    none: ''
  }

  // Initial animation variants
  const variants = {
    hidden: entrance === 'fade' ? { opacity: 0 } :
            entrance === 'slide-up' ? { opacity: 0, y: 50 } :
            entrance === 'slide-down' ? { opacity: 0, y: -50 } :
            entrance === 'slide-left' ? { opacity: 0, x: 50 } :
            entrance === 'slide-right' ? { opacity: 0, x: -50 } :
            entrance === 'zoom' ? { opacity: 0, scale: 0.8 } :
            entrance === 'bounce' ? { opacity: 0, y: -100 } :
            {},
    visible: { 
      opacity: 1, 
      y: 0, 
      x: 0, 
      scale: 1,
      transition: { 
        duration,
        delay,
        type: entrance === 'bounce' ? 'spring' : 'tween',
        bounce: entrance === 'bounce' ? 0.5 : 0
      }
    }
  }

  if (entrance === 'none') {
    return (
      <div 
        className={`${className} ${effectClasses.join(' ')} ${hoverClasses[hoverEffect]}`}
        style={style}
      >
        {children}
      </div>
    )
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      className={`${className} ${effectClasses.join(' ')} ${hoverClasses[hoverEffect]}`}
      style={style}
    >
      {children}
    </motion.div>
  )
}
