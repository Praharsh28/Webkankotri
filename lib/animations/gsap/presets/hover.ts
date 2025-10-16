/**
 * GSAP Hover Animation Presets
 * 
 * Interactive hover effects using GSAP
 */

import { gsap } from 'gsap';

export interface HoverAnimationOptions {
  duration?: number;
  ease?: string;
  scale?: number;
  rotation?: number;
}

/**
 * Scale on hover
 */
export function hoverScale(element: HTMLElement, options: HoverAnimationOptions = {}) {
  element.addEventListener('mouseenter', () => {
    gsap.to(element, {
      scale: options.scale || 1.1,
      rotation: options.rotation || 5,
      duration: options.duration || 0.3,
      ease: options.ease || 'power2.out',
    });
  });
  
  element.addEventListener('mouseleave', () => {
    gsap.to(element, {
      scale: 1,
      rotation: 0,
      duration: options.duration || 0.3,
      ease: options.ease || 'power2.inOut',
    });
  });
}

/**
 * Magnetic hover effect
 */
export function magneticHover(element: HTMLElement, strength: number = 50) {
  element.addEventListener('mousemove', (e) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    gsap.to(element, {
      x: x * strength / rect.width,
      y: y * strength / rect.height,
      duration: 0.3,
      ease: 'power2.out',
    });
  });
  
  element.addEventListener('mouseleave', () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)',
    });
  });
}

/**
 * Lift on hover (shadow + translate)
 */
export function hoverLift(element: HTMLElement, options: HoverAnimationOptions = {}) {
  element.addEventListener('mouseenter', () => {
    gsap.to(element, {
      y: -10,
      boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
      duration: options.duration || 0.3,
      ease: options.ease || 'power2.out',
    });
  });
  
  element.addEventListener('mouseleave', () => {
    gsap.to(element, {
      y: 0,
      boxShadow: '0 0 0 rgba(0,0,0,0)',
      duration: options.duration || 0.3,
      ease: options.ease || 'power2.inOut',
    });
  });
}

/**
 * Tilt 3D on hover
 */
export function hoverTilt3D(element: HTMLElement, options: HoverAnimationOptions = {}) {
  element.style.transformStyle = 'preserve-3d';
  
  element.addEventListener('mousemove', (e) => {
    const rect = element.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    const rotateY = (x - 0.5) * 20;
    const rotateX = (0.5 - y) * 20;
    
    gsap.to(element, {
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 0.3,
      ease: 'power2.out',
    });
  });
  
  element.addEventListener('mouseleave', () => {
    gsap.to(element, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'power2.out',
    });
  });
}

/**
 * Glow on hover
 */
export function hoverGlow(element: HTMLElement, color: string = 'rgba(212, 175, 55, 0.5)') {
  element.addEventListener('mouseenter', () => {
    gsap.to(element, {
      boxShadow: `0 0 30px ${color}`,
      duration: 0.3,
      ease: 'power2.out',
    });
  });
  
  element.addEventListener('mouseleave', () => {
    gsap.to(element, {
      boxShadow: '0 0 0 rgba(0,0,0,0)',
      duration: 0.3,
      ease: 'power2.out',
    });
  });
}
