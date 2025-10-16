/**
 * Editor Top Bar - Save, Preview, Undo, Redo, Export
 */

'use client';

import { useEditor } from '@craftjs/core';
import { Save, Eye, Undo, Redo, Download, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface TopBarProps {
  templateId: string;
}

export function TopBar({ templateId }: TopBarProps) {
  const router = useRouter();
  const { actions, query, canUndo, canRedo } = useEditor((state, query) => ({
    canUndo: state.options.enabled && query.history.canUndo(),
    canRedo: state.options.enabled && query.history.canRedo(),
  }));
  
  const [isSaving, setIsSaving] = useState(false);
  const [isPreview, setIsPreview] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    const json = query.serialize();
    
    // TODO: Save to Supabase
    console.log('Saving template:', json);
    
    setTimeout(() => {
      setIsSaving(false);
      alert('Template saved successfully!');
    }, 1000);
  };

  const handlePreview = () => {
    setIsPreview(!isPreview);
    actions.setOptions((options) => (options.enabled = !isPreview));
  };

  const handleExport = () => {
    const json = query.serialize();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `template-${templateId}.json`;
    a.click();
  };

  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      {/* Left - Back button */}
      <button
        onClick={() => router.push('/dashboard')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Back to Dashboard</span>
      </button>

      {/* Center - Template name */}
      <div className="text-center">
        <h1 className="text-lg font-semibold text-gray-900">
          Template Editor
        </h1>
        <p className="text-sm text-gray-500">ID: {templateId}</p>
      </div>

      {/* Right - Actions */}
      <div className="flex items-center gap-2">
        {/* Undo */}
        <button
          onClick={() => actions.history.undo()}
          disabled={!canUndo}
          className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          title="Undo (Ctrl+Z)"
        >
          <Undo className="w-5 h-5" />
        </button>

        {/* Redo */}
        <button
          onClick={() => actions.history.redo()}
          disabled={!canRedo}
          className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          title="Redo (Ctrl+Y)"
        >
          <Redo className="w-5 h-5" />
        </button>

        <div className="w-px h-6 bg-gray-300 mx-2" />

        {/* Preview */}
        <button
          onClick={handlePreview}
          className={`flex items-center gap-2 px-4 py-2 rounded transition-colors ${
            isPreview
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Eye className="w-4 h-4" />
          {isPreview ? 'Exit Preview' : 'Preview'}
        </button>

        {/* Save */}
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {isSaving ? 'Saving...' : 'Save'}
        </button>

        {/* Export */}
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
          title="Export template JSON"
        >
          <Download className="w-4 h-4" />
          Export
        </button>
      </div>
    </div>
  );
}
