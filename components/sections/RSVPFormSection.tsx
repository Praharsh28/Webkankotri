'use client'

import { useState } from 'react'
import { FadeIn, Pulse } from '@/components/animations'
import type { KankotriTheme } from '@/types/theme'
import { useThemeStyles } from '@/lib/hooks/useThemeStyles'

export interface RSVPFormSectionData {
  title?: string
  deadline?: string
  allowPlusOne?: boolean
  mealPreferences?: boolean
  customFields?: Array<{
    label: string
    type: 'text' | 'email' | 'phone' | 'select'
    required: boolean
    options?: string[]
  }>
}

interface RSVPFormSectionProps {
  data: RSVPFormSectionData
  theme: KankotriTheme
  animated?: boolean
  onSubmit?: (formData: any) => void
}

export function RSVPFormSection({ data, theme, animated = true, onSubmit }: RSVPFormSectionProps) {
  const { text, font } = useThemeStyles(theme)
  const sectionStyle = theme.sectionStyles?.['rsvp'] || {}
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    attending: 'yes',
    guests: '1',
    mealPreference: 'veg',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit?.(formState)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value })
  }

  const content = (
    <div 
      className="py-8 md:py-12 px-4"
      style={{
        backgroundColor: sectionStyle.backgroundColor,
        borderColor: sectionStyle.borderColor,
        borderWidth: sectionStyle.borderColor ? '1px' : 0,
        borderStyle: 'solid',
      }}
    >
      {/* Title */}
      <h2 
        className="text-3xl md:text-4xl font-bold mb-4 text-center"
        style={{ ...font.headingEn, ...text.heading }}
      >
        {data.title || '✉️ RSVP'}
      </h2>

      {data.deadline && (
        <p 
          className="text-center mb-6"
          style={text.secondary}
        >
          Please respond by {data.deadline}
        </p>
      )}

      {/* Form */}
      <div className="max-w-2xl mx-auto">
        {submitted ? (
          <Pulse>
            <div 
              className="p-8 rounded-xl text-center"
              style={{
                backgroundColor: theme.colors.background.card,
                borderColor: theme.colors.accent,
                borderWidth: '2px',
                borderStyle: 'solid',
              }}
            >
              <div className="text-6xl mb-4">✅</div>
              <h3 
                className="text-2xl font-bold mb-2"
                style={text.heading}
              >
                Thank You!
              </h3>
              <p style={text.secondary}>
                Your RSVP has been received.
              </p>
            </div>
          </Pulse>
        ) : (
          <form 
            onSubmit={handleSubmit}
            className="space-y-4 p-6 md:p-8 rounded-xl"
            style={{
              backgroundColor: theme.colors.background.card,
              borderColor: theme.colors.border.light,
              borderWidth: '1px',
              borderStyle: 'solid',
            }}
          >
            {/* Name */}
            <div>
              <label 
                className="block mb-2 font-medium"
                style={text.primary}
              >
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                required
                value={formState.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: theme.colors.background.primary,
                  borderColor: theme.colors.border.light,
                  color: theme.colors.text.primary,
                }}
                placeholder="Enter your name"
              />
            </div>

            {/* Email */}
            <div>
              <label 
                className="block mb-2 font-medium"
                style={text.primary}
              >
                Email *
              </label>
              <input
                type="email"
                name="email"
                required
                value={formState.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: theme.colors.background.primary,
                  borderColor: theme.colors.border.light,
                  color: theme.colors.text.primary,
                }}
                placeholder="your@email.com"
              />
            </div>

            {/* Phone */}
            <div>
              <label 
                className="block mb-2 font-medium"
                style={text.primary}
              >
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formState.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: theme.colors.background.primary,
                  borderColor: theme.colors.border.light,
                  color: theme.colors.text.primary,
                }}
                placeholder="+91 98765 43210"
              />
            </div>

            {/* Attending */}
            <div>
              <label 
                className="block mb-2 font-medium"
                style={text.primary}
              >
                Will you attend? *
              </label>
              <select
                name="attending"
                required
                value={formState.attending}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: theme.colors.background.primary,
                  borderColor: theme.colors.border.light,
                  color: theme.colors.text.primary,
                }}
              >
                <option value="yes">✅ Yes, I'll be there!</option>
                <option value="no">❌ Sorry, can't make it</option>
                <option value="maybe">🤔 Maybe</option>
              </select>
            </div>

            {/* Number of Guests */}
            {data.allowPlusOne && formState.attending === 'yes' && (
              <div>
                <label 
                  className="block mb-2 font-medium"
                  style={text.primary}
                >
                  Number of Guests
                </label>
                <select
                  name="guests"
                  value={formState.guests}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: theme.colors.background.primary,
                    borderColor: theme.colors.border.light,
                    color: theme.colors.text.primary,
                  }}
                >
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4 Guests</option>
                </select>
              </div>
            )}

            {/* Meal Preference */}
            {data.mealPreferences && formState.attending === 'yes' && (
              <div>
                <label 
                  className="block mb-2 font-medium"
                  style={text.primary}
                >
                  Meal Preference
                </label>
                <select
                  name="mealPreference"
                  value={formState.mealPreference}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: theme.colors.background.primary,
                    borderColor: theme.colors.border.light,
                    color: theme.colors.text.primary,
                  }}
                >
                  <option value="veg">🥗 Vegetarian</option>
                  <option value="non-veg">🍗 Non-Vegetarian</option>
                  <option value="vegan">🌱 Vegan</option>
                  <option value="jain">🙏 Jain</option>
                </select>
              </div>
            )}

            {/* Message */}
            <div>
              <label 
                className="block mb-2 font-medium"
                style={text.primary}
              >
                Message (Optional)
              </label>
              <textarea
                name="message"
                value={formState.message}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: theme.colors.background.primary,
                  borderColor: theme.colors.border.light,
                  color: theme.colors.text.primary,
                }}
                placeholder="Any special requests or wishes..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 rounded-lg font-bold text-lg shadow-lg hover:scale-105 transition-transform"
              style={{
                backgroundColor: theme.colors.accent,
                color: '#FFFFFF',
              }}
            >
              Submit RSVP ✨
            </button>
          </form>
        )}
      </div>
    </div>
  )

  if (!animated) return content

  return (
    <FadeIn delay={0.3} direction="up">
      {content}
    </FadeIn>
  )
}
