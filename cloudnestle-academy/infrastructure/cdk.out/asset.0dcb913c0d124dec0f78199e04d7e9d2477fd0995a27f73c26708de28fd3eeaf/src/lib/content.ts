import matter from 'gray-matter'
import { remark } from 'remark'
import remarkHtml from 'remark-html'

export interface ContentMetadata {
  title: string
  description?: string
  duration?: number
  order?: number
  isPreview?: boolean
  tags?: string[]
  difficulty?: 'beginner' | 'intermediate' | 'advanced'
  category?: string
}

export interface ProcessedContent {
  content: string
  metadata: ContentMetadata
  excerpt?: string
}

export async function processMarkdownContent(
  markdownContent: string
): Promise<ProcessedContent> {
  // Parse frontmatter and content
  const { data, content } = matter(markdownContent)
  
  // Process markdown to HTML
  const processedContent = await remark()
    .use(remarkHtml, { sanitize: false })
    .process(content)
  
  const htmlContent = processedContent.toString()
  
  // Generate excerpt (first 200 characters of content)
  const excerpt = content.replace(/[#*`]/g, '').substring(0, 200).trim()
  
  return {
    content: htmlContent,
    metadata: data as ContentMetadata,
    excerpt: excerpt + (excerpt.length >= 200 ? '...' : ''),
  }
}

export function validateContentMetadata(metadata: any): ContentMetadata {
  return {
    title: metadata.title || 'Untitled',
    description: metadata.description || '',
    duration: metadata.duration || 0,
    order: metadata.order || 0,
    isPreview: metadata.isPreview || false,
    tags: Array.isArray(metadata.tags) ? metadata.tags : [],
    difficulty: ['beginner', 'intermediate', 'advanced'].includes(metadata.difficulty) 
      ? metadata.difficulty 
      : 'beginner',
    category: metadata.category || 'general',
  }
}

export function extractTableOfContents(content: string): Array<{
  id: string
  title: string
  level: number
}> {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm
  const toc: Array<{ id: string; title: string; level: number }> = []
  let match
  
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length
    const title = match[2].trim()
    const id = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
    
    toc.push({ id, title, level })
  }
  
  return toc
}

export function estimateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
}
