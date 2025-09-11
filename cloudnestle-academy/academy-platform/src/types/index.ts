import { User, Course, CourseModule, Order, OrderItem, Subscription, UserProgress } from '@prisma/client'

export type UserWithSubscription = User & {
  subscription?: Subscription | null
}

export type CourseWithModules = Course & {
  modules: CourseModule[]
}

export type OrderWithItems = Order & {
  items: (OrderItem & {
    course: Course
  })[]
}

export type UserProgressWithDetails = UserProgress & {
  course: Course
  module: CourseModule
}

export interface CartItem {
  courseId: string
  course: Course
  addedAt: Date
}

export interface PaymentIntent {
  id: string
  amount: number
  currency: string
  status: string
}

export type SubscriptionPlan = 'basic' | 'premium' | 'enterprise'
export type SubscriptionStatus = 'active' | 'cancelled' | 'expired'
export type OrderStatus = 'pending' | 'completed' | 'failed' | 'refunded'
export type CourseDifficulty = 'beginner' | 'intermediate' | 'advanced'
