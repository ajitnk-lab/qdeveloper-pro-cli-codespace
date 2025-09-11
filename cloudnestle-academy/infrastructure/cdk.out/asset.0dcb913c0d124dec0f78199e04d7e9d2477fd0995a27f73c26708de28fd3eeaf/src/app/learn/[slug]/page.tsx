'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/use-auth'
import { CoursePlayer } from '@/components/learn/course-player'

interface Module {
  id: string
  title: string
  duration: number
  order: number
  isPreview: boolean
}

interface Progress {
  moduleId: string
  completedAt: string | null
  timeSpent: number
}

interface Course {
  id: string
  title: string
  slug: string
  modules: Module[]
  progress: Progress[]
}

export default function LearnPage() {
  const params = useParams()
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const [course, setCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/signin')
      return
    }

    if (params.slug) {
      fetchCourse()
    }
  }, [isAuthenticated, params.slug, router])

  const fetchCourse = async () => {
    try {
      setLoading(true)
      
      // Check if user has access to this course
      const coursesResponse = await fetch('/api/user/courses')
      if (!coursesResponse.ok) {
        throw new Error('Failed to fetch user courses')
      }
      
      const userCourses = await coursesResponse.json()
      const userCourse = userCourses.find((c: any) => c.slug === params.slug)
      
      if (!userCourse) {
        setError('You do not have access to this course')
        return
      }

      setCourse(userCourse)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  const handleProgressUpdate = async (moduleId: string, completed: boolean, timeSpent?: number) => {
    try {
      const response = await fetch('/api/user/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseId: course?.id,
          moduleId,
          completed,
          timeSpent,
        }),
      })

      if (response.ok) {
        // Update local progress state
        setCourse(prev => {
          if (!prev) return prev
          
          const updatedProgress = prev.progress.map(p => 
            p.moduleId === moduleId 
              ? { 
                  ...p, 
                  completedAt: completed ? new Date().toISOString() : null,
                  timeSpent: (p.timeSpent || 0) + (timeSpent || 0)
                }
              : p
          )

          // Add progress entry if it doesn't exist
          if (!prev.progress.find(p => p.moduleId === moduleId)) {
            updatedProgress.push({
              moduleId,
              completedAt: completed ? new Date().toISOString() : null,
              timeSpent: timeSpent || 0,
            })
          }

          return { ...prev, progress: updatedProgress }
        })
      }
    } catch (error) {
      console.error('Error updating progress:', error)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Please sign in</h1>
          <p className="text-gray-600">You need to be signed in to access courses</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600 mb-4">
            {error || 'You do not have access to this course'}
          </p>
          <button
            onClick={() => router.push('/dashboard')}
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <CoursePlayer
      courseId={course.id}
      courseSlug={course.slug}
      modules={course.modules}
      progress={course.progress}
      onProgressUpdate={handleProgressUpdate}
    />
  )
}
