'use client'

// Basic animations
import {
  FloatingElements,
  Sparkle,
  AnimatedGradient,
  FadeIn,
  RevealOnScroll,
  ShineEffect,
  Pulse,
  HoverScale,
  DecorativeCorner,
} from '@/components/animations'

// Advanced animations
import {
  Glow,
  LetterDrop,
} from '@/components/animations/advanced-index'

// Import your existing sections
import { HeaderSection } from '@/components/sections/HeaderSection'
import { EventSection } from '@/components/sections/EventSection'
import { ParentsSection } from '@/components/sections/ParentsSection'
import { MessageSection } from '@/components/sections/MessageSection'

export default function AnimatedTemplateExample() {
  // Sample data (this would come from database)
  const invitationData = {
    groomName: 'રાજ',
    brideName: 'પ્રિયા',
    groomTitle: 'પુત્ર',
    brideTitle: 'પુત્રી',
    groomParents: 'શ્રી રમેશભાઈ અને શ્રીમતી સુનીતાબેન પટેલ',
    brideParents: 'શ્રી મહેશભાઈ અને શ્રીમતી નીનાબેન શાહ',
    events: [
      {
        id: '1',
        name: 'લગ્ન મહોત્સવ',
        date: '૨૫ ડિસેમ્બર ૨૦૨૫',
        time: 'બપોરે ૩:૦૦ વાગ્યે',
        venue: 'શ્રી સ્વામિનારાયણ મંદિર, અમદાવાદ',
        description: 'તમારી ઉપસ્થિતિ અમારા લગ્ન સમારોહને આશીર્વાદિત કરશે'
      }
    ]
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      
      {/* Animated Gradient Background */}
      <AnimatedGradient 
        colors={['#FFF8F0', '#FFEDD5', '#FED7AA', '#FDBA74']} 
        speed={15}
        blur={false}
      />
      
      {/* Floating Diyas and Flowers */}
      <FloatingElements 
        icons={['🪔', '🌺', '✨', '💐', '🔔']} 
        count={15} 
        speed="slow" 
      />
      
      {/* Golden Sparkles */}
      <Sparkle 
        count={25} 
        colors={['#FBBF24', '#D4AF37', '#F0E68C']} 
      />
      
      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto p-4 md:p-8">
        
        {/* Invitation Card */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden relative">
          
          {/* Decorative Corners */}
          <DecorativeCorner 
            position="top-left" 
            pattern="mandala" 
            color="#D4AF37" 
            size={120} 
          />
          <DecorativeCorner 
            position="top-right" 
            pattern="floral" 
            color="#D4AF37" 
            size={120} 
          />
          <DecorativeCorner 
            position="bottom-left" 
            pattern="floral" 
            color="#D4AF37" 
            size={120} 
          />
          <DecorativeCorner 
            position="bottom-right" 
            pattern="mandala" 
            color="#D4AF37" 
            size={120} 
          />
          
          <div className="p-8 md:p-16 relative z-10">
            
            {/* Header with Om Symbol */}
            <FadeIn direction="up" delay={0}>
              <div className="text-center mb-8">
                <ShineEffect duration={3}>
                  <div className="text-6xl mb-4">🕉️</div>
                </ShineEffect>
              </div>
            </FadeIn>
            
            {/* Names with Letter Drop Animation */}
            <FadeIn direction="up" delay={0.2}>
              <div className="text-center mb-12">
                <ShineEffect duration={4}>
                  <div className="text-5xl md:text-7xl font-bold mb-4">
                    <div className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                      <LetterDrop 
                        text={invitationData.groomName} 
                        variant="cascade" 
                        delay={0.3}
                      />
                    </div>
                    <div className="text-4xl my-4 text-red-600">❀</div>
                    <div className="bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent">
                      <LetterDrop 
                        text={invitationData.brideName} 
                        variant="cascade" 
                        delay={0.8}
                      />
                    </div>
                  </div>
                </ShineEffect>
              </div>
            </FadeIn>
            
            {/* Parents Section with Glow */}
            <RevealOnScroll direction="up" delay={0}>
              <Glow variant="soft" color="#FBBF24">
                <div className="mb-12 p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border-2 border-orange-200">
                  <div className="text-center space-y-4">
                    <p className="text-lg text-gray-700">
                      <span className="font-semibold">{invitationData.groomTitle}:</span> {invitationData.groomParents}
                    </p>
                    <p className="text-lg text-gray-700">
                      <span className="font-semibold">{invitationData.brideTitle}:</span> {invitationData.brideParents}
                    </p>
                  </div>
                </div>
              </Glow>
            </RevealOnScroll>
            
            {/* Blessing Section */}
            <RevealOnScroll direction="up" delay={0.2}>
              <FadeIn direction="up">
                <div className="mb-12 text-center">
                  <Pulse scale={1.02} duration={3}>
                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-8 rounded-xl border-2 border-yellow-200">
                      <p className="text-2xl text-orange-800 font-medium mb-4">
                        શ્રી ગણેશાય નમઃ
                      </p>
                      <p className="text-lg text-gray-700">
                        માતા-પિતા અને પરિવારના આશીર્વાદથી...
                      </p>
                    </div>
                  </Pulse>
                </div>
              </FadeIn>
            </RevealOnScroll>
            
            {/* Event Details */}
            <RevealOnScroll direction="up" delay={0.3}>
              <div className="mb-12">
                {invitationData.events.map((event, index) => (
                  <FadeIn key={event.id} direction="up" delay={index * 0.1}>
                    <Glow variant="soft" color="#EC4899">
                      <div className="mb-6 bg-gradient-to-r from-orange-100 to-red-100 p-8 rounded-2xl">
                        <h3 className="text-3xl font-bold text-orange-800 mb-4">{event.name}</h3>
                        <div className="space-y-2 text-lg text-gray-700">
                          <p>📅 {event.date}</p>
                          <p>⏰ {event.time}</p>
                          <p>📍 {event.venue}</p>
                          {event.description && <p className="mt-4 italic">{event.description}</p>}
                        </div>
                      </div>
                    </Glow>
                  </FadeIn>
                ))}
              </div>
            </RevealOnScroll>
            
            {/* RSVP Button */}
            <RevealOnScroll direction="up" delay={0.4}>
              <div className="text-center">
                <HoverScale scale={1.08}>
                  <Glow variant="pulsing" color="#EC4899">
                    <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-12 py-4 rounded-full text-xl font-bold shadow-2xl hover:shadow-3xl transition-all">
                      📞 RSVP Now
                    </button>
                  </Glow>
                </HoverScale>
              </div>
            </RevealOnScroll>
            
            {/* Message Section */}
            <RevealOnScroll direction="up" delay={0.5}>
              <FadeIn direction="up">
                <div className="mt-12 text-center">
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl border-2 border-orange-200">
                    <p className="text-xl text-gray-800 italic">
                      તમારી ઉપસ્થિતિ અમારા આ પવિત્ર અવસરને ગૌરવશાળી બનાવશે
                    </p>
                  </div>
                </div>
              </FadeIn>
            </RevealOnScroll>
            
          </div>
        </div>
        
        {/* Info Box at Bottom */}
        <FadeIn direction="up" delay={1}>
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 bg-white/80 backdrop-blur px-6 py-3 rounded-full inline-block shadow-md">
              ✨ This is an example of animated kankotri template ✨
            </p>
          </div>
        </FadeIn>
        
      </div>
    </div>
  )
}
