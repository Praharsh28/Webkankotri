/**
 * Builder.io Component Registration
 * 
 * Register all components for use in the visual editor
 */

import { Builder } from '@builder.io/react';
import { registerBasicComponents } from './components/basic';

// Register all component groups
export function registerAllComponents() {
  // Basic components (Text, Image, Video, Container)
  registerBasicComponents();

  // TODO: Register wedding template components
  // registerKankotriComponents();
  // registerRoyalComponents();

  console.log('✅ Builder.io components registered');
}

// Auto-register on import
registerAllComponents();
