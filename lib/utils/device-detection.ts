/**
 * Device Detection Utilities
 * 
 * Smart device detection for adaptive animations
 * Mobile gets lightweight, desktop gets rich experience
 */

export function isMobile(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
}

export function isTablet(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= 768 && window.innerWidth < 1024;
}

export function isDesktop(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= 1024;
}

export function hasHoverCapability(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(hover: hover)').matches;
}

export function getParticleCount(): number {
  if (isMobile()) return 12;      // Cinematic feel on mobile!
  if (isTablet()) return 25;      // More on tablet
  return 40;                      // Rich on desktop
}

export function getPetalCount(): number {
  if (isMobile()) return 15;      // Subtle on mobile
  if (isTablet()) return 25;      // More on tablet
  return 40;                      // Full effect on desktop
}

export function shouldEnableInteractions(): boolean {
  return isDesktop() && hasHoverCapability();
}

export function shouldEnableConnections(): boolean {
  return isDesktop(); // Only desktop gets particle connections
}

export function getAnimationSpeed(): number {
  if (isMobile()) return 0.7;     // Slower = smoother on mobile
  if (isTablet()) return 0.85;
  return 1;                       // Normal speed on desktop
}
