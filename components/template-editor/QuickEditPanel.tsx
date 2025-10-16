/**
 * Quick Edit Panel
 * 
 * Smart panel that adapts to selected element type:
 * - Text: Edit content, color, size, animation
 * - Image: Upload/URL, size, effects, animation
 * - Container: Background, padding, border, shadow
 */

'use client';

import { useState, useEffect } from 'react';
import { X, Type, Image as ImageIcon, Box, Palette, Move, Sparkles } from 'lucide-react';
import { ImageUploadField } from './fields/ImageUploadField';

interface ElementInfo {
  tag: string;
  selector: string;
  text: string;
  styles: {
    color: string;
    backgroundColor: string;
    fontSize: string;
    fontFamily: string;
    fontWeight: string;
    padding: string;
    margin: string;
    borderRadius: string;
    borderWidth: string;
    borderColor: string;
  };
  attributes: { [key: string]: string };
  dimensions: {
    width: number;
    height: number;
  };
}

interface QuickEditPanelProps {
  element: Element;
  elementInfo: ElementInfo;
  onClose: () => void;
  onApply: (changes: any) => void;
}

type ElementType = 'text' | 'image' | 'container' | 'unknown';

export function QuickEditPanel({ element, elementInfo, onClose, onApply }: QuickEditPanelProps) {
  const [elementType, setElementType] = useState<ElementType>('unknown');
  
  // Form state
  const [textContent, setTextContent] = useState(elementInfo.text);
  const [textColor, setTextColor] = useState(elementInfo.styles.color);
  const [fontSize, setFontSize] = useState(parseInt(elementInfo.styles.fontSize) || 16);
  const [fontWeight, setFontWeight] = useState(elementInfo.styles.fontWeight || 'normal');
  const [backgroundColor, setBackgroundColor] = useState(elementInfo.styles.backgroundColor);
  const [imageSrc, setImageSrc] = useState(elementInfo.attributes.src || '');
  const [imageAlt, setImageAlt] = useState(elementInfo.attributes.alt || '');
  const [borderRadius, setBorderRadius] = useState(parseInt(elementInfo.styles.borderRadius) || 0);
  const [padding, setPadding] = useState(parseInt(elementInfo.styles.padding) || 0);
  const [animation, setAnimation] = useState('none');
  
  // Determine element type
  useEffect(() => {
    const tag = elementInfo.tag.toLowerCase();
    
    if (tag === 'img') {
      setElementType('image');
    } else if (tag === 'h1' || tag === 'h2' || tag === 'h3' || tag === 'h4' || tag === 'h5' || tag === 'h6' || tag === 'p' || tag === 'span' || tag === 'a' || tag === 'button') {
      setElementType('text');
    } else if (tag === 'div' || tag === 'section' || tag === 'article' || tag === 'main' || tag === 'aside') {
      setElementType('container');
    } else {
      setElementType('unknown');
    }
  }, [elementInfo]);
  
  const handleApply = () => {
    const changes: any = {
      selector: elementInfo.selector,
      type: elementType,
    };
    
    if (elementType === 'text') {
      changes.text = textContent;
      changes.styles = {
        color: textColor,
        fontSize: `${fontSize}px`,
        fontWeight,
      };
    } else if (elementType === 'image') {
      changes.attributes = {
        src: imageSrc,
        alt: imageAlt,
      };
      changes.styles = {
        borderRadius: `${borderRadius}px`,
        width: elementInfo.dimensions.width ? `${elementInfo.dimensions.width}px` : 'auto',
      };
    } else if (elementType === 'container') {
      changes.styles = {
        backgroundColor,
        padding: `${padding}px`,
        borderRadius: `${borderRadius}px`,
      };
    }
    
    if (animation !== 'none') {
      changes.animation = animation;
    }
    
    onApply(changes);
  };
  
  return (
    <div className="fixed top-20 right-4 z-[9999] bg-white rounded-xl shadow-2xl border-2 border-blue-500 w-96 max-h-[calc(100vh-120px)] overflow-hidden flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {elementType === 'text' && <Type className="h-5 w-5" />}
          {elementType === 'image' && <ImageIcon className="h-5 w-5" />}
          {elementType === 'container' && <Box className="h-5 w-5" />}
          <h3 className="font-bold">
            {elementType === 'text' && '📝 Edit Text'}
            {elementType === 'image' && '🖼️ Edit Image'}
            {elementType === 'container' && '📦 Edit Container'}
            {elementType === 'unknown' && '✏️ Edit Element'}
          </h3>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-white/20 rounded transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      
      {/* Content - Scrollable */}
      <div className="p-4 space-y-4 overflow-y-auto flex-1">
        {/* Element info */}
        <div className="bg-gray-50 px-3 py-2 rounded-lg border border-gray-200">
          <p className="text-xs text-gray-600">
            <strong>Element:</strong> <code className="bg-white px-1.5 py-0.5 rounded">&lt;{elementInfo.tag}&gt;</code>
          </p>
          <p className="text-xs text-gray-600 mt-1">
            <strong>Selector:</strong> <code className="bg-white px-1.5 py-0.5 rounded text-xs">{elementInfo.selector}</code>
          </p>
        </div>
        
        {/* TEXT EDITING */}
        {elementType === 'text' && (
          <>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Text Content
              </label>
              <textarea
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                placeholder="Enter text..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Palette className="h-4 w-4" />
                Text Color
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="w-16 h-10 border-2 border-gray-300 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="flex-1 px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="#000000"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Font Size: {fontSize}px
              </label>
              <input
                type="range"
                min="12"
                max="72"
                value={fontSize}
                onChange={(e) => setFontSize(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Font Weight
              </label>
              <select
                value={fontWeight}
                onChange={(e) => setFontWeight(e.target.value)}
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option value="normal">Normal</option>
                <option value="500">Medium</option>
                <option value="600">Semi Bold</option>
                <option value="bold">Bold</option>
              </select>
            </div>
          </>
        )}
        
        {/* IMAGE EDITING */}
        {elementType === 'image' && (
          <>
            <ImageUploadField
              value={imageSrc}
              onChange={setImageSrc}
            />
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Alt Text
              </label>
              <input
                type="text"
                value={imageAlt}
                onChange={(e) => setImageAlt(e.target.value)}
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="Describe the image"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Border Radius: {borderRadius}px
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={borderRadius}
                onChange={(e) => setBorderRadius(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </>
        )}
        
        {/* CONTAINER EDITING */}
        {elementType === 'container' && (
          <>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Palette className="h-4 w-4" />
                Background Color
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  className="w-16 h-10 border-2 border-gray-300 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  className="flex-1 px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="#ffffff"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Padding: {padding}px
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={padding}
                onChange={(e) => setPadding(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Border Radius: {borderRadius}px
              </label>
              <input
                type="range"
                min="0"
                max="50"
                value={borderRadius}
                onChange={(e) => setBorderRadius(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </>
        )}
        
        {/* ANIMATION (for all types) */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            Animation
          </label>
          <select
            value={animation}
            onChange={(e) => setAnimation(e.target.value)}
            className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            <option value="none">None</option>
            <option value="fadeIn">Fade In</option>
            <option value="slideUp">Slide Up</option>
            <option value="slideDown">Slide Down</option>
            <option value="slideLeft">Slide Left</option>
            <option value="slideRight">Slide Right</option>
            <option value="zoomIn">Zoom In</option>
            <option value="zoomOut">Zoom Out</option>
          </select>
        </div>
      </div>
      
      {/* Footer - Action Buttons */}
      <div className="p-4 bg-gray-50 border-t-2 border-gray-200 flex gap-2">
        <button
          onClick={handleApply}
          className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl font-semibold"
        >
          <Move className="h-5 w-5" />
          Apply Changes
        </button>
        <button
          onClick={onClose}
          className="px-4 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
