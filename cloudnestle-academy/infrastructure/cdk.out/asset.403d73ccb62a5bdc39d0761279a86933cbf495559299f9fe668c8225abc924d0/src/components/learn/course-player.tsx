'use client'

import { useState, useEffect } from 'react'
import { ContentRenderer } from '@/components/content/content-renderer'
import { ChevronLeftIcon, ChevronRightIcon, CheckIcon } from '@heroicons/react/24/outline'

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

interface CoursePlayerProps {
  courseId: string
  courseSlug: string
  modules: Module[]
  progress: Progress[]
  onProgressUpdate: (moduleId: string, completed: boolean, timeSpent?: number) => void
}

export function CoursePlayer({ 
  courseId, 
  courseSlug, 
  modules, 
  progress, 
  onProgressUpdate 
}: CoursePlayerProps) {
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0)
  const [startTime, setStartTime] = useState<number>(Date.now())

  const currentModule = modules[currentModuleIndex]
  const currentProgress = progress.find(p => p.moduleId === currentModule?.id)
  const isCompleted = !!currentProgress?.completedAt

  useEffect(() => {
    setStartTime(Date.now())
  }, [currentModuleIndex])

  const handlePrevious = () => {
    if (currentModuleIndex > 0) {
      recordTimeSpent()
      setCurrentModuleIndex(currentModuleIndex - 1)
    }
  }

  const handleNext = () => {
    if (currentModuleIndex < modules.length - 1) {
      recordTimeSpent()
      setCurrentModuleIndex(currentModuleIndex + 1)
    }
  }

  const handleMarkComplete = () => {
    if (currentModule) {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000)
      onProgressUpdate(currentModule.id, true, timeSpent)
    }
  }

  const recordTimeSpent = () => {
    if (currentModule) {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000)
      onProgressUpdate(currentModule.id, isCompleted, timeSpent)
    }
  }

  const goToModule = (index: number) => {
    recordTimeSpent()
    setCurrentModuleIndex(index)
  }

  if (!currentModule) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">No modules available</p>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - Module List */}
      <div className="w-80 bg-white shadow-lg overflow-y-auto">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Course Modules</h2>
          <div className="text-sm text-gray-600 mt-1">
            {progress.filter(p => p.completedAt).length} of {modules.length} completed
          </div>
        </div>
        
        <div className="p-2">
          {modules.map((module, index) => {
            const moduleProgress = progress.find(p => p.moduleId === module.id)
            const isModuleCompleted = !!moduleProgress?.completedAt
            const isCurrent = index === currentModuleIndex
            
            return (
              <button
                key={module.id}
                onClick={() => goToModule(index)}
                className={`w-full text-left p-3 rounded-lg mb-2 transition-colors ${
                  isCurrent
                    ? 'bg-blue-100 border-l-4 border-blue-500'
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500 mr-2">
                        {index + 1}.
                      </span>
                      <h3 className={`font-medium ${
                        isCurrent ? 'text-blue-900' : 'text-gray-900'
                      }`}>
                        {module.title}
                      </h3>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {module.duration} minutes
                      {module.isPreview && (
                        <span className="ml-2 text-blue-600 font-medium">Preview</span>
                      )}
                    </div>
                  </div>
                  {isModuleCompleted && (
                    <CheckIcon className="h-5 w-5 text-green-500" />
                  )}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white shadow-sm border-b p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                {currentModule.title}
              </h1>
              <div className="text-sm text-gray-600 mt-1">
                Module {currentModuleIndex + 1} of {modules.length} • {currentModule.duration} minutes
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {!isCompleted && (
                <button
                  onClick={handleMarkComplete}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                >
                  Mark Complete
                </button>
              )}
              {isCompleted && (
                <span className="flex items-center text-green-600">
                  <CheckIcon className="h-5 w-5 mr-1" />
                  Completed
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <ContentRenderer
            courseId={courseId}
            moduleId={currentModule.id}
            className="max-w-4xl mx-auto"
          />
        </div>

        {/* Navigation */}
        <div className="bg-white border-t p-4">
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={currentModuleIndex === 0}
              className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeftIcon className="h-5 w-5 mr-1" />
              Previous
            </button>
            
            <div className="text-sm text-gray-600">
              {currentModuleIndex + 1} / {modules.length}
            </div>
            
            <button
              onClick={handleNext}
              disabled={currentModuleIndex === modules.length - 1}
              className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ChevronRightIcon className="h-5 w-5 ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
