'use client'

interface TemplateControlsProps {
  values: {
    structure?: {
      containerWidth?: string
      sectionSpacing?: string
      layout?: string
    }
    cultural?: {
      ornamentStyle?: string
      decorativeElements?: boolean
      traditionalPatterns?: boolean
    }
  }
  onChange: (category: string, key: string, value: any) => void
}

export function TemplateControls({ values, onChange }: TemplateControlsProps) {
  return (
    <div className="space-y-6">
      {/* Structure */}
      <div>
        <h3 className="text-sm font-bold text-white mb-3 uppercase tracking-wide">
          🏗️ Structure
        </h3>
        <div className="space-y-3">
          <div>
            <label className="block text-xs text-gray-400 mb-2 font-medium">Container Width</label>
            <select
              value={values.structure?.containerWidth || 'medium'}
              onChange={(e) => onChange('structure', 'containerWidth', e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-700 text-sm"
            >
              <option value="narrow">Narrow (600px)</option>
              <option value="medium">Medium (800px)</option>
              <option value="wide">Wide (1000px)</option>
              <option value="full">Full Width</option>
            </select>
          </div>
          
          <div>
            <label className="block text-xs text-gray-400 mb-2 font-medium">Section Spacing</label>
            <select
              value={values.structure?.sectionSpacing || 'normal'}
              onChange={(e) => onChange('structure', 'sectionSpacing', e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-700 text-sm"
            >
              <option value="tight">Tight - Compact (0.5rem)</option>
              <option value="normal">Normal - Balanced (2rem)</option>
              <option value="loose">Loose - Spacious (4rem)</option>
              <option value="dramatic">Dramatic - Bold (8rem)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-xs text-gray-400 mb-2 font-medium">Layout Style</label>
            <select
              value={values.structure?.layout || 'single-column'}
              onChange={(e) => onChange('structure', 'layout', e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-700 text-sm"
            >
              <option value="single-column">Single Column - Traditional</option>
              <option value="two-column">Two Column - Modern</option>
              <option value="masonry">Masonry - Dynamic</option>
              <option value="card-grid">Card Grid - Stylish</option>
            </select>
          </div>
        </div>
      </div>

      {/* Cultural Style */}
      <div>
        <h3 className="text-sm font-bold text-white mb-3 uppercase tracking-wide">
          🎭 Cultural Style
        </h3>
        <div className="space-y-3">
          <div>
            <label className="block text-xs text-gray-400 mb-2 font-medium">Ornament Style</label>
            <select
              value={values.cultural?.ornamentStyle || 'moderate'}
              onChange={(e) => onChange('cultural', 'ornamentStyle', e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-700 text-sm"
            >
              <option value="minimal">Minimal - Clean & Simple</option>
              <option value="moderate">Moderate - Balanced Decor</option>
              <option value="elaborate">Elaborate - Rich & Ornate</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="flex items-center gap-3 p-3 rounded-lg border border-gray-700 hover:border-purple-500 cursor-pointer transition-all">
              <input
                type="checkbox"
                checked={values.cultural?.decorativeElements || false}
                onChange={(e) => onChange('cultural', 'decorativeElements', e.target.checked)}
                className="w-5 h-5 rounded text-purple-600"
              />
              <div className="flex-1">
                <div className="text-sm font-medium text-white">Decorative Elements</div>
                <div className="text-xs text-gray-400">Add traditional decorative borders and patterns</div>
              </div>
            </label>
            
            <label className="flex items-center gap-3 p-3 rounded-lg border border-gray-700 hover:border-purple-500 cursor-pointer transition-all">
              <input
                type="checkbox"
                checked={values.cultural?.traditionalPatterns || false}
                onChange={(e) => onChange('cultural', 'traditionalPatterns', e.target.checked)}
                className="w-5 h-5 rounded text-purple-600"
              />
              <div className="flex-1">
                <div className="text-sm font-medium text-white">Traditional Patterns</div>
                <div className="text-xs text-gray-400">Include cultural motifs and designs</div>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}
