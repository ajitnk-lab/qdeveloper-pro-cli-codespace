'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/use-auth'

interface Plan {
  id: string
  name: string
  price: number
  features: string[]
  popular?: boolean
}

const plans: Plan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 999,
    features: [
      'Access to basic courses',
      'Community support',
      'Mobile app access',
      'Basic progress tracking',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 1999,
    popular: true,
    features: [
      'Access to all courses',
      'Priority support',
      'Downloadable content',
      'Advanced analytics',
      'Certificates',
      'Live sessions',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 4999,
    features: [
      'Everything in Premium',
      'Team management',
      'Custom branding',
      'API access',
      'Dedicated support',
      'Custom integrations',
    ],
  },
]

export function SubscriptionPlans() {
  const [loading, setLoading] = useState<string | null>(null)
  const { isAuthenticated } = useAuth()

  const handleSubscribe = async (planId: string) => {
    if (!isAuthenticated) {
      alert('Please sign in to subscribe')
      return
    }

    try {
      setLoading(planId)
      
      const response = await fetch('/api/subscriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: planId }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to create subscription')
      }

      const data = await response.json()
      alert('Subscription created successfully!')
      window.location.reload()
    } catch (error) {
      console.error('Subscription error:', error)
      alert(error instanceof Error ? error.message : 'Failed to create subscription')
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h2>
          <p className="text-lg text-gray-600">
            Unlock your learning potential with our flexible subscription plans
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white rounded-lg shadow-lg overflow-hidden ${
                plan.popular ? 'ring-2 ring-blue-500 relative' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">
                    ₹{plan.price}
                  </span>
                  <span className="text-gray-600">/month</span>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <svg
                        className="h-5 w-5 text-green-500 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button
                  onClick={() => handleSubscribe(plan.id)}
                  disabled={loading === plan.id}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                    plan.popular
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  } disabled:opacity-50`}
                >
                  {loading === plan.id ? 'Processing...' : 'Subscribe Now'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
