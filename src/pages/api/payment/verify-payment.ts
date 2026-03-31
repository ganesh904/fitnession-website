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

    // Validate required fields
    if (
      !razorpay_payment_id ||
      !razorpay_order_id ||
      !razorpay_signature ||
      !userId ||
      !planId
    ) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // CRITICAL: Verify Razorpay signature
    const isValid = verifyRazorpaySignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    )

    if (!isValid) {
      console.error('Invalid Razorpay signature')
      return res.status(400).json({
        success: false,
        message: 'Payment verification failed',
      })
    }

    // Get plan details
    const plan = getPlanById(planId)
    if (!plan) {
      return res.status(400).json({ error: 'Invalid plan ID' })
    }

    // Calculate subscription dates
    const startDate = new Date()
    const endDate = calculateEndDate(startDate, duration)

    // Save subscription to database
    const { data: subscription, error: subError } = await supabaseServer
      .from('subscriptions')
      .insert({
        user_id: userId,
        plan_tier: tier,
        plan_duration: duration,
        start_date: startDate.toISOString(),
        end_date: endDate.toISOString(),
        is_active: true,
        payment_id: razorpay_payment_id,
        order_id: razorpay_order_id,
        amount_paid: plan.totalPrice,
      })
      .select()
      .single()

    if (subError) {
      console.error('Failed to save subscription:', subError)
      return res.status(500).json({
        success: false,
        message: 'Failed to save subscription',
      })
    }

    // Return success
    return res.status(200).json({
      success: true,
      subscriptionId: subscription.id,
      message: 'Payment verified and subscription activated',
    })
  } catch (error: any) {
    console.error('Verify payment error:', error)
    return res.status(500).json({
      success: false,
      message: 'Payment verification failed',
      details: error.message,
    })
  }
}
