/**
 * Kankotri Cover Page (Page 1)
 * 
 * Features:
 * - Couple photo
 * - Names in decorative frame
 * - Wedding date
 * - Traditional floral decorations
 */

'use client';

import { OrnateDivider } from '../decorations/TraditionalBorder';
import { CornerDecoration } from '../decorations/EnhancedBorders';
import { PremiumGoldFoil, EmbossedText, GoldFoilFrame } from '../effects/PremiumGoldFoil';
import { PaisleyMotif } from '../symbols/PremiumMotifs';
import { authenticKankotriColors } from '../kankotri-colors-v2';

// Advanced Animations - UPGRADED!
import { PhysicsPetals } from '../animations/PhysicsPetals'; // NEW: Physics-based!
import { AdvancedParticles } from '../animations/AdvancedParticles'; // NEW: With connections!
import { ConfettiBurst } from '../animations/ConfettiBurst';
import { TextReveal } from '../animations/TextReveal';
import { DiyaFlame } from '../animations/DiyaFlame';
import { LotusBloom } from '../animations/LotusBloom';
import { ParallaxScroll, ScaleOnScroll } from '../animations/ParallaxScroll';
import { AmbientSound } from '../audio/AmbientSound'; // NEW: Sound system!
import { ProfessionalGanesh } from '../symbols/ProfessionalGanesh'; // NEW: Professional SVG!
import { EnhancedPeacock } from '../symbols/EnhancedPeacock'; // NEW: Intricate peacock!
import { motion } from 'framer-motion';

interface KankotriCoverProps {
  groomName: string;
  brideName: string;
  weddingDate: Date;
  couplePhoto?: string;
  config: any;
}

export function KankotriCover({
  groomName,
  brideName,
  weddingDate,
  couplePhoto,
  config,
}: KankotriCoverProps) {
  const formattedDate = weddingDate.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const monthYear = weddingDate.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  const day = weddingDate.getDate();
  const weekday = weddingDate.toLocaleDateString('en-US', {
    weekday: 'long',
  });

  return (
    <div className="relative min-h-screen paper-texture py-16 px-6 overflow-hidden">
      {/* 🎬 UPGRADED ULTRA-ADVANCED ANIMATIONS */}
      
      {/* NEW: Physics-based petals (realistic falling with wind!) */}
      <PhysicsPetals count={50} windStrength={0.5} />
      
      {/* NEW: Advanced particles with connections! */}
      <AdvancedParticles count={80} interactive connections />
      
      {/* Confetti burst on load */}
      <ConfettiBurst delay={1000} duration={3000} />
      
      {/* NEW: Ambient Sound System */}
      <AmbientSound />
      
      {/* Corner decorations with parallax */}
      <ParallaxScroll speed={0.3} direction="down">
        <CornerDecoration position="top-left" />
      </ParallaxScroll>
      <ParallaxScroll speed={0.3} direction="down">
        <CornerDecoration position="top-right" />
      </ParallaxScroll>
      <ParallaxScroll speed={0.2} direction="up">
        <CornerDecoration position="bottom-left" />
      </ParallaxScroll>
      <ParallaxScroll speed={0.2} direction="up">
        <CornerDecoration position="bottom-right" />
      </ParallaxScroll>
      
      {/* NEW: Professional Ganesh at top center */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10">
        <ProfessionalGanesh size={120} animate />
      </div>
      
      {/* NEW: Enhanced Peacock on left */}
      <ParallaxScroll speed={0.3} className="absolute top-32 left-8 opacity-40">
        <EnhancedPeacock size={100} animate />
      </ParallaxScroll>
      
      {/* NEW: Enhanced Peacock on right (mirrored) */}
      <ParallaxScroll speed={0.3} className="absolute top-32 right-8 opacity-40 -scale-x-100">
        <EnhancedPeacock size={100} animate />
      </ParallaxScroll>

      <div className="container mx-auto max-w-2xl">
        {/* Couple Photo with scale animation */}
        {couplePhoto && (
          <ScaleOnScroll>
            <motion.div 
              className="relative mb-12"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <div className="relative overflow-hidden rounded-lg border-4 border-[#d4af37]/30 shadow-2xl">
                <img
                  src={couplePhoto}
                  alt={`${groomName} & ${brideName}`}
                  className="h-[400px] w-full object-cover"
                />
                {/* Decorative overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#f5f5dc] via-[#f5f5dc]/80 to-transparent" />
              </div>
              
              {/* Decorative flourish */}
              <motion.div
                className="absolute -bottom-4 left-1/2 -translate-x-1/2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: 'spring' }}
              >
                <svg width="200" height="40" viewBox="0 0 200 40" fill="none">
                  <path
                    d="M10 20 Q50 10, 100 20 T190 20"
                    stroke="#2d5016"
                    strokeWidth="2"
                    fill="none"
                  />
                  <circle cx="100" cy="20" r="15" fill="#f5f5dc" stroke="#d4af37" strokeWidth="2" />
                  <path
                    d="M95 15 L100 25 L105 15"
                    fill="none"
                    stroke="#c41e3a"
                    strokeWidth="2"
                  />
                </svg>
              </motion.div>
            </motion.div>
          </ScaleOnScroll>
        )}

        {/* Names with TEXT REVEAL ANIMATION 🔥 */}
        <motion.div 
          className="mb-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          {/* Groom Name - Letter by Letter */}
          <PremiumGoldFoil intensity="strong" enableShimmer>
            <h2 className="mb-6 font-serif text-6xl font-light tracking-[0.15em] md:text-8xl">
              <TextReveal delay={1.8} staggerDelay={0.05}>
                {groomName}
              </TextReveal>
            </h2>
          </PremiumGoldFoil>
          
          {/* Divider with ANIMATED LOTUS BLOOM 🌸 */}
          <motion.div 
            className="my-12 flex items-center justify-center gap-8"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 2.5, type: 'spring', stiffness: 200 }}
          >
            <LotusBloom size={60} color={authenticKankotriColors.kumkumRed} />
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 3, type: 'spring' }}
            >
              <EmbossedText depth="medium">
                <span className="font-serif text-4xl tracking-wide" style={{ color: authenticKankotriColors.templeGreen }}>
                  Weds
                </span>
              </EmbossedText>
            </motion.div>
            
            <LotusBloom size={60} color={authenticKankotriColors.kumkumRed} className="-scale-x-100" />
          </motion.div>
          
          {/* Bride Name - Letter by Letter */}
          <PremiumGoldFoil intensity="strong" enableShimmer>
            <h2 className="font-serif text-6xl font-light tracking-[0.15em] md:text-8xl">
              <TextReveal delay={3.2} staggerDelay={0.05}>
                {brideName}
              </TextReveal>
            </h2>
          </PremiumGoldFoil>
        </motion.div>

        {/* Divider */}
        <OrnateDivider color={authenticKankotriColors.sacredGold} />

        {/* Date with Premium Gold Frame - ANIMATED ENTRANCE */}
        <motion.div 
          className="flex justify-center"
          initial={{ opacity: 0, scale: 0.5, rotateX: -90 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          transition={{ delay: 4, type: 'spring', stiffness: 100, damping: 15 }}
        >
          <GoldFoilFrame thickness={3} className="px-16 py-8">
            <div className="text-center">
              <EmbossedText depth="subtle">
                <motion.p 
                  className="mb-2 text-[10px] uppercase tracking-[0.35em]" 
                  style={{ color: authenticKankotriColors.templeGreen }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 4.3 }}
                >
                  {weekday}
                </motion.p>
              </EmbossedText>
              
              <PremiumGoldFoil intensity="strong" enableShimmer>
                <motion.p 
                  className="font-serif text-8xl font-bold leading-none"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 4.5, type: 'spring', stiffness: 300 }}
                >
                  {day}
                </motion.p>
              </PremiumGoldFoil>
              
              <EmbossedText depth="subtle">
                <motion.p 
                  className="mt-3 font-serif text-2xl" 
                  style={{ color: authenticKankotriColors.darkBrown }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 4.7 }}
                >
                  {monthYear}
                </motion.p>
              </EmbossedText>
            </div>
          </GoldFoilFrame>
        </motion.div>

        {/* ANIMATED DIYAS - Flickering flames 🪔 */}
        <motion.div 
          className="mt-20 flex justify-center gap-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 5, duration: 1 }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                delay: 5.2 + i * 0.2, 
                type: 'spring',
                stiffness: 200,
                damping: 15
              }}
            >
              <DiyaFlame 
                size={70} 
                color={authenticKankotriColors.sacredGold}
                animate={true}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
