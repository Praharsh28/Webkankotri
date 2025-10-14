'use client'

import { ReactNode, useState, useEffect } from 'react'
import type { KankotriTheme } from '@/types/theme'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Sparkle } from './Sparkle'
import { Glow } from './lighting/Glow'
import { ParticleExplosion } from './particles/ParticleExplosion'
import { Parallax3D } from './3d/Parallax3D'

interface ModernLightContainerProps {
  theme: KankotriTheme
  children: ReactNode
}

export function ModernLightContainer({ theme, children }: ModernLightContainerProps) {
  const [showParticles, setShowParticles] = useState(false)
  const { scrollYProgress } = useScroll()
  
  // Parallax effect for background layers
  const layer1Y = useTransform(scrollYProgress, [0, 1], [0, -50])
  const layer2Y = useTransform(scrollYProgress, [0, 1], [0, -100])
  const layer3Y = useTransform(scrollYProgress, [0, 1], [0, -150])
  
  // Trigger particle explosion after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowParticles(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen w-full relative overflow-hidden" style={{
      background: `linear-gradient(135deg, ${theme.backgrounds.gradient.from} 0%, ${theme.backgrounds.gradient.via} 50%, ${theme.backgrounds.gradient.to} 100%)`
    }}>
      
      {/* LAYER 1: Animated Gradient Background with Parallax */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ y: layer1Y }}
      >
        <div className="absolute inset-0 opacity-30">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <animate attributeName="x1" values="0%;100%;0%" dur="20s" repeatCount="indefinite" />
                <animate attributeName="y1" values="0%;100%;0%" dur="25s" repeatCount="indefinite" />
                <stop offset="0%" style={{stopColor: theme.colors.secondary, stopOpacity: 0.2}} />
                <stop offset="50%" style={{stopColor: theme.colors.accent, stopOpacity: 0.3}} />
                <stop offset="100%" style={{stopColor: theme.colors.primary, stopOpacity: 0.1}} />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#grad1)" />
          </svg>
        </div>
      </motion.div>

      {/* LAYER 2: Floating Geometric Shapes with Parallax */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ y: layer2Y }}
      >
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`geo-${i}`}
            className="absolute"
            style={{
              left: `${10 + (i * 12)}%`,
              top: `${5 + (i * 10)}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5,
            }}
          >
            {i % 3 === 0 && (
              <svg width="60" height="60" viewBox="0 0 60 60">
                <circle cx="30" cy="30" r="25" fill="none" stroke={theme.colors.accent} strokeWidth="2" opacity="0.3" />
              </svg>
            )}
            {i % 3 === 1 && (
              <svg width="60" height="60" viewBox="0 0 60 60">
                <rect x="15" y="15" width="30" height="30" fill="none" stroke={theme.colors.secondary} strokeWidth="2" opacity="0.3" />
              </svg>
            )}
            {i % 3 === 2 && (
              <svg width="60" height="60" viewBox="0 0 60 60">
                <polygon points="30,10 50,50 10,50" fill="none" stroke={theme.colors.primary} strokeWidth="2" opacity="0.3" />
              </svg>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* LAYER 3: Sparkle Particles */}
      <Sparkle 
        count={25}
        colors={[theme.colors.accent, theme.colors.secondary, '#FFFFFF']}
      />

      {/* LAYER 4: Corner Accent Designs - Modern Geometric */}
      <div className="absolute top-0 left-0 w-64 h-64 pointer-events-none">
        <motion.svg 
          width="256" 
          height="256" 
          viewBox="0 0 256 256"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.path
            d="M0,0 L150,0 L150,20 L20,20 L20,150 L0,150 Z"
            fill={theme.colors.accent}
            opacity="0.15"
            animate={{
              opacity: [0.15, 0.25, 0.15],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.path
            d="M0,0 L100,0 L100,10 L10,10 L10,100 L0,100 Z"
            fill={theme.colors.secondary}
            opacity="0.2"
            animate={{
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.5,
            }}
          />
        </motion.svg>
      </div>

      {/* Corner Accent - Top Right */}
      <div className="absolute top-0 right-0 w-64 h-64 pointer-events-none transform rotate-90">
        <motion.svg 
          width="256" 
          height="256" 
          viewBox="0 0 256 256"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          <motion.path
            d="M0,0 L150,0 L150,20 L20,20 L20,150 L0,150 Z"
            fill={theme.colors.secondary}
            opacity="0.15"
            animate={{
              opacity: [0.15, 0.25, 0.15],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
          />
        </motion.svg>
      </div>

      {/* Corner Accent - Bottom Left */}
      <div className="absolute bottom-0 left-0 w-64 h-64 pointer-events-none transform -rotate-90">
        <motion.svg 
          width="256" 
          height="256" 
          viewBox="0 0 256 256"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          <motion.path
            d="M0,0 L150,0 L150,20 L20,20 L20,150 L0,150 Z"
            fill={theme.colors.accent}
            opacity="0.15"
            animate={{
              opacity: [0.15, 0.25, 0.15],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1.5,
            }}
          />
        </motion.svg>
      </div>

      {/* Corner Accent - Bottom Right */}
      <div className="absolute bottom-0 right-0 w-64 h-64 pointer-events-none transform rotate-180">
        <motion.svg 
          width="256" 
          height="256" 
          viewBox="0 0 256 256"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
        >
          <motion.path
            d="M0,0 L150,0 L150,20 L20,20 L20,150 L0,150 Z"
            fill={theme.colors.secondary}
            opacity="0.15"
            animate={{
              opacity: [0.15, 0.25, 0.15],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 2,
            }}
          />
        </motion.svg>
      </div>

      {/* LAYER 5: Side Accent Lines (using empty space) */}
      <motion.div 
        className="absolute left-0 top-1/4 w-1 h-1/2 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, transparent, ${theme.colors.accent}40, transparent)`,
        }}
        animate={{
          scaleY: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div 
        className="absolute right-0 top-1/4 w-1 h-1/2 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, transparent, ${theme.colors.secondary}40, transparent)`,
        }}
        animate={{
          scaleY: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1.5,
        }}
      />

      {/* LAYER 6: Floating Orbs in Empty Space */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full pointer-events-none blur-2xl"
          style={{
            width: 100 + i * 30,
            height: 100 + i * 30,
            background: `radial-gradient(circle, ${i % 2 === 0 ? theme.colors.accent : theme.colors.secondary}20 0%, transparent 70%)`,
            left: i % 2 === 0 ? '5%' : 'auto',
            right: i % 2 === 1 ? '5%' : 'auto',
            top: `${10 + i * 15}%`,
          }}
          animate={{
            y: [0, -50, 0],
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 1.5,
          }}
        />
      ))}

      {/* LAYER 7: Particle Explosion on Load */}
      <ParticleExplosion 
        variant="fountain"
        particleCount={40}
        colors={[theme.colors.accent, theme.colors.secondary, '#FFFFFF']}
        trigger={showParticles}
      />

      {/* MAIN CONTENT CARD with Glow Effect and Parallax */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 md:p-8">
        <Parallax3D variant="subtle">
          <Glow variant="soft" color={theme.colors.accent}>
            <motion.div
              className="w-full max-w-4xl bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              style={{
                border: `1px solid ${theme.colors.border.light}`,
              }}
            >
              {children}
            </motion.div>
          </Glow>
        </Parallax3D>
      </div>

      {/* LAYER 8: Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r z-50 origin-left"
        style={{
          scaleX: scrollYProgress,
          background: `linear-gradient(to right, ${theme.colors.accent}, ${theme.colors.secondary})`,
        }}
      />
    </div>
  )
}
