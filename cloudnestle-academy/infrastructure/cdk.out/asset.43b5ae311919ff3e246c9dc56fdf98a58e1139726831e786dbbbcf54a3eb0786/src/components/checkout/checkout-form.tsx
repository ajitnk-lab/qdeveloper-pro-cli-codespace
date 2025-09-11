'use client'

import { useState } from 'react'
import { useCartStore } from '@/stores/cart-store'
import { useAuth } from '@/hooks/use-auth'

declare global {
  interface Window {
    Razorpay: any
  }
}

export function CheckoutForm() {
  const [loading, setLoading] = useState(false)
  const { items, clearCart } = useCartStore()
  const { user } = useAuth()

  const handlePayment = async () => {
    if (!user || items.length === 0) return

    try {
      setLoading(true)

      // Create payment order
      const response = await fetch('/api/payments/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(item => ({ courseId: item.courseId })),
        }),
      })

      if (!response.ok) throw new Error('Failed to create payment')

      const { orderId, razorpayOrderId, amount } = await response.json()

      // Initialize Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: amount * 100,
        currency: 'INR',
        name: 'CloudNestle Academy',
        description: 'Course Purchase',
        order_id: razorpayOrderId,
        handler: async (response: any) => {
          try {
            // Verify payment
            const verifyResponse = await fetch('/api/payments/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderId,
              }),
            })

            if (verifyResponse.ok) {
              clearCart()
              alert('Payment successful! You now have access to your courses.')
              window.location.href = '/dashboard'
            } else {
              throw new Error('Payment verification failed')
            }
          } catch (error) {
            console.error('Payment verification error:', error)
            alert('Payment verification failed. Please contact support.')
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: {
          color: '#2563eb',
        },
      }

      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (error) {
      console.error('Payment error:', error)
      alert('Payment failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const totalAmount = items.reduce((sum, item) => sum + item.course.price, 0)

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      
      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div key={item.courseId} className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">{item.course.title}</h3>
              <p className="text-sm text-gray-500">{item.course.category}</p>
            </div>
            <span className="font-bold">${item.course.price}</span>
          </div>
        ))}
      </div>

      <div className="border-t pt-4 mb-6">
        <div className="flex justify-between items-center text-lg font-bold">
          <span>Total</span>
          <span>${totalAmount.toFixed(2)}</span>
        </div>
      </div>

      <button
        onClick={handlePayment}
        disabled={loading || items.length === 0}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
      >
        {loading ? 'Processing...' : `Pay $${totalAmount.toFixed(2)}`}
      </button>
    </div>
  )
}
