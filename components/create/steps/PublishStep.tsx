'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { getTheme } from '@/lib/themes'
import type { InvitationBasicDetails, SectionConfig } from '@/types/invitation'

interface PublishStepProps {
  basicDetails?: InvitationBasicDetails
  sections: SectionConfig[]
  template: any
  onBack: () => void
  isEditMode?: boolean
  existingInvitation?: any
}

export function PublishStep({ basicDetails, sections, template, onBack, isEditMode = false, existingInvitation }: PublishStepProps) {
  const router = useRouter()
  const supabase = createClient()
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Get theme for preview
  const theme = getTheme((template?.template_id || 'traditional') as any)

  // Get header data for preview
  const headerSection = sections.find(s => s.id === 'header')
  const headerData = headerSection?.data || {}
  
  // Get event data for preview
  const eventSection = sections.find(s => s.id === 'event')
  const eventData = eventSection?.data || {}

  const handleSave = async (shouldPublish: boolean) => {
    setIsProcessing(true)
    setError(null)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      if (isEditMode && existingInvitation) {
        // UPDATE existing invitation
        const { error: updateError } = await (supabase
          .from('invitations') as any)
          .update({
            title: basicDetails?.title || existingInvitation.title,
            data: {
              basicDetails,
              sections,
            },
            status: shouldPublish ? 'published' : existingInvitation.status,
            wedding_date: basicDetails?.weddingDate || existingInvitation.wedding_date,
            published_at: shouldPublish && !existingInvitation.published_at 
              ? new Date().toISOString() 
              : existingInvitation.published_at,
          })
          .eq('id', existingInvitation.id)

        if (updateError) throw updateError

        // Redirect based on action
        if (shouldPublish || existingInvitation.status === 'published') {
          router.push(`/invite/${existingInvitation.slug}`)
        } else {
          router.push('/dashboard')
        }
      } else {
        // INSERT new invitation
        const slug = basicDetails?.title
          ?.toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '') || 'invitation'

        const uniqueSlug = `${slug}-${Date.now()}`

        const { data: invitation, error: saveError } = await (supabase
          .from('invitations') as any)
          .insert({
            user_id: user.id,
            template_id: template.id,
            title: basicDetails?.title || 'My Wedding',
            slug: uniqueSlug,
            data: {
              basicDetails,
              sections,
            },
            customizations: {},
            status: shouldPublish ? 'published' : 'draft',
            wedding_date: basicDetails?.weddingDate || null,
            published_at: shouldPublish ? new Date().toISOString() : null,
          })
          .select()
          .single()

        if (saveError) throw saveError

        if (shouldPublish) {
          router.push(`/invite/${uniqueSlug}`)
        } else {
          router.push('/dashboard')
        }
      }
    } catch (err: any) {
      setError(err.message || 'Failed to save invitation')
      setIsProcessing(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="text-6xl mb-4">{isEditMode ? '✏️' : '🎉'}</div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          {isEditMode ? 'Update Your Invitation' : 'Your Invitation is Ready!'}
        </h2>
        <p className="text-gray-600 text-lg">
          {isEditMode ? 'Save your changes' : 'Choose how you want to proceed'}
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600 text-sm">❌ {error}</p>
        </div>
      )}

      {/* Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Option 1: Publish Now */}
        <button
          onClick={() => handleSave(true)}
          disabled={isProcessing}
          className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all border-2 border-transparent hover:border-green-500 disabled:opacity-50 disabled:cursor-not-allowed text-left group"
        >
          <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🚀</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">
            {isEditMode ? 'Update & Publish' : 'Publish Now'}
          </h3>
          <p className="text-gray-600 mb-4">
            {isEditMode ? 'Save your changes and keep invitation live' : 'Make your invitation live immediately and get a shareable link'}
          </p>
          <ul className="space-y-2 text-sm text-gray-600 mb-6">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Get instant shareable link</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Share on WhatsApp, Facebook, etc.</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Start collecting RSVPs</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Can edit anytime later</span>
            </li>
          </ul>
          <div className="text-center">
            <span className="inline-block px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg group-hover:scale-105 transition-transform">
              {isProcessing ? (isEditMode ? '💾 Updating...' : '🚀 Publishing...') : (isEditMode ? '💾 Update' : '🚀 Publish & Share')}
            </span>
          </div>
        </button>

        {/* Option 2: Save as Draft */}
        <button
          onClick={() => handleSave(false)}
          disabled={isProcessing}
          className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all border-2 border-transparent hover:border-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-left group"
        >
          <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">💾</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">
            Save as Draft
          </h3>
          <p className="text-gray-600 mb-4">
            Save your invitation and publish later when you're ready
          </p>
          <ul className="space-y-2 text-sm text-gray-600 mb-6">
            <li className="flex items-start">
              <span className="text-purple-500 mr-2">✓</span>
              <span>Save all your progress</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-500 mr-2">✓</span>
              <span>Edit anytime from dashboard</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-500 mr-2">✓</span>
              <span>Not visible to guests yet</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-500 mr-2">✓</span>
              <span>Publish with one click later</span>
            </li>
          </ul>
          <div className="text-center">
            <span className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg group-hover:scale-105 transition-transform">
              {isProcessing ? '💾 Saving...' : '💾 Save for Later'}
            </span>
          </div>
        </button>
      </div>

      {/* Preview Card with Template Background */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="font-bold text-gray-800 mb-4">📋 Invitation Preview</h3>
        
        {/* Card Preview */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div 
            className="bg-white rounded-lg shadow-lg overflow-hidden max-w-md mx-auto"
            style={{
              border: '2px solid #e5e7eb',
            }}
          >
            <div 
              className="p-8 text-center"
              style={{
                background: theme.colors.background.primary,
              }}
            >
              <h2 
                className="text-2xl md:text-3xl font-bold mb-3"
                style={{
                  color: theme.colors.primary,
                  fontFamily: theme.fonts.heading.english,
                }}
              >
                {headerData.groomName || headerData.brideName
                  ? `${headerData.groomTitle || ''} ${headerData.groomName || 'Groom'} & ${headerData.brideTitle || ''} ${headerData.brideName || 'Bride'}`.trim()
                  : basicDetails?.title || 'Your Wedding'}
              </h2>
              
              {eventData.date && (
                <p 
                  className="text-base mb-2"
                  style={{ color: theme.colors.text.primary }}
                >
                  {new Date(eventData.date).toLocaleDateString('en-IN', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              )}
              
              {eventData.venue && (
                <p 
                  className="text-sm"
                  style={{ color: theme.colors.text.primary }}
                >
                  📍 {eventData.venue}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Summary Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mt-6">
          <div>
            <p className="text-gray-600">Template</p>
            <p className="font-semibold text-gray-800">{template?.name}</p>
          </div>
          <div>
            <p className="text-gray-600">Active Sections</p>
            <p className="font-semibold text-gray-800">{sections.filter(s => s.enabled).length} sections</p>
          </div>
          <div>
            <p className="text-gray-600">Theme</p>
            <p className="font-semibold text-gray-800">{theme.name}</p>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="text-center">
        <button
          onClick={onBack}
          disabled={isProcessing}
          className="text-gray-600 hover:text-gray-800 underline text-sm disabled:opacity-50"
        >
          ← Go back to preview
        </button>
      </div>
    </div>
  )
}
