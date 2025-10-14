/**
 * Accessibility Utilities
 * 
 * Skip links, keyboard navigation, ARIA helpers
 */

'use client';

import { useEffect } from 'react';

// Skip to main content link
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-[#2d5016] focus:px-6 focus:py-3 focus:text-white focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
    >
      Skip to main content
    </a>
  );
}

// Keyboard navigation helper
export function useKeyboardNavigation() {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // ESC to close modals/menus
      if (e.key === 'Escape') {
        document.dispatchEvent(new CustomEvent('closeAll'));
      }

      // Tab trap for modals (implement per modal)
      // Focus management handled by individual components
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);
}

// Announce to screen readers
export function announce(message: string, priority: 'polite' | 'assertive' = 'polite') {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

// Focus trap component
export function FocusTrap({ children, active }: { children: React.ReactNode; active: boolean }) {
  useEffect(() => {
    if (!active) return;

    const focusableElements = document.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('keydown', handleTab);
    firstElement?.focus();

    return () => document.removeEventListener('keydown', handleTab);
  }, [active]);

  return <>{children}</>;
}

// Visually hidden but accessible to screen readers
export function VisuallyHidden({ children }: { children: React.ReactNode }) {
  return (
    <span className="sr-only">
      {children}
    </span>
  );
}
