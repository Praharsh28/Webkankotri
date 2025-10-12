'use client'

import { FadeIn } from '@/components/animations'

export interface HotelsSectionData {
  title?: string
  hotels: Array<{
    name: string
    address: string
    distance?: string
    phone?: string
    bookingUrl?: string
  }>
}

interface HotelsSectionProps {
  data: HotelsSectionData
  animated?: boolean
}

export function HotelsSection({ data, animated = true }: HotelsSectionProps) {
  // Provide default empty array if hotels is undefined
  const hotels = data?.hotels || []
  
  const content = (
    <div className="py-8 px-4">
      <h3 className="font-gujarati text-3xl font-bold text-white mb-2 text-center">
        {data?.title || 'હોટેલ સૂચન'}
      </h3>
      <p className="text-orange-200 text-center mb-6 text-sm">
        Accommodation Recommendations
      </p>

      {hotels.length === 0 ? (
        <div className="max-w-3xl mx-auto text-center py-8">
          <p className="text-white/70">No hotels added yet</p>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-4">
          {hotels.map((hotel, idx) => (
          <div 
            key={idx}
            className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 hover:border-orange-300 transition-colors"
          >
            <div className="flex items-start gap-3">
              <span className="text-3xl">🏨</span>
              <div className="flex-1">
                <h4 className="font-semibold text-white mb-1">{hotel.name}</h4>
                <p className="text-sm text-orange-200 mb-2">{hotel.address}</p>
                
                {hotel.distance && (
                  <p className="text-xs text-orange-300 mb-2">
                    📍 {hotel.distance} from venue
                  </p>
                )}

                {hotel.phone && (
                  <a 
                    href={`tel:${hotel.phone}`}
                    className="text-xs text-orange-100 hover:text-white flex items-center gap-1 mb-2"
                  >
                    <span>📞</span>
                    <span>{hotel.phone}</span>
                  </a>
                )}

                {hotel.bookingUrl && (
                  <a
                    href={hotel.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs bg-orange-500 text-white px-3 py-1 rounded-full hover:bg-orange-600 transition-colors"
                  >
                    <span>Book Now</span>
                    <span>→</span>
                  </a>
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
    <FadeIn delay={0.7} direction="up">
      {content}
    </FadeIn>
  )
}
