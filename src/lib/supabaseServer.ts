import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error(
    'Missing Supabase server environment variables. Please check SUPABASE_SERVICE_ROLE_KEY in .env.local'
  )
}

// Server-side client with service role key - only use in API routes
// Has admin privileges, bypasses RLS
export const supabaseServer = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

// Helper to verify user exists
export async function verifyUserExists(userId: string): Promise<boolean> {
  try {
    // Use Auth API to verify user exists
    const { data, error } = await supabaseServer.auth.admin.getUserById(userId)

    if (error) {
      console.error('Error verifying user:', error)
      return false
    }

    return !!data?.user
  } catch (error) {
    console.error('User verification failed:', error)
    return false
  }
}

// Helper to get user email
export async function getUserEmail(userId: string): Promise<string | null> {
  try {
    const { data, error } = await supabaseServer.auth.admin.getUserById(userId)

    if (error || !data?.user) {
      console.error('Error getting user email:', error)
      return null
    }

    return data.user.email || null
  } catch (error) {
    console.error('Get user email failed:', error)
    return null
  }
}
