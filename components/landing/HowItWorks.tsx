export function HowItWorks() {
  const steps = [
    {
      number: '1',
      title: 'Choose Template',
      description: 'Select from 6 beautiful themes - traditional, royal, or modern. 2 free options available!',
      icon: '🎨',
    },
    {
      number: '2',
      title: 'Customize Content',
      description: 'Add your names, dates, venue, photos. Edit any section - easy forms guide you through.',
      icon: '✏️',
    },
    {
      number: '3',
      title: 'Preview & Edit',
      description: 'See your invitation live. Make changes until it\'s perfect. Save and come back anytime.',
      icon: '👁️',
    },
    {
      number: '4',
      title: 'Publish & Share',
      description: 'Get your shareable link instantly. Share via WhatsApp, email, or social media in seconds.',
      icon: '🚀',
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Create your wedding invitation in 4 simple steps. Ready in under 2 minutes.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-orange-200 to-pink-200 transform translate-y-1/2 z-0"></div>
              )}

              {/* Step card */}
              <div className="relative z-10 text-center">
                {/* Step number */}
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-600 to-pink-600 text-white text-2xl font-bold rounded-full shadow-lg mb-4">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="text-5xl mb-4">
                  {step.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-50 rounded-full border border-green-200">
            <span className="text-green-600 font-semibold">⚡ Average time: 2 minutes</span>
          </div>
        </div>
      </div>
    </section>
  )
}
