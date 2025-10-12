'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { EditBasicDetails } from './EditBasicDetails'
import { EditSections } from './EditSections'
import { DeleteInvitationButton } from './DeleteInvitationButton'
import type { InvitationBasicDetails, SectionConfig } from '@/types/invitation'

interface EditInvitationClientProps {
  invitation: any
}

export function EditInvitationClient({ invitation }: EditInvitationClientProps) {
  const router = useRouter()
  const supabase = createClient()
  
  const [activeTab, setActiveTab] = useState<'details' | 'sections'>('details')
  const [isSaving, setIsSaving] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const [basicDetails, setBasicDetails] = useState<InvitationBasicDetails>(
    invitation.data?.basicDetails || {
      title: invitation.title || '',
      brideName: '',
      groomName: '',
      weddingDate: invitation.wedding_date || '',
      venue: '',
      city: '',
      state: '',
    }
  )

  const [sections, setSections] = useState<SectionConfig[]>(
    invitation.data?.sections || []
  )

  const handleSave = async () => {
    setIsSaving(true)
    setError(null)
    setSuccessMessage(null)

    try {
      const { error: updateError } = await (supabase
        .from('invitations') as any)
        .update({
          title: basicDetails.title,
          wedding_date: basicDetails.weddingDate,
          data: {
            basicDetails,
            sections,
          },
          updated_at: new Date().toISOString(),
        })
        .eq('id', invitation.id)

      if (updateError) throw updateError

      setSuccessMessage('✅ Invitation saved successfully!')
      setTimeout(() => setSuccessMessage(null), 3000)
    } catch (err: any) {
      setError(err.message || 'Failed to save invitation')
    } finally {
      setIsSaving(false)
    }
  }

  const handlePublish = async () => {
    setIsPublishing(true)
    setError(null)

    try {
      const newStatus = invitation.status === 'published' ? 'draft' : 'published'
      
      const { error: updateError } = await (supabase
        .from('invitations') as any)
        .update({
          status: newStatus,
          published_at: newStatus === 'published' ? new Date().toISOString() : null,
        })
        .eq('id', invitation.id)

      if (updateError) throw updateError

      setSuccessMessage(
        newStatus === 'published' 
          ? '🎉 Invitation published!' 
          : '📝 Invitation unpublished'
      )
      
      // Refresh the page to update status
      setTimeout(() => router.refresh(), 1000)
    } catch (err: any) {
      setError(err.message || 'Failed to update status')
    } finally {
      setIsPublishing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">✏️</span>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Edit Invitation</h1>
                <p className="text-sm text-gray-600">{invitation.title}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* Status Badge */}
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                invitation.status === 'published'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-yellow-100 text-yellow-700'
              }`}>
                {invitation.status === 'published' ? '✅ Published' : '📝 Draft'}
              </span>

              {/* Publish/Unpublish Button */}
              <button
                onClick={handlePublish}
                disabled={isPublishing}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  invitation.status === 'published'
                    ? 'bg-yellow-600 text-white hover:bg-yellow-700'
                    : 'bg-green-600 text-white hover:bg-green-700'
                } disabled:opacity-50`}
              >
                {isPublishing ? '⏳' : invitation.status === 'published' ? '📝 Unpublish' : '🚀 Publish'}
              </button>

              {/* Save Button */}
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium text-sm disabled:opacity-50"
              >
                {isSaving ? '💾 Saving...' : '💾 Save'}
              </button>

              {/* Back to Dashboard */}
              <button
                onClick={() => router.push('/dashboard')}
                className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium text-sm"
              >
                ← Dashboard
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        {successMessage && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-700 text-sm font-medium">{successMessage}</p>
          </div>
        )}
        
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">Template</h3>
            <p className="text-lg font-bold text-gray-900">{invitation.templates?.name || 'Unknown'}</p>
            <p className="text-sm text-gray-500">{invitation.templates?.category}</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">Sections</h3>
            <p className="text-lg font-bold text-gray-900">{sections.length} Active</p>
            <p className="text-sm text-gray-500">Click Sections tab to manage</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">Views</h3>
            <p className="text-lg font-bold text-gray-900">{invitation.view_count || 0}</p>
            <p className="text-sm text-gray-500">Total page views</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-t-2xl shadow-lg">
          <div className="border-b border-gray-200">
            <div className="flex space-x-8 px-8">
              <button
                onClick={() => setActiveTab('details')}
                className={`py-4 font-semibold text-sm border-b-2 transition-colors ${
                  activeTab === 'details'
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
              >
                📝 Basic Details
              </button>

              <button
                onClick={() => setActiveTab('sections')}
                className={`py-4 font-semibold text-sm border-b-2 transition-colors ${
                  activeTab === 'sections'
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
              >
                🎨 Sections & Content
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === 'details' && (
              <EditBasicDetails
                data={basicDetails}
                onChange={setBasicDetails}
              />
            )}

            {activeTab === 'sections' && (
              <EditSections
                sections={sections}
                onChange={setSections}
              />
            )}
          </div>
        </div>

        {/* Danger Zone */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-8 border-2 border-red-200">
          <h3 className="text-xl font-bold text-red-600 mb-4">⚠️ Danger Zone</h3>
          <p className="text-gray-600 mb-6">
            Once you delete an invitation, there is no going back. Please be certain.
          </p>
          <DeleteInvitationButton invitationId={invitation.id} invitationTitle={invitation.title} />
        </div>
      </main>
    </div>
  )
}
