'use client'

import { FadeIn } from '@/components/animations'

export interface FamilyMember {
  name: string
  relation?: string
  address?: string
}

export interface FamilyListSectionData {
  title: string
  subtitle?: string
  category: 'groom' | 'bride' | 'both'
  groomFamily?: FamilyMember[]
  brideFamily?: FamilyMember[]
  layout: 'single-column' | 'two-column'
}

interface FamilyListSectionProps {
  data: FamilyListSectionData
  animated?: boolean
}

export function FamilyListSection({ data, animated = true }: FamilyListSectionProps) {
  const renderFamilyList = (members: FamilyMember[], title?: string) => (
    <div className="space-y-1">
      {title && (
        <p className="text-orange-300 font-semibold mb-2 text-center">{title}</p>
      )}
      {members.map((member, idx) => (
        <div key={idx} className="text-orange-100">
          <span className="font-gujarati text-base">
            {member.name}
            {member.relation && (
              <span className="text-orange-200 text-sm ml-2">({member.relation})</span>
            )}
          </span>
          {member.address && (
            <p className="text-sm text-orange-200 mt-0.5">{member.address}</p>
          )}
        </div>
      ))}
    </div>
  )

  const content = (
    <div className="py-6 px-4 text-center">
      {/* Title */}
      <div className="mb-6">
        <h3 className="font-gujarati text-2xl md:text-3xl font-bold text-white mb-2">
          {data.title}
        </h3>
        {data.subtitle && (
          <p className="text-orange-200 text-sm">{data.subtitle}</p>
        )}
      </div>

      {/* Family Lists */}
      {data.layout === 'two-column' && data.category === 'both' ? (
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {data.groomFamily && data.groomFamily.length > 0 && (
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
              {renderFamilyList(data.groomFamily, "વર પક્ષ")}
            </div>
          )}
          {data.brideFamily && data.brideFamily.length > 0 && (
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
              {renderFamilyList(data.brideFamily, "વધૂ પક્ષ")}
            </div>
          )}
        </div>
      ) : (
        <div className="max-w-2xl mx-auto bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
          {data.category === 'groom' && data.groomFamily && renderFamilyList(data.groomFamily)}
          {data.category === 'bride' && data.brideFamily && renderFamilyList(data.brideFamily)}
          {data.category === 'both' && (
            <div className="space-y-6">
              {data.groomFamily && renderFamilyList(data.groomFamily, "વર પક્ષ")}
              {data.brideFamily && renderFamilyList(data.brideFamily, "વધૂ પક્ષ")}
            </div>
          )}
        </div>
      )}
    </div>
  )

  if (!animated) return content

  return (
    <FadeIn delay={0.5} direction="up">
      {content}
    </FadeIn>
  )
}
