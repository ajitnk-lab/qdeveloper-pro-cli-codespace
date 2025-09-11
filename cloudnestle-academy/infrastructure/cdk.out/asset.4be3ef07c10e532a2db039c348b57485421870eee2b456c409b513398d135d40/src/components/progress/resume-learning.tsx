'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { PlayIcon } from '@heroicons/react/24/solid'

interface RecentProgress {
  courseId: string
  moduleId: string
  lastAccessedAt: string
  course: {
    title: string
    slug: string
    thumbnailUrl: string
    category: string
  }
  module: {
    title: string
    order: number
  }
}

export function ResumeLearning() {
  const [recentProgress, setRecentProgress] = useState<RecentProgress[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRecentProgress()
  }, [])

  const fetchRecentProgress = async () => {
    try {
      const response = await fetch('/api/user/progress?recent=true')
      if (response.ok) {
        const data = await response.json()
        setRecentProgress(data.slice(0, 3)) // Show last 3 accessed
      }
    } catch (error) {
      console.error('Error fetching recent progress:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-6 bg-gray-200 rounded mb-4 w-48"></div>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-md">
              <div className="h-16 w-16 bg-gray-200 rounded"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (recentProgress.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Resume Learning</h3>
        <p className="text-gray-500">No recent learning activity found</p>
        <Link
          href="/courses"
          className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Browse Courses
        </Link>
      </div>
    )
  }

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Resume Learning</h3>
      <div className="space-y-4">
        {recentProgress.map((progress) => (
          <Link
            key={`${progress.courseId}-${progress.moduleId}`}
            href={`/learn/${progress.course.slug}`}
            className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow group"
          >
            <div className="relative h-16 w-16 rounded-lg overflow-hidden">
              <Image
                src={progress.course.thumbnailUrl}
                alt={progress.course.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <PlayIcon className="h-6 w-6 text-white" />
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-gray-900 truncate">
                {progress.course.title}
              </h4>
              <p className="text-sm text-gray-600 truncate">
                Module {progress.module.order}: {progress.module.title}
              </p>
              <p className="text-xs text-gray-500">
                Last accessed {new Date(progress.lastAccessedAt).toLocaleDateString()}
              </p>
            </div>
            
            <div className="text-right">
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                {progress.course.category}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
