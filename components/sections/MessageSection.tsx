'use client'

import { FadeIn } from '@/components/animations'
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

  const content = (
    <div className="text-center py-8 px-6 max-w-2xl mx-auto">
      <div className="relative">
        <span className="text-4xl absolute -top-4 -left-2" style={{ color: theme.colors.accent }}>"</span>
        <p 
          className="text-lg md:text-xl italic px-6"
          style={{ ...font.bodyEn, ...text.primary }}
        >
          {data.message}
        </p>
        <span className="text-4xl absolute -bottom-8 -right-2" style={{ color: theme.colors.accent }}>"</span>
      </div>
      
      {data.author && (
        <p className="mt-8" style={text.secondary}>
          - {data.author}
        </p>
      )}
    </div>
  )

  if (!animated) return content

  return (
    <FadeIn delay={0.7} direction="up">
      {content}
    </FadeIn>
  )
}
