import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PlanCard from '@/components/payment/PlanCard'
import PricingTable from '@/components/payment/PricingTable'
import TrialBanner from '@/components/payment/TrialBanner'
import { useAuth } from '@/hooks/useAuth'
import { PLAN_TIERS, SMART_PLANS, PREMIUM_PLANS, getTierDetails } from '@/lib/plans'
import { PlanTier, PricingOption } from '@/types/payment'

export default function PremiumPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [selectedTier, setSelectedTier] = useState<PlanTier>('smart')
  const [selectedPlan, setSelectedPlan] = useState<PricingOption | null>(null)
  const [userId, setUserId] = useState<string>('')
  const [userEmail, setUserEmail] = useState<string>('')

  // Parse query parameters
  useEffect(() => {
    const { plan, userId: qUserId, email, tier } = router.query

    // Set tier from URL or default to smart
    if (tier && (tier === 'smart' || tier === 'premium')) {
      setSelectedTier(tier as PlanTier)
    }

    // Set userId from URL or from logged-in user
    if (qUserId && typeof qUserId === 'string') {
      setUserId(qUserId)
    } else if (user?.id) {
      setUserId(user.id)
    }

    // Set email from URL or from logged-in user
    if (email && typeof email === 'string') {
      setUserEmail(email)
    } else if (user?.email) {
      setUserEmail(user.email)
    }

    // Pre-select plan from URL
    if (plan && typeof plan === 'string') {
      const allPlans = [...SMART_PLANS, ...PREMIUM_PLANS]
      const matchedPlan = allPlans.find(p => p.id === plan)
      if (matchedPlan) {
        setSelectedPlan(matchedPlan)
      }
    }
  }, [router.query, user])

  const currentPlans = selectedTier === 'smart' ? SMART_PLANS : PREMIUM_PLANS
  const tierInfo = getTierDetails(selectedTier)

  return (
    <>
      <Head>
        <title>Premium Plans - Fitnession</title>
        <meta name="description" content="Upgrade to Fitnession Premium and unlock unlimited AI coaching" />
      </Head>

      <Header />

      <main className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Trial Banner */}
          {userId && <TrialBanner userId={userId} />}

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Choose Your Plan
            </h1>
            <p className="text-xl text-gray-600">
              Unlock unlimited AI health coaching and achieve your goals faster
            </p>
          </div>

          {/* Tier Selector */}
          <div className="flex justify-center mb-12">
            <div className="bg-white rounded-2xl shadow-lg p-2 inline-flex space-x-2">
              <button
                onClick={() => {
                  setSelectedTier('smart')
                  setSelectedPlan(null)
                }}
                className={`px-8 py-3 rounded-xl font-semibold transition-all ${
                  selectedTier === 'smart'
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                ⚡ Smart Plan
              </button>
              <button
                onClick={() => {
                  setSelectedTier('premium')
                  setSelectedPlan(null)
                }}
                className={`px-8 py-3 rounded-xl font-semibold transition-all ${
                  selectedTier === 'premium'
                    ? 'bg-secondary-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                👑 Premium Plan
              </button>
            </div>
          </div>

          {/* Plan Details Card */}
          <div className="max-w-4xl mx-auto mb-12">
            <div
              className="bg-white rounded-2xl shadow-xl p-8 border-2"
              style={{ borderColor: tierInfo.color }}
            >
              <div className="text-center mb-6">
                <span className="text-5xl mb-4 inline-block">{tierInfo.icon}</span>
                <h2 className="text-3xl font-bold text-gray-900">{tierInfo.name}</h2>
                <p className="text-gray-600 mt-2">{tierInfo.tagline}</p>
              </div>

              {/* Features */}
              <div className="grid md:grid-cols-2 gap-4">
                {tierInfo.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <span className="text-green-500 text-xl">✓</span>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="max-w-4xl mx-auto mb-12">
            <h3 className="text-2xl font-bold text-center mb-8 text-gray-900">
              Select Duration
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {currentPlans.map((plan) => (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  tier={selectedTier}
                  isSelected={selectedPlan?.id === plan.id}
                  onSelect={setSelectedPlan}
                  userId={userId}
                  userEmail={userEmail}
                />
              ))}
            </div>
          </div>

          {/* Comparison Table */}
          <div className="max-w-5xl mx-auto">
            <PricingTable />
          </div>

          {/* Trust Indicators */}
          <div className="max-w-4xl mx-auto mt-12">
            <div className="bg-blue-50 rounded-2xl p-6 flex items-center justify-center space-x-8 flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🔒</span>
                <span className="text-sm text-gray-700">Secure Payment</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🛡️</span>
                <span className="text-sm text-gray-700">7-Day Money Back</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl">⚡</span>
                <span className="text-sm text-gray-700">Instant Activation</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
