/**
 * Parallax Layers - 5 Depth Layers
 * Creates cinematic depth with multiple moving layers
 */

'use client';

interface ParallaxLayersProps {
  scrollY: number;
}

export function ParallaxLayers({ scrollY }: ParallaxLayersProps) {
  return (
    <div className="fixed inset-0 pointer-events-none">
      {/* Layer 1: Deepest - slowest movement */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          transform: `translateY(${scrollY * 0.1}px) scale(1.2)`,
        }}
      >
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 20% 30%, rgba(255, 215, 0, 0.1) 0%, transparent 50%)',
          }}
        />
      </div>

      {/* Layer 2: Deep */}
      <div 
        className="absolute inset-0 opacity-15"
        style={{
          transform: `translateY(${scrollY * 0.2}px) translateX(${scrollY * -0.05}px)`,
        }}
      >
        <div 
          className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ background: 'rgba(255, 107, 53, 0.15)' }}
        />
      </div>

      {/* Layer 3: Mid */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          transform: `translateY(${scrollY * 0.35}px) translateX(${scrollY * 0.08}px) scale(1.1)`,
        }}
      >
        <div 
          className="absolute bottom-1/3 left-1/3 w-[500px] h-[500px] rounded-full blur-3xl"
          style={{ background: 'rgba(255, 215, 0, 0.1)' }}
        />
      </div>

      {/* Layer 4: Close - faster movement */}
      <div 
        className="absolute inset-0 opacity-8"
        style={{
          transform: `translateY(${scrollY * 0.5}px) scale(1.05)`,
        }}
      >
        {/* Geometric shapes for depth */}
        <div 
          className="absolute top-1/2 left-1/4 w-32 h-32 border border-gold opacity-20"
          style={{
            transform: `rotate(${scrollY * 0.1}deg)`,
            borderColor: 'rgba(255, 215, 0, 0.3)',
          }}
        />
        <div 
          className="absolute top-1/3 right-1/3 w-24 h-24 rounded-full border-2 opacity-15"
          style={{
            transform: `rotate(${scrollY * -0.15}deg)`,
            borderColor: 'rgba(255, 107, 53, 0.3)',
          }}
        />
      </div>

      {/* Layer 5: Closest - fastest movement */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          transform: `translateY(${scrollY * 0.7}px) translateX(${scrollY * -0.1}px)`,
        }}
      >
        {/* Foreground elements */}
        <div 
          className="absolute top-2/3 right-1/4 w-40 h-40 blur-2xl"
          style={{ 
            background: 'radial-gradient(circle, rgba(255, 215, 0, 0.2) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Animated light streak (moves independently) */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          background: 'linear-gradient(120deg, transparent 0%, rgba(255, 215, 0, 0.1) 50%, transparent 100%)',
          transform: `translateX(${(scrollY % 1000) - 500}px) rotate(30deg)`,
        }}
      />
    </div>
  );
}
