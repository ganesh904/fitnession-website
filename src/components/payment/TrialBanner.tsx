import { useEffect, useState } from 'react'
import { TrialStatus } from '@/types/subscription'

interface TrialBannerProps {
  userId: string
}

export default function TrialBanner({ userId }: TrialBannerProps) {
  const [trialStatus, setTrialStatus] = useState<TrialStatus | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) return

    // Fetch trial status
    fetch(`/api/subscription/status?userId=${userId}`)
      .then(res => res.json())
      .then(data => {
        if (data.trialStatus) {
          setTrialStatus(data.trialStatus)
        }
      })
      .catch(err => console.error('Failed to fetch trial status:', err))
      .finally(() => setLoading(false))
  }, [userId])

  if (loading || !trialStatus) {
    return null
  }

  // Don't show banner if user has active subscription
  if (trialStatus.hasActiveSubscription) {
    return (
      <div className="max-w-4xl mx-auto mb-8">
        <div className="bg-green-500 text-white rounded-2xl p-4 text-center">
          <p className="font-semibold">✨ You already have an active subscription!</p>
        </div>
      </div>
    )
  }

  // Show trial status
  if (trialStatus.isActive) {
    return (
      <div className="max-w-4xl mx-auto mb-8">
        <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-2xl p-6 text-center">
          <p className="text-lg font-semibold mb-2">
            🎁 {trialStatus.daysRemaining} Day{trialStatus.daysRemaining !== 1 ? 's' : ''} Free Trial Remaining
          </p>
          <p className="text-sm opacity-90">
            Upgrade now to continue enjoying unlimited Mira AI coaching after your trial ends
          </p>
        </div>
      </div>
    )
  }

  // Trial expired
  if (trialStatus.reason === 'expired') {
    return (
      <div className="max-w-4xl mx-auto mb-8">
        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl p-6 text-center">
          <p className="text-lg font-semibold mb-2">
            ⏰ Your Free Trial Has Ended
          </p>
          <p className="text-sm opacity-90">
            Upgrade to premium to continue chatting with Mira and achieve your health goals
          </p>
        </div>
      </div>
    )
  }

  return null
}
