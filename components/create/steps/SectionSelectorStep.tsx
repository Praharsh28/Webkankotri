'use client'

import { useState, useEffect } from 'react'
import type { SectionConfig } from '@/types/invitation'
import { AVAILABLE_SECTIONS } from '@/types/invitation'

interface SectionSelectorStepProps {
  sections: SectionConfig[]
  onNext: () => void
  onBack: () => void
  onUpdate: (sections: SectionConfig[]) => void
}

export function SectionSelectorStep({ sections, onNext, onBack, onUpdate }: SectionSelectorStepProps) {
  const [selectedSections, setSelectedSections] = useState<SectionConfig[]>(() => {
    // Initialize with default sections if empty
    if (sections.length > 0) return sections

    // Default: Header and Event are required and enabled by default
    return AVAILABLE_SECTIONS.filter(s => s.required).map((s, index) => ({
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
  })

  const toggleSection = (sectionId: string) => {
    const section = AVAILABLE_SECTIONS.find(s => s.id === sectionId)
    if (!section) return

    // Can't disable required sections
    if (section.required) return

    const existing = selectedSections.find(s => s.id === sectionId)

    if (existing) {
      // Remove section
      setSelectedSections(prev => prev.filter(s => s.id !== sectionId))
    } else {
      // Add section
      setSelectedSections(prev => [
        ...prev,
        {
          id: sectionId,
          type: section.type,
          name: section.name,
          description: section.description,
          required: section.required,
          icon: section.icon,
          enabled: true,
          order: prev.length,
          data: {},
        }
      ])
    }
  }

  const isSelected = (sectionId: string) => {
    return selectedSections.some(s => s.id === sectionId)
  }

  const handleNext = () => {
    onUpdate(selectedSections)
    onNext()
  }

  // Group sections by category
  const coreSections = AVAILABLE_SECTIONS.slice(0, 6)
  const additionalSections = AVAILABLE_SECTIONS.slice(6, 14)
  const interactiveSections = AVAILABLE_SECTIONS.slice(14)

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        🎨 Customize Your Invitation
      </h2>
      <p className="text-gray-600 mb-8">
        Choose which sections to include ({selectedSections.length} selected)
      </p>

      <div className="space-y-8">
        {/* Core Sections */}
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
            <span className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-2">
              ⭐
            </span>
            Core Sections
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {coreSections.map((section) => {
              const selected = isSelected(section.id)
              const required = section.required

              return (
                <button
                  key={section.id}
                  onClick={() => !required && toggleSection(section.id)}
                  disabled={required}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    selected
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 bg-white hover:border-purple-300'
                  } ${required ? 'cursor-not-allowed opacity-75' : 'cursor-pointer hover:shadow-md'}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-gray-800">{section.name}</h4>
                    <div className="flex items-center space-x-2">
                      {required && (
                        <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-semibold">
                          Required
                        </span>
                      )}
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selected ? 'border-purple-500 bg-purple-500' : 'border-gray-300'
                      }`}>
                        {selected && <span className="text-white text-sm">✓</span>}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{section.description}</p>
                </button>
              )
            })}
          </div>
        </div>

        {/* Additional Sections */}
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
            <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2">
              ➕
            </span>
            Additional Sections
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {additionalSections.map((section) => {
              const selected = isSelected(section.id)

              return (
                <button
                  key={section.id}
                  onClick={() => toggleSection(section.id)}
                  className={`p-4 rounded-lg border-2 text-left transition-all cursor-pointer hover:shadow-md ${
                    selected
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 bg-white hover:border-purple-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-gray-800">{section.name}</h4>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selected ? 'border-purple-500 bg-purple-500' : 'border-gray-300'
                    }`}>
                      {selected && <span className="text-white text-sm">✓</span>}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{section.description}</p>
                </button>
              )
            })}
          </div>
        </div>

        {/* Interactive Sections */}
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
            <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-2">
              💬
            </span>
            Interactive Sections
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {interactiveSections.map((section) => {
              const selected = isSelected(section.id)

              return (
                <button
                  key={section.id}
                  onClick={() => toggleSection(section.id)}
                  className={`p-4 rounded-lg border-2 text-left transition-all cursor-pointer hover:shadow-md ${
                    selected
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 bg-white hover:border-purple-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-gray-800">{section.name}</h4>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selected ? 'border-purple-500 bg-purple-500' : 'border-gray-300'
                    }`}>
                      {selected && <span className="text-white text-sm">✓</span>}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{section.description}</p>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Selected Count */}
      <div className="mt-8 p-4 bg-purple-50 rounded-lg">
        <p className="text-center text-purple-800 font-semibold">
          ✨ {selectedSections.length} sections selected
        </p>
      </div>

      {/* Navigation Buttons */}
      <div className="mt-8 flex justify-between">
        <button
          onClick={onBack}
          className="px-8 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
        >
          ← Back
        </button>

        <button
          onClick={handleNext}
          disabled={selectedSections.length === 0}
          className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue →
        </button>
      </div>
    </div>
  )
}
