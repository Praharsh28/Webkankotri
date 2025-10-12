'use client'

import type { InvitationBasicDetails } from '@/types/invitation'

interface EditBasicDetailsProps {
  data: InvitationBasicDetails
  onChange: (data: InvitationBasicDetails) => void
}

export function EditBasicDetails({ data, onChange }: EditBasicDetailsProps) {
  const handleChange = (field: keyof InvitationBasicDetails, value: string) => {
    onChange({ ...data, [field]: value })
  }

  return (
    <div>
      <h3 className="text-lg font-bold text-gray-800 mb-6">Wedding Information</h3>
      
      <div className="space-y-6">
        {/* Invitation Title */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Invitation Title
          </label>
          <input
            type="text"
            value={data.title}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="e.g., Raj & Priya's Wedding"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bride Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Bride Name
            </label>
            <input
              type="text"
              value={data.brideName}
              onChange={(e) => handleChange('brideName', e.target.value)}
              placeholder="Enter bride's name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Groom Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Groom Name
            </label>
            <input
              type="text"
              value={data.groomName}
              onChange={(e) => handleChange('groomName', e.target.value)}
              placeholder="Enter groom's name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Wedding Date */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Wedding Date
          </label>
          <input
            type="date"
            value={data.weddingDate}
            onChange={(e) => handleChange('weddingDate', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        {/* Venue */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Venue
          </label>
          <input
            type="text"
            value={data.venue}
            onChange={(e) => handleChange('venue', e.target.value)}
            placeholder="e.g., Grand Palace, Wedding Hall"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* City */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              City
            </label>
            <input
              type="text"
              value={data.city}
              onChange={(e) => handleChange('city', e.target.value)}
              placeholder="e.g., Mumbai"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* State */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              State
            </label>
            <input
              type="text"
              value={data.state}
              onChange={(e) => handleChange('state', e.target.value)}
              placeholder="e.g., Maharashtra"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            💡 <strong>Tip:</strong> Changes are not saved automatically. Click the "Save" button at the top to save your changes.
          </p>
        </div>
      </div>
    </div>
  )
}
