import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please check your .env.local file.'
  )
}

// Browser client - used in React components
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
})

// Helper to check if Supabase is configured correctly
export async function checkSupabaseConnection() {
  try {
    const { error } = await supabase.from('profiles').select('count').limit(1)
    if (error) {
      console.error('Supabase connection error:', error)
      return false
    }
    return true
  } catch (error) {
    console.error('Supabase connection failed:', error)
    return false
  }
}
