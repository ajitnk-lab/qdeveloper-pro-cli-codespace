import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email || session.user.email !== process.env.ADMIN_EMAIL) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const [
      totalCourses,
      publishedCourses,
      totalUsers,
      totalOrders,
      revenueData,
      recentOrders,
    ] = await Promise.all([
      prisma.course.count(),
      prisma.course.count({ where: { isPublished: true } }),
      prisma.user.count(),
      prisma.order.count(),
      prisma.order.aggregate({
        where: { status: 'completed' },
        _sum: { totalAmount: true },
      }),
      prisma.order.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: { name: true, email: true },
          },
        },
      }),
    ])

    return NextResponse.json({
      totalCourses,
      publishedCourses,
      totalUsers,
      totalOrders,
      totalRevenue: revenueData._sum.totalAmount || 0,
      recentOrders,
    })
  } catch (error) {
    console.error('Error fetching admin stats:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
