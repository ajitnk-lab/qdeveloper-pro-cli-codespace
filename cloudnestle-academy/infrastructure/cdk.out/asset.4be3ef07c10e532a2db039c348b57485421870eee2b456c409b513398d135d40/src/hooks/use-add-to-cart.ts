'use client'

import { useState } from 'react'
import { useCartStore } from '@/stores/cart-store'
import { useAuth } from './use-auth'
import { Course } from '@prisma/client'

export function useAddToCart() {
  const [loading, setLoading] = useState(false)
  const { addItem, setCartOpen } = useCartStore()
  const { isAuthenticated } = useAuth()

  const addToCart = async (course: Course) => {
    if (!isAuthenticated) {
      // TODO: Redirect to login or show login modal
      console.log('Please sign in to add items to cart')
      return
    }

    try {
      setLoading(true)
      
      // Verify with server that course can be added to cart
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ courseId: course.id }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to add to cart')
      }

      // Add to local cart store
      addItem({
        courseId: course.id,
        course: {
          id: course.id,
          title: course.title,
          price: course.price,
          thumbnailUrl: course.thumbnailUrl,
          slug: course.slug,
          category: course.category,
        },
      })

      // Open cart sidebar
      setCartOpen(true)
    } catch (error) {
      console.error('Error adding to cart:', error)
      // TODO: Show error toast
    } finally {
      setLoading(false)
    }
  }

  return { addToCart, loading }
}
