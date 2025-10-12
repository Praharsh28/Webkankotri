'use client'

import { useState } from 'react'
import { DEFAULT_SECTIONS, type SectionConfig, type SectionData } from '@/types/section'
import { AVAILABLE_SECTIONS } from '@/types/invitation'
import { SectionForm } from '@/components/forms/SectionForm'

interface SectionManagerProps {
  sections: SectionConfig[]
  onSectionsChange: (sections: SectionConfig[]) => void
  onSectionDataChange?: (sectionId: string, data: SectionData) => void
  sectionDataMap?: Record<string, any>
}

export function SectionManager({ sections, onSectionsChange, onSectionDataChange, sectionDataMap }: SectionManagerProps) {
  const [availableSections] = useState(DEFAULT_SECTIONS)
  const [editingSection, setEditingSection] = useState<string | null>(null)

  const toggleSection = (sectionId: string) => {
    const sectionTemplate = AVAILABLE_SECTIONS.find(s => s.id === sectionId)
    if (!sectionTemplate) return

    // Can't disable required sections
    if (sectionTemplate.required) return

    const existingSection = sections.find(s => s.id === sectionId)
    
    if (existingSection) {
      // Toggle existing section
      const updated = sections.map(section =>
        section.id === sectionId
          ? { ...section, enabled: !section.enabled }
          : section
      )
      onSectionsChange(updated)
    } else {
      // Add new section
      const newSection = {
        id: sectionTemplate.id,
        type: sectionTemplate.type,
        name: sectionTemplate.name,
        description: sectionTemplate.description,
        required: sectionTemplate.required,
        icon: sectionTemplate.icon,
        enabled: true,
        order: sections.length + 1,
        data: {}
      } as any
      onSectionsChange([...sections, newSection])
    }
  }

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1
    if (newIndex < 0 || newIndex >= sections.length) return

    const updated = [...sections]
    const [movedSection] = updated.splice(index, 1)
    updated.splice(newIndex, 0, movedSection)
    
    // Update order numbers
    updated.forEach((section, idx) => {
      section.order = idx + 1
    })

    onSectionsChange(updated)
  }

  const toggleEditSection = (sectionId: string) => {
    if (editingSection === sectionId) {
      setEditingSection(null)
    } else {
      setEditingSection(sectionId)
    }
  }

  const handleSaveSection = (sectionId: string, data: SectionData) => {
    if (onSectionDataChange) {
      onSectionDataChange(sectionId, data)
    }
    setEditingSection(null)
  }

  const enabledSections = sections.filter(s => s.enabled)
  const disabledSections = availableSections.filter(
    s => !sections.find(existing => existing.id === s.id)?.enabled
  )

  // Get all available sections with their enabled state
  const allSections = AVAILABLE_SECTIONS.map(availableSection => {
    const existingSection = sections.find(s => s.id === availableSection.id)
    return existingSection || {
      ...availableSection,
      enabled: false,
      order: sections.length + 1,
      data: {}
    }
  })

  return (
    <div className="space-y-6">
      {/* All Sections */}
      <div>
        <h3 className="text-lg font-semibold mb-4">
          Sections ({allSections.filter(s => s.enabled).length} active)
        </h3>
        <div className="space-y-2">
          {allSections.map((section, index) => {
            const isEditing = editingSection === section.id
            const currentData = sectionDataMap?.[section.id] || {}
            
            return (
            <div
              key={section.id}
              className={`rounded-lg border-2 transition-all ${
                section.enabled
                  ? 'bg-white border-primary-200 shadow-sm'
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              {/* Section Header */}
              <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3 flex-1">
                {/* Toggle Checkbox */}
                <input
                  type="checkbox"
                  checked={section.enabled}
                  onChange={() => toggleSection(section.id)}
                  disabled={section.required}
                  className="w-5 h-5 text-primary-600 rounded focus:ring-2 focus:ring-primary-500 disabled:opacity-50"
                />

                {/* Icon & Info */}
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{section.icon}</span>
                  <div>
                    <p className="font-medium text-gray-900">
                      {section.name}
                      {section.required && (
                        <span className="ml-2 text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
                          Required
                        </span>
                      )}
                    </p>
                    <p className="text-sm text-gray-600">{section.description}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                {/* Edit Button */}
                {section.enabled && (
                  <button
                    onClick={() => toggleEditSection(section.id)}
                    className={`p-2 rounded-lg transition-all ${
                      isEditing 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'text-blue-600 hover:text-blue-700 hover:bg-blue-50'
                    }`}
                    title={isEditing ? 'Close editor' : 'Edit section'}
                  >
                    {isEditing ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    )}
                  </button>
                )}
                
                {/* Reorder Buttons */}
                {section.enabled && !section.required && (
                  <>
                    <button
                      onClick={() => moveSection(index, 'up')}
                      disabled={index === 0}
                      className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      title="Move up"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                    </button>
                    <button
                      onClick={() => moveSection(index, 'down')}
                      disabled={index === sections.length - 1}
                      className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      title="Move down"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </>
                )}
              </div>
              </div>

              {/* Inline Edit Form - Smooth Expansion */}
              {isEditing && section.enabled && (
                <div className="border-t border-gray-200 bg-gray-50 p-4 animate-in slide-in-from-top duration-200">
                  <SectionForm
                    sectionType={section.id as any}
                    sectionId={section.id}
                    data={currentData}
                    onSave={(data) => handleSaveSection(section.id, data)}
                    onCancel={() => setEditingSection(null)}
                    inline
                  />
                </div>
              )}
            </div>
          )})}
        </div>
      </div>

      {/* Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 mb-2">💡 Tips:</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Check/uncheck sections to show/hide them</li>
          <li>• Click ✏️ to edit section content</li>
          <li>• Use ↑↓ buttons to reorder sections</li>
          <li>• Required sections can't be removed</li>
          <li>• Changes update live preview instantly</li>
        </ul>
      </div>
    </div>
  )
}
