'use client'

import { FadeIn } from '@/components/animations'

export interface DressCodeSectionData {
  title?: string
  code: string
  description?: string
  colors?: string[]
  note?: string
}

interface DressCodeSectionProps {
  data: DressCodeSectionData
  animated?: boolean
}

export function DressCodeSection({ data, animated = true }: DressCodeSectionProps) {
  const content = (
    <div className="py-8 px-4">
      <div className="max-w-xl mx-auto text-center">
        <div className="text-5xl mb-4">👗</div>
        
        <h3 className="font-gujarati text-3xl font-bold text-white mb-2">
          {data.title || 'ડ્રેસ કોડ'}
        </h3>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
          <p className="text-2xl font-semibold text-orange-100 mb-3">
            {data.code}
          </p>
          
          {data.description && (
            <p className="text-orange-200 mb-4">
              {data.description}
            </p>
          )}

          {data.colors && data.colors.length > 0 && (
            <div className="mt-4">
              <p className="text-sm text-orange-300 mb-3">Suggested Colors:</p>
              <div className="flex justify-center gap-3 flex-wrap">
                {data.colors.map((color, idx) => (
                  <div 
                    key={idx}
                    className="w-12 h-12 rounded-full border-4 border-white/30 shadow-lg"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          )}

          {data.note && (
            <p className="mt-4 text-xs text-orange-300 italic">
              {data.note}
            </p>
          )}
        </div>
      </div>
    </div>
  )

  if (!animated) return content

  return (
    <FadeIn delay={0.6} direction="up">
      {content}
    </FadeIn>
  )
}
