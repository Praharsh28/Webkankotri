'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface TemplateContainerProps {
  children: ReactNode
  backgroundColor?: string
}

export function TemplateContainer({
  children,
  backgroundColor = '#7C2D12',
}: TemplateContainerProps) {
  return (
    <motion.div
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  )
}
