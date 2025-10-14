'use client'

interface ColorControlsProps {
  values: {
    background?: string
    text?: string
    accent?: string
    border?: string
  }
  onChange: (key: string, value: string) => void
}

export function ColorControls({ values, onChange }: ColorControlsProps) {
  return (
    <div className="space-y-3">
      <div>
        <label className="block text-xs text-gray-400 mb-2 font-medium">Background Color</label>
        <div className="flex gap-2">
          <input
            type="color"
            value={values.background || '#ffffff'}
            onChange={(e) => onChange('background', e.target.value)}
            className="w-16 h-10 rounded cursor-pointer border-2 border-gray-700"
          />
          <input
            type="text"
            value={values.background || '#ffffff'}
            onChange={(e) => onChange('background', e.target.value)}
            className="flex-1 px-3 py-2 bg-gray-800 text-white rounded border border-gray-700 text-sm font-mono"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-xs text-gray-400 mb-2 font-medium">Text Color</label>
        <div className="flex gap-2">
          <input
            type="color"
            value={values.text || '#000000'}
            onChange={(e) => onChange('text', e.target.value)}
            className="w-16 h-10 rounded cursor-pointer border-2 border-gray-700"
          />
          <input
            type="text"
            value={values.text || '#000000'}
            onChange={(e) => onChange('text', e.target.value)}
            className="flex-1 px-3 py-2 bg-gray-800 text-white rounded border border-gray-700 text-sm font-mono"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-xs text-gray-400 mb-2 font-medium">Accent Color</label>
        <div className="flex gap-2">
          <input
            type="color"
            value={values.accent || '#6366f1'}
            onChange={(e) => onChange('accent', e.target.value)}
            className="w-16 h-10 rounded cursor-pointer border-2 border-gray-700"
          />
          <input
            type="text"
            value={values.accent || '#6366f1'}
            onChange={(e) => onChange('accent', e.target.value)}
            className="flex-1 px-3 py-2 bg-gray-800 text-white rounded border border-gray-700 text-sm font-mono"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-xs text-gray-400 mb-2 font-medium">Border Color</label>
        <div className="flex gap-2">
          <input
            type="color"
            value={values.border || '#e5e7eb'}
            onChange={(e) => onChange('border', e.target.value)}
            className="w-16 h-10 rounded cursor-pointer border-2 border-gray-700"
          />
          <input
            type="text"
            value={values.border || '#e5e7eb'}
            onChange={(e) => onChange('border', e.target.value)}
            className="flex-1 px-3 py-2 bg-gray-800 text-white rounded border border-gray-700 text-sm font-mono"
          />
        </div>
      </div>
    </div>
  )
}
