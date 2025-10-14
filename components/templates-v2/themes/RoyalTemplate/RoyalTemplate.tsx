'use client';

import { VideoBackground, FloatingParticles, AudioPlayer } from '@/components/animations-v2';
import { RoyalHero } from './sections/RoyalHero';
import { RoyalStory } from './sections/RoyalStory';
import { RoyalEvents } from './sections/RoyalEvents';
import { RoyalGallery } from './sections/RoyalGallery';
import { RoyalVenue } from './sections/RoyalVenue';
import { RoyalRSVP } from './sections/RoyalRSVP';
import { RoyalFooter } from './sections/RoyalFooter';
import { royalConfig } from './royal-config';
import type { InvitationData } from '@/types/v2/template';

interface RoyalTemplateProps {
  data: InvitationData;
}

export function RoyalTemplate({ data }: RoyalTemplateProps) {
  const config = data.customization || royalConfig;

  return (
    <div className="relative min-h-screen bg-black">
      {/* Video Background */}
      {config.features.videoBackground && (
        <VideoBackground
          src={data.media.videoUrl || config.content.videoUrl || ''}
          mobileSrc={data.media.videoUrl}
          overlay={0.7}
          overlayColor="rgba(10, 10, 10, 0.7)"
          fallback={
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, ${config.colors.primary} 0%, ${config.colors.accent} 100%)`,
              }}
            />
          }
        >
          {/* Floating Particles */}
          {config.features.particles && (
            <FloatingParticles
              emojis={config.animations.particleEmojis}
              count={config.animations.particleCount}
              speed={config.animations.particleSpeed}
            />
          )}

          {/* Background Music */}
          {config.features.audioPlayer && (
            <AudioPlayer
              src={data.media.musicUrl || config.content.musicUrl || ''}
              volume={0.3}
              loop
              controls="minimal"
              position="bottom-right"
            />
          )}

          {/* Hero Section */}
          <RoyalHero
            groomName={data.groom.name}
            brideName={data.bride.name}
            weddingDate={data.wedding.date}
            title={config.content.heroTitle}
            subtitle={config.content.heroSubtitle}
          />
        </VideoBackground>
      )}

      {/* Story Section */}
      <RoyalStory
        howWeMet={data.story.howWeMet}
        proposal={data.story.proposal}
        timeline={data.story.timeline}
      />

      {/* Events Section */}
      <RoyalEvents events={data.events} weddingDate={data.wedding.date} />

      {/* Gallery Section */}
      {data.media.photos.length > 0 && (
        <RoyalGallery photos={data.media.photos} showCarousel={true} />
      )}

      {/* Venue Section */}
      <RoyalVenue venue={data.wedding.venue} accommodation={data.accommodation} />

      {/* RSVP Section */}
      <RoyalRSVP invitationId={data.id} />

      {/* Footer */}
      <RoyalFooter
        groomName={data.groom.name}
        brideName={data.bride.name}
        email={data.contact.email}
        phone={data.contact.phone}
        whatsapp={data.contact.whatsapp}
      />
    </div>
  );
}
