/**
 * Basic Components for Builder.io
 * 
 * Simple, reusable components (Text, Image, Video, Container)
 */

import { Builder } from '@builder.io/react';
import React from 'react';

/**
 * Text Component
 */
export const BuilderText: React.FC<{ text?: string; fontSize?: number; color?: string; fontWeight?: string; textAlign?: string }> = ({
  text = 'Edit this text',
  fontSize = 16,
  color = '#000000',
  fontWeight = 'normal',
  textAlign = 'left',
}) => {
  return (
    <p
      style={{
        fontSize: `${fontSize}px`,
        color,
        fontWeight,
        textAlign: textAlign as any,
        margin: 0,
        padding: '8px',
      }}
    >
      {text}
    </p>
  );
};

/**
 * Image Component
 */
export const BuilderImage: React.FC<{ src?: string; alt?: string; width?: string; height?: string }> = ({
  src = 'https://via.placeholder.com/400x300',
  alt = 'Image',
  width = '100%',
  height = 'auto',
}) => {
  return (
    <img
      src={src}
      alt={alt}
      style={{ width, height, display: 'block' }}
    />
  );
};

/**
 * Video Component
 */
export const BuilderVideo: React.FC<{ url?: string; autoplay?: boolean; controls?: boolean }> = ({
  url = '',
  autoplay = false,
  controls = true,
}) => {
  if (!url) {
    return (
      <div
        style={{
          width: '100%',
          height: '300px',
          backgroundColor: '#f3f4f6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#6b7280',
        }}
      >
        Add video URL in settings
      </div>
    );
  }

  return (
    <video
      src={url}
      controls={controls}
      autoPlay={autoplay}
      style={{ width: '100%', display: 'block' }}
    />
  );
};

/**
 * Container Component
 */
export const BuilderContainer: React.FC<{
  children?: React.ReactNode;
  padding?: number;
  backgroundColor?: string;
  borderRadius?: number;
}> = ({
  children,
  padding = 20,
  backgroundColor = '#ffffff',
  borderRadius = 0,
}) => {
  return (
    <div
      style={{
        padding: `${padding}px`,
        backgroundColor,
        borderRadius: `${borderRadius}px`,
        minHeight: '100px',
      }}
    >
      {children}
    </div>
  );
};

/**
 * Register all basic components with Builder.io
 */
export function registerBasicComponents() {
  // Text Component
  Builder.registerComponent(BuilderText, {
    name: 'Text',
    inputs: [
      {
        name: 'text',
        type: 'longText',
        defaultValue: 'Edit this text',
        required: true,
      },
      {
        name: 'fontSize',
        type: 'number',
        defaultValue: 16,
        min: 8,
        max: 120,
      },
      {
        name: 'color',
        type: 'color',
        defaultValue: '#000000',
      },
      {
        name: 'fontWeight',
        type: 'string',
        enum: ['normal', 'bold', 'lighter'],
        defaultValue: 'normal',
      },
      {
        name: 'textAlign',
        type: 'string',
        enum: ['left', 'center', 'right', 'justify'],
        defaultValue: 'left',
      },
    ],
  });

  // Image Component
  Builder.registerComponent(BuilderImage, {
    name: 'Image',
    inputs: [
      {
        name: 'src',
        type: 'file',
        allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg', 'gif', 'webp'],
        required: true,
      },
      {
        name: 'alt',
        type: 'string',
        defaultValue: 'Image',
      },
      {
        name: 'width',
        type: 'string',
        defaultValue: '100%',
      },
      {
        name: 'height',
        type: 'string',
        defaultValue: 'auto',
      },
    ],
  });

  // Video Component
  Builder.registerComponent(BuilderVideo, {
    name: 'Video',
    inputs: [
      {
        name: 'url',
        type: 'file',
        allowedFileTypes: ['mp4', 'webm', 'ogg'],
        required: true,
      },
      {
        name: 'autoplay',
        type: 'boolean',
        defaultValue: false,
      },
      {
        name: 'controls',
        type: 'boolean',
        defaultValue: true,
      },
    ],
  });

  // Container Component
  Builder.registerComponent(BuilderContainer, {
    name: 'Container',
    canHaveChildren: true,
    inputs: [
      {
        name: 'padding',
        type: 'number',
        defaultValue: 20,
        min: 0,
        max: 100,
      },
      {
        name: 'backgroundColor',
        type: 'color',
        defaultValue: '#ffffff',
      },
      {
        name: 'borderRadius',
        type: 'number',
        defaultValue: 0,
        min: 0,
        max: 50,
      },
    ],
  });
}
