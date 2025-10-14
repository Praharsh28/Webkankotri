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
      {/* Header - Mobile Optimized */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center gap-2">
            <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
              <Link href="/dashboard" className="text-2xl hover:scale-110 transition-transform flex-shrink-0">
                🪔
              </Link>
              <div className="min-w-0">
                <h1 className="text-lg sm:text-2xl font-bold text-gray-800 truncate">Choose Your Theme</h1>
                <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">Select a beautiful template</p>
              </div>
            </div>
            
            <Link 
              href="/dashboard"
              className="px-3 py-2 sm:px-4 text-gray-700 hover:text-gray-900 font-medium text-xs sm:text-sm transition-colors flex-shrink-0 whitespace-nowrap"
            >
              <span className="hidden sm:inline">← Back to Dashboard</span>
              <span className="sm:hidden">← Back</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero Section - Mobile Optimized */}
        <div className="text-center mb-8 sm:mb-12 px-2">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-3 sm:mb-4 leading-tight">
            Beautiful Wedding Invitations
          </h2>
          <p className="text-sm sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
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

        {/* Features Section - Mobile Optimized */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8">
          <div className="text-center p-4 sm:p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🎨</div>
            <h3 className="font-bold text-base sm:text-lg mb-2">Fully Customizable</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Change colors, fonts, and content to match your style
            </p>
          </div>

          <div className="text-center p-4 sm:p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">📱</div>
            <h3 className="font-bold text-base sm:text-lg mb-2">Mobile Friendly</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Perfect viewing experience on all devices
            </p>
          </div>

          <div className="text-center p-4 sm:p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">⚡</div>
            <h3 className="font-bold text-base sm:text-lg mb-2">Instant Preview</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              See changes in real-time as you customize
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
