/**
 * Craft Container Component
 */

'use client';

import { useNode } from '@craftjs/core';

export interface CraftContainerProps {
  padding?: number;
  background?: string;
  children?: React.ReactNode;
}

export function CraftContainer({ padding = 20, background = '#ffffff', children }: CraftContainerProps) {
  const { connectors: { connect, drag } } = useNode();

  return (
    <div
      ref={(ref) => {
        if (ref) {
          connect(drag(ref));
        }
      }}
      style={{ padding: `${padding}px`, background }}
      className="min-h-[100px]"
    >
      {children}
    </div>
  );
}

export function CraftContainerSettings() {
  const { actions: { setProp }, padding, background } = useNode((node) => ({
    padding: node.data.props.padding,
    background: node.data.props.background,
  }));

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Padding</label>
        <input
          type="range"
          min="0"
          max="100"
          value={padding}
          onChange={(e) => setProp((props: any) => (props.padding = parseInt(e.target.value)))}
          className="w-full"
        />
        <span className="text-xs text-gray-500">{padding}px</span>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Background</label>
        <input
          type="color"
          value={background}
          onChange={(e) => setProp((props: any) => (props.background = e.target.value))}
          className="w-full h-10 rounded"
        />
      </div>
    </div>
  );
}

CraftContainer.craft = {
  displayName: 'Container',
  props: { padding: 20, background: '#ffffff' },
  related: { settings: CraftContainerSettings },
  rules: { canDrag: () => true, canDrop: () => true },
};
