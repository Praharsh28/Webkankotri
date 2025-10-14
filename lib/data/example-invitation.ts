/**
 * Example Invitation Data
 * 
 * Use this as a template for creating new invitations
 */

import type { InvitationData } from '@/types/v2/template';
import { royalConfig } from '@/components/templates-v2/themes/RoyalTemplate/royal-config';

export const exampleInvitation: InvitationData = {
  // Basic info
  id: 'example-123',
  userId: 'user-123',
  templateId: 'royal-v2',
  slug: 'raj-priya-wedding',
  title: "Raj & Priya's Wedding",
  status: 'published',

  // Couple info
  groom: {
    name: 'Raj',
    fullName: 'Rajesh Kumar Patel',
    parents: 'Son of Mr. & Mrs. Ramesh Patel',
    photo: '/images/groom.jpg',
  },
  bride: {
    name: 'Priya',
    fullName: 'Priya Shah',
    parents: 'Daughter of Mr. & Mrs. Amit Shah',
    photo: '/images/bride.jpg',
  },

  // Wedding details
  wedding: {
    date: new Date('2025-06-15'),
    time: '7:00 PM onwards',
    venue: {
      name: 'The Grand Palace Hotel',
      address: '123 MG Road, Mumbai, Maharashtra 400001',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.8644!2d72.8777!3d19.0760!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1',
      coordinates: {
        lat: 19.0760,
        lng: 72.8777,
      },
    },
  },

  // Events
  events: [
    {
      id: 'mehendi',
      name: 'Mehendi Ceremony',
      date: new Date('2025-06-13'),
      time: '4:00 PM',
      venue: "Bride's Residence",
      description: 'Join us for an evening of music, dance, and beautiful henna designs',
      dresscode: 'Colorful traditional attire',
    },
    {
      id: 'sangeet',
      name: 'Sangeet Night',
      date: new Date('2025-06-14'),
      time: '7:00 PM',
      venue: 'The Grand Palace Hotel',
      description: 'An evening of dance, music, and celebration',
      dresscode: 'Semi-formal / Traditional',
    },
    {
      id: 'wedding',
      name: 'Wedding Ceremony',
      date: new Date('2025-06-15'),
      time: '7:00 PM',
      venue: 'The Grand Palace Hotel',
      description: 'Join us as we exchange vows and begin our journey together',
      dresscode: 'Formal / Traditional',
    },
    {
      id: 'reception',
      name: 'Reception',
      date: new Date('2025-06-15'),
      time: '9:00 PM',
      venue: 'The Grand Palace Hotel',
      description: 'Celebrate with us at the wedding reception',
      dresscode: 'Formal / Traditional',
    },
  ],

  // Story
  story: {
    howWeMet: 'We met at a mutual friend\'s wedding in 2020. From the moment we started talking, we knew there was something special between us. Our first conversation lasted hours, and we\'ve been inseparable ever since.',
    proposal: 'On a beautiful evening in Goa, under a sky full of stars, Raj got down on one knee and asked me to be his forever. It was the most magical moment of my life, and I said YES without hesitation!',
    timeline: [
      {
        date: new Date('2020-02-14'),
        title: 'First Meeting',
        description: 'We met at a friend\'s wedding and instantly connected',
        photo: '/images/timeline-1.jpg',
      },
      {
        date: new Date('2021-12-25'),
        title: 'First Trip Together',
        description: 'Our first vacation to Goa - an unforgettable experience',
        photo: '/images/timeline-2.jpg',
      },
      {
        date: new Date('2023-02-14'),
        title: 'The Proposal',
        description: 'Raj proposed on Valentine\'s Day in Goa',
        photo: '/images/timeline-3.jpg',
      },
    ],
  },

  // Media
  media: {
    photos: [
      '/images/couple-1.jpg',
      '/images/couple-2.jpg',
      '/images/couple-3.jpg',
      '/images/couple-4.jpg',
      '/images/couple-5.jpg',
      '/images/couple-6.jpg',
    ],
    videoUrl: '/videos/royal-palace.mp4',
    musicUrl: '/music/wedding-theme.mp3',
  },

  // Customization (uses royal config as default)
  customization: royalConfig,

  // Contact
  contact: {
    phone: '+91 98765 43210',
    email: 'raj.priya.wedding@gmail.com',
    whatsapp: '+919876543210',
  },

  // Accommodation
  accommodation: [
    {
      name: 'The Grand Palace Hotel',
      address: '123 MG Road, Mumbai, Maharashtra 400001',
      phone: '+91 22 1234 5678',
      website: 'https://grandpalace.com',
      mapUrl: 'https://maps.google.com/?q=The+Grand+Palace+Hotel+Mumbai',
    },
    {
      name: 'Taj Hotel Mumbai',
      address: 'Apollo Bunder, Mumbai, Maharashtra 400001',
      phone: '+91 22 6665 3366',
      website: 'https://taj.tajhotels.com',
      mapUrl: 'https://maps.google.com/?q=Taj+Hotel+Mumbai',
    },
  ],

  // Metadata
  viewCount: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
  publishedAt: new Date(),
};
