'use client'

import { useState } from 'react'
import type { SectionType, SectionData } from '@/types/section'

interface SectionFormProps {
  sectionType: SectionType
  sectionId: string
  data: SectionData
  onSave: (data: SectionData) => void
  onCancel: () => void
  inline?: boolean
}

export function SectionForm({ sectionType, sectionId, data, onSave, onCancel, inline = false }: SectionFormProps) {
  const [formData, setFormData] = useState<any>(data)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  const renderForm = () => {
    // Use sectionId for matching since it's the actual section identifier
    const formType = sectionId || sectionType
    
    switch (formType as any) {
      case 'header':
        return (
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Groom Title</label>
                <input
                  type="text"
                  value={formData.groomTitle || ''}
                  onChange={(e) => setFormData({ ...formData, groomTitle: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Shri / Mr."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Groom Name *</label>
                <input
                  type="text"
                  value={formData.groomName || ''}
                  onChange={(e) => setFormData({ ...formData, groomName: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Raj"
                  required
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Bride Title</label>
                <input
                  type="text"
                  value={formData.brideTitle || ''}
                  onChange={(e) => setFormData({ ...formData, brideTitle: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Smt. / Ms."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Bride Name *</label>
                <input
                  type="text"
                  value={formData.brideName || ''}
                  onChange={(e) => setFormData({ ...formData, brideName: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Priya"
                  required
                />
              </div>
            </div>
          </div>
        )

      case 'blessing':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Type</label>
              <select
                value={formData.type || 'ganesh'}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="ganesh">Ganesh</option>
                <option value="swaminarayan">Swaminarayan</option>
                <option value="custom">Custom</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Blessing Text</label>
              <input
                type="text"
                value={formData.text || ''}
                onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="|| શ્રી ગણેશાય નમઃ ||"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Language</label>
              <select
                value={formData.language || 'gu'}
                onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="en">English</option>
                <option value="gu">Gujarati</option>
                <option value="both">Both</option>
              </select>
            </div>
          </div>
        )

      case 'header':
        return (
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Groom Title</label>
                <input
                  type="text"
                  value={formData.groomTitle || ''}
                  onChange={(e) => setFormData({ ...formData, groomTitle: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Shri / Mr."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Groom Name *</label>
                <input
                  type="text"
                  value={formData.groomName || ''}
                  onChange={(e) => setFormData({ ...formData, groomName: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Raj"
                  required
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Bride Title</label>
                <input
                  type="text"
                  value={formData.brideTitle || ''}
                  onChange={(e) => setFormData({ ...formData, brideTitle: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Smt. / Ms."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Bride Name *</label>
                <input
                  type="text"
                  value={formData.brideName || ''}
                  onChange={(e) => setFormData({ ...formData, brideName: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Priya"
                  required
                />
              </div>
            </div>
          </div>
        )

      case 'parents':
        return (
          <div className="space-y-4">
            <div>
              <label className="flex items-center gap-2 mb-4">
                <input
                  type="checkbox"
                  checked={formData.showParentNames || false}
                  onChange={(e) => setFormData({ ...formData, showParentNames: e.target.checked })}
                  className="w-4 h-4"
                />
                <span className="text-sm font-medium">Show parent names</span>
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Groom's Parents</label>
              <input
                type="text"
                value={formData.groomParents || ''}
                onChange={(e) => setFormData({ ...formData, groomParents: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Mr. & Mrs. Ramesh Patel"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Bride's Parents</label>
              <input
                type="text"
                value={formData.brideParents || ''}
                onChange={(e) => setFormData({ ...formData, brideParents: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Mr. & Mrs. Suresh Shah"
              />
            </div>
          </div>
        )

      case 'event':
      case 'event-main':
      case 'event-mehendi':
      case 'event-sangeet':
      case 'event-haldi':
      case 'event-reception':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Event Name *</label>
              <input
                type="text"
                value={formData.eventName || ''}
                onChange={(e) => setFormData({ ...formData, eventName: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Wedding Ceremony"
                required
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Date *</label>
                <input
                  type="date"
                  value={formData.date?.split('T')[0] || ''}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Time *</label>
                <input
                  type="time"
                  value={formData.time || ''}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Venue *</label>
              <input
                type="text"
                value={formData.venue || ''}
                onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Swaminarayan Temple"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Venue Address</label>
              <input
                type="text"
                value={formData.venueAddress || ''}
                onChange={(e) => setFormData({ ...formData, venueAddress: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Shahibaug, Ahmedabad"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                rows={3}
                placeholder="Join us for the sacred ceremony..."
              />
            </div>
          </div>
        )

      case 'message':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Message *</label>
              <textarea
                value={formData.message || ''}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                rows={5}
                placeholder="Your message here..."
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Author</label>
              <input
                type="text"
                value={formData.author || ''}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Raj & Priya"
              />
            </div>
          </div>
        )

      case 'custom-text':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title (Optional)</label>
              <input
                type="text"
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Special Message"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Content *</label>
              <textarea
                value={formData.content || ''}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg font-gujarati"
                rows={6}
                placeholder="આપના આશીર્વાદ અમારા માટે ખૂબ જ મહત્વના છે..."
                required
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Text Alignment</label>
                <select
                  value={formData.textAlign || 'center'}
                  onChange={(e) => setFormData({ ...formData, textAlign: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Language</label>
                <select
                  value={formData.language || 'both'}
                  onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="en">English</option>
                  <option value="gu">Gujarati</option>
                  <option value="both">Both</option>
                </select>
              </div>
            </div>
            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.showBorder || false}
                  onChange={(e) => setFormData({ ...formData, showBorder: e.target.checked })}
                  className="w-4 h-4"
                />
                <span className="text-sm font-medium">Show decorative border</span>
              </label>
            </div>
          </div>
        )

      case 'family-list':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title *</label>
              <input
                type="text"
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg font-gujarati"
                placeholder="અંતરના અભિલાષી"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Subtitle</label>
              <input
                type="text"
                value={formData.subtitle || ''}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Family Members"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Layout</label>
              <select
                value={formData.layout || 'two-column'}
                onChange={(e) => setFormData({ ...formData, layout: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="single-column">Single Column</option>
                <option value="two-column">Two Columns (Groom | Bride)</option>
              </select>
            </div>
            <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
              <p>💡 To add family members, you'll need the full form builder.</p>
              <p>Current data is preserved when you save.</p>
            </div>
          </div>
        )
      
      case 'gallery':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Our Moments"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Layout</label>
              <select
                value={formData.layout || 'grid'}
                onChange={(e) => setFormData({ ...formData, layout: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="single">Single Photo</option>
                <option value="grid">Grid Layout</option>
                <option value="carousel">Carousel</option>
              </select>
            </div>
            <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
              <p>💡 Photo upload coming soon!</p>
              <p>For now, sample photos are displayed.</p>
            </div>
          </div>
        )
      
      case 'timeline':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                value={formData.title || 'કાર્યક્રમ'}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg font-gujarati"
              />
            </div>
            <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
              <p>💡 Add timeline events using the full form builder.</p>
              <p>Current events are preserved when you save.</p>
            </div>
          </div>
        )
      
      case 'map':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                value={formData.title || 'સ્થળ'}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg font-gujarati"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Venue Name *</label>
              <input
                type="text"
                value={formData.venueName || ''}
                onChange={(e) => setFormData({ ...formData, venueName: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Swaminarayan Temple"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Address *</label>
              <textarea
                value={formData.address || ''}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                rows={2}
                placeholder="Shahibaug, Ahmedabad, Gujarat"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Google Maps URL</label>
              <input
                type="url"
                value={formData.googleMapsUrl || ''}
                onChange={(e) => setFormData({ ...formData, googleMapsUrl: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg text-sm"
                placeholder="https://maps.google.com/..."
              />
            </div>
          </div>
        )
      
      case 'hotels':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                value={formData.title || 'હોટેલ સૂચન'}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg font-gujarati"
              />
            </div>
            <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
              <p>💡 Add hotels using the full form builder.</p>
              <p>Current hotels are preserved when you save.</p>
            </div>
          </div>
        )
      
      case 'dress-code':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                value={formData.title || 'ડ્રેસ કોડ'}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg font-gujarati"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Dress Code *</label>
              <input
                type="text"
                value={formData.code || ''}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Traditional Indian Attire"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                rows={2}
                placeholder="Please wear traditional Indian clothes"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Note</label>
              <input
                type="text"
                value={formData.note || ''}
                onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg text-sm"
                placeholder="Optional additional note"
              />
            </div>
          </div>
        )
      
      case 'rsvp':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                value={formData.title || 'RSVP'}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                rows={2}
                placeholder="Please confirm your presence"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">RSVP URL *</label>
              <input
                type="url"
                value={formData.rsvpUrl || ''}
                onChange={(e) => setFormData({ ...formData, rsvpUrl: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="https://example.com/rsvp"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Deadline</label>
              <input
                type="text"
                value={formData.deadline || ''}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="February 10, 2025"
              />
            </div>
            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.showGuestCount || false}
                  onChange={(e) => setFormData({ ...formData, showGuestCount: e.target.checked })}
                  className="w-4 h-4"
                />
                <span className="text-sm font-medium">Show guest count option</span>
              </label>
            </div>
          </div>
        )
      
      case 'contact':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                value={formData.title || 'સંપર્ક'}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg font-gujarati"
              />
            </div>
            <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
              <p>💡 Add contacts using the full form builder.</p>
              <p>Current contacts are preserved when you save.</p>
            </div>
          </div>
        )

      // Handle alternative IDs (our new system) - map to correct forms
      case 'customText':
        // Use the custom-text form above
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title (Optional)</label>
              <input
                type="text"
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Special Message"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Content *</label>
              <textarea
                value={formData.content || ''}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg font-gujarati"
                rows={6}
                placeholder="આપના આશીર્વાદ અમારા માટે ખૂબ જ મહત્વના છે..."
                required
              />
            </div>
          </div>
        )

      case 'familyList':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title *</label>
              <input
                type="text"
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg font-gujarati"
                placeholder="અંતરના અભિલાષી"
                required
              />
            </div>
            <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
              <p>💡 To add family members, you'll need the full form builder.</p>
            </div>
          </div>
        )

      case 'dressCode':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Dress Code *</label>
              <input
                type="text"
                value={formData.code || ''}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Traditional Indian Attire"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                rows={2}
                placeholder="Please wear traditional Indian clothes"
              />
            </div>
          </div>
        )

      case 'photoGallery':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                value={formData.title || 'Photo Gallery'}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Our Memories"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Layout</label>
              <select
                value={formData.layout || 'masonry'}
                onChange={(e) => setFormData({ ...formData, layout: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="masonry">Masonry</option>
                <option value="grid">Grid</option>
                <option value="carousel">Carousel</option>
              </select>
            </div>
            <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
              <p>💡 Photo upload coming soon!</p>
            </div>
          </div>
        )

      case 'video':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Video URL *</label>
              <input
                type="url"
                value={formData.videoUrl || ''}
                onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="https://www.youtube.com/watch?v=..."
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Our Story"
              />
            </div>
            <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
              <p>💡 Supports YouTube and Vimeo links</p>
            </div>
          </div>
        )

      case 'rsvpForm':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Form Title</label>
              <input
                type="text"
                value={formData.title || 'Please RSVP'}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                rows={2}
                placeholder="We'd love to have you join us!"
              />
            </div>
            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.collectEmail || true}
                  onChange={(e) => setFormData({ ...formData, collectEmail: e.target.checked })}
                  className="w-4 h-4"
                />
                <span className="text-sm font-medium">Collect email addresses</span>
              </label>
            </div>
            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.collectPhone || false}
                  onChange={(e) => setFormData({ ...formData, collectPhone: e.target.checked })}
                  className="w-4 h-4"
                />
                <span className="text-sm font-medium">Collect phone numbers</span>
              </label>
            </div>
          </div>
        )

      case 'giftRegistry':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                value={formData.title || 'Gift Registry'}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea
                value={formData.message || ''}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                rows={3}
                placeholder="Your presence is the greatest gift..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Registry URL (Optional)</label>
              <input
                type="url"
                value={formData.registryUrl || ''}
                onChange={(e) => setFormData({ ...formData, registryUrl: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Payment Details (Optional)</label>
              <textarea
                value={formData.paymentDetails || ''}
                onChange={(e) => setFormData({ ...formData, paymentDetails: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                rows={2}
                placeholder="UPI ID, Bank details, etc."
              />
            </div>
          </div>
        )

      case 'socialMedia':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                value={formData.title || 'Share the Love'}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Wedding Hashtag</label>
              <input
                type="text"
                value={formData.hashtag || ''}
                onChange={(e) => setFormData({ ...formData, hashtag: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="#RajPriyaWedding"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Instagram Handle (Optional)</label>
              <input
                type="text"
                value={formData.instagram || ''}
                onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="@username"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea
                value={formData.message || ''}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                rows={2}
                placeholder="Share your photos using our hashtag!"
              />
            </div>
          </div>
        )

      default:
        return (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800">
              📝 Form for <strong>{sectionType}</strong> is coming soon!
            </p>
            <p className="text-xs text-yellow-600 mt-2">
              For now, sample data is being used.
            </p>
          </div>
        )
    }
  }

  // Inline mode: Render form directly without modal wrapper
  if (inline) {
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        {renderForm()}
        
        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors text-sm font-medium"
          >
            💾 Save
          </button>
        </div>
      </form>
    )
  }

  // Modal mode: Render in full-screen dialog (fallback for old usage)
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h3 className="text-xl font-semibold">Edit Section</h3>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {renderForm()}

          <div className="flex gap-3 mt-6 pt-6 border-t">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
