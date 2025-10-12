'use client'

import Link from 'next/link'

interface TemplateStepProps {
  templateId: string
  template: any
  onNext: () => void
  onTemplateChange: (templateId: string) => void
}

export function TemplateStep({ templateId, template, onNext, onTemplateChange }: TemplateStepProps) {
  if (!templateId || !template) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="text-6xl mb-4">🎨</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          No Template Selected
        </h2>
        <p className="text-gray-600 mb-6">
          Please choose a template to get started
        </p>
        <Link 
          href="/templates"
          className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all"
        >
          Browse Templates
        </Link>
      </div>
    )
  }

  // Extract colors for preview
  const config = template.config || {}
  const colors = config.colors || {}
  const primaryColor = colors.primary || '#800020'
  const secondaryColor = colors.secondary || '#D4AF37'
  const accentColor = colors.accent || '#F0E68C'

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        ✅ Template Selected
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Template Preview */}
        <div>
          <div 
            className="h-64 rounded-xl overflow-hidden mb-4"
            style={{
              background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 50%, ${accentColor} 100%)`
            }}
          >
            <div className="h-full flex items-center justify-center bg-black/20">
              <div className="text-white text-center">
                <h3 className="text-3xl font-bold mb-2">{template.name}</h3>
                <p className="text-white/90">{template.description}</p>
              </div>
            </div>
          </div>

          {/* Color Palette */}
          <div className="flex space-x-3">
            <div 
              className="flex-1 h-12 rounded-lg border-2 border-white shadow-lg"
              style={{ backgroundColor: primaryColor }}
              title="Primary Color"
            />
            <div 
              className="flex-1 h-12 rounded-lg border-2 border-white shadow-lg"
              style={{ backgroundColor: secondaryColor }}
              title="Secondary Color"
            />
            <div 
              className="flex-1 h-12 rounded-lg border-2 border-white shadow-lg"
              style={{ backgroundColor: accentColor }}
              title="Accent Color"
            />
          </div>
        </div>

        {/* Template Info */}
        <div>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-1">Template Name</h3>
              <p className="text-lg font-bold text-gray-900">{template.name}</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-1">Category</h3>
              <span className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
                {template.category}
              </span>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-1">Price</h3>
              <p className="text-2xl font-bold text-gray-900">
                {template.price === 0 ? 'FREE' : `₹${template.price}`}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-1">Description</h3>
              <p className="text-gray-600">{template.description}</p>
            </div>

            <div className="pt-4 border-t">
              <Link
                href="/templates"
                className="text-purple-600 hover:text-purple-700 font-medium text-sm"
              >
                ← Change Template
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Next Button */}
      <div className="mt-8 flex justify-end">
        <button
          onClick={onNext}
          className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all"
        >
          Continue →
        </button>
      </div>
    </div>
  )
}
