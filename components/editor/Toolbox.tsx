/**
 * Toolbox - Drag-and-drop component library
 */

'use client';

import { useEditor } from '@craftjs/core';
import { Type, Image, Video, Box } from 'lucide-react';
import { CraftText } from '../craft-wrappers/basic/CraftText';
import { CraftImage } from '../craft-wrappers/basic/CraftImage';
import { CraftVideo } from '../craft-wrappers/basic/CraftVideo';
import { CraftContainer } from '../craft-wrappers/basic/CraftContainer';

export function Toolbox() {
  const { connectors } = useEditor();

  return (
    <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Components</h2>
        
        {/* Basic Elements */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Basic Elements
          </p>
          
          {/* Text */}
          <div
            ref={(ref: HTMLDivElement | null) => {
              if (ref) connectors.create(ref, <CraftText text="New Text" />);
            }}
            className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-move hover:bg-gray-100 transition-colors"
          >
            <Type className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-900">Text</span>
          </div>

          {/* Image */}
          <div
            ref={(ref: HTMLDivElement | null) => {
              if (ref) connectors.create(ref, <CraftImage src="/placeholder.jpg" />);
            }}
            className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-move hover:bg-gray-100 transition-colors"
          >
            <Image className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-900">Image</span>
          </div>

          {/* Video */}
          <div
            ref={(ref: HTMLDivElement | null) => {
              if (ref) connectors.create(ref, <CraftVideo url="" />);
            }}
            className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-move hover:bg-gray-100 transition-colors"
          >
            <Video className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-900">Video</span>
          </div>

          {/* Container */}
          <div
            ref={(ref: HTMLDivElement | null) => {
              if (ref) connectors.create(ref, <CraftContainer />);
            }}
            className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-move hover:bg-gray-100 transition-colors"
          >
            <Box className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-900">Container</span>
          </div>
        </div>

        {/* Template Components - Will add as we create wrappers */}
        <div className="mt-6 space-y-2">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Template Sections
          </p>
          <p className="text-xs text-gray-400">Drag components from above to start</p>
        </div>
      </div>
    </div>
  );
}
