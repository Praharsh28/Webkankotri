/**
 * Viewport - Canvas area where template is edited
 */

'use client';

import { useEditor, Frame, Element } from '@craftjs/core';
import { CraftContainer } from '../craft-wrappers/basic/CraftContainer';

interface ViewportProps {
  templateId: string;
}

export function Viewport({ templateId }: ViewportProps) {
  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return (
    <div className="flex-1 overflow-auto bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto">
        {/* Canvas area */}
        <div className={`bg-white shadow-lg min-h-screen ${enabled ? 'ring-2 ring-blue-400' : ''}`}>
          <Frame>
            <Element
              canvas
              is={CraftContainer}
              padding={20}
              background="#ffffff"
            >
              {/* Default content - will be replaced when loading template */}
              <p className="text-center text-gray-400 py-20">
                Drag components from the left panel to start building
              </p>
            </Element>
          </Frame>
        </div>
      </div>
    </div>
  );
}
