import { useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function PaymentFailedPage() {
  const router = useRouter()
  const { reason, orderId } = router.query

  useEffect(() => {
    // Notify app of failure via deep link
    const appScheme = process.env.NEXT_PUBLIC_APP_SCHEME || 'fitnession://'
    const deepLink = `${appScheme}payment-failed?reason=${reason || 'unknown'}`

    // Attempt to open app after a delay
    const timeout = setTimeout(() => {
      window.location.href = deepLink
    }, 1000)

    return () => clearTimeout(timeout)
  }, [reason])

  return (
    <>
      <Head>
        <title>Payment Failed - Fitnession</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
          {/* Error Icon */}
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>

          {/* Error Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Payment Failed
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            {reason === 'cancelled'
              ? 'You cancelled the payment process.'
              : reason === 'timeout'
              ? 'The payment session timed out. Please try again.'
              : 'We could not process your payment. Please try again or contact support if the issue persists.'}
          </p>

          {/* Order ID */}
          {orderId && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-500 mb-1">Order ID</p>
              <p className="text-xs font-mono text-gray-700">{orderId}</p>
            </div>
          )}

          {/* Common Reasons */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6 text-left">
            <p className="text-sm font-semibold text-orange-900 mb-2">Common reasons for payment failure:</p>
            <ul className="text-xs text-orange-800 space-y-1">
              <li>• Insufficient balance in your account</li>
              <li>• Incorrect card details or OTP</li>
              <li>• Payment cancelled by user</li>
              <li>• Network connectivity issues</li>
              <li>• Bank declined the transaction</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Link
              href="/premium"
              className="block w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Retry Payment
            </Link>
            <a
              href={`${process.env.NEXT_PUBLIC_APP_SCHEME || 'fitnession://'}payment-failed?reason=${reason || 'unknown'}`}
              className="block w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
            >
              Return to App
            </a>
            <a
              href="mailto:support@fitnession.com"
              className="block w-full border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:border-gray-400 transition-colors"
            >
              Contact Support
            </a>
          </div>

          {/* Help Text */}
          <p className="text-sm text-gray-500 mt-6">
            Need help? Contact us at support@fitnession.com
          </p>
        </div>
      </div>
    </>
  )
}
