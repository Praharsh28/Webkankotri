'use client'

import { FadeIn, RevealOnScroll, Pulse, HoverScale } from '@/components/animations'
import type { EventSectionData } from '@/types/section'
import type { KankotriTheme } from '@/types/theme'
import { formatDate } from '@/lib/utils/format'
import { useThemeStyles } from '@/lib/hooks/useThemeStyles'

interface EventSectionProps {
  data: EventSectionData
  theme: KankotriTheme
  animated?: boolean
}

export function EventSection({ data, theme, animated = true }: EventSectionProps) {
  const { text, font, bg } = useThemeStyles(theme)
  const formattedDate = formatDate(data.date, 'EEEE, MMMM d, yyyy')
  const sectionStyle = theme.sectionStyles?.['event-main'] || {}
  const animations = theme.animations

  const content = (
    <div 
      className="text-center py-8 md:py-12 px-4"
      style={{
        backgroundColor: sectionStyle.backgroundColor,
        borderColor: sectionStyle.borderColor,
        borderWidth: sectionStyle.borderColor ? '1px' : 0,
        borderStyle: 'solid',
      }}
    >
      {/* Event Name */}
      <FadeIn delay={0.2} direction="up">
        <h2 
          className="text-3xl md:text-4xl font-bold mb-6"
          style={{ ...font.headingEn, ...text.heading }}
        >
          {data.eventName}
        </h2>
      </FadeIn>

      {/* Date & Time - with Pulse animation */}
      <FadeIn delay={0.4} direction="up">
        {animations.enabled.pulse ? (
          <Pulse scale={1.03} duration={2}>
            <div 
              className="inline-flex items-center gap-3 backdrop-blur-sm rounded-full px-6 py-3 border mb-4 cursor-default"
              style={{
                backgroundColor: theme.colors.background.card,
                borderColor: theme.colors.border.light,
              }}
            >
              <span className="text-2xl">📅</span>
              <div className="text-left">
                <p className="text-xl font-medium" style={text.primary}>
                  {formattedDate}
                </p>
                <p className="text-lg" style={text.secondary}>
                  {data.time}
                </p>
              </div>
            </div>
          </Pulse>
        ) : (
          <div 
            className="inline-flex items-center gap-3 backdrop-blur-sm rounded-full px-6 py-3 border mb-4"
            style={{
              backgroundColor: theme.colors.background.card,
              borderColor: theme.colors.border.light,
            }}
          >
            <span className="text-2xl">📅</span>
            <div className="text-left">
              <p className="text-xl font-medium" style={text.primary}>
                {formattedDate}
              </p>
              <p className="text-lg" style={text.secondary}>
                {data.time}
              </p>
            </div>
          </div>
        )}
      </FadeIn>

      {/* Venue */}
      <FadeIn delay={0.6} direction="up">
        <HoverScale scale={1.05} duration={0.2}>
          <div 
            className="inline-flex items-center gap-3 backdrop-blur-sm rounded-full px-6 py-3 border cursor-pointer"
            style={{
              backgroundColor: theme.colors.background.card,
              borderColor: theme.colors.border.light,
            }}
          >
            <span className="text-2xl">📍</span>
            <div className="text-left">
              <p className="text-lg font-medium" style={text.primary}>
                {data.venue}
              </p>
              {data.venueAddress && (
                <p className="text-sm" style={text.secondary}>
                  {data.venueAddress}
                </p>
              )}
            </div>
          </div>
        </HoverScale>
      </FadeIn>

      {/* Description */}
      {data.description && (
        <FadeIn delay={0.8} direction="up">
          <p className="mt-6 max-w-md mx-auto" style={text.primary}>
            {data.description}
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
