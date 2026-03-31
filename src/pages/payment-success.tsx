import { useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function PaymentSuccessPage() {
  const router = useRouter()
  const { subscriptionId } = router.query

  useEffect(() => {
    // Try to deep link to app
    const appScheme = process.env.NEXT_PUBLIC_APP_SCHEME || 'fitnession://'
    const deepLink = `${appScheme}payment-success?subscriptionId=${subscriptionId}`

    // Attempt to open app
    const timeout = setTimeout(() => {
      window.location.href = deepLink
    }, 500)

    return () => clearTimeout(timeout)
  }, [subscriptionId])

  return (
    <>
      <Head>
        <title>Payment Successful - Fitnession</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-primary-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Payment Successful! 🎉
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Your subscription has been activated successfully. You can now enjoy unlimited access to Mira AI coaching!
          </p>

          {/* Subscription ID */}
          {subscriptionId && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-500 mb-1">Subscription ID</p>
              <p className="text-xs font-mono text-gray-700">{subscriptionId}</p>
            </div>
          )}

          {/* Actions */}
          <div className="space-y-3">
            <a
              href={`${process.env.NEXT_PUBLIC_APP_SCHEME || 'fitnession://'}payment-success?subscriptionId=${subscriptionId}`}
              className="block w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Open Fitnession App
            </a>
            <Link
              href="/dashboard"
              className="block w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
            >
              View Dashboard
            </Link>
          </div>

          {/* Help Text */}
          <p className="text-sm text-gray-500 mt-6">
            If the app doesn't open automatically, click the button above to open it manually.
          </p>
        </div>
      </div>
    </>
  )
}
