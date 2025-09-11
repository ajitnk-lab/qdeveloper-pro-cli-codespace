import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { processMarkdownContent } from '@/lib/content'
import { getContent, generateContentKey } from '@/lib/storage'

export async function GET(
  request: NextRequest,
  { params }: { params: { courseId: string; moduleId: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { courseId, moduleId } = params

    // Verify user has access to this course
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Check if user has purchased this course or if module is preview
    const module = await prisma.courseModule.findUnique({
      where: { id: moduleId },
      include: {
        course: {
          include: {
            orderItems: {
              where: {
                order: {
                  userId: user.id,
                  status: 'completed',
                },
              },
            },
          },
        },
      },
    })

    if (!module) {
      return NextResponse.json({ error: 'Module not found' }, { status: 404 })
    }

    const hasAccess = module.isPreview || module.course.orderItems.length > 0

    if (!hasAccess) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 })
    }

    // Get content from storage or database
    let content = module.content
    
    // If content is stored in S3, fetch it
    if (content.startsWith('s3://')) {
      const key = generateContentKey(courseId, moduleId)
      content = await getContent(key)
    }

    // Process markdown content
    const processedContent = await processMarkdownContent(content)

    // Update user progress
    if (hasAccess && !module.isPreview) {
      await prisma.userProgress.upsert({
        where: {
          userId_courseId_moduleId: {
            userId: user.id,
            courseId,
            moduleId,
          },
        },
        update: {
          lastAccessedAt: new Date(),
        },
        create: {
          userId: user.id,
          courseId,
          moduleId,
          lastAccessedAt: new Date(),
        },
      })
    }

    return NextResponse.json({
      module: {
        id: module.id,
        title: module.title,
        duration: module.duration,
        order: module.order,
        isPreview: module.isPreview,
      },
      content: processedContent.content,
      metadata: processedContent.metadata,
      excerpt: processedContent.excerpt,
    })
  } catch (error) {
    console.error('Error fetching content:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
