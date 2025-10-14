'use client';

import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import 'yet-another-react-lightbox/plugins/captions.css';

/**
 * LightboxGallery Component
 * 
 * Grid gallery with full-screen lightbox viewer.
 * Touch-friendly, swipe support, zoom capability.
 * 
 * @example
 * ```tsx
 * <LightboxGallery
 *   images={[
 *     { src: '/photo1.jpg', alt: 'Photo 1', title: 'Wedding Day' },
 *     { src: '/photo2.jpg', alt: 'Photo 2', title: 'Reception' }
 *   ]}
 *   columns={3}
 *   spacing={16}
 * />
 * ```
 */

export interface GalleryImage {
  src: string;
  alt: string;
  title?: string;
  description?: string;
}

export interface LightboxGalleryProps {
  /** Array of images */
  images: GalleryImage[];
  /** Number of columns in grid */
  columns?: number;
  /** Spacing between images (px) */
  spacing?: number;
  /** Thumbnail size */
  thumbnailSize?: 'small' | 'medium' | 'large';
  /** Animation type */
  animation?: 'fade' | 'zoom' | 'slide';
  /** Additional CSS classes */
  className?: string;
}

export function LightboxGallery({
  images,
  columns = 3,
  spacing = 16,
  thumbnailSize = 'medium',
  animation = 'zoom',
  className = '',
}: LightboxGalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  if (images.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg bg-gray-100">
        <p className="text-gray-500">No images to display</p>
      </div>
    );
  }

  // Convert images to lightbox format
  const lightboxSlides = images.map((img) => ({
    src: img.src,
    title: img.title,
    description: img.description,
  }));

  // Grid column classes
  const gridClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-4',
  }[columns] || 'grid-cols-2 md:grid-cols-3';

  // Thumbnail height classes
  const thumbnailHeights = {
    small: 'h-40 md:h-48',
    medium: 'h-48 md:h-64',
    large: 'h-64 md:h-80',
  };

  const handleImageClick = (index: number) => {
    setPhotoIndex(index);
    setIsOpen(true);
  };

  return (
    <>
      <div
        className={`grid ${gridClasses} ${className}`}
        style={{ gap: `${spacing}px` }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="group relative cursor-pointer overflow-hidden rounded-lg"
            onClick={() => handleImageClick(index)}
          >
            <img
              src={image.src}
              alt={image.alt}
              className={`w-full ${thumbnailHeights[thumbnailSize]} object-cover transition-transform duration-300 group-hover:scale-110`}
              loading="lazy"
            />
            
            {/* Hover overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="text-center text-white">
                <svg
                  className="mx-auto h-8 w-8 mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                  />
                </svg>
                {image.title && (
                  <p className="text-sm font-medium">{image.title}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      <Lightbox
        open={isOpen}
        close={() => setIsOpen(false)}
        slides={lightboxSlides}
        index={photoIndex}
        plugins={[Zoom, Captions]}
        animation={{ fade: 250, swipe: 500, navigation: 300 }}
        carousel={{ finite: false, preload: 2 }}
        controller={{ closeOnBackdropClick: true }}
        render={{
          buttonPrev: images.length <= 1 ? () => null : undefined,
          buttonNext: images.length <= 1 ? () => null : undefined,
        }}
      />
    </>
  );
}
