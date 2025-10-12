import Link from 'next/link'

export function Templates() {
  const templates = [
    {
      id: 'traditional',
      name: 'Traditional Gujarati',
      description: 'Elegant burgundy and rose gold with sophisticated warmth',
      price: 'FREE',
      gradient: 'from-red-900 to-rose-700',
      popular: false,
    },
    {
      id: 'royal',
      name: 'Royal Gold',
      description: 'Luxurious deep purple and metallic gold for grand celebrations',
      price: '₹99',
      gradient: 'from-purple-900 to-purple-700',
      popular: true,
    },
    {
      id: 'modern',
      name: 'Modern Minimal',
      description: 'Clean slate gray with vibrant coral accents',
      price: '₹149',
      gradient: 'from-slate-700 to-slate-500',
      popular: false,
    },
    {
      id: 'traditional-light',
      name: 'Traditional Light',
      description: 'Soft cream and warm gold tones with traditional elegance',
      price: 'FREE',
      gradient: 'from-amber-100 to-orange-200',
      popular: false,
    },
    {
      id: 'royal-light',
      name: 'Royal Light',
      description: 'Soft lavender with metallic gold accents',
      price: '₹99',
      gradient: 'from-purple-300 to-purple-400',
      popular: false,
    },
    {
      id: 'modern-light',
      name: 'Modern Light',
      description: 'Clean white with soft blue and coral',
      price: '₹149',
      gradient: 'from-blue-400 to-cyan-300',
      popular: false,
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Choose Your Perfect Theme
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            6 beautiful templates designed for Indian weddings. From traditional to modern, find your style.
          </p>
        </div>

        {/* Templates grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template) => (
            <div
              key={template.id}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              {/* Popular badge */}
              {template.popular && (
                <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs font-bold rounded-full">
                  ⭐ POPULAR
                </div>
              )}

              {/* Template preview */}
              <div className={`h-48 bg-gradient-to-br ${template.gradient} p-8 flex items-center justify-center`}>
                <div className="text-center text-white">
                  <div className="text-4xl mb-2">🪔</div>
                  <div className="text-2xl font-bold opacity-90">
                    {template.name.split(' ')[0]}
                  </div>
                </div>
              </div>

              {/* Template info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900">
                    {template.name}
                  </h3>
                  <span className={`text-lg font-bold ${template.price === 'FREE' ? 'text-green-600' : 'text-orange-600'}`}>
                    {template.price}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-6">
                  {template.description}
                </p>
                <Link
                  href={`/create?template=${template.id}`}
                  className="block w-full px-4 py-3 bg-gradient-to-r from-orange-600 to-pink-600 text-white font-semibold rounded-lg text-center hover:shadow-lg hover:scale-105 transition-all duration-200"
                >
                  Use This Template →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            href="/templates"
            className="inline-block px-8 py-4 bg-white text-gray-800 font-semibold rounded-xl shadow-md hover:shadow-lg border-2 border-gray-200 hover:scale-105 transition-all"
          >
            View All Templates
          </Link>
        </div>
      </div>
    </section>
  )
}
