'use client'

interface TypographyControlsProps {
  values: {
    fontSize?: string
    fontWeight?: string
    lineHeight?: string
    letterSpacing?: string
    textTransform?: string
  }
  onChange: (key: string, value: string) => void
}

export function TypographyControls({ values, onChange }: TypographyControlsProps) {
  return (
    <div className="space-y-3">
      <div>
        <label className="block text-xs text-gray-400 mb-2 font-medium">Font Size</label>
        <select
          value={values.fontSize || 'md'}
          onChange={(e) => onChange('fontSize', e.target.value)}
          className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-700 text-sm"
        >
          <option value="xs">Extra Small (0.75rem)</option>
          <option value="sm">Small (0.875rem)</option>
          <option value="md">Medium (1rem)</option>
          <option value="lg">Large (1.125rem)</option>
          <option value="xl">XLarge (1.25rem)</option>
          <option value="2xl">2XLarge (1.5rem)</option>
          <option value="3xl">3XLarge (1.875rem)</option>
        </select>
      </div>
      
      <div>
        <label className="block text-xs text-gray-400 mb-2 font-medium">Font Weight</label>
        <select
          value={values.fontWeight || 'normal'}
          onChange={(e) => onChange('fontWeight', e.target.value)}
          className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-700 text-sm"
        >
          <option value="light">Light (300)</option>
          <option value="normal">Normal (400)</option>
          <option value="medium">Medium (500)</option>
          <option value="semibold">Semibold (600)</option>
          <option value="bold">Bold (700)</option>
        </select>
      </div>
      
      <div>
        <label className="block text-xs text-gray-400 mb-2 font-medium">Line Height</label>
        <select
          value={values.lineHeight || 'normal'}
          onChange={(e) => onChange('lineHeight', e.target.value)}
          className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-700 text-sm"
        >
          <option value="tight">Tight (1.25)</option>
          <option value="normal">Normal (1.5)</option>
          <option value="loose">Loose (1.75)</option>
        </select>
      </div>
      
      <div>
        <label className="block text-xs text-gray-400 mb-2 font-medium">Letter Spacing</label>
        <select
          value={values.letterSpacing || 'normal'}
          onChange={(e) => onChange('letterSpacing', e.target.value)}
          className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-700 text-sm"
        >
          <option value="tight">Tight</option>
          <option value="normal">Normal</option>
          <option value="wide">Wide</option>
        </select>
      </div>
      
      <div>
        <label className="block text-xs text-gray-400 mb-2 font-medium">Text Transform</label>
        <select
          value={values.textTransform || 'none'}
          onChange={(e) => onChange('textTransform', e.target.value)}
          className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-700 text-sm"
        >
          <option value="none">None</option>
          <option value="uppercase">UPPERCASE</option>
          <option value="lowercase">lowercase</option>
          <option value="capitalize">Capitalize Each Word</option>
        </select>
      </div>
    </div>
  )
}
