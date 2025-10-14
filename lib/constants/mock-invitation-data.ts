// Mock data for template testing playground
// All 19 sections with realistic data

export const MOCK_INVITATION_DATA = {
  id: 'demo-template-playground',
  slug: 'demo-playground',
  title: 'Template Testing Playground',
  status: 'published',
  theme: 'traditional', // Can be changed
  
  // Basic Details
  basicDetails: {
    groomName: 'Rajesh Kumar',
    brideName: 'Priya Sharma',
    weddingDate: '2025-02-14',
    weddingTime: '10:00 AM',
    venue: 'The Grand Palace',
    city: 'Ahmedabad',
    state: 'Gujarat'
  },

  // All 19 Sections with Mock Data
  sections: [
    // 1. Header Section
    {
      id: 'header',
      type: 'HeaderSection',
      enabled: true,
      order: 0,
      data: {
        groomName: 'Rajesh Kumar',
        brideName: 'Priya Sharma',
        weddingDate: '2025-02-14',
        tagline: 'Two Hearts, One Soul',
        showDivider: true
      }
    },

    // 2. Blessing Section
    {
      id: 'blessing',
      type: 'BlessingSection',
      enabled: true,
      order: 1,
      data: {
        title: 'Blessings',
        blessingText: 'शुभ विवाह\n\nWith the blessings of Lord Ganesha and the love of our families, we invite you to celebrate our union.',
        showIcon: true,
        alignment: 'center'
      }
    },

    // 3. Parents Section
    {
      id: 'parents',
      type: 'ParentsSection',
      enabled: true,
      order: 2,
      data: {
        groomParents: {
          father: 'Mr. Ramesh Kumar',
          mother: 'Mrs. Sunita Kumar'
        },
        brideParents: {
          father: 'Mr. Vijay Sharma',
          mother: 'Mrs. Anita Sharma'
        },
        showTitle: true,
        title: 'With Blessings From'
      }
    },

    // 4. Event Section
    {
      id: 'event',
      type: 'EventSection',
      enabled: true,
      order: 3,
      data: {
        eventName: 'Wedding Ceremony',
        date: '2025-02-14',
        time: '10:00 AM',
        venue: 'The Grand Palace',
        address: '123 Heritage Road, Satellite, Ahmedabad, Gujarat 380015',
        description: 'Join us for the sacred union of two souls in the presence of family and friends.',
        showMap: true
      }
    },

    // 5. Message Section
    {
      id: 'message',
      type: 'MessageSection',
      enabled: true,
      order: 4,
      data: {
        title: 'A Special Message',
        message: 'Your presence on our special day would mean the world to us. Please join us as we begin our journey together.',
        author: 'Rajesh & Priya',
        showQuotes: true
      }
    },

    // 6. Custom Text Section
    {
      id: 'customText',
      type: 'CustomTextSection',
      enabled: true,
      order: 5,
      data: {
        title: 'Our Love Story',
        content: 'We met in college, became best friends, and fell in love. After 5 beautiful years together, we are ready to take the next step in our journey.',
        alignment: 'left',
        showDivider: true
      }
    },

    // 7. Family List Section
    {
      id: 'familyList',
      type: 'FamilyListSection',
      enabled: true,
      order: 6,
      data: {
        title: 'Our Families',
        groomFamily: [
          { name: 'Mr. Ramesh Kumar', relation: 'Father' },
          { name: 'Mrs. Sunita Kumar', relation: 'Mother' },
          { name: 'Rahul Kumar', relation: 'Brother' },
          { name: 'Neha Kumar', relation: 'Sister' }
        ],
        brideFamily: [
          { name: 'Mr. Vijay Sharma', relation: 'Father' },
          { name: 'Mrs. Anita Sharma', relation: 'Mother' },
          { name: 'Rohit Sharma', relation: 'Brother' },
          { name: 'Pooja Sharma', relation: 'Sister' }
        ]
      }
    },

    // 8. Gallery Section
    {
      id: 'gallery',
      type: 'GallerySection',
      enabled: true,
      order: 7,
      data: {
        title: 'Our Moments',
        images: [
          {
            url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
            caption: 'Engagement Day',
            alt: 'Couple at engagement'
          },
          {
            url: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800',
            caption: 'Pre-Wedding Shoot',
            alt: 'Pre-wedding photoshoot'
          },
          {
            url: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=800',
            caption: 'Together Forever',
            alt: 'Couple portrait'
          },
          {
            url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800',
            caption: 'Family Time',
            alt: 'With family'
          }
        ],
        layout: 'grid'
      }
    },

    // 9. Photo Gallery Section
    {
      id: 'photoGallery',
      type: 'PhotoGallerySection',
      enabled: true,
      order: 8,
      data: {
        title: 'Photo Gallery',
        photos: [
          { id: 'photo1', url: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=600', caption: 'Beautiful Moment' },
          { id: 'photo2', url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600', caption: 'Together Forever' },
          { id: 'photo3', url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600', caption: 'Love & Joy' },
          { id: 'photo4', url: 'https://images.unsplash.com/photo-1623039405147-547794f92e9e?w=600', caption: 'Special Day' },
          { id: 'photo5', url: 'https://images.unsplash.com/photo-1525258638128-f8ef7020f4f1?w=600', caption: 'Happy Couple' },
          { id: 'photo6', url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600', caption: 'Celebration' }
        ],
        columns: 3,
        layout: 'grid'
      }
    },

    // 10. Video Section
    {
      id: 'video',
      type: 'VideoSection',
      enabled: true,
      order: 9,
      data: {
        title: 'Our Story',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        description: 'Watch our journey together',
        showThumbnail: true
      }
    },

    // 11. Timeline Section
    {
      id: 'timeline',
      type: 'TimelineSection',
      enabled: true,
      order: 10,
      data: {
        title: 'Wedding Events',
        events: [
          {
            title: 'Mehendi Ceremony',
            date: '2025-02-12',
            time: '4:00 PM',
            venue: 'Bride\'s Residence',
            description: 'Traditional henna application ceremony'
          },
          {
            title: 'Sangeet Night',
            date: '2025-02-13',
            time: '7:00 PM',
            venue: 'The Grand Palace',
            description: 'Music, dance, and celebration'
          },
          {
            title: 'Wedding Ceremony',
            date: '2025-02-14',
            time: '10:00 AM',
            venue: 'The Grand Palace',
            description: 'Sacred wedding rituals'
          },
          {
            title: 'Reception',
            date: '2025-02-14',
            time: '7:00 PM',
            venue: 'The Grand Palace',
            description: 'Dinner and celebration'
          }
        ]
      }
    },

    // 12. Map Section
    {
      id: 'map',
      type: 'MapSection',
      enabled: true,
      order: 11,
      data: {
        title: 'Venue Location',
        address: 'The Grand Palace, 123 Heritage Road, Satellite, Ahmedabad, Gujarat 380015',
        embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.9882826304693!2d72.52430831496278!3d23.02579792184949!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848aba5bd449%3A0x4fcedd11614f6516!2sAhmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1234567890123',
        showDirections: true
      }
    },

    // 13. Hotels Section
    {
      id: 'hotels',
      type: 'HotelsSection',
      enabled: true,
      order: 12,
      data: {
        title: 'Accommodation',
        hotels: [
          {
            name: 'Hotel Grand Plaza',
            address: '456 Main Street, Ahmedabad',
            phone: '+91 79 1234 5678',
            distance: '2 km from venue',
            website: 'https://hotelgrandplaza.com',
            rating: 4.5
          },
          {
            name: 'The Heritage Inn',
            address: '789 Heritage Road, Ahmedabad',
            phone: '+91 79 8765 4321',
            distance: '1 km from venue',
            website: 'https://heritageinn.com',
            rating: 4.8
          },
          {
            name: 'Comfort Suites',
            address: '321 Station Road, Ahmedabad',
            phone: '+91 79 5555 6666',
            distance: '3 km from venue',
            website: 'https://comfortsuites.com',
            rating: 4.2
          }
        ]
      }
    },

    // 14. Dress Code Section
    {
      id: 'dressCode',
      type: 'DressCodeSection',
      enabled: true,
      order: 13,
      data: {
        title: 'Dress Code',
        description: 'Traditional Indian Attire Preferred',
        suggestions: [
          {
            event: 'Mehendi',
            dress: 'Bright colors - Yellow, Green, Orange',
            note: 'Comfortable attire for henna application'
          },
          {
            event: 'Sangeet',
            dress: 'Festive Indian Wear',
            note: 'Get ready to dance!'
          },
          {
            event: 'Wedding',
            dress: 'Traditional Formal',
            note: 'Sarees, Lehengas, Sherwani, Kurta Pajama'
          },
          {
            event: 'Reception',
            dress: 'Elegant Evening Wear',
            note: 'Indo-Western accepted'
          }
        ]
      }
    },

    // 15. RSVP Section
    {
      id: 'rsvp',
      type: 'RSVPSection',
      enabled: true,
      order: 14,
      data: {
        title: 'RSVP',
        message: 'Please let us know if you can join us',
        deadline: '2025-02-01',
        showForm: true
      }
    },

    // 16. RSVP Form Section
    {
      id: 'rsvpForm',
      type: 'RSVPFormSection',
      enabled: true,
      order: 15,
      data: {
        title: 'Confirm Your Attendance',
        fields: [
          { name: 'name', label: 'Full Name', required: true },
          { name: 'email', label: 'Email', required: true },
          { name: 'phone', label: 'Phone Number', required: false },
          { name: 'guests', label: 'Number of Guests', required: true },
          { name: 'message', label: 'Special Message', required: false }
        ]
      }
    },

    // 17. Gift Registry Section
    {
      id: 'giftRegistry',
      type: 'GiftRegistrySection',
      enabled: true,
      order: 16,
      data: {
        title: 'Gift Registry',
        message: 'Your presence is the greatest gift, but if you wish to bless us...',
        registries: [
          {
            name: 'Amazon Wedding Registry',
            url: 'https://amazon.in/wedding/registry',
            icon: 'gift'
          },
          {
            name: 'Honeymoon Fund',
            url: 'https://honeyfund.com/rajesh-priya',
            icon: 'plane'
          }
        ],
        showCashGift: true,
        cashGiftMessage: 'Cash gifts can be handed to the parents'
      }
    },

    // 18. Social Media Section
    {
      id: 'socialMedia',
      type: 'SocialMediaSection',
      enabled: true,
      order: 17,
      data: {
        title: 'Share Our Joy',
        hashtag: '#RajeshPriyaWedding',
        message: 'Share your photos and memories using our wedding hashtag',
        platforms: [
          { name: 'Instagram', url: 'https://instagram.com/rajeshpriyawedding', handle: '@rajeshpriyawedding' },
          { name: 'Facebook', url: 'https://facebook.com/rajeshpriyawedding', handle: 'RajeshPriyaWedding' }
        ]
      }
    },

    // 19. Contact Section
    {
      id: 'contact',
      type: 'ContactSection',
      enabled: true,
      order: 18,
      data: {
        title: 'Contact Us',
        contacts: [
          {
            name: 'Groom\'s Family',
            person: 'Mr. Ramesh Kumar',
            phone: '+91 98765 43210',
            email: 'ramesh.kumar@email.com'
          },
          {
            name: 'Bride\'s Family',
            person: 'Mr. Vijay Sharma',
            phone: '+91 98765 12345',
            email: 'vijay.sharma@email.com'
          },
          {
            name: 'Wedding Planner',
            person: 'Perfect Events Co.',
            phone: '+91 79 1234 5678',
            email: 'events@perfectevents.com'
          }
        ]
      }
    }
  ],

  // Additional metadata
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  published_at: new Date().toISOString(),
  view_count: 0
}

// Individual section data exports for testing
export const MOCK_SECTION_DATA = {
  header: MOCK_INVITATION_DATA.sections[0].data,
  blessing: MOCK_INVITATION_DATA.sections[1].data,
  parents: MOCK_INVITATION_DATA.sections[2].data,
  event: MOCK_INVITATION_DATA.sections[3].data,
  message: MOCK_INVITATION_DATA.sections[4].data,
  customText: MOCK_INVITATION_DATA.sections[5].data,
  familyList: MOCK_INVITATION_DATA.sections[6].data,
  gallery: MOCK_INVITATION_DATA.sections[7].data,
  photoGallery: MOCK_INVITATION_DATA.sections[8].data,
  video: MOCK_INVITATION_DATA.sections[9].data,
  timeline: MOCK_INVITATION_DATA.sections[10].data,
  map: MOCK_INVITATION_DATA.sections[11].data,
  hotels: MOCK_INVITATION_DATA.sections[12].data,
  dressCode: MOCK_INVITATION_DATA.sections[13].data,
  rsvp: MOCK_INVITATION_DATA.sections[14].data,
  rsvpForm: MOCK_INVITATION_DATA.sections[15].data,
  giftRegistry: MOCK_INVITATION_DATA.sections[16].data,
  socialMedia: MOCK_INVITATION_DATA.sections[17].data,
  contact: MOCK_INVITATION_DATA.sections[18].data,
}
