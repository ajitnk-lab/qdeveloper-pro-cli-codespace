import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatError(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }
  return 'An unknown error occurred'
}

export function createApiResponse<T>(
  data: T,
  status: number = 200
) {
  return Response.json(data, { status })
}

export function createErrorResponse(
  message: string,
  status: number = 500
) {
  return Response.json(
    { 
      error: message,
      timestamp: new Date().toISOString()
    },
    { status }
  )
}
