'use client'

interface ShapeControlsProps {
  values: {
    borderRadius?: string
    shadow?: string
    borderWidth?: string
    borderStyle?: string
  }
  onChange: (key: string, value: string) => void
}

export function ShapeControls({ values, onChange }: ShapeControlsProps) {
  return (
    <div className="space-y-3">
      <div>
        <label className="block text-xs text-gray-400 mb-2 font-medium">Border Radius (Corners)</label>
        <select
          value={values.borderRadius || 'none'}
          onChange={(e) => onChange('borderRadius', e.target.value)}
          className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-700 text-sm"
        >
          <option value="none">Sharp (0)</option>
          <option value="sm">Small (0.25rem)</option>
          <option value="md">Medium (0.5rem)</option>
          <option value="lg">Large (1rem)</option>
          <option value="xl">XLarge (1.5rem)</option>
          <option value="full">Fully Rounded</option>
        </select>
      </div>
      
      <div>
        <label className="block text-xs text-gray-400 mb-2 font-medium">Shadow</label>
        <select
          value={values.shadow || 'none'}
          onChange={(e) => onChange('shadow', e.target.value)}
          className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-700 text-sm"
        >
          <option value="none">None</option>
          <option value="sm">Small</option>
          <option value="md">Medium</option>
          <option value="lg">Large</option>
          <option value="xl">XLarge</option>
          <option value="2xl">2XLarge</option>
        </select>
      </div>
      
      <div>
        <label className="block text-xs text-gray-400 mb-2 font-medium">Border Width</label>
        <select
          value={values.borderWidth || 'none'}
          onChange={(e) => onChange('borderWidth', e.target.value)}
          className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-700 text-sm"
        >
          <option value="none">None</option>
          <option value="thin">Thin (1px)</option>
          <option value="medium">Medium (2px)</option>
          <option value="thick">Thick (4px)</option>
        </select>
      </div>
      
      <div>
        <label className="block text-xs text-gray-400 mb-2 font-medium">Border Style</label>
        <select
          value={values.borderStyle || 'solid'}
          onChange={(e) => onChange('borderStyle', e.target.value)}
          className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-700 text-sm"
        >
          <option value="solid">Solid</option>
          <option value="dashed">Dashed</option>
          <option value="dotted">Dotted</option>
          <option value="double">Double</option>
        </select>
      </div>
    </div>
  )
}
