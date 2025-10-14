/**
 * Device Detection Utilities
 * 
 * Helper functions for device capability detection
 */

import type { DeviceCapabilities } from '@/types/v2/animation';

/**
 * Detect device capabilities for optimal performance
 */
export function getDeviceCapabilities(): DeviceCapabilities {
  if (typeof window === 'undefined') {
    return {
      isMobile: false,
      isLowEnd: false,
      hasGoodConnection: true,
      canPlayVideo: true,
    };
  }

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const isLowEnd = navigator.hardwareConcurrency ? navigator.hardwareConcurrency < 4 : false;
  
  // Check connection quality
  const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
  const hasGoodConnection = connection ? connection.effectiveType === '4g' : true;
  
  // Check video support
  const video = document.createElement('video');
  const canPlayVideo = video.canPlayType('video/mp4') !== '';

  return {
    isMobile,
    isLowEnd,
    hasGoodConnection,
    canPlayVideo,
  };
}

/**
 * Check if device is mobile
 */
export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}

/**
 * Check if device is low-end
 */
export function isLowEndDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return navigator.hardwareConcurrency ? navigator.hardwareConcurrency < 4 : false;
}

/**
 * Get optimal video quality for device
 */
export function getOptimalVideoQuality(): 'low' | 'medium' | 'high' {
  const capabilities = getDeviceCapabilities();
  
  if (capabilities.isLowEnd || !capabilities.hasGoodConnection) {
    return 'low';
  }
  
  if (capabilities.isMobile) {
    return 'medium';
  }
  
  return 'high';
}
