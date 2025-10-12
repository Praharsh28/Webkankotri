'use client'

interface PreviewStepProps {
  data: any
  template: any
  isLoading: boolean
  onBack: () => void
  onSave: () => void
}

export function PreviewStep({ data, template, isLoading, onBack, onSave }: PreviewStepProps) {
  const basicDetails = data.basicDetails || {}
  const sections = data.sections || []

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          ✅ Review Your Invitation
        </h2>
        <p className="text-gray-600 mb-8">
          Check everything looks good before saving
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Basic Details */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">Wedding Details</h3>
            <dl className="space-y-3">
              <div>
                <dt className="text-sm font-semibold text-gray-600">Title</dt>
                <dd className="text-base text-gray-900">{basicDetails.title || '-'}</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-gray-600">Couple</dt>
                <dd className="text-base text-gray-900">
                  {basicDetails.brideName} & {basicDetails.groomName}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-gray-600">Date</dt>
                <dd className="text-base text-gray-900">
                  {basicDetails.weddingDate ? new Date(basicDetails.weddingDate).toLocaleDateString('en-IN', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }) : '-'}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-gray-600">Venue</dt>
                <dd className="text-base text-gray-900">{basicDetails.venue || '-'}</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-gray-600">Location</dt>
                <dd className="text-base text-gray-900">
                  {basicDetails.city}{basicDetails.state ? `, ${basicDetails.state}` : ''}
                </dd>
              </div>
            </dl>
          </div>

          {/* Template & Sections */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">Template & Sections</h3>
            <div className="space-y-4">
              {/* Template */}
              <div className="p-4 bg-purple-50 rounded-lg">
                <p className="text-sm font-semibold text-gray-600 mb-1">Template</p>
                <p className="text-base font-bold text-gray-900">{template?.name || '-'}</p>
                <p className="text-sm text-gray-600">{template?.category}</p>
              </div>

              {/* Sections */}
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-2">
                  Sections ({sections.length})
                </p>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {sections.map((section: any, index: number) => {
                    const sectionInfo = ({
                      header: 'Header',
                      blessing: 'Blessing',
                      parents: 'Parents',
                      event: 'Event Details',
                      message: 'Message',
                      customText: 'Custom Text',
                      familyList: 'Family List',
                      gallery: 'Gallery',
                      photoGallery: 'Photo Gallery',
                      video: 'Video',
                      timeline: 'Timeline',
                      map: 'Map',
                      hotels: 'Hotels',
                      dressCode: 'Dress Code',
                      rsvp: 'RSVP Button',
                      rsvpForm: 'RSVP Form',
                      giftRegistry: 'Gift Registry',
                      socialMedia: 'Social Media',
                      contact: 'Contact',
                    } as any)[section.id] || section.id

                    return (
                      <div key={index} className="flex items-center space-x-2 text-sm">
                        <span className="text-green-500">✓</span>
                        <span className="text-gray-700">{sectionInfo}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
        <div className="text-4xl mb-3">👀</div>
        <h3 className="text-lg font-bold text-blue-900 mb-2">
          Live Preview Coming Soon!
        </h3>
        <p className="text-blue-800 text-sm">
          You'll be able to edit content and see a live preview in the next update.
          For now, your invitation will be saved as a draft and you can view it after saving.
        </p>
      </div>

      {/* Important Note */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-sm text-yellow-800">
          <strong>📝 Note:</strong> Your invitation will be saved as a <strong>draft</strong>. 
          You can edit it later from your dashboard and publish when ready.
        </p>
      </div>

      {/* Navigation Buttons */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex justify-between">
          <button
            onClick={onBack}
            disabled={isLoading}
            className="px-8 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50"
          >
            ← Back
          </button>

          <button
            onClick={onSave}
            disabled={isLoading}
            className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Saving...</span>
              </>
            ) : (
              <>
                <span>💾</span>
                <span>Save Invitation</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
