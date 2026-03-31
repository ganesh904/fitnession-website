import Razorpay from 'razorpay'
import crypto from 'crypto'

// Get Razorpay instance (lazy initialization)
function getRazorpayInstance() {
  const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID
  const keySecret = process.env.RAZORPAY_KEY_SECRET

  if (!keyId || !keySecret) {
    throw new Error('Razorpay credentials not configured')
  }

  return new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
  })
}

/**
 * Create a Razorpay order
 */
export async function createRazorpayOrder(
  amount: number,
  currency: string = 'INR',
  receipt: string
) {
  try {
    const razorpay = getRazorpayInstance()

    console.log('Creating Razorpay order:', { amount, currency, receipt })

    const order = await razorpay.orders.create({
      amount: amount * 100, // Convert to paise
      currency,
      receipt,
      notes: {
        created_via: 'fitnession_website',
      },
    })

    console.log('Razorpay order created successfully:', order.id)
    return order
  } catch (error: any) {
    console.error('Razorpay error:', error)
    throw new Error(`Razorpay order failed: ${error.message || 'Unknown error'}`)
  }
}

/**
 * Verify Razorpay payment signature
 * This is CRITICAL for security - always verify on server
 */
export function verifyRazorpaySignature(
  orderId: string,
  paymentId: string,
  signature: string
): boolean {
  try {
    const keySecret = process.env.RAZORPAY_KEY_SECRET
    if (!keySecret) {
      throw new Error('Razorpay secret not configured')
    }

    const text = `${orderId}|${paymentId}`
    const generated = crypto
      .createHmac('sha256', keySecret)
      .update(text)
      .digest('hex')

    return generated === signature
  } catch (error) {
    console.error('Error verifying Razorpay signature:', error)
    return false
  }
}

/**
 * Fetch payment details from Razorpay
 */
export async function getPaymentDetails(paymentId: string) {
  try {
    const razorpay = getRazorpayInstance()
    const payment = await razorpay.payments.fetch(paymentId)
    return payment
  } catch (error) {
    console.error('Error fetching payment details:', error)
    throw new Error('Failed to fetch payment details')
  }
}

/**
 * Refund a payment
 */
export async function refundPayment(
  paymentId: string,
  amount?: number
) {
  try {
    const razorpay = getRazorpayInstance()
    const refund = await razorpay.payments.refund(paymentId, {
      amount: amount ? amount * 100 : undefined, // Convert to paise if specified
    })
    return refund
  } catch (error) {
    console.error('Error processing refund:', error)
    throw new Error('Failed to process refund')
  }
}

/**
 * Get Razorpay public key for frontend
 */
export function getRazorpayKeyId(): string {
  return process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || ''
}

/**
 * Generate receipt ID (max 40 characters for Razorpay)
 */
export function generateReceiptId(userId: string, planId: string): string {
  // Use shorter timestamp (last 10 digits)
  const timestamp = Date.now().toString().slice(-10)
  // Use first 6 chars of userId
  const userShort = userId.substring(0, 6)
  // Format: rcpt_XXXXXX_plan_XXXXXXXXXX (max ~30 chars)
  return `rcpt_${userShort}_${planId}_${timestamp}`.substring(0, 40)
}
