/**
 * GSAP Scroll Animation Presets
 * 
 * Scroll-triggered animations using ScrollTrigger
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export interface ScrollAnimationOptions {
  start?: string;
  end?: string;
  scrub?: boolean | number;
  pin?: boolean;
  markers?: boolean;
  once?: boolean;
}

/**
 * Scroll fade in
 */
export function scrollFadeIn(element: HTMLElement, options: ScrollAnimationOptions = {}) {
  return gsap.from(element, {
    scrollTrigger: {
      trigger: element,
      start: options.start || 'top 80%',
      end: options.end || 'top 20%',
      scrub: options.scrub !== undefined ? options.scrub : 1,
      markers: options.markers || false,
      once: options.once || false,
    },
    opacity: 0,
    y: 100,
  });
}

/**
 * Parallax effect
 */
export function parallax(element: HTMLElement, speed: number = 0.5, options: ScrollAnimationOptions = {}) {
  return gsap.to(element, {
    scrollTrigger: {
      trigger: element,
      start: options.start || 'top bottom',
      end: options.end || 'bottom top',
      scrub: true,
      markers: options.markers || false,
    },
    y: () => -(window.innerHeight * speed),
    ease: 'none',
  });
}

/**
 * Pin section while scrolling
 */
export function pinSection(element: HTMLElement, duration: number = 500, options: ScrollAnimationOptions = {}) {
  return ScrollTrigger.create({
    trigger: element,
    start: options.start || 'top top',
    end: options.end || `+=${duration}`,
    pin: true,
    markers: options.markers || false,
  });
}

/**
 * Scroll-triggered reveal with scale
 */
export function scrollRevealScale(element: HTMLElement, options: ScrollAnimationOptions = {}) {
  return gsap.from(element, {
    scrollTrigger: {
      trigger: element,
      start: options.start || 'top 80%',
      end: options.end || 'top 30%',
      scrub: options.scrub !== undefined ? options.scrub : 1,
      markers: options.markers || false,
      once: options.once || false,
    },
    scale: 0.8,
    opacity: 0,
  });
}

/**
 * Horizontal scroll effect
 */
export function horizontalScroll(container: HTMLElement, items: HTMLElement[], options: ScrollAnimationOptions = {}) {
  const totalWidth = items.reduce((acc, item) => acc + item.offsetWidth, 0);
  
  return gsap.to(items, {
    xPercent: -100 * (items.length - 1),
    ease: 'none',
    scrollTrigger: {
      trigger: container,
      pin: true,
      scrub: 1,
      end: () => `+=${totalWidth}`,
      markers: options.markers || false,
    },
  });
}

/**
 * Scroll progress indicator
 */
export function scrollProgress(element: HTMLElement, options: ScrollAnimationOptions = {}) {
  return gsap.to(element, {
    scrollTrigger: {
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      markers: options.markers || false,
    },
    scaleX: 1,
    transformOrigin: 'left center',
  });
}

/**
 * Stagger elements on scroll
 */
export function staggerScroll(elements: HTMLElement[], options: ScrollAnimationOptions = {}) {
  return gsap.from(elements, {
    scrollTrigger: {
      trigger: elements[0],
      start: options.start || 'top 80%',
      markers: options.markers || false,
      once: options.once || false,
    },
    y: 100,
    opacity: 0,
    stagger: 0.2,
    duration: 0.8,
    ease: 'power2.out',
  });
}

/**
 * Rotate on scroll
 */
export function rotateOnScroll(element: HTMLElement, rotation: number = 360, options: ScrollAnimationOptions = {}) {
  return gsap.to(element, {
    scrollTrigger: {
      trigger: element,
      start: options.start || 'top bottom',
      end: options.end || 'bottom top',
      scrub: true,
      markers: options.markers || false,
    },
    rotation: rotation,
    ease: 'none',
  });
}
