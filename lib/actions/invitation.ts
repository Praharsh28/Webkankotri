'use server'

import { createClient } from '@/lib/supabase/server'

export async function incrementViewCount(invitationId: string) {
  const supabase = await createClient()
  
  // Increment view count
  await (supabase as any).rpc('increment_view_count', { invitation_id: invitationId })
}
