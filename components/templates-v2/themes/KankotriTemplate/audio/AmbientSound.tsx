/**
 * Ambient Sound System
 * 
 * Subtle background music using Web Audio API
 * No external files - synthesized sounds
 */

'use client';

import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export function AmbientSound() {
  const [isMuted, setIsMuted] = useState(true); // Start muted
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const gainNodeRef = useRef<GainNode | null>(null);

  useEffect(() => {
    // Initialize Web Audio API
    if (typeof window !== 'undefined' && !audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      gainNodeRef.current = audioContextRef.current.createGain();
      gainNodeRef.current.connect(audioContextRef.current.destination);
      gainNodeRef.current.gain.value = 0; // Start at 0
    }

    return () => {
      // Cleanup
      oscillatorsRef.current.forEach(osc => {
        try {
          osc.stop();
        } catch (e) {
          // Already stopped
        }
      });
      if (audioContextRef.current?.state !== 'closed') {
        audioContextRef.current?.close();
      }
    };
  }, []);

  const startAmbientSound = () => {
    if (!audioContextRef.current || !gainNodeRef.current) return;

    // Create ambient drone (Tanpura-like sound)
    const createDrone = (frequency: number, detune: number = 0) => {
      const oscillator = audioContextRef.current!.createOscillator();
      const gainNode = audioContextRef.current!.createGain();

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(frequency, audioContextRef.current!.currentTime);
      oscillator.detune.setValueAtTime(detune, audioContextRef.current!.currentTime);

      gainNode.gain.setValueAtTime(0, audioContextRef.current!.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.03, audioContextRef.current!.currentTime + 2);

      oscillator.connect(gainNode);
      gainNode.connect(gainNodeRef.current!);

      oscillator.start();
      oscillatorsRef.current.push(oscillator);

      return oscillator;
    };

    // Indian classical base notes (Sa Pa Sa)
    createDrone(261.63, 0);    // C (Sa)
    createDrone(392.00, 0);    // G (Pa)
    createDrone(523.25, 0);    // C (Sa high)
    createDrone(261.63, -10);  // Slight detune for richness

    // Fade in
    gainNodeRef.current.gain.linearRampToValueAtTime(
      0.15,
      audioContextRef.current.currentTime + 3
    );
  };

  const stopAmbientSound = () => {
    if (!gainNodeRef.current || !audioContextRef.current) return;

    // Fade out
    gainNodeRef.current.gain.linearRampToValueAtTime(
      0,
      audioContextRef.current.currentTime + 1
    );

    setTimeout(() => {
      oscillatorsRef.current.forEach(osc => {
        try {
          osc.stop();
        } catch (e) {
          // Already stopped
        }
      });
      oscillatorsRef.current = [];
    }, 1000);
  };

  const toggleMute = () => {
    if (isMuted) {
      startAmbientSound();
    } else {
      stopAmbientSound();
    }
    setIsMuted(!isMuted);
  };

  return (
    <button
      onClick={toggleMute}
      className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#2d5016] text-white shadow-lg transition-all hover:scale-110 hover:bg-[#1b4d3e]"
      aria-label={isMuted ? 'Unmute ambient sound' : 'Mute ambient sound'}
      title={isMuted ? 'Play ambient music' : 'Mute music'}
    >
      {isMuted ? (
        <VolumeX className="h-5 w-5" />
      ) : (
        <Volume2 className="h-5 w-5" />
      )}
    </button>
  );
}

// Bell sound for interactions
export function useBellSound() {
  const playBell = () => {
    if (typeof window === 'undefined') return;

    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Bell-like sound (fundamental + harmonics)
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);

    // Quick attack, longer decay
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  };

  return playBell;
}
