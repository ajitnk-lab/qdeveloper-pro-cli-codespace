import { z } from 'zod'

export const userProfileSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
})

export const progressUpdateSchema = z.object({
  courseId: z.string().cuid('Invalid course ID'),
  moduleId: z.string().cuid('Invalid module ID'),
  timeSpent: z.number().min(0, 'Time spent must be positive').optional(),
  completed: z.boolean().optional(),
})

export const courseFilterSchema = z.object({
  category: z.string().optional(),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
  search: z.string().optional(),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(50).default(10),
})

export const orderCreateSchema = z.object({
  items: z.array(z.object({
    courseId: z.string().cuid('Invalid course ID'),
  })).min(1, 'At least one item required'),
})

export type UserProfileInput = z.infer<typeof userProfileSchema>
export type ProgressUpdateInput = z.infer<typeof progressUpdateSchema>
export type CourseFilterInput = z.infer<typeof courseFilterSchema>
export type OrderCreateInput = z.infer<typeof orderCreateSchema>
