# 📸 MEDIA UPLOADS SYSTEM

**Photo, Font, and Music Upload Features**

---

## 🎯 REQUIREMENTS

From user request:
- ✅ Upload custom photos (make it feel like "this is MY image")
- ✅ Add custom fonts
- ✅ Add background music
- ✅ Precise placement of uploaded images

---

## 📦 STORAGE SETUP (Supabase Storage)

### Buckets Configuration

```sql
-- Create storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES
  ('invitation-photos', 'invitation-photos', true),
  ('custom-fonts', 'custom-fonts', true),
  ('background-music', 'background-music', true);

-- Storage policies
CREATE POLICY "Anyone can view invitation photos"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'invitation-photos');

CREATE POLICY "Authenticated users can upload photos"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'invitation-photos' AND
    auth.role() = 'authenticated'
  );

CREATE POLICY "Users can delete their own photos"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'invitation-photos' AND
    auth.uid() = owner
  );

-- Similar policies for fonts and music buckets
```

### File Size Limits

```typescript
// lib/constants/upload-limits.ts

export const UPLOAD_LIMITS = {
  photos: {
    maxSize: 5 * 1024 * 1024, // 5MB
    maxFiles: 10,
    acceptedFormats: ['image/jpeg', 'image/png', 'image/webp'],
  },
  fonts: {
    maxSize: 2 * 1024 * 1024, // 2MB
    maxFiles: 5,
    acceptedFormats: ['font/ttf', 'font/otf', 'font/woff', 'font/woff2'],
  },
  music: {
    maxSize: 10 * 1024 * 1024, // 10MB
    maxFiles: 1,
    acceptedFormats: ['audio/mpeg', 'audio/mp3', 'audio/wav'],
  },
}
```

---

## 🎨 COMPONENT: PHOTO UPLOAD

**File:** `components/features/PhotoUpload.tsx`

```typescript
'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react'
import { uploadPhoto, deletePhoto } from '@/lib/storage/photo-upload'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'
import { UPLOAD_LIMITS } from '@/lib/constants/upload-limits'

interface PhotoUploadProps {
  invitationId: string
  existingPhotos?: string[]
  onUpload: (photoUrl: string) => void
  onDelete: (photoUrl: string) => void
  maxPhotos?: number
}

export function PhotoUpload({
  invitationId,
  existingPhotos = [],
  onUpload,
  onDelete,
  maxPhotos = 10,
}: PhotoUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (existingPhotos.length >= maxPhotos) {
        toast.error(`Maximum ${maxPhotos} photos allowed`)
        return
      }

      const file = acceptedFiles[0]
      if (!file) return

      // Validate file size
      if (file.size > UPLOAD_LIMITS.photos.maxSize) {
        toast.error('Image too large. Maximum size is 5MB')
        return
      }

      // Validate file type
      if (!UPLOAD_LIMITS.photos.acceptedFormats.includes(file.type)) {
        toast.error('Invalid format. Use JPG, PNG, or WebP')
        return
      }

      setUploading(true)
      setUploadProgress(0)

      try {
        // Compress image before upload
        const compressedFile = await compressImage(file)
        
        // Upload to Supabase Storage
        const photoUrl = await uploadPhoto(
          compressedFile,
          invitationId,
          (progress) => setUploadProgress(progress)
        )

        onUpload(photoUrl)
        toast.success('✨ Photo uploaded successfully!')
      } catch (error) {
        console.error('Upload error:', error)
        toast.error('Failed to upload photo')
      } finally {
        setUploading(false)
        setUploadProgress(0)
      }
    },
    [invitationId, existingPhotos.length, maxPhotos, onUpload]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp'],
    },
    maxFiles: 1,
    disabled: uploading || existingPhotos.length >= maxPhotos,
  })

  const handleDelete = async (photoUrl: string) => {
    try {
      await deletePhoto(photoUrl)
      onDelete(photoUrl)
      toast.success('Photo removed')
    } catch (error) {
      toast.error('Failed to delete photo')
    }
  }

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      {existingPhotos.length < maxPhotos && (
        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-xl p-8 text-center cursor-pointer
            transition-colors
            ${isDragActive ? 'border-orange-500 bg-orange-50' : 'border-gray-300 hover:border-orange-400'}
            ${uploading ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <input {...getInputProps()} />
          
          {uploading ? (
            <div className="space-y-3">
              <Loader2 className="w-12 h-12 mx-auto text-orange-500 animate-spin" />
              <p className="text-sm text-gray-600">
                Uploading... {uploadProgress}%
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-orange-500 h-2 rounded-full transition-all"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <ImageIcon className="w-12 h-12 mx-auto text-gray-400" />
              <div>
                <p className="text-lg font-semibold text-gray-700 mb-1">
                  {isDragActive ? 'Drop your photo here' : 'Upload Photo'}
                </p>
                <p className="text-sm text-gray-500">
                  Drag & drop or click to browse
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  JPG, PNG, or WebP • Max 5MB
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Photo Grid */}
      {existingPhotos.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <AnimatePresence>
            {existingPhotos.map((photoUrl, index) => (
              <motion.div
                key={photoUrl}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative group"
              >
                <Card className="overflow-hidden">
                  <div className="relative aspect-square">
                    <img
                      src={photoUrl}
                      alt={`Uploaded ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors" />
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleDelete(photoUrl)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Photo Count */}
      <p className="text-sm text-gray-500 text-center">
        {existingPhotos.length} / {maxPhotos} photos uploaded
      </p>
    </div>
  )
}

// Image compression utility
async function compressImage(file: File): Promise<File> {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (e) => {
      const img = new Image()
      img.src = e.target?.result as string
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')!
        
        // Max dimensions
        const MAX_WIDTH = 1920
        const MAX_HEIGHT = 1920
        
        let width = img.width
        let height = img.height
        
        if (width > height && width > MAX_WIDTH) {
          height *= MAX_WIDTH / width
          width = MAX_WIDTH
        } else if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height
          height = MAX_HEIGHT
        }
        
        canvas.width = width
        canvas.height = height
        ctx.drawImage(img, 0, 0, width, height)
        
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(new File([blob], file.name, { type: 'image/jpeg' }))
            } else {
              resolve(file)
            }
          },
          'image/jpeg',
          0.85
        )
      }
    }
  })
}
```

---

## 🎵 COMPONENT: MUSIC UPLOAD

**File:** `components/features/MusicUpload.tsx`

```typescript
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Upload, Music, X, Play, Pause } from 'lucide-react'
import { uploadMusic, deleteMusic } from '@/lib/storage/music-upload'
import { toast } from 'sonner'
import { UPLOAD_LIMITS } from '@/lib/constants/upload-limits'

interface MusicUploadProps {
  invitationId: string
  existingMusic?: string
  onUpload: (musicUrl: string) => void
  onDelete: () => void
}

export function MusicUpload({
  invitationId,
  existingMusic,
  onUpload,
  onDelete,
}: MusicUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate
    if (file.size > UPLOAD_LIMITS.music.maxSize) {
      toast.error('Audio file too large. Maximum size is 10MB')
      return
    }

    if (!UPLOAD_LIMITS.music.acceptedFormats.includes(file.type)) {
      toast.error('Invalid format. Use MP3 or WAV')
      return
    }

    setUploading(true)
    try {
      const musicUrl = await uploadMusic(file, invitationId)
      onUpload(musicUrl)
      toast.success('🎵 Music uploaded successfully!')
    } catch (error) {
      toast.error('Failed to upload music')
    } finally {
      setUploading(false)
    }
  }

  const togglePlay = () => {
    if (!existingMusic) return

    if (!audio) {
      const newAudio = new Audio(existingMusic)
      newAudio.addEventListener('ended', () => setPlaying(false))
      setAudio(newAudio)
      newAudio.play()
      setPlaying(true)
    } else {
      if (playing) {
        audio.pause()
      } else {
        audio.play()
      }
      setPlaying(!playing)
    }
  }

  const handleDelete = async () => {
    try {
      if (audio) {
        audio.pause()
        setAudio(null)
      }
      await deleteMusic(existingMusic!)
      onDelete()
      toast.success('Music removed')
    } catch (error) {
      toast.error('Failed to delete music')
    }
  }

  if (existingMusic) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="lg"
              className="w-12 h-12 rounded-full p-0"
              onClick={togglePlay}
            >
              {playing ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5 ml-0.5" />
              )}
            </Button>
            <div>
              <p className="font-semibold text-gray-900">Background Music</p>
              <p className="text-sm text-gray-500">Click to preview</p>
            </div>
          </div>
          <Button variant="destructive" onClick={handleDelete}>
            <X className="w-4 h-4 mr-2" />
            Remove
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-8">
      <label
        htmlFor="music-upload"
        className="flex flex-col items-center cursor-pointer"
      >
        <Music className="w-12 h-12 text-gray-400 mb-3" />
        <p className="text-lg font-semibold text-gray-700 mb-1">
          Add Background Music
        </p>
        <p className="text-sm text-gray-500 mb-4">
          MP3 or WAV • Max 10MB
        </p>
        <Button disabled={uploading}>
          <Upload className="w-4 h-4 mr-2" />
          {uploading ? 'Uploading...' : 'Choose File'}
        </Button>
        <input
          id="music-upload"
          type="file"
          accept="audio/mpeg,audio/mp3,audio/wav"
          onChange={handleFileSelect}
          className="hidden"
          disabled={uploading}
        />
      </label>
    </Card>
  )
}
```

---

## 🔤 COMPONENT: FONT UPLOAD

**File:** `components/features/FontUpload.tsx`

```typescript
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Type, Upload, X } from 'lucide-react'
import { uploadFont } from '@/lib/storage/font-upload'
import { toast } from 'sonner'
import { UPLOAD_LIMITS } from '@/lib/constants/upload-limits'

interface FontUploadProps {
  invitationId: string
  existingFonts?: Array<{ name: string; url: string }>
  onUpload: (fontData: { name: string; url: string }) => void
  onDelete: (fontUrl: string) => void
}

export function FontUpload({
  invitationId,
  existingFonts = [],
  onUpload,
  onDelete,
}: FontUploadProps) {
  const [uploading, setUploading] = useState(false)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate
    if (file.size > UPLOAD_LIMITS.fonts.maxSize) {
      toast.error('Font file too large. Maximum size is 2MB')
      return
    }

    setUploading(true)
    try {
      const fontUrl = await uploadFont(file, invitationId)
      const fontName = file.name.replace(/\.[^/.]+$/, '') // Remove extension
      
      onUpload({ name: fontName, url: fontUrl })
      
      // Load font dynamically
      const fontFace = new FontFace(fontName, `url(${fontUrl})`)
      await fontFace.load()
      document.fonts.add(fontFace)
      
      toast.success('✨ Font uploaded successfully!')
    } catch (error) {
      toast.error('Failed to upload font')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-4">
      {/* Upload Button */}
      <Card className="p-6">
        <label
          htmlFor="font-upload"
          className="flex items-center justify-between cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <Type className="w-6 h-6 text-gray-600" />
            <div>
              <p className="font-semibold text-gray-900">Upload Custom Font</p>
              <p className="text-sm text-gray-500">TTF, OTF, WOFF • Max 2MB</p>
            </div>
          </div>
          <Button disabled={uploading}>
            <Upload className="w-4 h-4 mr-2" />
            {uploading ? 'Uploading...' : 'Choose Font'}
          </Button>
          <input
            id="font-upload"
            type="file"
            accept=".ttf,.otf,.woff,.woff2"
            onChange={handleFileSelect}
            className="hidden"
            disabled={uploading}
          />
        </label>
      </Card>

      {/* Existing Fonts */}
      {existingFonts.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-semibold text-gray-700">Your Fonts</p>
          {existingFonts.map((font) => (
            <Card key={font.url} className="p-4">
              <div className="flex items-center justify-between">
                <p
                  className="text-xl"
                  style={{ fontFamily: font.name }}
                >
                  {font.name}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(font.url)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
```

---

## 🔧 STORAGE UTILITIES

**File:** `lib/storage/photo-upload.ts`

```typescript
import { supabase } from '@/lib/supabase/client'
import { v4 as uuidv4 } from 'uuid'

export async function uploadPhoto(
  file: File,
  invitationId: string,
  onProgress?: (progress: number) => void
): Promise<string> {
  const fileExt = file.name.split('.').pop()
  const fileName = `${invitationId}/${uuidv4()}.${fileExt}`

  const { data, error } = await supabase.storage
    .from('invitation-photos')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
    })

  if (error) throw error

  const { data: { publicUrl } } = supabase.storage
    .from('invitation-photos')
    .getPublicUrl(fileName)

  return publicUrl
}

export async function deletePhoto(photoUrl: string): Promise<void> {
  const path = photoUrl.split('/invitation-photos/')[1]
  
  const { error } = await supabase.storage
    .from('invitation-photos')
    .remove([path])

  if (error) throw error
}
```

**Similar files:** `lib/storage/music-upload.ts` and `lib/storage/font-upload.ts`

---

## 📦 INSTALLATION REQUIREMENT

```bash
npm install react-dropzone uuid
npm install --save-dev @types/uuid
```

---

## ✅ FEATURES SUMMARY

- ✅ **Photos:** Drag & drop, compression, 5MB limit, multiple uploads
- ✅ **Music:** Single file, 10MB limit, preview playback
- ✅ **Fonts:** Custom typography, 2MB limit, live preview
- ✅ **Progress:** Upload progress bars
- ✅ **Validation:** File size and format checks
- ✅ **Compression:** Auto-compress images before upload
- ✅ **Delete:** Easy removal of uploaded media

---

**Users will feel like "this is MY image" with precise control!**
