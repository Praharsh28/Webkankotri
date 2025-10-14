/**
 * Lazy Loading Wrapper for Heavy Motifs
 * 
 * Only loads when in viewport
 * Improves initial page load performance
 */

'use client';

import { useEffect, useRef, useState } from 'react';

interface LazyMotifProps {
  children: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
  placeholder?: React.ReactNode;
}

export function LazyMotif({
  children,
  threshold = 0.1,
  rootMargin = '50px',
  placeholder = <div className="h-full w-full animate-pulse bg-gray-200 opacity-30" />,
}: LazyMotifProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  return (
    <div ref={ref} className="h-full w-full">
      {isVisible ? children : placeholder}
    </div>
  );
}

// Preload critical resources
export function preloadImage(src: string) {
  if (typeof window === 'undefined') return;
  
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = src;
  document.head.appendChild(link);
}

// Optimize image loading
export function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (priority) {
      preloadImage(src);
    }
  }, [src, priority]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 animate-pulse bg-[#e8e6e1]" />
      )}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
}
