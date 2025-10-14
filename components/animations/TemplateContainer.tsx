'use client'

import { ReactNode } from 'react'
import type { KankotriTheme } from '@/types/theme'
import { FloatingElements } from './FloatingElements'
import { DecorativeCorner } from './DecorativeCorner'
import { Sparkle } from './Sparkle'

interface TemplateContainerProps {
  theme: KankotriTheme
  children: ReactNode
}

export function TemplateContainer({ theme, children }: TemplateContainerProps) {
  // Get background gradient from theme
  const { from, via, to, direction } = theme.backgrounds.gradient
  const animations = theme.animations
  
  return (
    <div 
      className="min-h-screen w-full relative overflow-hidden"
      style={{
        background: via 
          ? `linear-gradient(${direction}, ${from}, ${via}, ${to})`
          : `linear-gradient(${direction}, ${from}, ${to})`,
      }}
    >
      {/* Floating Elements - Background Animation */}
      {animations.enabled.floatingElements && (
        <FloatingElements 
          icons={animations.floatingEmojis || ['🪔', '✨', '💐', '🌟']}
          count={12}
          speed={animations.speed === 'fast' ? 'fast' : animations.speed === 'slow' ? 'slow' : 'medium'}
        />
      )}

      {/* Sparkle Effect - Subtle Magic */}
      {animations.enabled.sparkle && (
        <Sparkle 
          count={15}
          colors={[theme.colors.accent, theme.colors.secondary]}
        />
      )}

      {/* Decorative Corners - Frame the Invitation */}
      {animations.enabled.decorativeCorner && (
        <>
          <DecorativeCorner 
            position="top-left" 
            pattern={theme.borders.decorative.type === 'ornate' ? 'mandala' : theme.borders.decorative.type === 'minimal' ? 'geometric' : 'floral'}
            color={theme.colors.accent}
            size={120}
          />
          <DecorativeCorner 
            position="top-right" 
            pattern={theme.borders.decorative.type === 'ornate' ? 'mandala' : theme.borders.decorative.type === 'minimal' ? 'geometric' : 'floral'}
            color={theme.colors.accent}
            size={120}
          />
          <DecorativeCorner 
            position="bottom-left" 
            pattern={theme.borders.decorative.type === 'ornate' ? 'mandala' : theme.borders.decorative.type === 'minimal' ? 'geometric' : 'floral'}
            color={theme.colors.accent}
            size={120}
          />
          <DecorativeCorner 
            position="bottom-right" 
            pattern={theme.borders.decorative.type === 'ornate' ? 'mandala' : theme.borders.decorative.type === 'minimal' ? 'geometric' : 'floral'}
            color={theme.colors.accent}
            size={120}
          />
        </>
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
