import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { TemplateGrid } from '@/components/templates/TemplateGrid'

export default async function TemplatesPage() {
  const supabase = await createClient()
  
  // Fetch all active templates
  const { data: templates, error } = await supabase
    .from('templates')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('Error fetching templates:', error)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Link href="/dashboard" className="text-2xl hover:scale-110 transition-transform">
                🪔
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Choose Your Theme</h1>
                <p className="text-sm text-gray-600">Select a beautiful template for your invitation</p>
              </div>
            </div>
            
            <Link 
              href="/dashboard"
              className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium text-sm transition-colors"
            >
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Beautiful Wedding Invitations
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from our collection of professionally designed themes. 
            Customize every detail to match your special day.
          </p>
        </div>

        {/* Template Grid */}
        {templates && templates.length > 0 ? (
          <TemplateGrid templates={templates} />
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              No templates available
            </h3>
            <p className="text-gray-600 mb-6">
              Please run the seed migration to add templates.
            </p>
          </div>
        )}

        {/* Features Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-xl shadow-sm">
            <div className="text-4xl mb-4">🎨</div>
            <h3 className="font-bold text-lg mb-2">Fully Customizable</h3>
            <p className="text-sm text-gray-600">
              Change colors, fonts, and content to match your style
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-sm">
            <div className="text-4xl mb-4">📱</div>
            <h3 className="font-bold text-lg mb-2">Mobile Friendly</h3>
            <p className="text-sm text-gray-600">
              Perfect viewing experience on all devices
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-sm">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="font-bold text-lg mb-2">Instant Preview</h3>
            <p className="text-sm text-gray-600">
              See changes in real-time as you customize
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
