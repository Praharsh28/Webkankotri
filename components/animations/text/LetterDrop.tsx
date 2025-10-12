'use client'

import { motion } from 'framer-motion'

interface LetterDropProps {
  text: string
  variant?: 'cascade' | 'random' | 'wave'
  delay?: number
  className?: string
}

export function LetterDrop({ 
  text, 
  variant = 'cascade', 
  delay = 0,
  className = ''
}: LetterDropProps) {
  const letters = text.split('')

  const getDelay = (index: number) => {
    switch (variant) {
      case 'cascade':
        return delay + index * 0.05
      case 'random':
        return delay + Math.random() * 0.5
      case 'wave':
        return delay + Math.sin(index * 0.5) * 0.2
      default:
        return delay
    }
  }

  const getAnimation = () => {
    return {
      initial: { y: -50, opacity: 0, rotateX: -90 },
      animate: { y: 0, opacity: 1, rotateX: 0 },
      transition: { type: 'spring', stiffness: 100, damping: 10 }
    }
  }

  return (
    <div className={`inline-flex ${className}`}>
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          {...getAnimation()}
          transition={{
            ...getAnimation().transition,
            delay: getDelay(index)
          }}
          style={{ display: 'inline-block', transformStyle: 'preserve-3d' }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </div>
  )
}
