import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')
    
    if (!query || query.length < 2) {
      return NextResponse.json([])
    }

    const courses = await prisma.course.findMany({
      where: {
        isPublished: true,
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
          { category: { contains: query, mode: 'insensitive' } },
          { tags: { has: query } },
        ],
      },
      select: {
        id: true,
        title: true,
        slug: true,
        category: true,
        difficulty: true,
        price: true,
        thumbnailUrl: true,
      },
      take: 10,
      orderBy: { title: 'asc' },
    })

    return NextResponse.json(courses)
  } catch (error) {
    console.error('Error searching courses:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
