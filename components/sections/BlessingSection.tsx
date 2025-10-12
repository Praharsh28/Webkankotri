'use client'

import { FadeIn } from '@/components/animations'
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
        <div className="text-4xl mb-3">{getIcon()}</div>
      )}
      
      <div 
        className="text-xl md:text-2xl font-semibold"
        style={{
          ...fontStyle,
          color: sectionStyle.textColor || text.secondary.color,
        }}
      >
        {data.text}
      </div>

      {/* Decorative divider */}
      <div className="flex items-center justify-center mt-4">
        <div className="w-12 h-0.5" style={gradient.divider(theme.colors.accent)} />
        <span className="mx-3" style={{ color: theme.colors.accent }}>❀</span>
        <div className="w-12 h-0.5" style={gradient.divider(theme.colors.accent)} />
      </div>
    </div>
  )

  if (!animated) return content

  return (
    <FadeIn delay={0.3} direction="up">
      {content}
    </FadeIn>
  )
}
