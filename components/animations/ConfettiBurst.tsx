'use client'

import { useEffect } from 'react'
import confetti from 'canvas-confetti'

interface ConfettiBurstProps {
  trigger?: boolean
  particleCount?: number
  spread?: number
  colors?: string[]
}

export function ConfettiBurst({
  trigger = false,
  particleCount = 100,
  spread = 70,
  colors = ['#F97316', '#EC4899', '#FBBF24', '#22C55E'],
}: ConfettiBurstProps) {
  useEffect(() => {
    if (trigger) {
      confetti({
        particleCount,
        spread,
        origin: { y: 0.6 },
        colors,
      })
    }
  }, [trigger, particleCount, spread, colors])

  return null
}
