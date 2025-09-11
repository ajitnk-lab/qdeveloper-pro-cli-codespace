import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Get user's purchased courses through completed orders
    const purchasedCourses = await prisma.course.findMany({
      where: {
        orderItems: {
          some: {
            order: {
              userId: user.id,
              status: 'completed',
            },
          },
        },
      },
      include: {
        modules: {
          orderBy: { order: 'asc' },
        },
        progress: {
          where: { userId: user.id },
        },
      },
    })

    return NextResponse.json(purchasedCourses)
  } catch (error) {
    console.error('Error fetching user courses:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
