/**
 * Editor Layout - Main Craft.js Editor Container
 */

'use client';

import { Editor, Frame, Element } from '@craftjs/core';
import { Layers } from '@craftjs/layers';
import { Toolbox } from './Toolbox';
import { SettingsPanel } from './SettingsPanel';
import { TopBar } from './TopBar';
import { Viewport } from './Viewport';

// Import all Craft-wrapped components
import { CraftText } from '../craft-wrappers/basic/CraftText';
import { CraftImage } from '../craft-wrappers/basic/CraftImage';
import { CraftVideo } from '../craft-wrappers/basic/CraftVideo';
import { CraftContainer } from '../craft-wrappers/basic/CraftContainer';

interface EditorLayoutProps {
  templateId: string;
}

export function EditorLayout({ templateId }: EditorLayoutProps) {
  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Editor
        resolver={{
          CraftText,
          CraftImage,
          CraftVideo,
          CraftContainer,
        }}
      >
        {/* Top toolbar */}
        <TopBar templateId={templateId} />
        
        {/* Main editor area */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left sidebar - Toolbox */}
          <Toolbox />
          
          {/* Center - Canvas */}
          <Viewport templateId={templateId} />
          
          {/* Right sidebar - Settings & Layers */}
          <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
            <div className="flex-1 overflow-y-auto">
              <SettingsPanel />
            </div>
            <div className="h-64 border-t border-gray-200 overflow-y-auto">
              <Layers />
            </div>
          </div>
        </div>
      </Editor>
    </div>
  );
}
