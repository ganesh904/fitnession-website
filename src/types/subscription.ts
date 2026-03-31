import { PlanTier, PlanDuration } from './payment'

export interface Subscription {
  id: string
  user_id: string
  plan_tier: PlanTier
  plan_duration: PlanDuration
  start_date: string
  end_date: string
  is_active: boolean
  payment_id?: string
  order_id?: string
  amount_paid?: number
  cancelled_at?: string | null
  created_at: string
  updated_at: string
}

export interface SubscriptionStatus {
  hasSubscription: boolean
  isActive: boolean
  subscription?: Subscription
  daysRemaining?: number
  expiryDate?: string
}

export interface TrialStatus {
  isActive: boolean
  daysRemaining: number
  trialStartDate: string | null
  hasActiveSubscription: boolean
  canAccessMira: boolean
  reason: 'trial' | 'subscription' | 'expired' | 'never_started'
}

export interface PaymentHistoryItem {
  id: string
  user_id: string
  subscription_id: string
  payment_id: string
  order_id: string
  amount: number
  currency: string
  status: 'success' | 'failed' | 'pending'
  plan_tier: PlanTier
  plan_duration: PlanDuration
  payment_method?: string
  created_at: string
}

export interface CancelSubscriptionRequest {
  subscriptionId: string
  userId: string
  reason?: string
}

export interface CancelSubscriptionResponse {
  success: boolean
  message: string
}
