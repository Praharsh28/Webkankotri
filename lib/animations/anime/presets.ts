/**
 * Anime.js Animation Presets
 * 
 * Ready-to-use animations using Anime.js
 */

import anime from 'animejs/lib/anime.es.js';

export interface AnimeOptions {
  duration?: number;
  delay?: number;
  easing?: string;
  loop?: boolean;
}

/**
 * Bounce in animation
 */
export function bounceIn(element: HTMLElement | string, options: AnimeOptions = {}) {
  return anime({
    targets: element,
    scale: [0, 1],
    opacity: [0, 1],
    duration: options.duration || 800,
    delay: options.delay || 0,
    easing: options.easing || 'easeOutElastic(1, .5)',
    loop: options.loop || false,
  });
}

/**
 * Slide rotate animation
 */
export function slideRotate(element: HTMLElement | string, options: AnimeOptions = {}) {
  return anime({
    targets: element,
    translateX: [-100, 0],
    rotate: ['-10deg', '0deg'],
    opacity: [0, 1],
    duration: options.duration || 1000,
    delay: options.delay || 0,
    easing: options.easing || 'easeOutExpo',
    loop: options.loop || false,
  });
}

/**
 * Pulse effect
 */
export function pulse(element: HTMLElement | string, options: AnimeOptions = {}) {
  return anime({
    targets: element,
    scale: [1, 1.05, 1],
    duration: options.duration || 1000,
    delay: options.delay || 0,
    easing: options.easing || 'easeInOutQuad',
    loop: true,
  });
}

/**
 * Letter stagger animation
 */
export function letterStagger(container: HTMLElement, options: AnimeOptions = {}) {
  // Split text into letters wrapped in spans
  const text = container.textContent || '';
  container.innerHTML = text.split('').map(char => 
    char === ' ' ? ' ' : `<span class="letter" style="display:inline-block">${char}</span>`
  ).join('');
  
  return anime({
    targets: container.querySelectorAll('.letter'),
    translateY: [-50, 0],
    opacity: [0, 1],
    delay: anime.stagger(100),
    duration: options.duration || 1000,
    easing: options.easing || 'easeOutExpo',
    loop: options.loop || false,
  });
}

/**
 * Text wave animation
 */
export function textWave(container: HTMLElement, options: AnimeOptions = {}) {
  const text = container.textContent || '';
  container.innerHTML = text.split('').map(char => 
    char === ' ' ? ' ' : `<span class="letter" style="display:inline-block">${char}</span>`
  ).join('');
  
  return anime({
    targets: container.querySelectorAll('.letter'),
    translateY: [
      { value: -20, duration: 500 },
      { value: 0, duration: 500 }
    ],
    delay: anime.stagger(50),
    loop: true,
    easing: 'easeInOutSine',
  });
}

/**
 * Stagger grid animation
 */
export function staggerGrid(elements: HTMLElement[], grid: [number, number] = [3, 3], options: AnimeOptions = {}) {
  return anime({
    targets: elements,
    scale: [0, 1],
    opacity: [0, 1],
    delay: anime.stagger(100, { grid: grid, from: 'center' }),
    duration: options.duration || 600,
    easing: options.easing || 'easeOutExpo',
    loop: options.loop || false,
  });
}

/**
 * Follow path animation
 */
export function followPath(element: HTMLElement, pathSelector: string, options: AnimeOptions = {}) {
  const path = anime.path(pathSelector);
  
  return anime({
    targets: element,
    translateX: path('x'),
    translateY: path('y'),
    rotate: path('angle'),
    duration: options.duration || 3000,
    easing: options.easing || 'linear',
    loop: options.loop || true,
  });
}

/**
 * Draw SVG line animation
 */
export function drawLine(element: SVGElement, options: AnimeOptions = {}) {
  return anime({
    targets: element,
    strokeDashoffset: [anime.setDashoffset, 0],
    duration: options.duration || 2000,
    easing: options.easing || 'easeInOutSine',
    loop: options.loop || false,
  });
}

/**
 * Elastic bounce
 */
export function elasticBounce(element: HTMLElement | string, options: AnimeOptions = {}) {
  return anime({
    targets: element,
    translateY: [
      { value: -100, duration: 500, easing: 'easeOutCubic' },
      { value: 0, duration: 800, easing: 'easeOutElastic(1, .8)' }
    ],
    delay: options.delay || 0,
    loop: options.loop || false,
  });
}

/**
 * Fade slide (all directions)
 */
export function fadeSlide(
  element: HTMLElement | string, 
  direction: 'up' | 'down' | 'left' | 'right' = 'up',
  options: AnimeOptions = {}
) {
  const directionMap = {
    up: { translateY: [50, 0] },
    down: { translateY: [-50, 0] },
    left: { translateX: [50, 0] },
    right: { translateX: [-50, 0] },
  };
  
  return anime({
    targets: element,
    ...directionMap[direction],
    opacity: [0, 1],
    duration: options.duration || 800,
    delay: options.delay || 0,
    easing: options.easing || 'easeOutExpo',
    loop: options.loop || false,
  });
}
