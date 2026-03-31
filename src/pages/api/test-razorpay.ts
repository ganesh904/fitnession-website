import type { NextApiRequest, NextApiResponse } from 'next'
import Razorpay from 'razorpay'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID
    const keySecret = process.env.RAZORPAY_KEY_SECRET

    console.log('Environment check:', {
      keyId: keyId ? `${keyId.substring(0, 10)}...` : 'MISSING',
      keySecret: keySecret ? 'SET' : 'MISSING',
    })

    if (!keyId || !keySecret) {
      return res.status(500).json({
        error: 'Missing Razorpay credentials',
        keyId: !!keyId,
        keySecret: !!keySecret,
      })
    }

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    })

    console.log('Creating test order...')

    const order = await razorpay.orders.create({
      amount: 100, // ₹1 in paise
      currency: 'INR',
      receipt: 'test_' + Date.now(),
    })

    console.log('Order created:', order.id)

    return res.status(200).json({
      success: true,
      orderId: order.id,
      message: 'Razorpay is working!',
    })
  } catch (error: any) {
    console.error('Test error:', error)
    return res.status(500).json({
      error: error.message,
      details: JSON.stringify(error, null, 2),
    })
  }
}
