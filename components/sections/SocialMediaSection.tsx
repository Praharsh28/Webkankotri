'use client'

import { FadeIn, HoverScale } from '@/components/animations'
import type { KankotriTheme } from '@/types/theme'
import { useThemeStyles } from '@/lib/hooks/useThemeStyles'

export interface SocialMediaSectionData {
  title?: string
  description?: string
  hashtag?: string
  links?: Array<{
    platform: 'instagram' | 'facebook' | 'twitter' | 'youtube' | 'snapchat' | 'tiktok'
    url: string
    username?: string
  }>
}

interface SocialMediaSectionProps {
  data: SocialMediaSectionData
  theme: KankotriTheme
  animated?: boolean
}

const platformIcons = {
  instagram: '📷',
  facebook: '📘',
  twitter: '🐦',
  youtube: '📺',
  snapchat: '👻',
  tiktok: '🎵'
}

const platformNames = {
  instagram: 'Instagram',
  facebook: 'Facebook',
  twitter: 'Twitter',
  youtube: 'YouTube',
  snapchat: 'Snapchat',
  tiktok: 'TikTok'
}

export function SocialMediaSection({ data, theme, animated = true }: SocialMediaSectionProps) {
  const { text, font } = useThemeStyles(theme)
  const sectionStyle = theme.sectionStyles?.['custom-text'] || {}

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
        className="text-3xl md:text-4xl font-bold mb-4 text-center"
        style={{ ...font.headingEn, ...text.heading }}
      >
        {data.title || '📱 Connect With Us'}
      </h2>

      {data.description && (
        <p 
          className="text-center mb-6 max-w-2xl mx-auto"
          style={text.secondary}
        >
          {data.description}
        </p>
      )}

      {/* Hashtag */}
      {data.hashtag && (
        <div 
          className="text-center mb-8 p-4 rounded-full inline-block mx-auto"
          style={{
            backgroundColor: theme.colors.background.card,
            borderColor: theme.colors.accent,
            borderWidth: '2px',
            borderStyle: 'solid',
          }}
        >
          <p 
            className="text-2xl md:text-3xl font-bold"
            style={{ color: theme.colors.accent }}
          >
            #{data.hashtag}
          </p>
          <p 
            className="text-sm mt-1"
            style={text.secondary}
          >
            Share your photos with this hashtag!
          </p>
        </div>
      )}

      {/* Social Links */}
      {data.links && data.links.length > 0 && (
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {data.links.map((link, index) => (
              <HoverScale key={index} scale={1.08}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all"
                  style={{
                    backgroundColor: theme.colors.background.card,
                    borderColor: theme.colors.border.light,
                    borderWidth: '1px',
                    borderStyle: 'solid',
                  }}
                >
                  <div className="text-5xl mb-3">
                    {platformIcons[link.platform]}
                  </div>
                  <h4 
                    className="text-lg font-bold mb-1"
                    style={text.primary}
                  >
                    {platformNames[link.platform]}
                  </h4>
                  {link.username && (
                    <p 
                      className="text-sm"
                      style={{ color: theme.colors.accent }}
                    >
                      @{link.username}
                    </p>
                  )}
                </a>
              </HoverScale>
            ))}
          </div>
        </div>
      )}

      {/* Call to Action */}
      <div className="text-center mt-8">
        <p 
          className="text-sm italic"
          style={text.secondary}
        >
          Follow us for wedding updates & behind-the-scenes moments! ✨
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
