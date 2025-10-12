'use client'

import Link from 'next/link'
import { useState } from 'react'

interface Template {
  id: string
  template_id: string
  name: string
  description: string
  category: string
  price_tier: string
  price: number
  config: any
  thumbnail_url?: string
}

interface TemplateCardProps {
  template: Template
}

export function TemplateCard({ template }: TemplateCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Extract colors from config with safe defaults
  const config = template.config || {}
  const colors = config.colors || {}
  const primaryColor = colors.primary || '#800020'
  const secondaryColor = colors.secondary || '#D4AF37'
  const accentColor = colors.accent || '#F0E68C'
  
  // Extract fonts safely
  const fonts = config.fonts || {}
  const headingFont = fonts.heading?.english || 'Playfair Display'
  const bodyFont = fonts.body?.english || 'Inter'

  // Price tier badges
  const tierConfig = {
    free: { label: 'FREE', color: 'bg-green-500', textColor: 'text-white' },
    basic: { label: 'BASIC', color: 'bg-blue-500', textColor: 'text-white' },
    premium: { label: 'PREMIUM', color: 'bg-purple-500', textColor: 'text-white' },
  }

  const tier = tierConfig[template.price_tier as keyof typeof tierConfig] || tierConfig.free

  return (
    <div
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Color Preview */}
      <div className="relative h-48 overflow-hidden">
        {/* Gradient Background */}
        <div 
          className="absolute inset-0 transition-transform duration-500 group-hover:scale-110"
          style={{
            background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 50%, ${accentColor} 100%)`
          }}
        />
        
        {/* Overlay Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent" />
        
        {/* Price Badge */}
        <div className="absolute top-4 right-4">
          <div className={`${tier.color} ${tier.textColor} px-3 py-1 rounded-full text-xs font-bold shadow-lg`}>
            {tier.label}
          </div>
        </div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-800">
            {template.category.charAt(0).toUpperCase() + template.category.slice(1)}
          </div>
        </div>

        {/* Color Palette Preview */}
        <div className="absolute bottom-4 left-4 flex space-x-2">
          <div 
            className="w-8 h-8 rounded-full border-2 border-white shadow-lg"
            style={{ backgroundColor: primaryColor }}
            title="Primary Color"
          />
          <div 
            className="w-8 h-8 rounded-full border-2 border-white shadow-lg"
            style={{ backgroundColor: secondaryColor }}
            title="Secondary Color"
          />
          <div 
            className="w-8 h-8 rounded-full border-2 border-white shadow-lg"
            style={{ backgroundColor: accentColor }}
            title="Accent Color"
          />
        </div>

        {/* Hover Overlay */}
        <div className={`absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="text-white text-center">
            <div className="text-4xl mb-2">👁️</div>
            <p className="text-sm font-semibold">Click to Preview</p>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        {/* Template Name */}
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          {template.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {template.description}
        </p>

        {/* Fonts Preview */}
        <div className="mb-4 text-xs text-gray-500">
          <p>
            <span className="font-semibold">Fonts:</span>{' '}
            {headingFont}, {bodyFont}
          </p>
        </div>

        {/* Price & Action */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            {template.price === 0 ? (
              <span className="text-2xl font-bold text-green-600">FREE</span>
            ) : (
              <div>
                <span className="text-2xl font-bold text-gray-800">₹{template.price}</span>
                <span className="text-sm text-gray-500 ml-1">one-time</span>
              </div>
            )}
          </div>

          <Link
            href={`/create?template=${template.template_id}`}
            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-200"
          >
            Use Template
          </Link>
        </div>

        {/* Features */}
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
            ✨ Customizable
          </span>
          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
            📱 Responsive
          </span>
          {(config.isPremium || template.price_tier !== 'free') && (
            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
              ⭐ Premium
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
