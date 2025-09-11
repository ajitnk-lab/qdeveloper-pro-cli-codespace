import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
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

    const { searchParams } = new URL(request.url)
    const courseId = searchParams.get('courseId')
    const recent = searchParams.get('recent') === 'true'

    if (recent) {
      // Get recent progress for resume learning
      const recentProgress = await prisma.userProgress.findMany({
        where: { userId: user.id },
        include: {
          course: {
            select: {
              title: true,
              slug: true,
              thumbnailUrl: true,
              category: true,
            },
          },
          module: {
            select: {
              title: true,
              order: true,
            },
          },
        },
        orderBy: { lastAccessedAt: 'desc' },
        take: 5,
      })

      return NextResponse.json(recentProgress)
    }

    const whereClause = courseId 
      ? { userId: user.id, courseId }
      : { userId: user.id }

    const progress = await prisma.userProgress.findMany({
      where: whereClause,
      include: {
        course: true,
        module: true,
      },
      orderBy: [
        { course: { title: 'asc' } },
        { module: { order: 'asc' } },
      ],
    })

    return NextResponse.json(progress)
  } catch (error) {
    console.error('Error fetching user progress:', error)
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

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const { courseId, moduleId, timeSpent, completed } = await request.json()

    const progressData = {
      userId: user.id,
      courseId,
      moduleId,
      timeSpent: timeSpent || 0,
      lastAccessedAt: new Date(),
      ...(completed && { completedAt: new Date() }),
    }

    const progress = await prisma.userProgress.upsert({
      where: {
        userId_courseId_moduleId: {
          userId: user.id,
          courseId,
          moduleId,
        },
      },
      update: {
        timeSpent: { increment: timeSpent || 0 },
        lastAccessedAt: new Date(),
        ...(completed && { completedAt: new Date() }),
      },
      create: progressData,
      include: {
        course: true,
        module: true,
      },
    })

    return NextResponse.json(progress)
  } catch (error) {
    console.error('Error updating user progress:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
