/**
 * Craft Image Component
 */

'use client';

import { useNode } from '@craftjs/core';

export interface CraftImageProps {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
}

export function CraftImage({ src = '/placeholder.jpg', alt = 'Image', width = 300, height = 200 }: CraftImageProps) {
  const { connectors: { connect, drag } } = useNode();

  return (
    <div ref={(ref) => {
      if (ref) {
        connect(drag(ref));
      }
    }}>
      <img src={src} alt={alt} width={width} height={height} className="max-w-full" />
    </div>
  );
}

export function CraftImageSettings() {
  const { actions: { setProp }, src, alt } = useNode((node) => ({
    src: node.data.props.src,
    alt: node.data.props.alt,
  }));

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
        <input
          type="text"
          value={src}
          onChange={(e) => setProp((props: any) => (props.src = e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Alt Text</label>
        <input
          type="text"
          value={alt}
          onChange={(e) => setProp((props: any) => (props.alt = e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />
      </div>
    </div>
  );
}

CraftImage.craft = {
  displayName: 'Image',
  props: { src: '/placeholder.jpg', alt: 'Image', width: 300, height: 200 },
  related: { settings: CraftImageSettings },
};
