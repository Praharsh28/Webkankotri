# 📄 PAGE SPECIFICATIONS

**Complete page-by-page implementation details**

---

## 🗺️ ROUTING STRUCTURE

```
app/
├── (public)/
│   ├── page.tsx                         # Landing page
│   ├── templates/page.tsx               # Template gallery (optional)
│   └── t/[templateId]/try/page.tsx      # Demo mode
│
├── (auth)/
│   ├── login/page.tsx                   # Login
│   ├── signup/page.tsx                  # Signup
│   └── forgot-password/page.tsx         # Password reset
│
├── (dashboard)/
│   ├── layout.tsx                       # Dashboard layout
│   ├── page.tsx                         # Dashboard home
│   └── i/[slug]/
│       ├── edit/page.tsx                # Edit invitation
│       └── download/page.tsx            # Download page
│
├── i/[slug]/page.tsx                    # Public invitation view
│
├── api/                                 # API routes (covered in 05_API)
│
├── layout.tsx                           # Root layout
└── globals.css                          # Global styles
```

---

## 🏠 LANDING PAGE

**Route:** `/`  
**File:** `app/(public)/page.tsx`  
**Purpose:** Convert visitors to demo users

### Page Structure

```typescript
import { TemplateGallery } from '@/components/features/TemplateGallery'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Suspense } from 'react'

export default async function HomePage() {
  // Fetch templates from database
  const templates = await getTemplates()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Template Gallery */}
      <Suspense fallback={<div>Loading templates...</div>}>
        <TemplateGallery templates={templates} />
      </Suspense>

      {/* How It Works */}
      <HowItWorksSection />

      {/* Social Proof */}
      <SocialProofSection />

      {/* Pricing */}
      <PricingSection />

      {/* FAQ */}
      <FAQSection />

      {/* Final CTA */}
      <FinalCTASection />
    </div>
  )
}

async function getTemplates() {
  const { createClient } = await import('@/lib/supabase/server')
  const supabase = createClient()
  
  const { data } = await supabase
    .from('templates')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })
  
  return data || []
}
```

### Hero Section Component

```typescript
function HeroSection() {
  return (
    <section className="relative bg-gradient-to-b from-orange-50 to-white py-20 md:py-32 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        {/* Decorative diyas */}
        <div className="absolute top-20 left-10 text-6xl animate-float">🪔</div>
        <div className="absolute top-40 right-20 text-4xl animate-float-delayed">🪔</div>
        <div className="absolute bottom-20 left-1/4 text-5xl animate-float">🪔</div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main headline */}
          <h1 className="font-playfair text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Create Your Dream{' '}
            <span className="text-primary-600">
              Wedding Invitation
            </span>
            <br />
            in 2 Minutes
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
            Stunning animations • Authentic Gujarati traditions • Just ₹299
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="xl" asChild>
              <Link href="/t/garba-night/try">
                Try Demo Free →
              </Link>
            </Button>
            <Button size="xl" variant="outline" asChild>
              <Link href="#templates">
                See Templates
              </Link>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="flex items-center justify-center gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>No signup needed to try</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>50,000+ happy couples</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
```

### Features Section Component

```typescript
function FeaturesSection() {
  const features = [
    {
      icon: '⚡',
      title: 'Lightning Fast',
      description: 'Create your invitation in under 2 minutes. No design skills needed.',
    },
    {
      icon: '💰',
      title: 'Unbeatable Price',
      description: 'Just ₹299. No subscriptions, no hidden fees. Pay once, keep forever.',
    },
    {
      icon: '🎨',
      title: 'Stunning Animations',
      description: 'Beautiful animated diyas, rangoli, and traditional Gujarati motifs.',
    },
    {
      icon: '📱',
      title: 'Mobile-First',
      description: 'Perfect on phones, tablets, and desktops. Share easily on WhatsApp.',
    },
    {
      icon: '🇮🇳',
      title: 'Authentic Traditions',
      description: 'Crafted with deep respect for Gujarati wedding customs and culture.',
    },
    {
      icon: '✨',
      title: 'Unlimited Edits',
      description: 'Change your invitation anytime. Download as many times as you want.',
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Couples Love Us
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to create the perfect wedding invitation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="text-6xl mb-4">{feature.icon}</div>
              <h3 className="font-semibold text-xl text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

### How It Works Section

```typescript
function HowItWorksSection() {
  const steps = [
    {
      number: 1,
      title: 'Choose Template',
      description: 'Pick from our beautiful collection of Gujarati wedding templates',
      icon: '🎨',
    },
    {
      number: 2,
      title: 'Customize',
      description: 'Add your details, change colors, see live preview as you edit',
      icon: '✏️',
    },
    {
      number: 3,
      title: 'Download & Share',
      description: 'Pay ₹299, download PDF, share on WhatsApp instantly',
      icon: '📱',
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600">
            3 simple steps to your perfect invitation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step) => (
            <div key={step.number} className="relative">
              <div className="bg-white rounded-xl p-8 shadow-lg">
                {/* Step number */}
                <div className="w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-xl mb-4">
                  {step.number}
                </div>
                
                {/* Icon */}
                <div className="text-5xl mb-4">{step.icon}</div>
                
                {/* Content */}
                <h3 className="font-semibold text-xl text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </div>

              {/* Arrow (desktop only) */}
              {step.number < 3 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <svg className="w-8 h-8 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

### Social Proof Section

```typescript
function SocialProofSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Trusted by Thousands
          </h2>
          <p className="text-lg text-gray-600">
            Join 50,000+ couples who chose E-Kankotri
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">
              50K+
            </div>
            <div className="text-gray-600">Happy Couples</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">
              4.8
            </div>
            <div className="text-gray-600">⭐ Rating</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">
              99%
            </div>
            <div className="text-gray-600">Satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">
              24hr
            </div>
            <div className="text-gray-600">Support</div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              name: 'Priya & Rohan Patel',
              text: 'Amazing! Created our invitation in 5 minutes. Everyone loved the animations!',
              rating: 5,
            },
            {
              name: 'Neha & Arjun Shah',
              text: 'So much better than expensive designers. Saved ₹10,000 and got exactly what we wanted.',
              rating: 5,
            },
            {
              name: 'Kavita & Ravi Desai',
              text: 'The Garba Night template was perfect for our traditional wedding. Highly recommend!',
              rating: 5,
            },
          ].map((testimonial, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-6">
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">⭐</span>
                ))}
              </div>
              <p className="text-gray-700 mb-4">"{testimonial.text}"</p>
              <div className="font-semibold text-gray-900">
                {testimonial.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

### Pricing Section

```typescript
function PricingSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-orange-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-gray-600">
            No subscriptions. No hidden fees. Pay once, keep forever.
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-primary-500">
            {/* Badge */}
            <div className="inline-block bg-primary-100 text-primary-700 px-4 py-1 rounded-full text-sm font-semibold mb-6">
              Most Popular
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold text-gray-900">₹299</span>
                <span className="text-gray-600">one-time</span>
              </div>
              <p className="text-gray-600 mt-2">
                vs ₹5,000-15,000 with designers
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4 mb-8">
              {[
                'Beautiful animated template',
                'Live preview as you edit',
                'High-quality PDF download',
                'No watermark',
                'Unlimited downloads',
                'WhatsApp sharing',
                'Lifetime access',
                '24-hour money-back guarantee',
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Button size="lg" className="w-full" asChild>
              <Link href="/t/garba-night/try">
                Try Free Demo →
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
```

---

## 🎨 DEMO MODE PAGE

**Route:** `/t/[templateId]/try`  
**File:** `app/(public)/t/[templateId]/try/page.tsx`

```typescript
import { DemoEditor } from '@/components/features/DemoEditor'
import { notFound } from 'next/navigation'

export default async function DemoPage({
  params,
}: {
  params: { templateId: string }
}) {
  // Validate template exists
  const template = await getTemplate(params.templateId)
  
  if (!template) {
    notFound()
  }

  return <DemoEditor templateId={params.templateId} onPayment={() => {}} />
}

async function getTemplate(templateId: string) {
  const { createClient } = await import('@/lib/supabase/server')
  const supabase = createClient()
  
  const { data } = await supabase
    .from('templates')
    .select('*')
    .eq('template_id', templateId)
    .eq('is_active', true)
    .single()
  
  return data
}
```

---

## 🔐 AUTH PAGES

**Route:** `/login`  
**File:** `app/(auth)/login/page.tsx`

```typescript
import { LoginForm } from '@/components/auth/LoginForm'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="font-playfair text-3xl font-bold text-primary-600">
              E-Kankotri
            </h1>
          </Link>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <LoginForm />
        </div>

        {/* Back to home */}
        <div className="text-center mt-6">
          <Link 
            href="/" 
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}
```

---

## 📊 DASHBOARD PAGE

**Route:** `/dashboard`  
**File:** `app/(dashboard)/page.tsx`

```typescript
import { AuthGuard } from '@/components/auth/AuthGuard'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export default async function DashboardPage() {
  const invitations = await getUserInvitations()

  return (
    <AuthGuard>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-playfair text-4xl font-bold text-gray-900">
            My Invitations
          </h1>
          <Button size="lg" asChild>
            <Link href="/t/garba-night/try">
              Create New
            </Link>
          </Button>
        </div>

        {invitations.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <div className="text-6xl mb-4">📝</div>
              <h2 className="font-semibold text-xl mb-2">No invitations yet</h2>
              <p className="text-gray-600 mb-6">
                Create your first invitation to get started
              </p>
              <Button asChild>
                <Link href="/t/garba-night/try">
                  Create Invitation
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {invitations.map((invitation) => (
              <Card key={invitation.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">
                    {invitation.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Created {new Date(invitation.created_at).toLocaleDateString()}
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/i/${invitation.slug}/edit`}>
                        Edit
                      </Link>
                    </Button>
                    <Button size="sm" asChild>
                      <Link href={`/i/${invitation.slug}`}>
                        View
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AuthGuard>
  )
}

async function getUserInvitations() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return []
  
  const { data } = await supabase
    .from('invitations')
    .select('*')
    .order('created_at', { ascending: false })
  
  return data || []
}
```

---

More pages in next document...
