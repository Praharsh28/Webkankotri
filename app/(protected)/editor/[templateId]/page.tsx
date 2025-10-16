/**
 * Craft.js Visual Editor
 * 
 * Drag-and-drop template editor
 */

'use client';

import { EditorLayout } from '@/components/editor/EditorLayout';

export default function EditorPage({ params }: { params: { templateId: string } }) {
  const { templateId } = params;
  
  return <EditorLayout templateId={templateId} />;
}
