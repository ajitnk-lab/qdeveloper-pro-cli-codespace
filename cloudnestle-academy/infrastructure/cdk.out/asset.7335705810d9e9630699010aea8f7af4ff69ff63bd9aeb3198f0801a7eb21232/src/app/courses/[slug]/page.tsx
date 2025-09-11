'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { useAuth } from '@/hooks/use-auth'
import { useAddToCart } from '@/hooks/use-add-to-cart'

interface CourseModule {
  id: string
  title: string
  duration: number
  order: number
  isPreview: boolean
}

interface Course {
  id: string
  title: string
  description: string
  slug: string
  category: string
  difficulty: string
  duration: number
  price: number
  thumbnailUrl: string
  instructorId: string
  isPublished: boolean
  tags: string[]
  modules: CourseModule[]
}

export default function CoursePage() {
  const params = useParams()
  const { user, isAuthenticated } = useAuth()
  const { addToCart, loading: addingToCart } = useAddToCart()
  const [course, setCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCourse() {
      try {
        setLoading(true)
        const response = await fetch(`/api/courses/${params.slug}`)
        
        if (!response.ok) {
          throw new Error('Course not found')
        }
        
        const data = await response.json()
        setCourse(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    if (params.slug) {
      fetchCourse()
    }
  }, [params.slug])

  const handleAddToCart = () => {
    if (course) {
      addToCart(course)
    }
  }

  const handleEnrollNow = () => {
    // TODO: Implement direct enrollment
    console.log('Enroll now:', course?.id)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-64 bg-gray-200 rounded-lg mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="h-8 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
              <div>
                <div className="h-32 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Course Not Found</h1>
          <p className="text-gray-600">{error || 'The course you are looking for does not exist.'}</p>
        </div>
      </div>
    )
  }

  const totalDuration = course.modules.reduce((acc, module) => acc + module.duration, 0)
  const previewModules = course.modules.filter(m => m.isPreview)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="relative h-64 rounded-lg overflow-hidden mb-8">
          <Image
            src={course.thumbnailUrl}
            alt={course.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center">
            <div className="text-white p-8">
              <div className="mb-2">
                <span className="bg-blue-600 px-3 py-1 rounded-full text-sm">
                  {course.category}
                </span>
                <span className={`ml-2 px-3 py-1 rounded-full text-sm ${
                  course.difficulty === 'beginner' ? 'bg-green-500' :
                  course.difficulty === 'intermediate' ? 'bg-yellow-500' : 'bg-red-500'
                }`}>
                  {course.difficulty}
                </span>
              </div>
              <h1 className="text-4xl font-bold mb-2">{course.title}</h1>
              <p className="text-lg opacity-90">{course.description}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Course Info */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-2xl font-bold mb-4">Course Overview</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{course.modules.length}</div>
                  <div className="text-sm text-gray-600">Modules</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {Math.floor(totalDuration / 60)}h {totalDuration % 60}m
                  </div>
                  <div className="text-sm text-gray-600">Duration</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{previewModules.length}</div>
                  <div className="text-sm text-gray-600">Preview</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">${course.price}</div>
                  <div className="text-sm text-gray-600">Price</div>
                </div>
              </div>

              {course.tags && course.tags.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {course.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Course Modules */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">Course Content</h2>
              <div className="space-y-3">
                {course.modules.map((module, index) => (
                  <div
                    key={module.id}
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                  >
                    <div className="flex items-center">
                      <span className="text-gray-500 mr-3">{index + 1}.</span>
                      <div>
                        <h4 className="font-medium">{module.title}</h4>
                        <div className="text-sm text-gray-500">
                          {module.duration} minutes
                          {module.isPreview && (
                            <span className="ml-2 text-blue-600 font-medium">Preview</span>
                          )}
                        </div>
                      </div>
                    </div>
                    {module.isPreview && (
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        Watch Preview
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <div className="text-3xl font-bold text-gray-900 mb-4">
                ${course.price}
              </div>
              
              {isAuthenticated ? (
                <div className="space-y-3">
                  <button
                    onClick={handleEnrollNow}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Enroll Now
                  </button>
                  <button
                    onClick={handleAddToCart}
                    disabled={addingToCart}
                    className="w-full bg-gray-200 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors font-medium disabled:opacity-50"
                  >
                    {addingToCart ? 'Adding to Cart...' : 'Add to Cart'}
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-gray-600 mb-4">Sign in to enroll in this course</p>
                  <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    Sign In
                  </button>
                </div>
              )}

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold mb-3">This course includes:</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <span className="mr-2">📹</span>
                    {Math.floor(totalDuration / 60)} hours of video content
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">📱</span>
                    Access on mobile and desktop
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">🎓</span>
                    Certificate of completion
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">♾️</span>
                    Lifetime access
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
