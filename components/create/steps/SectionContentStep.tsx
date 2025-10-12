'use client'

import { useState, useEffect } from 'react'
import { SectionManager } from '@/components/features/SectionManager'
import { getTheme, getThemeCSSVariables } from '@/lib/themes'
import { SectionRenderer } from '@/components/invite/SectionRenderer'
import { AVAILABLE_SECTIONS } from '@/types/invitation'
import type { SectionConfig, InvitationBasicDetails } from '@/types/invitation'

interface SectionContentStepProps {
  sections: SectionConfig[]
  basicDetails?: InvitationBasicDetails
  template: any
  onNext: () => void
  onBack: () => void
  onUpdate: (sections: SectionConfig[]) => void
  onUpdateBasicDetails: (basicDetails: InvitationBasicDetails) => void
}

export function SectionContentStep({ 
  sections, 
  basicDetails, 
  template, 
  onNext, 
  onBack, 
  onUpdate,
  onUpdateBasicDetails 
}: SectionContentStepProps) {
  // Local state for invitation name
  const [invitationName, setInvitationName] = useState(basicDetails?.title || '')

  // Initialize sections if empty (in useEffect to avoid setState during render)
  useEffect(() => {
    if (sections.length === 0) {
      const defaultSections = AVAILABLE_SECTIONS.filter(s => s.required).map((s, index) => ({
        id: s.id,
        type: s.type,
        name: s.name,
        description: s.description,
        required: s.required,
        icon: s.icon,
        enabled: true,
        order: index + 1,
        data: {}
      }))
      onUpdate(defaultSections)
    }
  }, []) // Only run once on mount
  // Create section data map
  const sectionDataMap = sections.reduce((acc, section) => ({
    ...acc,
    [section.id]: section.data || {}
  }), {})

  // Handle section data changes
  const handleSectionDataChange = (sectionId: string, data: any) => {
    const updatedSections = sections.map(section =>
      section.id === sectionId ? { ...section, data } : section
    )
    onUpdate(updatedSections)
  }

  // Get theme based on selected template
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

  // Handle name save
  const handleNameBlur = () => {
    onUpdateBasicDetails({
      ...basicDetails,
      title: invitationName
    } as InvitationBasicDetails)
  }

  return (
    <div className="space-y-6">
      {/* Header with Invitation Name */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">
              ✏️ Create Your Invitation
            </h2>
            <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Live Updates
            </span>
          </div>
          
          {/* Invitation Name Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Invitation Name *
            </label>
            <input
              type="text"
              value={invitationName}
              onChange={(e) => setInvitationName(e.target.value)}
              onBlur={handleNameBlur}
              placeholder="e.g., Raj & Priya Wedding"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none text-lg font-medium"
              required
            />
            <p className="mt-1 text-sm text-gray-500">
              This will be your invitation title
            </p>
          </div>
        </div>
      </div>

      {/* Split Screen */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left: Section Manager */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <SectionManager
            sections={sections as any}
            onSectionsChange={onUpdate as any}
            onSectionDataChange={handleSectionDataChange}
            sectionDataMap={sectionDataMap}
          />
        </div>

        {/* Right: Live Preview */}
        <div className="lg:sticky lg:top-6 space-y-4">
          {/* Preview Header */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <h3 className="font-semibold text-gray-800">Live Preview</h3>
              <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full font-medium">
                {template?.name || 'Template'}
              </span>
            </div>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Live
            </span>
          </div>

          {/* Card-style Preview Container */}
          <div className="relative">
            {/* Simple background with prominent card */}
            <div className="bg-gray-50 p-4 md:p-6 lg:p-8 rounded-2xl">
              <div 
                className="bg-white rounded-lg overflow-hidden mx-auto max-w-md"
                style={{
                  border: '2px solid #e5e7eb',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
                }}
              >
                <div className="aspect-[3/4] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                {/* Theme-based preview */}
                <div
                  style={{
                    ...cssVars,
                    background: theme.colors.background.primary,
                  } as React.CSSProperties}
                  className="min-h-full"
                >
                  {/* Hero Section - Simple & Elegant */}
                  <div
                    className="py-12 px-4 text-center"
                    style={{
                      backgroundColor: theme.colors.background.primary,
                    }}
                  >
                    <div className="max-w-4xl mx-auto">
                      <h1
                        className="text-3xl md:text-4xl font-bold mb-3"
                        style={{
                          color: theme.colors.primary,
                          fontFamily: theme.fonts.heading.english,
                        }}
                      >
                        {headerData.groomName || headerData.brideName
                          ? `${headerData.groomTitle || ''} ${headerData.groomName || 'Groom'} & ${headerData.brideTitle || ''} ${headerData.brideName || 'Bride'}`.trim()
                          : invitationName || 'Your Names Here'}
                      </h1>

                      {eventData.date && (
                        <p
                          className="text-lg mb-2"
                          style={{ color: theme.colors.text.primary }}
                        >
                          {new Date(eventData.date).toLocaleDateString('en-IN', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                      )}

                      {eventData.venue && (
                        <p className="text-base" style={{ color: theme.colors.text.primary }}>
                          📍 {eventData.venue}
                          {eventData.venueAddress && `, ${eventData.venueAddress}`}
                        </p>
                      )}
                      
                      {eventData.time && (
                        <p className="text-sm" style={{ color: theme.colors.text.primary }}>
                          ⏰ {eventData.time}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Sections */}
                  <div className="px-4 py-6 space-y-6">
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

                    {sortedSections.filter(s => s.enabled).length === 0 && (
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
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-2 text-center text-sm">
              <div className="bg-purple-50 p-2 rounded">
                <div className="font-bold text-purple-700">
                  {sections.filter(s => s.enabled).length}
                </div>
                <div className="text-gray-600">Active</div>
              </div>
              <div className="bg-blue-50 p-2 rounded">
                <div className="font-bold text-blue-700">
                  {sections.length}
                </div>
                <div className="text-gray-600">Total</div>
              </div>
              <div className="bg-green-50 p-2 rounded">
                <div className="font-bold text-green-700">✓</div>
                <div className="text-gray-600">Ready</div>
              </div>
            </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex justify-between">
          <button
            onClick={onBack}
            className="px-8 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
          >
            ← Back to Sections
          </button>

          <button
            onClick={onNext}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all"
          >
            Continue to Preview →
          </button>
        </div>
      </div>
    </div>
  )
}
