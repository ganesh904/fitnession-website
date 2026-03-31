import { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { supabase } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'
import toast, { Toaster } from 'react-hot-toast'

interface Subscription {
  id: string
  plan_tier: string
  plan_duration: string
  is_active: boolean
  start_date: string
  end_date: string
  razorpay_payment_id?: string
  created_at: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    try {
      // Check if user is logged in
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        router.push('/login?redirect=/dashboard')
        return
      }

      setUser(user)

      // Fetch subscription
      const { data: sub, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .single()

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching subscription:', error)
      }

      setSubscription(sub)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      toast.error('Logout failed')
    } else {
      toast.success('Logged out successfully')
      router.push('/login')
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const getDaysRemaining = (endDate: string) => {
    const end = new Date(endDate)
    const now = new Date()
    const diff = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    return diff
  }

  const getPlanName = (tier: string, duration: string) => {
    const tierName = tier === 'smart' ? 'Smart' : 'Premium'
    const durationMap: { [key: string]: string } = {
      '1month': '1 Month',
      '3months': '3 Months',
      '6months': '6 Months',
      '12months': '12 Months',
    }
    return `${tierName} - ${durationMap[duration] || duration}`
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Dashboard - Fitnession</title>
      </Head>

      <Toaster position="top-center" />

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-primary-600">Fitnession</h1>
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome back, {user?.user_metadata?.full_name || 'User'}! 👋
            </h2>
            <p className="text-gray-600">{user?.email}</p>
          </div>

          {/* Subscription Card */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Your Subscription</h3>

            {subscription ? (
              <div>
                {/* Active Subscription */}
                <div className="border-l-4 border-green-500 bg-green-50 p-4 rounded mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-sm font-semibold text-green-800">ACTIVE</p>
                      <p className="text-lg font-bold text-gray-900">
                        {getPlanName(subscription.plan_tier, subscription.plan_duration)}
                      </p>
                    </div>
                    <div className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      ✓ Premium Access
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <p className="text-xs text-gray-600">Start Date</p>
                      <p className="font-semibold">{formatDate(subscription.start_date)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">End Date</p>
                      <p className="font-semibold">{formatDate(subscription.end_date)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Days Remaining</p>
                      <p className="font-semibold text-green-600">
                        {getDaysRemaining(subscription.end_date)} days
                      </p>
                    </div>
                    {subscription.razorpay_payment_id && (
                      <div>
                        <p className="text-xs text-gray-600">Payment ID</p>
                        <p className="font-mono text-xs truncate">
                          {subscription.razorpay_payment_id}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Features */}
                <div className="bg-gray-50 rounded p-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Your Benefits:</p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      Unlimited AI Coach Chat (Mira)
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      Personalized Workout & Meal Plans
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      Gym Exercise Tracking
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      Women's Health Tracking (if applicable)
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      Premium Support
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">📦</div>
                <p className="text-gray-600 mb-4">You don't have an active subscription</p>
                <Link
                  href="/premium"
                  className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                >
                  View Premium Plans
                </Link>
              </div>
            )}
          </div>

          {/* Download App Card */}
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg shadow p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">Download Our Mobile App</h3>
                <p className="text-primary-100 mb-4">
                  Get the full Fitnession experience on your phone!
                </p>
                <ul className="space-y-1 text-sm text-primary-100">
                  <li>• Chat with AI coaches anywhere</li>
                  <li>• Track workouts and meals on the go</li>
                  <li>• Get personalized health insights</li>
                  <li>• Push notifications for reminders</li>
                </ul>
              </div>
              <div className="text-6xl">📱</div>
            </div>
            <div className="mt-4 flex gap-3">
              <a
                href="#"
                className="bg-white text-primary-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm"
              >
                🍎 App Store
              </a>
              <a
                href="#"
                className="bg-white text-primary-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm"
              >
                🤖 Play Store
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/premium"
              className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow"
            >
              <div className="text-2xl mb-2">👑</div>
              <h4 className="font-semibold text-gray-900">Premium Plans</h4>
              <p className="text-sm text-gray-600">Upgrade or renew subscription</p>
            </Link>

            <a
              href="mailto:support@fitnession.fit"
              className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow"
            >
              <div className="text-2xl mb-2">💬</div>
              <h4 className="font-semibold text-gray-900">Support</h4>
              <p className="text-sm text-gray-600">Contact our support team</p>
            </a>

            <a
              href="fitnession://"
              className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow"
            >
              <div className="text-2xl mb-2">🚀</div>
              <h4 className="font-semibold text-gray-900">Open App</h4>
              <p className="text-sm text-gray-600">Launch Fitnession mobile app</p>
            </a>
          </div>
        </main>
      </div>
    </>
  )
}
