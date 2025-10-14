'use client'

interface SpacingControlsProps {
  values: {
    padding?: string
    margin?: string
    gap?: string
  }
  onChange: (key: string, value: string) => void
}

export function SpacingControls({ values, onChange }: SpacingControlsProps) {
  const options = [
    { value: 'none', label: 'None (0)' },
    { value: 'sm', label: 'Small (0.5rem)' },
    { value: 'md', label: 'Medium (1rem)' },
    { value: 'lg', label: 'Large (2rem)' },
    { value: 'xl', label: 'XLarge (3rem)' }
  ]

  const gapOptions = [
    { value: 'tight', label: 'Tight (0.5rem)' },
    { value: 'normal', label: 'Normal (1rem)' },
    { value: 'loose', label: 'Loose (2rem)' }
  ]

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-xs text-gray-400 mb-2 font-medium">Padding (Internal Space)</label>
        <select
          value={values.padding || 'md'}
          onChange={(e) => onChange('padding', e.target.value)}
          className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-700 text-sm"
        >
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
      
      <div>
        <label className="block text-xs text-gray-400 mb-2 font-medium">Margin (External Space)</label>
        <select
          value={values.margin || 'md'}
          onChange={(e) => onChange('margin', e.target.value)}
          className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-700 text-sm"
        >
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
      
      <div>
        <label className="block text-xs text-gray-400 mb-2 font-medium">Gap (Between Items)</label>
        <select
          value={values.gap || 'normal'}
          onChange={(e) => onChange('gap', e.target.value)}
          className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-700 text-sm"
        >
          {gapOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
    </div>
  )
}
