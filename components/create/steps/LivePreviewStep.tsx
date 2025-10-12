'use client'

import { getTheme, getThemeCSSVariables } from '@/lib/themes'
import { SectionRenderer } from '@/components/invite/SectionRenderer'
import type { InvitationBasicDetails, SectionConfig } from '@/types/invitation'

interface LivePreviewStepProps {
  basicDetails?: InvitationBasicDetails
  sections: SectionConfig[]
  template: any
  onNext: () => void
  onBack: () => void
}

export function LivePreviewStep({ basicDetails, sections, template, onNext, onBack }: LivePreviewStepProps) {
  // Get theme
  const theme = getTheme((template?.template_id || 'traditional') as any)
  const cssVars = getThemeCSSVariables(theme)

  // Sort sections by order
  const sortedSections = [...sections].sort((a, b) => a.order - b.order)

  // Get header data for preview (groom/bride names)
  const headerSection = sections.find(s => s.id === 'header')
  const headerData = headerSection?.data || {}
  
  // Get event data for preview
  const eventSection = sections.find(s => s.id === 'event')
  const eventData = eventSection?.data || {}

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              👁️ Live Preview
            </h2>
            <p className="text-gray-600">
              This is how your guests will see your invitation
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Using:</span>
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
              {template?.name || 'Template'}
            </span>
          </div>
        </div>
      </div>

      {/* Preview Container */}
      <div className="bg-white rounded-2xl shadow-lg p-4">
        <div className="bg-gray-100 rounded-lg p-4">
          <div className="mx-auto max-w-4xl bg-white rounded-lg overflow-hidden shadow-2xl">
            {/* Actual Invitation Preview */}
            <div
              style={{
                ...cssVars,
                background: theme.colors.background.primary,
              } as React.CSSProperties}
            >
              {/* Hero Section - Simple & Elegant */}
              <div
                className="py-16 px-4 text-center"
                style={{
                  backgroundColor: theme.colors.background.primary,
                }}
              >
                <div className="max-w-4xl mx-auto">
                  <h1
                    className="text-4xl md:text-5xl font-bold mb-4"
                    style={{
                      color: theme.colors.primary,
                      fontFamily: theme.fonts.heading.english,
                    }}
                  >
                    {headerData.groomName || headerData.brideName
                      ? `${headerData.groomTitle || ''} ${headerData.groomName || 'Groom'} & ${headerData.brideTitle || ''} ${headerData.brideName || 'Bride'}`.trim()
                      : basicDetails?.title || 'Your Names Here'}
                  </h1>

                  {eventData.date && (
                    <p
                      className="text-xl mb-2"
                      style={{ color: theme.colors.text.primary }}
                    >
                      {new Date(eventData.date).toLocaleDateString('en-IN', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  )}

                  {eventData.venue && (
                    <p className="text-lg" style={{ color: theme.colors.text.primary }}>
                      📍 {eventData.venue}
                      {eventData.venueAddress && `, ${eventData.venueAddress}`}
                    </p>
                  )}
                  
                  {eventData.time && (
                    <p className="text-base" style={{ color: theme.colors.text.primary }}>
                      ⏰ {eventData.time}
                    </p>
                  )}
                </div>
              </div>

              {/* Sections */}
              <div className="px-4 py-8 space-y-8">
                {sortedSections.map((section, index) =>
                  section.enabled ? (
                    <div key={section.id}>
                      <SectionRenderer
                        section={section}
                        theme={theme}
                        basicDetails={basicDetails || {}}
                        index={index}
                      />
                    </div>
                  ) : null
                )}

                {sortedSections.length === 0 && (
                  <div className="text-center py-12">
                    <p style={{ color: theme.colors.text.secondary }}>
                      No sections selected
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          💡 <strong>Tip:</strong> This is a live preview with your actual data and selected theme.
          You can go back to edit any section content.
        </p>
      </div>

      {/* Navigation */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex justify-between">
          <button
            onClick={onBack}
            className="px-8 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
          >
            ← Back to Content
          </button>

          <button
            onClick={onNext}
            className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all"
          >
            Looks Good! Continue →
          </button>
        </div>
      </div>
    </div>
  )
}
