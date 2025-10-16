/**
 * Element Selector - Development Tool
 * 
 * Visual element picker to communicate changes with AI
 * Like Chrome DevTools element selector
 * 
 * Usage: Press Ctrl+Shift+E to activate
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { Target, Copy, X, Eye } from 'lucide-react';

interface SelectedElement {
  element: HTMLElement;
  selector: string;
  classes: string[];
  text: string;
  tag: string;
  path: string;
}

export function ElementSelector() {
  const [isActive, setIsActive] = useState(false);
  const [selectedElement, setSelectedElement] = useState<SelectedElement | null>(null);
  const [hoveredElement, setHoveredElement] = useState<HTMLElement | null>(null);
  const [copied, setCopied] = useState(false);

  // Generate CSS selector for element
  const generateSelector = (element: HTMLElement): string => {
    if (element.id) return `#${element.id}`;
    
    const classes = Array.from(element.classList).join('.');
    const tag = element.tagName.toLowerCase();
    
    if (classes) return `${tag}.${classes}`;
    
    // Get nth-child if no ID or classes
    const parent = element.parentElement;
    if (parent) {
      const siblings = Array.from(parent.children);
      const index = siblings.indexOf(element) + 1;
      return `${tag}:nth-child(${index})`;
    }
    
    return tag;
  };

  // Generate full path to element
  const generatePath = (element: HTMLElement): string => {
    const path: string[] = [];
    let current: HTMLElement | null = element;
    
    while (current && current !== document.body) {
      path.unshift(generateSelector(current));
      current = current.parentElement;
    }
    
    return path.join(' > ');
  };

  // Handle element click
  const handleElementClick = useCallback((e: MouseEvent) => {
    if (!isActive) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    const target = e.target as HTMLElement;
    
    // Don't select the selector UI itself
    if (target.closest('[data-element-selector]')) return;
    
    const selector = generateSelector(target);
    const path = generatePath(target);
    
    setSelectedElement({
      element: target,
      selector,
      classes: Array.from(target.classList),
      text: target.textContent?.trim().slice(0, 100) || '',
      tag: target.tagName.toLowerCase(),
      path,
    });
  }, [isActive]);

  // Handle element hover
  const handleElementHover = useCallback((e: MouseEvent) => {
    if (!isActive) return;
    
    const target = e.target as HTMLElement;
    
    // Don't highlight the selector UI itself
    if (target.closest('[data-element-selector]')) {
      setHoveredElement(null);
      return;
    }
    
    setHoveredElement(target);
  }, [isActive]);

  // Toggle selector with keyboard shortcut (Ctrl+Shift+E)
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'E') {
        e.preventDefault();
        setIsActive(prev => !prev);
        setSelectedElement(null);
        setHoveredElement(null);
      }
      
      // Escape to deactivate
      if (e.key === 'Escape' && isActive) {
        setIsActive(false);
        setSelectedElement(null);
        setHoveredElement(null);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isActive]);

  // Add click and hover listeners
  useEffect(() => {
    if (isActive) {
      document.addEventListener('click', handleElementClick, true);
      document.addEventListener('mouseover', handleElementHover);
    }

    return () => {
      document.removeEventListener('click', handleElementClick, true);
      document.removeEventListener('mouseover', handleElementHover);
    };
  }, [isActive, handleElementClick, handleElementHover]);

  // Highlight hovered element
  useEffect(() => {
    if (!hoveredElement || !isActive) return;

    const originalOutline = hoveredElement.style.outline;
    const originalCursor = hoveredElement.style.cursor;
    
    hoveredElement.style.outline = '2px solid #3b82f6';
    hoveredElement.style.cursor = 'crosshair';

    return () => {
      hoveredElement.style.outline = originalOutline;
      hoveredElement.style.cursor = originalCursor;
    };
  }, [hoveredElement, isActive]);

  // Copy element info to clipboard
  const copyToClipboard = () => {
    if (!selectedElement) return;

    const info = `Element Info:
Tag: <${selectedElement.tag}>
Selector: ${selectedElement.selector}
Full Path: ${selectedElement.path}
Classes: ${selectedElement.classes.join(', ') || 'none'}
Text: ${selectedElement.text || 'none'}

Tell AI: "Change the ${selectedElement.tag} element at: ${selectedElement.path}"
`;

    navigator.clipboard.writeText(info).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (!isActive && !selectedElement) return null;

  return (
    <>
      {/* Activation Button */}
      <button
        data-element-selector
        onClick={() => setIsActive(!isActive)}
        className="fixed bottom-4 right-4 z-[9999] flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white shadow-lg hover:bg-blue-700 transition-colors"
        title="Toggle Element Selector (Ctrl+Shift+E)"
      >
        <Target className="h-5 w-5" />
        {isActive ? 'Selector Active' : 'Select Element'}
      </button>

      {/* Instructions Overlay */}
      {isActive && !selectedElement && (
        <div
          data-element-selector
          className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] bg-black/90 text-white px-6 py-3 rounded-lg shadow-xl"
        >
          <div className="flex items-center gap-3">
            <Eye className="h-5 w-5 text-blue-400" />
            <p className="text-sm">
              <strong>Element Selector Active</strong> - Click any element to select it
            </p>
            <button
              onClick={() => setIsActive(false)}
              className="ml-4 p-1 hover:bg-white/20 rounded"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-1">Press Escape to exit</p>
        </div>
      )}

      {/* Selected Element Info Panel */}
      {selectedElement && (
        <div
          data-element-selector
          className="fixed top-4 right-4 z-[9999] bg-white rounded-lg shadow-2xl border-2 border-blue-500 max-w-md"
        >
          <div className="bg-blue-600 text-white px-4 py-3 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              <h3 className="font-semibold">Selected Element</h3>
            </div>
            <button
              onClick={() => setSelectedElement(null)}
              className="p-1 hover:bg-blue-700 rounded"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
            {/* Tag */}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase">Tag</p>
              <code className="block mt-1 bg-gray-100 px-2 py-1 rounded text-sm">
                &lt;{selectedElement.tag}&gt;
              </code>
            </div>

            {/* Selector */}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase">CSS Selector</p>
              <code className="block mt-1 bg-gray-100 px-2 py-1 rounded text-sm break-all">
                {selectedElement.selector}
              </code>
            </div>

            {/* Full Path */}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase">Full Path</p>
              <code className="block mt-1 bg-gray-100 px-2 py-1 rounded text-xs break-all">
                {selectedElement.path}
              </code>
            </div>

            {/* Classes */}
            {selectedElement.classes.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase">Classes</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedElement.classes.map((cls, i) => (
                    <span
                      key={i}
                      className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded text-xs"
                    >
                      {cls}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Text Content */}
            {selectedElement.text && (
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase">Text Content</p>
                <p className="mt-1 bg-gray-100 px-2 py-1 rounded text-sm italic">
                  "{selectedElement.text}"
                </p>
              </div>
            )}

            {/* AI Prompt Suggestion */}
            <div className="border-t pt-3">
              <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
                Tell AI:
              </p>
              <div className="bg-green-50 border border-green-200 rounded p-3">
                <p className="text-sm text-gray-700">
                  "Change the <code className="bg-white px-1 rounded">{selectedElement.tag}</code> element:
                </p>
                <code className="block mt-2 text-xs text-gray-600 break-all">
                  {selectedElement.path}
                </code>
              </div>
            </div>

            {/* Copy Button */}
            <button
              onClick={copyToClipboard}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              <Copy className="h-4 w-4" />
              {copied ? 'Copied!' : 'Copy Element Info'}
            </button>
          </div>
        </div>
      )}

      {/* Keyboard Shortcut Hint */}
      <div
        data-element-selector
        className="fixed bottom-4 left-4 z-[9998] bg-black/80 text-white px-3 py-1 rounded text-xs"
      >
        <kbd className="bg-white/20 px-1.5 py-0.5 rounded">Ctrl</kbd> + 
        <kbd className="bg-white/20 px-1.5 py-0.5 rounded mx-1">Shift</kbd> + 
        <kbd className="bg-white/20 px-1.5 py-0.5 rounded">E</kbd>
        {' '}to toggle
      </div>
    </>
  );
}
