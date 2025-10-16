/**
 * GSAP Plugin Setup
 * 
 * Registers all FREE GSAP plugins
 * Call this once on app initialization
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { Draggable } from 'gsap/Draggable';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { TextPlugin } from 'gsap/TextPlugin';

// Register all FREE plugins
export function setupGSAP() {
  gsap.registerPlugin(
    ScrollTrigger,
    ScrollToPlugin,
    Draggable,
    MotionPathPlugin,
    TextPlugin
  );
  
  // Configure ScrollTrigger defaults
  ScrollTrigger.defaults({
    toggleActions: 'play none none reverse',
    markers: false, // Set to true for debugging
  });
  
  // Set GSAP defaults
  gsap.defaults({
    ease: 'power2.out',
    duration: 0.8,
  });
  
  console.log('✅ GSAP plugins registered successfully');
}

// Auto-initialize in browser
if (typeof window !== 'undefined') {
  setupGSAP();
}
