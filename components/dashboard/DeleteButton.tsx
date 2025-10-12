'use client'

import { useState } from 'react'
import { deleteInvitation } from '@/lib/invitations/actions'

interface DeleteButtonProps {
  invitationId: string
  invitationTitle: string
}

export function DeleteButton({ invitationId, invitationTitle }: DeleteButtonProps) {
  const [showConfirm, setShowConfirm] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    
    const result = await deleteInvitation(invitationId)
    
    if (result.error) {
      alert('Error: ' + result.error)
      setIsDeleting(false)
    } else {
      // Success - page will revalidate automatically
      setShowConfirm(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
        disabled={isDeleting}
      >
        🗑️ Delete
      </button>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">⚠️</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Delete Invitation?
              </h3>
              <p className="text-gray-600">
                Are you sure you want to delete "<strong>{invitationTitle}</strong>"?
              </p>
              <p className="text-sm text-red-600 mt-2">
                This action cannot be undone.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 px-4 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                disabled={isDeleting}
              >
                {isDeleting ? '🔄 Deleting...' : '🗑️ Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
