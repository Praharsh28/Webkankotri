'use client';

import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';
import type { AudioControls, CornerPosition } from '@/types/v2/animation';

/**
 * AudioPlayer Component
 * 
 * Background music player with controls.
 * Starts muted by default (best practice for autoplay).
 * 
 * @example
 * ```tsx
 * <AudioPlayer 
 *   src="/music/wedding-theme.mp3"
 *   volume={0.3}
 *   loop
 *   controls="minimal"
 *   position="bottom-right"
 * />
 * ```
 * 
 * Features:
 * - Starts muted (user must unmute)
 * - Volume control
 * - Play/pause
 * - Loop support
 * - Respects user's autoplay preferences
 * 
 * Best Practices:
 * - Always start muted (autoplay policy)
 * - Keep volume low (0.2-0.4)
 * - Provide clear visual indication
 * - Allow easy mute/unmute
 */

export interface AudioPlayerProps {
  /** Audio source URL */
  src: string;
  /** Should audio loop? Default: true */
  loop?: boolean;
  /** Initial volume (0-1). Default: 0.3 */
  volume?: number;
  /** Should autoplay? (will be muted initially) */
  autoPlay?: boolean;
  /** Control style */
  controls?: AudioControls;
  /** Position of player */
  position?: CornerPosition;
  /** Callback when audio fails to load */
  onError?: () => void;
  /** Additional CSS classes */
  className?: string;
}

export function AudioPlayer({
  src,
  loop = true,
  volume = 0.3,
  autoPlay = false,
  controls = 'minimal',
  position = 'bottom-right',
  onError,
  className = '',
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // Start muted (autoplay policy)
  const [currentVolume, setCurrentVolume] = useState(volume);
  const [hasError, setHasError] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Position classes
  const positionClasses: Record<CornerPosition, string> = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4',
  };

  // Initialize audio
  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.volume = currentVolume;
    
    if (autoPlay) {
      // Try to autoplay muted (browser policy)
      audioRef.current.play().catch(() => {
        // Autoplay failed, that's okay
        setIsPlaying(false);
      });
      setIsPlaying(true);
    }
  }, []);

  // Update volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = currentVolume;
    }
  }, [currentVolume]);

  // Toggle play/pause
  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch((error) => {
        console.error('Audio playback failed:', error);
        setHasError(true);
        onError?.();
      });
      setIsPlaying(true);
    }
  };

  // Toggle mute
  const toggleMute = () => {
    if (!audioRef.current) return;
    
    const newMutedState = !isMuted;
    audioRef.current.muted = newMutedState;
    setIsMuted(newMutedState);

    // If unmuting and not playing, start playing
    if (!newMutedState && !isPlaying) {
      audioRef.current.play().catch(() => {
        setHasError(true);
        onError?.();
      });
      setIsPlaying(true);
    }
  };

  // Handle audio errors
  const handleError = () => {
    setHasError(true);
    setIsPlaying(false);
    onError?.();
  };

  // Don't render if controls are set to none or if there's an error
  if (controls === 'none' || hasError) {
    return (
      <>
        <audio
          ref={audioRef}
          src={src}
          loop={loop}
          muted={isMuted}
          onError={handleError}
          className="hidden"
        />
      </>
    );
  }

  return (
    <>
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={src}
        loop={loop}
        muted={isMuted}
        onError={handleError}
        className="hidden"
      />

      {/* Controls UI */}
      <div
        className={`fixed z-50 ${positionClasses[position]} ${className}`}
      >
        {controls === 'minimal' ? (
          /* Minimal Controls: Just mute/unmute button */
          <button
            onClick={toggleMute}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:scale-110"
            aria-label={isMuted ? 'Unmute music' : 'Mute music'}
            title={isMuted ? 'Unmute background music' : 'Mute background music'}
          >
            {isMuted ? (
              <VolumeX className="h-5 w-5 text-gray-700" />
            ) : (
              <Volume2 className="h-5 w-5 text-gray-700" />
            )}
          </button>
        ) : (
          /* Full Controls: Play/pause and mute/unmute */
          <div className="flex items-center gap-2 rounded-full bg-white/90 p-2 shadow-lg backdrop-blur-sm">
            <button
              onClick={togglePlay}
              className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-gray-100"
              aria-label={isPlaying ? 'Pause music' : 'Play music'}
            >
              {isPlaying ? (
                <Pause className="h-4 w-4 text-gray-700" />
              ) : (
                <Play className="h-4 w-4 text-gray-700" />
              )}
            </button>

            <button
              onClick={toggleMute}
              className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-gray-100"
              aria-label={isMuted ? 'Unmute music' : 'Mute music'}
            >
              {isMuted ? (
                <VolumeX className="h-4 w-4 text-gray-700" />
              ) : (
                <Volume2 className="h-4 w-4 text-gray-700" />
              )}
            </button>

            {/* Volume slider */}
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={currentVolume}
              onChange={(e) => setCurrentVolume(parseFloat(e.target.value))}
              className="h-1 w-20 cursor-pointer appearance-none rounded-full bg-gray-300"
              aria-label="Volume"
            />
          </div>
        )}
      </div>
    </>
  );
}
