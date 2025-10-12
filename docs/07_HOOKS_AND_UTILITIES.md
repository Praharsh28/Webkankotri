# 🪝 HOOKS & UTILITIES

**Complete custom hooks and utility functions**

---

## 🎣 CUSTOM HOOKS

### 1. useDebounce Hook

**File:** `hooks/useDebounce.ts`

**Purpose:** Debounce rapidly changing values (critical for real-time preview)

```typescript
import { useEffect, useState } from 'react'

export function useDebounce<T>(value: T, delay: number = 800): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    // Set up timeout
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // Clean up on value change or unmount
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}
```

**Usage:**
```typescript
const [input, setInput] = useState('')
const debouncedInput = useDebounce(input, 800)

useEffect(() => {
  // This only runs 800ms after user stops typing
  updatePreview(debouncedInput)
}, [debouncedInput])
```

---

### 2. useAuth Hook

**File:** `hooks/useAuth.ts`

**Purpose:** Access authentication state and methods

```typescript
'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User, Session } from '@supabase/supabase-js'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [supabase])

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  return {
    user,
    session,
    loading,
    signOut,
    isAuthenticated: !!user,
  }
}
```

**Usage:**
```typescript
const { user, loading, isAuthenticated, signOut } = useAuth()

if (loading) return <div>Loading...</div>

if (!isAuthenticated) {
  return <div>Please log in</div>
}

return <div>Welcome, {user.email}!</div>
```

---

### 3. useInvitation Hook

**File:** `hooks/useInvitation.ts`

**Purpose:** Manage invitation CRUD operations

```typescript
'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

export function useInvitation(invitationId?: string) {
  const [invitation, setInvitation] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    if (!invitationId) {
      setLoading(false)
      return
    }

    loadInvitation()
  }, [invitationId])

  const loadInvitation = async () => {
    try {
      setLoading(true)
      const { data, error: fetchError } = await supabase
        .from('invitations')
        .select('*')
        .eq('id', invitationId)
        .single()

      if (fetchError) throw fetchError
      setInvitation(data)
    } catch (err) {
      console.error('Load invitation error:', err)
      setError(err instanceof Error ? err.message : 'Failed to load invitation')
    } finally {
      setLoading(false)
    }
  }

  const updateInvitation = async (updates: any) => {
    try {
      const { data, error: updateError } = await supabase
        .from('invitations')
        .update(updates)
        .eq('id', invitationId)
        .select()
        .single()

      if (updateError) throw updateError
      setInvitation(data)
      return { success: true, data }
    } catch (err) {
      console.error('Update invitation error:', err)
      return { success: false, error: err }
    }
  }

  const deleteInvitation = async () => {
    try {
      const { error: deleteError } = await supabase
        .from('invitations')
        .delete()
        .eq('id', invitationId)

      if (deleteError) throw deleteError
      return { success: true }
    } catch (err) {
      console.error('Delete invitation error:', err)
      return { success: false, error: err }
    }
  }

  return {
    invitation,
    loading,
    error,
    updateInvitation,
    deleteInvitation,
    reload: loadInvitation,
  }
}
```

**Usage:**
```typescript
const { invitation, loading, updateInvitation } = useInvitation(id)

const handleSave = async () => {
  const { success } = await updateInvitation({
    data: newData
  })
  if (success) {
    toast.success('Saved!')
  }
}
```

---

### 4. useInvitations Hook

**File:** `hooks/useInvitations.ts`

**Purpose:** List user's invitations

```typescript
'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from './useAuth'

export function useInvitations() {
  const [invitations, setInvitations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()
  const supabase = createClient()

  useEffect(() => {
    if (user) {
      loadInvitations()
    } else {
      setLoading(false)
    }
  }, [user])

  const loadInvitations = async () => {
    try {
      setLoading(true)
      const { data, error: fetchError } = await supabase
        .from('invitations')
        .select('*')
        .order('created_at', { ascending: false })

      if (fetchError) throw fetchError
      setInvitations(data || [])
    } catch (err) {
      console.error('Load invitations error:', err)
      setError(err instanceof Error ? err.message : 'Failed to load invitations')
    } finally {
      setLoading(false)
    }
  }

  const createInvitation = async (invitation: any) => {
    try {
      const { data, error: createError } = await supabase
        .from('invitations')
        .insert(invitation)
        .select()
        .single()

      if (createError) throw createError
      setInvitations([data, ...invitations])
      return { success: true, data }
    } catch (err) {
      console.error('Create invitation error:', err)
      return { success: false, error: err }
    }
  }

  return {
    invitations,
    loading,
    error,
    createInvitation,
    reload: loadInvitations,
  }
}
```

---

### 5. usePayment Hook

**File:** `hooks/usePayment.ts`

**Purpose:** Handle payment flow

```typescript
'use client'

import { useState } from 'react'

export function usePayment() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const initiatePayment = async (amount: number) => {
    setLoading(true)
    setError(null)

    try {
      // Create order
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount }),
      })

      if (!response.ok) {
        throw new Error('Failed to create order')
      }

      const { data } = await response.json()
      return { success: true, data }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Payment failed'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const verifyPayment = async (paymentData: {
    orderId: string
    paymentId: string
    signature: string
  }) => {
    try {
      const response = await fetch('/api/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentData),
      })

      if (!response.ok) {
        throw new Error('Payment verification failed')
      }

      const { data } = await response.json()
      return { success: data.verified, data }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Verification failed'
      return { success: false, error: errorMessage }
    }
  }

  return {
    loading,
    error,
    initiatePayment,
    verifyPayment,
  }
}
```

---

### 6. useMediaQuery Hook

**File:** `hooks/useMediaQuery.ts`

**Purpose:** Respond to media query changes

```typescript
'use client'

import { useState, useEffect } from 'react'

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    
    // Set initial value
    setMatches(media.matches)

    // Create listener
    const listener = (e: MediaQueryListEvent) => {
      setMatches(e.matches)
    }

    // Add listener
    media.addEventListener('change', listener)

    // Clean up
    return () => media.removeEventListener('change', listener)
  }, [query])

  return matches
}
```

**Usage:**
```typescript
const isMobile = useMediaQuery('(max-width: 768px)')

return (
  <div>
    {isMobile ? <MobileNav /> : <DesktopNav />}
  </div>
)
```

---

### 7. useLocalStorage Hook

**File:** `hooks/useLocalStorage.ts`

**Purpose:** Persist state in localStorage

```typescript
'use client'

import { useState, useEffect } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue)

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key)
      if (item) {
        setStoredValue(JSON.parse(item))
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error)
    }
  }, [key])

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error('Error saving to localStorage:', error)
    }
  }

  return [storedValue, setValue] as const
}
```

**Usage:**
```typescript
const [theme, setTheme] = useLocalStorage('theme', 'light')
```

---

## 🛠️ UTILITY FUNCTIONS

### 1. cn (Class Names)

**File:** `lib/utils/cn.ts`

**Purpose:** Merge Tailwind classes safely

```typescript
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

**Usage:**
```typescript
<div className={cn(
  'base-class',
  isActive && 'active-class',
  className
)} />
```

---

### 2. formatDate

**File:** `lib/utils/format-date.ts`

**Purpose:** Format dates consistently

```typescript
import { format, formatDistance, formatRelative } from 'date-fns'

export function formatDate(date: string | Date, formatStr: string = 'PPP'): string {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    return format(dateObj, formatStr)
  } catch {
    return 'Invalid date'
  }
}

export function formatDateRelative(date: string | Date): string {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    return formatRelative(dateObj, new Date())
  } catch {
    return 'Invalid date'
  }
}

export function formatDateDistance(date: string | Date): string {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    return formatDistance(dateObj, new Date(), { addSuffix: true })
  } catch {
    return 'Invalid date'
  }
}
```

**Usage:**
```typescript
formatDate('2025-12-15') // "December 15, 2025"
formatDateRelative('2025-12-15') // "tomorrow at 12:00 AM"
formatDateDistance('2025-12-15') // "in 2 months"
```

---

### 3. generateSlug

**File:** `lib/utils/generate-slug.ts`

**Purpose:** Generate unique URL-safe slugs

```typescript
import { nanoid } from 'nanoid'

export function generateSlug(length: number = 10): string {
  return nanoid(length)
}

export function generateReadableSlug(text: string, suffix: boolean = true): string {
  const slug = text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
  
  return suffix ? `${slug}-${nanoid(6)}` : slug
}
```

**Usage:**
```typescript
generateSlug() // "V1StGXR8_Z"
generateReadableSlug('Rohan & Priya Wedding') // "rohan-priya-wedding-x3k9Lm"
```

---

### 4. formatCurrency

**File:** `lib/utils/format-currency.ts`

**Purpose:** Format currency values

```typescript
export function formatCurrency(
  amount: number,
  currency: string = 'INR',
  locale: string = 'en-IN'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatCurrencyCompact(amount: number): string {
  if (amount >= 1_00_000) {
    return `₹${(amount / 1_00_000).toFixed(1)}L`
  }
  if (amount >= 1_000) {
    return `₹${(amount / 1_000).toFixed(1)}K`
  }
  return `₹${amount}`
}
```

**Usage:**
```typescript
formatCurrency(299) // "₹299"
formatCurrency(2999) // "₹2,999"
formatCurrencyCompact(150000) // "₹1.5L"
```

---

### 5. validatePhone

**File:** `lib/utils/validate-phone.ts`

**Purpose:** Validate Indian phone numbers

```typescript
export function validatePhone(phone: string): boolean {
  // Remove spaces and special characters
  const cleaned = phone.replace(/[\s\-\(\)]/g, '')
  
  // Check if it's a valid Indian phone number
  // Format: +91xxxxxxxxxx or xxxxxxxxxx (10 digits)
  const regex = /^(\+91)?[6-9]\d{9}$/
  
  return regex.test(cleaned)
}

export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/[\s\-\(\)]/g, '')
  
  if (cleaned.length === 10) {
    return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`
  }
  
  if (cleaned.startsWith('+91') && cleaned.length === 13) {
    return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 8)} ${cleaned.slice(8)}`
  }
  
  return phone
}
```

---

### 6. truncate

**File:** `lib/utils/truncate.ts`

**Purpose:** Truncate long strings

```typescript
export function truncate(str: string, maxLength: number, suffix: string = '...'): string {
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength - suffix.length) + suffix
}

export function truncateWords(str: string, maxWords: number, suffix: string = '...'): string {
  const words = str.split(' ')
  if (words.length <= maxWords) return str
  return words.slice(0, maxWords).join(' ') + suffix
}
```

---

### 7. copyToClipboard

**File:** `lib/utils/clipboard.ts`

**Purpose:** Copy text to clipboard

```typescript
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      return true
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      document.body.appendChild(textArea)
      textArea.select()
      try {
        document.execCommand('copy')
        document.body.removeChild(textArea)
        return true
      } catch (err) {
        document.body.removeChild(textArea)
        return false
      }
    }
  } catch (err) {
    console.error('Failed to copy:', err)
    return false
  }
}
```

---

### 8. downloadFile

**File:** `lib/utils/download.ts`

**Purpose:** Trigger file download

```typescript
export function downloadFile(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export async function downloadFromUrl(url: string, filename: string) {
  try {
    const response = await fetch(url)
    const blob = await response.blob()
    downloadFile(blob, filename)
  } catch (error) {
    console.error('Download failed:', error)
    throw error
  }
}
```

---

### 9. sleep

**File:** `lib/utils/sleep.ts`

**Purpose:** Async sleep utility

```typescript
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}
```

**Usage:**
```typescript
await sleep(1000) // Wait 1 second
```

---

## 📦 UTILITY INDEX

**File:** `lib/utils/index.ts`

```typescript
export { cn } from './cn'
export { formatDate, formatDateRelative, formatDateDistance } from './format-date'
export { generateSlug, generateReadableSlug } from './generate-slug'
export { formatCurrency, formatCurrencyCompact } from './format-currency'
export { validatePhone, formatPhone } from './validate-phone'
export { truncate, truncateWords } from './truncate'
export { copyToClipboard } from './clipboard'
export { downloadFile, downloadFromUrl } from './download'
export { sleep } from './sleep'
```

---

All hooks and utilities are production-ready with TypeScript support.
