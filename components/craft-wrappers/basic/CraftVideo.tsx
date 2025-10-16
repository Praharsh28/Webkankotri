/**
 * Craft Video Component
 */

'use client';

import { useNode } from '@craftjs/core';

export interface CraftVideoProps {
  url?: string;
}

export function CraftVideo({ url = '' }: CraftVideoProps) {
  const { connectors: { connect, drag } } = useNode();

  return (
    <div ref={(ref) => {
      if (ref) {
        connect(drag(ref));
      }
    }} className="w-full max-w-2xl">
      {url ? (
        <video src={url} controls className="w-full" />
      ) : (
        <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-500">
          Add video URL
        </div>
      )}
    </div>
  );
}

export function CraftVideoSettings() {
  const { actions: { setProp }, url } = useNode((node) => ({
    url: node.data.props.url,
  }));

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Video URL</label>
        <input
          type="text"
          value={url}
          onChange={(e) => setProp((props: any) => (props.url = e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded"
          placeholder="https://..."
        />
      </div>
    </div>
  );
}

CraftVideo.craft = {
  displayName: 'Video',
  props: { url: '' },
  related: { settings: CraftVideoSettings },
};
