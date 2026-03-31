import Head from 'next/head'
import AuthLayout from '@/components/auth/AuthLayout'
import SignupForm from '@/components/auth/SignupForm'

export default function SignupPage() {
  return (
    <>
      <Head>
        <title>Sign Up - Fitnession</title>
        <meta name="description" content="Create your Fitnession account" />
      </Head>

      <AuthLayout
        title="Create Account"
        subtitle="Start your health journey today"
      >
        <SignupForm />
      </AuthLayout>
    </>
  )
}
