import { useState } from 'react'
import { PricingOption, PlanTier } from '@/types/payment'
import { formatPrice, getDurationLabel, getTierDetails } from '@/lib/plans'
import PaymentButton from './PaymentButton'

interface PlanCardProps {
  plan: PricingOption
  tier: PlanTier
  isSelected: boolean
  onSelect: (plan: PricingOption) => void
  userId: string
  userEmail: string
}

export default function PlanCard({
  plan,
  tier,
  isSelected,
  onSelect,
  userId,
  userEmail,
}: PlanCardProps) {
  const tierInfo = getTierDetails(tier)

  return (
    <div
      onClick={() => onSelect(plan)}
      className={`relative bg-white rounded-2xl p-6 cursor-pointer transition-all ${
        isSelected
          ? 'ring-4 shadow-2xl scale-105'
          : 'shadow-lg hover:shadow-xl hover:scale-102'
      }`}
      style={{
        ringColor: isSelected ? tierInfo.color : 'transparent',
      }}
    >
      {/* Badges */}
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-red-500 text-white text-xs font-bold px-4 py-1 rounded-full">
            🔥 POPULAR
          </span>
        </div>
      )}
      {plan.bestValue && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-green-500 text-white text-xs font-bold px-4 py-1 rounded-full">
            💎 BEST VALUE
          </span>
        </div>
      )}

      {/* Duration */}
      <div className="text-center mb-4 mt-2">
        <h3 className="text-2xl font-bold text-gray-900">
          {getDurationLabel(plan.duration)}
        </h3>
      </div>

      {/* Price */}
      <div className="text-center mb-4">
        <div className="text-4xl font-bold text-gray-900">
          {formatPrice(plan.totalPrice)}
        </div>
        <div className="text-gray-600 text-sm mt-1">
          {formatPrice(plan.monthlyPrice)}/month
        </div>
      </div>

      {/* Savings */}
      {plan.savingsPercent && (
        <div className="text-center mb-4">
          <span className="bg-green-100 text-green-700 text-sm font-semibold px-3 py-1 rounded-full">
            Save {plan.savingsPercent}%
          </span>
        </div>
      )}

      {/* Selection Indicator */}
      <div className="flex justify-center mb-4">
        <div
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
            isSelected ? 'border-current' : 'border-gray-300'
          }`}
          style={{ color: isSelected ? tierInfo.color : 'transparent' }}
        >
          {isSelected && (
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: tierInfo.color }}
            />
          )}
        </div>
      </div>

      {/* Payment Button or Login Prompt */}
      {isSelected ? (
        <div className="mt-4">
          {userId ? (
            <PaymentButton
              planId={plan.id}
              userId={userId}
              userEmail={userEmail}
              tier={tier}
              duration={plan.duration}
              amount={plan.totalPrice}
            />
          ) : (
            <a
              href="/login?redirect=/premium"
              className="block w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-4 rounded-xl font-bold text-lg text-center hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg hover:shadow-xl"
            >
              Login to Continue
            </a>
          )}
        </div>
      ) : (
        <button
          onClick={() => onSelect(plan)}
          className="w-full py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
        >
          Select Plan
        </button>
      )}
    </div>
  )
}
