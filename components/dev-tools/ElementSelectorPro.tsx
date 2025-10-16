/**
 * Element Selector Pro - Using Professional Library
 * 
 * Based on @botanicastudios/element-selector
 * Enhanced with AI communication features
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { Target, Copy, X, Eye, Maximize2 } from 'lucide-react';

interface ElementInfo {
  tag: string;
  selector: string;
  xpath: string;
  classes: string[];
  attributes: { [key: string]: string };
  text: string;
  styles: {
    color: string;
    backgroundColor: string;
    fontSize: string;
    fontFamily: string;
    display: string;
    position: string;
  };
  dimensions: {
    width: number;
    height: number;
    top: number;
    left: number;
  };
}

export function ElementSelectorPro() {
  const [isActive, setIsActive] = useState(false);
  const [selectedInfo, setSelectedInfo] = useState<ElementInfo | null>(null);
  const [copied, setCopied] = useState(false);

  // Generate XPath for element
  const getXPath = (element: Element): string => {
    if (element.id) return `//*[@id="${element.id}"]`;
    
    const parts: string[] = [];
    let current: Element | null = element;
    
    while (current && current.nodeType === Node.ELEMENT_NODE) {
      let index = 0;
      let sibling: Element | null = current;
      
      while (sibling) {
        if (sibling.nodeType === Node.ELEMENT_NODE && sibling.tagName === current.tagName) {
          index++;
        }
        sibling = sibling.previousElementSibling;
      }
      
      const tagName = current.tagName.toLowerCase();
      const pathIndex = index > 1 ? `[${index}]` : '';
      parts.unshift(tagName + pathIndex);
      
      current = current.parentElement;
    }
    
    return '/' + parts.join('/');
  };

  // Generate CSS selector
  const getCssSelector = (element: Element): string => {
    if (element.id) return `#${element.id}`;
    
    const tag = element.tagName.toLowerCase();
    const classes = Array.from(element.classList)
      .filter(c => !c.startsWith('hover:') && !c.startsWith('md:') && !c.startsWith('lg:'))
      .join('.');
    
    if (classes) return `${tag}.${classes}`;
    
    // Use nth-of-type
    const parent = element.parentElement;
    if (parent) {
      const siblings = Array.from(parent.children).filter(
        child => child.tagName === element.tagName
      );
      const index = siblings.indexOf(element) + 1;
      if (siblings.length > 1) {
        return `${tag}:nth-of-type(${index})`;
      }
    }
    
    return tag;
  };

  // Extract element information
  const extractElementInfo = (element: Element): ElementInfo => {
    const computed = window.getComputedStyle(element as HTMLElement);
    const rect = element.getBoundingClientRect();
    
    const attrs: { [key: string]: string } = {};
    Array.from(element.attributes).forEach(attr => {
      attrs[attr.name] = attr.value;
    });
    
    return {
      tag: element.tagName.toLowerCase(),
      selector: getCssSelector(element),
      xpath: getXPath(element),
      classes: Array.from(element.classList),
      attributes: attrs,
      text: element.textContent?.trim().substring(0, 150) || '',
      styles: {
        color: computed.color,
        backgroundColor: computed.backgroundColor,
        fontSize: computed.fontSize,
        fontFamily: computed.fontFamily,
        display: computed.display,
        position: computed.position,
      },
      dimensions: {
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        top: Math.round(rect.top + window.scrollY),
        left: Math.round(rect.left + window.scrollX),
      },
    };
  };

  // Initialize element picker
  useEffect(() => {
    if (!isActive) return;

    let hoveredElement: Element | null = null;
    let overlay: HTMLDivElement | null = null;

    const createOverlay = () => {
      overlay = document.createElement('div');
      overlay.style.position = 'absolute';
      overlay.style.border = '2px solid #3b82f6';
      overlay.style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
      overlay.style.pointerEvents = 'none';
      overlay.style.zIndex = '9998';
      overlay.style.transition = 'all 0.1s ease';
      document.body.appendChild(overlay);
    };

    const updateOverlay = (element: Element) => {
      if (!overlay) return;
      
      const rect = element.getBoundingClientRect();
      overlay.style.width = `${rect.width}px`;
      overlay.style.height = `${rect.height}px`;
      overlay.style.top = `${rect.top + window.scrollY}px`;
      overlay.style.left = `${rect.left + window.scrollX}px`;
    };

    const removeOverlay = () => {
      if (overlay && overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
        overlay = null;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as Element;
      
      // Ignore our own UI elements
      if (target.closest('[data-element-selector-pro]')) return;
      
      if (target !== hoveredElement) {
        hoveredElement = target;
        
        if (!overlay) createOverlay();
        updateOverlay(target);
      }
    };

    const handleClick = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      
      const target = e.target as Element;
      
      // Ignore our own UI elements
      if (target.closest('[data-element-selector-pro]')) return;
      
      const info = extractElementInfo(target);
      setSelectedInfo(info);
      setIsActive(false);
      removeOverlay();
    };

    const handleScroll = () => {
      if (hoveredElement) {
        updateOverlay(hoveredElement);
      }
    };

    createOverlay();
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('click', handleClick, true);
    window.addEventListener('scroll', handleScroll);

    return () => {
      removeOverlay();
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleClick, true);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isActive]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Ctrl+Shift+E to toggle
      if (e.ctrlKey && e.shiftKey && e.key === 'E') {
        e.preventDefault();
        setIsActive(prev => !prev);
        if (isActive) setSelectedInfo(null);
      }
      
      // Escape to deactivate
      if (e.key === 'Escape') {
        setIsActive(false);
        setSelectedInfo(null);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isActive]);

  // Copy to clipboard
  const copyToClipboard = async () => {
    if (!selectedInfo) return;

    const info = `🎯 ELEMENT SELECTED FOR AI:

Tag: <${selectedInfo.tag}>
CSS Selector: ${selectedInfo.selector}
XPath: ${selectedInfo.xpath}

Classes: ${selectedInfo.classes.join(', ') || 'none'}
Text: "${selectedInfo.text || 'none'}"

Dimensions: ${selectedInfo.dimensions.width}px × ${selectedInfo.dimensions.height}px
Position: top ${selectedInfo.dimensions.top}px, left ${selectedInfo.dimensions.left}px

Styles:
- Color: ${selectedInfo.styles.color}
- Background: ${selectedInfo.styles.backgroundColor}
- Font: ${selectedInfo.styles.fontSize} ${selectedInfo.styles.fontFamily}
- Display: ${selectedInfo.styles.display}
- Position: ${selectedInfo.styles.position}

Attributes:
${Object.entries(selectedInfo.attributes).map(([k, v]) => `- ${k}="${v}"`).join('\n')}

✨ TELL AI:
"Change the <${selectedInfo.tag}> element with selector:
${selectedInfo.selector}

Make it: [describe your changes here]"
`;

    try {
      await navigator.clipboard.writeText(info);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
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
        alert('Copy failed. Please manually select and copy the text.');
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        data-element-selector-pro
        onClick={() => {
          setIsActive(!isActive);
          if (!isActive) setSelectedInfo(null);
        }}
        className={`fixed bottom-4 right-4 z-[9999] flex items-center gap-2 rounded-lg px-4 py-3 text-white shadow-2xl transition-all hover:scale-105 ${
          isActive ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'
        }`}
        title="Element Selector (Ctrl+Shift+E)"
      >
        <Target className={`h-5 w-5 ${isActive ? 'animate-pulse' : ''}`} />
        <span className="font-semibold">{isActive ? '🎯 Selecting...' : 'Select Element'}</span>
      </button>

      {/* Instructions */}
      {isActive && (
        <div
          data-element-selector-pro
          className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] bg-green-600 text-white px-6 py-3 rounded-lg shadow-2xl animate-bounce"
        >
          <div className="flex items-center gap-3">
            <Eye className="h-5 w-5" />
            <p className="text-sm font-semibold">
              🎯 Click ANY element to select it!
            </p>
            <button
              onClick={() => setIsActive(false)}
              className="ml-4 p-1 hover:bg-white/20 rounded transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <p className="text-xs mt-1 text-green-100">Press Escape to cancel</p>
        </div>
      )}

      {/* Element Info Panel */}
      {selectedInfo && (
        <div
          data-element-selector-pro
          className="fixed top-4 right-4 z-[9999] bg-white rounded-xl shadow-2xl border-2 border-blue-500 max-w-lg max-h-[90vh] overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              <h3 className="font-bold">Element Selected ✅</h3>
            </div>
            <button
              onClick={() => setSelectedInfo(null)}
              className="p-1 hover:bg-white/20 rounded transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content - Scrollable */}
          <div className="p-4 space-y-3 overflow-y-auto flex-1">
            {/* Tag */}
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase mb-1">HTML Tag</p>
              <code className="block bg-gradient-to-r from-purple-50 to-blue-50 px-3 py-2 rounded-lg text-base font-mono font-bold text-purple-700 border border-purple-200">
                &lt;{selectedInfo.tag}&gt;
              </code>
            </div>

            {/* CSS Selector */}
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase mb-1">CSS Selector</p>
              <code className="block bg-blue-50 px-3 py-2 rounded-lg text-sm font-mono break-all text-blue-900 border border-blue-200">
                {selectedInfo.selector}
              </code>
            </div>

            {/* XPath */}
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase mb-1">XPath</p>
              <code className="block bg-green-50 px-3 py-2 rounded-lg text-xs font-mono break-all text-green-900 border border-green-200">
                {selectedInfo.xpath}
              </code>
            </div>

            {/* Dimensions */}
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase mb-1">Dimensions</p>
              <div className="bg-orange-50 px-3 py-2 rounded-lg border border-orange-200 flex items-center gap-4">
                <Maximize2 className="h-4 w-4 text-orange-600" />
                <div className="flex gap-4 text-sm">
                  <span className="font-semibold text-orange-900">W: {selectedInfo.dimensions.width}px</span>
                  <span className="font-semibold text-orange-900">H: {selectedInfo.dimensions.height}px</span>
                </div>
              </div>
            </div>

            {/* Classes */}
            {selectedInfo.classes.length > 0 && (
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase mb-1">CSS Classes ({selectedInfo.classes.length})</p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedInfo.classes.map((cls, i) => (
                    <span
                      key={i}
                      className="bg-purple-100 text-purple-800 px-2.5 py-1 rounded-md text-xs font-mono font-semibold border border-purple-200"
                    >
                      {cls}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Text */}
            {selectedInfo.text && (
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase mb-1">Text Content</p>
                <p className="bg-gray-50 px-3 py-2 rounded-lg text-sm italic text-gray-700 border border-gray-200">
                  "{selectedInfo.text}"
                </p>
              </div>
            )}

            {/* Styles */}
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase mb-1">Computed Styles</p>
              <div className="bg-gray-50 px-3 py-2 rounded-lg border border-gray-200 space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded border-2 border-gray-300 shadow-sm" style={{ backgroundColor: selectedInfo.styles.color }} />
                  <span className="font-semibold text-gray-700">Color: {selectedInfo.styles.color}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded border-2 border-gray-300 shadow-sm" style={{ backgroundColor: selectedInfo.styles.backgroundColor }} />
                  <span className="font-semibold text-gray-700">BG: {selectedInfo.styles.backgroundColor}</span>
                </div>
                <div className="text-gray-700">
                  <strong>Font:</strong> {selectedInfo.styles.fontSize} {selectedInfo.styles.fontFamily.split(',')[0]}
                </div>
                <div className="text-gray-700">
                  <strong>Display:</strong> {selectedInfo.styles.display} | <strong>Position:</strong> {selectedInfo.styles.position}
                </div>
              </div>
            </div>

            {/* Attributes */}
            {Object.keys(selectedInfo.attributes).length > 0 && (
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase mb-1">HTML Attributes</p>
                <div className="bg-indigo-50 px-3 py-2 rounded-lg border border-indigo-200 max-h-40 overflow-y-auto text-xs space-y-1">
                  {Object.entries(selectedInfo.attributes).map(([key, value]) => (
                    <div key={key} className="text-indigo-900">
                      <strong className="text-indigo-700">{key}:</strong>{' '}
                      <span className="font-mono">"{value.length > 50 ? value.substring(0, 50) + '...' : value}"</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* AI Prompt */}
            <div className="border-t-2 border-gray-200 pt-3">
              <p className="text-xs font-bold text-green-600 uppercase mb-2">✨ Tell AI:</p>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-lg p-3 shadow-sm">
                <p className="text-sm text-gray-800 mb-2">
                  "Change the <code className="bg-white px-1.5 py-0.5 rounded font-mono text-green-700 font-bold">&lt;{selectedInfo.tag}&gt;</code> element:"
                </p>
                <code className="block mt-2 text-xs text-green-900 bg-white/60 px-2 py-1.5 rounded border border-green-200 font-mono">
                  {selectedInfo.selector}
                </code>
              </div>
            </div>
          </div>

          {/* Copy Button - Fixed at bottom */}
          <div className="p-4 bg-gray-50 border-t-2 border-gray-200">
            <button
              onClick={copyToClipboard}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl font-semibold"
            >
              <Copy className="h-5 w-5" />
              {copied ? '✅ Copied to Clipboard!' : 'Copy Element Info'}
            </button>
          </div>
        </div>
      )}

      {/* Keyboard Hint */}
      <div
        data-element-selector-pro
        className="fixed bottom-4 left-4 z-[9998] bg-black/90 text-white px-3 py-2 rounded-lg text-xs shadow-lg"
      >
        <div className="flex items-center gap-1">
          <kbd className="bg-white/20 px-2 py-1 rounded font-mono">Ctrl</kbd>
          <span>+</span>
          <kbd className="bg-white/20 px-2 py-1 rounded font-mono">Shift</kbd>
          <span>+</span>
          <kbd className="bg-white/20 px-2 py-1 rounded font-mono">E</kbd>
          <span className="ml-2 text-gray-300">Toggle Selector</span>
        </div>
      </div>
    </>
  );
}
