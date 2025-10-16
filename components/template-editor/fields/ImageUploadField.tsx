/**
 * Image Upload Field
 * 
 * Allows uploading to Supabase Storage or pasting URL
 */

'use client';

import { useState, useRef } from 'react';
import { Upload, Link as LinkIcon, X } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';

interface ImageUploadFieldProps {
  value: string;
  onChange: (url: string) => void;
  maxSize?: number; // MB
}

export function ImageUploadField({ value, onChange, maxSize = 5 }: ImageUploadFieldProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Validate
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }
    
    if (file.size > maxSize * 1024 * 1024) {
      toast.error(`Image must be less than ${maxSize}MB`);
      return;
    }
    
    setIsUploading(true);
    
    try {
      const supabase = createClient();
      
      // Generate filename
      const timestamp = Date.now();
      const random = Math.random().toString(36).substring(7);
      const ext = file.name.split('.').pop();
      const filename = `templates/${timestamp}-${random}.${ext}`;
      
      // Upload
      const { data, error } = await supabase.storage
        .from('templates')
        .upload(filename, file, {
          cacheControl: '3600',
          upsert: false,
        });
      
      if (error) throw error;
      
      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('templates')
        .getPublicUrl(filename);
      
      onChange(publicUrl);
      toast.success('Image uploaded!');
      
    } catch (error: any) {
      console.error('Upload error:', error);
      toast.error(error.message || 'Upload failed');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };
  
  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-gray-700">
        Image Source
      </label>
      
      {/* Current image preview */}
      {value && (
        <div className="relative group">
          <img 
            src={value} 
            alt="Preview" 
            className="w-full h-32 object-cover rounded-lg border-2 border-gray-300"
          />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
            title="Remove image"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
      
      {/* Upload button */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-blue-400 rounded-lg hover:bg-blue-50 transition-colors disabled:opacity-50"
        >
          <Upload className="w-5 h-5 text-blue-600" />
          <span className="font-medium text-blue-600">
            {isUploading ? 'Uploading...' : 'Upload Image'}
          </span>
        </button>
        
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          title="Paste URL"
        >
          <LinkIcon className="w-5 h-5 text-gray-600" />
        </button>
      </div>
      
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        disabled={isUploading}
      />
      
      {/* URL input */}
      {showUrlInput && (
        <div className="space-y-2">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
          <p className="text-xs text-gray-500">
            Or paste an image URL
          </p>
        </div>
      )}
      
      <p className="text-xs text-gray-500">
        JPG, PNG, WEBP • Max {maxSize}MB
      </p>
    </div>
  );
}
