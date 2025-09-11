'use client'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Temporary bypass for demo - remove in production
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b mb-8">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Demo Mode - Admin Access</p>
        </div>
      </div>
      {children}
    </div>
  )
}
