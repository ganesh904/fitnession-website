import { User, Session } from '@supabase/supabase-js'

export interface AuthUser extends User {
  email?: string
  user_metadata?: {
    full_name?: string
    avatar_url?: string
  }
}

export interface AuthSession extends Session {
  user: AuthUser
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface SignupCredentials {
  email: string
  password: string
  confirmPassword?: string
}

export interface ResetPasswordData {
  password: string
  confirmPassword: string
}

export interface AuthContextType {
  user: AuthUser | null
  session: AuthSession | null
  loading: boolean
  signIn: (credentials: LoginCredentials) => Promise<void>
  signUp: (credentials: SignupCredentials) => Promise<void>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  updatePassword: (newPassword: string) => Promise<void>
}

export interface AuthError {
  message: string
  status?: number
}
