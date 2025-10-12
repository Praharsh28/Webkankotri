'use client'

import { motion } from 'framer-motion'

interface LetterWaveProps {
  text: string
  variant?: 'gentle' | 'rolling' | 'bouncy'
  className?: string
}

export function LetterWave({ 
  text, 
  variant = 'rolling',
  className = ''
}: LetterWaveProps) {
  const letters = text.split('')

  const variants = {
    gentle: {
      y: [0, -8, 0],
      transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
    },
    rolling: {
      y: [0, -15, 0],
      transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }
    },
    bouncy: {
      y: [0, -20, 0],
      scale: [1, 1.2, 1],
      transition: { duration: 1, repeat: Infinity, ease: [0.6, 0.01, 0.05, 0.95] }
    }
  }

  return (
    <div className={`inline-flex ${className}`}>
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          animate={variants[variant]}
          transition={{
            ...variants[variant].transition,
            delay: index * 0.1
          }}
          style={{ display: 'inline-block' }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </div>
  )
}
