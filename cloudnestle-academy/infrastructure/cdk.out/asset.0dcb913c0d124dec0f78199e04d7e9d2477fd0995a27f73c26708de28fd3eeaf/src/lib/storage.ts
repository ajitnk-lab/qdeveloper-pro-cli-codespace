import { S3Client, GetObjectCommand, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'

const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
})

const BUCKET_NAME = process.env.AWS_S3_BUCKET || 'academy-content-bucket'

export async function uploadContent(
  key: string,
  content: string,
  contentType: string = 'text/markdown'
): Promise<string> {
  try {
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: content,
      ContentType: contentType,
    })
    
    await s3Client.send(command)
    return `s3://${BUCKET_NAME}/${key}`
  } catch (error) {
    console.error('Error uploading content to S3:', error)
    throw new Error('Failed to upload content')
  }
}

export async function getContent(key: string): Promise<string> {
  try {
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    })
    
    const response = await s3Client.send(command)
    
    if (!response.Body) {
      throw new Error('No content found')
    }
    
    return await response.Body.transformToString()
  } catch (error) {
    console.error('Error fetching content from S3:', error)
    throw new Error('Failed to fetch content')
  }
}

export async function deleteContent(key: string): Promise<void> {
  try {
    const command = new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    })
    
    await s3Client.send(command)
  } catch (error) {
    console.error('Error deleting content from S3:', error)
    throw new Error('Failed to delete content')
  }
}

export function generateContentKey(
  courseId: string,
  moduleId: string,
  filename: string = 'content.md'
): string {
  return `courses/${courseId}/modules/${moduleId}/${filename}`
}

export function generateThumbnailKey(courseId: string, filename: string): string {
  return `courses/${courseId}/thumbnail/${filename}`
}
