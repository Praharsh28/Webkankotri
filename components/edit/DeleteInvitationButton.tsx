'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

interface DeleteInvitationButtonProps {
  invitationId: string
  invitationTitle: string
}

export function DeleteInvitationButton({ invitationId, invitationTitle }: DeleteInvitationButtonProps) {
  const router = useRouter()
  const supabase = createClient()
  
  const [isConfirming, setIsConfirming] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [confirmText, setConfirmText] = useState('')

  const handleDelete = async () => {
    if (confirmText !== 'DELETE') return

    setIsDeleting(true)

    try {
      const { error } = await supabase
        .from('invitations')
        .delete()
        .eq('id', invitationId)

      if (error) throw error

      // Redirect to dashboard
      router.push('/dashboard')
    } catch (err: any) {
      alert('Failed to delete invitation: ' + err.message)
      setIsDeleting(false)
    }
  }

  if (!isConfirming) {
    return (
      <button
        onClick={() => setIsConfirming(true)}
        className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
      >
        🗑️ Delete Invitation
      </button>
    )
  }

  return (
    <div className="border-2 border-red-300 rounded-lg p-6 bg-red-50">
      <h4 className="text-lg font-bold text-red-900 mb-4">
        ⚠️ Confirm Deletion
      </h4>
      <p className="text-red-800 mb-4">
        You are about to delete: <strong>{invitationTitle}</strong>
      </p>
      <p className="text-red-700 mb-4 text-sm">
        This action cannot be undone. All data will be permanently deleted.
      </p>
      
      <div className="mb-4">
        <label className="block text-sm font-semibold text-red-900 mb-2">
          Type <code className="bg-red-200 px-2 py-1 rounded">DELETE</code> to confirm:
        </label>
        <input
          type="text"
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
          placeholder="Type DELETE"
          className="w-full px-4 py-2 border-2 border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
        />
      </div>

      <div className="flex space-x-3">
        <button
          onClick={handleDelete}
          disabled={confirmText !== 'DELETE' || isDeleting}
          className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isDeleting ? '🗑️ Deleting...' : '🗑️ Yes, Delete Forever'}
        </button>

        <button
          onClick={() => {
            setIsConfirming(false)
            setConfirmText('')
          }}
          disabled={isDeleting}
          className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
