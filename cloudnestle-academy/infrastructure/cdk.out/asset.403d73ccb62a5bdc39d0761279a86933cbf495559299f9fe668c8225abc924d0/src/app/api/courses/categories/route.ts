import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const categories = await prisma.course.findMany({
      where: { isPublished: true },
      select: { category: true },
      distinct: ['category'],
    })

    const categoryList = categories
      .map(c => c.category)
      .filter(Boolean)
      .sort()

    return NextResponse.json(categoryList)
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
