'use client'

import { useState } from 'react'
import type { SectionConfig } from '@/types/invitation'
import { AVAILABLE_SECTIONS } from '@/types/invitation'

interface EditSectionsProps {
  sections: SectionConfig[]
  onChange: (sections: SectionConfig[]) => void
}

export function EditSections({ sections, onChange }: EditSectionsProps) {
  const toggleSection = (sectionId: string) => {
    const section = AVAILABLE_SECTIONS.find(s => s.id === sectionId)
    if (!section || section.required) return

    const existing = sections.find(s => s.id === sectionId)

    if (existing) {
      // Remove section
      onChange(sections.filter(s => s.id !== sectionId))
    } else {
      // Add section
      onChange([
        ...sections,
        {
          id: sectionId,
          type: section.type,
          name: section.name,
          description: section.description,
          required: section.required,
          icon: section.icon,
          enabled: true,
          order: sections.length,
          data: {},
        } as SectionConfig
      ])
    }
  }

  const isSelected = (sectionId: string) => {
    return sections.some(s => s.id === sectionId)
  }

  // Group sections by category
  const coreSections = AVAILABLE_SECTIONS.slice(0, 6)
  const additionalSections = AVAILABLE_SECTIONS.slice(6, 14)
  const interactiveSections = AVAILABLE_SECTIONS.slice(14)

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-gray-800">Manage Sections</h3>
        <p className="text-sm text-gray-600">
          {sections.length} section{sections.length !== 1 ? 's' : ''} active
        </p>
      </div>

      <div className="space-y-8">
        {/* Core Sections */}
        <div>
          <h4 className="text-md font-bold text-gray-800 mb-4 flex items-center">
            <span className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-2">
              ⭐
            </span>
            Core Sections
          </h4>
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
                    <h5 className="font-bold text-gray-800">{section.name}</h5>
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
          <h4 className="text-md font-bold text-gray-800 mb-4 flex items-center">
            <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2">
              ➕
            </span>
            Additional Sections
          </h4>
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
                    <h5 className="font-bold text-gray-800">{section.name}</h5>
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
          <h4 className="text-md font-bold text-gray-800 mb-4 flex items-center">
            <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-2">
              💬
            </span>
            Interactive Sections
          </h4>
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
                    <h5 className="font-bold text-gray-800">{section.name}</h5>
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

        {/* Info Box */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            💡 <strong>Coming Soon:</strong> Content editors for each section will be added in the next update. 
            For now, you can enable/disable sections and they'll appear in your invitation with default content.
          </p>
        </div>
      </div>
    </div>
  )
}
