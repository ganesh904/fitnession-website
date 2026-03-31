import Head from 'next/head'
import AuthLayout from '@/components/auth/AuthLayout'
import LoginForm from '@/components/auth/LoginForm'

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Login - Fitnession</title>
        <meta name="description" content="Login to your Fitnession account" />
      </Head>

      <AuthLayout
        title="Welcome Back"
        subtitle="Sign in to continue to your dashboard"
      >
        <LoginForm />
      </AuthLayout>
    </>
  )
}
