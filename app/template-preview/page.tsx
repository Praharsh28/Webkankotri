'use client'

import { useState } from 'react'
import { GarbaNightTemplate } from '@/components/templates/GarbaNightTemplate'
import { SAMPLE_GARBA_NIGHT_DATA } from '@/lib/constants/sample-data'
import type { GarbaNightData } from '@/types/template'

export default function TemplatePreviewPage() {
  const [templateData, setTemplateData] = useState<GarbaNightData>(SAMPLE_GARBA_NIGHT_DATA)

  const handleInputChange = (field: keyof GarbaNightData, value: string) => {
    setTemplateData(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="font-playfair text-2xl font-bold text-gray-900">
              Template Preview
            </h1>
            <div className="text-sm text-gray-600">
              Garba Night • Live Editor
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Editor Panel */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-6">Edit Details</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Groom's Name *
                  </label>
                  <input
                    type="text"
                    value={templateData.groomName}
                    onChange={(e) => handleInputChange('groomName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter groom's name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bride's Name *
                  </label>
                  <input
                    type="text"
                    value={templateData.brideName}
                    onChange={(e) => handleInputChange('brideName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter bride's name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Wedding Date *
                  </label>
                  <input
                    type="date"
                    value={templateData.weddingDate.split('T')[0]}
                    onChange={(e) => handleInputChange('weddingDate', e.target.value + 'T10:00:00')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Venue *
                  </label>
                  <input
                    type="text"
                    value={templateData.venue}
                    onChange={(e) => handleInputChange('venue', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter venue name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Custom Message (Optional)
                  </label>
                  <textarea
                    value={templateData.customMessage || ''}
                    onChange={(e) => handleInputChange('customMessage', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Add a personal message..."
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Primary Color
                  </label>
                  <input
                    type="color"
                    value={templateData.primaryColor}
                    onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                    className="w-full h-12 border border-gray-300 rounded-lg cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-xl shadow-lg p-6 border-2 border-orange-200">
              <div className="flex items-start gap-4 mb-4">
                <div className="text-4xl">❤️</div>
                <div>
                  <h3 className="font-bold text-xl">Love what you see?</h3>
                  <p className="text-gray-700">Download high quality, no watermark!</p>
                </div>
              </div>
              <button className="w-full bg-primary-500 text-white py-4 rounded-lg text-lg font-semibold hover:bg-primary-600 transition-colors shadow-lg">
                Download for ₹299 →
              </button>
              <p className="text-center text-sm text-gray-600 mt-3">
                ✓ Instant ✓ Unlimited edits ✓ Money-back guarantee
              </p>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="lg:sticky lg:top-24 space-y-4">
            <div className="bg-white rounded-xl shadow-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Live Preview</h3>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                  ● Live
                </span>
              </div>
              
              <div className="border-2 border-gray-200 rounded-xl overflow-hidden bg-gray-100">
                <GarbaNightTemplate data={templateData} preview />
              </div>
              
              <p className="text-center text-sm text-gray-500 mt-4">
                ✨ Updates as you type
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
