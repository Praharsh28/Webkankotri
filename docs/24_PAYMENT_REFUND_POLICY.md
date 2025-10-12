# 💳 PAYMENT & REFUND POLICY

**Customer-first approach with automatic refunds for failures**

---

## 🎯 POLICY STATEMENT

From user requirement:
> "I would like it to be no error but it still happens then yes we give refund customer first"

### Core Principles
1. **Customer First** - Refund immediately if something goes wrong
2. **Automatic When Possible** - No manual intervention needed
3. **Clear Communication** - Tell user exactly what happened
4. **Quick Resolution** - Process refunds within 24 hours

---

## 🔄 PAYMENT FLOW WITH ERROR HANDLING

### Happy Path

```
1. User selects template → 2. Payment initiated → 3. Payment successful → 
4. Invitation created → 5. PDF generated → 6. User gets access → ✅ COMPLETE
```

### Error Scenarios

```
Scenario A: Payment succeeds BUT invitation creation fails
  → Auto-refund + Error notification

Scenario B: Payment succeeds BUT PDF generation fails
  → Retry PDF generation (3 attempts)
  → If still fails → Auto-refund + Error notification

Scenario C: Payment gateway timeout
  → Check payment status
  → If charged → Process order OR refund

Scenario D: Duplicate payment
  → Auto-refund duplicate charge
```

---

## 🔧 IMPLEMENTATION

### 1. Payment Success Handler with Safety Checks

**File:** `app/api/payment/webhook/route.ts`

```typescript
import { NextResponse } from 'next/server'
import { createInvitation } from '@/lib/services/invitation-service'
import { processRefund } from '@/lib/services/refund-service'
import { sendRefundEmail, sendErrorEmail } from '@/lib/email/notifications'
import { supabase } from '@/lib/supabase/client'

export async function POST(request: Request) {
  try {
    const payload = await request.json()
    const paymentId = payload.payment_id
    const orderId = payload.order_id
    const amount = payload.amount / 100 // Convert from paise
    const userId = payload.notes.user_id
    const templateId = payload.notes.template_id

    // Step 1: Record payment in database
    const { data: payment, error: paymentError } = await supabase
      .from('payments')
      .insert({
        payment_id: paymentId,
        order_id: orderId,
        user_id: userId,
        amount,
        status: 'processing',
        template_id: templateId,
      })
      .select()
      .single()

    if (paymentError) {
      console.error('Payment record creation failed:', paymentError)
      // Critical: Payment succeeded but we can't track it
      await handleCriticalError(paymentId, userId, amount)
      return NextResponse.json({ error: 'Processing error' }, { status: 500 })
    }

    // Step 2: Create invitation
    try {
      const invitation = await createInvitation({
        user_id: userId,
        template_id: templateId,
        payment_id: paymentId,
      })

      // Step 3: Update payment status to completed
      await supabase
        .from('payments')
        .update({ status: 'completed', invitation_id: invitation.id })
        .eq('id', payment.id)

      // Step 4: Send success email
      await sendSuccessEmail(userId, invitation.id)

      return NextResponse.json({ success: true, invitation_id: invitation.id })

    } catch (invitationError) {
      console.error('Invitation creation failed:', invitationError)

      // CUSTOMER FIRST: Auto-refund
      await handleInvitationCreationFailure({
        paymentId,
        orderId,
        amount,
        userId,
        error: invitationError,
      })

      return NextResponse.json({ 
        error: 'Invitation creation failed, refund initiated',
        refund_initiated: true 
      }, { status: 500 })
    }

  } catch (error) {
    console.error('Payment webhook error:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}

async function handleInvitationCreationFailure(data: any) {
  const { paymentId, orderId, amount, userId, error } = data

  try {
    // 1. Mark payment for refund
    await supabase
      .from('payments')
      .update({ 
        status: 'refund_pending',
        error_message: error.message,
        refund_initiated_at: new Date().toISOString(),
      })
      .eq('payment_id', paymentId)

    // 2. Process refund via Razorpay
    const refund = await processRefund({
      paymentId,
      amount,
      reason: 'Invitation creation failed',
    })

    // 3. Update payment status
    await supabase
      .from('payments')
      .update({ 
        status: 'refunded',
        refund_id: refund.id,
        refunded_at: new Date().toISOString(),
      })
      .eq('payment_id', paymentId)

    // 4. Send refund notification email
    await sendRefundEmail(userId, {
      amount,
      reason: 'Technical error during invitation creation',
      refundId: refund.id,
    })

    // 5. Log for monitoring
    console.log(`Refund processed: ${refund.id} for payment: ${paymentId}`)

  } catch (refundError) {
    console.error('Auto-refund failed:', refundError)
    
    // CRITICAL: Manual intervention needed
    await notifyAdminForManualRefund({
      paymentId,
      userId,
      amount,
      originalError: error,
      refundError,
    })
  }
}

async function handleCriticalError(paymentId: string, userId: string, amount: number) {
  // This should NEVER happen, but if it does:
  // 1. Log to error tracking service (Sentry, etc.)
  // 2. Send immediate alert to admin
  // 3. Queue for manual review
  
  await supabase
    .from('critical_errors')
    .insert({
      payment_id: paymentId,
      user_id: userId,
      amount,
      error_type: 'payment_record_creation_failed',
      requires_manual_review: true,
    })

  // Send urgent notification
  await sendErrorEmail({
    to: process.env.ADMIN_EMAIL!,
    subject: 'URGENT: Payment Processing Critical Error',
    body: `Payment ${paymentId} succeeded but couldn't be tracked. Amount: ₹${amount}. User: ${userId}. IMMEDIATE ACTION REQUIRED.`,
  })
}
```

---

### 2. Refund Service

**File:** `lib/services/refund-service.ts`

```typescript
import Razorpay from 'razorpay'

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

interface ProcessRefundParams {
  paymentId: string
  amount: number
  reason: string
  notes?: Record<string, any>
}

export async function processRefund({
  paymentId,
  amount,
  reason,
  notes = {},
}: ProcessRefundParams) {
  try {
    // Process refund via Razorpay
    const refund = await razorpay.payments.refund(paymentId, {
      amount: amount * 100, // Convert to paise
      notes: {
        reason,
        ...notes,
      },
    })

    return {
      id: refund.id,
      status: refund.status,
      amount: refund.amount / 100,
      createdAt: new Date(refund.created_at * 1000),
    }
  } catch (error) {
    console.error('Razorpay refund error:', error)
    throw new Error(`Refund failed: ${error.message}`)
  }
}

export async function checkRefundStatus(refundId: string) {
  try {
    const refund = await razorpay.refunds.fetch(refundId)
    return {
      id: refund.id,
      status: refund.status,
      amount: refund.amount / 100,
    }
  } catch (error) {
    console.error('Refund status check error:', error)
    throw error
  }
}

export async function listRefundsForPayment(paymentId: string) {
  try {
    const refunds = await razorpay.payments.fetchAllRefunds(paymentId)
    return refunds.items.map((refund: any) => ({
      id: refund.id,
      status: refund.status,
      amount: refund.amount / 100,
      createdAt: new Date(refund.created_at * 1000),
    }))
  } catch (error) {
    console.error('List refunds error:', error)
    throw error
  }
}
```

---

### 3. Refund Email Notification

**File:** `lib/email/refund-notification.ts`

```typescript
import { Resend } from 'resend'
import { getAppUrl } from '@/lib/utils/urls'

const resend = new Resend(process.env.RESEND_API_KEY!)

export async function sendRefundEmail(
  userId: string,
  refundData: { amount: number; reason: string; refundId: string }
) {
  // Get user email
  const user = await getUserEmail(userId)

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #F97316; color: white; padding: 20px; text-align: center; }
          .content { background: #f9f9f9; padding: 30px; }
          .amount { font-size: 32px; font-weight: bold; color: #F97316; text-align: center; margin: 20px 0; }
          .button { display: inline-block; background: #F97316; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Refund Processed</h1>
          </div>
          <div class="content">
            <p>Dear Valued Customer,</p>
            
            <p>We sincerely apologize for the inconvenience. Due to a technical error, we were unable to process your invitation.</p>
            
            <p><strong>Your refund has been automatically processed:</strong></p>
            
            <div class="amount">₹${refundData.amount}</div>
            
            <p><strong>Refund Details:</strong></p>
            <ul>
              <li><strong>Amount:</strong> ₹${refundData.amount}</li>
              <li><strong>Refund ID:</strong> ${refundData.refundId}</li>
              <li><strong>Reason:</strong> ${refundData.reason}</li>
              <li><strong>Timeline:</strong> 5-7 business days to your account</li>
            </ul>
            
            <p>The amount will be credited back to your original payment method within 5-7 business days.</p>
            
            <p>We'd love to make this right. Please try again, and if you face any issues, contact our support team.</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${getAppUrl()}/templates" class="button">Try Again</a>
            </div>
            
            <p>If you have any questions, please reach out to us at <a href="mailto:support@ekankotri.com">support@ekankotri.com</a></p>
            
            <p>Thank you for your understanding.</p>
            
            <p>Best regards,<br>E-Kankotri Team</p>
          </div>
          <div class="footer">
            <p>This is an automated email. Please do not reply directly.</p>
            <p>&copy; ${new Date().getFullYear()} E-Kankotri. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `

  await resend.emails.send({
    from: 'E-Kankotri <noreply@ekankotri.com>',
    to: user.email,
    subject: 'Refund Processed - We Apologize',
    html,
  })
}

async function getUserEmail(userId: string) {
  // Fetch user email from Supabase
  const { data } = await supabase
    .from('users')
    .select('email')
    .eq('id', userId)
    .single()
  
  return data
}
```

---

### 4. Admin Dashboard for Manual Refunds

**File:** `app/(admin)/refunds/page.tsx`

```typescript
'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function RefundsPage() {
  const [refunds, setRefunds] = useState([])

  useEffect(() => {
    fetchPendingRefunds()
  }, [])

  const fetchPendingRefunds = async () => {
    const res = await fetch('/api/admin/refunds/pending')
    const data = await res.json()
    setRefunds(data)
  }

  const processManualRefund = async (paymentId: string, amount: number) => {
    if (!confirm(`Process refund of ₹${amount}?`)) return

    const res = await fetch('/api/admin/refunds/process', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paymentId, amount }),
    })

    if (res.ok) {
      alert('Refund processed successfully')
      fetchPendingRefunds()
    } else {
      alert('Refund processing failed')
    }
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Pending Refunds</h1>
      
      <div className="space-y-4">
        {refunds.map((refund: any) => (
          <Card key={refund.id} className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-lg">₹{refund.amount}</p>
                <p className="text-sm text-gray-600">Payment ID: {refund.payment_id}</p>
                <p className="text-sm text-gray-600">User: {refund.user_email}</p>
                <p className="text-sm text-red-600 mt-2">{refund.error_message}</p>
                <Badge variant="destructive" className="mt-2">
                  {refund.status}
                </Badge>
              </div>
              <Button
                variant="destructive"
                onClick={() => processManualRefund(refund.payment_id, refund.amount)}
              >
                Process Refund
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
```

---

## 📊 REFUND TRACKING

### Database Updates

```sql
-- Add refund columns to payments table
ALTER TABLE payments ADD COLUMN IF NOT EXISTS refund_id TEXT;
ALTER TABLE payments ADD COLUMN IF NOT EXISTS refund_initiated_at TIMESTAMPTZ;
ALTER TABLE payments ADD COLUMN IF NOT EXISTS refunded_at TIMESTAMPTZ;
ALTER TABLE payments ADD COLUMN IF NOT EXISTS error_message TEXT;

-- Create index for refund queries
CREATE INDEX idx_payments_refund_status ON payments(status) WHERE status IN ('refund_pending', 'refunded');
```

---

## ⚡ RETRY LOGIC (Before Refunding)

```typescript
async function createInvitationWithRetry(data: any, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const invitation = await createInvitation(data)
      return invitation
    } catch (error) {
      console.error(`Invitation creation attempt ${attempt} failed:`, error)
      
      if (attempt === maxRetries) {
        // All retries exhausted → Refund
        throw error
      }
      
      // Wait before retry (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, attempt * 1000))
    }
  }
}
```

---

## 📋 REFUND POLICY (Customer-Facing)

**Display on website:**

```markdown
## Our Refund Policy

We stand behind our service. If something goes wrong:

✅ **Automatic Refunds** - If we can't create your invitation due to a technical error, you'll receive an automatic refund within 5-7 business days.

✅ **No Questions Asked** - Technical failures are on us, not you.

✅ **Full Amount** - We refund the complete amount paid.

✅ **Fast Processing** - Refunds are initiated immediately and processed within 24 hours.

### When Do Refunds Apply?
- Payment succeeded but invitation creation failed
- Technical errors on our end
- Service unavailability

### Refund Timeline
- Refund initiated: Immediately (automated)
- Refund processed: Within 24 hours
- Money in your account: 5-7 business days (depends on your bank)

### Questions?
Contact us at support@ekankotri.com
```

---

## ✅ SUMMARY

**Customer-First Approach:**
1. ✅ Automatic refunds for technical failures
2. ✅ 3 retry attempts before refunding
3. ✅ Immediate email notifications
4. ✅ Clear communication
5. ✅ Admin dashboard for edge cases
6. ✅ Full amount refunded
7. ✅ 24-hour processing guarantee

---

**"Customer first" means refunds are automatic, fast, and hassle-free!**
