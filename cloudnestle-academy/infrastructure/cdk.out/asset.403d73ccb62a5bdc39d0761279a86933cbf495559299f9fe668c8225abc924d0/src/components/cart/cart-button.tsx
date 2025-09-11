'use client'

import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import { useCartStore } from '@/stores/cart-store'

export function CartButton() {
  const { getItemCount, toggleCart } = useCartStore()
  const itemCount = getItemCount()

  return (
    <button
      onClick={toggleCart}
      className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
    >
      <ShoppingCartIcon className="h-6 w-6" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </button>
  )
}
