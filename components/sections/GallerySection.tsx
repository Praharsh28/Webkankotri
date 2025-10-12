'use client'

import { useState, useEffect } from 'react'
import { FadeIn } from '@/components/animations'
import Image from 'next/image'

export interface GallerySectionData {
  title?: string
  photos: Array<{
    id: string
    url: string
    caption?: string
  }>
  layout: 'grid' | 'carousel' | 'single'
}

interface GallerySectionProps {
  data: GallerySectionData
  theme: any
  animated?: boolean
}

export function GallerySection({ data, theme, animated = true }: GallerySectionProps) {
  // Provide default empty array if photos is undefined
  const photos = data?.photos || []
  
  // Don't render if no photos
  if (photos.length === 0) {
    return (
      <section className="py-12 px-4" style={{ background: theme.colors.background.primary }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4" style={{ color: theme.colors.text.heading }}>
            Photo Gallery
          </h2>
          <p style={{ color: theme.colors.text.secondary }}>
            Photos will be added soon!
          </p>
        </div>
      </section>
    )
  }
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const renderGrid = () => (
    <div className={`grid gap-4 max-w-4xl mx-auto ${
      photos.length === 1 ? 'grid-cols-1' :
      photos.length === 2 ? 'grid-cols-2' :
      photos.length === 3 ? 'grid-cols-3' :
      'grid-cols-2 md:grid-cols-3'
    }`}>
      {photos.map((photo, idx) => (
        <div key={photo.id} className="relative group overflow-hidden rounded-lg border-2 border-white/20">
          <div className="aspect-square relative">
            <Image
              src={photo.url}
              alt={photo.caption || `Photo ${idx + 1}`}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          {photo.caption && (
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-3">
              <p className="text-white text-sm">{photo.caption}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )

  const renderSingle = () => (
    <div className="max-w-2xl mx-auto">
      {photos.map((photo) => (
        <div key={photo.id} className="relative rounded-lg overflow-hidden border-2 border-white/20">
          <div className="aspect-[4/3] relative">
            <Image
              src={photo.url}
              alt={photo.caption || 'Wedding photo'}
              fill
              className="object-cover"
            />
          </div>
          {photo.caption && (
            <div className="bg-white/10 backdrop-blur-sm p-3 text-center">
              <p className="text-orange-100">{photo.caption}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )

  const content = (
    <div className="py-8 px-4">
      {data.title && (
        <h3 className="font-playfair text-3xl font-bold text-white mb-6 text-center">
          {data.title}
        </h3>
      )}
      
      {data.layout === 'single' ? renderSingle() : renderGrid()}
    </div>
  )

  if (!animated) return content

  return (
    <FadeIn delay={0.6} direction="up">
      {content}
    </FadeIn>
  )
}
