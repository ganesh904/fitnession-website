import Head from 'next/head'
import AuthLayout from '@/components/auth/AuthLayout'
import ResetPasswordForm from '@/components/auth/ResetPasswordForm'

export default function ResetPasswordPage() {
  return (
    <>
      <Head>
        <title>Reset Password - Fitnession</title>
        <meta name="description" content="Create a new password for your account" />
      </Head>

      <AuthLayout
        title="Reset Password"
        subtitle="Enter your new password below"
      >
        <ResetPasswordForm />
      </AuthLayout>
    </>
  )
}
