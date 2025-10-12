'use client'

import { FadeIn } from '@/components/animations'
import type { KankotriTheme } from '@/types/theme'
import { useThemeStyles } from '@/lib/hooks/useThemeStyles'

export interface VideoSectionData {
  videoUrl: string // YouTube/Vimeo URL or direct video URL
  title?: string
  description?: string
  thumbnail?: string
  provider?: 'youtube' | 'vimeo' | 'direct'
}

interface VideoSectionProps {
  data: VideoSectionData
  theme: KankotriTheme
  animated?: boolean
}

export function VideoSection({ data, theme, animated = true }: VideoSectionProps) {
  const { text, font } = useThemeStyles(theme)
  const sectionStyle = theme.sectionStyles?.['custom-text'] || {}

  // Extract video ID from URL
  const getEmbedUrl = () => {
    if (data.provider === 'youtube') {
      const videoId = data.videoUrl.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1]
      return `https://www.youtube.com/embed/${videoId}`
    } else if (data.provider === 'vimeo') {
      const videoId = data.videoUrl.match(/vimeo\.com\/(\d+)/)?.[1]
      return `https://player.vimeo.com/video/${videoId}`
    }
    return data.videoUrl
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
      {data.title && (
        <h2 
          className="text-3xl md:text-4xl font-bold mb-4 text-center"
          style={{ ...font.headingEn, ...text.heading }}
        >
          {data.title}
        </h2>
      )}

      {/* Description */}
      {data.description && (
        <p 
          className="text-center mb-6 max-w-2xl mx-auto"
          style={text.secondary}
        >
          {data.description}
        </p>
      )}

      {/* Video Player */}
      <div className="max-w-4xl mx-auto">
        <div 
          className="relative w-full rounded-xl overflow-hidden shadow-2xl"
          style={{ paddingBottom: '56.25%' }} // 16:9 aspect ratio
        >
          {data.provider === 'direct' ? (
            <video
              className="absolute top-0 left-0 w-full h-full"
              controls
              poster={data.thumbnail}
            >
              <source src={data.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={getEmbedUrl()}
              title={data.title || 'Wedding video'}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>
      </div>

      {/* Optional decorative elements */}
      <div className="text-center mt-6">
        <p 
          className="text-sm"
          style={text.secondary}
        >
          🎥 Our Special Moments
        </p>
      </div>
    </div>
  )

  if (!animated) return content

  return (
    <FadeIn delay={0.3} direction="up">
      {content}
    </FadeIn>
  )
}
