'use client'

import { FadeIn } from '@/components/animations'

export interface MapSectionData {
  title?: string
  venueName: string
  address: string
  googleMapsUrl?: string
  embedUrl?: string
}

interface MapSectionProps {
  data: MapSectionData
  animated?: boolean
}

export function MapSection({ data, animated = true }: MapSectionProps) {
  const content = (
    <div className="py-8 px-4">
      <h3 className="font-gujarati text-3xl font-bold text-white mb-6 text-center">
        {data.title || 'સ્થળ'}
      </h3>

      <div className="max-w-2xl mx-auto">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
          {/* Venue Info */}
          <div className="text-center mb-4">
            <h4 className="font-gujarati text-2xl text-orange-100 font-semibold mb-2">
              {data.venueName}
            </h4>
            <p className="text-orange-200 text-sm leading-relaxed">
              {data.address}
            </p>
          </div>

          {/* Map Embed or Link */}
          {data.embedUrl ? (
            <div className="aspect-video rounded-lg overflow-hidden border-2 border-white/20 mb-4">
              <iframe
                src={data.embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          ) : (
            <div className="aspect-video rounded-lg overflow-hidden border-2 border-white/20 mb-4 bg-gradient-to-br from-orange-900 to-pink-900 flex items-center justify-center">
              <div className="text-center">
                <span className="text-6xl mb-4 block">📍</span>
                <p className="text-orange-200">Map will be displayed here</p>
              </div>
            </div>
          )}

          {/* Google Maps Button */}
          {data.googleMapsUrl && (
            <a
              href={data.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-pink-600 transition-all"
            >
              <span>📱</span>
              <span>Open in Google Maps</span>
            </a>
          )}
        </div>
      </div>
    </div>
  )

  if (!animated) return content

  return (
    <FadeIn delay={0.6} direction="up">
      {content}
    </FadeIn>
  )
}
