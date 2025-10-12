# 🌐 LANGUAGE TOGGLE SYSTEM

**English + Gujarati UI Language Support**

---

## 🎯 REQUIREMENT

From user request:
- ✅ English and Gujarati option to toggle
- ✅ Simple implementation (not full i18n framework for 2 languages)
- ✅ Fast and lightweight

---

## 📦 IMPLEMENTATION APPROACH

**Using Context API (No heavy i18n library needed for 2 languages)**

---

## 🔧 LANGUAGE CONTEXT

**File:** `contexts/LanguageContext.tsx`

```typescript
'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Language = 'en' | 'gu'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')

  // Load saved language preference
  useEffect(() => {
    const saved = localStorage.getItem('language') as Language
    if (saved === 'en' || saved === 'gu') {
      setLanguageState(saved)
    }
  }, [])

  // Save language preference
  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
  }

  // Translation function
  const t = (key: string): string => {
    const keys = key.split('.')
    let value: any = translations[language]
    
    for (const k of keys) {
      value = value?.[k]
    }
    
    return value || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}

// Translations
const translations = {
  en: {
    common: {
      loading: 'Loading...',
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      close: 'Close',
      next: 'Next',
      back: 'Back',
      submit: 'Submit',
      search: 'Search',
    },
    nav: {
      home: 'Home',
      templates: 'Templates',
      pricing: 'Pricing',
      dashboard: 'Dashboard',
      logout: 'Logout',
    },
    home: {
      hero: {
        title: 'Create Beautiful Digital Invitations',
        subtitle: 'Design stunning invitations in minutes. Perfect for weddings, birthdays, and celebrations.',
        cta: 'Start Creating Free',
        demo: 'Try Demo',
      },
      categories: {
        title: 'Choose Your Occasion',
        kankotri: 'Kankotri',
        kankotriDesc: 'Traditional Gujarati wedding invitations',
        cards: 'Cards',
        cardsDesc: 'Birthday, anniversary, and celebration cards',
      },
    },
    templates: {
      title: 'Choose a Template',
      kankotri: 'Wedding Invitations',
      cards: 'Celebration Cards',
      preview: 'Preview',
      customize: 'Customize',
      free: 'Free',
      premium: 'Premium',
    },
    editor: {
      title: 'Customize Your Invitation',
      preview: 'Live Preview',
      details: 'Event Details',
      design: 'Design',
      guests: 'Guest List',
      download: 'Download',
      share: 'Share',
    },
    auth: {
      login: 'Login',
      signup: 'Sign Up',
      email: 'Email',
      password: 'Password',
      forgotPassword: 'Forgot Password?',
      noAccount: "Don't have an account?",
      haveAccount: 'Already have an account?',
      signInWithGoogle: 'Sign in with Google',
      signUpWithGoogle: 'Sign up with Google',
    },
    payment: {
      title: 'Complete Your Purchase',
      total: 'Total',
      pay: 'Pay Now',
      processing: 'Processing...',
      success: 'Payment Successful!',
      failed: 'Payment Failed',
    },
    guests: {
      title: 'Guest List',
      addGuest: 'Add Guest',
      importCSV: 'Import CSV',
      totalGuests: 'Total Guests',
      accepted: 'Accepted',
      declined: 'Declined',
      pending: 'Pending',
      name: 'Name',
      phone: 'Phone',
      email: 'Email',
      relationship: 'Relationship',
      side: 'Side',
      groom: "Groom's Side",
      bride: "Bride's Side",
      both: 'Both',
      plusOne: 'Allow +1 guest',
    },
  },
  gu: {
    common: {
      loading: 'લોડ થઈ રહ્યું છે...',
      save: 'સાચવો',
      cancel: 'રદ કરો',
      delete: 'કાઢી નાખો',
      edit: 'સુધારો',
      close: 'બંધ કરો',
      next: 'આગળ',
      back: 'પાછા',
      submit: 'મોકલો',
      search: 'શોધો',
    },
    nav: {
      home: 'હોમ',
      templates: 'ટેમ્પલેટ્સ',
      pricing: 'કિંમત',
      dashboard: 'ડેશબોર્ડ',
      logout: 'લોગઆઉટ',
    },
    home: {
      hero: {
        title: 'સુંદર ડિજિટલ આમંત્રણો બનાવો',
        subtitle: 'મિનિટોમાં આકર્ષક આમંત્રણો ડિઝાઇન કરો. લગ્ન, જન્મદિવસ અને ઉત્સવો માટે યોગ્ય.',
        cta: 'મફત બનાવવાનું શરૂ કરો',
        demo: 'ડેમો અજમાવો',
      },
      categories: {
        title: 'તમારો પ્રસંગ પસંદ કરો',
        kankotri: 'કાંકોત્રી',
        kankotriDesc: 'પરંપરાગત ગુજરાતી લગ્ન આમંત્રણો',
        cards: 'કાર્ડ્સ',
        cardsDesc: 'જન્મદિવસ, સાલગિરહ અને ઉત્સવ કાર્ડ્સ',
      },
    },
    templates: {
      title: 'ટેમ્પલેટ પસંદ કરો',
      kankotri: 'લગ્ન આમંત્રણો',
      cards: 'ઉત્સવ કાર્ડ્સ',
      preview: 'પૂર્વાવલોકન',
      customize: 'કસ્ટમાઇઝ',
      free: 'મફત',
      premium: 'પ્રીમિયમ',
    },
    editor: {
      title: 'તમારું આમંત્રણ કસ્ટમાઇઝ કરો',
      preview: 'લાઈવ પૂર્વાવલોકન',
      details: 'કાર્યક્રમની વિગતો',
      design: 'ડિઝાઇન',
      guests: 'મહેમાન યાદી',
      download: 'ડાઉનલોડ',
      share: 'શેર કરો',
    },
    auth: {
      login: 'લૉગિન',
      signup: 'સાઇન અપ',
      email: 'ઈમેલ',
      password: 'પાસવર્ડ',
      forgotPassword: 'પાસવર્ડ ભૂલી ગયા?',
      noAccount: 'એકાઉન્ટ નથી?',
      haveAccount: 'પહેલેથી એકાઉન્ટ છે?',
      signInWithGoogle: 'Google સાથે સાઇન ઇન કરો',
      signUpWithGoogle: 'Google સાથે સાઇન અપ કરો',
    },
    payment: {
      title: 'તમારી ખરીદી પૂર્ણ કરો',
      total: 'કુલ',
      pay: 'હવે ચૂકવો',
      processing: 'પ્રક્રિયા કરી રહ્યાં છીએ...',
      success: 'ચુકવણી સફળ!',
      failed: 'ચુકવણી નિષ્ફળ',
    },
    guests: {
      title: 'મહેમાન યાદી',
      addGuest: 'મહેમાન ઉમેરો',
      importCSV: 'CSV આયાત કરો',
      totalGuests: 'કુલ મહેમાનો',
      accepted: 'સ્વીકાર્યું',
      declined: 'નકાર્યું',
      pending: 'બાકી',
      name: 'નામ',
      phone: 'ફોન',
      email: 'ઈમેલ',
      relationship: 'સંબંધ',
      side: 'બાજુ',
      groom: 'વરરાજાની બાજુ',
      bride: 'કન્યાની બાજુ',
      both: 'બંને',
      plusOne: '+1 મહેમાનને મંજૂરી આપો',
    },
  },
}
```

---

## 🎨 LANGUAGE TOGGLE COMPONENT

**File:** `components/ui/LanguageToggle.tsx`

```typescript
'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { Button } from '@/components/ui/button'
import { Globe } from 'lucide-react'

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLanguage(language === 'en' ? 'gu' : 'en')}
      className="gap-2"
    >
      <Globe className="w-4 h-4" />
      <span className="font-medium">
        {language === 'en' ? 'ગુજરાતી' : 'English'}
      </span>
    </Button>
  )
}
```

---

## 🎨 DROPDOWN LANGUAGE SELECTOR

**File:** `components/ui/LanguageSelector.tsx`

```typescript
'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Globe, Check } from 'lucide-react'

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Globe className="w-4 h-4" />
          {language === 'en' ? 'English' : 'ગુજરાતી'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLanguage('en')}>
          <span className="flex-1">English</span>
          {language === 'en' && <Check className="w-4 h-4" />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('gu')}>
          <span className="flex-1">ગુજરાતી</span>
          {language === 'gu' && <Check className="w-4 h-4" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

---

## 📱 USAGE EXAMPLE

```typescript
'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { Button } from '@/components/ui/button'

export function HomePage() {
  const { t } = useLanguage()

  return (
    <div>
      <h1>{t('home.hero.title')}</h1>
      <p>{t('home.hero.subtitle')}</p>
      <Button>{t('home.hero.cta')}</Button>
    </div>
  )
}
```

---

## 🔧 ROOT LAYOUT SETUP

**File:** `app/layout.tsx`

```typescript
import { LanguageProvider } from '@/contexts/LanguageContext'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
```

---

## 🎯 ADD TRANSLATIONS AS NEEDED

When creating new features, add translations to both languages:

```typescript
const translations = {
  en: {
    // ... existing
    newFeature: {
      title: 'New Feature',
      description: 'This is a new feature',
    },
  },
  gu: {
    // ... existing
    newFeature: {
      title: 'નવી વિશેષતા',
      description: 'આ એક નવી વિશેષતા છે',
    },
  },
}
```

---

## 📍 WHERE TO ADD LANGUAGE TOGGLE

1. **Header/Navbar** - Top right corner
2. **Footer** - Bottom section
3. **Mobile Menu** - In hamburger menu
4. **Settings Page** - User preferences

---

## ✅ FEATURES

- ✅ Simple toggle between English and Gujarati
- ✅ Saves user preference to localStorage
- ✅ Lightweight (no external library)
- ✅ Easy to add new translations
- ✅ Type-safe with TypeScript
- ✅ Context-based for global access
- ✅ Mobile-friendly UI

---

**Simple, fast, and effective for bilingual support!**
