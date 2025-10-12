'use client'

import { memo, useMemo, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { formatDate } from '@/lib/utils/format'
import type { GarbaNightData } from '@/types/template'
import {
  TemplateContainer,
  FloatingElements,
  FadeIn,
  DecorativeCorner,
  Rotate,
} from '@/components/animations'

interface GarbaNightTemplateProps {
  data: GarbaNightData
  preview?: boolean
}

function GarbaNightTemplateComponent({ data, preview = false }: GarbaNightTemplateProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Format wedding date
  const formattedDate = useMemo(() => {
    return formatDate(data.weddingDate, 'EEEE, MMMM d, yyyy')
  }, [data.weddingDate])

  // Generate random positions for decorative dots (memoized)
  const decorativeDots = useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 2 + Math.random() * 3,
      opacity: 0.3 + Math.random() * 0.4,
    }))
  }, [])

  // SSR safety - show static version until mounted
  if (!mounted) {
    return (
      <div className="relative w-full aspect-[3/4] bg-gradient-to-br from-orange-900 via-red-800 to-pink-900">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-center p-8">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-4">
              {data.groomName} & {data.brideName}
            </h1>
          </div>
        </div>
      </div>
    )
  }

  // Convert hex to RGB for gradient
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 249, g: 115, b: 22 }
  }

  const rgb = hexToRgb(data.primaryColor)

  return (
    <div className="relative w-full aspect-[3/4] overflow-hidden">
      {/* Base gradient background - uses primary color */}
      <div 
        className="absolute inset-0"
        style={{ 
          background: `linear-gradient(135deg, rgb(${rgb.r}, ${rgb.g}, ${rgb.b}) 0%, rgb(${Math.max(0, rgb.r - 50)}, ${Math.max(0, rgb.g - 50)}, ${Math.max(0, rgb.b - 30)}) 50%, rgb(${Math.max(0, rgb.r - 70)}, ${Math.max(0, rgb.g - 40)}, ${Math.max(0, rgb.b - 50)}) 100%)`,
          opacity: 0.95 
        }}
      />

      {/* Decorative dots (stars) */}
      {decorativeDots.map((dot) => (
        <div
          key={`dot-${dot.id}`}
          className="absolute rounded-full bg-yellow-200"
          style={{
            left: `${dot.left}%`,
            top: `${dot.top}%`,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            opacity: dot.opacity,
          }}
        />
      ))}

      {/* Floating diyas */}
      <FloatingElements 
        icons={['🪔']} 
        count={12} 
        speed="medium" 
      />

      {/* Decorative corner elements */}
      <DecorativeCorner position="top-left" pattern="floral" color="#FCD34D" size={120} />
      <DecorativeCorner position="top-right" pattern="floral" color="#FCD34D" size={120} />
      <DecorativeCorner position="bottom-left" pattern="mandala" color="#FCD34D" size={100} />
      <DecorativeCorner position="bottom-right" pattern="mandala" color="#FCD34D" size={100} />

      {/* Main content container */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-8 md:p-12 z-10">
        {/* Top decorative text */}
        <FadeIn delay={0.2} direction="up">
          <p className="font-gujarati text-lg md:text-xl text-orange-200 text-center mb-8">
            || શ્રી ગણેશાય નમઃ ||
          </p>
        </FadeIn>

        {/* Names */}
        <FadeIn delay={0.4} direction="up">
          <div className="text-center mb-8">
            <h1 className="font-playfair text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4">
              {data.groomName}
            </h1>
            
            <div className="flex items-center justify-center mb-4">
              <Rotate duration={20} clockwise>
                <div className="text-4xl md:text-5xl">❀</div>
              </Rotate>
            </div>
            
            <h1 className="font-playfair text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              {data.brideName}
            </h1>
          </div>
        </FadeIn>

        {/* Decorative divider */}
        <FadeIn delay={0.6} direction="up">
          <div className="w-48 h-0.5 bg-gradient-to-r from-transparent via-orange-300 to-transparent mb-8" />
        </FadeIn>

        {/* Date */}
        <FadeIn delay={0.8} direction="up">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
              <span className="text-2xl">📅</span>
              <p className="text-xl md:text-2xl text-orange-100 font-medium">
                {formattedDate}
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Venue */}
        <FadeIn delay={1.0} direction="up">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
              <span className="text-2xl">📍</span>
              <p className="text-lg md:text-xl text-orange-100 font-medium">
                {data.venue}
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Bottom decorative text */}
        <FadeIn delay={1.2} direction="up">
          <p className="font-gujarati text-base md:text-lg text-orange-200 text-center mt-8">
            આપનું સ્વાગત છે
          </p>
        </FadeIn>

        {/* Custom message if provided */}
        {data.customMessage && (
          <FadeIn delay={1.4} direction="up">
            <p className="text-center text-orange-100 mt-6 max-w-md text-sm md:text-base">
              {data.customMessage}
            </p>
          </FadeIn>
        )}
      </div>
    </div>
  )
}

export const GarbaNightTemplate = memo(GarbaNightTemplateComponent)
