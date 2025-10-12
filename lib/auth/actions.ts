// Server Actions for Authentication
'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

export interface AuthResponse {
  success: boolean
  error?: string
  message?: string
}

/**
 * Sign up a new user
 */
export async function signUp(formData: FormData): Promise<AuthResponse> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const fullName = formData.get('fullName') as string

  if (!email || !password) {
    return { success: false, error: 'Email and password are required' }
  }

  if (password.length < 6) {
    return { success: false, error: 'Password must be at least 6 characters' }
  }

  const supabase = await createClient()

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName || '',
      },
      emailRedirectTo: `${(await headers()).get('origin')}/auth/callback`,
    },
  })

  if (error) {
    return { success: false, error: error.message }
  }

  return { 
    success: true, 
    message: 'Account created successfully! Redirecting...' 
  }
}

/**
 * Sign in an existing user
 */
export async function signIn(formData: FormData): Promise<AuthResponse> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { success: false, error: 'Email and password are required' }
  }

  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { success: false, error: error.message }
  }

  return { success: true, message: 'Logged in successfully!' }
}

/**
 * Sign out the current user
 */
export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/auth/login')
}

/**
 * Get the current user
 */
export async function getCurrentUser() {
  const supabase = await createClient()
  
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    return null
  }

  return user
}

/**
 * Get user profile
 */
export async function getUserProfile() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return null
  }

  const { data: profile } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return profile
}

/**
 * Update user profile
 */
export async function updateProfile(formData: FormData): Promise<AuthResponse> {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return { success: false, error: 'Not authenticated' }
  }

  const fullName = formData.get('fullName') as string
  const phone = formData.get('phone') as string

  const { error } = await (supabase
    .from('user_profiles') as any)
    .update({
      full_name: fullName,
      phone,
      updated_at: new Date().toISOString(),
    })
    .eq('id', user.id)

  if (error) {
    return { success: false, error: error.message }
  }

  return { success: true, message: 'Profile updated successfully!' }
}

/**
 * Send password reset email
 */
export async function resetPassword(formData: FormData): Promise<AuthResponse> {
  const email = formData.get('email') as string

  if (!email) {
    return { success: false, error: 'Email is required' }
  }

  const supabase = await createClient()

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${(await headers()).get('origin')}/auth/reset-password`,
  })

  if (error) {
    return { success: false, error: error.message }
  }

  return { 
    success: true, 
    message: 'Password reset link sent to your email!' 
  }
}
