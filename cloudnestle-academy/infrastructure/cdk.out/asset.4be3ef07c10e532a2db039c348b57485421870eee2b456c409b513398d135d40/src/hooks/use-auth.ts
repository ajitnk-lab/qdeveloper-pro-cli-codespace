'use client'

import { useSession } from 'next-auth/react'
import { UserWithSubscription } from '@/types'

export function useAuth() {
  const { data: session, status } = useSession()

  return {
    user: session?.user as UserWithSubscription | undefined,
    isLoading: status === 'loading',
    isAuthenticated: !!session?.user,
  }
}
