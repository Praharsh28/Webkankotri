'use client'

import { motion } from 'framer-motion'

interface AnimatedGradientProps {
  colors?: string[]
  speed?: number
  blur?: boolean
}

export function AnimatedGradient({
  colors = ['#FFF7ED', '#FFEDD5', '#FED7AA', '#FDBA74'],
  speed = 10,
  blur = false,
}: AnimatedGradientProps) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(45deg, ${colors.join(', ')})`,
          backgroundSize: '400% 400%',
          filter: blur ? 'blur(100px)' : 'none',
        }}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  )
}
