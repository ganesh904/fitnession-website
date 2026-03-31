import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useAuth } from '@/hooks/useAuth'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import AuthGuard from '@/components/auth/AuthGuard'
import { Subscription } from '@/types/subscription'
import { formatPrice, getDurationLabel, getTierDetails } from '@/lib/plans'
import Link from 'next/link'
import toast from 'react-hot-toast'

export default function DashboardPage() {
  const { user } = useAuth()
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user?.id) return

    fetch(`/api/subscription/status?userId=${user.id}`)
      .then(res => res.json())
      .then(data => {
        if (data.subscription) {
          setSubscription(data.subscription)
        }
      })
      .catch(err => console.error('Failed to fetch subscription:', err))
      .finally(() => setLoading(false))
  }, [user])

  const handleCancelSubscription = async () => {
    if (!subscription || !user) return

    const confirmed = confirm('Are you sure you want to cancel your subscription?')
    if (!confirmed) return

    try {
      const res = await fetch('/api/subscription/cancel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subscriptionId: subscription.id, userId: user.id }),
      })

      const data = await res.json()

      if (data.success) {
        toast.success('Subscription cancelled')
        setSubscription({ ...subscription, is_active: false, cancelled_at: new Date().toISOString() })
      } else {
        toast.error('Failed to cancel subscription')
      }
    } catch (error) {
      toast.error('Error cancelling subscription')
    }
  }

  return (
    <AuthGuard>
      <Head>
        <title>Dashboard - Fitnession</title>
      </Head>

      <DashboardLayout>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">My Subscription</h1>

          {loading ? (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto" />
            </div>
          ) : subscription && subscription.is_active ? (
            <div className="bg-white rounded-xl shadow-sm p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <span className="inline-block px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4">
                    ✓ Active
                  </span>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {getTierDetails(subscription.plan_tier).name}
                  </h2>
                  <p className="text-gray-600">{getDurationLabel(subscription.plan_duration)} Plan</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-900">
                    {formatPrice(subscription.amount_paid || 0)}
                  </div>
                  <div className="text-sm text-gray-500">
                    /{getDurationLabel(subscription.plan_duration)}
                  </div>
                </div>
              </div>

              <div className="border-t pt-6 space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Start Date</span>
                  <span className="font-semibold text-gray-900">
                    {new Date(subscription.start_date).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Expiry Date</span>
                  <span className="font-semibold text-gray-900">
                    {new Date(subscription.end_date).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Days Remaining</span>
                  <span className="font-semibold text-gray-900">
                    {Math.max(0, Math.ceil((new Date(subscription.end_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))} days
                  </span>
                </div>
              </div>

              <div className="mt-8 flex space-x-4">
                <Link
                  href="/premium"
                  className="flex-1 bg-primary-600 text-white py-3 rounded-lg font-semibold text-center hover:bg-primary-700 transition-colors"
                >
                  Upgrade Plan
                </Link>
                {!subscription.cancelled_at && (
                  <button
                    onClick={handleCancelSubscription}
                    className="flex-1 bg-red-50 text-red-600 py-3 rounded-lg font-semibold hover:bg-red-100 transition-colors"
                  >
                    Cancel Subscription
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">💳</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Active Subscription</h3>
              <p className="text-gray-600 mb-6">
                Upgrade to premium to unlock unlimited AI coaching
              </p>
              <Link
                href="/premium"
                className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                View Plans
              </Link>
            </div>
          )}
        </div>
      </DashboardLayout>
    </AuthGuard>
  )
}
