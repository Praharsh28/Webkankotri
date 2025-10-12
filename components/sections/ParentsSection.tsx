'use client'

import { FadeIn } from '@/components/animations'
import type { ParentsSectionData } from '@/types/section'
import type { KankotriTheme } from '@/types/theme'
import { useThemeStyles } from '@/lib/hooks/useThemeStyles'

interface ParentsSectionProps {
  data: ParentsSectionData
  theme: KankotriTheme
  animated?: boolean
}

export function ParentsSection({ data, theme, animated = true }: ParentsSectionProps) {
  const { text, font } = useThemeStyles(theme)
  if (!data.showParentNames) return null

  const sectionStyle = theme.sectionStyles?.parents || {}

  const content = (
    <div 
      className="text-center py-8 px-4"
      style={{
        backgroundColor: sectionStyle.backgroundColor,
        borderColor: sectionStyle.borderColor,
        borderWidth: sectionStyle.borderColor ? '1px' : 0,
        borderStyle: 'solid',
      }}
    >
      <p className="text-lg mb-4" style={text.secondary}>
        With blessings from
      </p>
      
      <div className="space-y-4">
        <div>
          <p className="text-xl font-medium" style={{ ...font.bodyEn, ...text.heading }}>
            {data.groomParents}
          </p>
          <p className="text-sm" style={text.secondary}>(Groom's Parents)</p>
        </div>

        <div style={{ color: theme.colors.accent }}>
          &
        </div>

        <div>
          <p className="text-xl font-medium" style={{ ...font.bodyEn, ...text.heading }}>
            {data.brideParents}
          </p>
          <p className="text-sm" style={text.secondary}>(Bride's Parents)</p>
        </div>
      </div>
    </div>
  )

  if (!animated) return content

  return (
    <FadeIn delay={0.5} direction="up">
      {content}
    </FadeIn>
  )
}
