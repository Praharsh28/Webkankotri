'use client'

import { FadeIn, HoverScale } from '@/components/animations'
import type { KankotriTheme } from '@/types/theme'
import { useThemeStyles } from '@/lib/hooks/useThemeStyles'

export interface GiftRegistrySectionData {
  title?: string
  description?: string
  registries?: Array<{
    name: string
    url: string
    icon?: string
  }>
  showCashGift?: boolean
  cashGiftMessage?: string
  upiId?: string
  accountDetails?: {
    bank: string
    accountNumber: string
    ifsc: string
    accountName: string
  }
}

interface GiftRegistrySectionProps {
  data: GiftRegistrySectionData
  theme: KankotriTheme
  animated?: boolean
}

export function GiftRegistrySection({ data, theme, animated = true }: GiftRegistrySectionProps) {
  const { text, font } = useThemeStyles(theme)
  const sectionStyle = theme.sectionStyles?.['custom-text'] || {}

  const content = (
    <div 
      className="py-8 md:py-12 px-4"
      style={{
        backgroundColor: sectionStyle.backgroundColor,
        borderColor: sectionStyle.borderColor,
        borderWidth: sectionStyle.borderColor ? '1px' : 0,
        borderStyle: 'solid',
      }}
    >
      {/* Title */}
      <h2 
        className="text-3xl md:text-4xl font-bold mb-4 text-center"
        style={{ ...font.headingEn, ...text.heading }}
      >
        {data.title || '🎁 Gift Registry'}
      </h2>

      {data.description && (
        <p 
          className="text-center mb-8 max-w-2xl mx-auto"
          style={text.secondary}
        >
          {data.description}
        </p>
      )}

      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Online Registries */}
        {data.registries && data.registries.length > 0 && (
          <div>
            <h3 
              className="text-xl font-bold mb-4 text-center"
              style={text.primary}
            >
              Gift Registries
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {data.registries.map((registry, index) => (
                <HoverScale key={index} scale={1.05}>
                  <a
                    href={registry.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-6 rounded-xl shadow-lg text-center hover:shadow-2xl transition-shadow"
                    style={{
                      backgroundColor: theme.colors.background.card,
                      borderColor: theme.colors.border.light,
                      borderWidth: '1px',
                      borderStyle: 'solid',
                    }}
                  >
                    <div className="text-4xl mb-3">
                      {registry.icon || '🎁'}
                    </div>
                    <h4 
                      className="text-lg font-bold mb-2"
                      style={text.primary}
                    >
                      {registry.name}
                    </h4>
                    <div 
                      className="text-sm font-medium"
                      style={{ color: theme.colors.accent }}
                    >
                      View Registry →
                    </div>
                  </a>
                </HoverScale>
              ))}
            </div>
          </div>
        )}

        {/* Cash Gift */}
        {data.showCashGift && (
          <div 
            className="p-6 md:p-8 rounded-xl"
            style={{
              backgroundColor: theme.colors.background.card,
              borderColor: theme.colors.border.light,
              borderWidth: '1px',
              borderStyle: 'solid',
            }}
          >
            <h3 
              className="text-xl font-bold mb-3 text-center"
              style={text.primary}
            >
              💰 Cash Gift
            </h3>
            
            {data.cashGiftMessage && (
              <p 
                className="text-center mb-6 italic"
                style={text.secondary}
              >
                {data.cashGiftMessage}
              </p>
            )}

            {/* UPI Payment */}
            {data.upiId && (
              <div className="mb-6">
                <h4 
                  className="text-lg font-semibold mb-2 text-center"
                  style={text.primary}
                >
                  UPI Payment
                </h4>
                <div 
                  className="p-4 rounded-lg text-center font-mono"
                  style={{
                    backgroundColor: theme.colors.background.primary,
                    borderColor: theme.colors.border.light,
                    borderWidth: '1px',
                    borderStyle: 'solid',
                  }}
                >
                  <p style={text.primary}>{data.upiId}</p>
                  <button
                    onClick={() => navigator.clipboard.writeText(data.upiId!)}
                    className="mt-2 px-4 py-2 rounded-lg text-sm font-medium"
                    style={{
                      backgroundColor: theme.colors.accent,
                      color: '#FFFFFF',
                    }}
                  >
                    📋 Copy UPI ID
                  </button>
                </div>
              </div>
            )}

            {/* Bank Details */}
            {data.accountDetails && (
              <div>
                <h4 
                  className="text-lg font-semibold mb-3 text-center"
                  style={text.primary}
                >
                  Bank Transfer
                </h4>
                <div 
                  className="p-4 rounded-lg space-y-2"
                  style={{
                    backgroundColor: theme.colors.background.primary,
                    borderColor: theme.colors.border.light,
                    borderWidth: '1px',
                    borderStyle: 'solid',
                  }}
                >
                  <div className="flex justify-between">
                    <span style={text.secondary}>Bank:</span>
                    <span style={text.primary} className="font-medium">{data.accountDetails.bank}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={text.secondary}>Account Name:</span>
                    <span style={text.primary} className="font-medium">{data.accountDetails.accountName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={text.secondary}>Account Number:</span>
                    <span style={text.primary} className="font-mono">{data.accountDetails.accountNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={text.secondary}>IFSC Code:</span>
                    <span style={text.primary} className="font-mono">{data.accountDetails.ifsc}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Disclaimer */}
        <p 
          className="text-center text-sm italic"
          style={text.secondary}
        >
          Your presence is the greatest gift, but if you wish to give, here are some options
        </p>
      </div>
    </div>
  )

  if (!animated) return content

  return (
    <FadeIn delay={0.3} direction="up">
      {content}
    </FadeIn>
  )
}
