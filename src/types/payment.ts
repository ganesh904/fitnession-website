export type PlanTier = 'smart' | 'premium'
export type PlanDuration = 1 | 3 | 6 | 12

export interface PricingOption {
  id: string
  duration: PlanDuration
  monthlyPrice: number
  totalPrice: number
  savingsPercent?: number
  popular?: boolean
  bestValue?: boolean
}

export interface PlanDetails {
  tier: PlanTier
  name: string
  name_hi: string
  tagline: string
  tagline_hi: string
  icon: string
  color: string
  features: string[]
  features_hi: string[]
}

export interface RazorpayOrder {
  id: string
  entity: string
  amount: number
  currency: string
  receipt: string
  status: string
}

export interface RazorpayPaymentResponse {
  razorpay_payment_id: string
  razorpay_order_id: string
  razorpay_signature: string
}

export interface CreateOrderRequest {
  planId: string
  userId: string
  email: string
  tier: PlanTier
  duration: PlanDuration
}

export interface CreateOrderResponse {
  orderId: string
  amount: number
  currency: string
  planDetails: {
    tier: PlanTier
    duration: PlanDuration
    price: number
  }
}

export interface VerifyPaymentRequest {
  razorpay_payment_id: string
  razorpay_order_id: string
  razorpay_signature: string
  userId: string
  planId: string
  tier: PlanTier
  duration: PlanDuration
}

export interface VerifyPaymentResponse {
  success: boolean
  subscriptionId?: string
  message: string
}

export interface PaymentError {
  code: string
  description: string
  source: string
  step: string
  reason: string
}
