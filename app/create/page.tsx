'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { StepIndicator } from '@/components/create/StepIndicator'
import { TemplateStep } from '@/components/create/steps/TemplateStep'
import { SectionContentStep } from '@/components/create/steps/SectionContentStep'
import { LivePreviewStep } from '@/components/create/steps/LivePreviewStep'
import { PublishStep } from '@/components/create/steps/PublishStep'
import type { CreateInvitationState } from '@/types/invitation'

const STEPS = [
  { id: 1, name: 'Template', description: 'Choose your theme' },
  { id: 2, name: 'Edit', description: 'Create your invitation' },
  { id: 3, name: 'Preview', description: 'See your invitation' },
  { id: 4, name: 'Publish', description: 'Go live!' },
]

function CreateInvitationPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()

  const editId = searchParams.get('edit') // Check if editing existing invitation
  const isEditMode = !!editId

  const [state, setState] = useState<CreateInvitationState>({
    currentStep: isEditMode ? 2 : 1, // Skip template selection when editing
    data: {
      templateId: searchParams.get('template') || '',
      sections: [],
    },
    isLoading: false,
    error: null,
  })

  const [template, setTemplate] = useState<any>(null)
  const [existingInvitation, setExistingInvitation] = useState<any>(null)

  // Load existing invitation data if editing
  useEffect(() => {
    async function loadExistingInvitation() {
      if (!editId) return

      setState(prev => ({ ...prev, isLoading: true }))

      const { data, error } = await supabase
        .from('invitations')
        .select('*, templates(*)')
        .eq('id', editId)
        .single()

      if (error || !data) {
        setState(prev => ({ 
          ...prev, 
          error: 'Could not load invitation. Please try again.',
          isLoading: false 
        }))
        return
      }

      // Pre-fill wizard with existing data
      setExistingInvitation(data as any)
      setTemplate((data as any).templates)
      setState(prev => ({
        ...prev,
        data: {
          templateId: (data as any).templates.template_id,
          sections: (data as any).data?.sections || [],
          basicDetails: (data as any).data?.basicDetails,
        },
        isLoading: false
      }))
    }

    loadExistingInvitation()
  }, [editId])

  // Load template data
  useEffect(() => {
    async function loadTemplate() {
      if (!state.data.templateId || isEditMode) return // Skip if editing (already loaded)

      const { data, error } = await supabase
        .from('templates')
        .select('*')
        .eq('template_id', state.data.templateId)
        .single()

      if (data) {
        setTemplate(data)
      }
    }

    loadTemplate()
  }, [state.data.templateId])

  // Check authentication
  useEffect(() => {
    async function checkAuth() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/auth/login')
      }
    }
    checkAuth()
  }, [])

  const nextStep = () => {
    if (state.currentStep < STEPS.length) {
      setState(prev => ({ ...prev, currentStep: prev.currentStep + 1 }))
    }
  }

  const prevStep = () => {
    if (state.currentStep > 1) {
      setState(prev => ({ ...prev, currentStep: prev.currentStep - 1 }))
    }
  }

  const updateData = (newData: Partial<CreateInvitationState['data']>) => {
    setState(prev => ({
      ...prev,
      data: { ...prev.data, ...newData }
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🪔</span>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  {isEditMode ? '✏️ Edit Your Invitation' : 'Create Your Invitation'}
                </h1>
                <p className="text-sm text-gray-600">Step {state.currentStep} of {STEPS.length}</p>
              </div>
            </div>
            
            <button 
              onClick={() => router.push('/dashboard')}
              className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium text-sm transition-colors"
            >
              ← Cancel
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Step Indicator */}
        <StepIndicator 
          steps={STEPS} 
          currentStep={state.currentStep} 
        />

        {/* Error Display */}
        {state.error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">❌ {state.error}</p>
          </div>
        )}

        {/* Step Content */}
        <div className="mt-8">
          {state.currentStep === 1 && (
            <TemplateStep
              templateId={state.data.templateId || ''}
              template={template}
              onNext={nextStep}
              onTemplateChange={(templateId) => updateData({ templateId })}
            />
          )}

          {state.currentStep === 2 && (
            <SectionContentStep
              sections={state.data.sections || []}
              basicDetails={state.data.basicDetails}
              template={template}
              onNext={nextStep}
              onBack={prevStep}
              onUpdate={(sections) => updateData({ sections })}
              onUpdateBasicDetails={(basicDetails) => updateData({ basicDetails })}
            />
          )}

          {state.currentStep === 3 && (
            <LivePreviewStep
              basicDetails={state.data.basicDetails}
              sections={state.data.sections || []}
              template={template}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}

          {state.currentStep === 4 && (
            <PublishStep
              basicDetails={state.data.basicDetails}
              sections={state.data.sections || []}
              template={template}
              onBack={prevStep}
              isEditMode={isEditMode}
              existingInvitation={existingInvitation}
            />
          )}
        </div>
      </main>
    </div>
  )
}

export default function CreateInvitationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">🪔</div>
          <p className="text-xl text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <CreateInvitationPageContent />
    </Suspense>
  )
}
