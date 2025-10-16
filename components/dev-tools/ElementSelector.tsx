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
  attributes: { [key: string]: string };
  computedStyles: {
    color: string;
    backgroundColor: string;
    fontSize: string;
    fontFamily: string;
  };
  dimensions: {
    width: number;
    height: number;
  };
}

export function ElementSelector() {
  const [isActive, setIsActive] = useState(false);
  const [selectedElement, setSelectedElement] = useState<SelectedElement | null>(null);
  const [hoveredElement, setHoveredElement] = useState<HTMLElement | null>(null);
  const [copied, setCopied] = useState(false);

  // Generate CSS selector for element - ENHANCED!
  const generateSelector = (element: HTMLElement): string => {
    // Priority 1: ID (most specific)
    if (element.id) return `#${element.id}`;
    
    const tag = element.tagName.toLowerCase();
    const classes = Array.from(element.classList).filter(c => !c.startsWith('hover:') && !c.startsWith('md:'));
    
    // Priority 2: Unique class combination
    if (classes.length > 0) {
      const classSelector = classes.join('.');
      return `${tag}.${classSelector}`;
    }
    
    // Priority 3: Attributes (for inputs, buttons, etc.)
    const name = element.getAttribute('name');
    if (name) return `${tag}[name="${name}"]`;
    
    const type = element.getAttribute('type');
    if (type) return `${tag}[type="${type}"]`;
    
    const role = element.getAttribute('role');
    if (role) return `${tag}[role="${role}"]`;
    
    // Priority 4: Data attributes
    const dataAttrs = Array.from(element.attributes).filter(attr => attr.name.startsWith('data-'));
    if (dataAttrs.length > 0) {
      return `${tag}[${dataAttrs[0].name}="${dataAttrs[0].value}"]`;
    }
    
    // Priority 5: nth-child with parent context
    const parent = element.parentElement;
    if (parent) {
      const siblings = Array.from(parent.children);
      const index = siblings.indexOf(element) + 1;
      const sameTagSiblings = siblings.filter(s => s.tagName === element.tagName);
      
      if (sameTagSiblings.length > 1) {
        const tagIndex = sameTagSiblings.indexOf(element) + 1;
        return `${tag}:nth-of-type(${tagIndex})`;
      }
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

  // Handle element click - ENHANCED!
  const handleElementClick = useCallback((e: MouseEvent) => {
    if (!isActive) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    const target = e.target as HTMLElement;
    
    // Don't select the selector UI itself
    if (target.closest('[data-element-selector]')) return;
    
    const selector = generateSelector(target);
    const path = generatePath(target);
    
    // Get computed styles
    const computed = window.getComputedStyle(target);
    
    // Get all attributes
    const attrs: { [key: string]: string } = {};
    Array.from(target.attributes).forEach(attr => {
      attrs[attr.name] = attr.value;
    });
    
    // Get dimensions
    const rect = target.getBoundingClientRect();
    
    setSelectedElement({
      element: target,
      selector,
      classes: Array.from(target.classList),
      text: target.textContent?.trim().slice(0, 100) || '',
      tag: target.tagName.toLowerCase(),
      path,
      attributes: attrs,
      computedStyles: {
        color: computed.color,
        backgroundColor: computed.backgroundColor,
        fontSize: computed.fontSize,
        fontFamily: computed.fontFamily,
      },
      dimensions: {
        width: Math.round(rect.width),
        height: Math.round(rect.height),
      },
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

  // Copy element info to clipboard - FIXED!
  const copyToClipboard = async () => {
    if (!selectedElement) return;

    const info = `🎯 ELEMENT INFO (Selected for AI):

Tag: <${selectedElement.tag}>
CSS Selector: ${selectedElement.selector}
Full Path: ${selectedElement.path}

Classes: ${selectedElement.classes.join(', ') || 'none'}
Text Content: ${selectedElement.text || 'none'}

Dimensions: ${selectedElement.dimensions.width}px × ${selectedElement.dimensions.height}px

Computed Styles:
- Color: ${selectedElement.computedStyles.color}
- Background: ${selectedElement.computedStyles.backgroundColor}
- Font Size: ${selectedElement.computedStyles.fontSize}
- Font Family: ${selectedElement.computedStyles.fontFamily}

Attributes: ${Object.keys(selectedElement.attributes).length > 0 ? 
  Object.entries(selectedElement.attributes).map(([k, v]) => `${k}="${v}"`).join(', ') : 
  'none'}

✨ TELL AI:
"Change the ${selectedElement.tag} element at:
${selectedElement.path}

And make it: [describe your changes here]"
`;

    try {
      // Try modern clipboard API first
      await navigator.clipboard.writeText(info);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback to older method
      const textArea = document.createElement('textarea');
      textArea.value = info;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err2) {
        console.error('Copy failed:', err2);
        alert('Copy failed. Please manually select and copy the text.');
      }
      document.body.removeChild(textArea);
    }
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

            {/* Dimensions */}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase">Dimensions</p>
              <div className="mt-1 bg-gray-100 px-2 py-1 rounded text-sm flex gap-4">
                <span><strong>W:</strong> {selectedElement.dimensions.width}px</span>
                <span><strong>H:</strong> {selectedElement.dimensions.height}px</span>
              </div>
            </div>

            {/* Computed Styles */}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase">Computed Styles</p>
              <div className="mt-1 bg-gray-100 px-2 py-1 rounded text-xs space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded border" style={{ backgroundColor: selectedElement.computedStyles.color }} />
                  <span className="text-gray-600">Color: {selectedElement.computedStyles.color}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded border" style={{ backgroundColor: selectedElement.computedStyles.backgroundColor }} />
                  <span className="text-gray-600">BG: {selectedElement.computedStyles.backgroundColor}</span>
                </div>
                <div className="text-gray-600">Font: {selectedElement.computedStyles.fontSize}</div>
              </div>
            </div>

            {/* Attributes */}
            {Object.keys(selectedElement.attributes).length > 0 && (
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase">Attributes</p>
                <div className="mt-1 bg-gray-100 px-2 py-1 rounded text-xs max-h-32 overflow-y-auto">
                  {Object.entries(selectedElement.attributes).map(([key, value]) => (
                    <div key={key} className="text-gray-600 mb-1">
                      <strong>{key}:</strong> "{value.length > 40 ? value.substring(0, 40) + '...' : value}"
                    </div>
                  ))}
                </div>
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
