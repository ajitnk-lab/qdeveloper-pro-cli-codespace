'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { SubscriptionPlans } from '@/components/subscription/subscription-plans'

interface Subscription {
  id: string
  plan: string
  status: string
  currentPeriodStart: string
  currentPeriodEnd: string
  cancelAtPeriodEnd: boolean
}

export default function SubscriptionPage() {
  const { isAuthenticated } = useAuth()
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isAuthenticated) {
      fetchSubscription()
    } else {
      setLoading(false)
    }
  }, [isAuthenticated])

  const fetchSubscription = async () => {
    try {
      const response = await fetch('/api/subscriptions')
      if (response.ok) {
        const data = await response.json()
        setSubscription(data)
      }
    } catch (error) {
      console.error('Error fetching subscription:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCancelSubscription = async (immediate = false) => {
    if (!confirm(immediate ? 'Cancel subscription immediately?' : 'Cancel at period end?')) {
      return
    }

    try {
      const response = await fetch('/api/subscriptions/cancel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ immediate }),
      })

      if (response.ok) {
        alert('Subscription cancelled successfully')
        fetchSubscription()
      } else {
        throw new Error('Failed to cancel subscription')
      }
    } catch (error) {
      console.error('Error cancelling subscription:', error)
      alert('Failed to cancel subscription')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {subscription && subscription.status === 'active' ? (
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
              Your Subscription
            </h1>
            
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {subscription.plan.charAt(0).toUpperCase() + subscription.plan.slice(1)} Plan
                  </h2>
                  <p className="text-gray-600">
                    Status: <span className="font-medium text-green-600">{subscription.status}</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Current Period</p>
                  <p className="font-medium">
                    {new Date(subscription.currentPeriodStart).toLocaleDateString()} - {' '}
                    {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {subscription.cancelAtPeriodEnd && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6">
                  <p className="text-yellow-800">
                    Your subscription will be cancelled at the end of the current period.
                  </p>
                </div>
              )}

              <div className="flex gap-4">
                {!subscription.cancelAtPeriodEnd && (
                  <>
                    <button
                      onClick={() => handleCancelSubscription(false)}
                      className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors"
                    >
                      Cancel at Period End
                    </button>
                    <button
                      onClick={() => handleCancelSubscription(true)}
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                    >
                      Cancel Immediately
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <SubscriptionPlans />
      )}
    </div>
  )
}
