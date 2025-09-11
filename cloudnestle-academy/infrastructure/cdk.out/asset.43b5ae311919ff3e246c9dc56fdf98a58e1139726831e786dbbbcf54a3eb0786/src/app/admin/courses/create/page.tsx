'use client'

import { CourseForm } from '@/components/admin/course-form'

export default function CreateCoursePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Course</h1>
            <p className="text-gray-600">Add a new course to your academy</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <CourseForm />
          </div>
        </div>
      </div>
    </div>
  )
}
