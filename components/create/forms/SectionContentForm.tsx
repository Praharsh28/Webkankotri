'use client'

import { useState, useEffect } from 'react'
import type { SectionConfig } from '@/types/invitation'

interface SectionContentFormProps {
  section: SectionConfig
  sectionInfo: any
  onUpdate: (data: any) => void
}

export function SectionContentForm({ section, sectionInfo, onUpdate }: SectionContentFormProps) {
  const [formData, setFormData] = useState(section.data || {})

  // Update parent when form data changes
  useEffect(() => {
    onUpdate(formData)
  }, [formData])

  const handleChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }))
  }

  // Render different forms based on section type
  switch (section.id) {
    case 'header':
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Main Title
            </label>
            <input
              type="text"
              value={formData.title || ''}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="e.g., You're Invited!"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Subtitle (Optional)
            </label>
            <input
              type="text"
              value={formData.subtitle || ''}
              onChange={(e) => handleChange('subtitle', e.target.value)}
              placeholder="e.g., To the wedding celebration of..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
      )

    case 'blessing':
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Blessing Text
            </label>
            <textarea
              value={formData.text || ''}
              onChange={(e) => handleChange('text', e.target.value)}
              placeholder="Enter a blessing, quote, or religious verse..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Author/Source (Optional)
            </label>
            <input
              type="text"
              value={formData.author || ''}
              onChange={(e) => handleChange('author', e.target.value)}
              placeholder="e.g., Bhagavad Gita"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
      )

    case 'parents':
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Bride's Father
              </label>
              <input
                type="text"
                value={formData.brideFather || ''}
                onChange={(e) => handleChange('brideFather', e.target.value)}
                placeholder="Father's name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Bride's Mother
              </label>
              <input
                type="text"
                value={formData.brideMother || ''}
                onChange={(e) => handleChange('brideMother', e.target.value)}
                placeholder="Mother's name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Groom's Father
              </label>
              <input
                type="text"
                value={formData.groomFather || ''}
                onChange={(e) => handleChange('groomFather', e.target.value)}
                placeholder="Father's name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Groom's Mother
              </label>
              <input
                type="text"
                value={formData.groomMother || ''}
                onChange={(e) => handleChange('groomMother', e.target.value)}
                placeholder="Mother's name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
        </div>
      )

    case 'event':
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Event Name
            </label>
            <input
              type="text"
              value={formData.eventName || ''}
              onChange={(e) => handleChange('eventName', e.target.value)}
              placeholder="e.g., Wedding Ceremony, Reception"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Date
              </label>
              <input
                type="date"
                value={formData.date || ''}
                onChange={(e) => handleChange('date', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Time
              </label>
              <input
                type="time"
                value={formData.time || ''}
                onChange={(e) => handleChange('time', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Venue Address
            </label>
            <textarea
              value={formData.address || ''}
              onChange={(e) => handleChange('address', e.target.value)}
              placeholder="Full venue address"
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
      )

    case 'message':
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Personal Message to Guests
            </label>
            <textarea
              value={formData.message || ''}
              onChange={(e) => handleChange('message', e.target.value)}
              placeholder="Write a personal message to your guests..."
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
      )

    case 'customText':
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Section Title
            </label>
            <input
              type="text"
              value={formData.title || ''}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="e.g., Our Story"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Content
            </label>
            <textarea
              value={formData.content || ''}
              onChange={(e) => handleChange('content', e.target.value)}
              placeholder="Enter your custom content..."
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
      )

    case 'contact':
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Contact Person Name
              </label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone || ''}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email (Optional)
            </label>
            <input
              type="email"
              value={formData.email || ''}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="email@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
      )

    case 'groom':
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Groom's Name
            </label>
            <input
              type="text"
              value={formData.groomName || ''}
              onChange={(e) => handleChange('groomName', e.target.value)}
              placeholder="Full name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Short Bio (Optional)
            </label>
            <textarea
              value={formData.bio || ''}
              onChange={(e) => handleChange('bio', e.target.value)}
              placeholder="A few words about the groom..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
      )

    case 'bride':
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Bride's Name
            </label>
            <input
              type="text"
              value={formData.brideName || ''}
              onChange={(e) => handleChange('brideName', e.target.value)}
              placeholder="Full name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Short Bio (Optional)
            </label>
            <textarea
              value={formData.bio || ''}
              onChange={(e) => handleChange('bio', e.target.value)}
              placeholder="A few words about the bride..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
      )

    case 'rsvp':
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              RSVP Heading
            </label>
            <input
              type="text"
              value={formData.heading || 'Please RSVP'}
              onChange={(e) => handleChange('heading', e.target.value)}
              placeholder="e.g., Kindly Respond"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              RSVP Message
            </label>
            <textarea
              value={formData.message || ''}
              onChange={(e) => handleChange('message', e.target.value)}
              placeholder="e.g., Please confirm your attendance by..."
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              RSVP Deadline
            </label>
            <input
              type="date"
              value={formData.deadline || ''}
              onChange={(e) => handleChange('deadline', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
      )

    case 'timeline':
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Timeline Title
            </label>
            <input
              type="text"
              value={formData.title || 'Our Story'}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="e.g., Our Journey"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <p className="text-sm text-gray-600">
            💡 Add timeline events in the preview. Click "Add Event" to create milestones.
          </p>
        </div>
      )

    case 'gallery':
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Gallery Title
            </label>
            <input
              type="text"
              value={formData.title || 'Our Photos'}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="e.g., Gallery"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-800 text-sm">
              📸 <strong>Note:</strong> Photo upload feature coming soon! For now, this section will show placeholder images.
            </p>
          </div>
        </div>
      )

    case 'dress_code':
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Dress Code
            </label>
            <input
              type="text"
              value={formData.code || ''}
              onChange={(e) => handleChange('code', e.target.value)}
              placeholder="e.g., Traditional Indian Attire"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Additional Details
            </label>
            <textarea
              value={formData.details || ''}
              onChange={(e) => handleChange('details', e.target.value)}
              placeholder="Any specific instructions or suggestions..."
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
      )

    case 'accommodation':
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Hotel Name
            </label>
            <input
              type="text"
              value={formData.hotelName || ''}
              onChange={(e) => handleChange('hotelName', e.target.value)}
              placeholder="Hotel name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Address
            </label>
            <textarea
              value={formData.address || ''}
              onChange={(e) => handleChange('address', e.target.value)}
              placeholder="Full hotel address"
              rows={2}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Contact Number
            </label>
            <input
              type="tel"
              value={formData.phone || ''}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="+91 98765 43210"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Booking Instructions (Optional)
            </label>
            <textarea
              value={formData.instructions || ''}
              onChange={(e) => handleChange('instructions', e.target.value)}
              placeholder="How to book, discount codes, etc..."
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
      )

    case 'transportation':
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Transportation Details
            </label>
            <textarea
              value={formData.details || ''}
              onChange={(e) => handleChange('details', e.target.value)}
              placeholder="Directions, parking info, shuttle details..."
              rows={5}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
      )

    case 'registry':
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Registry Message
            </label>
            <textarea
              value={formData.message || ''}
              onChange={(e) => handleChange('message', e.target.value)}
              placeholder="Your presence is the best gift, but if you wish to honor us..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Registry Link (Optional)
            </label>
            <input
              type="url"
              value={formData.link || ''}
              onChange={(e) => handleChange('link', e.target.value)}
              placeholder="https://registry.example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
      )

    case 'honeymoon_fund':
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Honeymoon Fund Message
            </label>
            <textarea
              value={formData.message || ''}
              onChange={(e) => handleChange('message', e.target.value)}
              placeholder="Help us make our dream honeymoon come true..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Payment Link/UPI (Optional)
            </label>
            <input
              type="text"
              value={formData.paymentInfo || ''}
              onChange={(e) => handleChange('paymentInfo', e.target.value)}
              placeholder="UPI ID or payment link"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
      )

    case 'schedule':
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Schedule Title
            </label>
            <input
              type="text"
              value={formData.title || 'Event Schedule'}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="e.g., Wedding Day Schedule"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <p className="text-sm text-gray-600">
            📅 Add schedule items in the preview. Click "Add Event" to create schedule entries.
          </p>
        </div>
      )

    case 'footer':
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Closing Message
            </label>
            <textarea
              value={formData.message || ''}
              onChange={(e) => handleChange('message', e.target.value)}
              placeholder="Thank you message or closing words..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Hashtag (Optional)
            </label>
            <input
              type="text"
              value={formData.hashtag || ''}
              onChange={(e) => handleChange('hashtag', e.target.value)}
              placeholder="e.g., #RajPriyaWedding"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
      )

    // Default form for other sections
    default:
      return (
        <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-800 text-sm">
            ✨ <strong>Coming Soon:</strong> Content editor for {sectionInfo?.name} will be added soon.
            For now, this section will appear with default content.
          </p>
          <p className="text-yellow-700 text-sm mt-2">
            You can skip this section and continue to preview.
          </p>
        </div>
      )
  }
}
