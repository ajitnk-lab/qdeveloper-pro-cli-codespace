import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { handleApiError, AuthenticationError, AuthorizationError } from '@/lib/errors'
import { logger } from '@/lib/logger'

type ApiHandler = (req: NextRequest, context?: any) => Promise<NextResponse>

interface ApiHandlerOptions {
  requireAuth?: boolean
  requireAdmin?: boolean
  methods?: string[]
}

export function withApiHandler(
  handler: ApiHandler,
  options: ApiHandlerOptions = {}
) {
  return async (req: NextRequest, context?: any) => {
    try {
      // Method validation
      if (options.methods && !options.methods.includes(req.method || '')) {
        return NextResponse.json(
          { error: 'Method not allowed' },
          { status: 405 }
        )
      }

      // Authentication check
      if (options.requireAuth || options.requireAdmin) {
        const session = await getServerSession(authOptions)
        
        if (!session?.user?.email) {
          throw new AuthenticationError()
        }

        // Admin check
        if (options.requireAdmin && session.user.email !== process.env.ADMIN_EMAIL) {
          throw new AuthorizationError()
        }
      }

      // Execute handler
      const response = await handler(req, context)
      
      // Log successful requests
      logger.info(`API ${req.method} ${req.url}`, {
        status: response.status,
        method: req.method,
        url: req.url,
      })

      return response
    } catch (error) {
      // Handle and log errors
      const { error: errorMessage, statusCode } = handleApiError(error)
      
      logger.error(`API Error ${req.method} ${req.url}`, error as Error, {
        method: req.method,
        url: req.url,
        statusCode,
      })

      return NextResponse.json(
        { error: errorMessage },
        { status: statusCode }
      )
    }
  }
}

export function createApiResponse<T>(data: T, status: number = 200) {
  return NextResponse.json(data, { status })
}

export function createErrorResponse(message: string, status: number = 400) {
  return NextResponse.json({ error: message }, { status })
}
