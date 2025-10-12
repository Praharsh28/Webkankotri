'use client'

import { FadeIn } from '@/components/animations'

export interface ContactSectionData {
  title?: string
  contacts: Array<{
    name: string
    relation: string
    phone: string
    email?: string
  }>
}

interface ContactSectionProps {
  data: ContactSectionData
  animated?: boolean
}

export function ContactSection({ data, animated = true }: ContactSectionProps) {
  // Provide default empty array if contacts is undefined
  const contacts = data?.contacts || []
  
  const content = (
    <div className="py-8 px-4">
      <h3 className="font-gujarati text-3xl font-bold text-white mb-2 text-center">
        {data?.title || 'સંપર્ક'}
      </h3>
      <p className="text-orange-200 text-center mb-6 text-sm">
        For any queries, please contact:
      </p>

      {contacts.length === 0 ? (
        <div className="max-w-2xl mx-auto text-center py-8">
          <p className="text-white/70">No contacts added yet</p>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto grid md:grid-cols-2 gap-4">
          {contacts.map((contact, idx) => (
          <div
            key={idx}
            className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
          >
            <div className="flex items-start gap-3">
              <span className="text-3xl">👤</span>
              <div className="flex-1">
                <h4 className="font-gujarati text-lg font-semibold text-white mb-1">
                  {contact.name}
                </h4>
                <p className="text-sm text-orange-300 mb-2">{contact.relation}</p>
                
                <a
                  href={`tel:${contact.phone}`}
                  className="flex items-center gap-2 text-sm text-orange-100 hover:text-white mb-2"
                >
                  <span>📞</span>
                  <span>{contact.phone}</span>
                </a>

                {contact.email && (
                  <a
                    href={`mailto:${contact.email}`}
                    className="flex items-center gap-2 text-sm text-orange-100 hover:text-white"
                  >
                    <span>✉️</span>
                    <span className="truncate">{contact.email}</span>
                  </a>
                )}
              </div>
            </div>
          </div>
          ))}
        </div>
      )}
    </div>
  )

  if (!animated) return content

  return (
    <FadeIn delay={0.7} direction="up">
      {content}
    </FadeIn>
  )
}
