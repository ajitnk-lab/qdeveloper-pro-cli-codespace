'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/use-auth'
import { useCartStore } from '@/stores/cart-store'
import { CheckoutForm } from '@/components/checkout/checkout-form'
import Script from 'next/script'

export default function CheckoutPage() {
  const { isAuthenticated } = useAuth()
  const { items } = useCartStore()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/signin')
    }
    if (items.length === 0) {
      router.push('/courses')
    }
  }, [isAuthenticated, items.length, router])

  if (!isAuthenticated || items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {!isAuthenticated ? 'Please sign in' : 'Your cart is empty'}
          </h1>
          <p className="text-gray-600">
            {!isAuthenticated 
              ? 'You need to be signed in to checkout' 
              : 'Add some courses to your cart first'
            }
          </p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
            <CheckoutForm />
          </div>
        </div>
      </div>
    </>
  )
}
