'use client'

import { FadeIn, ShineEffect } from '@/components/animations'
import type { HeaderSectionData } from '@/types/section'
import type { KankotriTheme } from '@/types/theme'
import { useThemeStyles } from '@/lib/hooks/useThemeStyles'

interface HeaderSectionProps {
  data: HeaderSectionData
  theme: KankotriTheme
  animated?: boolean
}

export function HeaderSection({ data, theme, animated = true }: HeaderSectionProps) {
  const { text, font, gradient } = useThemeStyles(theme)
  
  const sectionStyle = theme.sectionStyles?.header || {}
  
  const content = (
    <div 
      className="text-center py-12 md:py-16"
      style={{
        backgroundColor: sectionStyle.backgroundColor,
        borderColor: sectionStyle.borderColor,
        padding: sectionStyle.padding,
        borderRadius: sectionStyle.borderRadius,
        ...text.heading,
      }}
    >
      <FadeIn delay={0.2} direction="up">
        <div className="space-y-4">
          {data.groomTitle && (
            <p className="text-lg" style={text.secondary}>{data.groomTitle}</p>
          )}
          <h1 
            className="text-5xl md:text-7xl font-bold leading-tight"
            style={{ ...font.headingEn, ...text.heading }}
          >
            {data.groomName}
          </h1>
        </div>
      </FadeIn>

      <FadeIn delay={0.4} direction="up">
        <div className="flex items-center justify-center my-6">
          <div 
            className="w-24 h-0.5" 
            style={gradient.divider(theme.colors.accent)}
          />
          <span className="mx-4 text-3xl" style={{ color: theme.colors.accent }}>❀</span>
          <div 
            className="w-24 h-0.5" 
            style={gradient.divider(theme.colors.accent)}
          />
        </div>
      </FadeIn>

      <FadeIn delay={0.6} direction="up">
        <div className="space-y-4">
          {data.brideTitle && (
            <p className="text-lg" style={text.secondary}>{data.brideTitle}</p>
          )}
          <h1 
            className="text-5xl md:text-7xl font-bold leading-tight"
            style={{ ...font.headingEn, ...text.heading }}
          >
            {data.brideName}
          </h1>
        </div>
      </FadeIn>
    </div>
  )

  if (!animated) return content

  return <ShineEffect duration={3}>{content}</ShineEffect>
}
