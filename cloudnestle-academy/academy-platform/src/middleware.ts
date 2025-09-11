import { withAuth } from 'next-auth/middleware'

export default withAuth(
  function middleware(req) {
    // Add any additional middleware logic here
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Bypass admin routes in demo mode
        if (req.nextUrl.pathname.startsWith('/admin')) {
          return true // Temporary bypass for demo
        }
        
        // Protect dashboard and course access routes
        if (
          req.nextUrl.pathname.startsWith('/dashboard') ||
          req.nextUrl.pathname.startsWith('/learn/') ||
          req.nextUrl.pathname.startsWith('/subscription') ||
          req.nextUrl.pathname.startsWith('/api/user') ||
          req.nextUrl.pathname.startsWith('/api/subscriptions') ||
          req.nextUrl.pathname.startsWith('/api/orders')
        ) {
          return !!token
        }
        
        return true
      },
    },
  }
)

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/learn/:path*',
    '/subscription/:path*',
    '/api/user/:path*',
    '/api/subscriptions/:path*',
    '/api/orders/:path*',
  ],
}
