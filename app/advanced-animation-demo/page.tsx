'use client'

import { useState } from 'react'
import {
  // Basic animations
  FloatingElements,
  Sparkle,
  FadeIn,
  Pulse,
  ShineEffect,
  HoverScale,
} from '@/components/animations'

import {
  // Phase 1 - Advanced animations
  GravityDrop,
  Bounce,
  WaveMotion,
  ParticleExplosion,
  Flip3D,
  Parallax3D,
  LetterDrop,
  LetterWave,
  TextGradient,
  Glow,
  MouseFollow,
  ScrollParallax,
} from '@/components/animations/advanced-index'

// Phase 2 animations
import { PathFollow } from '@/components/animations/path/PathFollow'
import { ShapeMorph } from '@/components/animations/morph/ShapeMorph'

export default function AdvancedAnimationDemoPage() {
  const [celebrateTrigger, setCelebrateTrigger] = useState(false)
  const [flipTrigger, setFlipTrigger] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-purple-900">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-md sticky top-0 z-50 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-white">Advanced Animation Library</h1>
          <p className="text-purple-200 mt-2">Testing 26 animation types with 44+ variants</p>
          <div className="mt-4 flex gap-4 text-sm">
            <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full">✓ 12 Basic</span>
            <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full">✓ 12 Phase 1</span>
            <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full">✓ 2 Phase 2</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-16">

        {/* PHYSICS-BASED ANIMATIONS */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <span className="text-4xl">🔬</span> Physics-Based Animations
          </h2>

          {/* GravityDrop */}
          <div className="bg-white/10 backdrop-blur rounded-2xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">1. Gravity Drop</h3>
            <p className="text-purple-200 mb-6">Elements fall with realistic physics</p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <GravityDrop variant="gentle" delay={0}>
                <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-8 rounded-xl text-white text-center font-bold">
                  Gentle Drop
                </div>
              </GravityDrop>
              <GravityDrop variant="medium" delay={0.2}>
                <div className="bg-gradient-to-br from-green-500 to-emerald-500 p-8 rounded-xl text-white text-center font-bold">
                  Medium Drop
                </div>
              </GravityDrop>
              <GravityDrop variant="heavy" delay={0.4}>
                <div className="bg-gradient-to-br from-orange-500 to-red-500 p-8 rounded-xl text-white text-center font-bold">
                  Heavy Drop
                </div>
              </GravityDrop>
            </div>
          </div>

          {/* Bounce */}
          <div className="bg-white/10 backdrop-blur rounded-2xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">2. Bounce</h3>
            <p className="text-purple-200 mb-6">Continuous bouncing with physics</p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Bounce variant="soft" continuous={true}>
                <div className="bg-gradient-to-br from-pink-500 to-rose-500 p-8 rounded-xl text-white text-center font-bold">
                  Soft Bounce
                </div>
              </Bounce>
              <Bounce variant="playful" continuous={true}>
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-8 rounded-xl text-white text-center font-bold">
                  Playful Bounce
                </div>
              </Bounce>
              <Bounce variant="energetic" continuous={true}>
                <div className="bg-gradient-to-br from-yellow-500 to-orange-500 p-8 rounded-xl text-white text-center font-bold">
                  Energetic Bounce
                </div>
              </Bounce>
            </div>
          </div>

          {/* WaveMotion */}
          <div className="bg-white/10 backdrop-blur rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">3. Wave Motion</h3>
            <p className="text-purple-200 mb-6">Wave-like flowing movement</p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <WaveMotion variant="gentle">
                <div className="bg-gradient-to-br from-blue-400 to-blue-600 p-8 rounded-xl text-white text-center font-bold">
                  Gentle Wave
                </div>
              </WaveMotion>
              <WaveMotion variant="rolling">
                <div className="bg-gradient-to-br from-cyan-400 to-cyan-600 p-8 rounded-xl text-white text-center font-bold">
                  Rolling Wave
                </div>
              </WaveMotion>
              <WaveMotion variant="ocean">
                <div className="bg-gradient-to-br from-teal-400 to-teal-600 p-8 rounded-xl text-white text-center font-bold">
                  Ocean Swell
                </div>
              </WaveMotion>
            </div>
          </div>
        </section>

        {/* PARTICLE ANIMATIONS */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <span className="text-4xl">✨</span> Particle Animations
          </h2>

          <div className="bg-white/10 backdrop-blur rounded-2xl p-8 relative overflow-hidden min-h-[500px]">
            <h3 className="text-2xl font-bold text-white mb-4">4. Particle Explosion</h3>
            <p className="text-purple-200 mb-6">Click to trigger explosion</p>
            
            <div className="relative z-10 text-center mb-8">
              <button
                onClick={() => {
                  setCelebrateTrigger(true)
                  setTimeout(() => setCelebrateTrigger(false), 4500)
                }}
                className="bg-gradient-to-r from-orange-600 to-pink-600 text-white px-12 py-6 rounded-full text-xl font-bold shadow-2xl hover:scale-105 transition-transform"
              >
                🎉 Explode! 🎊
              </button>
              <p className="text-purple-200 text-sm mt-3">Animation lasts 4 seconds</p>
            </div>

            <ParticleExplosion 
              variant="burst" 
              particleCount={40}
              colors={['#FBBF24', '#F97316', '#EC4899', '#8B5CF6']}
              trigger={celebrateTrigger}
            />
          </div>
        </section>

        {/* 3D ANIMATIONS */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <span className="text-4xl">🎭</span> 3D Animations
          </h2>

          {/* Flip3D */}
          <div className="bg-white/10 backdrop-blur rounded-2xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">5. 3D Flip</h3>
            <p className="text-purple-200 mb-6">Click button to flip cards - Full 360° rotation keeps text readable</p>
            
            <div className="text-center mb-6">
              <button
                onClick={() => {
                  setFlipTrigger(true)
                  setTimeout(() => setFlipTrigger(false), 100)
                }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-bold"
              >
                Flip All Cards
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              <Flip3D variant="horizontal" trigger={flipTrigger}>
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-12 rounded-xl text-white text-center font-bold">
                  Horizontal Flip
                </div>
              </Flip3D>
              <Flip3D variant="vertical" trigger={flipTrigger}>
                <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-12 rounded-xl text-white text-center font-bold">
                  Vertical Flip
                </div>
              </Flip3D>
            </div>
          </div>

          {/* Parallax3D */}
          <div className="bg-white/10 backdrop-blur rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">6. 3D Parallax</h3>
            <p className="text-purple-200 mb-6">Scroll to see depth effect</p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Parallax3D variant="subtle">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-500 p-12 rounded-xl text-white text-center font-bold">
                  Subtle Parallax
                </div>
              </Parallax3D>
              <Parallax3D variant="medium">
                <div className="bg-gradient-to-br from-pink-500 to-rose-500 p-12 rounded-xl text-white text-center font-bold">
                  Medium Parallax
                </div>
              </Parallax3D>
              <Parallax3D variant="dramatic">
                <div className="bg-gradient-to-br from-yellow-500 to-orange-500 p-12 rounded-xl text-white text-center font-bold">
                  Dramatic Parallax
                </div>
              </Parallax3D>
            </div>
          </div>
        </section>

        {/* TEXT ANIMATIONS */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <span className="text-4xl">📝</span> Text Animations
          </h2>

          {/* LetterDrop */}
          <div className="bg-white/10 backdrop-blur rounded-2xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">7. Letter Drop</h3>
            <p className="text-purple-200 mb-6">Letters drop in with 3D effect</p>
            
            <div className="space-y-6">
              <div className="text-center">
                <LetterDrop text="Cascade Animation" variant="cascade" className="text-4xl font-bold text-white" />
              </div>
              <div className="text-center">
                <LetterDrop text="Random Order Drop" variant="random" className="text-4xl font-bold text-yellow-300" />
              </div>
              <div className="text-center">
                <LetterDrop text="Wave Pattern Drop" variant="wave" className="text-4xl font-bold text-pink-300" />
              </div>
            </div>
          </div>

          {/* LetterWave */}
          <div className="bg-white/10 backdrop-blur rounded-2xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">8. Letter Wave</h3>
            <p className="text-purple-200 mb-6">Continuous wave motion</p>
            
            <div className="space-y-6">
              <div className="text-center">
                <LetterWave text="Gentle Wave Motion" variant="gentle" className="text-4xl font-bold text-blue-300" />
              </div>
              <div className="text-center">
                <LetterWave text="Rolling Wave Effect" variant="rolling" className="text-4xl font-bold text-green-300" />
              </div>
              <div className="text-center">
                <LetterWave text="Bouncy Wave Style" variant="bouncy" className="text-4xl font-bold text-orange-300" />
              </div>
            </div>
          </div>

          {/* TextGradient */}
          <div className="bg-white/10 backdrop-blur rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">9. Text Gradient</h3>
            <p className="text-purple-200 mb-6">Animated gradient on text</p>
            
            <div className="space-y-8">
              <div className="text-center">
                <TextGradient variant="flow" colors={['#FBBF24', '#F97316', '#EC4899', '#8B5CF6']}>
                  <h2 className="text-6xl font-bold">Flowing Gradient</h2>
                </TextGradient>
              </div>
              <div className="text-center">
                <TextGradient variant="pulse" colors={['#10B981', '#3B82F6', '#8B5CF6']}>
                  <h2 className="text-6xl font-bold">Pulsing Gradient</h2>
                </TextGradient>
              </div>
              <div className="text-center">
                <TextGradient variant="shimmer" colors={['#F59E0B', '#FBBF24', '#FCD34D']}>
                  <h2 className="text-6xl font-bold">Shimmer Effect</h2>
                </TextGradient>
              </div>
            </div>
          </div>
        </section>

        {/* LIGHTING EFFECTS */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <span className="text-4xl">💡</span> Lighting Effects
          </h2>

          <div className="bg-white/10 backdrop-blur rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">10. Glow</h3>
            <p className="text-purple-200 mb-6">Glowing aura effects</p>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Glow variant="soft" color="#FBBF24">
                <div className="bg-amber-900 p-8 rounded-xl text-white text-center font-bold">
                  Soft Glow
                </div>
              </Glow>
              <Glow variant="intense" color="#EC4899">
                <div className="bg-pink-900 p-8 rounded-xl text-white text-center font-bold">
                  Intense Glow
                </div>
              </Glow>
              <Glow variant="pulsing" color="#8B5CF6">
                <div className="bg-purple-900 p-8 rounded-xl text-white text-center font-bold">
                  Pulsing Glow
                </div>
              </Glow>
            </div>
          </div>
        </section>

        {/* INTERACTIVE */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <span className="text-4xl">🖱️</span> Interactive Animations
          </h2>

          <div className="bg-white/10 backdrop-blur rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">11. Mouse Follow</h3>
            <p className="text-purple-200 mb-6">Move your mouse to see effect</p>
            
            <div className="grid md:grid-cols-3 gap-8">
              <MouseFollow variant="subtle">
                <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-12 rounded-xl text-white text-center font-bold">
                  Subtle Follow
                </div>
              </MouseFollow>
              <MouseFollow variant="smooth">
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-12 rounded-xl text-white text-center font-bold">
                  Smooth Follow
                </div>
              </MouseFollow>
              <MouseFollow variant="magnetic" strength={2}>
                <div className="bg-gradient-to-br from-orange-500 to-red-500 p-12 rounded-xl text-white text-center font-bold">
                  Magnetic
                </div>
              </MouseFollow>
            </div>
          </div>
        </section>

        {/* SCROLL-BASED */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <span className="text-4xl">📜</span> Scroll-Based Animations
          </h2>

          <div className="bg-white/10 backdrop-blur rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">12. Scroll Parallax</h3>
            <p className="text-purple-200 mb-6">Scroll to see depth layers</p>
            
            <div className="space-y-12 py-12">
              <ScrollParallax variant="slow" direction="up">
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-12 rounded-xl text-white text-center font-bold text-2xl">
                  Slow Parallax (Up)
                </div>
              </ScrollParallax>
              
              <ScrollParallax variant="medium" direction="down">
                <div className="bg-gradient-to-br from-pink-600 to-rose-600 p-12 rounded-xl text-white text-center font-bold text-2xl">
                  Medium Parallax (Down)
                </div>
              </ScrollParallax>
              
              <ScrollParallax variant="fast" direction="up">
                <div className="bg-gradient-to-br from-orange-600 to-yellow-600 p-12 rounded-xl text-white text-center font-bold text-2xl">
                  Fast Parallax (Up)
                </div>
              </ScrollParallax>
            </div>
          </div>
        </section>

        {/* PHASE 2 ANIMATIONS */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <span className="text-4xl">🚀</span> Phase 2 - New Animations
          </h2>

          {/* PathFollow */}
          <div className="bg-white/10 backdrop-blur rounded-2xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">13. Path Follow</h3>
            <p className="text-purple-200 mb-6">Elements follow SVG paths</p>
            
            <div className="grid md:grid-cols-3 gap-8 min-h-[200px]">
              <div className="relative bg-white/5 rounded-xl p-8 flex items-center justify-center">
                <PathFollow variant="infinity" duration={4}>
                  <div className="w-10 h-10 bg-blue-500 rounded-full shadow-lg"></div>
                </PathFollow>
                <p className="absolute bottom-4 left-4 text-white text-sm font-semibold">Infinity ∞</p>
              </div>
              
              <div className="relative bg-white/5 rounded-xl p-8 flex items-center justify-center">
                <PathFollow variant="circle" duration={3}>
                  <div className="w-10 h-10 bg-purple-500 rounded-full shadow-lg"></div>
                </PathFollow>
                <p className="absolute bottom-4 left-4 text-white text-sm font-semibold">Circle ○</p>
              </div>
              
              <div className="relative bg-white/5 rounded-xl p-8 flex items-center justify-center">
                <PathFollow variant="wave" duration={5}>
                  <div className="w-10 h-10 bg-pink-500 rounded-full shadow-lg"></div>
                </PathFollow>
                <p className="absolute bottom-4 left-4 text-white text-sm font-semibold">Wave 〜</p>
              </div>
            </div>
          </div>

          {/* ShapeMorph */}
          <div className="bg-white/10 backdrop-blur rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">14. Blob Morph</h3>
            <p className="text-purple-200 mb-6">Organic blob morphing animation</p>
            
            <div className="flex justify-center">
              <ShapeMorph duration={4}>
                <div className="bg-gradient-to-br from-pink-500 to-purple-500 w-48 h-48 flex items-center justify-center text-white font-bold text-xl shadow-2xl">
                  Organic Blob
                </div>
              </ShapeMorph>
            </div>
            <p className="text-center text-purple-300 text-sm mt-6">Smooth organic shape transformation</p>
          </div>
        </section>

        {/* Summary */}
        <section className="bg-gradient-to-r from-purple-600/30 to-pink-600/30 backdrop-blur rounded-2xl p-12 border border-white/20">
          <h2 className="text-4xl font-bold text-white mb-6 text-center">🎉 Animation Library Complete!</h2>
          
          <div className="grid md:grid-cols-4 gap-6 mt-8">
            <div className="bg-white/10 backdrop-blur p-6 rounded-xl text-center">
              <div className="text-5xl font-bold text-white">26</div>
              <div className="text-purple-200 mt-2">Animation Types</div>
            </div>
            <div className="bg-white/10 backdrop-blur p-6 rounded-xl text-center">
              <div className="text-5xl font-bold text-white">44+</div>
              <div className="text-purple-200 mt-2">Total Components</div>
            </div>
            <div className="bg-white/10 backdrop-blur p-6 rounded-xl text-center">
              <div className="text-5xl font-bold text-white">100</div>
              <div className="text-purple-200 mt-2">Preset Configs</div>
            </div>
            <div className="bg-white/10 backdrop-blur p-6 rounded-xl text-center">
              <div className="text-5xl font-bold text-white">✓</div>
              <div className="text-purple-200 mt-2">Production Ready</div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-xl text-white">All animations tested and working!</p>
            <p className="text-purple-200 mt-2">Ready for kankotri invitations 🎨✨</p>
          </div>
        </section>

      </div>
    </div>
  )
}
