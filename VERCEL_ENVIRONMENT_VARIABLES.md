# 🔐 VERCEL ENVIRONMENT VARIABLES GUIDE

**For:** Deploying WebKankotri to Vercel  
**When:** During initial deployment setup  

---

## ⚡ **REQUIRED VARIABLES (MUST ADD)**

### **Add These 5 Variables NOW:**

```bash
# 1. App URL (Add AFTER first deployment)
NEXT_PUBLIC_APP_URL=https://your-app-name.vercel.app

# 2. App Name
NEXT_PUBLIC_APP_NAME=E-Kankotri

# 3. Supabase Project URL
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co

# 4. Supabase Anonymous Key (Public)
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4eHh4eHh4eHh4eHgiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYyMzM2NzU2OSwiZXhwIjoxOTM4OTQzNTY5fQ.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# 5. Supabase Service Role Key (Secret - NEVER EXPOSE!)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4eHh4eHh4eHh4eCIsInJvbGUiOiJzZXJ2aWNlX3JvbGUiLCJpYXQiOjE2MjMzNjc1NjksImV4cCI6MTkzODk0MzU2OX0.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## 📋 **STEP-BY-STEP SETUP**

### **FIRST DEPLOYMENT (Add 4 variables):**

**DO NOT add `NEXT_PUBLIC_APP_URL` yet!**

Add these 4:
```
1. NEXT_PUBLIC_APP_NAME          = E-Kankotri
2. NEXT_PUBLIC_SUPABASE_URL      = (from Supabase)
3. NEXT_PUBLIC_SUPABASE_ANON_KEY = (from Supabase)
4. SUPABASE_SERVICE_ROLE_KEY     = (from Supabase)
```

**Why skip APP_URL?** Because Vercel hasn't assigned your domain yet!

---

### **AFTER FIRST DEPLOYMENT (Add 5th variable):**

1. Vercel will give you a URL like: `https://webkankotri-xyz123.vercel.app`
2. Go to **Settings → Environment Variables**
3. Add:
   ```
   NEXT_PUBLIC_APP_URL = https://webkankotri-xyz123.vercel.app
   ```
4. Redeploy (Vercel will do this automatically or click "Redeploy")

---

## 🔍 **WHERE TO FIND SUPABASE VALUES**

### **Step 1: Go to Supabase Dashboard**
👉 https://supabase.com/dashboard

### **Step 2: Select Your Project**

### **Step 3: Go to Settings → API**

You'll see:

**Project URL:**
```
https://xxxxxxxxxxxxx.supabase.co
```
☝️ Copy this for `NEXT_PUBLIC_SUPABASE_URL`

**Project API Keys:**

1. **anon public** (Safe to use in browser)
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFz...
   ```
   ☝️ Copy this for `NEXT_PUBLIC_SUPABASE_ANON_KEY`

2. **service_role** (Secret! Never expose!)
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFz...
   ```
   ☝️ Copy this for `SUPABASE_SERVICE_ROLE_KEY`

---

## ⚠️ **IMPORTANT SECURITY RULES**

### **✅ SAFE for Browser (NEXT_PUBLIC_*):**
```bash
NEXT_PUBLIC_APP_URL              ✅ Public
NEXT_PUBLIC_APP_NAME             ✅ Public
NEXT_PUBLIC_SUPABASE_URL         ✅ Public
NEXT_PUBLIC_SUPABASE_ANON_KEY    ✅ Public (RLS protects it)
```

### **🔐 NEVER EXPOSE (No NEXT_PUBLIC_):**
```bash
SUPABASE_SERVICE_ROLE_KEY        🔒 SECRET! Server-only!
```

**Why it's safe:**
- `NEXT_PUBLIC_` vars are sent to browser
- `SUPABASE_SERVICE_ROLE_KEY` stays on server
- Vercel keeps secrets secure

---

## 🚫 **OPTIONAL VARIABLES (DON'T ADD YET)**

**These are for future features:**

```bash
# Payment (Phase 2)
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
NEXT_PUBLIC_RAZORPAY_KEY_ID=

# Email (Phase 2)
RESEND_API_KEY=

# Admin (Phase 2)
ADMIN_EMAIL=
```

**Skip these for now!** Add them when you implement payments/emails.

---

## 📸 **VERCEL DASHBOARD SCREENSHOT**

**What it should look like:**

```
Environment Variables
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Name                                Value                  Environments
────────────────────────────────────────────────────────────────────────
NEXT_PUBLIC_APP_NAME                E-Kankotri            Production
NEXT_PUBLIC_SUPABASE_URL            https://xxx...        Production  
NEXT_PUBLIC_SUPABASE_ANON_KEY       eyJhbGciOi...        Production
SUPABASE_SERVICE_ROLE_KEY           eyJhbGciOi...        Production

                                    [+ Add New]
```

---

## ✅ **CHECKLIST FOR VERCEL SETUP**

### **Before Deployment:**
- [ ] Created Supabase project
- [ ] Ran 3 database migrations
- [ ] Copied Project URL from Supabase
- [ ] Copied anon key from Supabase
- [ ] Copied service_role key from Supabase

### **During Deployment:**
- [ ] Connected GitHub repo
- [ ] Framework: Next.js (auto-detected)
- [ ] Root Directory: `./` (default)
- [ ] Build Command: `npm run build` (default)
- [ ] Added 4 environment variables (not APP_URL yet)
- [ ] Clicked Deploy

### **After First Deployment:**
- [ ] Got Vercel URL (e.g., webkankotri-xyz.vercel.app)
- [ ] Added NEXT_PUBLIC_APP_URL variable
- [ ] Redeployed
- [ ] Tested live site

---

## 🎯 **QUICK COPY-PASTE FORMAT**

**For easy pasting into Vercel:**

```
Name: NEXT_PUBLIC_APP_NAME
Value: E-Kankotri
Environment: Production

Name: NEXT_PUBLIC_SUPABASE_URL
Value: [PASTE YOUR SUPABASE PROJECT URL]
Environment: Production

Name: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: [PASTE YOUR ANON KEY]
Environment: Production

Name: SUPABASE_SERVICE_ROLE_KEY
Value: [PASTE YOUR SERVICE ROLE KEY]
Environment: Production
```

---

## 💡 **PRO TIPS**

### **1. Environment Selection:**
When adding variables, select:
- ✅ **Production** (required)
- ✅ **Preview** (recommended)
- ⚠️ **Development** (optional, for `vercel dev`)

### **2. Testing Variables:**
After adding, you can test if they work:
```bash
# In your Vercel function logs, you'll see:
console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)
// Should print: https://xxxxx.supabase.co
```

### **3. Updating Variables:**
If you need to change a variable:
1. Settings → Environment Variables
2. Click the variable name
3. Edit value
4. Redeploy (automatic or manual)

---

## ⚡ **COMMON ISSUES & FIXES**

### **Issue 1: "Supabase client is not configured"**
**Fix:** Make sure all Supabase variables are added correctly

### **Issue 2: "Database connection failed"**
**Fix:** Check that `NEXT_PUBLIC_SUPABASE_URL` doesn't have trailing slash

### **Issue 3: "Auth not working"**
**Fix:** Verify `NEXT_PUBLIC_SUPABASE_ANON_KEY` is the **anon** key, not service_role

### **Issue 4: "Share links broken"**
**Fix:** Add `NEXT_PUBLIC_APP_URL` after first deployment

---

## 🚀 **READY TO DEPLOY?**

### **Final Check:**

```
✓ Supabase project created
✓ Migrations run successfully
✓ 3 API keys copied from Supabase
✓ GitHub repo connected to Vercel
✓ Ready to add 4 environment variables

DEPLOY NOW! 🎉
```

---

## 📞 **NEED HELP?**

**If deployment fails:**

1. **Check Build Logs** in Vercel dashboard
2. **Verify all 4 variables** are added
3. **Check Supabase keys** are correct
4. **Ensure migrations ran** in Supabase
5. **Check GitHub repo** has latest code

**Common build errors:**
- Missing environment variables → Add them
- Database connection failed → Check Supabase URL
- Type errors → Should be fixed (we built successfully)

---

## 🎉 **AFTER SUCCESSFUL DEPLOYMENT**

**Your app will be live at:**
```
https://webkankotri-[random].vercel.app
```

**Next steps:**
1. Add `NEXT_PUBLIC_APP_URL` variable
2. Redeploy
3. Test all features:
   - ✅ Landing page loads
   - ✅ Sign up works
   - ✅ Create invitation works
   - ✅ Share buttons work
4. Celebrate! 🎊

---

## 📋 **SUMMARY**

**Add to Vercel Environment Variables:**

| Priority | Variable | Where to Get | Security |
|----------|----------|--------------|----------|
| **REQUIRED** | NEXT_PUBLIC_APP_NAME | Set to "E-Kankotri" | Public |
| **REQUIRED** | NEXT_PUBLIC_SUPABASE_URL | Supabase Settings → API | Public |
| **REQUIRED** | NEXT_PUBLIC_SUPABASE_ANON_KEY | Supabase Settings → API | Public |
| **REQUIRED** | SUPABASE_SERVICE_ROLE_KEY | Supabase Settings → API | 🔒 SECRET |
| **AFTER DEPLOY** | NEXT_PUBLIC_APP_URL | Vercel gives you this | Public |
| *Optional* | Payment/Email vars | Skip for now | Various |

**Total to add NOW: 4 variables**  
**Add after first deploy: 1 variable**  
**Total required: 5 variables**

---

**GO ADD THEM AND DEPLOY! 🚀**
