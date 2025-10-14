'use client'

import { useState } from 'react'
import { TemplateCard } from './TemplateCard'

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

interface TemplateGridProps {
  templates: Template[]
}

export function TemplateGrid({ templates }: TemplateGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(templates.map(t => t.category)))]

  // Filter templates by category
  const filteredTemplates = selectedCategory === 'all' 
    ? templates 
    : templates.filter(t => t.category === selectedCategory)

  // Count templates by category
  const categoryCounts = {
    all: templates.length,
    traditional: templates.filter(t => t.category === 'traditional').length,
    elegant: templates.filter(t => t.category === 'elegant').length,
    modern: templates.filter(t => t.category === 'modern').length,
  }

  return (
    <div>
      {/* Category Filters - Mobile Optimized with 44px min tap targets */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
          {categories.map((category) => {
            const isSelected = selectedCategory === category
            const count = categoryCounts[category as keyof typeof categoryCounts] || 0
            
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`min-h-[44px] px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-medium text-xs sm:text-sm transition-all shadow-sm active:scale-95 ${
                  isSelected
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg sm:scale-105'
                    : 'bg-white text-gray-700 hover:shadow-md sm:hover:scale-105'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
                <span className={`ml-1.5 sm:ml-2 text-[10px] sm:text-xs ${
                  isSelected ? 'text-purple-100' : 'text-gray-500'
                }`}>
                  ({count})
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Template Count */}
      <div className="text-center mb-6">
        <p className="text-gray-600">
          Showing <span className="font-bold">{filteredTemplates.length}</span> {filteredTemplates.length === 1 ? 'template' : 'templates'}
        </p>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTemplates.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>

      {/* Empty State */}
      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            No templates found
          </h3>
          <p className="text-gray-600">
            Try selecting a different category
          </p>
        </div>
      )}
    </div>
  )
}
