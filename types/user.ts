// User Type Definitions

export interface UserProfile {
  id: string
  email: string
  full_name?: string
  phone?: string
  language: 'en' | 'gu'
  created_at: string
  updated_at: string
}

export interface AuthUser {
  id: string
  email: string
  user_metadata: {
    full_name?: string
  }
}
