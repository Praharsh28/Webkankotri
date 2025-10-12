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
  TemplateContainer,
} from '@/components/animations'

export default function DemoPage() {
  const [celebrate, setCelebrate] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-orange-50">
      {/* Hero Section with Multiple Animations */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Gradient Background */}
        <AnimatedGradient 
          colors={['#FFF7ED', '#FFEDD5', '#FED7AA']} 
          speed={15}
          blur 
        />

        {/* Floating Elements */}
        <FloatingElements 
          icons={['🪔', '✨', '💐', '🎊']} 
          count={15} 
          speed="medium" 
        />

        {/* Sparkles */}
        <Sparkle count={30} colors={['#FBBF24', '#F97316', '#EC4899']} />

        {/* Decorative Corners */}
        <DecorativeCorner position="top-left" pattern="floral" color="#F97316" />
        <DecorativeCorner position="bottom-right" pattern="mandala" color="#EC4899" />

        {/* Main Content */}
        <div className="relative z-10 text-center space-y-8 p-8 max-w-4xl">
          <FadeIn delay={0.2} direction="up">
            <ShineEffect duration={3}>
              <h1 className="font-playfair text-6xl md:text-8xl font-bold bg-gradient-to-r from-orange-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
                Animation Components
              </h1>
            </ShineEffect>
          </FadeIn>

          <FadeIn delay={0.4} direction="up">
            <Typewriter 
              text="13 Reusable Components • 60fps Performance • GPU Optimized"
              speed={40}
              className="text-xl md:text-2xl text-gray-700"
            />
          </FadeIn>

          <FadeIn delay={0.6} direction="up">
            <div className="flex flex-wrap gap-4 justify-center mt-12">
              <HoverScale scale={1.1}>
                <button 
                  onClick={() => setCelebrate(!celebrate)}
                  className="px-8 py-4 bg-primary-500 text-white rounded-full text-lg font-semibold shadow-lg hover:shadow-2xl transition-shadow"
                >
                  🎉 Trigger Confetti
                </button>
              </HoverScale>

              <Pulse scale={1.05} duration={2}>
                <div className="px-8 py-4 bg-secondary-500 text-white rounded-full text-lg font-semibold shadow-lg">
                  ✨ Pulsing Badge
                </div>
              </Pulse>

              <Rotate duration={10} clockwise>
                <div className="px-8 py-4 bg-gold-500 text-white rounded-full text-lg font-semibold shadow-lg">
                  🔄 Rotating
                </div>
              </Rotate>
            </div>
          </FadeIn>

          <ConfettiBurst 
            trigger={celebrate} 
            particleCount={150} 
            colors={['#F97316', '#EC4899', '#FBBF24']}
          />
        </div>
      </section>

      {/* Feature Showcase Section */}
      <section className="container mx-auto px-4 py-20 space-y-16">
        <h2 className="font-playfair text-5xl font-bold text-center text-gray-900">
          All Animation Components
        </h2>

        {/* Grid of Component Demos */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* FloatingElements Demo */}
          <RevealOnScroll direction="up" delay={0.1}>
            <HoverScale>
              <div className="relative h-64 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl overflow-hidden shadow-lg">
                <FloatingElements icons={['🪔']} count={6} speed="slow" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="font-semibold text-xl text-gray-900">FloatingElements</h3>
                    <p className="text-sm text-gray-600 mt-2">Animated icons</p>
                  </div>
                </div>
              </div>
            </HoverScale>
          </RevealOnScroll>

          {/* ShineEffect Demo */}
          <RevealOnScroll direction="up" delay={0.2}>
            <HoverScale>
              <div className="h-64 bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl flex items-center justify-center shadow-lg overflow-hidden">
                <ShineEffect duration={2}>
                  <h3 className="font-playfair text-4xl font-bold text-gray-900">
                    Shine Effect
                  </h3>
                </ShineEffect>
              </div>
            </HoverScale>
          </RevealOnScroll>

          {/* Sparkle Demo */}
          <RevealOnScroll direction="up" delay={0.3}>
            <HoverScale>
              <div className="relative h-64 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-2xl overflow-hidden shadow-lg">
                <Sparkle count={15} colors={['#FBBF24', '#F59E0B']} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="font-semibold text-xl text-gray-900">Sparkle</h3>
                    <p className="text-sm text-gray-600 mt-2">Twinkling stars</p>
                  </div>
                </div>
              </div>
            </HoverScale>
          </RevealOnScroll>

          {/* Pulse Demo */}
          <RevealOnScroll direction="up" delay={0.4}>
            <div className="h-64 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center shadow-lg">
              <Pulse scale={1.1} duration={1.5}>
                <div className="text-center">
                  <div className="text-6xl mb-4">💖</div>
                  <h3 className="font-semibold text-xl text-gray-900">Pulse</h3>
                  <p className="text-sm text-gray-600 mt-2">Heartbeat animation</p>
                </div>
              </Pulse>
            </div>
          </RevealOnScroll>

          {/* FadeIn Demo */}
          <RevealOnScroll direction="up" delay={0.5}>
            <div className="h-64 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center shadow-lg">
              <FadeIn delay={0} direction="up" duration={1}>
                <div className="text-center">
                  <h3 className="font-semibold text-xl text-gray-900">FadeIn</h3>
                  <p className="text-sm text-gray-600 mt-2">Smooth entrance</p>
                </div>
              </FadeIn>
            </div>
          </RevealOnScroll>

          {/* AnimatedGradient Demo */}
          <RevealOnScroll direction="up" delay={0.6}>
            <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg">
              <AnimatedGradient 
                colors={['#F97316', '#EC4899', '#FBBF24', '#F97316']} 
                speed={8}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="font-semibold text-xl">AnimatedGradient</h3>
                  <p className="text-sm mt-2">Moving colors</p>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>

        {/* Performance Stats */}
        <div className="mt-20 p-8 bg-white rounded-2xl shadow-lg">
          <h3 className="font-playfair text-3xl font-bold text-center mb-8 text-gray-900">
            Performance Optimized
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold text-primary-600">60fps</div>
              <p className="text-gray-600 mt-2">Smooth Animations</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-secondary-600">GPU</div>
              <p className="text-gray-600 mt-2">Hardware Accelerated</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-gold-500">13</div>
              <p className="text-gray-600 mt-2">Reusable Components</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-12 text-gray-600">
        <p>✨ E-Kankotri Animation Library • Built with Framer Motion 12</p>
      </footer>
    </div>
  )
}
