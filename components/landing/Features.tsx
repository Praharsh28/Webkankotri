export function Features() {
  const features = [
    {
      icon: '🎨',
      title: 'Beautiful Templates',
      description: '6 stunning themes from traditional to modern. Each carefully designed for elegance and impact.',
    },
    {
      icon: '⚡',
      title: 'Lightning Fast',
      description: 'Create your invitation in under 2 minutes. Simple 4-step wizard guides you through everything.',
    },
    {
      icon: '📱',
      title: 'Mobile First',
      description: '90% of guests view on mobile. Our invitations look perfect on every device and screen size.',
    },
    {
      icon: '✏️',
      title: 'Easy Customization',
      description: 'Edit sections, change colors, add your photos. Full control with zero design skills needed.',
    },
    {
      icon: '💾',
      title: 'Save & Edit Anytime',
      description: 'All invitations saved to your dashboard. Edit, update, or republish whenever you want.',
    },
    {
      icon: '🔗',
      title: 'Instant Sharing',
      description: 'Get a shareable link instantly. Share via WhatsApp, email, or social media in one click.',
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Everything You Need
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Professional wedding invitations made simple. No technical skills required.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 rounded-2xl border-2 border-gray-100 hover:border-orange-200 hover:shadow-xl transition-all duration-300"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
