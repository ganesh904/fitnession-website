import { PlanTier, PlanDuration, PricingOption, PlanDetails } from '@/types/payment'

// Plan pricing definitions (UPDATED to match mobile app exactly)
export const SMART_PLANS: PricingOption[] = [
  {
    id: 'smart_1month',
    duration: 1,
    monthlyPrice: 999,
    totalPrice: 999,
  },
  {
    id: 'smart_3months',
    duration: 3,
    monthlyPrice: 699,
    totalPrice: 2097,
    savingsPercent: 30,
  },
  {
    id: 'smart_6months',
    duration: 6,
    monthlyPrice: 499,
    totalPrice: 2994,
    savingsPercent: 50,
    popular: true,
  },
  {
    id: 'smart_12months',
    duration: 12,
    monthlyPrice: 399,
    totalPrice: 4788,
    savingsPercent: 60,
    bestValue: true,
  },
]

export const PREMIUM_PLANS: PricingOption[] = [
  {
    id: 'premium_3months',
    duration: 3,
    monthlyPrice: 2499,
    totalPrice: 7497,
  },
  {
    id: 'premium_6months',
    duration: 6,
    monthlyPrice: 2099,
    totalPrice: 12594,
    savingsPercent: 16,
    popular: true,
  },
  {
    id: 'premium_12months',
    duration: 12,
    monthlyPrice: 1799,
    totalPrice: 21588,
    savingsPercent: 28,
    bestValue: true,
  },
]

// Plan tier details (updated to match mobile app)
export const PLAN_TIERS: Record<PlanTier, PlanDetails> = {
  smart: {
    tier: 'smart',
    name: 'Fitnession Smart',
    name_hi: 'फिटनेशन स्मार्ट',
    tagline: 'AI-Powered Health Coaching',
    tagline_hi: 'AI-पावर्ड हेल्थ कोचिंग',
    icon: '⚡',
    color: '#4CAF50',
    features: [
      '🤖 Personal AI Coach',
      '💬 Unlimited chat with ALL AI Coaches',
      '🥗 Personalized Diet Plan',
      '🛒 Weekly Grocery List',
      '💪 Personalized Workout Plan',
      '📊 Weekly Progress Reports',
      '📈 Diet, Workout & Water Tracking',
      '👥 Community Access',
    ],
    features_hi: [
      '🤖 पर्सनल AI कोच',
      '💬 सभी AI कोच से अनलिमिटेड चैट',
      '🥗 पर्सनलाइज्ड डाइट प्लान',
      '🛒 साप्ताहिक किराने की सूची',
      '💪 पर्सनलाइज्ड वर्कआउट प्लान',
      '📊 साप्ताहिक प्रगति रिपोर्ट',
      '📈 डाइट, वर्कआउट और पानी ट्रैकिंग',
      '👥 कम्युनिटी एक्सेस',
    ],
  },
  premium: {
    tier: 'premium',
    name: 'Fitnession Premium',
    name_hi: 'फिटनेशन प्रीमियम',
    tagline: 'Personal Health Coach + AI',
    tagline_hi: 'पर्सनल हेल्थ कोच + AI',
    icon: '👑',
    color: '#FF9800',
    features: [
      '👨‍⚕️ Personal Premium Health Coach',
      '📞 Weekly Call with Health Coach',
      '🤖 Personal AI Coach',
      '💬 Unlimited chat with ALL AI Coaches',
      '🥗 Personalized Diet Plan',
      '🛒 Weekly Grocery List',
      '💪 Personalized Workout Plan',
      '📊 Weekly Progress Reports',
      '📈 Diet, Workout & Water Tracking',
      '👥 Community Access',
    ],
    features_hi: [
      '👨‍⚕️ पर्सनल प्रीमियम हेल्थ कोच',
      '📞 हेल्थ कोच से साप्ताहिक कॉल',
      '🤖 पर्सनल AI कोच',
      '💬 सभी AI कोच से अनलिमिटेड चैट',
      '🥗 पर्सनलाइज्ड डाइट प्लान',
      '🛒 साप्ताहिक किराने की सूची',
      '💪 पर्सनलाइज्ड वर्कआउट प्लान',
      '📊 साप्ताहिक प्रगति रिपोर्ट',
      '📈 डाइट, वर्कआउट और पानी ट्रैकिंग',
      '👥 कम्युनिटी एक्सेस',
    ],
  },
}

// Get plan by ID
export function getPlanById(planId: string): PricingOption | null {
  const allPlans = [...SMART_PLANS, ...PREMIUM_PLANS]
  return allPlans.find((plan) => plan.id === planId) || null
}

// Get plans by tier
export function getPlansByTier(tier: PlanTier): PricingOption[] {
  return tier === 'smart' ? SMART_PLANS : PREMIUM_PLANS
}

// Get tier details
export function getTierDetails(tier: PlanTier): PlanDetails {
  return PLAN_TIERS[tier]
}

// Format price in INR
export function formatPrice(price: number): string {
  return `₹${price.toLocaleString('en-IN')}`
}

// Get duration label
export function getDurationLabel(duration: PlanDuration, isHindi: boolean = false): string {
  const labels: Record<PlanDuration, { en: string; hi: string }> = {
    1: { en: '1 Month', hi: '1 महीना' },
    3: { en: '3 Months', hi: '3 महीने' },
    6: { en: '6 Months', hi: '6 महीने' },
    12: { en: '12 Months', hi: '12 महीने' },
  }

  return isHindi ? labels[duration].hi : labels[duration].en
}

// Calculate end date based on duration
export function calculateEndDate(startDate: Date, duration: PlanDuration): Date {
  const endDate = new Date(startDate)
  endDate.setMonth(endDate.getMonth() + duration)
  return endDate
}

// Check if plan ID is valid
export function isValidPlanId(planId: string): boolean {
  const allPlans = [...SMART_PLANS, ...PREMIUM_PLANS]
  return allPlans.some((plan) => plan.id === planId)
}

// Get tier from plan ID
export function getTierFromPlanId(planId: string): PlanTier | null {
  if (planId.startsWith('smart_')) return 'smart'
  if (planId.startsWith('premium_')) return 'premium'
  return null
}

// Get duration from plan ID
export function getDurationFromPlanId(planId: string): PlanDuration | null {
  if (planId.includes('_1month')) return 1
  if (planId.includes('_3months')) return 3
  if (planId.includes('_6months')) return 6
  if (planId.includes('_12months')) return 12
  return null
}
