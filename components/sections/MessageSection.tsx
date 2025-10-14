'use client'

import { FadeIn, RevealOnScroll, Typewriter, ShineEffect } from '@/components/animations'
import type { MessageSectionData } from '@/types/section'
import type { KankotriTheme } from '@/types/theme'
import { useThemeStyles } from '@/lib/hooks/useThemeStyles'

interface MessageSectionProps {
  data: MessageSectionData
  theme: KankotriTheme
  animated?: boolean
}

export function MessageSection({ data, theme, animated = true }: MessageSectionProps) {
  const { text, font } = useThemeStyles(theme)
  const sectionStyle = theme.sectionStyles?.message || {}
  const animations = theme.animations

  const content = (
    <div className="text-center py-8 px-6 max-w-2xl mx-auto">
      <div className="relative">
        <FadeIn delay={0.2} direction="left">
          <span className="text-4xl absolute -top-4 -left-2" style={{ color: theme.colors.accent }}>"</span>
        </FadeIn>
        
        <FadeIn delay={0.4} direction="up">
          {animations.enabled.shineEffect ? (
            <ShineEffect duration={4}>
              <p 
                className="text-lg md:text-xl italic px-6"
                style={{ ...font.bodyEn, ...text.primary }}
              >
                {data.message}
              </p>
            </ShineEffect>
          ) : (
            <p 
              className="text-lg md:text-xl italic px-6"
              style={{ ...font.bodyEn, ...text.primary }}
            >
              {data.message}
            </p>
          )}
        </FadeIn>
        
        <FadeIn delay={0.6} direction="right">
          <span className="text-4xl absolute -bottom-8 -right-2" style={{ color: theme.colors.accent }}>"</span>
        </FadeIn>
      </div>
      
      {data.author && (
        <FadeIn delay={0.8} direction="up">
          <p className="mt-8" style={text.secondary}>
            - {data.author}
          </p>
        </FadeIn>
      )}
    </div>
  )

  if (!animated) return content

  return (
    <RevealOnScroll direction="up" delay={0}>
      {content}
    </RevealOnScroll>
  )
}
