'use client'

import type { SectionConfig } from '@/types/invitation'
import type { KankotriTheme } from '@/types/theme'

// Import all section components
import { HeaderSection } from '@/components/sections/HeaderSection'
import { BlessingSection } from '@/components/sections/BlessingSection'
import { ParentsSection } from '@/components/sections/ParentsSection'
import { EventSection } from '@/components/sections/EventSection'
import { MessageSection } from '@/components/sections/MessageSection'
import { CustomTextSection } from '@/components/sections/CustomTextSection'
import { FamilyListSection } from '@/components/sections/FamilyListSection'
import { GallerySection } from '@/components/sections/GallerySection'
import { PhotoGallerySection } from '@/components/sections/PhotoGallerySection'
import { VideoSection } from '@/components/sections/VideoSection'
import { TimelineSection } from '@/components/sections/TimelineSection'
import { MapSection } from '@/components/sections/MapSection'
import { HotelsSection } from '@/components/sections/HotelsSection'
import { DressCodeSection } from '@/components/sections/DressCodeSection'
import { RSVPSection } from '@/components/sections/RSVPSection'
import { RSVPFormSection } from '@/components/sections/RSVPFormSection'
import { GiftRegistrySection } from '@/components/sections/GiftRegistrySection'
import { SocialMediaSection } from '@/components/sections/SocialMediaSection'
import { ContactSection } from '@/components/sections/ContactSection'

interface SectionRendererProps {
  section: SectionConfig
  theme: KankotriTheme
  basicDetails: any
  index: number
}

export function SectionRenderer({ section, theme, basicDetails, index }: SectionRendererProps) {
  // Use section data directly - each section has its own data
  const sectionData = section.data || {}

  // Common props for all sections
  const commonProps = {
    data: sectionData,
    theme,
  }

  // Render appropriate section component based on type
  switch (section.id) {
    case 'header':
      return <HeaderSection {...commonProps} />
    
    case 'blessing':
      return <BlessingSection {...commonProps} />
    
    case 'parents':
      return <ParentsSection {...commonProps} />
    
    case 'event':
      return <EventSection {...commonProps} />
    
    case 'message':
      return <MessageSection {...commonProps} />
    
    case 'customText':
      return <CustomTextSection {...commonProps} />
    
    case 'familyList':
      return <FamilyListSection {...commonProps} />
    
    case 'gallery':
      return <GallerySection {...commonProps} />
    
    case 'photoGallery':
      return <PhotoGallerySection {...commonProps} />
    
    case 'video':
      return <VideoSection {...commonProps} />
    
    case 'timeline':
      return <TimelineSection {...commonProps} />
    
    case 'map':
      return <MapSection {...commonProps} />
    
    case 'hotels':
      return <HotelsSection {...commonProps} />
    
    case 'dressCode':
      return <DressCodeSection {...commonProps} />
    
    case 'rsvp':
      return <RSVPSection {...commonProps} />
    
    case 'rsvpForm':
      return <RSVPFormSection {...commonProps} />
    
    case 'giftRegistry':
      return <GiftRegistrySection {...commonProps} />
    
    case 'socialMedia':
      return <SocialMediaSection {...commonProps} />
    
    case 'contact':
      return <ContactSection {...commonProps} />
    
    default:
      // Fallback for unknown section types
      return (
        <div className="p-8 text-center">
          <p className="text-white/80">Section: {section.type}</p>
        </div>
      )
  }
}
