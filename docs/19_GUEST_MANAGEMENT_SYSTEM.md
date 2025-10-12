# 👥 GUEST MANAGEMENT SYSTEM (Phase 1)

**Frictionless guest list management with excellent UI/UX**

---

## 🎯 CRITICAL REQUIREMENTS

**From User Feedback:**
> "This feature is critical but it was too much buggy and also it feels like people filling government form, UI is also not good and flow is also not good, so make sure people like filling forms everywhere in the new project."

### Design Principles
1. ✅ **Simple First** - Start with just name and phone
2. ✅ **Progressive Disclosure** - Show advanced fields only when needed
3. ✅ **Bulk Import** - CSV/Excel import for convenience
4. ✅ **Smart Defaults** - Auto-fill common fields
5. ✅ **Visual Feedback** - Show progress, success states
6. ✅ **Mobile-Friendly** - Large touch targets, easy typing

---

## 📊 DATABASE SCHEMA UPDATES

```sql
-- Guest management tables (already in schema)

CREATE TABLE guests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invitation_id UUID REFERENCES invitations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  relationship TEXT, -- 'Family', 'Friend', 'Colleague', 'Other'
  side TEXT, -- 'Groom', 'Bride', 'Both'
  plus_one BOOLEAN DEFAULT false,
  rsvp_status TEXT DEFAULT 'pending', -- 'pending', 'accepted', 'declined'
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_guests_invitation ON guests(invitation_id);
CREATE INDEX idx_guests_rsvp ON guests(rsvp_status);

-- Guest stats (for quick lookups)
CREATE TABLE invitation_stats (
  invitation_id UUID PRIMARY KEY REFERENCES invitations(id) ON DELETE CASCADE,
  total_guests INT DEFAULT 0,
  accepted INT DEFAULT 0,
  declined INT DEFAULT 0,
  pending INT DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 🎨 COMPONENT: GUEST LIST MANAGER

**File:** `components/features/GuestListManager.tsx`

```typescript
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Plus, Upload, Users, Trash2, Edit2 } from 'lucide-react'
import { GuestQuickAdd } from './GuestQuickAdd'
import { GuestBulkImport } from './GuestBulkImport'
import { GuestCard } from './GuestCard'
import { useGuests } from '@/hooks/useGuests'
import { toast } from 'sonner'

interface GuestListManagerProps {
  invitationId: string
}

export function GuestListManager({ invitationId }: GuestListManagerProps) {
  const { guests, loading, addGuest, updateGuest, deleteGuest, bulkImport } = useGuests(invitationId)
  const [showQuickAdd, setShowQuickAdd] = useState(false)
  const [showBulkImport, setShowBulkImport] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Filter guests by search
  const filteredGuests = guests.filter(guest =>
    guest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    guest.phone?.includes(searchQuery) ||
    guest.email?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Stats
  const stats = {
    total: guests.length,
    accepted: guests.filter(g => g.rsvp_status === 'accepted').length,
    declined: guests.filter(g => g.rsvp_status === 'declined').length,
    pending: guests.filter(g => g.rsvp_status === 'pending').length,
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-center">
            <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
            <p className="text-sm text-gray-600 mt-1">Total Guests</p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <p className="text-3xl font-bold text-green-600">{stats.accepted}</p>
            <p className="text-sm text-gray-600 mt-1">Accepted</p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <p className="text-3xl font-bold text-red-600">{stats.declined}</p>
            <p className="text-sm text-gray-600 mt-1">Declined</p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <p className="text-3xl font-bold text-orange-600">{stats.pending}</p>
            <p className="text-sm text-gray-600 mt-1">Pending</p>
          </div>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          onClick={() => setShowQuickAdd(true)}
          className="flex-1 sm:flex-none"
          size="lg"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Guest
        </Button>
        <Button
          onClick={() => setShowBulkImport(true)}
          variant="outline"
          className="flex-1 sm:flex-none"
          size="lg"
        >
          <Upload className="w-5 h-5 mr-2" />
          Import CSV
        </Button>
      </div>

      {/* Search */}
      <Input
        type="search"
        placeholder="Search guests by name, phone, or email..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full"
      />

      {/* Guest List */}
      <div className="space-y-3">
        {filteredGuests.length === 0 ? (
          <Card className="p-12 text-center">
            <Users className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-600 text-lg mb-2">No guests yet</p>
            <p className="text-gray-500 text-sm mb-4">
              Add guests one by one or import from a CSV file
            </p>
            <Button onClick={() => setShowQuickAdd(true)}>
              <Plus className="w-5 h-5 mr-2" />
              Add Your First Guest
            </Button>
          </Card>
        ) : (
          filteredGuests.map((guest) => (
            <GuestCard
              key={guest.id}
              guest={guest}
              onUpdate={updateGuest}
              onDelete={deleteGuest}
            />
          ))
        )}
      </div>

      {/* Quick Add Modal */}
      {showQuickAdd && (
        <GuestQuickAdd
          onClose={() => setShowQuickAdd(false)}
          onAdd={addGuest}
        />
      )}

      {/* Bulk Import Modal */}
      {showBulkImport && (
        <GuestBulkImport
          onClose={() => setShowBulkImport(false)}
          onImport={bulkImport}
        />
      )}
    </div>
  )
}
```

---

## 🎨 COMPONENT: GUEST QUICK ADD

**File:** `components/features/GuestQuickAdd.tsx`

```typescript
'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, Check } from 'lucide-react'
import { toast } from 'sonner'

interface GuestQuickAddProps {
  onClose: () => void
  onAdd: (guest: any) => Promise<void>
}

export function GuestQuickAdd({ onClose, onAdd }: GuestQuickAddProps) {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    relationship: '',
    side: '',
    plus_one: false,
  })

  const handleSubmit = async () => {
    if (!formData.name) {
      toast.error('Please enter guest name')
      return
    }

    setLoading(true)
    try {
      await onAdd(formData)
      toast.success('✨ Guest added successfully!')
      onClose()
    } catch (error) {
      toast.error('Failed to add guest')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add Guest</DialogTitle>
          <div className="flex gap-2 mt-4">
            <div className={`h-1 flex-1 rounded-full ${step >= 1 ? 'bg-orange-500' : 'bg-gray-200'}`} />
            <div className={`h-1 flex-1 rounded-full ${step >= 2 ? 'bg-orange-500' : 'bg-gray-200'}`} />
          </div>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div>
                <Label htmlFor="name">Guest Name *</Label>
                <Input
                  id="name"
                  placeholder="Enter full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1"
                  autoFocus
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button onClick={() => setStep(2)} disabled={!formData.name}>
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div>
                <Label htmlFor="email">Email (Optional)</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="relationship">Relationship</Label>
                <select
                  id="relationship"
                  value={formData.relationship}
                  onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Select...</option>
                  <option value="Family">Family</option>
                  <option value="Friend">Friend</option>
                  <option value="Colleague">Colleague</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <Label htmlFor="side">Side</Label>
                <select
                  id="side"
                  value={formData.side}
                  onChange={(e) => setFormData({ ...formData, side: e.target.value })}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Select...</option>
                  <option value="Groom">Groom's Side</option>
                  <option value="Bride">Bride's Side</option>
                  <option value="Both">Both</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="plus_one"
                  checked={formData.plus_one}
                  onCheckedChange={(checked) => 
                    setFormData({ ...formData, plus_one: checked as boolean })
                  }
                />
                <label htmlFor="plus_one" className="text-sm text-gray-700 cursor-pointer">
                  Allow +1 guest
                </label>
              </div>

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button onClick={handleSubmit} loading={loading}>
                  <Check className="w-4 h-4 mr-2" />
                  Add Guest
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}
```

---

## 🎨 COMPONENT: GUEST CARD

**File:** `components/features/GuestCard.tsx`

```typescript
'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Edit2, Trash2, User, Phone, Mail, Users } from 'lucide-react'
import { motion } from 'framer-motion'

export function GuestCard({ guest, onUpdate, onDelete }: any) {
  const [expanded, setExpanded] = useState(false)

  const statusColors = {
    accepted: 'bg-green-100 text-green-800 border-green-200',
    declined: 'bg-red-100 text-red-800 border-red-200',
    pending: 'bg-orange-100 text-orange-800 border-orange-200',
  }

  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{guest.name}</h3>
              <div className="flex gap-2 mt-1">
                <span className={`px-2 py-0.5 rounded-full text-xs border ${statusColors[guest.rsvp_status]}`}>
                  {guest.rsvp_status}
                </span>
                {guest.plus_one && (
                  <span className="px-2 py-0.5 rounded-full text-xs bg-blue-100 text-blue-800 border border-blue-200">
                    +1
                  </span>
                )}
              </div>
            </div>
          </div>

          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="ml-13 space-y-2 text-sm text-gray-600"
            >
              {guest.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {guest.phone}
                </div>
              )}
              {guest.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {guest.email}
                </div>
              )}
              {guest.relationship && (
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  {guest.relationship} {guest.side && `- ${guest.side}'s Side`}
                </div>
              )}
            </motion.div>
          )}
        </div>

        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? 'Less' : 'More'}
          </Button>
          <Button variant="ghost" size="sm">
            <Edit2 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onDelete(guest.id)}>
            <Trash2 className="w-4 h-4 text-red-600" />
          </Button>
        </div>
      </div>
    </Card>
  )
}
```

---

## 🎨 COMPONENT: BULK IMPORT

**File:** `components/features/GuestBulkImport.tsx`

```typescript
'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Upload, Download, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'

export function GuestBulkImport({ onClose, onImport }: any) {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleImport = async () => {
    if (!file) {
      toast.error('Please select a CSV file')
      return
    }

    setLoading(true)
    try {
      const text = await file.text()
      const lines = text.split('\n').slice(1) // Skip header
      const guests = lines
        .filter(line => line.trim())
        .map(line => {
          const [name, phone, email, relationship, side] = line.split(',')
          return { name, phone, email, relationship, side }
        })

      await onImport(guests)
      toast.success(`✨ Imported ${guests.length} guests successfully!`)
      onClose()
    } catch (error) {
      toast.error('Failed to import guests')
    } finally {
      setLoading(false)
    }
  }

  const downloadTemplate = () => {
    const csv = 'name,phone,email,relationship,side\nJohn Doe,+919876543210,john@example.com,Friend,Groom'
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'guest-list-template.csv'
    a.click()
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Import Guests from CSV</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-900">
                <p className="font-semibold mb-1">CSV Format Required</p>
                <p>Your CSV should have: name, phone, email, relationship, side</p>
              </div>
            </div>
          </div>

          <Button variant="outline" onClick={downloadTemplate} className="w-full">
            <Download className="w-4 h-4 mr-2" />
            Download Template CSV
          </Button>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <Upload className="w-12 h-12 mx-auto text-gray-400 mb-3" />
            <label htmlFor="csv-upload" className="cursor-pointer">
              <span className="text-orange-600 font-semibold">Click to upload</span>
              <span className="text-gray-600"> or drag and drop</span>
              <input
                id="csv-upload"
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            {file && (
              <p className="text-sm text-gray-600 mt-2">
                Selected: {file.name}
              </p>
            )}
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleImport} loading={loading} className="flex-1">
              Import Guests
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
```

---

## 🪝 CUSTOM HOOK: useGuests

**File:** `hooks/useGuests.ts`

```typescript
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import { toast } from 'sonner'

export function useGuests(invitationId: string) {
  const [guests, setGuests] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchGuests()
  }, [invitationId])

  const fetchGuests = async () => {
    try {
      const { data, error } = await supabase
        .from('guests')
        .select('*')
        .eq('invitation_id', invitationId)
        .order('created_at', { ascending: false })

      if (error) throw error
      setGuests(data || [])
    } catch (error) {
      toast.error('Failed to load guests')
    } finally {
      setLoading(false)
    }
  }

  const addGuest = async (guestData: any) => {
    const { data, error } = await supabase
      .from('guests')
      .insert({ ...guestData, invitation_id: invitationId })
      .select()
      .single()

    if (error) throw error
    setGuests([data, ...guests])
  }

  const updateGuest = async (id: string, updates: any) => {
    const { error } = await supabase
      .from('guests')
      .update(updates)
      .eq('id', id)

    if (error) throw error
    setGuests(guests.map(g => g.id === id ? { ...g, ...updates } : g))
  }

  const deleteGuest = async (id: string) => {
    const { error } = await supabase
      .from('guests')
      .delete()
      .eq('id', id)

    if (error) throw error
    setGuests(guests.filter(g => g.id !== id))
    toast.success('Guest removed')
  }

  const bulkImport = async (guestList: any[]) => {
    const guestsToImport = guestList.map(g => ({
      ...g,
      invitation_id: invitationId
    }))

    const { data, error } = await supabase
      .from('guests')
      .insert(guestsToImport)
      .select()

    if (error) throw error
    setGuests([...data, ...guests])
  }

  return {
    guests,
    loading,
    addGuest,
    updateGuest,
    deleteGuest,
    bulkImport,
    refresh: fetchGuests,
  }
}
```

---

## ✅ UX IMPROVEMENTS

### What Makes This Better

1. **Progressive 2-Step Form** - Not overwhelming
2. **Smart Stats Dashboard** - See progress at a glance
3. **Quick Search** - Find guests instantly
4. **Bulk Import** - No manual entry for large lists
5. **Template Download** - Example CSV included
6. **Visual Feedback** - Success animations, clear states
7. **Mobile-Friendly** - Large touch targets, responsive
8. **Empty States** - Helpful guidance when no guests yet

---

**This system is designed to feel natural, not like "filling government forms"!**
