# 🗄️ DATABASE SETUP GUIDE

**Complete step-by-step guide to set up your Supabase database**

---

## 📋 **Prerequisites**

- ✅ Node.js installed
- ✅ Git installed
- ✅ Gmail/Email account (for Supabase signup)
- ✅ Internet connection

---

## 🚀 **STEP 1: Create Supabase Project (10 minutes)**

### **1.1 Sign Up for Supabase**

1. Go to [https://supabase.com](https://supabase.com)
2. Click **"Start your project"**
3. Sign up with GitHub or Email
4. Verify your email

### **1.2 Create New Project**

1. Click **"New Project"**
2. Fill in details:
   - **Name:** `webkankotri-prod`
   - **Database Password:** Generate a strong password (SAVE THIS!)
   - **Region:** Choose closest to India (e.g., `ap-south-1` Mumbai)
   - **Pricing Plan:** Free tier is fine for now
3. Click **"Create new project"**
4. Wait 2-3 minutes for project to initialize

---

## 🔑 **STEP 2: Get API Keys (2 minutes)**

### **2.1 Find Your Keys**

1. In your Supabase project, click **"Settings"** (gear icon in sidebar)
2. Click **"API"** in the settings menu
3. You'll see 3 important values:

```
Project URL: https://xxxxxxxxxxxxx.supabase.co
anon public key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ...
service_role key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ...
```

### **2.2 Save Keys to Project**

1. In your project, create `.env.local` file in the root:

```bash
cd /home/enigma/Desktop/windsurf/projects/webkankotri
cp .env.local.example .env.local
```

2. Open `.env.local` and add your keys:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**⚠️ NEVER commit `.env.local` to git!** (It's already in `.gitignore`)

---

## 📊 **STEP 3: Run Database Migration (5 minutes)**

### **3.1 Copy SQL Migration**

1. Open file: `/supabase/migrations/001_initial_schema.sql`
2. Copy ALL the SQL code (Ctrl+A, Ctrl+C)

### **3.2 Run in Supabase**

1. In Supabase Dashboard, click **"SQL Editor"** in sidebar
2. Click **"New query"**
3. Paste the entire SQL migration
4. Click **"Run"** (or press Ctrl+Enter)
5. Wait for success message: **"Success. No rows returned"**

### **3.3 Verify Tables Created**

1. Click **"Table Editor"** in sidebar
2. You should see 8 tables:
   - ✅ user_profiles
   - ✅ templates
   - ✅ invitations
   - ✅ guests
   - ✅ rsvps
   - ✅ payments
   - ✅ media_files
   - ✅ analytics_events

---

## 🪣 **STEP 4: Create Storage Buckets (5 minutes)**

### **4.1 Create Buckets**

1. Click **"Storage"** in sidebar
2. Click **"Create a new bucket"**

**Create 3 buckets:**

**Bucket 1: avatars**
- Name: `avatars`
- Public: ✅ Yes
- File size limit: 2 MB
- Allowed MIME types: `image/*`
- Click **"Create bucket"**

**Bucket 2: invitation-photos**
- Name: `invitation-photos`
- Public: ✅ Yes
- File size limit: 5 MB
- Allowed MIME types: `image/*`
- Click **"Create bucket"**

**Bucket 3: invitation-videos**
- Name: `invitation-videos`
- Public: ✅ Yes
- File size limit: 50 MB
- Allowed MIME types: `video/*`
- Click **"Create bucket"**

### **4.2 Set Storage Policies**

For each bucket:
1. Click on bucket name
2. Click **"Policies"** tab
3. Click **"New policy"**
4. Use template: **"Allow public read access"**
5. Click **"Review"** → **"Save policy"**

---

## 🔐 **STEP 5: Configure Authentication (5 minutes)**

### **5.1 Enable Email Auth**

1. Click **"Authentication"** in sidebar
2. Click **"Providers"**
3. Find **"Email"** and click to expand
4. Toggle **"Enable Email provider"** to ON
5. Toggle **"Confirm email"** to ON (recommended)
6. Click **"Save"**

### **5.2 Email Templates (Optional)**

1. Click **"Email Templates"** in Authentication
2. Customize signup/reset emails if you want
3. Or leave defaults (they work fine!)

### **5.3 URL Configuration**

1. Click **"URL Configuration"** in Authentication
2. Add your site URL:
   - **Site URL:** `http://localhost:3000` (for development)
   - **Redirect URLs:** `http://localhost:3000/**`
3. Click **"Save"**

---

## ✅ **STEP 6: Test Database Connection (10 minutes)**

### **6.1 Install Dependencies**

```bash
cd /home/enigma/Desktop/windsurf/projects/webkankotri
npm install @supabase/supabase-js @supabase/ssr
```

### **6.2 Test Connection**

Create a test file: `/app/test-db/page.tsx`

```typescript
'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function TestDB() {
  const [status, setStatus] = useState('Testing...')
  
  useEffect(() => {
    async function testConnection() {
      try {
        const supabase = createClient()
        const { data, error } = await supabase.from('templates').select('count')
        
        if (error) {
          setStatus(`❌ Error: ${error.message}`)
        } else {
          setStatus('✅ Database connected successfully!')
        }
      } catch (err) {
        setStatus(`❌ Connection failed: ${err}`)
      }
    }
    
    testConnection()
  }, [])
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Database Connection Test</h1>
      <p className="text-lg">{status}</p>
    </div>
  )
}
```

### **6.3 Run Test**

```bash
npm run dev
```

Open: `http://localhost:3000/test-db`

You should see: **"✅ Database connected successfully!"**

---

## 📝 **STEP 7: Seed Initial Data (Optional)**

### **7.1 Insert 6 Themes**

We need to add your 6 themes to the database.

**Option A: Manual (Quick)**
1. Go to **Table Editor** → **templates**
2. Click **"Insert row"**
3. Add each theme manually

**Option B: SQL (Faster)**
1. Go to **SQL Editor**
2. Run this SQL:

```sql
-- Insert Traditional Theme
INSERT INTO templates (template_id, name, description, category, price_tier, price, config, sort_order)
VALUES (
  'traditional',
  'Traditional Gujarati',
  'Elegant traditional theme with Indian motifs',
  'traditional',
  'free',
  0,
  '{
    "colors": {
      "primary": "#D97706",
      "secondary": "#B91C1C",
      "accent": "#FBBF24"
    }
  }'::jsonb,
  1
);

-- Insert Royal Theme
INSERT INTO templates (template_id, name, description, category, price_tier, price, config, sort_order)
VALUES (
  'royal',
  'Royal Gold',
  'Luxurious gold theme for grand weddings',
  'elegant',
  'basic',
  99,
  '{
    "colors": {
      "primary": "#78350F",
      "secondary": "#B45309",
      "accent": "#D4AF37"
    }
  }'::jsonb,
  2
);

-- Insert Modern Theme
INSERT INTO templates (template_id, name, description, category, price_tier, price, config, sort_order)
VALUES (
  'modern',
  'Modern Minimal',
  'Clean and contemporary design',
  'modern',
  'premium',
  149,
  '{
    "colors": {
      "primary": "#1E293B",
      "secondary": "#475569",
      "accent": "#EC4899"
    }
  }'::jsonb,
  3
);

-- Insert Traditional Light Theme
INSERT INTO templates (template_id, name, description, category, price_tier, price, config, sort_order)
VALUES (
  'traditional-light',
  'Traditional Light',
  'Light and airy traditional theme',
  'traditional',
  'free',
  0,
  '{
    "colors": {
      "primary": "#D97706",
      "secondary": "#B91C1C",
      "accent": "#FBBF24"
    }
  }'::jsonb,
  4
);

-- Insert Royal Light Theme
INSERT INTO templates (template_id, name, description, category, price_tier, price, config, sort_order)
VALUES (
  'royal-light',
  'Royal Light',
  'Elegant light theme with gold accents',
  'elegant',
  'basic',
  99,
  '{
    "colors": {
      "primary": "#78350F",
      "secondary": "#B45309",
      "accent": "#D4AF37"
    }
  }'::jsonb,
  5
);

-- Insert Modern Light Theme
INSERT INTO templates (template_id, name, description, category, price_tier, price, config, sort_order)
VALUES (
  'modern-light',
  'Modern Light',
  'Contemporary light theme',
  'modern',
  'premium',
  149,
  '{
    "colors": {
      "primary": "#1E293B",
      "secondary": "#475569",
      "accent": "#EC4899"
    }
  }'::jsonb,
  6
);
```

3. Click **"Run"**
4. Verify: Go to **Table Editor** → **templates** → You should see 6 rows

---

## 🎉 **STEP 8: Verify Everything Works**

### **Checklist:**

- ✅ Supabase project created
- ✅ API keys saved to `.env.local`
- ✅ Database schema migrated (8 tables)
- ✅ Storage buckets created (3 buckets)
- ✅ Authentication enabled
- ✅ Database connection tested
- ✅ 6 themes inserted

---

## 🚨 **Troubleshooting**

### **Problem: "Failed to connect"**
**Solution:** Check `.env.local` file has correct URL and keys

### **Problem: "Row Level Security" errors**
**Solution:** You're not authenticated. Need to implement login first.

### **Problem: "Relation does not exist"**
**Solution:** Tables not created. Re-run migration SQL.

### **Problem: "Storage bucket not found"**
**Solution:** Create storage buckets in Supabase dashboard.

---

## 📚 **Next Steps**

Now that database is set up:

1. ✅ Build authentication pages (login/signup)
2. ✅ Create API routes for CRUD operations
3. ✅ Build dashboard page
4. ✅ Create invitation wizard

---

## 🎯 **Quick Commands Reference**

```bash
# Start dev server
npm run dev

# Test database
open http://localhost:3000/test-db

# View Supabase logs
# Go to Supabase Dashboard → Logs

# Generate TypeScript types (after schema changes)
npx supabase gen types typescript --project-id YOUR_PROJECT_ID > types/database.ts
```

---

## 💾 **Backup Your Database**

**Important:** Always backup before making changes!

1. Go to **Database** → **Backups** in Supabase
2. Click **"Create backup"**
3. Backups are automatic daily, but manual backup is good practice

---

**🎉 Congratulations! Your database is now ready!**

**Time taken:** ~30-40 minutes  
**What's next:** Build authentication and API routes

---

## 📞 **Need Help?**

- Supabase Docs: https://supabase.com/docs
- Supabase Discord: https://discord.supabase.com
- Stack Overflow: Tag [supabase]

---

**Your database setup is complete! Ready to build the backend! 🚀**
