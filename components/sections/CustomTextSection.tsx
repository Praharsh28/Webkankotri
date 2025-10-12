'use client'

import { FadeIn } from '@/components/animations'
import type { KankotriTheme } from '@/types/theme'
import { useThemeStyles } from '@/lib/hooks/useThemeStyles'

export interface CustomTextSectionData {
  title?: string
  content: string
  textAlign?: 'left' | 'center' | 'right'
  language?: 'en' | 'gu' | 'both'
  showBorder?: boolean
}

interface CustomTextSectionProps {
  data: CustomTextSectionData
  theme: KankotriTheme
  animated?: boolean
}

export function CustomTextSection({ data, theme, animated = true }: CustomTextSectionProps) {
  const { text, font } = useThemeStyles(theme)
  
  const alignClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }[data.textAlign || 'center']

  const fontStyle = data.language === 'gu' ? font.bodyGu : font.bodyEn
  const sectionStyle = theme.sectionStyles?.['custom-text'] || {}

  const content = (
    <div 
      className={`py-6 px-4 ${data.showBorder ? 'border-t border-b' : ''}`}
      style={{
        borderColor: data.showBorder ? theme.colors.border.light : 'transparent',
      }}
    >
      {data.title && (
        <h3 
          className="text-2xl md:text-3xl font-bold mb-4 text-center"
          style={{ ...font.headingEn, ...text.secondary }}
        >
          {data.title}
        </h3>
      )}
      <div 
        className={`${alignClass} leading-relaxed whitespace-pre-line max-w-3xl mx-auto`}
        style={{ 
          ...fontStyle,
          ...text.primary,
          fontSize: data.language === 'gu' ? '1.1rem' : '1rem'
        }}
      >
        {data.content}
      </div>
    </div>
  )

  if (!animated) return content

  return (
    <FadeIn delay={0.4} direction="up">
      {content}
    </FadeIn>
  )
}
