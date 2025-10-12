# 🚀 RUN MIGRATIONS - READY TO EXECUTE

**Your Supabase Project:** `hbecavxgtddbufyoewcw.supabase.co`  
**Status:** ✅ Credentials configured!  
**Time Required:** 5-10 minutes

---

## 📋 **MIGRATIONS TO RUN (In Order)**

### **Migration 1: Initial Schema** 🔴 CRITICAL
**File:** `001_initial_schema.sql`  
**What it creates:**
- ✅ user_profiles table
- ✅ templates table
- ✅ invitations table
- ✅ guests table
- ✅ rsvps table
- ✅ payments table
- ✅ media_files table
- ✅ All relationships
- ✅ All indexes
- ✅ All RLS policies
- ✅ Triggers for updated_at

**Status:** 🔴 Need to run

---

### **Migration 2: Seed Templates** 🟡 IMPORTANT
**File:** `002_seed_templates.sql`  
**What it does:**
- ✅ Inserts all 6 templates into database
- ✅ Traditional (FREE)
- ✅ Royal (₹99)
- ✅ Modern (₹149)
- ✅ Traditional Light (FREE)
- ✅ Royal Light (₹99)
- ✅ Modern Light (₹149)

**Status:** 🔴 Need to run (after #1)

---

### **Migration 3: View Counter** 🟢 OPTIONAL
**File:** `003_view_counter_function.sql`  
**What it creates:**
- ✅ increment_view_count() function
- ✅ Auto-increment invitation views

**Status:** 🔴 Need to run (after #1)

---

## 🎯 **HOW TO RUN MIGRATIONS**

### **Option A: Supabase Dashboard (RECOMMENDED)** ✅

1. **Open Supabase Dashboard:**
   ```
   https://supabase.com/dashboard/project/hbecavxgtddbufyoewcw
   ```

2. **Go to SQL Editor:**
   - Click "SQL Editor" in left sidebar
   - Click "New Query"

3. **Run Migration 001:**
   - Copy entire content of `001_initial_schema.sql`
   - Paste into SQL editor
   - Click "Run" button (or Ctrl+Enter)
   - Wait for "Success" message
   - Verify: Check "Table Editor" - should see 7 tables

4. **Run Migration 002:**
   - Create new query
   - Copy entire content of `002_seed_templates.sql`
   - Paste and Run
   - Verify: Check templates table - should have 6 rows

5. **Run Migration 003:**
   - Create new query
   - Copy entire content of `003_view_counter_function.sql`
   - Paste and Run
   - Verify: Check Functions - should see `increment_view_count`

---

### **Option B: Command Line (Supabase CLI)**

If you have Supabase CLI installed:

```bash
# Link project
supabase link --project-ref hbecavxgtddbufyoewcw

# Run migrations
supabase db push

# Or run individually
psql "postgresql://postgres:[YOUR_PASSWORD]@db.hbecavxgtddbufyoewcw.supabase.co:5432/postgres" < supabase/migrations/001_initial_schema.sql
psql "postgresql://postgres:[YOUR_PASSWORD]@db.hbecavxgtddbufyoewcw.supabase.co:5432/postgres" < supabase/migrations/002_seed_templates.sql
psql "postgresql://postgres:[YOUR_PASSWORD]@db.hbecavxgtddbufyoewcw.supabase.co:5432/postgres" < supabase/migrations/003_view_counter_function.sql
```

---

## ✅ **VERIFICATION STEPS**

After running migrations, verify everything is setup:

### **1. Check Tables Created:**
Go to: `Table Editor` in Supabase Dashboard

Should see:
- ✅ user_profiles
- ✅ templates
- ✅ invitations
- ✅ guests
- ✅ rsvps
- ✅ payments
- ✅ media_files

### **2. Check Templates Seeded:**
Open `templates` table

Should have 6 rows:
- ✅ traditional (price: 0)
- ✅ royal (price: 99)
- ✅ modern (price: 149)
- ✅ traditional-light (price: 0)
- ✅ royal-light (price: 99)
- ✅ modern-light (price: 149)

### **3. Check Function Created:**
Go to: `Database` → `Functions`

Should see:
- ✅ increment_view_count()

### **4. Test Connection from App:**
```bash
npm run dev
# Visit http://localhost:3000/dashboard
# Should redirect to login (auth working!)
# Should not show errors
```

---

## 🔍 **COMMON ISSUES & FIXES**

### **Error: "relation already exists"**
**Cause:** Tables already created
**Fix:** Skip migration 001 or drop tables first

### **Error: "duplicate key value"**
**Cause:** Templates already seeded
**Fix:** Skip migration 002 or delete existing templates

### **Error: "permission denied"**
**Cause:** Using anon key instead of service role key
**Fix:** Run migrations from dashboard (uses admin privileges)

### **Error: "syntax error"**
**Cause:** Incomplete SQL copied
**Fix:** Copy ENTIRE file contents

---

## 📊 **WHAT HAPPENS AFTER MIGRATIONS**

### **Immediately Available:**
```
✅ Users can sign up/login
✅ Dashboard loads user data
✅ Templates browser shows 6 templates
✅ Create wizard saves to database
✅ Invitations publish successfully
✅ Public URLs work
✅ View counter increments
```

### **What You Can Test:**
```
1. Sign up new user ✅
2. Create invitation ✅
3. Select template ✅
4. Edit sections ✅
5. Publish ✅
6. Visit public URL ✅
7. Verify in database ✅
```

---

## 🚀 **NEXT STEPS AFTER MIGRATIONS**

Once migrations are successful:

### **Immediate (10 mins):**
1. ✅ Test signup/login
2. ✅ Test create invitation
3. ✅ Test publish
4. ✅ Verify public view

### **Short Term (2-3 hours):**
1. ✅ Build edit page
2. ✅ Add share buttons
3. ✅ Test on mobile

### **This Week:**
1. ✅ Create landing page
2. ✅ Add RSVP backend
3. ✅ File upload
4. ✅ Launch! 🎉

---

## 💡 **PRO TIPS**

### **Backup Before Running:**
```
Your database is new, but good practice:
- Export schema (if needed)
- Take snapshot in Supabase
```

### **Run in Order:**
```
MUST run in this exact order:
1. 001_initial_schema.sql (creates structure)
2. 002_seed_templates.sql (needs templates table)
3. 003_view_counter_function.sql (needs invitations table)
```

### **Check for Errors:**
```
After each migration:
- Look for error messages
- Verify tables/functions created
- Don't proceed if errors
```

---

## 🎯 **READY TO RUN?**

**Best Method:** Use Supabase Dashboard SQL Editor

**Steps:**
1. Open: https://supabase.com/dashboard/project/hbecavxgtddbufyoewcw
2. Click: SQL Editor
3. Run: 001_initial_schema.sql
4. Verify: Tables created
5. Run: 002_seed_templates.sql
6. Verify: 6 templates exist
7. Run: 003_view_counter_function.sql
8. Verify: Function created

**Time:** 5-10 minutes total

**Then:** Test the app! 🚀

---

## ⚠️ **IMPORTANT REMINDERS**

- ✅ Backup your Supabase project URL and keys (already in .env.local)
- ✅ Don't share your SERVICE_ROLE_KEY publicly
- ✅ Keep .env.local in .gitignore for production
- ✅ Run migrations in correct order
- ✅ Verify each step before continuing

---

**READY? GO RUN THE MIGRATIONS!** 🚀

**I'll be here to help if you encounter any issues!** 💪
