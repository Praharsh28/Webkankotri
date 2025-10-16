/**
 * Builder.io Visual Editor
 * 
 * React 19 compatible visual editor for templates
 */

'use client';

import { Builder } from '@builder.io/react';
import { BuilderEditor } from '@/components/builder/BuilderEditor';
import { useEffect, useState } from 'react';

// Initialize Builder.io (will register components on mount)
export default function EditorPage() {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Builder.io will be initialized by component registrations
    setIsInitialized(true);
  }, []);

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Initializing Editor...</p>
        </div>
      </div>
    );
  }

  return <BuilderEditor />;
}
