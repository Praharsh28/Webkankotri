import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { RoyalTemplate } from '@/components/templates-v2/themes/RoyalTemplate'
import type { InvitationData } from '@/types/v2/template'

export default async function PublicInvitationPage({ params }: { params: Promise<{ slug: string }> }) {
  const supabase = await createClient()
  const { slug } = await params
  
  // Fetch invitation by slug
  const { data: invitation, error } = await supabase
    .from('invitations')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (error || !invitation) {
    notFound()
  }

  // Increment view count
  await (supabase.rpc as any)('increment_view_count', { invitation_id: (invitation as any).id })

  // Transform database data to InvitationData format
  const invitationData: InvitationData = (invitation as any).data as InvitationData

  return <RoyalTemplate data={invitationData} />
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const supabase = await createClient()
  const { slug } = await params
  
  const { data: invitation } = await supabase
    .from('invitations')
    .select('title, data')
    .eq('slug', slug)
    .single()

  if (!invitation) {
    return {
      title: 'Invitation Not Found',
    }
  }

  const basicDetails = (invitation as any).data?.basicDetails || {}

  return {
    title: `${(invitation as any).title} - Wedding Invitation`,
    description: `You're invited to the wedding of ${basicDetails.brideName || ''} and ${basicDetails.groomName || ''}`,
    openGraph: {
      title: (invitation as any).title,
      description: `Join us on ${basicDetails.weddingDate || 'our special day'}`,
      type: 'website',
    },
  }
}
