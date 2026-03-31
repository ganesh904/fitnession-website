import Head from 'next/head'
import AuthLayout from '@/components/auth/AuthLayout'
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm'

export default function ForgotPasswordPage() {
  return (
    <>
      <Head>
        <title>Forgot Password - Fitnession</title>
        <meta name="description" content="Reset your Fitnession password" />
      </Head>

      <AuthLayout
        title="Forgot Password"
        subtitle="Enter your email to receive reset instructions"
      >
        <ForgotPasswordForm />
      </AuthLayout>
    </>
  )
}
