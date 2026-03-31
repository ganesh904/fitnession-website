import type { NextApiRequest, NextApiResponse } from 'next'
import { supabaseServer } from '@/lib/supabaseServer'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { userId } = req.query

    if (!userId || typeof userId !== 'string') {
      return res.status(400).json({ error: 'User ID is required' })
    }

    // Check for active subscription
    const { data: subscription } = await supabaseServer
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .eq('is_active', true)
      .single()

    if (subscription) {
      const endDate = new Date(subscription.end_date)
      const now = new Date()
      const daysRemaining = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

      return res.status(200).json({
        hasSubscription: true,
        isActive: endDate > now,
        subscription,
        daysRemaining,
        expiryDate: subscription.end_date,
      })
    }

    // Check trial status
    const { data: trialData } = await supabaseServer.rpc('get_trial_status', {
      p_user_id: userId,
    })

    const trial = trialData?.[0]

    if (trial) {
      return res.status(200).json({
        hasSubscription: false,
        isActive: false,
        trialStatus: {
          isActive: trial.is_trial_active,
          daysRemaining: trial.days_remaining,
          trialStartDate: trial.trial_start_date,
          hasActiveSubscription: false,
          canAccessMira: trial.is_trial_active,
          reason: trial.is_trial_active ? 'trial' : 'expired',
        },
      })
    }

    // No subscription, no trial
    return res.status(200).json({
      hasSubscription: false,
      isActive: false,
      trialStatus: {
        isActive: false,
        daysRemaining: 0,
        trialStartDate: null,
        hasActiveSubscription: false,
        canAccessMira: false,
        reason: 'never_started',
      },
    })
  } catch (error: any) {
    console.error('Status check error:', error)
    return res.status(500).json({ error: 'Failed to check status', details: error.message })
  }
}
