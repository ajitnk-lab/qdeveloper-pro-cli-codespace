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

export const courseCreateSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
  description: z.string().min(1, 'Description is required'),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Invalid slug format'),
  category: z.string().min(1, 'Category is required'),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
  price: z.number().min(0, 'Price must be positive'),
  thumbnailUrl: z.string().url('Invalid thumbnail URL'),
  instructorId: z.string().cuid('Invalid instructor ID'),
  tags: z.array(z.string()).optional(),
})

export const moduleCreateSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
  content: z.string().min(1, 'Content is required'),
  duration: z.number().min(1, 'Duration must be positive'),
  order: z.number().min(0, 'Order must be non-negative'),
  isPreview: z.boolean().optional(),
})

export const orderCreateSchema = z.object({
  items: z.array(z.object({
    courseId: z.string().cuid('Invalid course ID'),
  })).min(1, 'At least one item required'),
})

export type UserProfileInput = z.infer<typeof userProfileSchema>
export type ProgressUpdateInput = z.infer<typeof progressUpdateSchema>
export type CourseFilterInput = z.infer<typeof courseFilterSchema>
export type CourseCreateInput = z.infer<typeof courseCreateSchema>
export type ModuleCreateInput = z.infer<typeof moduleCreateSchema>
export type OrderCreateInput = z.infer<typeof orderCreateSchema>
