'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function deleteInvitation(invitationId: string) {
  const supabase = await createClient()
  
  // Get current user
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  
  if (authError || !user) {
    return { error: 'Not authenticated' }
  }

  // Verify user owns this invitation
  const { data: invitation, error: fetchError } = await supabase
    .from('invitations')
    .select('user_id')
    .eq('id', invitationId)
    .single()

  if (fetchError || !invitation) {
    return { error: 'Invitation not found' }
  }

  if ((invitation as any).user_id !== user.id) {
    return { error: 'Unauthorized' }
  }

  // Soft delete: update status to 'deleted'
  const { error: deleteError } = await (supabase
    .from('invitations') as any)
    .update({ status: 'deleted' })
    .eq('id', invitationId)

  if (deleteError) {
    return { error: 'Failed to delete invitation' }
  }

  // Revalidate dashboard page
  revalidatePath('/dashboard')

  return { success: true }
}
