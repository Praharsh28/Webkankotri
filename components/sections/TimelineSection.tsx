'use client'

import { FadeIn } from '@/components/animations'

export interface TimelineSectionData {
  title?: string
  events: Array<{
    time: string
    title: string
    description?: string
    location?: string
  }>
}

interface TimelineSectionProps {
  data: TimelineSectionData
  animated?: boolean
}

export function TimelineSection({ data, animated = true }: TimelineSectionProps) {
  // Provide default empty array if events is undefined
  const events = data?.events || []
  
  const content = (
    <div className="py-8 px-4">
      <h3 className="font-gujarati text-3xl font-bold text-white mb-8 text-center">
        {data?.title || 'કાર્યક્રમ'}
      </h3>

      {events.length === 0 ? (
        <div className="max-w-2xl mx-auto text-center py-8">
          <p className="text-white/70">No timeline events added yet</p>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto space-y-6">
          {events.map((event, idx) => (
          <div key={idx} className="relative">
            {/* Timeline line */}
            {idx !== events.length - 1 && (
              <div className="absolute left-8 top-12 bottom-0 w-0.5 bg-gradient-to-b from-orange-300 to-transparent" />
            )}

            <div className="flex gap-4">
              {/* Time badge */}
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-pink-400 flex items-center justify-center border-4 border-white/20 shadow-lg">
                  <span className="text-white text-sm font-bold text-center leading-tight">
                    {event.time}
                  </span>
                </div>
              </div>

              {/* Event details */}
              <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <h4 className="font-gujarati text-xl font-semibold text-white mb-1">
                  {event.title}
                </h4>
                {event.description && (
                  <p className="text-orange-200 text-sm mb-2">{event.description}</p>
                )}
                {event.location && (
                  <div className="flex items-center gap-2 text-orange-300 text-sm">
                    <span>📍</span>
                    <span>{event.location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        </div>
      )}
    </div>
  )

  if (!animated) return content

  return (
    <FadeIn delay={0.5} direction="up">
      {content}
    </FadeIn>
  )
}
