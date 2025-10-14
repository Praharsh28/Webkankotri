'use client'

interface EffectsControlsProps {
  values: {
    glow?: boolean
    glassmorphism?: boolean
    neumorphism?: boolean
    particles?: boolean
    confetti?: boolean
  }
  onChange: (key: string, value: boolean) => void
}

export function EffectsControls({ values, onChange }: EffectsControlsProps) {
  const effects = [
    { key: 'glow', label: 'Glow Effect', description: 'Soft luminous glow around element' },
    { key: 'glassmorphism', label: 'Glass Effect', description: 'Frosted glass appearance' },
    { key: 'neumorphism', label: 'Soft 3D', description: 'Subtle 3D soft shadow effect' },
    { key: 'particles', label: 'Particles', description: 'Floating particles animation' },
    { key: 'confetti', label: 'Confetti', description: 'Celebration confetti effect' }
  ]

  return (
    <div className="space-y-3">
      {effects.map(effect => (
        <label 
          key={effect.key}
          className="flex items-start gap-3 p-3 rounded-lg border border-gray-700 hover:border-purple-500 cursor-pointer transition-all"
        >
          <input
            type="checkbox"
            checked={values[effect.key as keyof typeof values] || false}
            onChange={(e) => onChange(effect.key, e.target.checked)}
            className="w-5 h-5 mt-0.5 rounded text-purple-600 focus:ring-purple-500"
          />
          <div className="flex-1">
            <div className="text-sm font-medium text-white">{effect.label}</div>
            <div className="text-xs text-gray-400 mt-0.5">{effect.description}</div>
          </div>
        </label>
      ))}
    </div>
  )
}
