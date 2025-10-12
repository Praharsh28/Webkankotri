# 🗄️ DATABASE REQUIREMENTS TRACKER

## 📋 **Purpose**

This document tracks **everything that needs database support** so when we set up the database, we don't miss anything. This is our complete checklist!

---

## ✅ **Status Legend**

- 🔴 **Not Started** - Needs to be built
- 🟡 **In Progress** - Partially done
- 🟢 **Complete** - Fully implemented
- 🔵 **Documented** - Design complete, ready to build

---

## 📊 **CORE FEATURES REQUIRING DATABASE**

### **1. User Management** 🔵
**Status:** Documented, Ready to Build

**What needs database:**
- User accounts (email, password)
- User profiles (name, phone, avatar)
- Session management
- Password reset tokens

**Tables Required:**
```sql
auth.users               (Managed by Supabase Auth)
user_profiles            (Custom user data)
```

**Fields in `user_profiles`:**
```typescript
{
  id: UUID                    // Links to auth.users
  full_name: string
  phone: string
  avatar_url: string
  created_at: timestamp
  updated_at: timestamp
}
```

**APIs Needed:**
- `/api/auth/signup` - Create account
- `/api/auth/login` - Sign in
- `/api/auth/logout` - Sign out
- `/api/auth/reset-password` - Reset password
- `/api/profile/update` - Update profile

---

### **2. Templates/Themes** 🔴
**Status:** Not Started (Currently hardcoded)

**What needs database:**
- Store all available themes (Traditional, Royal, Modern, etc.)
- Theme metadata (name, description, price, category)
- Theme configuration (colors, fonts, animations)
- Theme thumbnails/previews

**Tables Required:**
```sql
templates
```

**Fields in `templates`:**
```typescript
{
  id: UUID
  template_id: string              // 'traditional', 'royal', etc.
  name: string                     // 'Traditional Gujarati'
  description: string
  category: string                 // 'traditional', 'modern', 'elegant'
  thumbnail_url: string            // Preview image
  preview_video_url: string        // Optional video preview
  price_tier: string               // 'free', 'basic', 'premium'
  price: number                    // 0, 99, 149, etc.
  config: JSONB                    // Full theme configuration
  is_active: boolean               // Can users select this?
  sort_order: number               // Display order
  created_at: timestamp
  updated_at: timestamp
}
```

**What goes in `config` (JSONB):**
```typescript
{
  colors: { /* theme colors */ },
  fonts: { /* theme fonts */ },
  animations: { /* animation settings */ },
  backgrounds: { /* gradient settings */ },
  sectionStyles: { /* section-specific styles */ }
}
```

**APIs Needed:**
- `/api/templates` - List all templates
- `/api/templates/[id]` - Get single template
- `/api/admin/templates` - Admin: CRUD templates

**Why Database vs Hardcode:**
✅ Easy to add new themes without code changes
✅ Can enable/disable themes dynamically
✅ Update prices without redeployment
✅ A/B test different theme variations
✅ Track which themes are popular

---

### **3. Invitations/Kankotris** 🔴
**Status:** Not Started

**What needs database:**
- User-created invitations
- Invitation data (names, dates, venues, etc.)
- Selected theme/template
- Customizations (colors, fonts, custom text)
- Invitation status (draft, published, archived)
- Public sharing URL (slug)
- View count
- Payment status

**Tables Required:**
```sql
invitations
```

**Fields in `invitations`:**
```typescript
{
  id: UUID
  user_id: UUID                    // Who created it
  template_id: string              // Which theme (e.g., 'traditional')
  slug: string                     // Public URL: /view/abc-wedding
  title: string                    // User's title (e.g., "Raj & Priya Wedding")
  data: JSONB                      // All invitation content
  status: string                   // 'draft' | 'published' | 'archived'
  payment_status: string           // 'unpaid' | 'paid'
  payment_id: string               // Razorpay payment ID
  payment_amount: number           // Amount paid
  payment_date: timestamp          // When paid
  view_count: number               // Track views
  created_at: timestamp
  updated_at: timestamp
}
```

**What goes in `data` (JSONB):**
```typescript
{
  // Personal info
  groomName: string,
  brideName: string,
  groomTitle: string,              // 'Son of', etc.
  brideTitle: string,
  groomParents: string,
  brideParents: string,
  
  // Event details
  events: [
    {
      name: string,
      date: string,
      time: string,
      venue: string,
      venueAddress: string,
      description: string
    }
  ],
  
  // Blessing/spiritual
  blessing: {
    type: string,                  // 'ganesh', 'swaminarayan', etc.
    text: string,
    language: string
  },
  
  // Messages
  message: string,
  customSections: [...],           // Additional custom sections
  
  // Customizations
  customizations: {
    colorOverrides: { /* ... */ },
    fontOverrides: { /* ... */ },
    animationSettings: { /* ... */ }
  }
}
```

**APIs Needed:**
- `/api/invitations` - List user's invitations
- `/api/invitations/create` - Create new
- `/api/invitations/[id]` - Get single invitation
- `/api/invitations/[id]/update` - Update invitation
- `/api/invitations/[id]/delete` - Delete invitation
- `/api/invitations/[id]/publish` - Publish (draft → published)
- `/api/invitations/[id]/view-count` - Increment view count
- `/api/view/[slug]` - Public view (no auth required)

---

### **4. Payments** 🔴
**Status:** Not Started

**What needs database:**
- Payment transactions
- Payment status tracking
- Payment verification
- Refund tracking

**Tables Required:**
```sql
payments
```

**Fields in `payments`:**
```typescript
{
  id: UUID
  user_id: UUID
  invitation_id: UUID              // What was purchased
  razorpay_payment_id: string      // From Razorpay
  razorpay_order_id: string
  razorpay_signature: string       // For verification
  amount: number                   // Amount in paise (₹99 = 9900)
  currency: string                 // 'INR'
  status: string                   // 'pending' | 'success' | 'failed'
  payment_method: string           // 'upi', 'card', 'netbanking', etc.
  email: string                    // User's email for receipt
  phone: string                    // User's phone
  refund_id: string                // If refunded
  refund_amount: number
  refund_status: string            // 'none' | 'requested' | 'processed'
  created_at: timestamp
  updated_at: timestamp
}
```

**APIs Needed:**
- `/api/payments/create-order` - Initialize payment
- `/api/payments/verify` - Verify payment signature
- `/api/payments/webhook` - Razorpay webhook
- `/api/payments/refund` - Process refund

**Payment Flow:**
1. User creates invitation (free template or paid)
2. If paid template, create Razorpay order
3. User completes payment
4. Verify payment signature
5. Update invitation payment_status = 'paid'
6. Allow access to premium features

---

### **5. Guest Management** 🔴
**Status:** Future Phase (Documented)

**What needs database:**
- Guest list for each invitation
- Guest details (name, phone, email)
- Unique guest codes (for personalized links)
- Custom messages per guest
- Track who viewed invitation

**Tables Required:**
```sql
guests
```

**Fields in `guests`:**
```typescript
{
  id: UUID
  invitation_id: UUID              // Which invitation
  name: string
  phone: string
  email: string
  guest_code: string               // Unique: /view/abc-wedding?g=XYZ123
  custom_message: string           // Personalized message
  viewed_at: timestamp             // When they opened link
  created_at: timestamp
}
```

**APIs Needed:**
- `/api/invitations/[id]/guests` - List guests
- `/api/invitations/[id]/guests/add` - Add guest
- `/api/invitations/[id]/guests/[guestId]` - Update guest
- `/api/invitations/[id]/guests/[guestId]/delete` - Remove guest
- `/api/invitations/[id]/guests/import` - Bulk import (CSV)
- `/api/view/[slug]?g=[code]` - Track guest view

**Features:**
- Bulk import from CSV/Excel
- Send personalized WhatsApp/SMS links
- Track who opened invitation
- Download guest list

---

### **6. RSVP System** 🔴
**Status:** Future Phase (Documented)

**What needs database:**
- RSVP responses from guests
- Attendance confirmation
- Meal preferences
- Plus-ones
- Comments/notes

**Tables Required:**
```sql
rsvp_responses
```

**Fields in `rsvp_responses`:**
```typescript
{
  id: UUID
  invitation_id: UUID
  guest_id: UUID                   // Optional: if guest list used
  name: string                     // If no guest_id
  phone: string
  email: string
  response: string                 // 'attending' | 'not_attending' | 'maybe'
  plus_ones: number                // Number of additional guests
  meal_preference: string          // 'veg' | 'non-veg' | 'jain'
  comments: string                 // Special requests
  responded_at: timestamp
  created_at: timestamp
}
```

**APIs Needed:**
- `/api/invitations/[id]/rsvp` - Submit RSVP
- `/api/invitations/[id]/rsvp/list` - View all RSVPs (owner only)
- `/api/invitations/[id]/rsvp/stats` - Get stats (attending count)
- `/api/invitations/[id]/rsvp/export` - Download as CSV

**Features:**
- Guest submits RSVP from invitation page
- Real-time count of attendees
- Download RSVP list
- Send reminders to non-responders

---

### **7. Media Uploads** 🔴
**Status:** Future Phase

**What needs database:**
- Track uploaded images/videos
- Store file metadata
- Link to invitations

**Tables Required:**
```sql
media_files
```

**Fields in `media_files`:**
```typescript
{
  id: UUID
  user_id: UUID
  invitation_id: UUID              // Optional: which invitation
  file_url: string                 // Supabase Storage URL
  file_name: string
  file_type: string                // 'image' | 'video'
  mime_type: string                // 'image/jpeg', etc.
  file_size: number                // In bytes
  width: number                    // For images
  height: number
  thumbnail_url: string            // For videos
  created_at: timestamp
}
```

**Storage:**
- Use **Supabase Storage** for actual files
- Database stores metadata only
- Organize by user: `/users/{userId}/invitations/{invitationId}/{filename}`

**APIs Needed:**
- `/api/media/upload` - Upload file
- `/api/media/[id]/delete` - Delete file
- `/api/invitations/[id]/media` - List media for invitation

**Features:**
- Upload photos (engagement, pre-wedding)
- Upload videos
- Image optimization (compress, resize)
- Thumbnail generation for videos

---

### **8. Analytics/Tracking** 🔴
**Status:** Future Phase

**What needs database:**
- Page views per invitation
- Unique visitors
- Device/browser stats
- Click tracking (RSVP, download, etc.)

**Tables Required:**
```sql
invitation_views
```

**Fields in `invitation_views`:**
```typescript
{
  id: UUID
  invitation_id: UUID
  guest_id: UUID                   // Optional
  ip_address: string               // Anonymized
  user_agent: string
  device_type: string              // 'mobile' | 'desktop' | 'tablet'
  browser: string
  location: string                 // City/country (from IP)
  referrer: string                 // How they found it
  viewed_at: timestamp
}
```

**APIs Needed:**
- `/api/invitations/[id]/analytics` - Get stats
- `/api/invitations/[id]/track-view` - Log view (internal)

**Metrics to Show User:**
- Total views
- Unique visitors
- Peak viewing times
- Device breakdown
- Location map

---

### **9. Notifications** 🔴
**Status:** Future Phase

**What needs database:**
- Email notifications
- SMS notifications
- Push notifications (future)

**Tables Required:**
```sql
notifications
```

**Fields in `notifications`:**
```typescript
{
  id: UUID
  user_id: UUID
  invitation_id: UUID              // Related invitation
  type: string                     // 'email' | 'sms' | 'push'
  template: string                 // 'rsvp_received', 'payment_success', etc.
  recipient: string                // Email or phone
  subject: string                  // For emails
  message: string
  status: string                   // 'pending' | 'sent' | 'failed'
  sent_at: timestamp
  error_message: string            // If failed
  created_at: timestamp
}
```

**Notification Types:**
- Payment confirmation
- RSVP received
- Guest viewed invitation
- Reminder emails

---

### **10. Admin Features** 🔴
**Status:** Future Phase

**What needs database:**
- Admin users (special permissions)
- System settings
- Featured templates
- User management

**Tables Required:**
```sql
admin_users
system_settings
```

**Fields in `admin_users`:**
```typescript
{
  id: UUID                         // Links to auth.users
  role: string                     // 'admin' | 'moderator'
  permissions: string[]            // ['manage_templates', 'view_payments', etc.]
  created_at: timestamp
}
```

**Fields in `system_settings`:**
```typescript
{
  id: UUID
  key: string                      // 'razorpay_enabled', 'maintenance_mode', etc.
  value: JSONB                     // Any value
  description: string
  updated_at: timestamp
}
```

**Admin Panel Features:**
- View all users
- View all invitations
- Manage templates
- View payments
- System settings

---

## 📊 **DATABASE SUMMARY**

### **Phase 1: MVP (Must Have)**
1. ✅ `auth.users` - User accounts (Supabase)
2. ✅ `user_profiles` - User data
3. 🔴 `templates` - Theme/template library
4. 🔴 `invitations` - User invitations
5. 🔴 `payments` - Payment tracking

**Total Tables: 5**

### **Phase 2: Enhanced (Should Have)**
6. 🔴 `guests` - Guest management
7. 🔴 `rsvp_responses` - RSVP system
8. 🔴 `media_files` - Photo/video uploads

**Total Tables: 8**

### **Phase 3: Advanced (Nice to Have)**
9. 🔴 `invitation_views` - Analytics
10. 🔴 `notifications` - Email/SMS
11. 🔴 `admin_users` - Admin panel
12. 🔴 `system_settings` - Configuration

**Total Tables: 12**

---

## 🗄️ **STORAGE REQUIREMENTS**

### **Supabase Storage Buckets:**

**1. `avatars`** - User profile pictures
```
/users/{userId}/avatar.jpg
Max size: 2MB
Formats: JPEG, PNG, WebP
```

**2. `invitation-media`** - Photos/videos in invitations
```
/users/{userId}/invitations/{invitationId}/photo1.jpg
Max size: 10MB (images), 50MB (videos)
Formats: JPEG, PNG, MP4, WebM
```

**3. `template-previews`** - Template thumbnails (admin only)
```
/templates/{templateId}/preview.jpg
/templates/{templateId}/video.mp4
```

**4. `downloads`** - Generated PDFs (temporary)
```
/users/{userId}/invitations/{invitationId}/invitation.pdf
Auto-delete after 7 days
```

---

## 🔐 **SECURITY & PERMISSIONS**

### **Row Level Security (RLS) Policies:**

**`user_profiles`:**
- Users can read their own profile
- Users can update their own profile
- Admins can read all profiles

**`templates`:**
- Everyone can read active templates
- Only admins can create/update/delete

**`invitations`:**
- Users can read/update/delete their own invitations
- Published invitations are publicly viewable by slug
- Draft invitations are private

**`payments`:**
- Users can read their own payments
- No one can delete payment records
- Admins can read all payments

**`guests`:**
- Users can manage guests for their own invitations
- Guests can read their own guest record (by code)

**`rsvp_responses`:**
- Anyone can create RSVP (public form)
- Users can read RSVPs for their invitations
- Users cannot modify/delete submitted RSVPs

---

## 📋 **IMPLEMENTATION CHECKLIST**

### **Before Setting Up Database:**

**1. Infrastructure:**
- [ ] Supabase project created
- [ ] Environment variables configured
- [ ] Database connection tested

**2. Schema:**
- [ ] All tables designed
- [ ] Relationships defined
- [ ] Indexes planned
- [ ] RLS policies written

**3. APIs:**
- [ ] API routes planned
- [ ] Validation schemas ready
- [ ] Error handling defined

**4. Testing:**
- [ ] Test data prepared
- [ ] Migration scripts ready
- [ ] Rollback plan ready

---

## 🔄 **MIGRATION STRATEGY**

### **Current State:**
- Themes are hardcoded in `/lib/themes/*.ts`
- No user accounts
- No data persistence

### **Migration Steps:**

**Step 1:** Set up Supabase
- Create project
- Configure auth
- Set up storage

**Step 2:** Create tables
- Run migration SQL
- Set up RLS policies
- Add indexes

**Step 3:** Seed data
- Migrate existing themes to `templates` table
- Create test user accounts
- Add sample invitations

**Step 4:** Update code
- Replace hardcoded themes with database queries
- Add API routes
- Update components to fetch from DB

**Step 5:** Testing
- Test CRUD operations
- Verify security (RLS)
- Performance testing

---

## 📝 **NOTES FOR FUTURE IMPLEMENTATION**

### **Important Decisions:**

**1. Theme Storage:**
- Store full theme config in JSONB
- Allows flexibility for future theme fields
- Easy to add new customization options

**2. Invitation Data:**
- Use JSONB for flexible schema
- Each template can have different fields
- Easy to add new section types

**3. File Storage:**
- Use Supabase Storage (not database)
- Generate thumbnails for images
- Compress videos on upload

**4. Analytics:**
- Don't store every click (too much data)
- Aggregate daily/weekly
- Consider using external analytics (Google Analytics)

**5. Notifications:**
- Use queue system (future: Redis)
- Batch email sends
- Retry failed sends

---

## ✅ **CURRENT STATUS**

**What We Have:**
- ✅ Theme system (hardcoded)
- ✅ Section components
- ✅ Animation library
- ✅ PDF generation (planned)
- ✅ Responsive design

**What We Need:**
- 🔴 Database setup
- 🔴 User authentication
- 🔴 API routes
- 🔴 Payment integration
- 🔴 Admin panel

**Next Step:** Set up Supabase project and create tables!

---

## 📞 **QUICK REFERENCE**

**Total Database Tables Needed:** 12 (5 MVP, 3 Enhanced, 4 Advanced)

**Storage Buckets Needed:** 4

**API Routes Needed:** ~30

**Estimated Implementation Time:**
- Phase 1 (MVP): 2-3 weeks
- Phase 2 (Enhanced): 1-2 weeks
- Phase 3 (Advanced): 1-2 weeks

**Total: 4-7 weeks for complete database implementation**

---

**This document will be updated as we build! Check back regularly!** 📝
