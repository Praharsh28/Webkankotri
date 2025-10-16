/**
 * Kankotri Template Editor
 * 
 * Edit your Kankotri wedding template visually
 */

'use client';

import { Editor, Frame, Element } from '@craftjs/core';
import { Layers } from '@craftjs/layers';
import { TopBar } from '@/components/editor/TopBar';
import { Toolbox } from '@/components/editor/Toolbox';
import { SettingsPanel } from '@/components/editor/SettingsPanel';

// Import basic craft components
import { CraftText } from '@/components/craft-wrappers/basic/CraftText';
import { CraftImage } from '@/components/craft-wrappers/basic/CraftImage';
import { CraftVideo } from '@/components/craft-wrappers/basic/CraftVideo';
import { CraftContainer } from '@/components/craft-wrappers/basic/CraftContainer';

// Import Kankotri template
import { KankotriEnhanced } from '@/components/templates-v2/themes/KankotriTemplate/KankotriEnhanced';
import { exampleKankotri } from '@/lib/data/example-kankotri';

export default function KankotriEditorPage() {
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
        <TopBar templateId="kankotri-demo" />
        
        {/* Main editor area */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left sidebar - Toolbox */}
          <Toolbox />
          
          {/* Center - Kankotri Template Preview */}
          <div className="flex-1 overflow-auto bg-gray-100">
            <div className="bg-white">
              <Frame>
                <Element canvas is={CraftContainer} padding={0} background="#ffffff">
                  {/* Your Kankotri Template */}
                  <KankotriEnhanced data={exampleKankotri} />
                </Element>
              </Frame>
            </div>
          </div>
          
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
