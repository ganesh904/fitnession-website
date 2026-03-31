import { useState } from 'react'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { PlanTier, PlanDuration } from '@/types/payment'
import PaymentModal from './PaymentModal'

interface PaymentButtonProps {
  planId: string
  userId: string
  userEmail: string
  tier: PlanTier
  duration: PlanDuration
  amount: number
}

declare global {
  interface Window {
    Razorpay: any
  }
}

export default function PaymentButton({
  planId,
  userId,
  userEmail,
  tier,
  duration,
  amount,
}: PaymentButtonProps) {
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)

  const handlePayment = async () => {
    if (!userId) {
      toast.error('User ID is required')
      return
    }

    setIsProcessing(true)

    try {
      // Step 1: Create order
      const orderRes = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId,
          userId,
          email: userEmail,
          tier,
          duration,
        }),
      })

      if (!orderRes.ok) {
        throw new Error('Failed to create order')
      }

      const orderData = await orderRes.json()

      // Step 2: Initialize Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Fitnession',
        description: `${tier === 'smart' ? 'Smart' : 'Premium'} Plan - ${duration} Month${duration > 1 ? 's' : ''}`,
        order_id: orderData.orderId,
        prefill: {
          email: userEmail,
        },
        theme: {
          color: tier === 'smart' ? '#00897B' : '#FF9800',
        },
        handler: async function (response: any) {
          // Step 3: Verify payment
          try {
            const verifyRes = await fetch('/api/payment/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                userId,
                planId,
                tier,
                duration,
              }),
            })

            const verifyData = await verifyRes.json()

            if (verifyData.success) {
              toast.success('Payment successful! 🎉')

              // Redirect to success page or app
              const appScheme = process.env.NEXT_PUBLIC_APP_SCHEME || 'fitnession://'
              const successUrl = `${appScheme}payment-success?subscriptionId=${verifyData.subscriptionId}`

              // Try to open app
              window.location.href = successUrl

              // Fallback to success page after 2 seconds
              setTimeout(() => {
                router.push(`/payment-success?subscriptionId=${verifyData.subscriptionId}`)
              }, 2000)
            } else {
              throw new Error(verifyData.message || 'Payment verification failed')
            }
          } catch (error: any) {
            console.error('Verification error:', error)
            toast.error('Payment verification failed')
            router.push('/payment-failed?reason=verification_failed')
          }
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false)
            toast.error('Payment cancelled')
          },
        },
      }

      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (error: any) {
      console.error('Payment error:', error)
      toast.error('Failed to initiate payment')
      setIsProcessing(false)
    }
  }

  return (
    <>
      <button
        onClick={handlePayment}
        disabled={isProcessing}
        className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-4 rounded-xl font-bold text-lg hover:from-primary-700 hover:to-primary-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
      >
        {isProcessing ? 'Processing...' : `Pay ₹${amount.toLocaleString()}`}
      </button>

      {isProcessing && <PaymentModal />}
    </>
  )
}
