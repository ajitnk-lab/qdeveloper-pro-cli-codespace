'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { PlusIcon, PencilIcon, EyeIcon } from '@heroicons/react/24/outline'

interface Course {
  id: string
  title: string
  slug: string
  category: string
  difficulty: string
  price: number
  thumbnailUrl: string
  isPublished: boolean
  createdAt: string
  _count: {
    modules: number
  }
}

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      const response = await fetch('/api/admin/courses')
      if (response.ok) {
        const data = await response.json()
        setCourses(data)
      }
    } catch (error) {
      console.error('Error fetching courses:', error)
    } finally {
      setLoading(false)
    }
  }

  const togglePublish = async (courseId: string, isPublished: boolean) => {
    try {
      const response = await fetch(`/api/admin/courses/${courseId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPublished: !isPublished }),
      })

      if (response.ok) {
        fetchCourses()
      }
    } catch (error) {
      console.error('Error updating course:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-6 w-64"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="h-32 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Courses</h1>
            <p className="text-gray-600">Create and manage your course catalog</p>
          </div>
          <Link
            href="/admin/courses/create"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Create Course
          </Link>
        </div>

        {courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative h-32">
                  <Image
                    src={course.thumbnailUrl}
                    alt={course.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <span className={`px-2 py-1 text-xs rounded-full text-white ${
                      course.isPublished ? 'bg-green-500' : 'bg-gray-500'
                    }`}>
                      {course.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="mb-2">
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {course.category}
                    </span>
                    <span className={`ml-2 text-sm px-2 py-1 rounded ${
                      course.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                      course.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {course.difficulty}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {course.title}
                  </h3>
                  
                  <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                    <span>{course._count.modules} modules</span>
                    <span>${course.price}</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/courses/${course.id}/edit`}
                      className="flex-1 bg-gray-200 text-gray-800 px-3 py-2 rounded-md hover:bg-gray-300 transition-colors text-center flex items-center justify-center"
                    >
                      <PencilIcon className="h-4 w-4 mr-1" />
                      Edit
                    </Link>
                    <Link
                      href={`/courses/${course.slug}`}
                      className="flex-1 bg-blue-200 text-blue-800 px-3 py-2 rounded-md hover:bg-blue-300 transition-colors text-center flex items-center justify-center"
                    >
                      <EyeIcon className="h-4 w-4 mr-1" />
                      View
                    </Link>
                    <button
                      onClick={() => togglePublish(course.id, course.isPublished)}
                      className={`flex-1 px-3 py-2 rounded-md transition-colors text-center ${
                        course.isPublished
                          ? 'bg-red-200 text-red-800 hover:bg-red-300'
                          : 'bg-green-200 text-green-800 hover:bg-green-300'
                      }`}
                    >
                      {course.isPublished ? 'Unpublish' : 'Publish'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <p className="text-gray-500 mb-4">No courses found</p>
            <Link
              href="/admin/courses/create"
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
            >
              Create Your First Course
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
