import { useEffect } from 'react'
import Head from 'next/head'

export default function LoginPage() {
  useEffect(() => {
    // Try to open mobile app
    const appScheme = 'fitnession://'
    window.location.href = appScheme

    // Show message after delay
    setTimeout(() => {
      alert('Please use the Fitnession mobile app to login.')
    }, 1000)
  }, [])

  return (
    <>
      <Head>
        <title>Login - Fitnession</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
          <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">📱</span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Open Fitnession App
          </h1>

          <p className="text-lg text-gray-600 mb-6">
            This website is for payment processing only. Please use the Fitnession mobile app to login and access all features.
          </p>

          <div className="space-y-3">
            <a
              href="fitnession://"
              className="block w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Open App
            </a>

            <p className="text-sm text-gray-500 mt-6">
              Don't have the app? Download it from Google Play Store or Apple App Store.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
