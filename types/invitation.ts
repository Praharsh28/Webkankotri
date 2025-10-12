// Invitation Data Types

export interface InvitationBasicDetails {
  title: string
  brideName: string
  groomName: string
  weddingDate: string
  venue: string
  city: string
  state: string
}

export interface SectionConfig {
  id: string
  type: string
  name: string
  description: string
  required: boolean
  enabled: boolean
  order: number
  icon?: string
  data?: any
}

export interface InvitationData {
  // Basic info
  basicDetails: InvitationBasicDetails
  
  // Template
  templateId: string
  
  // Sections (array of enabled sections with their data)
  sections: SectionConfig[]
  
  // Customizations (optional theme overrides)
  customizations?: {
    colorOverrides?: {
      primary?: string
      secondary?: string
      accent?: string
    }
    fontOverrides?: {
      headingEnglish?: string
      headingGujarati?: string
    }
  }
}

export interface CreateInvitationState {
  currentStep: number
  data: Partial<InvitationData>
  isLoading: boolean
  error: string | null
}

// Available section types (19 sections we built)
export const AVAILABLE_SECTIONS = [
  // Core Sections
  { id: 'header', type: 'HeaderSection', name: 'Header', description: 'Main invitation header with couple names', required: true, icon: '📝' },
  { id: 'blessing', type: 'BlessingSection', name: 'Blessing', description: 'Religious blessing or quote', required: false, icon: '🙏' },
  { id: 'parents', type: 'ParentsSection', name: 'Parents', description: 'Parent names and invitation text', required: false, icon: '👨‍👩‍👧‍👦' },
  { id: 'event', type: 'EventSection', name: 'Event Details', description: 'Wedding event information', required: true, icon: '📅' },
  { id: 'message', type: 'MessageSection', name: 'Message', description: 'Personal message to guests', required: false, icon: '💌' },
  { id: 'customText', type: 'CustomTextSection', name: 'Custom Text', description: 'Any custom text content', required: false, icon: '✍️' },
  
  // Additional Sections
  { id: 'familyList', type: 'FamilyListSection', name: 'Family List', description: 'List of family members', required: false, icon: '👥' },
  { id: 'gallery', type: 'GallerySection', name: 'Gallery', description: 'Photo gallery', required: false, icon: '📸' },
  { id: 'photoGallery', type: 'PhotoGallerySection', name: 'Photo Gallery Advanced', description: 'Advanced photo gallery with layouts', required: false, icon: '🖼️' },
  { id: 'video', type: 'VideoSection', name: 'Video', description: 'Embed video (YouTube/Vimeo)', required: false, icon: '🎥' },
  { id: 'timeline', type: 'TimelineSection', name: 'Timeline', description: 'Wedding day timeline', required: false, icon: '⏰' },
  { id: 'map', type: 'MapSection', name: 'Map', description: 'Venue location map', required: false, icon: '🗺️' },
  { id: 'hotels', type: 'HotelsSection', name: 'Hotels', description: 'Nearby accommodation', required: false, icon: '🏨' },
  { id: 'dressCode', type: 'DressCodeSection', name: 'Dress Code', description: 'Attire recommendations', required: false, icon: '👔' },
  
  // Interactive Sections
  { id: 'rsvp', type: 'RSVPSection', name: 'RSVP Button', description: 'RSVP call-to-action button', required: false, icon: '✉️' },
  { id: 'rsvpForm', type: 'RSVPFormSection', name: 'RSVP Form', description: 'Inline RSVP form', required: false, icon: '📝' },
  { id: 'giftRegistry', type: 'GiftRegistrySection', name: 'Gift Registry', description: 'Gift registry or cash gift info', required: false, icon: '🎁' },
  { id: 'socialMedia', type: 'SocialMediaSection', name: 'Social Media', description: 'Social media links and hashtag', required: false, icon: '📱' },
  { id: 'contact', type: 'ContactSection', name: 'Contact', description: 'Contact information', required: false, icon: '📞' },
] as const

export type SectionType = typeof AVAILABLE_SECTIONS[number]['id']
