import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { courseFilterSchema } from '@/lib/validations'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const params = Object.fromEntries(searchParams.entries())
    
    const { category, difficulty, search, page, limit } = courseFilterSchema.parse(params)

    const skip = (page - 1) * limit
    
    const where = {
      isPublished: true,
      ...(category && { category }),
      ...(difficulty && { difficulty }),
      ...(search && {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
          { tags: { has: search } },
        ],
      }),
    }

    const [courses, total] = await Promise.all([
      prisma.course.findMany({
        where,
        include: {
          modules: {
            select: { id: true, title: true, duration: true, order: true, isPreview: true },
            orderBy: { order: 'asc' },
          },
          _count: {
            select: { modules: true },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.course.count({ where }),
    ])

    return NextResponse.json({
      courses,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching courses:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    // Check admin access
    if (!session?.user?.email || session.user.email !== process.env.ADMIN_EMAIL) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const {
      title,
      description,
      slug,
      category,
      difficulty,
      price,
      thumbnailUrl,
      instructorId,
      tags,
    } = body

    const course = await prisma.course.create({
      data: {
        title,
        description,
        slug,
        category,
        difficulty,
        price: parseFloat(price),
        thumbnailUrl,
        instructorId,
        tags: tags || [],
        isPublished: false,
      },
      include: {
        modules: {
          orderBy: { order: 'asc' },
        },
      },
    })

    return NextResponse.json(course, { status: 201 })
  } catch (error) {
    console.error('Error creating course:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
