/**
 * Builder.io Editor Component
 * 
 * Main visual editor interface using Builder.io
 */

'use client';

import { BuilderComponent, builder } from '@builder.io/react';
import { useState, useEffect } from 'react';
import { Save, Eye, Download, ArrowLeft, Settings } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Import component registrations
import '@/lib/builder/register-components';

// Set your Builder.io API key (public key is safe to expose)
const BUILDER_API_KEY = process.env.NEXT_PUBLIC_BUILDER_API_KEY || 'demo';

// Initialize Builder
builder.init(BUILDER_API_KEY);

export function BuilderEditor() {
  const router = useRouter();
  const [content, setContent] = useState<any>(null);
  const [isPreview, setIsPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Load existing content (if editing)
  useEffect(() => {
    const loadContent = async () => {
      try {
        const contentData = await builder.get('page', {
          url: window.location.pathname,
        }).promise();
        
        if (contentData) {
          setContent(contentData);
        }
      } catch (error) {
        console.error('Error loading content:', error);
      }
    };

    loadContent();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // TODO: Integrate with your Supabase save logic
      console.log('Saving content:', content);
      
      // Simulate save
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('Template saved successfully!');
    } catch (error) {
      console.error('Error saving:', error);
      alert('Failed to save template');
    } finally {
      setIsSaving(false);
    }
  };

  const handleExport = () => {
    if (!content) {
      alert('No content to export');
      return;
    }

    const json = JSON.stringify(content, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `template-${Date.now()}.json`;
    a.click();
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Top Bar */}
      <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
        {/* Left - Back */}
        <button
          onClick={() => router.push('/dashboard')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Dashboard</span>
        </button>

        {/* Center - Title */}
        <div className="text-center">
          <h1 className="text-lg font-semibold text-gray-900">
            Visual Template Editor
          </h1>
          <p className="text-sm text-gray-500">Builder.io Powered</p>
        </div>

        {/* Right - Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPreview(!isPreview)}
            className={`flex items-center gap-2 px-4 py-2 rounded transition-colors ${
              isPreview
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Eye className="w-4 h-4" />
            {isPreview ? 'Exit Preview' : 'Preview'}
          </button>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {isSaving ? 'Saving...' : 'Save'}
          </button>

          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Editor Area */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-auto bg-gray-100 p-8">
          <div className="max-w-5xl mx-auto bg-white shadow-lg min-h-screen">
            <BuilderComponent
              model="page"
              content={content}
            />
          </div>
        </div>
      </div>

      {/* Info Banner */}
      {!content && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-blue-50 border border-blue-200 rounded-lg p-4 shadow-lg max-w-md">
          <div className="flex items-start gap-3">
            <Settings className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">
                Welcome to the Visual Editor!
              </h3>
              <p className="text-sm text-blue-700">
                Start by dragging components from the left panel. Your changes are saved automatically.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
