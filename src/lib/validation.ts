import { z } from 'zod'

// Email validation schema
export const emailSchema = z
  .string()
  .email('Please enter a valid email address')
  .min(1, 'Email is required')

// Password validation schema
export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')

// Login form validation
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
})

// Signup form validation
export const signupSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

// Forgot password form validation
export const forgotPasswordSchema = z.object({
  email: emailSchema,
})

// Reset password form validation
export const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

// Payment form validation
export const paymentFormSchema = z.object({
  planId: z.string().min(1, 'Please select a plan'),
  tier: z.enum(['smart', 'premium']),
  duration: z.union([z.literal(1), z.literal(3), z.literal(12)]),
})

// Helper to validate email
export function isValidEmail(email: string): boolean {
  try {
    emailSchema.parse(email)
    return true
  } catch {
    return false
  }
}

// Helper to check password strength
export function getPasswordStrength(password: string): {
  score: number
  label: string
  color: string
} {
  let score = 0

  if (password.length >= 8) score++
  if (password.length >= 12) score++
  if (/[A-Z]/.test(password)) score++
  if (/[a-z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++

  if (score <= 2) {
    return { score, label: 'Weak', color: '#F44336' }
  } else if (score <= 4) {
    return { score, label: 'Medium', color: '#FF9800' }
  } else {
    return { score, label: 'Strong', color: '#4CAF50' }
  }
}

// Helper to get error message from Zod error
export function getErrorMessage(error: z.ZodError, field: string): string | undefined {
  const fieldError = error.issues.find((e) => e.path[0] === field)
  return fieldError?.message
}
