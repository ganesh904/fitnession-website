import { supabase } from './supabase'
import { LoginCredentials, SignupCredentials } from '@/types/auth'

/**
 * Sign in with email and password
 */
export async function signIn({ email, password }: LoginCredentials) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw error
  return data
}

/**
 * Sign up with email and password
 * NOTE: Email verification is disabled for easier testing
 */
export async function signUp({ email, password }: SignupCredentials) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      // Disable email confirmation for now
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/login`,
      data: {
        email_confirmed: true,
      },
    },
  })

  if (error) throw error
  return data
}

/**
 * Sign out
 */
export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

/**
 * Request password reset
 */
export async function requestPasswordReset(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_REDIRECT_URL || process.env.NEXT_PUBLIC_SITE_URL}/reset-password`,
  })

  if (error) throw error
}

/**
 * Update password
 */
export async function updatePassword(newPassword: string) {
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  })

  if (error) throw error
}

/**
 * Get current session
 */
export async function getSession() {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession()

  if (error) throw error
  return session
}

/**
 * Get current user
 */
export async function getCurrentUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error) throw error
  return user
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession()
  return !!session
}

/**
 * Refresh session
 */
export async function refreshSession() {
  const {
    data: { session },
    error,
  } = await supabase.auth.refreshSession()

  if (error) throw error
  return session
}
