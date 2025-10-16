/**
 * Craft Text Component - Editable text block
 */

'use client';

import { useNode } from '@craftjs/core';
import ContentEditable from 'react-contenteditable';
import { useRef } from 'react';

export interface CraftTextProps {
  text?: string;
  fontSize?: number;
  color?: string;
  fontWeight?: string;
  textAlign?: string;
}

export function CraftText({
  text = 'Edit this text',
  fontSize = 16,
  color = '#000000',
  fontWeight = 'normal',
  textAlign = 'left',
}: CraftTextProps) {
  const {
    connectors: { connect, drag },
    actions: { setProp },
  } = useNode();

  const textRef = useRef(text);

  return (
    <div
      ref={(ref) => {
        if (ref) {
          connect(drag(ref));
        }
      }}
      style={{
        fontSize: `${fontSize}px`,
        color,
        fontWeight,
        textAlign: textAlign as any,
      }}
    >
      <ContentEditable
        html={textRef.current}
        onChange={(e) => {
          textRef.current = e.target.value;
          setProp((props: any) => (props.text = e.target.value));
        }}
        tagName="p"
      />
    </div>
  );
}

// Settings component for the text
export function CraftTextSettings() {
  const {
    actions: { setProp },
    text,
    fontSize,
    color,
    fontWeight,
    textAlign,
  } = useNode((node) => ({
    text: node.data.props.text,
    fontSize: node.data.props.fontSize,
    color: node.data.props.color,
    fontWeight: node.data.props.fontWeight,
    textAlign: node.data.props.textAlign,
  }));

  return (
    <div className="space-y-4">
      {/* Font Size */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Font Size
        </label>
        <input
          type="range"
          min="12"
          max="72"
          value={fontSize}
          onChange={(e) =>
            setProp((props: any) => (props.fontSize = parseInt(e.target.value)))
          }
          className="w-full"
        />
        <span className="text-xs text-gray-500">{fontSize}px</span>
      </div>

      {/* Color */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Color
        </label>
        <input
          type="color"
          value={color}
          onChange={(e) => setProp((props: any) => (props.color = e.target.value))}
          className="w-full h-10 rounded"
        />
      </div>

      {/* Font Weight */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Font Weight
        </label>
        <select
          value={fontWeight}
          onChange={(e) => setProp((props: any) => (props.fontWeight = e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded"
        >
          <option value="normal">Normal</option>
          <option value="bold">Bold</option>
          <option value="lighter">Light</option>
        </select>
      </div>

      {/* Text Align */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Alignment
        </label>
        <select
          value={textAlign}
          onChange={(e) => setProp((props: any) => (props.textAlign = e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded"
        >
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
          <option value="justify">Justify</option>
        </select>
      </div>
    </div>
  );
}

CraftText.craft = {
  displayName: 'Text',
  props: {
    text: 'Edit this text',
    fontSize: 16,
    color: '#000000',
    fontWeight: 'normal',
    textAlign: 'left',
  },
  related: {
    settings: CraftTextSettings,
  },
};
