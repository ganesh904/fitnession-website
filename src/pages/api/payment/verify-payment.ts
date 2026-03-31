import type { NextApiRequest, NextApiResponse } from 'next'
import { verifyRazorpaySignature } from '@/lib/razorpay'
import { supabaseServer } from '@/lib/supabaseServer'
import { getPlanById, calculateEndDate } from '@/lib/plans'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      userId,
      planId,
      tier,
      duration,
    } = req.body

    console.log('[Verify Payment] Request received:', {
      razorpay_payment_id,
      razorpay_order_id,
      userId,
      planId,
      tier,
      duration,
      hasSignature: !!razorpay_signature,
    })

    // Validate required fields
    if (
      !razorpay_payment_id ||
      !razorpay_order_id ||
      !razorpay_signature ||
      !userId ||
      !planId
    ) {
      console.error('[Verify Payment] Missing required fields:', {
        razorpay_payment_id: !!razorpay_payment_id,
        razorpay_order_id: !!razorpay_order_id,
        razorpay_signature: !!razorpay_signature,
        userId: !!userId,
        planId: !!planId,
      })
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // CRITICAL: Verify Razorpay signature
    console.log('[Verify Payment] Verifying Razorpay signature...')
    const isValid = verifyRazorpaySignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    )

    console.log('[Verify Payment] Signature verification result:', isValid)

    if (!isValid) {
      console.error('[Verify Payment] Invalid Razorpay signature', {
        order_id: razorpay_order_id,
        payment_id: razorpay_payment_id,
      })
      return res.status(400).json({
        success: false,
        message: 'Payment verification failed - Invalid signature',
      })
    }

    console.log('[Verify Payment] Signature verified successfully')

    // Get plan details
    console.log('[Verify Payment] Getting plan details for:', planId)
    const plan = getPlanById(planId)
    if (!plan) {
      console.error('[Verify Payment] Invalid plan ID:', planId)
      return res.status(400).json({ error: 'Invalid plan ID' })
    }
    console.log('[Verify Payment] Plan found:', { tier, duration, price: plan.totalPrice })

    // Calculate subscription dates
    const startDate = new Date()
    const endDate = calculateEndDate(startDate, duration)
    console.log('[Verify Payment] Subscription dates:', {
      start: startDate.toISOString(),
      end: endDate.toISOString(),
    })

    // Save subscription to database
    console.log('[Verify Payment] Saving subscription to database...')
    const subscriptionData = {
      user_id: userId,
      plan_tier: tier,
      plan_duration: duration,
      start_date: startDate.toISOString(),
      end_date: endDate.toISOString(),
      is_active: true,
      payment_id: razorpay_payment_id,
      order_id: razorpay_order_id,
      amount_paid: plan.totalPrice,
    }
    console.log('[Verify Payment] Subscription data:', subscriptionData)

    const { data: subscription, error: subError } = await supabaseServer
      .from('subscriptions')
      .insert(subscriptionData)
      .select()
      .single()

    if (subError) {
      console.error('[Verify Payment] Failed to save subscription:', {
        error: subError,
        code: subError.code,
        message: subError.message,
        details: subError.details,
      })
      return res.status(500).json({
        success: false,
        message: 'Failed to save subscription',
        error: subError.message,
      })
    }

    console.log('[Verify Payment] Subscription saved successfully:', subscription.id)

    // Return success
    return res.status(200).json({
      success: true,
      subscriptionId: subscription.id,
      message: 'Payment verified and subscription activated',
    })
  } catch (error: any) {
    console.error('[Verify Payment] Unexpected error:', {
      message: error.message,
      stack: error.stack,
      error: JSON.stringify(error, null, 2),
    })
    return res.status(500).json({
      success: false,
      message: 'Payment verification failed',
      details: error.message,
    })
  }
}
