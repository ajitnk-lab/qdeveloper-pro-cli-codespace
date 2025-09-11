'use client'

import Link from 'next/link'
import { useAuth } from '@/hooks/use-auth'
import { CartButton } from '@/components/cart/cart-button'
import { signIn, signOut } from 'next-auth/react'

export function Header() {
  const { user, isAuthenticated } = useAuth()
  const isAdmin = user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="text-3xl font-bold text-blue-600">
            CloudNestle Academy
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/courses" className="text-lg text-gray-600 hover:text-gray-900">
              Courses
            </Link>
            <Link href="/subscription" className="text-lg text-gray-600 hover:text-gray-900">
              Subscription
            </Link>
            <Link href="/about" className="text-lg text-gray-600 hover:text-gray-900">
              About
            </Link>
            <Link href="/contact" className="text-lg text-gray-600 hover:text-gray-900">
              Contact
            </Link>
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-6">
            {isAuthenticated && <CartButton />}
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-6">
                <Link
                  href="/dashboard"
                  className="text-lg text-gray-600 hover:text-gray-900"
                >
                  Dashboard
                </Link>
                {isAdmin && (
                  <Link
                    href="/admin"
                    className="text-lg text-gray-600 hover:text-gray-900"
                  >
                    Admin
                  </Link>
                )}
                <button
                  onClick={() => signOut()}
                  className="text-lg text-gray-600 hover:text-gray-900"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => signIn()}
                className="bg-blue-600 text-white px-6 py-3 text-lg rounded-md hover:bg-blue-700 transition-colors"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
