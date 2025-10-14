/**
 * Example Kankotri Data
 * 
 * Based on traditional Gujarati format from user's PDF examples
 */

import type { KankotriData } from '@/types/v2/kankotri';
import { kankotriConfig } from '@/components/templates-v2/themes/KankotriTemplate/kankotri-config';

export const exampleKankotri: KankotriData = {
  // Basic info
  id: 'kankotri-deep-nisha',
  userId: 'user-123',
  slug: 'deep-nisha-wedding',
  title: 'Deep & Nisha Wedding Kankotri',
  status: 'published',

  // Groom (વર)
  groom: {
    name: 'Deep',
    fullName: 'શ્રી દીપ કિશોરભાઈ મેસરા',
    fatherName: 'શ્રી કિશોરભાઈ પોપટભાઈ મેસરા',
    motherName: 'શ્રીમતી નિશાબેન કિશોરભાઈ મેસરા',
    grandfatherName: 'શ્રી પોપટભાઈ મેસરા',
    photo: '/images/groom.jpg',
  },

  // Bride (વધુ)
  bride: {
    name: 'Nisha',
    fullName: 'શ્રી નિશા મહુલભાઈ મેહતા',
    fatherName: 'શ્રી મહુલભાઈ કુંડનભાઈ મેહતા',
    motherName: 'શ્રીમતી ધરતીબેન મહુલભાઈ મેહતા',
    grandfatherName: 'શ્રી કુંડનભાઈ મેહતા',
    photo: '/images/bride.jpg',
  },

  // Host families (નિમંત્રક)
  hosts: {
    groomSide: [
      {
        name: 'કિશોરભાઈ પોપટભાઈ મેસરા',
        relation: 'પિતા',
        address: 'A-701, સ્વર્ગિક ટાવર, સરખેજ, અમદાવાદ',
      },
      {
        name: 'પોપટભાઈ નાથાભાઈ મેસરા',
        relation: 'દાદા',
        address: '',
      },
    ],
    brideSide: [
      {
        name: 'મહુલભાઈ કુંડનભાઈ મેહતા',
        relation: 'પિતા',
        address: 'B-502, પ્રશાંતિ રેસિડેન્સી, સટેલાઇટ, અમદાવાદ',
      },
    ],
  },

  // Religious invocation
  invocation: {
    deity: 'ganesh',
    text: '॥ શ્રી ગણેશાય નમઃ ॥',
    showSymbol: true,
  },

  // Multiple ceremonies (માંગલિક કાર્યક્રમો)
  ceremonies: [
    {
      id: 'mandap',
      name: 'Mandap Muhurat',
      nameGujarati: 'મંડપ મુહૂર્ત',
      date: new Date('2025-01-31'),
      time: '૫:૦૦ કલાકે સાંજે',
      venue: 'શ્રી મુરેશભાઈ નારણભાઈ મેહતા ચેરિટેબલ હોલ, સુરત',
      type: 'mandap',
    },
    {
      id: 'swagatam',
      name: 'Swagatam Bhojan',
      nameGujarati: 'સ્વાગતમ ભોજન',
      date: new Date('2025-01-30'),
      time: 'સાંજે ૮:૦૦ કલાકે',
      venue: 'કૃષ્ણકુંજ હોલ, સુરત',
      description: 'કુલ કુંભ મેળાની પરંપરા',
      type: 'swagatam',
    },
    {
      id: 'raj-garba',
      name: 'Raj Garba',
      nameGujarati: 'રાજ ગરબા',
      date: new Date('2025-01-30'),
      time: 'રાત્રે ૯:૩૦ કલાકે',
      venue: 'કૃષ્ણકુંજ હોલ, સુરત',
      type: 'garba',
    },
    {
      id: 'haldi',
      name: 'Haldi Ceremony',
      nameGujarati: 'હળદી રસમ',
      date: new Date('2025-01-31'),
      time: 'સવારે ૧૦:૦૦ કલાકે',
      venue: 'વર પક્ષની પ્રાગણ (કુટુંબ કાર્ય)',
      type: 'haldi',
    },
  ],

  // Wedding date
  wedding: {
    date: new Date('2025-01-31'),
    time: '૫:૦૦ કલાકે સાંજે',
    venue: {
      name: 'શ્રી મુરેશભાઈ નારણભાઈ મેહતા ચેરિટેબલ હોલ',
      address: 'પાંચરાત્રી રોડ, વરાછા',
      city: 'સુરત',
      state: 'ગુજરાત',
      pincode: '395006',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.6936!2d72.8258!3d21.1702!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1',
      phone: '૦૨૬૧ ૨૪૨૨૬૨૨',
    },
  },

  // Family members (both sides)
  families: {
    groomFamily: [
      { name: 'કિશોરભાઈ પોપટભાઈ મેસરા', relation: 'પિતા', prefix: 'શ્રી' },
      { name: 'નિશાબેન કિશોરભાઈ મેસરા', relation: 'માતા', prefix: 'શ્રીમતી' },
      { name: 'દિલીપભાઈ પોપટભાઈ મેસરા', relation: 'કાકા', prefix: 'શ્રી' },
      { name: 'હંસાબેન દિલીપભાઈ', relation: 'કાકી', prefix: 'શ્રીમતી' },
    ],
    brideFamily: [
      { name: 'મહુલભાઈ કુંડનભાઈ મેહતા', relation: 'પિતા', prefix: 'શ્રી' },
      { name: 'ધરતીબેન મહુલભાઈ મેહતા', relation: 'માતા', prefix: 'શ્રીમતી' },
      { name: 'સંજયભાઈ કુંડનભાઈ', relation: 'માસા', prefix: 'શ્રી' },
    ],
  },

  // Blessing givers (આશીર્વાદકર્તા)
  blessings: {
    groomElders: [
      { name: 'પોપટભાઈ નાથાભાઈ મેસરા', relation: 'દાદા', side: 'groom' },
      { name: 'હરતીબેન પોપટભાઈ', relation: 'દાદી', side: 'groom' },
    ],
    brideElders: [
      { name: 'કુંડનભાઈ રમેશભાઈ મેહતા', relation: 'દાદા', side: 'bride' },
    ],
  },

  // Invitation text in Gujarati
  invitationText: {
    gujarati: `
અહેવાલ મૂળ પ્રવાહની સાથ અજવાળીયું કે
અમારા કુળનો તેઓ બધાંની માલાની અસીમ કુસુમાની
શ્વેતઝા નિત્યાની (ઠાલા સુરતી)

અ.ક. ભાવતાભૈન તથા શ્રી કિશોરભાઈ પોપટભાઈ મેસરા સુપુત્રાની આશીર્વાદ

શ્રી દીપ 💐 શ્રી નિશા

દેશના નિરવાનો (ઠાલા સુરતી)
અ.ક. મહુલભૈન તથા શ્રી કુંડનભાઈ નારણભાઈ રમેશભાઈ સુપુત્રી સાથી
સુરત સટલટ મા હો સટે જે પુજ્યાત. તા. ૩૧/૦૧/૨૦૨૫ ના રોજ
શુભ સદકાના પોશના નિત્યાનીજી થે અનિન દેનની નાથીથી, પ્રોન્ના ઉદસહ સાથે
મજના વાતાવરણાઃ વસ્તી તજનાથો ભી પ્રોન્ના નપાનથી ની
આશીર્વાદસ અમારા ઝટે પરિસર પધારીને અમારી ભાણનું અમૃતય છે.
    `,
    english: 'We cordially invite you to bless the sacred union of Deep and Nisha',
  },

  // Couple photo
  couplePhoto: '/images/deep-nisha-cover.jpg',

  // Page configuration
  pages: {
    cover: true,
    invocation: true,
    invitation: true,
    ceremonies: true,
    families: false,
    blessings: false,
    venue: true,
  },

  // Customization
  customization: kankotriConfig,

  // Metadata
  viewCount: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
  publishedAt: new Date(),
};
