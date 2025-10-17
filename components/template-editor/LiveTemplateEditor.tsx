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
  elementId: string; // Unique ID for the element
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
      
      // Mark element with unique ID
      const elementId = getElementId(target);
      
      const info = extractElementInfo(target);
      setSelectedElement(target);
      setSelectedElementInfo({ ...info, elementId });
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
    
    return {
      tag: element.tagName.toLowerCase(),
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
  
  // Generate unique ID for element
  const generateElementId = (): string => {
    return `elem-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };
  
  // Get or create unique ID for element
  const getElementId = (element: Element): string => {
    const htmlEl = element as HTMLElement;
    
    // Check if already has our ID
    let elementId = htmlEl.getAttribute('data-element-id');
    
    if (!elementId) {
      // Generate and assign new ID
      elementId = generateElementId();
      htmlEl.setAttribute('data-element-id', elementId);
    }
    
    return elementId;
  };
  
  // Apply changes to DOM using unique element ID
  const applyChange = useCallback((change: ElementChange) => {
    // Find element by unique ID
    const element = document.querySelector(`[data-element-id="${change.elementId}"]`);
    
    if (!element) {
      console.warn('Element not found:', change.elementId);
      return;
    }
    
    const htmlEl = element as HTMLElement;
    
    // Mark as edited
    htmlEl.setAttribute('data-template-edited', 'true');
    
    // Apply text
    if (change.text !== undefined && change.type === 'text') {
      htmlEl.textContent = change.text;
    }
    
    // Apply styles with !important
    if (change.styles) {
      Object.entries(change.styles).forEach(([key, value]) => {
        // Convert camelCase to kebab-case
        const cssProperty = key.replace(/([A-Z])/g, '-$1').toLowerCase();
        htmlEl.style.setProperty(cssProperty, value, 'important');
      });
    }
    
    // Apply attributes
    if (change.attributes) {
      Object.entries(change.attributes).forEach(([key, value]) => {
        htmlEl.setAttribute(key, value);
      });
    }
    
    // Handle animations
    if (change.animation !== undefined) {
      // Remove existing animation classes
      htmlEl.className = htmlEl.className.replace(/anim-\w+/g, '').trim();
      
      // Clear inline animation
      htmlEl.style.animation = 'none';
      void htmlEl.offsetWidth; // Force reflow
      
      if (change.animation !== 'none') {
        htmlEl.style.setProperty('animation', `${change.animation} 0.6s ease-out forwards`, 'important');
        htmlEl.classList.add(`anim-${change.animation}`);
      }
    }
  }, []);
  
  // Handle apply from QuickEditPanel
  const handleApplyChange = (change: ElementChange) => {
    applyChange(change);
    
    // Add to changes array
    const newChanges = [...changes];
    const existingIndex = newChanges.findIndex(c => c.elementId === change.elementId);
    
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
