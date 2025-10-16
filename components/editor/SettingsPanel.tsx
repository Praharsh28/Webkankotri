/**
 * Settings Panel - Edit selected component properties
 */

'use client';

import { useEditor } from '@craftjs/core';
import { Settings } from 'lucide-react';

export function SettingsPanel() {
  const { selected } = useEditor((state) => {
    const currentNodeId = Array.from(state.events.selected)[0];
    let selected;

    if (currentNodeId) {
      selected = {
        id: currentNodeId,
        name: state.nodes[currentNodeId].data.displayName,
        settings: state.nodes[currentNodeId].related?.settings,
      };
    }

    return { selected };
  });

  return (
    <div className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <Settings className="w-5 h-5 text-gray-600" />
        <h2 className="text-lg font-semibold text-gray-900">Settings</h2>
      </div>

      {selected ? (
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            {selected.name}
          </h3>
          {selected.settings && React.createElement(selected.settings)}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-400">
          <p className="text-sm">Select a component to edit its settings</p>
        </div>
      )}
    </div>
  );
}

import React from 'react';
