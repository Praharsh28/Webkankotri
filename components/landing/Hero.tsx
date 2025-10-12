import Link from 'next/link'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-orange-200/30 to-pink-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-purple-200/30 to-pink-200/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-orange-100">
            <span className="text-2xl">🪔</span>
            <span className="text-sm font-semibold text-gray-700">Digital Wedding Invitations</span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
            Create Beautiful
            <span className="block bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
              Wedding Invitations
            </span>
            <span className="block text-4xl md:text-5xl mt-2">in Minutes</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            Choose from stunning templates, customize your sections, and share your special day with loved ones. 
            <span className="font-semibold text-gray-800"> No design skills needed.</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link
              href="/templates"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-orange-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 text-lg"
            >
              Browse Templates ✨
            </Link>
            <Link
              href="/auth/signup"
              className="w-full sm:w-auto px-8 py-4 bg-white text-gray-800 font-semibold rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 border-2 border-gray-200 text-lg"
            >
              Sign Up Free
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-6 justify-center items-center pt-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span className="text-green-500 text-lg">✓</span>
              <span>2 Free Templates</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500 text-lg">✓</span>
              <span>Ready in 2 Minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500 text-lg">✓</span>
              <span>Mobile Friendly</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500 text-lg">✓</span>
              <span>Easy Sharing</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
