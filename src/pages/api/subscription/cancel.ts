import type { NextApiRequest, NextApiResponse } from 'next'
import { supabaseServer } from '@/lib/supabaseServer'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { subscriptionId, userId } = req.body

    if (!subscriptionId || !userId) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // Update subscription to cancelled
    const { error } = await supabaseServer
      .from('subscriptions')
      .update({
        is_active: false,
        cancelled_at: new Date().toISOString(),
      })
      .eq('id', subscriptionId)
      .eq('user_id', userId)

    if (error) {
      console.error('Failed to cancel subscription:', error)
      return res.status(500).json({
        success: false,
        message: 'Failed to cancel subscription',
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Subscription cancelled successfully',
    })
  } catch (error: any) {
    console.error('Cancel subscription error:', error)
    return res.status(500).json({
      success: false,
      message: 'Error cancelling subscription',
      details: error.message,
    })
  }
}
