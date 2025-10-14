'use client';

import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation, Pagination, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import type { CarouselEffect } from '@/types/v2/animation';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

/**
 * PhotoCarousel Component
 * 
 * Beautiful photo carousel with multiple effects (3D coverflow, fade, slide).
 * Touch-friendly, autoplay support, navigation controls.
 * 
 * @example
 * ```tsx
 * <PhotoCarousel
 *   images={[
 *     { src: '/photo1.jpg', alt: 'Couple photo', caption: 'Our first date' },
 *     { src: '/photo2.jpg', alt: 'Engagement', caption: 'She said yes!' }
 *   ]}
 *   effect="3d-coverflow"
 *   autoPlay
 * />
 * ```
 */

export interface CarouselImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface PhotoCarouselProps {
  /** Array of images to display */
  images: CarouselImage[];
  /** Carousel effect style */
  effect?: CarouselEffect;
  /** Enable autoplay? */
  autoPlay?: boolean;
  /** Autoplay interval in ms */
  interval?: number;
  /** Show navigation arrows? */
  navigation?: boolean;
  /** Show pagination dots? */
  pagination?: boolean;
  /** Callback when image is clicked */
  onImageClick?: (index: number) => void;
  /** Additional CSS classes */
  className?: string;
}

export function PhotoCarousel({
  images,
  effect = '3d-coverflow',
  autoPlay = false,
  interval = 5000,
  navigation = true,
  pagination = true,
  onImageClick,
  className = '',
}: PhotoCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  if (images.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg bg-gray-100">
        <p className="text-gray-500">No photos to display</p>
      </div>
    );
  }

  const handlePrevious = () => {
    swiperRef.current?.slidePrev();
  };

  const handleNext = () => {
    swiperRef.current?.slideNext();
  };

  const handleImageClick = () => {
    onImageClick?.(activeIndex);
  };

  // Swiper configuration based on effect
  const getSwiperConfig = () => {
    const baseConfig = {
      modules: [Navigation, Pagination, Autoplay],
      spaceBetween: 30,
      slidesPerView: 1,
      onSwiper: (swiper: SwiperType) => {
        swiperRef.current = swiper;
      },
      onSlideChange: (swiper: SwiperType) => {
        setActiveIndex(swiper.activeIndex);
      },
      autoplay: autoPlay
        ? {
            delay: interval,
            disableOnInteraction: false,
          }
        : false,
      pagination: pagination
        ? {
            clickable: true,
            dynamicBullets: true,
          }
        : false,
    };

    if (effect === '3d-coverflow') {
      return {
        ...baseConfig,
        modules: [...baseConfig.modules, EffectCoverflow],
        effect: 'coverflow' as const,
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto' as const,
        coverflowEffect: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        },
      };
    }

    if (effect === 'fade') {
      return {
        ...baseConfig,
        effect: 'fade' as const,
        fadeEffect: {
          crossFade: true,
        },
      };
    }

    return baseConfig;
  };

  return (
    <div className={`relative ${className}`}>
      <Swiper
        {...getSwiperConfig()}
        className="w-full"
      >
        {images.map((image, index) => (
          <SwiperSlide
            key={index}
            className={effect === '3d-coverflow' ? 'w-[300px] md:w-[500px]' : ''}
          >
            <div
              className="group relative cursor-pointer overflow-hidden rounded-lg"
              onClick={handleImageClick}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="h-[300px] w-full object-cover transition-transform duration-300 group-hover:scale-110 md:h-[400px]"
                loading="lazy"
              />
              
              {/* Caption overlay */}
              {image.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <p className="text-center text-sm font-medium text-white md:text-base">
                    {image.caption}
                  </p>
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom navigation arrows */}
      {navigation && images.length > 1 && (
        <>
          <button
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:scale-110"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6 text-gray-700" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:scale-110"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6 text-gray-700" />
          </button>
        </>
      )}

      {/* Image counter */}
      <div className="mt-4 text-center text-sm text-gray-600">
        {activeIndex + 1} / {images.length}
      </div>
    </div>
  );
}
