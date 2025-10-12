// Guest Management Type Definitions

export interface Guest {
  id: string
  invitation_id: string
  name: string
  phone?: string
  email?: string
  relationship?: 'Family' | 'Friend' | 'Colleague' | 'Other'
  side?: 'Groom' | 'Bride' | 'Both'
  plus_one: boolean
  rsvp_status: 'pending' | 'accepted' | 'declined'
  message?: string
  created_at: string
  updated_at: string
}

export interface GuestStats {
  total: number
  accepted: number
  declined: number
  pending: number
}
