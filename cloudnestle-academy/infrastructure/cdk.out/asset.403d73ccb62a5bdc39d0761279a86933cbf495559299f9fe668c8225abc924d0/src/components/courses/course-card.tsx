'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Course } from '@prisma/client'
import { useAddToCart } from '@/hooks/use-add-to-cart'

interface CourseCardProps {
  course: Course & {
    modules: Array<{
      id: string
      title: string
      duration: number
      order: number
      isPreview: boolean
    }>
    _count: {
      modules: number
    }
  }
}

export function CourseCard({ course }: CourseCardProps) {
  const { addToCart, loading } = useAddToCart()
  const totalDuration = course.modules.reduce((acc, module) => acc + module.duration, 0)
  const previewModules = course.modules.filter(m => m.isPreview).length

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addToCart(course)
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        <Image
          src={course.thumbnailUrl}
          alt={course.title}
          fill
          className="object-cover"
        />
        <div className="absolute top-2 right-2">
          <span className={`px-2 py-1 text-xs rounded-full text-white ${
            course.difficulty === 'beginner' ? 'bg-green-500' :
            course.difficulty === 'intermediate' ? 'bg-yellow-500' : 'bg-red-500'
          }`}>
            {course.difficulty}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="mb-2">
          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {course.category}
          </span>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {course.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {course.description}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <span>{course._count.modules} modules</span>
          <span>{Math.floor(totalDuration / 60)}h {totalDuration % 60}m</span>
          {previewModules > 0 && (
            <span className="text-blue-600">{previewModules} preview</span>
          )}
        </div>
        
        {course.tags && course.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {course.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
            {course.tags.length > 3 && (
              <span className="text-xs text-gray-500">
                +{course.tags.length - 3} more
              </span>
            )}
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <div className="text-lg font-bold text-gray-900">
            ${course.price}
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleAddToCart}
              disabled={loading}
              className="bg-gray-200 text-gray-800 px-3 py-2 rounded-md hover:bg-gray-300 transition-colors disabled:opacity-50 text-sm"
            >
              {loading ? 'Adding...' : 'Add to Cart'}
            </button>
            <Link
              href={`/courses/${course.slug}`}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm"
            >
              View Course
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
