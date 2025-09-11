import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params
    
    const course = await prisma.course.findUnique({
      where: { slug, isPublished: true },
      select: { id: true },
    })

    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 })
    }

    const modules = await prisma.courseModule.findMany({
      where: { courseId: course.id },
      select: {
        id: true,
        title: true,
        duration: true,
        order: true,
        isPreview: true,
      },
      orderBy: { order: 'asc' },
    })

    return NextResponse.json(modules)
  } catch (error) {
    console.error('Error fetching course modules:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    // Check admin access
    if (!session?.user?.email || session.user.email !== process.env.ADMIN_EMAIL) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { slug } = params
    const body = await request.json()
    
    const course = await prisma.course.findUnique({
      where: { slug },
      select: { id: true },
    })

    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 })
    }

    const { title, content, duration, order, isPreview } = body

    const module = await prisma.courseModule.create({
      data: {
        title,
        content,
        duration: parseInt(duration),
        order: parseInt(order),
        isPreview: isPreview || false,
        courseId: course.id,
      },
    })

    return NextResponse.json(module, { status: 201 })
  } catch (error) {
    console.error('Error creating course module:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
