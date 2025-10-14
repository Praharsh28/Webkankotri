'use client'

interface AnimationControlsProps {
  values: {
    entrance?: string
    duration?: string
    delay?: number
    hover?: string
  }
  onChange: (key: string, value: any) => void
}

export function AnimationControls({ values, onChange }: AnimationControlsProps) {
  return (
    <div className="space-y-3">
      <div>
        <label className="block text-xs text-gray-400 mb-2 font-medium">Entrance Animation</label>
        <select
          value={values.entrance || 'fade'}
          onChange={(e) => onChange('entrance', e.target.value)}
          className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-700 text-sm"
        >
          <option value="none">None</option>
          <option value="fade">Fade In</option>
          <option value="slide-up">Slide Up</option>
          <option value="slide-down">Slide Down</option>
          <option value="slide-left">Slide Left</option>
          <option value="slide-right">Slide Right</option>
          <option value="zoom">Zoom In</option>
          <option value="bounce">Bounce In</option>
        </select>
      </div>
      
      <div>
        <label className="block text-xs text-gray-400 mb-2 font-medium">Animation Speed</label>
        <select
          value={values.duration || 'normal'}
          onChange={(e) => onChange('duration', e.target.value)}
          className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-700 text-sm"
        >
          <option value="fast">Fast (0.3s)</option>
          <option value="normal">Normal (0.6s)</option>
          <option value="slow">Slow (1s)</option>
        </select>
      </div>
      
      <div>
        <label className="block text-xs text-gray-400 mb-2 font-medium">Delay (ms)</label>
        <input
          type="number"
          value={values.delay || 0}
          onChange={(e) => onChange('delay', parseInt(e.target.value))}
          min="0"
          max="2000"
          step="100"
          className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-700 text-sm"
        />
      </div>
      
      <div>
        <label className="block text-xs text-gray-400 mb-2 font-medium">Hover Effect</label>
        <select
          value={values.hover || 'none'}
          onChange={(e) => onChange('hover', e.target.value)}
          className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-700 text-sm"
        >
          <option value="none">None</option>
          <option value="lift">Lift Up</option>
          <option value="scale">Scale Up</option>
          <option value="glow">Add Glow</option>
          <option value="rotate">Rotate</option>
        </select>
      </div>
    </div>
  )
}
