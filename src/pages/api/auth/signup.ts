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
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }

    // Create user with auto-confirmed email using admin API
    const { data, error } = await supabaseServer.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm email
    })

    if (error) {
      console.error('Signup error:', error)
      return res.status(400).json({ error: error.message })
    }

    // Create profile entry for the user
    const userId = data.user.id

    const { error: profileError } = await supabaseServer
      .from('profiles')
      .insert({
        user_id: userId,
      })

    if (profileError) {
      console.error('Error creating profile:', profileError)
      // Don't fail the signup if profile creation fails
    }

    return res.status(200).json({
      success: true,
      user: data.user,
      message: 'Account created successfully'
    })
  } catch (error: any) {
    console.error('Signup error:', error)
    return res.status(500).json({
      error: 'Failed to create account',
      details: error.message
    })
  }
}
