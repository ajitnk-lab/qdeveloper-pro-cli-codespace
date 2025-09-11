'use client'

import { useEffect, useState } from 'react'

interface ContentRendererProps {
  courseId: string
  moduleId: string
  className?: string
}

interface ContentData {
  module: {
    id: string
    title: string
    duration: number
    order: number
    isPreview: boolean
  }
  content: string
  metadata: {
    title: string
    description?: string
    duration?: number
    tags?: string[]
  }
  excerpt?: string
}

export function ContentRenderer({ courseId, moduleId, className }: ContentRendererProps) {
  const [content, setContent] = useState<ContentData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchContent() {
      try {
        setLoading(true)
        const response = await fetch(`/api/content/${courseId}/${moduleId}`)
        
        if (!response.ok) {
          throw new Error('Failed to fetch content')
        }
        
        const data = await response.json()
        setContent(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchContent()
  }, [courseId, moduleId])

  if (loading) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="h-8 bg-gray-200 rounded mb-4"></div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`text-red-600 p-4 border border-red-200 rounded ${className}`}>
        <h3 className="font-semibold mb-2">Error loading content</h3>
        <p>{error}</p>
      </div>
    )
  }

  if (!content) {
    return (
      <div className={`text-gray-500 p-4 ${className}`}>
        No content available
      </div>
    )
  }

  return (
    <div className={className}>
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {content.module.title}
        </h1>
        {content.metadata.description && (
          <p className="text-gray-600 text-lg">
            {content.metadata.description}
          </p>
        )}
        <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
          <span>Duration: {content.module.duration} minutes</span>
          {content.module.isPreview && (
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
              Preview
            </span>
          )}
          {content.metadata.tags && content.metadata.tags.length > 0 && (
            <div className="flex gap-2">
              {content.metadata.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>
      
      <article 
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: content.content }}
      />
    </div>
  )
}
