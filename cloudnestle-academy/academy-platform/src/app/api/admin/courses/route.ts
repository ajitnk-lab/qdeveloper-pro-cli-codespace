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

    const courses = await prisma.course.findMany({
      include: {
        _count: {
          select: { modules: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(courses)
  } catch (error) {
    console.error('Error fetching admin courses:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
