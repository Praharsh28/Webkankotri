# ✅ PRE-DATABASE CHECKLIST - Things to Build FIRST

## 🎯 **Purpose**

This document lists **everything we must complete BEFORE setting up the database**. These are the prerequisites that will help us understand exactly what data we need to store.

---

## 📋 **MUST DO BEFORE DATABASE SETUP**

### **Phase 1: Complete Frontend Foundation** ⚠️

These need to be finished so we know what data structure to create:

---

#### **1. Animation Components** 🟢 COMPLETE
**Status:** 25 animation types with 47+ components built!
**Why before database:** We need to know which animations are actually used in invitations

**Tasks:**
- [x] Build all 12 basic animation components
- [x] Build 13 advanced animation types (Phase 1)
  - [x] Physics: GravityDrop, Bounce, Spring, WaveMotion
  - [x] Particles: ParticleExplosion
  - [x] 3D: Flip3D, Parallax3D
  - [x] Text: LetterDrop, LetterWave, TextGradient
  - [x] Lighting: Glow
  - [x] Interactive: MouseFollow
  - [x] Scroll: ScrollParallax
- [x] Create 2-3 variants for each type
- [x] Created 100 animation presets library
- [x] Created advanced animation index
- [x] Documented all animations
- [ ] Test each animation on mobile (TODO)
- [x] Created usage guide for templates
- [x] Created animated template example
- [ ] Integrate with all 6 themes (TODO)

**What We Have:**
- ✅ 25 animation types
- ✅ 47+ animation components (with variants)
- ✅ 100 preset configurations
- ✅ Physics, 3D, Text, Lighting, Interactive, Scroll animations

**Impact on Database:**
- ✅ Can store animation type + variant: { type: 'GravityDrop', variant: 'medium' }
- ✅ OR store preset ID: { animation_preset: 'trad-001' }
- ✅ Flexible storage approach

**Estimated Time:** ~~2-3 days~~ ✅ COMPLETE (1 day actual)

---

#### **2. Additional Section Components** 🟢 COMPLETE
**Status:** ALL sections done! ✅
**Why before database:** Need complete section data structure

**Core Sections:**
- ✅ HeaderSection
- ✅ BlessingSection
- ✅ EventSection
- ✅ ParentsSection
- ✅ MessageSection
- ✅ CustomTextSection

**Additional Sections:**
- ✅ FamilyListSection
- ✅ GallerySection (existing)
- ✅ PhotoGallerySection (NEW - with lightbox)
- ✅ VideoSection (NEW - YouTube/Vimeo/direct)
- ✅ TimelineSection (existing)
- ✅ MapSection (existing)
- ✅ HotelsSection (existing)
- ✅ DressCodeSection (existing)

**Interactive Sections:**
- ✅ RSVPSection (existing)
- ✅ RSVPFormSection (NEW - full inline form)
- ✅ GiftRegistrySection (NEW - UPI/Bank details)
- ✅ SocialMediaSection (NEW - Instagram/Facebook links)
- ✅ ContactSection (existing)

**Total: 18 Section Components!**

**Impact on Database:**
- ✅ Complete `invitations.data` JSONB structure defined
- ✅ All section types have data schemas
- ✅ Ready for database implementation

**Estimated Time:** ~~3-4 days~~ ✅ COMPLETE (4 new sections added today!)

---

#### **3. Complete Invitation Data Structure** 🔴 CRITICAL
**Status:** Partially defined
**Why before database:** This IS the database schema!

**Tasks:**
- [ ] Finalize TypeScript types for ALL sections
- [ ] Create complete invitation data interface
- [ ] Define optional vs required fields
- [ ] Test with real content examples
- [ ] Document minimum required fields

**Example Complete Structure:**
```typescript
interface InvitationData {
  // Required
  groomName: string
  brideName: string
  
  // Optional
  groomTitle?: string
  brideTitle?: string
  groomParents?: string
  brideParents?: string
  
  // Events (required at least one)
  events: EventData[]
  
  // Optional sections
  blessing?: BlessingData
  message?: MessageData
  customSections?: CustomSectionData[]
  photoGallery?: PhotoGalleryData
  video?: VideoData
  rsvpForm?: RSVPFormData
  giftRegistry?: GiftRegistryData
  socialMedia?: SocialMediaData
  timeline?: TimelineData
  directions?: DirectionsData
  dressCode?: DressCodeData
  
  // Customizations
  customizations?: {
    colorOverrides?: ColorOverrides
    fontOverrides?: FontOverrides
    animationSettings?: AnimationSettings
  }
}
```

**Impact on Database:**
- This becomes `invitations.data` JSONB field
- Must be flexible for future sections
- Must validate required fields

**Estimated Time:** 2 days

---

#### **4. Theme/Template Customization System** 🟡 IMPORTANT
**Status:** Themes exist, customization not implemented
**Why before database:** Need to know what can be customized

**Tasks:**
- [ ] Design color override UI
- [ ] Design font override UI
- [ ] Design animation toggle UI
- [ ] Test customizations don't break themes
- [ ] Define customization limits (what can/cannot be changed)
- [ ] Create customization preview

**Impact on Database:**
- Defines `invitations.data.customizations` structure
- Affects `templates.config` fields
- Need to store user customizations

**Estimated Time:** 2-3 days

---

#### **5. File Upload System Design** 🟡 IMPORTANT
**Status:** Not designed
**Why before database:** Need upload strategy before storing file references

**Tasks:**
- [ ] Choose file upload library (we have Supabase Storage)
- [ ] Design file naming convention
- [ ] Define max file sizes
- [ ] Define allowed file types
- [ ] Design image optimization strategy
- [ ] Design thumbnail generation
- [ ] Test upload flow

**File Structure Decision:**
```
/users/{userId}/
  /avatars/
    avatar.jpg
  /invitations/{invitationId}/
    /photos/
      photo1.jpg
      photo2.jpg
    /videos/
      video1.mp4
    /pdfs/
      invitation.pdf (temporary)
```

**Impact on Database:**
- Defines `media_files` table structure
- File URL format
- Storage bucket organization
- Affects how we reference files in invitations

**Estimated Time:** 2 days

---

#### **6. PDF Generation Requirements** 🟡 IMPORTANT
**Status:** Documented, not implemented
**Why before database:** Need to know what data is needed for PDF

**Tasks:**
- [ ] Choose PDF library (Puppeteer vs jsPDF vs other)
- [ ] Test PDF generation with themes
- [ ] Ensure Gujarati fonts work in PDF
- [ ] Design PDF layout (match web or different?)
- [ ] Test PDF file size
- [ ] Decide: Generate on-demand or pre-generate?
- [ ] Storage: Temporary or permanent?

**Impact on Database:**
- Do we store generated PDFs?
- Track PDF download count?
- Store PDF preferences?

**Estimated Time:** 3-4 days

---

### **Phase 2: User Flow & UI Mockups** ⚠️

Before database, we need to understand the complete user journey:

---

#### **7. User Flow Diagram** 🔴 CRITICAL
**Status:** Not created
**Why before database:** Defines what screens and data flows exist

**Create Flow For:**
- [ ] User signup/login flow
- [ ] Create invitation flow (step-by-step)
- [ ] Edit invitation flow
- [ ] Payment flow
- [ ] Share invitation flow
- [ ] Guest RSVP flow
- [ ] Admin flow (if needed)

**Example Create Flow:**
```
1. User logs in
2. Click "Create New Invitation"
3. Select Template (Traditional, Royal, Modern, etc.)
4. Enter Basic Info (names, dates)
5. Add Events
6. Customize (colors, fonts, animations)
7. Preview
8. Payment (if premium template)
9. Publish
10. Get shareable link
```

**Impact on Database:**
- Defines what status values we need ('draft', 'published', etc.)
- Defines what intermediate data to save
- Affects auto-save requirements

**Estimated Time:** 1 day

---

#### **8. Page Wireframes** 🟡 IMPORTANT
**Status:** Only theme-demo exists
**Why before database:** Defines what data each page needs

**Pages to Wireframe:**
- [ ] Home/Landing page
- [ ] Dashboard (list of user's invitations)
- [ ] Create Invitation Wizard (multi-step)
- [ ] Edit Invitation page
- [ ] Preview page
- [ ] Payment/Checkout page
- [ ] Public View page
- [ ] Settings/Profile page
- [ ] Admin Panel (optional)

**For Each Page, Document:**
- What data is displayed?
- What actions can user take?
- What API calls are needed?
- What's cached vs fetched?

**Impact on Database:**
- Defines API endpoints needed
- Defines data fetching patterns
- Affects query optimization

**Estimated Time:** 2-3 days

---

### **Phase 3: Business Logic & Rules** ⚠️

---

#### **9. Pricing & Payment Strategy** 🔴 CRITICAL
**Status:** Basic pricing defined, rules not complete
**Why before database:** Affects payment tracking structure

**Define:**
- [ ] Free template limitations (if any)
- [ ] Premium template benefits
- [ ] One-time payment or subscription?
- [ ] Can user create multiple invitations?
- [ ] Can user reuse paid template?
- [ ] Refund policy and conditions
- [ ] Discount codes / coupons?
- [ ] Trial period?

**Current Pricing:**
```
Traditional: Free
Royal: ₹99
Modern: ₹149
Traditional Light: Free
Royal Light: ₹99
Modern Light: ₹149
```

**Questions to Answer:**
- If user pays ₹99 for Royal theme, can they:
  - [ ] Create unlimited Royal invitations?
  - [ ] Create only one Royal invitation?
  - [ ] Access Royal for X days?

**Impact on Database:**
- Affects `payments` table structure
- Need subscription tracking?
- Need license/access tracking?
- Track payment per invitation vs per user?

**Estimated Time:** 1 day (decision making)

---

#### **10. Invitation Status & Lifecycle** 🔴 CRITICAL
**Status:** Basic statuses defined
**Why before database:** Defines state machine and allowed transitions

**Define States:**
```
draft -> published -> archived?
draft -> deleted?
published -> unpublished?
```

**Define Rules:**
- [ ] Can draft invitation be viewed publicly? (No)
- [ ] Can published invitation be edited? (Yes/No?)
- [ ] Can published invitation be deleted? (Yes/No?)
- [ ] What happens if user doesn't pay? (Draft only?)
- [ ] Auto-archive old invitations? (After wedding date?)
- [ ] Can archived invitations be restored?

**Impact on Database:**
- Defines `invitations.status` field values
- Affects update permissions
- Defines deletion strategy (soft delete vs hard delete)

**Estimated Time:** 1 day

---

#### **11. Guest Management Rules** 🟡 IMPORTANT
**Status:** Table designed, rules not defined
**Why before database:** Affects guest table constraints

**Define:**
- [ ] Max guests per invitation (unlimited? 500? 1000?)
- [ ] Guest code format (length, characters)
- [ ] Guest code collision handling
- [ ] Can guest view without code? (Public vs private invitations)
- [ ] Can guest forward link to others?
- [ ] Track unique vs total views?

**Impact on Database:**
- Affects `guests` table indexes
- Need uniqueness constraints?
- Affects URL structure

**Estimated Time:** 1 day

---

#### **12. RSVP Rules** 🟡 IMPORTANT
**Status:** Table designed, rules not defined
**Why before database:** Affects RSVP validation

**Define:**
- [ ] Can guest RSVP multiple times? (Update previous or create new?)
- [ ] RSVP deadline? (Before wedding date?)
- [ ] Can guest un-RSVP?
- [ ] Plus-ones allowed? (Max limit?)
- [ ] Meal preferences required?
- [ ] Anonymous RSVP allowed? (No guest account needed?)

**Impact on Database:**
- Update vs insert strategy
- Validation rules
- Unique constraints

**Estimated Time:** 1 day

---

### **Phase 4: Technical Decisions** ⚠️

---

#### **13. Environment Setup** 🔴 CRITICAL
**Status:** Not configured
**Why before database:** Need to know which Supabase project to use

**Decide:**
- [ ] Development database (local or Supabase dev project?)
- [ ] Staging database (optional)
- [ ] Production database
- [ ] Use different databases or same with flags?

**Setup:**
- [ ] Create Supabase project(s)
- [ ] Get API keys
- [ ] Configure `.env.local`
- [ ] Test connection

**Estimated Time:** 1 hour

---

#### **14. Data Migration Strategy** 🟡 IMPORTANT
**Status:** Not planned
**Why before database:** Need to migrate existing themes

**Current State:**
- 6 themes hardcoded in `/lib/themes/*.ts`
- Need to move to database

**Plan:**
- [ ] Create migration script
- [ ] Test migration locally
- [ ] Verify themes work from database
- [ ] Keep files as backup or remove?

**Tasks:**
- [ ] Write script to read theme files
- [ ] Convert to database format
- [ ] Insert into `templates` table
- [ ] Update code to fetch from DB instead of import

**Impact on Database:**
- First data to populate
- Tests database connection
- Validates JSONB structure

**Estimated Time:** 1-2 days

---

#### **15. Testing Strategy** 🟡 IMPORTANT
**Status:** Not defined
**Why before database:** Need test data ready

**Prepare:**
- [ ] Test user accounts (emails, passwords)
- [ ] Test invitation data (realistic content)
- [ ] Test payment scenarios (success, failure)
- [ ] Test edge cases (empty fields, long text, special characters)

**Test Data Needed:**
- [ ] 3-5 test users
- [ ] 10+ test invitations
- [ ] Various invitation states (draft, published, etc.)
- [ ] Multiple templates used
- [ ] Invitations with/without payments

**Impact on Database:**
- Seed scripts
- Test data cleanup
- Database reset strategy

**Estimated Time:** 1-2 days

---

## 📊 **SUMMARY: WHAT TO DO BEFORE DATABASE**

### **CRITICAL (Must Do):**
1. ✅ Animation components (12 components) - **2-3 days**
2. ✅ Complete invitation data structure - **2 days**
3. ✅ User flow diagram - **1 day**
4. ✅ Pricing & payment strategy - **1 day**
5. ✅ Invitation status & lifecycle - **1 day**
6. ✅ Environment setup - **1 hour**

**Total Critical Path: 7-8 days**

---

### **IMPORTANT (Should Do):**
7. ✅ Additional section components - **3-4 days**
8. ✅ Theme customization system - **2-3 days**
9. ✅ File upload design - **2 days**
10. ✅ PDF generation requirements - **3-4 days**
11. ✅ Page wireframes - **2-3 days**
12. ✅ Guest management rules - **1 day**
13. ✅ RSVP rules - **1 day**
14. ✅ Data migration strategy - **1-2 days**
15. ✅ Testing strategy - **1-2 days**

**Total Important Items: 16-20 days**

---

### **OPTIONAL (Nice to Have):**
- Admin panel design
- Analytics requirements
- Notification templates
- Email designs

---

## 🎯 **RECOMMENDED APPROACH**

### **Option 1: Minimal Path (7-8 days)**
Do only **CRITICAL** items, then set up database with basic structure.

**Pros:** Fast to database
**Cons:** May need schema changes later

---

### **Option 2: Balanced Path (15-20 days)**
Do **CRITICAL + IMPORTANT** items, then set up database.

**Pros:** Complete understanding before database
**Cons:** Takes longer to start database

---

### **Option 3: Parallel Path (Recommended)**
Do **CRITICAL** items while planning **IMPORTANT** items.

**Timeline:**
- **Week 1:** Animations + Data structure + User flows
- **Week 2:** Additional sections + Customization + Upload design
- **Week 3:** PDF + Wireframes + Rules + Migration
- **Start Database: Week 3**

**Pros:** Balanced speed and completeness
**Cons:** Requires good planning

---

## ✅ **READY FOR DATABASE WHEN:**

- ✅ All 12 animations built and tested
- ✅ Complete invitation data TypeScript interface
- ✅ User flows documented
- ✅ Pricing strategy decided
- ✅ Status lifecycle defined
- ✅ Environment configured
- ✅ At least 8 section components working
- ✅ Basic wireframes for main pages

**Then we can confidently create database schema!**

---

## 🔄 **THIS CHECKLIST WILL BE UPDATED**

Mark items as done:
- 🔴 Not started
- 🟡 In progress
- 🟢 Complete

**Track progress here before moving to database setup!**

---

## 📝 **CURRENT STATUS**

**Completed:** 1/15 items ✅
**In Progress:** 0/15 items
**Not Started:** 14/15 items

**Ready for Database:** ❌ NO (but progressing!)

**Estimated Time to Ready:** 6-19 days (depending on approach)

**Completed Items:**
- ✅ #1: Animation Components (with 100 presets!)

---

**Update this file as you complete items!** 📋
