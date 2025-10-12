'use client'

import { useState } from 'react'
import { FadeIn, HoverScale } from '@/components/animations'
import type { GallerySectionData } from '@/types/section'
import type { KankotriTheme } from '@/types/theme'
import { useThemeStyles } from '@/lib/hooks/useThemeStyles'

interface PhotoGallerySectionProps {
  data: GallerySectionData
  theme: KankotriTheme
  animated?: boolean
}

export function PhotoGallerySection({ data, theme, animated = true }: PhotoGallerySectionProps) {
  const { text, font } = useThemeStyles(theme)
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null)
  const sectionStyle = theme.sectionStyles?.['gallery'] || {}
  
  // Provide default empty array if photos is undefined
  const photos = data?.photos || []
  
  // Don't render if no photos
  if (photos.length === 0) {
    return null
  }

  const getLayoutClass = () => {
    switch (data.layout) {
      case 'carousel':
        return 'flex overflow-x-auto gap-4 snap-x snap-mandatory scrollbar-hide'
      case 'masonry':
        return 'columns-2 md:columns-3 gap-4'
      default: // grid
        return 'grid grid-cols-2 md:grid-cols-3 gap-4'
    }
  }

  const content = (
    <div 
      className="py-8 md:py-12 px-4"
      style={{
        backgroundColor: sectionStyle.backgroundColor,
        borderColor: sectionStyle.borderColor,
        borderWidth: sectionStyle.borderColor ? '1px' : 0,
        borderStyle: 'solid',
      }}
    >
      {/* Title */}
      <h2 
        className="text-3xl md:text-4xl font-bold mb-8 text-center"
        style={{ ...font.headingEn, ...text.heading }}
      >
        📸 Photo Gallery
      </h2>

      {/* Gallery */}
      <div className={`max-w-5xl mx-auto ${getLayoutClass()}`}>
        {photos.map((photo, index) => (
          <HoverScale key={photo.id} scale={1.05}>
            <div
              className={`${data.layout === 'carousel' ? 'flex-none w-72 snap-center' : ''} ${data.layout === 'masonry' ? 'break-inside-avoid mb-4' : ''}`}
              onClick={() => setSelectedPhoto(photo.url)}
            >
              <div 
                className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer"
                style={{
                  backgroundColor: theme.colors.background.card,
                  borderColor: theme.colors.border.light,
                  borderWidth: '1px',
                  borderStyle: 'solid',
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.url}
                  alt={photo.caption || `Photo ${index + 1}`}
                  className="w-full h-64 object-cover"
                />
                {photo.caption && (
                  <div 
                    className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm p-3"
                  >
                    <p className="text-white text-sm text-center">
                      {photo.caption}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </HoverScale>
        ))}
      </div>

      {/* Lightbox/Modal for selected photo */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={selectedPhoto}
            alt="Selected photo"
            className="max-w-full max-h-full object-contain rounded-lg"
          />
          <button
            className="absolute top-4 right-4 text-white text-4xl hover:scale-110 transition-transform"
            onClick={() => setSelectedPhoto(null)}
          >
            ×
          </button>
        </div>
      )}
    </div>
  )

  if (!animated) return content

  return (
    <FadeIn delay={0.3} direction="up">
      {content}
    </FadeIn>
  )
}
