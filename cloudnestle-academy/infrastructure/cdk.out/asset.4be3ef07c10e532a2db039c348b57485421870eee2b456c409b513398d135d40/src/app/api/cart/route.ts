import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // For now, return empty cart as we're using client-side storage
    // In production, you might want to sync with server-side cart
    return NextResponse.json({ items: [] })
  } catch (error) {
    console.error('Error fetching cart:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { courseId } = await request.json()

    // Verify course exists and is published
    const course = await prisma.course.findUnique({
      where: { id: courseId, isPublished: true },
    })

    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 })
    }

    // Check if user already owns this course
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (user) {
      const existingPurchase = await prisma.orderItem.findFirst({
        where: {
          courseId,
          order: {
            userId: user.id,
            status: 'completed',
          },
        },
      })

      if (existingPurchase) {
        return NextResponse.json(
          { error: 'Course already purchased' },
          { status: 400 }
        )
      }
    }

    return NextResponse.json({ 
      success: true,
      course: {
        id: course.id,
        title: course.title,
        price: course.price,
        thumbnailUrl: course.thumbnailUrl,
        slug: course.slug,
      }
    })
  } catch (error) {
    console.error('Error adding to cart:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
