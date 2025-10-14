'use client'

import { useMemo, useState, useEffect } from 'react'
import type { SectionBasedInvitation } from '@/types/section'
import {
  HeaderSection,
  ModernLightHeaderSection,
  EventSection,
  ParentsSection,
  MessageSection,
  BlessingSection,
  CustomTextSection,
  FamilyListSection,
  GallerySection,
  TimelineSection,
  MapSection,
  HotelsSection,
  DressCodeSection,
  RSVPSection,
  ContactSection,
} from '@/components/sections'
import {
  TemplateContainer,
  FloatingElements,
  DecorativeCorner,
} from '@/components/animations'
import { ModernLightContainer } from '@/components/animations/ModernLightContainer'
import { getTheme } from '@/lib/themes'

interface SectionBasedTemplateProps {
  invitation: SectionBasedInvitation
  preview?: boolean
}

export function SectionBasedTemplate({ invitation, preview = false }: SectionBasedTemplateProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Convert hex to RGB for gradient
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 249, g: 115, b: 22 }
  }

  const rgb = hexToRgb(invitation.theme.primaryColor)

  // Generate decorative dots (memoized)
  const decorativeDots = useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 2 + Math.random() * 3,
      opacity: 0.3 + Math.random() * 0.4,
    }))
  }, [])

  // Get enabled sections in order
  const enabledSections = useMemo(() => {
    return invitation.sections
      .filter(section => section.config.enabled)
      .sort((a, b) => a.config.order - b.config.order)
  }, [invitation.sections])

  // Check if this is modern-light template
  const isModernLight = invitation.template_id === 'modern-light'
  const kankotriTheme = isModernLight ? getTheme('modern-light') : null

  // SSR safety
  if (!mounted) {
    return (
      <div className="relative w-full min-h-screen bg-gradient-to-br from-orange-900 via-red-800 to-pink-900">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-center p-8">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold">
              Loading...
            </h1>
          </div>
        </div>
      </div>
    )
  }

  // MODERN LIGHT: Use special stunning container
  if (isModernLight && kankotriTheme) {
    return (
      <ModernLightContainer theme={kankotriTheme}>
        <div className="p-6 md:p-10 space-y-8">
          {enabledSections.map((section) => {
            const sectionTheme = invitation.theme as any
            switch (section.config.type) {
              case 'header':
                return (
                  <ModernLightHeaderSection
                    key={section.id}
                    data={section.data as any}
                    theme={kankotriTheme}
                    animated={!preview}
                  />
                )
              
              case 'blessing':
                return (
                  <BlessingSection
                    key={section.id}
                    data={section.data as any}
                    theme={kankotriTheme}
                    animated={!preview}
                  />
                )
              
              case 'parents':
                return (
                  <ParentsSection
                    key={section.id}
                    data={section.data as any}
                    theme={kankotriTheme}
                    animated={!preview}
                  />
                )
              
              case 'event-main':
              case 'event-mehendi':
              case 'event-sangeet':
              case 'event-haldi':
              case 'event-reception':
                return (
                  <EventSection
                    key={section.id}
                    data={section.data as any}
                    theme={kankotriTheme}
                    animated={!preview}
                  />
                )
              
              case 'message':
                return (
                  <MessageSection
                    key={section.id}
                    data={section.data as any}
                    theme={kankotriTheme}
                    animated={!preview}
                  />
                )
              
              case 'custom-text':
                return (
                  <CustomTextSection
                    key={section.id}
                    data={section.data as any}
                    theme={kankotriTheme}
                    animated={!preview}
                  />
                )
              
              default:
                return null
            }
          })}
        </div>
      </ModernLightContainer>
    )
  }

  // DEFAULT: Regular template
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Dynamic gradient background */}
      <div 
        className="absolute inset-0"
        style={{ 
          background: `linear-gradient(135deg, rgb(${rgb.r}, ${rgb.g}, ${rgb.b}) 0%, rgb(${Math.max(0, rgb.r - 50)}, ${Math.max(0, rgb.g - 50)}, ${Math.max(0, rgb.b - 30)}) 50%, rgb(${Math.max(0, rgb.r - 70)}, ${Math.max(0, rgb.g - 40)}, ${Math.max(0, rgb.b - 50)}) 100%)`,
          opacity: 0.95 
        }}
      />

      {/* Decorative dots */}
      {decorativeDots.map((dot) => (
        <div
          key={`dot-${dot.id}`}
          className="absolute rounded-full bg-yellow-200"
          style={{
            left: `${dot.left}%`,
            top: `${dot.top}%`,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            opacity: dot.opacity,
          }}
        />
      ))}

      {/* Floating diyas */}
      <FloatingElements icons={['🪔']} count={8} speed="slow" />

      {/* Decorative corners */}
      <DecorativeCorner position="top-left" pattern="floral" color="#FCD34D" size={120} />
      <DecorativeCorner position="top-right" pattern="floral" color="#FCD34D" size={120} />
      <DecorativeCorner position="bottom-left" pattern="mandala" color="#FCD34D" size={100} />
      <DecorativeCorner position="bottom-right" pattern="mandala" color="#FCD34D" size={100} />

      {/* Main content - Dynamic sections */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-12">
        {/* Top blessing */}
        <div className="text-center mb-8">
          <p className="font-gujarati text-lg md:text-xl text-orange-200">
            || શ્રી ગણેશાય નમઃ ||
          </p>
        </div>

        {/* Render all enabled sections dynamically */}
        <div className="space-y-8">
          {enabledSections.map((section) => {
            const sectionTheme = invitation.theme as any
            switch (section.config.type) {
              case 'blessing':
                return (
                  <BlessingSection
                    key={section.id}
                    data={section.data as any}
                    theme={sectionTheme}
                    animated={!preview}
                  />
                )
              
              case 'header':
                return (
                  <HeaderSection
                    key={section.id}
                    data={section.data as any}
                    theme={sectionTheme}
                    animated={!preview}
                  />
                )
              
              case 'parents':
                return (
                  <ParentsSection
                    key={section.id}
                    data={section.data as any}
                    theme={sectionTheme}
                    animated={!preview}
                  />
                )
              
              case 'event-main':
              case 'event-mehendi':
              case 'event-sangeet':
              case 'event-haldi':
              case 'event-reception':
                return (
                  <EventSection
                    key={section.id}
                    data={section.data as any}
                    theme={sectionTheme}
                    animated={!preview}
                  />
                )
              
              case 'message':
                return (
                  <MessageSection
                    key={section.id}
                    data={section.data as any}
                    theme={sectionTheme}
                    animated={!preview}
                  />
                )
              
              case 'custom-text':
                return (
                  <CustomTextSection
                    key={section.id}
                    data={section.data as any}
                    theme={sectionTheme}
                    animated={!preview}
                  />
                )
              
              case 'family-list':
                return (
                  <FamilyListSection
                    key={section.id}
                    data={section.data as any}
                    animated={!preview}
                    {...{theme: sectionTheme} as any}
                  />
                )
              
              case 'gallery':
                return (
                  <GallerySection
                    key={section.id}
                    data={section.data as any}
                    animated={!preview}
                    {...{theme: sectionTheme} as any}
                  />
                )
              
              case 'timeline':
                return (
                  <TimelineSection
                    key={section.id}
                    data={section.data as any}
                    animated={!preview}
                    {...{theme: sectionTheme} as any}
                  />
                )
              
              case 'map':
                return (
                  <MapSection
                    key={section.id}
                    data={section.data as any}
                    animated={!preview}
                    {...{theme: sectionTheme} as any}
                  />
                )
              
              case 'hotels':
                return (
                  <HotelsSection
                    key={section.id}
                    data={section.data as any}
                    animated={!preview}
                    {...{theme: sectionTheme} as any}
                  />
                )
              
              case 'dress-code':
                return (
                  <DressCodeSection
                    key={section.id}
                    data={section.data as any}
                    animated={!preview}
                    {...{theme: sectionTheme} as any}
                  />
                )
              
              case 'rsvp':
                return (
                  <RSVPSection
                    key={section.id}
                    data={section.data as any}
                    animated={!preview}
                    {...{theme: sectionTheme} as any}
                  />
                )
              
              case 'contact':
                return (
                  <ContactSection
                    key={section.id}
                    data={section.data as any}
                    animated={!preview}
                    {...{theme: sectionTheme} as any}
                  />
                )
              
              default:
                return null
            }
          })}
        </div>

        {/* Bottom blessing */}
        <div className="text-center mt-12">
          <p className="font-gujarati text-base md:text-lg text-orange-200">
            આપનું સ્વાગત છે
          </p>
        </div>
      </div>
    </div>
  )
}
