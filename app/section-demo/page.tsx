'use client'

import { useState } from 'react'
import { SectionManager } from '@/components/features/SectionManager'
import { SectionBasedTemplate } from '@/components/templates/SectionBasedTemplate'
import { DEFAULT_SECTIONS, type SectionConfig, type SectionBasedInvitation } from '@/types/section'

export default function SectionDemoPage() {
  // Initialize with default sections
  const [sections, setSections] = useState<SectionConfig[]>(DEFAULT_SECTIONS)
  
  // Sample data for ALL sections
  const getSampleDataForSection = (sectionId: string) => {
    switch (sectionId) {
      case 'blessing':
        return { type: 'ganesh', text: '|| શ્રી ગણેશાય નમઃ ||', language: 'gu', showIcon: true }
      case 'header':
        return { groomName: 'Raj', brideName: 'Priya', groomTitle: 'Shri', brideTitle: 'Smt.' }
      case 'parents':
        return { groomParents: 'Mr. & Mrs. Ramesh Patel', brideParents: 'Mr. & Mrs. Suresh Shah', showParentNames: true }
      case 'event-main':
        return { eventName: 'Wedding Ceremony', date: '2025-02-14T10:00:00', time: '10:00 AM', venue: 'Swaminarayan Temple', venueAddress: 'Shahibaug, Ahmedabad', description: 'Join us for the sacred ceremony' }
      case 'event-mehendi':
        return { eventName: 'Mehendi Ceremony', date: '2025-02-12T04:00:00', time: '4:00 PM', venue: "Bride's Residence", venueAddress: 'Satellite, Ahmedabad' }
      case 'event-sangeet':
        return { eventName: 'Sangeet Night', date: '2025-02-13T07:00:00', time: '7:00 PM', venue: 'Grand Ballroom, Hotel Taj', venueAddress: 'S.G. Highway, Ahmedabad' }
      case 'event-haldi':
        return { eventName: 'Haldi Ceremony', date: '2025-02-13T10:00:00', time: '10:00 AM', venue: "Groom's Residence", venueAddress: 'Maninagar, Ahmedabad' }
      case 'event-reception':
        return { eventName: 'Reception', date: '2025-02-15T07:00:00', time: '7:00 PM', venue: 'Grand Ballroom', venueAddress: 'S.G. Highway, Ahmedabad' }
      case 'message':
        return { message: 'We joyfully invite you to celebrate our wedding ceremony. Your presence will make our day more special and memorable.', author: 'Raj & Priya' }
      case 'custom-text-1':
        return { title: 'Special Message', content: 'આપના આશીર્વાદ અમારા માટે ખૂબ જ મહત્વના છે.\nYour blessings mean the world to us.', textAlign: 'center', language: 'both', showBorder: true }
      case 'family-list':
        return {
          title: 'અંતરના અભિલાષી',
          subtitle: 'Family Members',
          category: 'both',
          groomFamily: [
            { name: 'શ્રી રમેશભાઈ પટેલ', relation: 'પિતા' },
            { name: 'શ્રી કિશોરભાઈ પટેલ', relation: 'કાકા' },
            { name: 'શ્રી મહેશભાઈ પટેલ', relation: 'કાકા' }
          ],
          brideFamily: [
            { name: 'શ્રી સુરેશભાઈ શાહ', relation: 'પિતા' },
            { name: 'શ્રી દિનેશભાઈ શાહ', relation: 'કાકા' },
            { name: 'શ્રી જયેશભાઈ શાહ', relation: 'મામા' }
          ],
          layout: 'two-column'
        }
      case 'gallery':
        return {
          title: 'Our Moments',
          photos: [
            { id: '1', url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=500', caption: 'Together Forever' }
          ],
          layout: 'single'
        }
      case 'timeline':
        return {
          title: 'કાર્યક્રમ',
          events: [
            { time: '10:00 AM', title: 'મંડપ મુહૂર્ત', description: 'Mandap setup ceremony', location: 'Venue Hall' },
            { time: '4:00 PM', title: 'મેહંદી', description: 'Mehendi ceremony', location: "Bride's Home" },
            { time: '7:00 PM', title: 'સંગીત', description: 'Sangeet night', location: 'Grand Ballroom' }
          ]
        }
      case 'map':
        return { title: 'સ્થળ', venueName: 'Swaminarayan Temple', address: 'Shahibaug, Ahmedabad, Gujarat', googleMapsUrl: 'https://maps.google.com' }
      case 'hotels':
        return {
          title: 'હોટેલ સૂચન',
          hotels: [
            { name: 'Hotel Taj', address: 'S.G. Highway, Ahmedabad', distance: '2 km from venue', phone: '+91 1234567890' },
            { name: 'The Grand Bhagwati', address: 'Satellite Road, Ahmedabad', distance: '3 km from venue', phone: '+91 0987654321' }
          ]
        }
      case 'dress-code':
        return { title: 'ડ્રેસ કોડ', code: 'Traditional Indian Attire', description: 'Please wear traditional Indian clothes', colors: ['#F97316', '#EC4899', '#FBBF24'] }
      case 'rsvp':
        return { title: 'RSVP', description: 'Please confirm your presence', rsvpUrl: 'https://example.com/rsvp', deadline: 'February 10, 2025', showGuestCount: true }
      case 'contact':
        return {
          title: 'સંપર્ક',
          contacts: [
            { name: 'Ramesh Patel', relation: "Groom's Father", phone: '+91 98765 43210', email: 'ramesh@example.com' },
            { name: 'Suresh Shah', relation: "Bride's Father", phone: '+91 98765 12345', email: 'suresh@example.com' }
          ]
        }
      default:
        return {}
    }
  }

  // Sample invitation data with ALL sections
  const [invitation, setInvitation] = useState<SectionBasedInvitation>({
    id: 'demo-1',
    user_id: 'demo-user',
    template_id: 'garba-night',
    title: 'Raj & Priya Wedding',
    theme: {
      primaryColor: '#F97316',
    },
    sections: DEFAULT_SECTIONS.map(section => ({
      id: section.id,
      config: section,
      data: getSampleDataForSection(section.id) as any
    })),
    status: 'draft',
    slug: 'raj-priya-wedding',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  })

  // Update invitation when sections change
  const handleSectionsChange = (newSections: SectionConfig[]) => {
    setSections(newSections)
    
    // Update invitation sections
    setInvitation(prev => ({
      ...prev,
      sections: prev.sections.map(section => ({
        ...section,
        config: newSections.find(s => s.id === section.id) || section.config
      }))
    }))
  }

  // Update section data when edited
  const handleSectionDataChange = (sectionId: string, data: any) => {
    setInvitation(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId
          ? { ...section, data }
          : section
      )
    }))
  }

  const handleColorChange = (color: string) => {
    setInvitation(prev => ({
      ...prev,
      theme: {
        ...prev.theme,
        primaryColor: color,
      }
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-playfair text-2xl font-bold text-gray-900">
                Section-Based Editor
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                ✨ Toggle sections • Reorder • Live preview
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">Theme:</label>
                <input
                  type="color"
                  value={invitation.theme.primaryColor}
                  onChange={(e) => handleColorChange(e.target.value)}
                  className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                />
              </div>
              <button className="px-6 py-2 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition-colors">
                Save Draft
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Section Manager */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Manage Sections</h2>
                <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full">
                  ● Live Updates
                </span>
              </div>
              
              <SectionManager 
                sections={sections}
                onSectionsChange={handleSectionsChange}
                onSectionDataChange={handleSectionDataChange}
                sectionDataMap={invitation.sections.reduce((acc, section) => ({
                  ...acc,
                  [section.id]: section.data
                }), {})}
              />
            </div>

            {/* Info Card */}
            <div className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-xl shadow-lg p-6 border-2 border-orange-200">
              <div className="flex items-start gap-4 mb-4">
                <div className="text-4xl">🎉</div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Section-Based System</h3>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>✅ Add/remove sections as needed</li>
                    <li>✅ Reorder with ↑↓ buttons</li>
                    <li>✅ Each section has built-in animations</li>
                    <li>✅ Perfect for variable-length cards</li>
                    <li>✅ Mobile-friendly</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Available Sections */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-semibold mb-4">Available Section Types</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {DEFAULT_SECTIONS.map(section => (
                  <div 
                    key={section.id}
                    className="flex items-center gap-2 p-2 bg-gray-50 rounded"
                  >
                    <span>{section.icon}</span>
                    <span className="text-gray-700">{section.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Live Preview */}
          <div className="lg:sticky lg:top-24 space-y-4">
            <div className="bg-white rounded-xl shadow-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Live Preview</h3>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Live
                </span>
              </div>
              
              <div className="border-2 border-gray-200 rounded-xl overflow-hidden bg-gray-100">
                <div className="aspect-[3/4] overflow-y-auto">
                  <SectionBasedTemplate invitation={invitation} preview />
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-3 gap-2 text-center text-sm">
                <div className="bg-primary-50 p-2 rounded">
                  <div className="font-bold text-primary-700">
                    {sections.filter(s => s.enabled).length}
                  </div>
                  <div className="text-gray-600">Active</div>
                </div>
                <div className="bg-secondary-50 p-2 rounded">
                  <div className="font-bold text-secondary-700">
                    {invitation.sections.length}
                  </div>
                  <div className="text-gray-600">Total</div>
                </div>
                <div className="bg-gold-50 p-2 rounded">
                  <div className="font-bold text-gold-700">60fps</div>
                  <div className="text-gray-600">Smooth</div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl shadow-lg p-6 text-white">
              <h3 className="text-xl font-bold mb-2">Ready to Download?</h3>
              <p className="mb-4 text-sm opacity-90">
                High quality, no watermark, edit anytime
              </p>
              <button className="w-full bg-white text-primary-600 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                Download for ₹299 →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
