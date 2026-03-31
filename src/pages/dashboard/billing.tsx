import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useAuth } from '@/hooks/useAuth'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import AuthGuard from '@/components/auth/AuthGuard'
import { Subscription } from '@/types/subscription'
import { formatPrice, getDurationLabel, getTierDetails } from '@/lib/plans'

export default function BillingPage() {
  const { user } = useAuth()
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user?.id) return

    // Fetch all subscriptions (active and past)
    fetch(`/api/subscription/history?userId=${user.id}`)
      .then(res => res.json())
      .then(data => {
        if (data.subscriptions) {
          setSubscriptions(data.subscriptions)
        }
      })
      .catch(err => console.error('Failed to fetch billing history:', err))
      .finally(() => setLoading(false))
  }, [user])

  return (
    <AuthGuard>
      <Head>
        <title>Billing History - Fitnession</title>
      </Head>

      <DashboardLayout>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">Billing History</h1>

          {loading ? (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto" />
            </div>
          ) : subscriptions.length > 0 ? (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Plan</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Duration</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Amount</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {subscriptions.map((sub) => (
                    <tr key={sub.id}>
                      <td className="px-6 py-4 text-gray-900">
                        {getTierDetails(sub.plan_tier).name}
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        {getDurationLabel(sub.plan_duration)}
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900">
                        {formatPrice(sub.amount_paid || 0)}
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        {new Date(sub.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                            sub.is_active
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {sub.is_active ? 'Active' : 'Expired'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <p className="text-gray-600">No billing history found</p>
            </div>
          )}
        </div>
      </DashboardLayout>
    </AuthGuard>
  )
}
