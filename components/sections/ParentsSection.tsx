'use client'

import { FadeIn, RevealOnScroll, ShineEffect } from '@/components/animations'
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
  const animations = theme.animations

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
      <FadeIn delay={0.2} direction="down">
        <p className="text-lg mb-4" style={text.secondary}>
          With blessings from
        </p>
      </FadeIn>
      
      <div className="space-y-4">
        <FadeIn delay={0.4} direction="up">
          {animations.enabled.shineEffect ? (
            <ShineEffect duration={2.5}>
              <div>
                <p className="text-xl font-medium" style={{ ...font.bodyEn, ...text.heading }}>
                  {data.groomParents}
                </p>
                <p className="text-sm" style={text.secondary}>(Groom's Parents)</p>
              </div>
            </ShineEffect>
          ) : (
            <div>
              <p className="text-xl font-medium" style={{ ...font.bodyEn, ...text.heading }}>
                {data.groomParents}
              </p>
              <p className="text-sm" style={text.secondary}>(Groom's Parents)</p>
            </div>
          )}
        </FadeIn>

        <FadeIn delay={0.6} direction="up">
          <div style={{ color: theme.colors.accent, fontSize: '1.5rem' }}>
            &
          </div>
        </FadeIn>

        <FadeIn delay={0.8} direction="up">
          {animations.enabled.shineEffect ? (
            <ShineEffect duration={2.5}>
              <div>
                <p className="text-xl font-medium" style={{ ...font.bodyEn, ...text.heading }}>
                  {data.brideParents}
                </p>
                <p className="text-sm" style={text.secondary}>(Bride's Parents)</p>
              </div>
            </ShineEffect>
          ) : (
            <div>
              <p className="text-xl font-medium" style={{ ...font.bodyEn, ...text.heading }}>
                {data.brideParents}
              </p>
              <p className="text-sm" style={text.secondary}>(Bride's Parents)</p>
            </div>
          )}
        </FadeIn>
      </div>
    </div>
  )

  if (!animated) return content

  return (
    <RevealOnScroll direction="up" delay={0}>
      {content}
    </RevealOnScroll>
  )
}
