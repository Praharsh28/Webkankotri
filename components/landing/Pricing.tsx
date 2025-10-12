import Link from 'next/link'

export function Pricing() {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Start free, upgrade when you're ready. No hidden fees, no subscriptions.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Free */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-100">
            <div className="text-center mb-6">
              <div className="text-4xl mb-3">🆓</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Free</h3>
              <div className="text-5xl font-bold text-gray-900 mb-2">₹0</div>
              <p className="text-gray-600">Perfect to get started</p>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <span className="text-green-500 text-xl flex-shrink-0">✓</span>
                <span className="text-gray-700">2 Free templates</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 text-xl flex-shrink-0">✓</span>
                <span className="text-gray-700">All 19 sections</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 text-xl flex-shrink-0">✓</span>
                <span className="text-gray-700">Unlimited edits</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 text-xl flex-shrink-0">✓</span>
                <span className="text-gray-700">Shareable link</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 text-xl flex-shrink-0">✓</span>
                <span className="text-gray-700">Mobile optimized</span>
              </li>
            </ul>

            <Link
              href="/templates"
              className="block w-full px-6 py-3 bg-gray-100 text-gray-800 font-semibold rounded-lg text-center hover:bg-gray-200 transition-colors"
            >
              Start Free
            </Link>
          </div>

          {/* Basic */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-orange-500 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-sm font-bold rounded-full">
              POPULAR
            </div>

            <div className="text-center mb-6">
              <div className="text-4xl mb-3">⭐</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Basic</h3>
              <div className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent mb-2">₹99</div>
              <p className="text-gray-600">One-time payment</p>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <span className="text-green-500 text-xl flex-shrink-0">✓</span>
                <span className="text-gray-700"><strong>Everything in Free</strong></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 text-xl flex-shrink-0">✓</span>
                <span className="text-gray-700">2 Premium templates</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 text-xl flex-shrink-0">✓</span>
                <span className="text-gray-700">Royal & elegant themes</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 text-xl flex-shrink-0">✓</span>
                <span className="text-gray-700">Advanced customization</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 text-xl flex-shrink-0">✓</span>
                <span className="text-gray-700">Priority support</span>
              </li>
            </ul>

            <Link
              href="/templates"
              className="block w-full px-6 py-3 bg-gradient-to-r from-orange-600 to-pink-600 text-white font-semibold rounded-lg text-center hover:shadow-lg hover:scale-105 transition-all"
            >
              Get Started
            </Link>
          </div>

          {/* Premium */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-100">
            <div className="text-center mb-6">
              <div className="text-4xl mb-3">💎</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Premium</h3>
              <div className="text-5xl font-bold text-gray-900 mb-2">₹149</div>
              <p className="text-gray-600">Best value</p>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <span className="text-green-500 text-xl flex-shrink-0">✓</span>
                <span className="text-gray-700"><strong>Everything in Basic</strong></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 text-xl flex-shrink-0">✓</span>
                <span className="text-gray-700">2 Modern templates</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 text-xl flex-shrink-0">✓</span>
                <span className="text-gray-700">Unique contemporary style</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 text-xl flex-shrink-0">✓</span>
                <span className="text-gray-700">RSVP tracking</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 text-xl flex-shrink-0">✓</span>
                <span className="text-gray-700">Analytics dashboard</span>
              </li>
            </ul>

            <Link
              href="/templates"
              className="block w-full px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg text-center hover:bg-gray-900 transition-colors"
            >
              Choose Premium
            </Link>
          </div>
        </div>

        {/* Note */}
        <div className="text-center mt-12">
          <p className="text-gray-600">
            <span className="text-green-600 font-semibold">✓</span> All plans include unlimited edits and views. No expiry. Pay once, use forever.
          </p>
        </div>
      </div>
    </section>
  )
}
