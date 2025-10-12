// Payment Type Definitions

export interface Payment {
  id: string
  payment_id: string
  order_id: string
  user_id: string
  invitation_id?: string
  template_id: string
  amount: number
  status: 'processing' | 'completed' | 'refund_pending' | 'refunded' | 'failed'
  refund_id?: string
  refund_initiated_at?: string
  refunded_at?: string
  error_message?: string
  created_at: string
  updated_at: string
}

export interface RazorpayOrderOptions {
  amount: number
  currency: string
  receipt: string
  notes?: Record<string, any>
}

export interface RazorpayPaymentResponse {
  razorpay_payment_id: string
  razorpay_order_id: string
  razorpay_signature: string
}
