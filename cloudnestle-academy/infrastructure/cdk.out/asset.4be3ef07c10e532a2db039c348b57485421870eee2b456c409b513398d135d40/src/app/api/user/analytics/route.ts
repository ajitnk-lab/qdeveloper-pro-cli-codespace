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

    // Get user progress analytics
    const [totalProgress, completedModules, totalTimeSpent, courseStats] = await Promise.all([
      prisma.userProgress.count({
        where: { userId: user.id },
      }),
      prisma.userProgress.count({
        where: { userId: user.id, completedAt: { not: null } },
      }),
      prisma.userProgress.aggregate({
        where: { userId: user.id },
        _sum: { timeSpent: true },
      }),
      prisma.userProgress.groupBy({
        by: ['courseId'],
        where: { userId: user.id },
        _count: { moduleId: true },
        _sum: { timeSpent: true },
      }),
    ])

    // Get course completion rates
    const courseCompletionData = await Promise.all(
      courseStats.map(async (stat) => {
        const course = await prisma.course.findUnique({
          where: { id: stat.courseId },
          select: { title: true, slug: true },
          include: { _count: { select: { modules: true } } },
        })
        
        const completedCount = await prisma.userProgress.count({
          where: {
            userId: user.id,
            courseId: stat.courseId,
            completedAt: { not: null },
          },
        })

        return {
          courseId: stat.courseId,
          title: course?.title || 'Unknown',
          slug: course?.slug || '',
          totalModules: course?._count.modules || 0,
          completedModules: completedCount,
          completionRate: course?._count.modules ? (completedCount / course._count.modules) * 100 : 0,
          timeSpent: stat._sum.timeSpent || 0,
        }
      })
    )

    return NextResponse.json({
      totalModulesAccessed: totalProgress,
      completedModules,
      totalTimeSpent: totalTimeSpent._sum.timeSpent || 0,
      averageTimePerModule: completedModules > 0 ? Math.round((totalTimeSpent._sum.timeSpent || 0) / completedModules) : 0,
      courseProgress: courseCompletionData,
    })
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
