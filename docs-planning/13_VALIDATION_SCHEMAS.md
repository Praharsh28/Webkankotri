# ✅ VALIDATION SCHEMAS

**Complete Zod validation schemas for all forms and API requests**

---

## 🎯 VALIDATION STRATEGY

### Principles

1. **Validate at boundaries** - API requests, form submissions
2. **Fail early** - Validate before processing
3. **Clear error messages** - User-friendly validation errors
4. **Type-safe** - Use Zod with TypeScript
5. **Reusable** - Share schemas between client and server

---

## 📦 INSTALLATION

```bash
npm install zod
```

---

## 📝 INVITATION VALIDATION

**File:** `lib/validations/invitation-schema.ts`

```typescript
import { z } from 'zod'

// Base invitation data schema
export const invitationDataSchema = z.object({
  groomName: z
    .string()
    .min(2, 'Groom name must be at least 2 characters')
    .max(50, 'Groom name must not exceed 50 characters')
    .trim(),
  
  brideName: z
    .string()
    .min(2, 'Bride name must be at least 2 characters')
    .max(50, 'Bride name must not exceed 50 characters')
    .trim(),
  
  weddingDate: z
    .string()
    .refine((date) => {
      const parsed = new Date(date)
      return !isNaN(parsed.getTime())
    }, 'Invalid date format')
    .refine((date) => {
      const parsed = new Date(date)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return parsed >= today
    }, 'Wedding date must be in the future'),
  
  venue: z
    .string()
    .min(3, 'Venue must be at least 3 characters')
    .max(100, 'Venue must not exceed 100 characters')
    .trim(),
  
  primaryColor: z
    .string()
    .regex(/^#[0-9A-F]{6}$/i, 'Invalid color format (use #RRGGBB)'),
  
  // Optional fields (for future templates)
  groomParents: z.string().optional(),
  brideParents: z.string().optional(),
  customMessage: z.string().max(500, 'Message must not exceed 500 characters').optional(),
})

export type InvitationData = z.infer<typeof invitationDataSchema>

// Create invitation request
export const createInvitationSchema = z.object({
  templateId: z.string().min(1, 'Template ID is required'),
  data: invitationDataSchema,
  paymentId: z.string().min(1, 'Payment ID is required'),
  paymentAmount: z.number().min(1, 'Payment amount must be positive'),
})

export type CreateInvitationRequest = z.infer<typeof createInvitationSchema>

// Update invitation request
export const updateInvitationSchema = z.object({
  data: invitationDataSchema.partial().optional(),
  status: z.enum(['draft', 'published', 'archived']).optional(),
  title: z.string().min(1).max(100).optional(),
}).refine(
  (data) => Object.keys(data).length > 0,
  'At least one field must be provided for update'
)

export type UpdateInvitationRequest = z.infer<typeof updateInvitationSchema>
```

---

## 🔐 AUTHENTICATION VALIDATION

**File:** `lib/validations/auth-schema.ts`

```typescript
import { z } from 'zod'

// Email validation
const emailSchema = z
  .string()
  .email('Invalid email address')
  .toLowerCase()
  .trim()

// Password validation
const passwordSchema = z
  .string()
  .min(6, 'Password must be at least 6 characters')
  .max(100, 'Password must not exceed 100 characters')
  .refine(
    (password) => /[A-Za-z]/.test(password),
    'Password must contain at least one letter'
  )

// Login schema
export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
})

export type LoginCredentials = z.infer<typeof loginSchema>

// Signup schema
export const signupSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must not exceed 50 characters')
    .trim()
    .refine(
      (name) => /^[a-zA-Z\s]+$/.test(name),
      'Name must contain only letters and spaces'
    ),
  
  email: emailSchema,
  
  password: passwordSchema,
  
  confirmPassword: z.string(),
}).refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  }
)

export type SignupCredentials = z.infer<typeof signupSchema>

// Password reset schema
export const passwordResetSchema = z.object({
  email: emailSchema,
})

export type PasswordResetRequest = z.infer<typeof passwordResetSchema>

// Update password schema
export const updatePasswordSchema = z.object({
  currentPassword: passwordSchema,
  newPassword: passwordSchema,
  confirmPassword: z.string(),
}).refine(
  (data) => data.newPassword === data.confirmPassword,
  {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  }
).refine(
  (data) => data.currentPassword !== data.newPassword,
  {
    message: "New password must be different from current password",
    path: ['newPassword'],
  }
)

export type UpdatePasswordRequest = z.infer<typeof updatePasswordSchema>
```

---

## 💳 PAYMENT VALIDATION

**File:** `lib/validations/payment-schema.ts`

```typescript
import { z } from 'zod'

// Checkout request schema
export const checkoutSchema = z.object({
  amount: z
    .number()
    .min(1, 'Amount must be at least ₹1')
    .max(100000, 'Amount must not exceed ₹1,00,000')
    .int('Amount must be a whole number'),
})

export type CheckoutRequest = z.infer<typeof checkoutSchema>

// Payment verification schema
export const paymentVerificationSchema = z.object({
  orderId: z.string().min(1, 'Order ID is required'),
  paymentId: z.string().min(1, 'Payment ID is required'),
  signature: z.string().min(1, 'Signature is required'),
})

export type PaymentVerificationRequest = z.infer<typeof paymentVerificationSchema>

// Razorpay order schema (from API response)
export const razorpayOrderSchema = z.object({
  id: z.string(),
  entity: z.literal('order'),
  amount: z.number(),
  amount_paid: z.number(),
  amount_due: z.number(),
  currency: z.string(),
  receipt: z.string(),
  status: z.enum(['created', 'attempted', 'paid']),
  attempts: z.number(),
  notes: z.record(z.any()),
  created_at: z.number(),
})

export type RazorpayOrder = z.infer<typeof razorpayOrderSchema>
```

---

## 👤 USER PROFILE VALIDATION

**File:** `lib/validations/profile-schema.ts`

```typescript
import { z } from 'zod'

// Phone number validation (Indian format)
const phoneSchema = z
  .string()
  .regex(/^(\+91)?[6-9]\d{9}$/, 'Invalid phone number (must be 10 digits starting with 6-9)')
  .transform((phone) => {
    // Normalize to +91XXXXXXXXXX format
    const cleaned = phone.replace(/[\s\-\(\)]/g, '')
    return cleaned.startsWith('+91') ? cleaned : `+91${cleaned}`
  })

// Update profile schema
export const updateProfileSchema = z.object({
  full_name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must not exceed 50 characters')
    .trim()
    .optional(),
  
  phone: phoneSchema.optional(),
  
  avatar_url: z
    .string()
    .url('Invalid avatar URL')
    .optional(),
}).refine(
  (data) => Object.keys(data).filter(key => data[key as keyof typeof data] !== undefined).length > 0,
  'At least one field must be provided'
)

export type UpdateProfileRequest = z.infer<typeof updateProfileSchema>
```

---

## 📧 CONTACT & EMAIL VALIDATION

**File:** `lib/validations/contact-schema.ts`

```typescript
import { z } from 'zod'

// Contact form schema
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must not exceed 50 characters')
    .trim(),
  
  email: z
    .string()
    .email('Invalid email address')
    .toLowerCase()
    .trim(),
  
  subject: z
    .string()
    .min(5, 'Subject must be at least 5 characters')
    .max(100, 'Subject must not exceed 100 characters')
    .trim(),
  
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must not exceed 1000 characters')
    .trim(),
})

export type ContactFormData = z.infer<typeof contactFormSchema>

// Send email schema
export const sendEmailSchema = z.object({
  invitationId: z.string().uuid('Invalid invitation ID'),
  recipients: z
    .array(z.string().email('Invalid email address'))
    .min(1, 'At least one recipient is required')
    .max(100, 'Maximum 100 recipients allowed'),
  message: z
    .string()
    .max(500, 'Message must not exceed 500 characters')
    .optional(),
})

export type SendEmailRequest = z.infer<typeof sendEmailSchema>
```

---

## 🎨 TEMPLATE VALIDATION

**File:** `lib/validations/template-schema.ts`

```typescript
import { z } from 'zod'

// Field config schema (for dynamic templates)
export const fieldConfigSchema = z.object({
  type: z.enum(['text', 'date', 'color', 'textarea', 'number', 'select']),
  label: z.string().min(1),
  required: z.boolean(),
  default: z.any().optional(),
  placeholder: z.string().optional(),
  validation: z.object({
    min: z.number().optional(),
    max: z.number().optional(),
    pattern: z.string().optional(),
    options: z.array(z.string()).optional(),
  }).optional(),
  helpText: z.string().optional(),
})

export type FieldConfig = z.infer<typeof fieldConfigSchema>

// Template config schema
export const templateConfigSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string(),
  category: z.string().min(1),
  fields: z.record(fieldConfigSchema),
})

export type TemplateConfig = z.infer<typeof templateConfigSchema>

// Create template schema (admin)
export const createTemplateSchema = z.object({
  template_id: z
    .string()
    .min(1)
    .regex(/^[a-z0-9-]+$/, 'Template ID must be lowercase alphanumeric with hyphens'),
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  category: z.enum(['traditional', 'modern', 'elegant', 'fun']),
  price_tier: z.enum(['free', 'basic', 'premium']),
  price: z.number().min(0).max(10000),
  thumbnail_url: z.string().url().optional(),
  preview_video_url: z.string().url().optional(),
  config: z.record(fieldConfigSchema),
  sort_order: z.number().int().min(0).optional(),
})

export type CreateTemplateRequest = z.infer<typeof createTemplateSchema>
```

---

## 📊 QUERY PARAMETERS VALIDATION

**File:** `lib/validations/query-schema.ts`

```typescript
import { z } from 'zod'

// Pagination schema
export const paginationSchema = z.object({
  page: z
    .string()
    .optional()
    .default('1')
    .transform(Number)
    .pipe(z.number().int().min(1)),
  
  pageSize: z
    .string()
    .optional()
    .default('10')
    .transform(Number)
    .pipe(z.number().int().min(1).max(100)),
  
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
})

export type PaginationParams = z.infer<typeof paginationSchema>

// Search schema
export const searchSchema = z.object({
  query: z.string().min(1).max(100),
  category: z.string().optional(),
  minPrice: z.string().optional().transform(Number),
  maxPrice: z.string().optional().transform(Number),
}).merge(paginationSchema)

export type SearchParams = z.infer<typeof searchSchema>
```

---

## 🛠️ VALIDATION HELPERS

**File:** `lib/validations/helpers.ts`

```typescript
import { ZodError } from 'zod'

// Format Zod errors for client
export function formatZodError(error: ZodError) {
  return error.errors.map((err) => ({
    field: err.path.join('.'),
    message: err.message,
  }))
}

// Validate and return typed data
export async function validateRequest<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): Promise<{ success: true; data: T } | { success: false; errors: any[] }> {
  try {
    const validated = await schema.parseAsync(data)
    return { success: true, data: validated }
  } catch (error) {
    if (error instanceof ZodError) {
      return { success: false, errors: formatZodError(error) }
    }
    return { success: false, errors: [{ field: 'unknown', message: 'Validation failed' }] }
  }
}

// Safe parse with default
export function safeParseWithDefault<T>(
  schema: z.ZodSchema<T>,
  data: unknown,
  defaultValue: T
): T {
  const result = schema.safeParse(data)
  return result.success ? result.data : defaultValue
}
```

---

## 🎯 USAGE EXAMPLES

### In API Routes

```typescript
import { createInvitationSchema } from '@/lib/validations/invitation-schema'
import { validateRequest } from '@/lib/validations/helpers'

export async function POST(req: NextRequest) {
  const body = await req.json()
  
  const validation = await validateRequest(createInvitationSchema, body)
  
  if (!validation.success) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid request data',
          details: validation.errors,
        },
      },
      { status: 400 }
    )
  }
  
  // Use validated data
  const { templateId, data, paymentId, paymentAmount } = validation.data
  
  // ... process request
}
```

---

### In React Hook Form

```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, type LoginCredentials } from '@/lib/validations/auth-schema'

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = (data: LoginCredentials) => {
    // data is fully typed and validated
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}
      
      <input {...register('password')} type="password" />
      {errors.password && <span>{errors.password.message}</span>}
      
      <button type="submit">Login</button>
    </form>
  )
}
```

---

### Server-Side Validation

```typescript
import { invitationDataSchema } from '@/lib/validations/invitation-schema'

export async function createInvitation(data: unknown) {
  // Parse and validate
  const validated = invitationDataSchema.parse(data)
  
  // validated is now typed and safe to use
  return validated
}
```

---

## ✅ VALIDATION BEST PRACTICES

### 1. Always Validate at Boundaries

```typescript
// ✅ GOOD: Validate API input
export async function POST(req: NextRequest) {
  const body = await req.json()
  const validated = schema.parse(body) // Throws if invalid
  // ...
}

// ❌ BAD: Trust input
export async function POST(req: NextRequest) {
  const body = await req.json()
  // Directly use body without validation
}
```

---

### 2. Use Type-Safe Schemas

```typescript
// ✅ GOOD: Export type from schema
export const userSchema = z.object({ name: z.string() })
export type User = z.infer<typeof userSchema>

// ❌ BAD: Separate type definition
export interface User { name: string }
export const userSchema = z.object({ name: z.string() })
```

---

### 3. Provide Clear Error Messages

```typescript
// ✅ GOOD: Descriptive messages
z.string()
  .min(2, 'Name must be at least 2 characters')
  .max(50, 'Name must not exceed 50 characters')

// ❌ BAD: Generic messages
z.string().min(2).max(50)
```

---

### 4. Transform Data When Needed

```typescript
// ✅ GOOD: Normalize data
z.string()
  .email()
  .toLowerCase()
  .trim()

// ❌ BAD: Expect perfect input
z.string().email()
```

---

### 5. Use Custom Refinements

```typescript
// ✅ GOOD: Business logic validation
z.string().refine(
  (date) => new Date(date) > new Date(),
  'Date must be in the future'
)

// ❌ BAD: Only basic validation
z.string()
```

---

## 📦 VALIDATION INDEX

**File:** `lib/validations/index.ts`

```typescript
export * from './invitation-schema'
export * from './auth-schema'
export * from './payment-schema'
export * from './profile-schema'
export * from './contact-schema'
export * from './template-schema'
export * from './query-schema'
export * from './helpers'
```

---

## ✅ VALIDATION CHECKLIST

- ✅ All forms have validation schemas
- ✅ All API routes validate input
- ✅ Error messages are user-friendly
- ✅ Types are inferred from schemas
- ✅ Validation helpers implemented
- ✅ Examples documented
- ✅ Edge cases handled
- ✅ Transformation applied where needed

---

All validation schemas are production-ready with comprehensive error handling.
