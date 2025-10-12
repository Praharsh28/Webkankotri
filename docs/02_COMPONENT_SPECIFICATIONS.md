# 🧩 COMPLETE COMPONENT SPECIFICATIONS

**Every component detailed for AI implementation**

---

## 📦 COMPONENT ARCHITECTURE

### Component Categories

1. **UI Components** (`components/ui/`) - Base shadcn/ui components
2. **Feature Components** (`components/features/`) - Business logic components
3. **Template Components** (`components/templates/`) - Invitation templates
4. **Animation Components** (`components/animations/`) - Reusable animations
5. **Form Components** (`components/forms/`) - Form-specific components
6. **Layout Components** (`components/layouts/`) - Page layouts

---

## 🎨 UI COMPONENTS (shadcn/ui)

### Button Component

**File:** `components/ui/button.tsx`

```typescript
import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-base font-semibold ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700 shadow-sm hover:shadow-md',
        secondary: 'bg-secondary-500 text-white hover:bg-secondary-600 active:bg-secondary-700 shadow-sm hover:shadow-md',
        accent: 'bg-accent-500 text-white hover:bg-accent-600 active:bg-accent-700 shadow-sm hover:shadow-md',
        outline: 'border-2 border-primary-500 text-primary-500 bg-white hover:bg-primary-50 active:bg-primary-100',
        ghost: 'text-primary-500 hover:bg-primary-50 active:bg-primary-100',
        link: 'text-primary-500 underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-9 px-4 text-sm',
        md: 'h-11 px-6 text-base',
        lg: 'h-14 px-8 text-lg',
        xl: 'h-16 px-10 text-xl',
        icon: 'h-11 w-11',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Loading...</span>
          </>
        ) : (
          children
        )}
      </Comp>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
```

---

### Input Component

**File:** `components/ui/input.tsx`

```typescript
import * as React from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-11 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-base ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-all',
          error && 'border-red-500 focus-visible:ring-red-500',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

export { Input }
```

---

### Label Component

**File:** `components/ui/label.tsx`

```typescript
import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const labelVariants = cva(
  'text-sm font-medium text-gray-700 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
)

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
```

---

### Card Component

**File:** `components/ui/card.tsx`

```typescript
import * as React from 'react'
import { cn } from '@/lib/utils'

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('rounded-xl border border-gray-200 bg-white shadow-sm', className)}
      {...props}
    />
  )
)
Card.displayName = 'Card'

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5 p-6', className)}
      {...props}
    />
  )
)
CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('font-playfair text-2xl font-semibold leading-none tracking-tight', className)}
      {...props}
    />
  )
)
CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-gray-600', className)}
      {...props}
    />
  )
)
CardDescription.displayName = 'CardDescription'

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
  )
)
CardContent.displayName = 'CardContent'

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center p-6 pt-0', className)}
      {...props}
    />
  )
)
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
```

---

### Dialog Component

**File:** `components/ui/dialog.tsx`

```typescript
import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-gray-200 bg-white p-6 shadow-xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-xl',
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-gray-100">
        <X className="h-5 w-5" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)}
    {...props}
  />
)
DialogHeader.displayName = 'DialogHeader'

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)}
    {...props}
  />
)
DialogFooter.displayName = 'DialogFooter'

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('font-playfair text-2xl font-semibold leading-none tracking-tight', className)}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-gray-600', className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
```

---

## 🎯 FEATURE COMPONENTS

### TemplateCard Component

**File:** `components/features/TemplateCard.tsx`

**Purpose:** Display template in gallery with video preview

```typescript
'use client'

import { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface TemplateCardProps {
  id: string
  name: string
  description: string
  category: string
  price: number
  thumbnailUrl: string
  videoUrl?: string
}

export function TemplateCard({
  id,
  name,
  description,
  category,
  price,
  thumbnailUrl,
  videoUrl,
}: TemplateCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="group overflow-hidden hover:shadow-2xl transition-shadow duration-300">
        {/* Video/Image Preview */}
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
          {videoUrl ? (
            <>
              {/* Thumbnail shown until video loads or on mobile */}
              {!videoLoaded && (
                <img
                  src={thumbnailUrl}
                  alt={name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
              
              {/* Video shown on hover (desktop only) */}
              <video
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                  isHovered && videoLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                autoPlay={isHovered}
                loop
                muted
                playsInline
                onLoadedData={() => setVideoLoaded(true)}
              >
                <source src={videoUrl} type="video/mp4" />
              </video>
            </>
          ) : (
            <img
              src={thumbnailUrl}
              alt={name}
              className="w-full h-full object-cover"
            />
          )}
          
          {/* Overlay on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent flex items-end justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <Button size="lg" className="w-full" asChild>
              <Link href={`/t/${id}/try`}>
                Try This Template →
              </Link>
            </Button>
          </motion.div>
          
          {/* Category badge */}
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-700">
            {category}
          </div>
        </div>

        {/* Card Content */}
        <CardHeader>
          <CardTitle>{name}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        
        <CardFooter className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary-600">₹{price}</span>
          <Button variant="outline" size="sm" asChild>
            <Link href={`/t/${id}/try`}>
              Preview
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
```

---

### TemplateGallery Component

**File:** `components/features/TemplateGallery.tsx`

**Purpose:** Display grid of template cards

```typescript
'use client'

import { TemplateCard } from './TemplateCard'

interface Template {
  id: string
  name: string
  description: string
  category: string
  price: number
  thumbnailUrl: string
  videoUrl?: string
}

interface TemplateGalleryProps {
  templates: Template[]
}

export function TemplateGallery({ templates }: TemplateGalleryProps) {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Choose Your Style
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Each template is crafted with authentic Gujarati traditions and stunning animations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {templates.map((template) => (
            <TemplateCard key={template.id} {...template} />
          ))}
        </div>
      </div>
    </section>
  )
}
```

---

### DemoEditor Component

**File:** `components/features/DemoEditor.tsx`

**Purpose:** Main editor for demo mode with form and live preview

```typescript
'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { GarbaNightTemplate } from '@/components/templates/garba-night'
import { useDebounce } from '@/hooks/useDebounce'

// Validation schema
const invitationSchema = z.object({
  groomName: z.string().min(2, 'Name must be at least 2 characters'),
  brideName: z.string().min(2, 'Name must be at least 2 characters'),
  weddingDate: z.string().min(1, 'Date is required'),
  venue: z.string().min(3, 'Venue must be at least 3 characters'),
  primaryColor: z.string().regex(/^#[0-9A-F]{6}$/i, 'Invalid color'),
})

type InvitationFormData = z.infer<typeof invitationSchema>

// Sample data for demo
const SAMPLE_DATA: InvitationFormData = {
  groomName: 'Rohan Patel',
  brideName: 'Priya Shah',
  weddingDate: '2025-12-15',
  venue: 'Grand Taj Palace, Ahmedabad',
  primaryColor: '#F97316',
}

interface DemoEditorProps {
  templateId: string
  onPayment: () => void
}

export function DemoEditor({ templateId, onPayment }: DemoEditorProps) {
  const [previewData, setPreviewData] = useState<InvitationFormData>(SAMPLE_DATA)
  
  const {
    register,
    watch,
    formState: { errors },
    setValue,
  } = useForm<InvitationFormData>({
    resolver: zodResolver(invitationSchema),
    defaultValues: SAMPLE_DATA,
  })

  // Watch all form values
  const formData = watch()
  
  // Debounce form data for preview (800ms)
  const debouncedFormData = useDebounce(formData, 800)
  
  // Update preview when debounced data changes
  useEffect(() => {
    setPreviewData(debouncedFormData)
  }, [debouncedFormData])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Demo Banner */}
      <div className="bg-orange-100 border-b border-orange-200 p-4 text-center">
        <p className="text-sm md:text-base text-orange-800">
          🎉 This is a <strong>FREE DEMO</strong> with sample data. 
          Edit to see your invitation! No signup needed.
        </p>
      </div>

      <div className="container mx-auto p-4">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Editor Panel */}
          <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg">
            <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-6">
              Customize Your Invitation
            </h2>
            
            <div className="space-y-6">
              {/* Groom Name */}
              <div>
                <Label htmlFor="groomName">
                  Groom Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="groomName"
                  {...register('groomName')}
                  placeholder="Enter groom name"
                  error={!!errors.groomName}
                />
                {errors.groomName && (
                  <p className="mt-1 text-sm text-red-600">{errors.groomName.message}</p>
                )}
              </div>

              {/* Bride Name */}
              <div>
                <Label htmlFor="brideName">
                  Bride Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="brideName"
                  {...register('brideName')}
                  placeholder="Enter bride name"
                  error={!!errors.brideName}
                />
                {errors.brideName && (
                  <p className="mt-1 text-sm text-red-600">{errors.brideName.message}</p>
                )}
              </div>

              {/* Wedding Date */}
              <div>
                <Label htmlFor="weddingDate">
                  Wedding Date <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="weddingDate"
                  type="date"
                  {...register('weddingDate')}
                  error={!!errors.weddingDate}
                />
                {errors.weddingDate && (
                  <p className="mt-1 text-sm text-red-600">{errors.weddingDate.message}</p>
                )}
              </div>

              {/* Venue */}
              <div>
                <Label htmlFor="venue">
                  Venue <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="venue"
                  {...register('venue')}
                  placeholder="Enter venue name and location"
                  error={!!errors.venue}
                />
                {errors.venue && (
                  <p className="mt-1 text-sm text-red-600">{errors.venue.message}</p>
                )}
              </div>

              {/* Primary Color */}
              <div>
                <Label htmlFor="primaryColor">Primary Color</Label>
                <div className="flex gap-3 items-center mt-2">
                  <input
                    type="color"
                    value={formData.primaryColor}
                    onChange={(e) => setValue('primaryColor', e.target.value)}
                    className="w-16 h-11 rounded-lg border border-gray-300 cursor-pointer"
                  />
                  <Input
                    value={formData.primaryColor}
                    readOnly
                    className="flex-1"
                  />
                </div>
              </div>
            </div>

            {/* Payment CTA */}
            <div className="mt-8 p-6 bg-orange-50 rounded-xl border border-orange-200">
              <div className="flex items-start gap-3 mb-4">
                <span className="text-2xl">❤️</span>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Love your invitation?
                  </h3>
                  <p className="text-sm text-gray-700">
                    Download the full-quality PDF without watermark
                  </p>
                </div>
              </div>
              
              <Button size="lg" className="w-full" onClick={onPayment}>
                Download for ₹299 →
              </Button>
              
              <p className="text-xs text-gray-500 mt-3 text-center">
                ✓ High-quality PDF ✓ No watermark ✓ Unlimited downloads
              </p>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="lg:sticky lg:top-4 lg:self-start">
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Live Preview</h3>
                <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  Updates as you type
                </span>
              </div>
              
              <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
                <GarbaNightTemplate data={previewData} />
              </div>
              
              <p className="text-xs text-gray-500 mt-4 text-center">
                ✨ Preview updates automatically after you stop typing
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
```

---

## 💾 Continue to next document...

This is getting comprehensive! Should I continue with:
- PaymentModal component
- LivePreview component
- PDFDownload component
- WhatsAppShare component
- And more...?
