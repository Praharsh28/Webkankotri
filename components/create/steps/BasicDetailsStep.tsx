'use client'

import { useState } from 'react'
import type { InvitationBasicDetails } from '@/types/invitation'

interface BasicDetailsStepProps {
  data?: InvitationBasicDetails
  onNext: () => void
  onBack: () => void
  onUpdate: (data: InvitationBasicDetails) => void
}

export function BasicDetailsStep({ data, onNext, onBack, onUpdate }: BasicDetailsStepProps) {
  const [formData, setFormData] = useState<InvitationBasicDetails>(data || {
    title: '',
    brideName: '',
    groomName: '',
    weddingDate: '',
    venue: '',
    city: '',
    state: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (field: keyof InvitationBasicDetails, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) newErrors.title = 'Title is required'
    if (!formData.brideName.trim()) newErrors.brideName = 'Bride name is required'
    if (!formData.groomName.trim()) newErrors.groomName = 'Groom name is required'
    if (!formData.weddingDate) newErrors.weddingDate = 'Wedding date is required'
    if (!formData.venue.trim()) newErrors.venue = 'Venue is required'
    if (!formData.city.trim()) newErrors.city = 'City is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validate()) {
      onUpdate(formData)
      onNext()
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        💑 Wedding Details
      </h2>
      <p className="text-gray-600 mb-8">
        Tell us about your special day
      </p>

      <div className="space-y-6">
        {/* Invitation Title */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Invitation Title *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="e.g., Raj & Priya's Wedding"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
              errors.title ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bride Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Bride Name *
            </label>
            <input
              type="text"
              value={formData.brideName}
              onChange={(e) => handleChange('brideName', e.target.value)}
              placeholder="Enter bride's name"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                errors.brideName ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.brideName && <p className="text-red-500 text-sm mt-1">{errors.brideName}</p>}
          </div>

          {/* Groom Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Groom Name *
            </label>
            <input
              type="text"
              value={formData.groomName}
              onChange={(e) => handleChange('groomName', e.target.value)}
              placeholder="Enter groom's name"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                errors.groomName ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.groomName && <p className="text-red-500 text-sm mt-1">{errors.groomName}</p>}
          </div>
        </div>

        {/* Wedding Date */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Wedding Date *
          </label>
          <input
            type="date"
            value={formData.weddingDate}
            onChange={(e) => handleChange('weddingDate', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
              errors.weddingDate ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.weddingDate && <p className="text-red-500 text-sm mt-1">{errors.weddingDate}</p>}
        </div>

        {/* Venue */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Venue *
          </label>
          <input
            type="text"
            value={formData.venue}
            onChange={(e) => handleChange('venue', e.target.value)}
            placeholder="e.g., Grand Palace, Wedding Hall"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
              errors.venue ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.venue && <p className="text-red-500 text-sm mt-1">{errors.venue}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* City */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              City *
            </label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => handleChange('city', e.target.value)}
              placeholder="e.g., Mumbai"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                errors.city ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
          </div>

          {/* State */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              State
            </label>
            <input
              type="text"
              value={formData.state}
              onChange={(e) => handleChange('state', e.target.value)}
              placeholder="e.g., Maharashtra"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>
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
          className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all"
        >
          Continue →
        </button>
      </div>
    </div>
  )
}
