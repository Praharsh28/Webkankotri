'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface TextGradientProps {
  children: ReactNode
  variant?: 'flow' | 'pulse' | 'shimmer'
  colors?: string[]
}

export function TextGradient({ 
  children, 
  variant = 'flow',
  colors = ['#FBBF24', '#F97316', '#EC4899', '#8B5CF6']
}: TextGradientProps) {
  
  const gradientString = colors.join(', ')
  
  const variants = {
    flow: {
      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      transition: { duration: 5, repeat: Infinity, ease: 'linear' }
    },
    pulse: {
      backgroundPosition: ['0% 50%', '50% 50%', '100% 50%', '50% 50%', '0% 50%'],
      transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
    },
    shimmer: {
      backgroundPosition: ['200% center', '-200% center'],
      transition: { duration: 3, repeat: Infinity, ease: 'linear' }
    }
  }

  return (
    <motion.div
      style={{
        background: `linear-gradient(90deg, ${gradientString})`,
        backgroundSize: '200% 200%',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}
      animate={variants[variant]}
    >
      {children}
    </motion.div>
  )
}
