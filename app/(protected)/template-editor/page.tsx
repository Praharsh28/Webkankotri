/**
 * Template Editor Page
 * 
 * Click-edit-save interface for creating templates
 */

import { LiveTemplateEditor } from '@/components/template-editor/LiveTemplateEditor';
import { KankotriEnhanced } from '@/components/templates-v2/themes/KankotriTemplate/KankotriEnhanced';
import { exampleKankotri } from '@/lib/data/example-kankotri';

export default function TemplateEditorPage() {
  return (
    <LiveTemplateEditor>
      <KankotriEnhanced data={exampleKankotri} />
    </LiveTemplateEditor>
  );
}
