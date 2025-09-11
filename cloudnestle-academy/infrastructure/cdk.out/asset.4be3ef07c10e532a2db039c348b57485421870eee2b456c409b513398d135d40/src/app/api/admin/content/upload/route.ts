import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { processMarkdownContent, validateContentMetadata } from '@/lib/content'
import { uploadContent, generateContentKey } from '@/lib/storage'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    // Check admin access (you can customize this logic)
    if (!session?.user?.email || session.user.email !== process.env.ADMIN_EMAIL) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const courseId = formData.get('courseId') as string
    const moduleId = formData.get('moduleId') as string
    const file = formData.get('file') as File
    const storeInS3 = formData.get('storeInS3') === 'true'

    if (!courseId || !moduleId || !file) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Read file content
    const content = await file.text()
    
    // Process and validate content
    const processedContent = await processMarkdownContent(content)
    const validatedMetadata = validateContentMetadata(processedContent.metadata)

    let finalContent = content
    let contentUrl = ''

    // Store in S3 if requested
    if (storeInS3) {
      const key = generateContentKey(courseId, moduleId)
      contentUrl = await uploadContent(key, content)
      finalContent = contentUrl // Store S3 URL in database
    }

    // Update module in database
    const updatedModule = await prisma.courseModule.update({
      where: { id: moduleId },
      data: {
        title: validatedMetadata.title,
        content: finalContent,
        duration: validatedMetadata.duration,
        order: validatedMetadata.order,
        isPreview: validatedMetadata.isPreview,
      },
    })

    // Update course metadata if provided
    if (validatedMetadata.category || validatedMetadata.difficulty || validatedMetadata.tags) {
      await prisma.course.update({
        where: { id: courseId },
        data: {
          ...(validatedMetadata.category && { category: validatedMetadata.category }),
          ...(validatedMetadata.difficulty && { difficulty: validatedMetadata.difficulty }),
          ...(validatedMetadata.tags && { tags: validatedMetadata.tags }),
        },
      })
    }

    return NextResponse.json({
      module: updatedModule,
      processedContent: {
        content: processedContent.content,
        metadata: validatedMetadata,
        excerpt: processedContent.excerpt,
      },
      contentUrl,
    })
  } catch (error) {
    console.error('Error uploading content:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
