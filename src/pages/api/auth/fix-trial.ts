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
    const { userId } = req.body

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' })
    }

    // Check if profile already exists
    const { data: existingProfile } = await supabaseServer
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (existingProfile) {
      return res.status(200).json({
        success: true,
        message: 'Profile already exists',
        profile: existingProfile
      })
    }

    // Create profile entry
    const { data: profile, error } = await supabaseServer
      .from('profiles')
      .insert({
        user_id: userId,
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating profile:', error)
      return res.status(500).json({ error: error.message })
    }

    return res.status(200).json({
      success: true,
      message: 'Profile created successfully - user can now use trial in mobile app',
      profile
    })
  } catch (error: any) {
    console.error('Fix profile error:', error)
    return res.status(500).json({
      error: 'Failed to create profile',
      details: error.message
    })
  }
}
