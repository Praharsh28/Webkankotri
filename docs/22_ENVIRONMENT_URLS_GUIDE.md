# 🔗 ENVIRONMENT-BASED URLs GUIDE

**No hardcoded localhost or domain names - Dynamic URL handling**

---

## 🎯 CRITICAL REQUIREMENT

From user request:
> "Share links but make sure the links are adaptable with the actual domain name not hardcoded localhost, and I prefer that in other areas as well you just don't hardcode everything then it takes too much time to change later"

---

## ✅ SOLUTION: Dynamic URL Generation

### Environment Variables (Already in 11_ENVIRONMENT_CONFIG.md)

```env
# .env.local
NEXT_PUBLIC_APP_URL=http://localhost:3000

# .env.production
NEXT_PUBLIC_APP_URL=https://ekankotri.com
```

---

## 🔧 URL UTILITY FUNCTIONS

**File:** `lib/utils/urls.ts`

```typescript
/**
 * Get the base app URL from environment
 * Works in development, staging, and production
 */
export function getAppUrl(): string {
  // 1. Check environment variable
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL
  }

  // 2. Check Vercel deployment URL
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  }

  // 3. Fallback for development
  return 'http://localhost:3000'
}

/**
 * Generate absolute URL for any path
 */
export function absoluteUrl(path: string): string {
  const baseUrl = getAppUrl()
  // Remove trailing slash from base and leading slash from path
  const cleanBase = baseUrl.replace(/\/$/, '')
  const cleanPath = path.replace(/^\//, '')
  return `${cleanBase}/${cleanPath}`
}

/**
 * Generate invitation share URL
 */
export function getInvitationUrl(invitationId: string): string {
  return absoluteUrl(`/invitation/${invitationId}`)
}

/**
 * Generate RSVP URL
 */
export function getRSVPUrl(invitationId: string): string {
  return absoluteUrl(`/rsvp/${invitationId}`)
}

/**
 * Generate WhatsApp share link
 */
export function getWhatsAppShareUrl(invitationId: string, message?: string): string {
  const invitationUrl = getInvitationUrl(invitationId)
  const text = message || `You're invited! View your invitation: ${invitationUrl}`
  return `https://wa.me/?text=${encodeURIComponent(text)}`
}

/**
 * Generate payment success URL
 */
export function getPaymentSuccessUrl(invitationId: string): string {
  return absoluteUrl(`/dashboard/invitations/${invitationId}?payment=success`)
}

/**
 * Generate payment cancel URL
 */
export function getPaymentCancelUrl(invitationId: string): string {
  return absoluteUrl(`/dashboard/invitations/${invitationId}?payment=cancelled`)
}

/**
 * Generate API URL (for server-side calls)
 */
export function getApiUrl(endpoint: string): string {
  return absoluteUrl(`/api/${endpoint.replace(/^\//, '')}`)
}

/**
 * Generate Supabase Storage URL
 */
export function getStorageUrl(bucket: string, path: string): string {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!supabaseUrl) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL is not defined')
  }
  return `${supabaseUrl}/storage/v1/object/public/${bucket}/${path}`
}
```

---

## 📧 EMAIL TEMPLATES (Dynamic URLs)

**File:** `lib/email/templates.ts`

```typescript
import { getInvitationUrl, getRSVPUrl, getAppUrl } from '@/lib/utils/urls'

export function getWelcomeEmailHtml(userName: string): string {
  const dashboardUrl = getAppUrl() + '/dashboard'
  
  return `
    <!DOCTYPE html>
    <html>
      <body>
        <h1>Welcome to E-Kankotri, ${userName}!</h1>
        <p>Start creating beautiful invitations today.</p>
        <a href="${dashboardUrl}">Go to Dashboard</a>
      </body>
    </html>
  `
}

export function getInvitationShareEmailHtml(
  invitation: any,
  recipientName: string
): string {
  const invitationUrl = getInvitationUrl(invitation.id)
  const rsvpUrl = getRSVPUrl(invitation.id)
  
  return `
    <!DOCTYPE html>
    <html>
      <body>
        <h1>You're Invited!</h1>
        <p>Dear ${recipientName},</p>
        <p>You have been invited to ${invitation.event_name}</p>
        <a href="${invitationUrl}">View Invitation</a>
        <a href="${rsvpUrl}">RSVP Now</a>
      </body>
    </html>
  `
}
```

---

## 🔗 SHARE COMPONENT (Dynamic URLs)

**File:** `components/features/InvitationShare.tsx`

```typescript
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Share2, Copy, Check } from 'lucide-react'
import { getInvitationUrl, getWhatsAppShareUrl } from '@/lib/utils/urls'
import { toast } from 'sonner'

interface InvitationShareProps {
  invitationId: string
  title?: string
}

export function InvitationShare({ invitationId, title }: InvitationShareProps) {
  const [copied, setCopied] = useState(false)
  
  // Generate URLs dynamically
  const invitationUrl = getInvitationUrl(invitationId)
  const whatsappUrl = getWhatsAppShareUrl(invitationId, title)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(invitationUrl)
      setCopied(true)
      toast.success('Link copied to clipboard!')
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      toast.error('Failed to copy link')
    }
  }

  const shareToWhatsApp = () => {
    window.open(whatsappUrl, '_blank')
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          value={invitationUrl}
          readOnly
          className="flex-1"
        />
        <Button onClick={copyToClipboard} variant="outline">
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        </Button>
      </div>
      
      <Button onClick={shareToWhatsApp} className="w-full bg-green-600 hover:bg-green-700">
        <Share2 className="w-4 h-4 mr-2" />
        Share on WhatsApp
      </Button>
    </div>
  )
}
```

---

## 💳 PAYMENT INTEGRATION (Dynamic URLs)

**File:** `app/api/payment/create/route.ts`

```typescript
import { NextResponse } from 'next/server'
import Razorpay from 'razorpay'
import { getPaymentSuccessUrl, getPaymentCancelUrl } from '@/lib/utils/urls'

export async function POST(request: Request) {
  const { invitationId, amount } = await request.json()

  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
  })

  const options = {
    amount: amount * 100, // paise
    currency: 'INR',
    receipt: `inv_${invitationId}`,
    notes: {
      invitation_id: invitationId,
    },
    // Dynamic callback URLs
    callback_url: getPaymentSuccessUrl(invitationId),
    cancel_url: getPaymentCancelUrl(invitationId),
  }

  const order = await razorpay.orders.create(options)
  
  return NextResponse.json({ order })
}
```

---

## 📊 SITEMAP GENERATION (Dynamic URLs)

**File:** `app/sitemap.ts`

```typescript
import { MetadataRoute } from 'next'
import { getAppUrl, absoluteUrl } from '@/lib/utils/urls'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getAppUrl()

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: absoluteUrl('/templates'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: absoluteUrl('/pricing'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: absoluteUrl('/dashboard'),
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
  ]
}
```

---

## 🔍 SEO METADATA (Dynamic URLs)

**File:** `app/layout.tsx`

```typescript
import { Metadata } from 'next'
import { getAppUrl, absoluteUrl } from '@/lib/utils/urls'

export const metadata: Metadata = {
  title: 'E-Kankotri - Digital Invitation Platform',
  description: 'Create beautiful digital invitations for weddings and celebrations',
  metadataBase: new URL(getAppUrl()),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: getAppUrl(),
    title: 'E-Kankotri',
    description: 'Create beautiful digital invitations',
    images: [
      {
        url: absoluteUrl('/og-image.jpg'),
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@ekankotri',
    images: [absoluteUrl('/og-image.jpg')],
  },
}
```

---

## 🌐 API ROUTES (Dynamic URLs)

**Never hardcode URLs in API responses:**

```typescript
// ❌ WRONG
return NextResponse.json({
  invitation_url: 'http://localhost:3000/invitation/123'
})

// ✅ CORRECT
import { getInvitationUrl } from '@/lib/utils/urls'

return NextResponse.json({
  invitation_url: getInvitationUrl(invitationId)
})
```

---

## 📱 CLIENT COMPONENTS (Dynamic URLs)

```typescript
// ❌ WRONG
const shareUrl = `https://ekankotri.com/invitation/${id}`

// ✅ CORRECT
import { getInvitationUrl } from '@/lib/utils/urls'

const shareUrl = getInvitationUrl(id)
```

---

## 🔧 VERCEL DEPLOYMENT

Vercel automatically provides:
- `NEXT_PUBLIC_VERCEL_URL` - Auto-generated deployment URL
- Works with preview deployments
- Production uses custom domain

Our `getAppUrl()` function handles all cases automatically!

---

## ✅ CHECKLIST

**Before deploying, ensure NO hardcoded URLs in:**

- [ ] Share links
- [ ] Email templates
- [ ] Payment callbacks
- [ ] API responses
- [ ] Social media shares
- [ ] Sitemap
- [ ] SEO metadata
- [ ] QR codes
- [ ] PDF generation

**Always use:**
- `getAppUrl()` for base URL
- `absoluteUrl(path)` for full URLs
- `getInvitationUrl(id)` for invitation links
- `getRSVPUrl(id)` for RSVP links
- `getWhatsAppShareUrl(id)` for WhatsApp shares

---

## 🎯 BENEFITS

✅ **Development:** Works on `localhost:3000`
✅ **Staging:** Works on Vercel preview URLs
✅ **Production:** Works on custom domain
✅ **Zero Changes:** Same code works everywhere
✅ **Easy Updates:** Change domain? Update one env variable!

---

**No more "takes too much time to change later" problems!**
