# 💳 PAYMENT & AUTHENTICATION COMPONENTS

**Complete specifications for payment and auth flows**

---

## 💰 PAYMENT COMPONENTS

### PaymentModal Component

**File:** `components/features/PaymentModal.tsx`

**Purpose:** Handle Razorpay payment flow in modal

```typescript
'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'

// Declare Razorpay on window
declare global {
  interface Window {
    Razorpay: any
  }
}

interface PaymentModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  amount: number
  onSuccess: (paymentId: string, orderId: string) => void
  onError: (error: string) => void
}

export function PaymentModal({ 
  open, 
  onOpenChange, 
  amount, 
  onSuccess, 
  onError 
}: PaymentModalProps) {
  const [loading, setLoading] = useState(false)

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      // Check if already loaded
      if (window.Razorpay) {
        resolve(true)
        return
      }

      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

  const handlePayment = async () => {
    setLoading(true)

    try {
      // Load Razorpay script
      const loaded = await loadRazorpayScript()
      if (!loaded) {
        throw new Error('Failed to load Razorpay SDK')
      }

      // Create order on backend
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount }),
      })

      if (!response.ok) {
        throw new Error('Failed to create order')
      }

      const { orderId, currency } = await response.json()

      // Razorpay options
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: amount * 100, // Convert to paise
        currency: currency || 'INR',
        name: 'E-Kankotri',
        description: 'Wedding Invitation',
        order_id: orderId,
        handler: async function (response: any) {
          // Verify payment on backend
          try {
            const verifyResponse = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
              }),
            })

            if (!verifyResponse.ok) {
              throw new Error('Payment verification failed')
            }

            const { verified } = await verifyResponse.json()
            
            if (verified) {
              onSuccess(response.razorpay_payment_id, response.razorpay_order_id)
            } else {
              throw new Error('Payment verification failed')
            }
          } catch (error) {
            onError('Payment verification failed')
          }
        },
        prefill: {
          name: '',
          email: '',
          contact: '',
        },
        notes: {
          product: 'wedding-invitation',
        },
        theme: {
          color: '#F97316',
        },
        modal: {
          ondismiss: function() {
            setLoading(false)
          }
        }
      }

      const razorpay = new window.Razorpay(options)
      razorpay.open()
    } catch (error) {
      console.error('Payment error:', error)
      onError(error instanceof Error ? error.message : 'Payment failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">Download Your Invitation</DialogTitle>
          <DialogDescription>
            Get your beautiful invitation without watermark
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Package Details */}
          <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-semibold text-gray-900">
                Wedding Invitation
              </span>
              <span className="text-3xl font-bold text-primary-600">
                ₹{amount}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Check className="w-4 h-4 text-green-600" />
                <span>High-quality PDF download</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Check className="w-4 h-4 text-green-600" />
                <span>No watermark</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Check className="w-4 h-4 text-green-600" />
                <span>Unlimited downloads</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Check className="w-4 h-4 text-green-600" />
                <span>Lifetime access</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Check className="w-4 h-4 text-green-600" />
                <span>WhatsApp sharing</span>
              </div>
            </div>
          </div>

          {/* Payment Button */}
          <Button 
            size="lg" 
            className="w-full" 
            onClick={handlePayment}
            loading={loading}
            disabled={loading}
          >
            {loading ? 'Processing...' : `Pay ₹${amount}`}
          </Button>

          {/* Trust Indicators */}
          <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span>Secure Payment</span>
            </div>
            <span>•</span>
            <span>Powered by Razorpay</span>
          </div>

          {/* Money-back guarantee */}
          <p className="text-center text-sm text-gray-600">
            💯 24-hour money-back guarantee
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
```

---

### PaymentSuccess Component

**File:** `components/features/PaymentSuccess.tsx`

**Purpose:** Show success message after payment

```typescript
'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import confetti from 'canvas-confetti'
import { useEffect } from 'react'

interface PaymentSuccessProps {
  onDownload: () => void
  onDashboard: () => void
}

export function PaymentSuccess({ onDownload, onDashboard }: PaymentSuccessProps) {
  useEffect(() => {
    // Trigger confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    })
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <Check className="w-10 h-10 text-green-600" />
        </motion.div>

        {/* Success Message */}
        <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-3">
          Payment Successful! 🎉
        </h2>
        <p className="text-gray-600 mb-8">
          Your invitation is ready to download. We've also sent a confirmation email.
        </p>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button size="lg" className="w-full" onClick={onDownload}>
            Download PDF Now
          </Button>
          <Button size="lg" variant="outline" className="w-full" onClick={onDashboard}>
            Go to Dashboard
          </Button>
        </div>

        {/* Additional Info */}
        <p className="text-sm text-gray-500 mt-6">
          You can download your invitation anytime from your dashboard
        </p>
      </div>
    </motion.div>
  )
}
```

---

## 🔐 AUTHENTICATION COMPONENTS

### LoginForm Component

**File:** `components/auth/LoginForm.tsx`

**Purpose:** User login form

```typescript
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginFormData = z.infer<typeof loginSchema>

export function LoginForm() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true)
    setError(null)

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      })

      if (signInError) {
        throw signInError
      }

      // Redirect to dashboard
      router.push('/dashboard')
      router.refresh()
    } catch (err) {
      console.error('Login error:', err)
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <h1 className="font-playfair text-4xl font-bold text-gray-900 mb-2">
          Welcome Back
        </h1>
        <p className="text-gray-600">
          Sign in to access your invitations
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {/* Email */}
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            {...register('email')}
            placeholder="you@example.com"
            error={!!errors.email}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <Label htmlFor="password">Password</Label>
            <Link 
              href="/forgot-password" 
              className="text-sm text-primary-600 hover:text-primary-700"
            >
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            {...register('password')}
            placeholder="••••••••"
            error={!!errors.password}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <Button 
          type="submit" 
          size="lg" 
          className="w-full"
          loading={loading}
          disabled={loading}
        >
          Sign In
        </Button>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">
              Don't have an account?
            </span>
          </div>
        </div>

        {/* Sign Up Link */}
        <Button 
          type="button" 
          variant="outline" 
          size="lg" 
          className="w-full"
          asChild
        >
          <Link href="/signup">
            Create Account
          </Link>
        </Button>
      </form>
    </div>
  )
}
```

---

### SignupForm Component

**File:** `components/auth/SignupForm.tsx`

**Purpose:** User registration form

```typescript
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const signupSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
})

type SignupFormData = z.infer<typeof signupSchema>

export function SignupForm() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  })

  const onSubmit = async (data: SignupFormData) => {
    setLoading(true)
    setError(null)

    try {
      const { error: signUpError, data: authData } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.fullName,
          },
        },
      })

      if (signUpError) {
        throw signUpError
      }

      // If email confirmation is required
      if (authData?.user && !authData.session) {
        setSuccess(true)
      } else {
        // Auto-login and redirect
        router.push('/dashboard')
        router.refresh()
      }
    } catch (err) {
      console.error('Signup error:', err)
      setError(err instanceof Error ? err.message : 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="w-full max-w-md">
        <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="font-playfair text-2xl font-bold text-gray-900 mb-2">
            Check Your Email
          </h2>
          <p className="text-gray-600 mb-6">
            We've sent you a confirmation link. Please check your email to verify your account.
          </p>
          <Button variant="outline" asChild>
            <Link href="/login">
              Back to Login
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <h1 className="font-playfair text-4xl font-bold text-gray-900 mb-2">
          Create Account
        </h1>
        <p className="text-gray-600">
          Start creating beautiful invitations
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {/* Full Name */}
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            {...register('fullName')}
            placeholder="Your name"
            error={!!errors.fullName}
          />
          {errors.fullName && (
            <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            {...register('email')}
            placeholder="you@example.com"
            error={!!errors.email}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            {...register('password')}
            placeholder="••••••••"
            error={!!errors.password}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            {...register('confirmPassword')}
            placeholder="••••••••"
            error={!!errors.confirmPassword}
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <Button 
          type="submit" 
          size="lg" 
          className="w-full"
          loading={loading}
          disabled={loading}
        >
          Create Account
        </Button>

        {/* Terms */}
        <p className="text-xs text-gray-500 text-center">
          By creating an account, you agree to our{' '}
          <Link href="/terms" className="text-primary-600 hover:underline">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="text-primary-600 hover:underline">
            Privacy Policy
          </Link>
        </p>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">
              Already have an account?
            </span>
          </div>
        </div>

        {/* Login Link */}
        <Button 
          type="button" 
          variant="outline" 
          size="lg" 
          className="w-full"
          asChild
        >
          <Link href="/login">
            Sign In
          </Link>
        </Button>
      </form>
    </div>
  )
}
```

---

### AuthGuard Component

**File:** `components/auth/AuthGuard.tsx`

**Purpose:** Protect routes that require authentication

```typescript
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

interface AuthGuardProps {
  children: React.ReactNode
  redirectTo?: string
}

export function AuthGuard({ children, redirectTo = '/login' }: AuthGuardProps) {
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        
        if (!session) {
          router.push(redirectTo)
        } else {
          setAuthenticated(true)
        }
      } catch (error) {
        console.error('Auth check error:', error)
        router.push(redirectTo)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        router.push(redirectTo)
      } else if (event === 'SIGNED_IN') {
        setAuthenticated(true)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [router, redirectTo, supabase])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  if (!authenticated) {
    return null
  }

  return <>{children}</>
}
```

---

This covers all payment and authentication components with complete implementation details.
