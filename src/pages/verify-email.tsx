import Head from 'next/head'
import Link from 'next/link'
import AuthLayout from '@/components/auth/AuthLayout'

export default function VerifyEmailPage() {
  return (
    <>
      <Head>
        <title>Verify Email - Fitnession</title>
        <meta name="description" content="Verify your email address" />
      </Head>

      <AuthLayout
        title="Verify Your Email"
        subtitle="We've sent you a verification link"
      >
        <div className="text-center space-y-6">
          <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-10 h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>

          <div className="space-y-2">
            <p className="text-gray-700">
              Please check your inbox and click the verification link to activate your account.
            </p>
            <p className="text-sm text-gray-500">
              Didn't receive the email? Check your spam folder or contact support.
            </p>
          </div>

          <div className="pt-4">
            <Link
              href="/login"
              className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Go to Login
            </Link>
          </div>
        </div>
      </AuthLayout>
    </>
  )
}
