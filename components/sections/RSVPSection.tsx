'use client'

import { FadeIn } from '@/components/animations'

export interface RSVPSectionData {
  title?: string
  description?: string
  rsvpUrl: string
  deadline?: string
  showGuestCount?: boolean
}

interface RSVPSectionProps {
  data: RSVPSectionData
  animated?: boolean
}

export function RSVPSection({ data, animated = true }: RSVPSectionProps) {
  const content = (
    <div className="py-8 px-4">
      <div className="max-w-xl mx-auto text-center">
        <div className="text-5xl mb-4">✉️</div>
        
        <h3 className="font-gujarati text-3xl font-bold text-white mb-3">
          {data.title || 'RSVP'}
        </h3>

        {data.description && (
          <p className="text-orange-200 mb-6">
            {data.description}
          </p>
        )}

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
          {data.deadline && (
            <div className="bg-orange-500/20 rounded-lg p-3 mb-4">
              <p className="text-sm text-orange-100">
                Please respond by: <strong className="text-white">{data.deadline}</strong>
              </p>
            </div>
          )}

          <a
            href={data.rsvpUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-orange-600 hover:to-pink-600 transition-all hover:scale-105 shadow-lg"
          >
            <span>Confirm Your Presence</span>
            <span>→</span>
          </a>

          {data.showGuestCount && (
            <p className="mt-4 text-xs text-orange-300">
              Let us know how many guests will be joining
            </p>
          )}
        </div>
      </div>
    </div>
  )

  if (!animated) return content

  return (
    <FadeIn delay={0.7} direction="up">
      {content}
    </FadeIn>
  )
}
