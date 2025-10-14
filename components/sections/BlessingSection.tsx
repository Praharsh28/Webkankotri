'use client'

import { FadeIn, RevealOnScroll, ShineEffect, Pulse } from '@/components/animations'
import type { KankotriTheme } from '@/types/theme'
import { useThemeStyles } from '@/lib/hooks/useThemeStyles'

export interface BlessingSectionData {
  type: 'ganesh' | 'swaminarayan' | 'custom'
  text: string
  language: 'en' | 'gu' | 'both'
  showIcon?: boolean
}

interface BlessingSectionProps {
  data: BlessingSectionData
  theme: KankotriTheme
  animated?: boolean
}

export function BlessingSection({ data, theme, animated = true }: BlessingSectionProps) {
  const { text, font, gradient } = useThemeStyles(theme)
  
  const getIcon = () => {
    switch (data.type) {
      case 'ganesh':
        return '🙏'
      case 'swaminarayan':
        return '🙏'
      default:
        return '🙏'
    }
  }

  const fontStyle = data.language === 'gu' ? font.headingGu : font.headingEn
  const sectionStyle = theme.sectionStyles?.blessing || {}

  const animations = theme.animations

  const content = (
    <div 
      className="py-6 px-4 text-center"
      style={{
        backgroundColor: sectionStyle.backgroundColor,
        borderColor: sectionStyle.borderColor,
        borderWidth: sectionStyle.borderColor ? '1px' : 0,
        borderStyle: 'solid',
      }}
    >
      {data.showIcon !== false && (
        <FadeIn delay={0.2} direction="down">
          {animations.enabled.pulse ? (
            <Pulse scale={1.1} duration={2}>
              <div className="text-4xl mb-3">{getIcon()}</div>
            </Pulse>
          ) : (
            <div className="text-4xl mb-3">{getIcon()}</div>
          )}
        </FadeIn>
      )}
      
      <FadeIn delay={0.4} direction="up">
        {animations.enabled.shineEffect ? (
          <ShineEffect duration={3}>
            <div 
              className="text-xl md:text-2xl font-semibold"
              style={{
                ...fontStyle,
                color: sectionStyle.textColor || text.secondary.color,
              }}
            >
              {data.text}
            </div>
          </ShineEffect>
        ) : (
          <div 
            className="text-xl md:text-2xl font-semibold"
            style={{
              ...fontStyle,
              color: sectionStyle.textColor || text.secondary.color,
            }}
          >
            {data.text}
          </div>
        )}
      </FadeIn>

      {/* Decorative divider */}
      <FadeIn delay={0.6} direction="up">
        <div className="flex items-center justify-center mt-4">
          <div className="w-12 h-0.5" style={gradient.divider(theme.colors.accent)} />
          <span className="mx-3" style={{ color: theme.colors.accent }}>❀</span>
          <div className="w-12 h-0.5" style={gradient.divider(theme.colors.accent)} />
        </div>
      </FadeIn>
    </div>
  )

  if (!animated) return content

  return (
    <RevealOnScroll direction="up" delay={0}>
      {content}
    </RevealOnScroll>
  )
}
