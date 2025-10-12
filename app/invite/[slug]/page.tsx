import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { InvitationViewer } from '@/components/invite/InvitationViewer'
import { incrementViewCount } from '@/lib/actions/invitation'

export default async function PublicInvitationPage({ params }: { params: Promise<{ slug: string }> }) {
  const supabase = await createClient()
  const { slug } = await params
  
  // Fetch invitation by slug
  const { data: invitation, error } = await supabase
    .from('invitations')
    .select('*, templates(*), user_profiles(full_name)')
    .eq('slug', slug)
    .eq('status', 'published') // Only show published invitations
    .single()

  if (error || !invitation) {
    notFound()
  }

  // Increment view count (don't await, let it run async)
  incrementViewCount((invitation as any).id)

  return (
    <InvitationViewer 
      invitation={invitation as any}
      template={(invitation as any).templates}
    />
  )
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
