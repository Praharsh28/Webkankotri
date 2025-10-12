'use client'

import { useState } from 'react'
import { traditionalTheme, royalTheme, modernTheme, traditionalLightTheme, royalLightTheme, modernLightTheme } from '@/lib/themes'
import { HeaderSection, BlessingSection, EventSection, ParentsSection, MessageSection, CustomTextSection } from '@/components/sections'
import type { KankotriTheme } from '@/types/theme'
import type { HeaderSectionData, BlessingSectionData, EventSectionData, ParentsSectionData, MessageSectionData, CustomTextSectionData } from '@/types/section'

// Sample data
const sampleHeader: HeaderSectionData = {
  groomName: 'Raj Patel',
  brideName: 'Priya Shah',
  groomTitle: 'Son of',
  brideTitle: 'Daughter of',
}

const sampleBlessing: BlessingSectionData = {
  type: 'ganesh',
  text: '|| શ્રી ગણેશાય નમઃ ||',
  language: 'gu',
  showIcon: true,
}

const sampleEvent: EventSectionData = {
  eventName: 'Wedding Ceremony',
  date: '2025-02-14',
  time: '7:00 PM onwards',
  venue: 'Grand Heritage Hall',
  venueAddress: '123 Main Street, Ahmedabad, Gujarat',
  description: 'Join us for the wedding celebration',
}

const sampleParents: ParentsSectionData = {
  groomParents: 'Mr. & Mrs. Patel',
  brideParents: 'Mr. & Mrs. Shah',
  showParentNames: true,
}

const sampleMessage: MessageSectionData = {
  message: 'Two hearts, one soul. We invite you to witness our union and bless us as we begin this beautiful journey together.',
  author: 'With love',
}

const sampleCustomText: CustomTextSectionData = {
  title: 'આભાર',
  content: 'તમારી હાજરી અમને અનેક આશીર્વાદ આપશે.',
  textAlign: 'center',
  language: 'gu',
  showBorder: true,
}

const THEMES = [
  { id: 'traditional', name: 'Traditional Gujarati', theme: traditionalTheme, badge: 'FREE', type: 'dark' },
  { id: 'royal', name: 'Royal Maroon', theme: royalTheme, badge: '₹99', type: 'dark' },
  { id: 'modern', name: 'Modern Pastel', theme: modernTheme, badge: '₹149', type: 'dark' },
  { id: 'traditional-light', name: 'Traditional Light', theme: traditionalLightTheme, badge: 'FREE', type: 'light' },
  { id: 'royal-light', name: 'Royal Light', theme: royalLightTheme, badge: '₹99', type: 'light' },
  { id: 'modern-light', name: 'Modern Light', theme: modernLightTheme, badge: '₹149', type: 'light' },
]

export default function ThemeDemoPage() {
  const [selectedTheme, setSelectedTheme] = useState<KankotriTheme>(traditionalTheme)

  return (
    <div 
      className="min-h-screen transition-colors duration-500"
      style={{
        backgroundColor: 
          // Dark themes
          selectedTheme.id === 'traditional' ? '#1a0a0a' : 
          selectedTheme.id === 'royal' ? '#0f0506' :
          selectedTheme.id === 'modern' ? '#0a0a1a' :
          // Light themes
          selectedTheme.id === 'traditional-light' ? '#FDF5EE' :
          selectedTheme.id === 'royal-light' ? '#FBF8F5' :
          selectedTheme.id === 'modern-light' ? '#F5F7FA' :
          '#FAFBFC' // default light
      }}
    >
      {/* Theme Selector */}
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Theme Preview</h1>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {THEMES.map(({ id, name, theme, badge }) => (
              <button
                key={id}
                onClick={() => setSelectedTheme(theme)}
                className={`flex-shrink-0 px-6 py-3 rounded-lg border-2 transition-all ${
                  selectedTheme.id === id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    <div className="w-6 h-6 rounded" style={{ backgroundColor: theme.colors.primary }} />
                    <div className="w-6 h-6 rounded" style={{ backgroundColor: theme.colors.secondary }} />
                    <div className="w-6 h-6 rounded" style={{ backgroundColor: theme.colors.accent }} />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-gray-900">{name}</div>
                    <div className="text-xs text-gray-500">{badge}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="max-w-4xl mx-auto p-4 md:p-8">
        <div 
          className="rounded-xl p-4 mb-4 shadow-lg border transition-colors duration-500"
          style={{
            backgroundColor: `${selectedTheme.colors.primary}15`,
            borderColor: `${selectedTheme.colors.secondary}30`
          }}
        >
          <p className="text-sm text-center" style={{ color: selectedTheme.colors.text.primary }}>
            <strong>Current Theme:</strong> {selectedTheme.name} - {selectedTheme.description}
          </p>
        </div>
        
        <div 
          className="rounded-2xl shadow-2xl overflow-hidden min-h-[600px]"
          style={{
            background: selectedTheme.backgrounds.gradient.via 
              ? `linear-gradient(${selectedTheme.backgrounds.gradient.direction}, ${selectedTheme.backgrounds.gradient.from}, ${selectedTheme.backgrounds.gradient.via}, ${selectedTheme.backgrounds.gradient.to})`
              : `linear-gradient(${selectedTheme.backgrounds.gradient.direction}, ${selectedTheme.backgrounds.gradient.from}, ${selectedTheme.backgrounds.gradient.to})`,
          }}
        >
          <div className="p-6 md:p-8 space-y-6">
            {/* Header Section */}
            <div 
              className="text-center py-8 md:py-12 rounded-lg"
              style={{
                backgroundColor: selectedTheme.sectionStyles?.header?.backgroundColor,
                borderColor: selectedTheme.sectionStyles?.header?.borderColor,
                padding: selectedTheme.sectionStyles?.header?.padding,
                color: selectedTheme.colors.text.heading,
              }}
            >
              <div className="space-y-4">
                <p className="text-lg font-medium" style={{ color: selectedTheme.colors.text.secondary }}>{sampleHeader.groomTitle}</p>
                <h1 
                  className="text-4xl md:text-6xl font-bold leading-tight"
                  style={{ 
                    fontFamily: selectedTheme.fonts.heading.english, 
                    color: selectedTheme.colors.text.heading
                  }}
                >
                  {sampleHeader.groomName}
                </h1>
              </div>
              
              <div className="flex items-center justify-center my-6">
                <div className="w-24 h-0.5" style={{ background: `linear-gradient(to right, transparent, ${selectedTheme.colors.accent}, transparent)` }} />
                <span className="mx-4 text-3xl" style={{ color: selectedTheme.colors.accent }}>❀</span>
                <div className="w-24 h-0.5" style={{ background: `linear-gradient(to right, transparent, ${selectedTheme.colors.accent}, transparent)` }} />
              </div>
              
              <div className="space-y-4">
                <p className="text-lg font-medium" style={{ color: selectedTheme.colors.text.secondary }}>{sampleHeader.brideTitle}</p>
                <h1 
                  className="text-4xl md:text-6xl font-bold leading-tight"
                  style={{ 
                    fontFamily: selectedTheme.fonts.heading.english, 
                    color: selectedTheme.colors.text.heading
                  }}
                >
                  {sampleHeader.brideName}
                </h1>
              </div>
            </div>

            {/* Blessing Section */}
            <div 
              className="py-6 px-4 text-center rounded-lg border"
              style={{
                backgroundColor: selectedTheme.sectionStyles?.blessing?.backgroundColor,
                borderColor: selectedTheme.sectionStyles?.blessing?.borderColor,
              }}
            >
              <div className="text-4xl mb-3">🙏</div>
              <div 
                className="text-xl md:text-2xl font-semibold"
                style={{ 
                  fontFamily: selectedTheme.fonts.heading.gujarati, 
                  color: selectedTheme.sectionStyles?.blessing?.textColor || selectedTheme.colors.text.secondary
                }}
              >
                {sampleBlessing.text}
              </div>
              <div className="flex items-center justify-center mt-4">
                <div className="w-12 h-0.5" style={{ background: `linear-gradient(to right, transparent, ${selectedTheme.colors.accent}, transparent)` }} />
                <span className="mx-3" style={{ color: selectedTheme.colors.accent }}>❀</span>
                <div className="w-12 h-0.5" style={{ background: `linear-gradient(to right, transparent, ${selectedTheme.colors.accent}, transparent)` }} />
              </div>
            </div>

            {/* Event Section */}
            <div 
              className="text-center py-8 px-4 rounded-lg border"
              style={{
                backgroundColor: selectedTheme.sectionStyles?.['event-main']?.backgroundColor,
                borderColor: selectedTheme.sectionStyles?.['event-main']?.borderColor,
              }}
            >
              <h2 
                className="text-3xl md:text-4xl font-bold mb-6"
                style={{ 
                  fontFamily: selectedTheme.fonts.heading.english, 
                  color: selectedTheme.colors.text.heading
                }}
              >
                Wedding Ceremony
              </h2>
              <div 
                className="inline-flex items-center gap-3 backdrop-blur-sm rounded-full px-6 py-3 border mb-4"
                style={{ backgroundColor: selectedTheme.colors.background.card, borderColor: selectedTheme.colors.border.light }}
              >
                <span className="text-2xl">📅</span>
                <div className="text-left">
                  <p className="text-xl font-semibold" style={{ color: selectedTheme.colors.text.primary }}>February 14, 2025</p>
                  <p className="text-lg font-medium" style={{ color: selectedTheme.colors.text.secondary }}>7:00 PM onwards</p>
                </div>
              </div>
              <div 
                className="inline-flex items-center gap-3 backdrop-blur-sm rounded-full px-6 py-3 border"
                style={{ backgroundColor: selectedTheme.colors.background.card, borderColor: selectedTheme.colors.border.light }}
              >
                <span className="text-2xl">📍</span>
                <div className="text-left">
                  <p className="text-lg font-semibold" style={{ color: selectedTheme.colors.text.primary }}>Grand Heritage Hall</p>
                  <p className="text-sm font-medium" style={{ color: selectedTheme.colors.text.secondary }}>Ahmedabad, Gujarat</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Theme Details */}
        <div 
          className="mt-8 rounded-lg shadow-lg border p-6 transition-colors duration-500"
          style={{
            backgroundColor: `${selectedTheme.colors.primary}15`,
            borderColor: `${selectedTheme.colors.secondary}30`
          }}
        >
          <h2 className="text-xl font-bold mb-4" style={{ color: selectedTheme.colors.text.heading }}>Theme Details</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2" style={{ color: selectedTheme.colors.text.secondary }}>Colors</h3>
              <div className="space-y-2 text-sm" style={{ color: selectedTheme.colors.text.primary }}>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded border border-gray-600" style={{ backgroundColor: selectedTheme.colors.primary }} />
                  <span>Primary: {selectedTheme.colors.primary}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded border border-gray-600" style={{ backgroundColor: selectedTheme.colors.secondary }} />
                  <span>Secondary: {selectedTheme.colors.secondary}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded border border-gray-600" style={{ backgroundColor: selectedTheme.colors.accent }} />
                  <span>Accent: {selectedTheme.colors.accent}</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2" style={{ color: selectedTheme.colors.text.secondary }}>Typography</h3>
              <div className="space-y-2 text-sm" style={{ color: selectedTheme.colors.text.primary }}>
                <div>Heading (EN): {selectedTheme.fonts.heading.english}</div>
                <div>Heading (GU): {selectedTheme.fonts.heading.gujarati}</div>
                <div>Body (EN): {selectedTheme.fonts.body.english}</div>
                <div>Decorative: {selectedTheme.fonts.decorative}</div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2" style={{ color: selectedTheme.colors.text.secondary }}>Category</h3>
              <div className="text-sm capitalize" style={{ color: selectedTheme.colors.text.primary }}>{selectedTheme.category}</div>
            </div>
            <div>
              <h3 className="font-semibold mb-2" style={{ color: selectedTheme.colors.text.secondary }}>Pricing</h3>
              <div className="text-sm" style={{ color: selectedTheme.colors.text.primary }}>{selectedTheme.price === 0 ? 'Free' : `₹${selectedTheme.price}`}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
