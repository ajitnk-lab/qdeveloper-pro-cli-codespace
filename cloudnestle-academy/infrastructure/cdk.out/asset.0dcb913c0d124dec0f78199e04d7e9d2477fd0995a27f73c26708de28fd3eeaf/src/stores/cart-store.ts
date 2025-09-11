import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem } from '@/types'

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  addItem: (item: Omit<CartItem, 'addedAt'>) => void
  removeItem: (courseId: string) => void
  clearCart: () => void
  getTotalPrice: () => number
  getItemCount: () => number
  toggleCart: () => void
  setCartOpen: (open: boolean) => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (item) => {
        const { items } = get()
        const existingItem = items.find(i => i.courseId === item.courseId)
        
        if (existingItem) {
          // Item already in cart, don't add duplicate
          return
        }

        const newItem: CartItem = {
          ...item,
          addedAt: new Date(),
        }

        set({ items: [...items, newItem] })
      },

      removeItem: (courseId) => {
        const { items } = get()
        set({ items: items.filter(item => item.courseId !== courseId) })
      },

      clearCart: () => {
        set({ items: [] })
      },

      getTotalPrice: () => {
        const { items } = get()
        return items.reduce((total, item) => total + item.course.price, 0)
      },

      getItemCount: () => {
        const { items } = get()
        return items.length
      },

      toggleCart: () => {
        const { isOpen } = get()
        set({ isOpen: !isOpen })
      },

      setCartOpen: (open) => {
        set({ isOpen: open })
      },
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ items: state.items }),
    }
  )
)
