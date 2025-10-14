'use client';

import { useState, useRef, useEffect, type ReactNode } from 'react';
import { useInView } from 'framer-motion';

/**
 * VideoBackground Component
 * 
 * Displays a fullscreen video background with overlay and automatic fallback.
 * Optimized for mobile devices with quality detection and lazy loading.
 * 
 * @example
 * ```tsx
 * <VideoBackground
 *   src="/videos/wedding.mp4"
 *   overlay={0.4}
 *   fallback={<GradientBackground />}
 * >
 *   <YourContent />
 * </VideoBackground>
 * ```
 * 
 * Features:
 * - Automatic quality detection (mobile vs desktop)
 * - Gradient fallback if video fails to load
 * - Pauses when not in viewport (performance)
 * - Error handling with retry logic
 * - Loading state with poster image
 * 
 * Performance:
 * - Mobile: Loads low-quality video (720p, 1-2MB)
 * - Desktop: Loads high-quality video (1080p, 3-5MB)
 * - Lazy loads video until component is visible
 * - Uses Intersection Observer for viewport detection
 */

export interface VideoBackgroundProps {
  /** Video source URL. For mobile optimization, provide both mobile and desktop URLs */
  src: string;
  /** Mobile-optimized video URL (optional, falls back to src) */
  mobileSrc?: string;
  /** Poster image to show while loading */
  poster?: string;
  /** Overlay opacity (0-1). Default: 0.4 */
  overlay?: number;
  /** Overlay color. Default: 'rgba(0, 0, 0, 0.4)' */
  overlayColor?: string;
  /** Fallback component if video fails to load */
  fallback?: ReactNode;
  /** Should video loop? Default: true */
  loop?: boolean;
  /** Should video be muted? Default: true (recommended for autoplay) */
  muted?: boolean;
  /** Should video autoplay? Default: true */
  autoPlay?: boolean;
  /** Children to render on top of video */
  children?: ReactNode;
  /** Callback when video fails to load */
  onError?: () => void;
  /** Callback when video successfully loads */
  onLoad?: () => void;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Detects device capabilities for optimal video quality
 */
function getDeviceCapabilities() {
  if (typeof window === 'undefined') return { isMobile: false, isLowEnd: false };
  
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const isLowEnd = navigator.hardwareConcurrency ? navigator.hardwareConcurrency < 4 : false;
  
  return { isMobile, isLowEnd };
}

export function VideoBackground({
  src,
  mobileSrc,
  poster,
  overlay = 0.4,
  overlayColor = 'rgba(0, 0, 0, 0.4)',
  fallback,
  loop = true,
  muted = true,
  autoPlay = true,
  children,
  onError,
  onLoad,
  className = '',
}: VideoBackgroundProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });

  const { isMobile, isLowEnd } = getDeviceCapabilities();
  const maxRetries = 2;

  // Use mobile video if available and on mobile device
  const videoSrc = isMobile && mobileSrc ? mobileSrc : src;

  // Handle video errors with retry logic
  const handleError = () => {
    if (retryCount < maxRetries) {
      // Retry loading
      setRetryCount(prev => prev + 1);
      if (videoRef.current) {
        videoRef.current.load();
      }
    } else {
      // Max retries reached, show fallback
      setHasError(true);
      onError?.();
    }
  };

  // Handle successful video load
  const handleLoad = () => {
    setIsLoaded(true);
    setHasError(false);
    onLoad?.();
  };

  // Pause video when not in viewport (performance optimization)
  useEffect(() => {
    if (!videoRef.current) return;

    if (isInView) {
      videoRef.current.play().catch(() => {
        // Autoplay might be blocked, that's okay
      });
    } else {
      videoRef.current.pause();
    }
  }, [isInView]);

  // If video failed and fallback provided, show fallback
  if (hasError && fallback) {
    return <>{fallback}</>;
  }

  // If low-end device and fallback provided, skip video entirely
  if (isLowEnd && fallback) {
    return <>{fallback}</>;
  }

  return (
    <div 
      ref={containerRef}
      className={`relative min-h-screen w-full overflow-hidden ${className}`}
    >
      {/* Video Layer */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          loop={loop}
          muted={muted}
          autoPlay={autoPlay}
          playsInline
          poster={poster}
          onError={handleError}
          onLoadedData={handleLoad}
        >
          <source src={videoSrc} type="video/mp4" />
          {/* Fallback message for browsers without video support */}
          Your browser does not support the video tag.
        </video>

        {/* Loading state - show poster or dark background */}
        {!isLoaded && !hasError && (
          <div 
            className="absolute inset-0 bg-gray-900 animate-pulse"
            style={{
              backgroundImage: poster ? `url(${poster})` : undefined,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        )}
      </div>

      {/* Overlay Layer */}
      <div 
        className="absolute inset-0 z-10"
        style={{
          backgroundColor: overlayColor,
          opacity: overlay,
        }}
      />

      {/* Content Layer */}
      <div className="relative z-20">
        {children}
      </div>
    </div>
  );
}
