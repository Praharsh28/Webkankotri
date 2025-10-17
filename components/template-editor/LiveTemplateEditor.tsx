/**
 * Live Template Editor
 * 
 * Click any element → Edit → See changes instantly → Save template
 */

'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Save, Eye, EyeOff, Undo, Redo, Download } from 'lucide-react';
import { QuickEditPanel } from './QuickEditPanel';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';
import './editor-animations.css';

interface ElementChange {
  selector: string;
  type: 'text' | 'image' | 'container';
  text?: string;
  styles?: Record<string, string>;
  attributes?: Record<string, string>;
  animation?: string;
}

interface LiveTemplateEditorProps {
  templateId?: string;
  children: React.ReactNode;
}

export function LiveTemplateEditor({ templateId, children }: LiveTemplateEditorProps) {
  const [isEditMode, setIsEditMode] = useState(true);
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [selectedElementInfo, setSelectedElementInfo] = useState<any>(null);
  const [changes, setChanges] = useState<ElementChange[]>([]);
  const [history, setHistory] = useState<ElementChange[][]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isSaving, setIsSaving] = useState(false);
  const templateRef = useRef<HTMLDivElement>(null);
  
  // Element selector logic
  useEffect(() => {
    if (!isEditMode || !templateRef.current) return;
    
    let hoveredElement: Element | null = null;
    let overlay: HTMLDivElement | null = null;
    
    const createOverlay = () => {
      overlay = document.createElement('div');
      overlay.style.position = 'absolute';
      overlay.style.border = '2px solid #3b82f6';
      overlay.style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
      overlay.style.pointerEvents = 'none';
      overlay.style.zIndex = '9997';
      overlay.style.transition = 'all 0.1s ease';
      overlay.setAttribute('data-template-editor-overlay', 'true');
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
      
      // Ignore editor UI elements
      if (target.closest('[data-template-editor]') || target.closest('[data-template-editor-overlay]')) return;
      
      // Only elements inside template
      if (!templateRef.current?.contains(target)) return;
      
      if (target !== hoveredElement) {
        hoveredElement = target;
        if (!overlay) createOverlay();
        updateOverlay(target);
      }
    };
    
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Element;
      
      // Ignore editor UI
      if (target.closest('[data-template-editor]')) return;
      
      // Only elements inside template
      if (!templateRef.current?.contains(target)) return;
      
      e.preventDefault();
      e.stopPropagation();
      
      const info = extractElementInfo(target);
      setSelectedElement(target);
      setSelectedElementInfo(info);
      removeOverlay();
    };
    
    const handleScroll = () => {
      if (hoveredElement) updateOverlay(hoveredElement);
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
  }, [isEditMode]);
  
  // Extract element information
  const extractElementInfo = (element: Element) => {
    const computed = window.getComputedStyle(element as HTMLElement);
    const rect = element.getBoundingClientRect();
    
    const attrs: { [key: string]: string } = {};
    Array.from(element.attributes).forEach(attr => {
      attrs[attr.name] = attr.value;
    });
    
    const selector = getCssSelector(element);
    
    return {
      tag: element.tagName.toLowerCase(),
      selector,
      text: element.textContent?.trim() || '',
      styles: {
        color: computed.color,
        backgroundColor: computed.backgroundColor,
        fontSize: computed.fontSize,
        fontFamily: computed.fontFamily,
        fontWeight: computed.fontWeight,
        padding: computed.padding,
        margin: computed.margin,
        borderRadius: computed.borderRadius,
        borderWidth: computed.borderWidth,
        borderColor: computed.borderColor,
      },
      attributes: attrs,
      dimensions: {
        width: Math.round(rect.width),
        height: Math.round(rect.height),
      },
    };
  };
  
  // Generate unique CSS selector
  const getCssSelector = (element: Element): string => {
    // If has ID, use it
    if (element.id) return `#${element.id}`;
    
    // Try to build a unique path
    const tag = element.tagName.toLowerCase();
    const classes = Array.from(element.classList)
      .filter(c => 
        !c.startsWith('hover:') && 
        !c.startsWith('md:') && 
        !c.startsWith('lg:') &&
        !c.startsWith('sm:') &&
        !c.startsWith('xl:') &&
        !c.startsWith('dark:') &&
        !c.startsWith('group-') &&
        !c.startsWith('peer-')
      )
      .slice(0, 4); // Take first 4 non-responsive classes
    
    // Build selector with classes
    if (classes.length > 0) {
      const classSelector = `${tag}.${classes.join('.')}`;
      
      // Make it more specific by adding parent context
      const parent = element.parentElement;
      if (parent && parent.tagName !== 'BODY') {
        const parentTag = parent.tagName.toLowerCase();
        const parentClasses = Array.from(parent.classList)
          .filter(c => !c.startsWith('hover:') && !c.startsWith('md:'))
          .slice(0, 2)
          .join('.');
        
        if (parentClasses) {
          return `${parentTag}.${parentClasses} > ${classSelector}`;
        }
        return `${parentTag} > ${classSelector}`;
      }
      
      return classSelector;
    }
    
    // Fallback: Use nth-of-type
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
  
  // Apply changes to DOM with STRONG overrides
  const applyChange = useCallback((change: ElementChange) => {
    const elements = document.querySelectorAll(change.selector);
    
    elements.forEach((el) => {
      const htmlEl = el as HTMLElement;
      
      // Mark as edited
      htmlEl.setAttribute('data-template-edited', 'true');
      
      // Apply text
      if (change.text !== undefined && change.type === 'text') {
        // Clear existing text nodes
        htmlEl.textContent = change.text;
      }
      
      // Apply styles with !important for stronger override
      if (change.styles) {
        Object.entries(change.styles).forEach(([key, value]) => {
          // Use setProperty with !important to override everything
          htmlEl.style.setProperty(
            key.replace(/([A-Z])/g, '-$1').toLowerCase(),
            value,
            'important'
          );
        });
      }
      
      // Apply attributes
      if (change.attributes) {
        Object.entries(change.attributes).forEach(([key, value]) => {
          htmlEl.setAttribute(key, value);
        });
      }
      
      // Handle animations - CLEAR existing animations first!
      if (change.animation) {
        // Remove all existing animation classes and inline animations
        htmlEl.style.animation = 'none';
        
        // Force reflow to reset animation
        void htmlEl.offsetWidth;
        
        if (change.animation !== 'none') {
          // Apply new animation with !important
          htmlEl.style.setProperty('animation', `${change.animation} 0.6s ease-out forwards`, 'important');
          
          // Also add as CSS class for better control
          htmlEl.classList.add(`anim-${change.animation}`);
        }
      }
      
      // Disable framer-motion on this element if present
      if (htmlEl.hasAttribute('style') && htmlEl.style.transform) {
        // Keep transform but override animation
        const transform = htmlEl.style.transform;
        htmlEl.style.setProperty('animation', change.animation && change.animation !== 'none' ? `${change.animation} 0.6s ease-out forwards` : 'none', 'important');
      }
    });
  }, []);
  
  // Handle apply from QuickEditPanel
  const handleApplyChange = (change: ElementChange) => {
    applyChange(change);
    
    // Add to changes array
    const newChanges = [...changes];
    const existingIndex = newChanges.findIndex(c => c.selector === change.selector);
    
    if (existingIndex >= 0) {
      newChanges[existingIndex] = { ...newChanges[existingIndex], ...change };
    } else {
      newChanges.push(change);
    }
    
    setChanges(newChanges);
    
    // Add to history
    setHistory([...history.slice(0, historyIndex + 1), newChanges]);
    setHistoryIndex(historyIndex + 1);
    
    setSelectedElement(null);
    setSelectedElementInfo(null);
    toast.success('Changes applied!');
  };
  
  // Undo
  const handleUndo = () => {
    if (historyIndex > 0) {
      const prevChanges = history[historyIndex - 1];
      setChanges(prevChanges);
      setHistoryIndex(historyIndex - 1);
      
      // Reapply all changes
      prevChanges.forEach(applyChange);
      toast.success('Undone');
    }
  };
  
  // Redo
  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const nextChanges = history[historyIndex + 1];
      setChanges(nextChanges);
      setHistoryIndex(historyIndex + 1);
      
      // Reapply all changes
      nextChanges.forEach(applyChange);
      toast.success('Redone');
    }
  };
  
  // Save template
  const handleSave = async () => {
    setIsSaving(true);
    try {
      const supabase = createClient();
      
      const templateData = {
        id: templateId || Date.now().toString(),
        changes: JSON.stringify(changes),
        updated_at: new Date().toISOString(),
      };
      
      const { error } = await supabase
        .from('template_changes')
        .upsert(templateData as any);
      
      if (error) throw error;
      
      toast.success('Template saved!');
    } catch (error: any) {
      console.error('Save error:', error);
      toast.error('Failed to save template');
    } finally {
      setIsSaving(false);
    }
  };
  
  // Export JSON
  const handleExport = () => {
    const json = JSON.stringify(changes, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `template-changes-${templateId || 'new'}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Exported!');
  };
  
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Bar */}
      <div data-template-editor className="sticky top-0 z-[9998] bg-white border-b border-gray-200 shadow-sm">
        <div className="px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-bold text-gray-900">Template Editor</h1>
            <div className="flex items-center gap-2">
              <button
                onClick={handleUndo}
                disabled={historyIndex <= 0}
                className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Undo"
              >
                <Undo className="w-5 h-5" />
              </button>
              <button
                onClick={handleRedo}
                disabled={historyIndex >= history.length - 1}
                className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Redo"
              >
                <Redo className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {changes.length > 0 && (
              <span className="text-sm text-orange-600 font-medium">
                {changes.length} changes
              </span>
            )}
            
            <button
              onClick={() => setIsEditMode(!isEditMode)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isEditMode 
                  ? 'bg-green-600 text-white hover:bg-green-700' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {isEditMode ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              {isEditMode ? 'Edit Mode' : 'Preview'}
            </button>
            
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              title="Export JSON"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
            
            <button
              onClick={handleSave}
              disabled={isSaving || changes.length === 0}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Save className="w-4 h-4" />
              {isSaving ? 'Saving...' : 'Save Template'}
            </button>
          </div>
        </div>
      </div>
      
      {/* Edit mode indicator */}
      {isEditMode && (
        <div data-template-editor className="fixed top-20 left-1/2 -translate-x-1/2 z-[9998] bg-green-600 text-white px-6 py-3 rounded-lg shadow-2xl animate-bounce">
          <p className="text-sm font-semibold">
            🎯 Click any element to edit it!
          </p>
        </div>
      )}
      
      {/* Template Container */}
      <div 
        ref={templateRef} 
        className="relative"
        data-preview-mode={!isEditMode ? 'true' : undefined}
      >
        {children}
      </div>
      
      {/* Quick Edit Panel */}
      {selectedElement && selectedElementInfo && (
        <QuickEditPanel
          element={selectedElement}
          elementInfo={selectedElementInfo}
          onClose={() => {
            setSelectedElement(null);
            setSelectedElementInfo(null);
          }}
          onApply={handleApplyChange}
        />
      )}
    </div>
  );
}
