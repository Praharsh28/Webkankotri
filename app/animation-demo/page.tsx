'use client'

import { useState } from 'react'
import {
  FloatingElements,
  AnimatedGradient,
  ShineEffect,
  FadeIn,
  Pulse,
  Rotate,
  Typewriter,
  ConfettiBurst,
  DecorativeCorner,
  Sparkle,
  RevealOnScroll,
  HoverScale,
} from '@/components/animations'

export default function AnimationDemoPage() {
  const [confettiTrigger, setConfettiTrigger] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Animation Library Test</h1>
          <p className="text-gray-600 mt-2">Testing all 12 elegant animations</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
        
        {/* 1. FadeIn */}
        <section className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">1. Fade In Animation</h2>
          <p className="text-gray-600 mb-6">Graceful entrance from different directions</p>
          
          <div className="grid md:grid-cols-4 gap-4">
            <FadeIn delay={0} direction="up">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-6 rounded-lg text-white text-center">
                Up ⬆️
              </div>
            </FadeIn>
            <FadeIn delay={0.2} direction="down">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-6 rounded-lg text-white text-center">
                Down ⬇️
              </div>
            </FadeIn>
            <FadeIn delay={0.4} direction="left">
              <div className="bg-gradient-to-br from-green-500 to-emerald-500 p-6 rounded-lg text-white text-center">
                Left ⬅️
              </div>
            </FadeIn>
            <FadeIn delay={0.6} direction="right">
              <div className="bg-gradient-to-br from-orange-500 to-red-500 p-6 rounded-lg text-white text-center">
                Right ➡️
              </div>
            </FadeIn>
          </div>
        </section>

        {/* 2. ShineEffect */}
        <section className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">2. Shine Effect</h2>
          <p className="text-gray-600 mb-6">Subtle shimmer passes over text (like gold reflection)</p>
          
          <ShineEffect duration={3}>
            <h3 className="text-5xl font-bold text-center bg-gradient-to-r from-amber-600 to-yellow-500 bg-clip-text text-transparent py-4">
              Raj ❀ Priya
            </h3>
          </ShineEffect>
        </section>

        {/* 3. Pulse */}
        <section className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">3. Pulse Animation</h2>
          <p className="text-gray-600 mb-6">Gentle breathing effect</p>
          
          <div className="flex justify-center gap-8">
            <Pulse scale={1.05} duration={2}>
              <div className="bg-red-500 text-white px-8 py-4 rounded-full font-semibold">
                ❤️ Gentle Pulse
              </div>
            </Pulse>
            <Pulse scale={1.1} duration={1.5}>
              <div className="bg-pink-500 text-white px-8 py-4 rounded-full font-semibold">
                💖 Stronger Pulse
              </div>
            </Pulse>
          </div>
        </section>

        {/* 4. HoverScale */}
        <section className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">4. Hover Scale</h2>
          <p className="text-gray-600 mb-6">Hover or tap to see effect</p>
          
          <div className="flex justify-center gap-4">
            <HoverScale scale={1.05}>
              <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold shadow-lg">
                Hover Me!
              </button>
            </HoverScale>
            <HoverScale scale={1.1}>
              <button className="bg-purple-600 text-white px-8 py-4 rounded-lg font-semibold shadow-lg">
                Stronger Effect
              </button>
            </HoverScale>
          </div>
        </section>

        {/* 5. Rotate */}
        <section className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">5. Rotate Animation</h2>
          <p className="text-gray-600 mb-6">Slow continuous rotation</p>
          
          <div className="flex justify-center gap-16">
            <div className="text-center">
              <Rotate duration={10} clockwise={true}>
                <div className="text-6xl">🌸</div>
              </Rotate>
              <p className="mt-2 text-sm text-gray-600">Clockwise (10s)</p>
            </div>
            <div className="text-center">
              <Rotate duration={5} clockwise={false}>
                <div className="text-6xl">⭐</div>
              </Rotate>
              <p className="mt-2 text-sm text-gray-600">Counter (5s)</p>
            </div>
          </div>
        </section>

        {/* 6. Typewriter */}
        <section className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">6. Typewriter Effect</h2>
          <p className="text-gray-600 mb-6">Text appears character by character</p>
          
          <div className="text-center">
            <Typewriter 
              text="Join us for our special day... Raj & Priya Wedding 2025" 
              speed={50}
              className="text-2xl text-gray-800 font-medium"
            />
          </div>
        </section>

        {/* 7. FloatingElements */}
        <section className="bg-gradient-to-br from-purple-900 to-pink-900 rounded-xl shadow-lg p-8 relative overflow-hidden min-h-[400px]">
          <FloatingElements icons={['🪔', '✨', '💐', '🌺']} count={15} speed="medium" />
          
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-4 text-white">7. Floating Elements</h2>
            <p className="text-purple-200 mb-6">Decorative floating icons</p>
            
            <div className="text-center py-12">
              <h3 className="text-4xl font-bold text-white">
                Beautiful Background Decorations
              </h3>
              <p className="text-xl text-purple-200 mt-4">
                Watch the icons gently float around
              </p>
            </div>
          </div>
        </section>

        {/* 8. Sparkle */}
        <section className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-xl shadow-lg p-8 relative overflow-hidden min-h-[400px]">
          <Sparkle count={30} colors={['#FBBF24', '#FCD34D', '#FEF3C7']} />
          
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-4 text-white">8. Sparkle Effect</h2>
            <p className="text-purple-200 mb-6">Tiny twinkling particles</p>
            
            <div className="text-center py-12">
              <h3 className="text-4xl font-bold text-white">
                ✨ Magical Sparkles ✨
              </h3>
              <p className="text-xl text-purple-200 mt-4">
                Like stars in the night sky
              </p>
            </div>
          </div>
        </section>

        {/* 9. AnimatedGradient */}
        <section className="rounded-xl shadow-lg overflow-hidden min-h-[400px] relative">
          <AnimatedGradient 
            colors={['#FFF7ED', '#FFEDD5', '#FED7AA', '#FDBA74']} 
            speed={10}
            blur={false}
          />
          
          <div className="relative z-10 p-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">9. Animated Gradient</h2>
            <p className="text-gray-700 mb-6">Smooth, slow color gradient transition</p>
            
            <div className="text-center py-12">
              <h3 className="text-4xl font-bold text-gray-800">
                Flowing Colors
              </h3>
              <p className="text-xl text-gray-700 mt-4">
                Gentle gradient animation
              </p>
            </div>
          </div>
        </section>

        {/* 10. DecorativeCorner */}
        <section className="bg-white rounded-xl shadow-lg p-8 relative min-h-[400px]">
          <DecorativeCorner position="top-left" pattern="floral" color="#F97316" size={120} />
          <DecorativeCorner position="top-right" pattern="geometric" color="#8B5CF6" size={120} />
          <DecorativeCorner position="bottom-left" pattern="mandala" color="#EC4899" size={120} />
          <DecorativeCorner position="bottom-right" pattern="floral" color="#10B981" size={120} />
          
          <div className="relative z-10 text-center py-12">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">10. Decorative Corners</h2>
            <p className="text-gray-600 mb-6">Elegant corner decorations (all 4 corners)</p>
            
            <div className="mt-12">
              <h3 className="text-3xl font-bold text-gray-800">
                Framed Content
              </h3>
              <p className="text-lg text-gray-600 mt-4">
                Different patterns in each corner
              </p>
              <div className="mt-6 space-y-2">
                <p className="text-sm text-gray-500">Top-left: Floral (Orange)</p>
                <p className="text-sm text-gray-500">Top-right: Geometric (Purple)</p>
                <p className="text-sm text-gray-500">Bottom-left: Mandala (Pink)</p>
                <p className="text-sm text-gray-500">Bottom-right: Floral (Green)</p>
              </div>
            </div>
          </div>
        </section>

        {/* 11. RevealOnScroll */}
        <section className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">11. Reveal on Scroll</h2>
          <p className="text-gray-600 mb-6">Content appears as you scroll (scroll down to see)</p>
          
          <div className="space-y-8 mt-16">
            <RevealOnScroll direction="up" delay={0}>
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-8 rounded-lg text-white text-center">
                <h3 className="text-2xl font-bold">First Element</h3>
                <p>Reveals from bottom</p>
              </div>
            </RevealOnScroll>
            
            <RevealOnScroll direction="left" delay={0.2}>
              <div className="bg-gradient-to-r from-green-500 to-teal-500 p-8 rounded-lg text-white text-center">
                <h3 className="text-2xl font-bold">Second Element</h3>
                <p>Reveals from right</p>
              </div>
            </RevealOnScroll>
            
            <RevealOnScroll direction="right" delay={0.4}>
              <div className="bg-gradient-to-r from-orange-500 to-red-500 p-8 rounded-lg text-white text-center">
                <h3 className="text-2xl font-bold">Third Element</h3>
                <p>Reveals from left</p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll direction="up" delay={0.6}>
              <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-8 rounded-lg text-white text-center">
                <h3 className="text-2xl font-bold">Fourth Element</h3>
                <p>Reveals from bottom again</p>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* 12. ConfettiBurst */}
        <section className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">12. Confetti Burst</h2>
          <p className="text-gray-600 mb-6">Celebration effect (click button to trigger)</p>
          
          <ConfettiBurst 
            trigger={confettiTrigger} 
            particleCount={150}
            colors={['#F97316', '#EC4899', '#FBBF24', '#22C55E']}
          />
          
          <div className="text-center py-12">
            <button
              onClick={() => {
                setConfettiTrigger(true)
                setTimeout(() => setConfettiTrigger(false), 100)
              }}
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-12 py-6 rounded-full text-xl font-bold shadow-xl hover:shadow-2xl transition-shadow"
            >
              🎉 Celebrate! 🎊
            </button>
            <p className="text-sm text-gray-500 mt-4">Click to burst confetti</p>
          </div>
        </section>

        {/* Summary */}
        <section className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl shadow-lg p-8 text-white">
          <h2 className="text-3xl font-bold mb-4 text-center">✅ All 12 Animations Tested!</h2>
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur p-4 rounded-lg">
              <p className="font-semibold">✅ FadeIn</p>
            </div>
            <div className="bg-white/10 backdrop-blur p-4 rounded-lg">
              <p className="font-semibold">✅ ShineEffect</p>
            </div>
            <div className="bg-white/10 backdrop-blur p-4 rounded-lg">
              <p className="font-semibold">✅ Pulse</p>
            </div>
            <div className="bg-white/10 backdrop-blur p-4 rounded-lg">
              <p className="font-semibold">✅ HoverScale</p>
            </div>
            <div className="bg-white/10 backdrop-blur p-4 rounded-lg">
              <p className="font-semibold">✅ Rotate</p>
            </div>
            <div className="bg-white/10 backdrop-blur p-4 rounded-lg">
              <p className="font-semibold">✅ Typewriter</p>
            </div>
            <div className="bg-white/10 backdrop-blur p-4 rounded-lg">
              <p className="font-semibold">✅ FloatingElements</p>
            </div>
            <div className="bg-white/10 backdrop-blur p-4 rounded-lg">
              <p className="font-semibold">✅ Sparkle</p>
            </div>
            <div className="bg-white/10 backdrop-blur p-4 rounded-lg">
              <p className="font-semibold">✅ AnimatedGradient</p>
            </div>
            <div className="bg-white/10 backdrop-blur p-4 rounded-lg">
              <p className="font-semibold">✅ DecorativeCorner</p>
            </div>
            <div className="bg-white/10 backdrop-blur p-4 rounded-lg">
              <p className="font-semibold">✅ RevealOnScroll</p>
            </div>
            <div className="bg-white/10 backdrop-blur p-4 rounded-lg">
              <p className="font-semibold">✅ ConfettiBurst</p>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-lg">🎨 All animations are elegant, subtle, and mobile-optimized</p>
            <p className="text-sm mt-2 opacity-90">No neon colors, only warm and elegant tones</p>
          </div>
        </section>

      </div>
    </div>
  )
}
