/**
 * Template System Types for WebKankotri V2
 * 
 * Complete type definitions for invitation templates and data
 */

// Wedding couple information
export interface CoupleInfo {
  name: string;
  fullName: string;
  parents: string;
  photo?: string;
}

// Venue information
export interface VenueInfo {
  name: string;
  address: string;
  mapUrl?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

// Wedding event
export interface WeddingEvent {
  id: string;
  name: string; // 'Mehendi', 'Sangeet', 'Wedding', 'Reception'
  date: Date;
  time: string;
  venue: string;
  description?: string;
  dresscode?: string;
}

// Story timeline entry
export interface TimelineEntry {
  date: Date;
  title: string;
  description: string;
  photo?: string;
}

// Accommodation information
export interface AccommodationInfo {
  name: string;
  address: string;
  phone: string;
  mapUrl?: string;
  website?: string;
}

// Template configuration
export interface TemplateConfig {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background?: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  features: {
    videoBackground: boolean;
    audioPlayer: boolean;
    particles: boolean;
    fireworks: boolean;
    parallax: boolean;
    countdown: boolean;
  };
  animations: {
    particleCount: number;
    particleSpeed: 'slow' | 'normal' | 'fast';
    particleEmojis: string[];
    parallaxSpeed: number;
  };
  content: {
    heroTitle: string;
    heroSubtitle: string;
    videoUrl?: string;
    musicUrl?: string;
  };
}

// Complete invitation data
export interface InvitationData {
  // Basic info
  id: string;
  userId: string;
  templateId: string;
  slug: string;
  title: string;
  status: 'draft' | 'published' | 'archived';
  
  // Couple info
  groom: CoupleInfo;
  bride: CoupleInfo;
  
  // Wedding details
  wedding: {
    date: Date;
    time: string;
    venue: VenueInfo;
  };
  
  // Events
  events: WeddingEvent[];
  
  // Story
  story: {
    howWeMet: string;
    proposal: string;
    timeline: TimelineEntry[];
  };
  
  // Media
  media: {
    photos: string[];
    videoUrl?: string;
    musicUrl?: string;
  };
  
  // Customization
  customization: TemplateConfig;
  
  // Contact
  contact: {
    phone: string;
    email: string;
    whatsapp?: string;
  };
  
  // Accommodation (optional)
  accommodation?: AccommodationInfo[];
  
  // Metadata
  viewCount: number;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
}

// RSVP data
export interface RSVPData {
  invitationId: string;
  name: string;
  email?: string;
  phone?: string;
  attending: 'yes' | 'no' | 'maybe';
  guestCount: number;
  mealPreference?: 'veg' | 'non-veg' | 'vegan' | 'jain';
  message?: string;
}
