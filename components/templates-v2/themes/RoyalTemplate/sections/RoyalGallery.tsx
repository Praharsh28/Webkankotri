'use client';

import { ScrollTrigger, PhotoCarousel, LightboxGallery } from '@/components/animations-v2';
import type { CarouselImage, GalleryImage } from '@/components/animations-v2';

interface RoyalGalleryProps {
  photos: string[];
  showCarousel?: boolean;
}

export function RoyalGallery({ photos, showCarousel = true }: RoyalGalleryProps) {
  // Convert photo URLs to proper format
  const carouselImages: CarouselImage[] = photos.slice(0, 5).map((photo, index) => ({
    src: photo,
    alt: `Couple photo ${index + 1}`,
    caption: undefined,
  }));

  const galleryImages: GalleryImage[] = photos.map((photo, index) => ({
    src: photo,
    alt: `Wedding photo ${index + 1}`,
  }));

  return (
    <section className="bg-white py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <ScrollTrigger animation="fade-up">
          <h2 className="mb-12 text-center font-serif text-4xl font-bold text-purple-900 md:text-5xl">
            Our Moments
          </h2>
        </ScrollTrigger>

        {showCarousel && carouselImages.length > 0 && (
          <ScrollTrigger animation="fade-up" delay={0.2}>
            <div className="mb-16">
              <PhotoCarousel
                images={carouselImages}
                effect="3d-coverflow"
                autoPlay
                interval={4000}
                navigation
                pagination
              />
            </div>
          </ScrollTrigger>
        )}

        {galleryImages.length > 0 && (
          <ScrollTrigger animation="fade-up" delay={0.4}>
            <LightboxGallery
              images={galleryImages}
              columns={3}
              spacing={16}
              thumbnailSize="medium"
            />
          </ScrollTrigger>
        )}
      </div>
    </section>
  );
}
