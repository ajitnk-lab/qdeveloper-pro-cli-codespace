import Razorpay from 'razorpay'

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

export const razorpayConfig = {
  keyId: process.env.RAZORPAY_KEY_ID!,
  currency: 'INR',
  name: 'CloudNestle Academy',
  description: 'Course Purchase',
  theme: {
    color: '#2563eb',
  },
}
