'use client'

import { useState, useEffect } from 'react'
import { ClockIcon, BookOpenIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

interface ProgressData {
  totalModulesAccessed: number
  completedModules: number
  totalTimeSpent: number
  averageTimePerModule: number
  courseProgress: Array<{
    courseId: string
    title: string
    slug: string
    totalModules: number
    completedModules: number
    completionRate: number
    timeSpent: number
  }>
}

export function ProgressTracker() {
  const [data, setData] = useState<ProgressData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/user/analytics')
      if (response.ok) {
        const analytics = await response.json()
        setData(analytics)
      }
    } catch (error) {
      console.error('Error fetching analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`
  }

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-8 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No progress data available</p>
      </div>
    )
  }

  return (
    <div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <BookOpenIcon className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Modules Accessed</p>
              <p className="text-2xl font-bold text-gray-900">{data.totalModulesAccessed}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <CheckCircleIcon className="h-8 w-8 text-green-600 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Completed Modules</p>
              <p className="text-2xl font-bold text-gray-900">{data.completedModules}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <ClockIcon className="h-8 w-8 text-purple-600 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Total Time Spent</p>
              <p className="text-2xl font-bold text-gray-900">{formatTime(data.totalTimeSpent)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Course Progress */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Progress</h3>
        
        {data.courseProgress.length > 0 ? (
          <div className="space-y-4">
            {data.courseProgress.map((course) => (
              <div key={course.courseId} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-medium text-gray-900">{course.title}</h4>
                    <p className="text-sm text-gray-600">
                      {course.completedModules} of {course.totalModules} modules completed
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {Math.round(course.completionRate)}%
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatTime(course.timeSpent)} spent
                    </p>
                  </div>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${course.completionRate}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">
            No course progress yet. Start learning to see your progress here!
          </p>
        )}
      </div>
    </div>
  )
}
