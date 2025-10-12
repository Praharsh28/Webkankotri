// Section-Based Template System Types

export type SectionType = 
  | 'header'              // Names (required)
  | 'blessing'            // Prayer/blessing
  | 'parents'             // Parents names
  | 'event-main'          // Main wedding event (required)
  | 'event-mehendi'       // Mehendi event
  | 'event-sangeet'       // Sangeet event
  | 'event-haldi'         // Haldi event
  | 'event-reception'     // Reception event
  | 'message'             // Custom message/quote
  | 'custom-text'         // Flexible custom text (unlimited)
  | 'family-list'         // Family member lists
  | 'gallery'             // Photo gallery
  | 'timeline'            // Schedule timeline
  | 'map'                 // Venue map
  | 'hotels'              // Hotel recommendations
  | 'dress-code'          // Dress code
  | 'rsvp'                // RSVP button
  | 'contact'             // Contact info

export interface SectionConfig {
  id: string
  type: SectionType
  name: string
  description: string
  required: boolean
  enabled: boolean
  order: number
  icon?: string
}

export interface HeaderSectionData {
  groomName: string
  brideName: string
  groomTitle?: string // "Mr." / "Shri"
  brideTitle?: string // "Ms." / "Smt."
}

export interface ParentsSectionData {
  groomParents: string
  brideParents: string
  showParentNames: boolean
}

export interface EventSectionData {
  eventName: string // "Wedding Ceremony", "Mehendi", etc.
  date: string // ISO date
  time: string // "10:00 AM"
  venue: string
  venueAddress?: string
  description?: string
}

export interface MessageSectionData {
  message: string
  author?: string
  showInGujarati?: boolean
}

export interface GallerySectionData {
  photos: Array<{
    id: string
    url: string
    caption?: string
  }>
  layout: 'grid' | 'carousel' | 'masonry'
}

export interface MapSectionData {
  latitude: number
  longitude: number
  venueName: string
  googleMapsUrl?: string
}

export interface HotelsSectionData {
  hotels: Array<{
    name: string
    address: string
    distance?: string
    bookingUrl?: string
  }>
}

export interface TimelineSectionData {
  events: Array<{
    time: string
    title: string
    description?: string
  }>
}

export interface DressCodeSectionData {
  code: string // "Traditional", "Semi-formal", etc.
  description?: string
  colors?: string[] // Suggested colors
}

export interface RSVPSectionData {
  rsvpUrl: string
  rsvpDeadline?: string
  showGuestCount?: boolean
}

export interface ContactSectionData {
  contacts: Array<{
    name: string
    relation: string // "Bride", "Groom", "Family"
    phone: string
    email?: string
  }>
}

export interface BlessingSectionData {
  type: 'ganesh' | 'swaminarayan' | 'custom'
  text: string
  language: 'en' | 'gu' | 'both'
  showIcon?: boolean
}

export interface CustomTextSectionData {
  title?: string
  content: string
  textAlign?: 'left' | 'center' | 'right'
  language?: 'en' | 'gu' | 'both'
  showBorder?: boolean
}

export interface FamilyListSectionData {
  title: string
  subtitle?: string
  category: 'groom' | 'bride' | 'both'
  groomFamily?: Array<{
    name: string
    relation?: string
    address?: string
  }>
  brideFamily?: Array<{
    name: string
    relation?: string
    address?: string
  }>
  layout: 'single-column' | 'two-column'
}

// Union type for all section data
export type SectionData = 
  | HeaderSectionData
  | ParentsSectionData
  | EventSectionData
  | MessageSectionData
  | CustomTextSectionData
  | FamilyListSectionData
  | GallerySectionData
  | MapSectionData
  | HotelsSectionData
  | TimelineSectionData
  | DressCodeSectionData
  | RSVPSectionData
  | ContactSectionData
  | BlessingSectionData

export interface TemplateSection {
  id: string
  config: SectionConfig
  data: SectionData
}

// Complete invitation structure with sections
export interface SectionBasedInvitation {
  id: string
  user_id: string
  template_id: string
  title: string
  sections: TemplateSection[]
  theme: {
    primaryColor: string
    secondaryColor?: string
    fontFamily?: string
  }
  status: 'draft' | 'published' | 'archived'
  slug: string
  created_at: string
  updated_at: string
}

// Default section configurations
export const DEFAULT_SECTIONS: SectionConfig[] = [
  {
    id: 'blessing',
    type: 'blessing',
    name: 'Blessing',
    description: 'Prayer or blessing (Ganesh, etc.)',
    required: false,
    enabled: true,
    order: 1,
    icon: '🙏'
  },
  {
    id: 'header',
    type: 'header',
    name: 'Names',
    description: 'Bride and Groom names',
    required: true,
    enabled: true,
    order: 2,
    icon: '💑'
  },
  {
    id: 'parents',
    type: 'parents',
    name: 'Parents Names',
    description: 'Parents of bride and groom',
    required: false,
    enabled: true,
    order: 3,
    icon: '👨‍👩‍👧‍👦'
  },
  {
    id: 'event-main',
    type: 'event-main',
    name: 'Wedding Event',
    description: 'Main wedding ceremony details',
    required: true,
    enabled: true,
    order: 4,
    icon: '💍'
  },
  {
    id: 'event-mehendi',
    type: 'event-mehendi',
    name: 'Mehendi Event',
    description: 'Mehendi ceremony details',
    required: false,
    enabled: false,
    order: 5,
    icon: '🖐️'
  },
  {
    id: 'event-sangeet',
    type: 'event-sangeet',
    name: 'Sangeet Event',
    description: 'Sangeet ceremony details',
    required: false,
    enabled: false,
    order: 6,
    icon: '🎵'
  },
  {
    id: 'event-haldi',
    type: 'event-haldi',
    name: 'Haldi Event',
    description: 'Haldi ceremony details',
    required: false,
    enabled: false,
    order: 7,
    icon: '🌼'
  },
  {
    id: 'event-reception',
    type: 'event-reception',
    name: 'Reception',
    description: 'Reception details',
    required: false,
    enabled: false,
    order: 8,
    icon: '🎉'
  },
  {
    id: 'message',
    type: 'message',
    name: 'Custom Message',
    description: 'Personal message or quote',
    required: false,
    enabled: true,
    order: 9,
    icon: '💌'
  },
  {
    id: 'custom-text-1',
    type: 'custom-text',
    name: 'Custom Text',
    description: 'Add any custom text (unlimited)',
    required: false,
    enabled: false,
    order: 10,
    icon: '📝'
  },
  {
    id: 'family-list',
    type: 'family-list',
    name: 'Family List',
    description: 'List of family members',
    required: false,
    enabled: false,
    order: 11,
    icon: '👨‍👩‍👧‍👦'
  },
  {
    id: 'gallery',
    type: 'gallery',
    name: 'Photo Gallery',
    description: 'Add photos (2-6 images)',
    required: false,
    enabled: false,
    order: 12,
    icon: '📸'
  },
  {
    id: 'timeline',
    type: 'timeline',
    name: 'Schedule Timeline',
    description: 'Day-of schedule',
    required: false,
    enabled: false,
    order: 13,
    icon: '⏰'
  },
  {
    id: 'map',
    type: 'map',
    name: 'Venue Map',
    description: 'Location map',
    required: false,
    enabled: false,
    order: 14,
    icon: '📍'
  },
  {
    id: 'hotels',
    type: 'hotels',
    name: 'Hotels',
    description: 'Accommodation suggestions',
    required: false,
    enabled: false,
    order: 15,
    icon: '🏨'
  },
  {
    id: 'dress-code',
    type: 'dress-code',
    name: 'Dress Code',
    description: 'Attire suggestions',
    required: false,
    enabled: false,
    order: 16,
    icon: '👗'
  },
  {
    id: 'rsvp',
    type: 'rsvp',
    name: 'RSVP',
    description: 'RSVP button',
    required: false,
    enabled: false,
    order: 17,
    icon: '✉️'
  },
  {
    id: 'contact',
    type: 'contact',
    name: 'Contact Info',
    description: 'Contact details',
    required: false,
    enabled: false,
    order: 18,
    icon: '📞'
  }
]
