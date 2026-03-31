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

    // Fetch all subscriptions for the user
    const { data: subscriptions, error } = await supabaseServer
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Failed to fetch subscriptions:', error)
      return res.status(500).json({ error: 'Failed to fetch subscriptions' })
    }

    return res.status(200).json({
      subscriptions: subscriptions || [],
    })
  } catch (error: any) {
    console.error('History fetch error:', error)
    return res.status(500).json({ error: 'Failed to fetch history', details: error.message })
  }
}
