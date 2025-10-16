/**
 * Craft.js Visual Editor
 * 
 * Drag-and-drop template editor
 */

'use client';

import { use } from 'react';
import { EditorLayout } from '@/components/editor/EditorLayout';

export default function EditorPage({ params }: { params: Promise<{ templateId: string }> }) {
  const { templateId } = use(params);
  
  return <EditorLayout templateId={templateId} />;
}
