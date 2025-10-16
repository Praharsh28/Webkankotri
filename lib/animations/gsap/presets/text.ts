/**
 * GSAP Text Animation Presets
 * 
 * Ready-to-use text animations using GSAP
 */

import { gsap } from 'gsap';

export interface TextAnimationOptions {
  duration?: number;
  delay?: number;
  ease?: string;
  stagger?: number;
}

/**
 * Fade in + Slide up animation
 */
export function fadeSlideUp(element: HTMLElement, options: TextAnimationOptions = {}) {
  return gsap.from(element, {
    y: 50,
    opacity: 0,
    duration: options.duration || 1,
    delay: options.delay || 0,
    ease: options.ease || 'power3.out',
  });
}

/**
 * Typewriter effect (requires TextPlugin)
 */
export function typewriter(element: HTMLElement, text: string, options: TextAnimationOptions = {}) {
  // Clear existing text
  element.textContent = '';
  
  return gsap.to(element, {
    text: {
      value: text,
      delimiter: '',
    },
    duration: options.duration || 2,
    delay: options.delay || 0,
    ease: options.ease || 'none',
  });
}

/**
 * Word-by-word reveal
 */
export function wordReveal(element: HTMLElement, options: TextAnimationOptions = {}) {
  // Split text into words
  const text = element.textContent || '';
  const words = text.split(' ');
  
  element.innerHTML = words.map(word => `<span style="display: inline-block;">${word}</span>`).join(' ');
  
  return gsap.from(element.querySelectorAll('span'), {
    opacity: 0,
    y: 20,
    stagger: options.stagger || 0.1,
    duration: options.duration || 0.8,
    delay: options.delay || 0,
    ease: options.ease || 'power2.out',
  });
}

/**
 * Letter-by-letter stagger
 */
export function letterStagger(element: HTMLElement, options: TextAnimationOptions = {}) {
  // Split text into letters
  const text = element.textContent || '';
  const letters = text.split('');
  
  element.innerHTML = letters.map(letter => 
    letter === ' ' ? ' ' : `<span style="display: inline-block;">${letter}</span>`
  ).join('');
  
  return gsap.from(element.querySelectorAll('span'), {
    opacity: 0,
    y: -50,
    rotateX: -90,
    stagger: options.stagger || 0.05,
    duration: options.duration || 0.6,
    delay: options.delay || 0,
    ease: options.ease || 'back.out(1.7)',
  });
}

/**
 * Glitch effect
 */
export function glitchText(element: HTMLElement, options: TextAnimationOptions = {}) {
  const tl = gsap.timeline({ repeat: -1, repeatDelay: 3 });
  
  tl.to(element, {
    skewX: 70,
    duration: 0.1,
    ease: 'power4.inOut',
  })
  .to(element, {
    skewX: -70,
    duration: 0.1,
  })
  .to(element, {
    skewX: 0,
    duration: 0.1,
  });
  
  return tl;
}

/**
 * Fade in from sides
 */
export function fadeFromSides(element: HTMLElement, options: TextAnimationOptions = {}) {
  const text = element.textContent || '';
  const words = text.split(' ');
  
  element.innerHTML = words.map(word => `<span style="display: inline-block;">${word}</span>`).join(' ');
  
  const spans = element.querySelectorAll('span');
  
  return gsap.from(spans, {
    opacity: 0,
    x: (i) => (i % 2 === 0 ? -100 : 100),
    stagger: options.stagger || 0.1,
    duration: options.duration || 0.8,
    delay: options.delay || 0,
    ease: options.ease || 'power2.out',
  });
}

/**
 * Bounce in letters
 */
export function bounceLetters(element: HTMLElement, options: TextAnimationOptions = {}) {
  const text = element.textContent || '';
  const letters = text.split('');
  
  element.innerHTML = letters.map(letter => 
    letter === ' ' ? ' ' : `<span style="display: inline-block;">${letter}</span>`
  ).join('');
  
  return gsap.from(element.querySelectorAll('span'), {
    scale: 0,
    opacity: 0,
    stagger: options.stagger || 0.05,
    duration: options.duration || 0.8,
    delay: options.delay || 0,
    ease: 'elastic.out(1, 0.5)',
  });
}
