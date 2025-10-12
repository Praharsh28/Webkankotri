'use client'

interface Step {
  id: number
  name: string
  description: string
}

interface StepIndicatorProps {
  steps: Step[]
  currentStep: number
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center flex-1">
            {/* Step Circle */}
            <div className="relative flex flex-col items-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all ${
                step.id === currentStep
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-110'
                  : step.id < currentStep
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}>
                {step.id < currentStep ? '✓' : step.id}
              </div>
              
              {/* Step Label */}
              <div className="absolute top-14 text-center w-24">
                <p className={`text-sm font-semibold ${
                  step.id === currentStep ? 'text-purple-600' : 'text-gray-600'
                }`}>
                  {step.name}
                </p>
                <p className="text-xs text-gray-500 mt-1">{step.description}</p>
              </div>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className={`flex-1 h-1 mx-4 transition-all ${
                step.id < currentStep ? 'bg-green-500' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
