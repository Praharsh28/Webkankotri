'use client'

import { getTheme, getThemeCSSVariables } from '@/lib/themes'
import { SectionRenderer } from './SectionRenderer'
import { ShareButtons } from './ShareButtons'

interface InvitationViewerProps {
  invitation: any
  template: any
}

export function InvitationViewer({ invitation, template }: InvitationViewerProps) {
  const basicDetails = invitation.data?.basicDetails || {}
  const sections = invitation.data?.sections || []
  
  // Get theme - use the template_id to load the correct theme
  const theme = getTheme((template?.template_id || 'traditional') as any)
  
  const cssVars = getThemeCSSVariables(theme)

  // Sort sections by order
  const sortedSections = [...sections].sort((a, b) => a.order - b.order)

  // Get header data for names
  const headerSection = sections.find((s: any) => s.id === 'header')
  const headerData = headerSection?.data || {}
  
  // Get event data
  const eventSection = sections.find((s: any) => s.id === 'event')
  const eventData = eventSection?.data || {}

  // Check if template is paid
  const isPaidTemplate = template?.price > 0

  // Get current URL for sharing
  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareTitle = `${invitation.title} - Wedding Invitation`

  return (
    <div 
      className="min-h-screen py-8 px-4"
      style={{
        background: '#f5f5f5', // Subtle gray background
      }}
    >
      {/* Share Buttons - Floating */}
      <div className="max-w-4xl mx-auto mb-4">
        <div className="bg-white rounded-xl shadow-md p-4 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-gray-800">Share this invitation</h2>
            <p className="text-xs text-gray-600">Let your loved ones know about your special day</p>
          </div>
          <ShareButtons url={shareUrl} title={shareTitle} />
        </div>
      </div>

      {/* Card Container - Centered */}
      <main className="max-w-4xl mx-auto">
        <div 
          className="bg-white rounded-2xl shadow-2xl overflow-hidden"
          style={{
            border: '2px solid #e5e7eb',
          }}
        >
          {/* Invitation Content */}
          <div
            style={{
              ...cssVars,
              background: theme.colors.background.primary,
            } as React.CSSProperties}
          >
            {/* Hero Section - Simple & Elegant */}
            <div 
              className="py-12 px-6 md:py-16 md:px-8 text-center"
              style={{
                backgroundColor: theme.colors.background.primary,
              }}
            >
              <div className="max-w-3xl mx-auto">
                <h1 
                  className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
                  style={{ 
                    color: theme.colors.primary,
                    fontFamily: theme.fonts.heading.english,
                  }}
                >
                  {headerData.groomName || headerData.brideName
                    ? `${headerData.groomTitle || ''} ${headerData.groomName || 'Groom'} & ${headerData.brideTitle || ''} ${headerData.brideName || 'Bride'}`.trim()
                    : invitation.title}
                </h1>
                
                {eventData.date && (
                  <p 
                    className="text-lg md:text-xl mb-2"
                    style={{ color: theme.colors.text.primary }}
                  >
                    {new Date(eventData.date).toLocaleDateString('en-IN', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                )}
                
                {eventData.venue && (
                  <p 
                    className="text-base md:text-lg"
                    style={{ color: theme.colors.text.primary }}
                  >
                    📍 {eventData.venue}
                    {eventData.venueAddress && `, ${eventData.venueAddress}`}
                  </p>
                )}
                
                {eventData.time && (
                  <p 
                    className="text-sm md:text-base mt-2"
                    style={{ color: theme.colors.text.secondary }}
                  >
                    ⏰ {eventData.time}
                  </p>
                )}
              </div>
            </div>

            {/* Sections */}
            <div className="px-6 md:px-8 py-8 space-y-8">
              {sortedSections.map((section, index) => (
                section.enabled && (
                  <SectionRenderer
                    key={section.id}
                    section={section}
                    theme={theme}
                    basicDetails={basicDetails}
                    index={index}
                  />
                )
              ))}
              
              {/* If no sections */}
              {sortedSections.filter(s => s.enabled).length === 0 && (
                <div className="text-center py-12">
                  <div className="text-5xl mb-4">💐</div>
                  <h3 
                    className="text-2xl font-bold mb-2"
                    style={{ color: theme.colors.primary }}
                  >
                    You're Invited!
                  </h3>
                  <p style={{ color: theme.colors.text.secondary }}>
                    Save the date for our special day
                  </p>
                </div>
              )}
            </div>

            {/* Footer - Only show for FREE templates */}
            {!isPaidTemplate && (
              <footer 
                className="py-6 text-center border-t"
                style={{ 
                  borderColor: theme.colors.border.light,
                  backgroundColor: theme.colors.background.secondary,
                }}
              >
                <p className="text-sm" style={{ color: theme.colors.text.secondary }}>
                  Made with 💖 by{' '}
                  <a 
                    href={typeof window !== 'undefined' ? window.location.origin : process.env.NEXT_PUBLIC_APP_URL || '/'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline font-semibold"
                    style={{ color: theme.colors.accent }}
                  >
                    {process.env.NEXT_PUBLIC_APP_NAME || 'E-Kankotri'}
                  </a>
                </p>
              </footer>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
