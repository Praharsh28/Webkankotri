'use client'

import { FadeIn, Pulse } from '@/components/animations'
import { LetterWave } from '@/components/animations/text/LetterWave'
import { Glow } from '@/components/animations/lighting/Glow'
import { Bounce } from '@/components/animations/physics/Bounce'
import { Parallax3D } from '@/components/animations/3d/Parallax3D'
import type { HeaderSectionData } from '@/types/section'
import type { KankotriTheme } from '@/types/theme'
import { useThemeStyles } from '@/lib/hooks/useThemeStyles'
import { motion } from 'framer-motion'

interface ModernLightHeaderSectionProps {
  data: HeaderSectionData
  theme: KankotriTheme
  animated?: boolean
}

export function ModernLightHeaderSection({ data, theme, animated = true }: ModernLightHeaderSectionProps) {
  const { text, font, gradient } = useThemeStyles(theme)
  
  const sectionStyle = theme.sectionStyles?.header || {}
  
  const content = (
    <div 
      className="text-center py-16 md:py-20 px-6 relative overflow-hidden"
      style={{
        backgroundColor: sectionStyle.backgroundColor,
        borderColor: sectionStyle.borderColor,
        padding: sectionStyle.padding,
        borderRadius: sectionStyle.borderRadius,
        ...text.heading,
      }}
    >
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-10 right-10 w-32 h-32 rounded-full"
          style={{
            background: `radial-gradient(circle, ${theme.colors.accent}15 0%, transparent 70%)`,
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-10 left-10 w-40 h-40 rounded-full"
          style={{
            background: `radial-gradient(circle, ${theme.colors.secondary}15 0%, transparent 70%)`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
      </div>

      {/* Groom Section with Advanced Animations */}
      <Parallax3D variant="subtle">
        <FadeIn delay={0.2} direction="down">
          <div className="space-y-2 mb-8">
            {data.groomTitle && (
              <Bounce variant="soft" continuous={true}>
                <p className="text-sm uppercase tracking-widest" style={{
                  ...text.secondary,
                  color: theme.colors.accent,
                  fontWeight: 600,
                }}>
                  {data.groomTitle}
                </p>
              </Bounce>
            )}
            
            <Glow variant="soft" color={theme.colors.accent}>
              <motion.h1 
                className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight"
                style={{ 
                  ...font.headingEn, 
                  ...text.heading,
                  background: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.accent} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                <LetterWave text={data.groomName} variant="gentle" />
              </motion.h1>
            </Glow>
          </div>
        </FadeIn>
      </Parallax3D>

      {/* Divider with Physics Animation */}
      <FadeIn delay={0.4} direction="up">
        <div className="flex items-center justify-center my-8 md:my-12 gap-4">
          <motion.div 
            className="h-0.5 bg-gradient-to-r rounded-full" 
            style={{
              width: 100,
              backgroundImage: `linear-gradient(to right, transparent, ${theme.colors.accent}, transparent)`,
            }}
            animate={{
              scaleX: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          
          <Pulse scale={1.2} duration={2}>
            <motion.div
              className="relative"
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              <span className="text-4xl" style={{ color: theme.colors.accent }}>❖</span>
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  border: `2px solid ${theme.colors.accent}40`,
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeOut',
                }}
              />
            </motion.div>
          </Pulse>
          
          <motion.div 
            className="h-0.5 bg-gradient-to-r rounded-full" 
            style={{
              width: 100,
              backgroundImage: `linear-gradient(to right, transparent, ${theme.colors.secondary}, transparent)`,
            }}
            animate={{
              scaleX: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1.5,
            }}
          />
        </div>
      </FadeIn>

      {/* Bride Section with Advanced Animations */}
      <Parallax3D variant="subtle">
        <FadeIn delay={0.6} direction="up">
          <div className="space-y-2 mt-8">
            {data.brideTitle && (
              <Bounce variant="soft" continuous={true}>
                <p className="text-sm uppercase tracking-widest" style={{
                  ...text.secondary,
                  color: theme.colors.secondary,
                  fontWeight: 600,
                }}>
                  {data.brideTitle}
                </p>
              </Bounce>
            )}
            
            <Glow variant="soft" color={theme.colors.secondary}>
              <motion.h1 
                className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight"
                style={{ 
                  ...font.headingEn, 
                  ...text.heading,
                  background: `linear-gradient(135deg, ${theme.colors.secondary} 0%, ${theme.colors.accent} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: 2,
                }}
              >
                <LetterWave text={data.brideName} variant="gentle" />
              </motion.h1>
            </Glow>
          </div>
        </FadeIn>
      </Parallax3D>

      {/* Decorative Bottom Element */}
      <FadeIn delay={0.8} direction="up">
        <motion.div 
          className="mt-12 flex justify-center"
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className="w-16 h-1 rounded-full bg-gradient-to-r" style={{
            backgroundImage: `linear-gradient(to right, ${theme.colors.accent}, ${theme.colors.secondary})`,
          }} />
        </motion.div>
      </FadeIn>
    </div>
  )

  if (!animated) return content

  return content
}
