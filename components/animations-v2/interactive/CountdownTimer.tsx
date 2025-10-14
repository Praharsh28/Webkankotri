'use client';

import { useState, useEffect } from 'react';
import type { CountdownStyle } from '@/types/v2/animation';

/**
 * CountdownTimer Component
 * 
 * Displays countdown to wedding date with multiple style options.
 * Updates every second, handles past dates gracefully.
 * 
 * @example
 * ```tsx
 * <CountdownTimer
 *   targetDate={new Date('2025-06-15')}
 *   style="elegant"
 *   size="large"
 * />
 * ```
 */

export interface CountdownTimerProps {
  /** Target date to count down to */
  targetDate: Date;
  /** Visual style */
  style?: CountdownStyle;
  /** Size of timer */
  size?: 'small' | 'medium' | 'large';
  /** Custom labels */
  labels?: {
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
  };
  /** Show seconds? Default: true */
  showSeconds?: boolean;
  /** Callback when countdown reaches zero */
  onComplete?: () => void;
  /** Additional CSS classes */
  className?: string;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isComplete: boolean;
}

const DEFAULT_LABELS = {
  days: 'Days',
  hours: 'Hours',
  minutes: 'Minutes',
  seconds: 'Seconds',
};

/**
 * Calculate time remaining until target date
 */
function calculateTimeRemaining(targetDate: Date): TimeRemaining {
  const now = new Date().getTime();
  const target = targetDate.getTime();
  const difference = target - now;

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isComplete: true,
    };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((difference % (1000 * 60)) / 1000),
    isComplete: false,
  };
}

export function CountdownTimer({
  targetDate,
  style = 'elegant',
  size = 'medium',
  labels = DEFAULT_LABELS,
  showSeconds = true,
  onComplete,
  className = '',
}: CountdownTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>(
    calculateTimeRemaining(targetDate)
  );

  // Update countdown every second
  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = calculateTimeRemaining(targetDate);
      setTimeRemaining(remaining);

      if (remaining.isComplete && onComplete) {
        onComplete();
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate, onComplete]);

  // Size classes
  const sizeClasses = {
    small: {
      number: 'text-2xl md:text-3xl',
      label: 'text-xs md:text-sm',
      container: 'gap-2 md:gap-4',
    },
    medium: {
      number: 'text-4xl md:text-5xl',
      label: 'text-sm md:text-base',
      container: 'gap-4 md:gap-6',
    },
    large: {
      number: 'text-5xl md:text-7xl',
      label: 'text-base md:text-lg',
      container: 'gap-6 md:gap-8',
    },
  };

  // Style-specific rendering
  const renderTimeUnit = (value: number, label: string) => {
    const { number, label: labelClass } = sizeClasses[size];

    if (style === 'elegant') {
      return (
        <div className="flex flex-col items-center">
          <div className={`font-serif font-bold ${number} text-gray-900`}>
            {value.toString().padStart(2, '0')}
          </div>
          <div className={`mt-2 font-sans uppercase tracking-wider ${labelClass} text-gray-600`}>
            {label}
          </div>
        </div>
      );
    }

    if (style === 'modern') {
      return (
        <div className="flex flex-col items-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 p-4 text-white shadow-lg">
          <div className={`font-bold ${number}`}>
            {value.toString().padStart(2, '0')}
          </div>
          <div className={`mt-1 uppercase ${labelClass} opacity-90`}>
            {label}
          </div>
        </div>
      );
    }

    // Minimal style
    return (
      <div className="flex items-baseline gap-1">
        <div className={`font-bold ${number} text-gray-900`}>
          {value}
        </div>
        <div className={`${labelClass} text-gray-600`}>
          {label}
        </div>
      </div>
    );
  };

  if (timeRemaining.isComplete) {
    return (
      <div className={`text-center ${className}`}>
        <p className="text-2xl font-bold text-gray-900">
          🎉 The big day is here! 🎉
        </p>
      </div>
    );
  }

  return (
    <div className={`flex justify-center ${sizeClasses[size].container} ${className}`}>
      {renderTimeUnit(timeRemaining.days, labels.days)}
      {renderTimeUnit(timeRemaining.hours, labels.hours)}
      {renderTimeUnit(timeRemaining.minutes, labels.minutes)}
      {showSeconds && renderTimeUnit(timeRemaining.seconds, labels.seconds)}
    </div>
  );
}
