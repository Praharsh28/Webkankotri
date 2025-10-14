'use client'

interface LayoutControlsProps {
  values: {
    alignment?: string
    width?: string
    columns?: number
    direction?: string
  }
  onChange: (key: string, value: any) => void
}

export function LayoutControls({ values, onChange }: LayoutControlsProps) {
  return (
    <div className="space-y-3">
      <div>
        <label className="block text-xs text-gray-400 mb-2 font-medium">Text Alignment</label>
        <div className="grid grid-cols-4 gap-2">
          {['left', 'center', 'right', 'justify'].map(align => (
            <button
              key={align}
              onClick={() => onChange('alignment', align)}
              className={`px-3 py-2 rounded text-sm font-medium transition-all ${
                values.alignment === align
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {align === 'left' && '←'}
              {align === 'center' && '↔'}
              {align === 'right' && '→'}
              {align === 'justify' && '⇔'}
            </button>
          ))}
        </div>
      </div>
      
      <div>
        <label className="block text-xs text-gray-400 mb-2 font-medium">Section Width</label>
        <select
          value={values.width || 'medium'}
          onChange={(e) => onChange('width', e.target.value)}
          className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-700 text-sm"
        >
          <option value="narrow">Narrow (600px)</option>
          <option value="medium">Medium (800px)</option>
          <option value="wide">Wide (1000px)</option>
          <option value="full">Full Width</option>
        </select>
      </div>
      
      <div>
        <label className="block text-xs text-gray-400 mb-2 font-medium">Columns (for grid layouts)</label>
        <select
          value={values.columns || 1}
          onChange={(e) => onChange('columns', parseInt(e.target.value))}
          className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-700 text-sm"
        >
          <option value={1}>1 Column</option>
          <option value={2}>2 Columns</option>
          <option value={3}>3 Columns</option>
          <option value={4}>4 Columns</option>
        </select>
      </div>
      
      <div>
        <label className="block text-xs text-gray-400 mb-2 font-medium">Content Direction</label>
        <div className="grid grid-cols-2 gap-2">
          {[
            { value: 'row', label: 'Horizontal', icon: '→' },
            { value: 'column', label: 'Vertical', icon: '↓' }
          ].map(dir => (
            <button
              key={dir.value}
              onClick={() => onChange('direction', dir.value)}
              className={`px-3 py-2 rounded text-sm font-medium transition-all ${
                values.direction === dir.value
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {dir.icon} {dir.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
