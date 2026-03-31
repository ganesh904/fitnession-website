import type { NextApiRequest, NextApiResponse } from 'next'
import { createRazorpayOrder, generateReceiptId } from '@/lib/razorpay'
import { verifyUserExists } from '@/lib/supabaseServer'
import { getPlanById } from '@/lib/plans'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { planId, userId, email, tier, duration } = req.body

    // Validate required fields
    if (!planId || !userId || !email) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // Verify user exists
    const userExists = await verifyUserExists(userId)
    if (!userExists) {
      return res.status(404).json({ error: 'User not found' })
    }

    // Get plan details
    const plan = getPlanById(planId)
    if (!plan) {
      return res.status(400).json({ error: 'Invalid plan ID' })
    }

    // Generate receipt ID
    const receipt = generateReceiptId(userId, planId)

    // Create Razorpay order
    const order = await createRazorpayOrder(
      plan.totalPrice,
      'INR',
      receipt
    )

    // Return order details
    return res.status(200).json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      planDetails: {
        tier,
        duration,
        price: plan.totalPrice,
      },
    })
  } catch (error: any) {
    console.error('Create order error:', error)
    return res.status(500).json({ error: 'Failed to create order', details: error.message })
  }
}
