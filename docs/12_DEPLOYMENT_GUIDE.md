# 🚀 DEPLOYMENT GUIDE

**Complete deployment process for production**

---

## 🎯 DEPLOYMENT OVERVIEW

### Platform: Vercel (Recommended)

**Why Vercel:**
- ✅ Zero-config Next.js deployment
- ✅ Edge network (fast worldwide)
- ✅ Automatic HTTPS
- ✅ Preview deployments for every PR
- ✅ Built-in analytics
- ✅ Generous free tier

**Alternative:** Netlify, AWS, DigitalOcean

---

## 📋 PRE-DEPLOYMENT CHECKLIST

### 1. Code Quality

- [ ] All TypeScript errors resolved (`npm run type-check`)
- [ ] No ESLint warnings (`npm run lint`)
- [ ] Code formatted (`npm run format`)
- [ ] All tests passing (`npm run test`)
- [ ] No console.log statements in production code
- [ ] Environment variables validated

### 2. Database

- [ ] All migrations run successfully
- [ ] Row Level Security policies enabled
- [ ] Sample data removed (if any)
- [ ] Indexes created
- [ ] Backup strategy in place

### 3. Security

- [ ] All API keys in environment variables
- [ ] No hardcoded secrets
- [ ] CORS configured properly
- [ ] RLS policies tested
- [ ] Security headers configured

### 4. Performance

- [ ] Images optimized
- [ ] Lighthouse score > 90
- [ ] Bundle size analyzed
- [ ] Code splitting implemented
- [ ] Loading states added

### 5. Content

- [ ] All placeholder content replaced
- [ ] Privacy policy added
- [ ] Terms of service added
- [ ] FAQ populated
- [ ] Contact information correct

---

## 🔧 VERCEL DEPLOYMENT STEPS

### Step 1: Prepare Repository

```bash
# 1. Initialize git (if not already)
git init

# 2. Add .gitignore
cat > .gitignore << EOF
# Dependencies
node_modules
.pnp
.pnp.js

# Testing
coverage

# Next.js
.next
out
build
dist

# Production
.vercel

# Environment
.env
.env*.local

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# IDE
.vscode
.idea
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Misc
*.pem
EOF

# 3. Commit code
git add .
git commit -m "Initial commit"

# 4. Push to GitHub
git remote add origin https://github.com/your-username/ekankotri.git
git branch -M main
git push -u origin main
```

---

### Step 2: Create Vercel Project

**Option A: Via Vercel Dashboard**

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Configure settings:
   - **Framework Preset:** Next.js
   - **Root Directory:** ./
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`
   - **Install Command:** `npm install`

**Option B: Via Vercel CLI**

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

---

### Step 3: Configure Environment Variables

In Vercel Dashboard → Settings → Environment Variables:

**Add all environment variables:**

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_APP_URL=https://ekankotri.com
RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_live_secret_here
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxxx
RESEND_API_KEY=re_xxxxxxxxxxxxx
```

**Important:** 
- Use **LIVE** keys for production (not test keys)
- Set `NEXT_PUBLIC_APP_URL` to your actual domain

---

### Step 4: Configure Custom Domain

1. Go to Project Settings → Domains
2. Add your domain: `ekankotri.com`
3. Add www redirect: `www.ekankotri.com` → `ekankotri.com`
4. Vercel will provide DNS records

**DNS Configuration:**

Add these records to your domain registrar:

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

Wait for DNS propagation (up to 48 hours, usually < 1 hour)

---

### Step 5: SSL Certificate

Vercel automatically provisions SSL certificates.

To verify:
1. Go to Project Settings → Domains
2. Check "SSL Certificate" status
3. Should show "Active"

---

## 🗄️ DATABASE DEPLOYMENT (SUPABASE)

### Step 1: Create Production Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Configure:
   - **Name:** ekankotri-prod
   - **Database Password:** Strong password
   - **Region:** Choose closest to your users (e.g., Mumbai for India)
   - **Pricing Plan:** Free or Pro (based on needs)

---

### Step 2: Run Migrations

```bash
# Install Supabase CLI
npm install -g supabase

# Link to project
supabase link --project-ref your-project-ref

# Push migrations
supabase db push

# Or manually run SQL in Supabase SQL Editor
```

**Run these in order:**

1. `00001_init_schema.sql` - Initial tables
2. `00002_create_rls_policies.sql` - Security policies
3. `00003_create_functions.sql` - Database functions
4. `00004_create_storage.sql` - Storage buckets
5. `00005_seed_data.sql` - Initial template data

---

### Step 3: Configure Storage

1. Go to Storage → Buckets
2. Create bucket: `template-media` (public)
3. Create bucket: `user-uploads` (private)
4. Set up policies (see DATABASE_SCHEMA.md)

---

### Step 4: Upload Template Assets

Upload template thumbnails and videos:

```bash
# Using Supabase CLI
supabase storage --project-ref your-ref upload template-media /templates/garba-night-thumb.jpg ./assets/garba-night-thumb.jpg

supabase storage --project-ref your-ref upload template-media /templates/garba-night-preview.mp4 ./assets/garba-night-preview.mp4
```

Or via Supabase Dashboard → Storage → Upload

---

## 💳 PAYMENT GATEWAY SETUP

### Switch Razorpay to Live Mode

1. Go to [dashboard.razorpay.com](https://dashboard.razorpay.com)
2. Complete KYC verification (required for live mode)
3. Go to Settings → API Keys
4. Generate Live API Keys:
   - **Key ID:** rzp_live_xxxxxxxxxxxxx
   - **Key Secret:** xxxxxxxxxxxxxxxxxxxxx
5. Update environment variables in Vercel with live keys

**Test payment flow in production:**

```bash
# Use real card in test
Card Number: 4111 1111 1111 1111
Expiry: Any future date
CVV: Any 3 digits
```

Verify:
- Payment succeeds
- Order created in Razorpay dashboard
- Webhook triggered (if configured)
- Database updated

---

## 📧 EMAIL SERVICE SETUP (RESEND)

1. Go to [resend.com](https://resend.com)
2. Verify your domain:
   - Add DNS records:
     ```
     Type: TXT
     Name: resend._domainkey
     Value: [provided by Resend]
     ```
3. Get API key
4. Update `RESEND_API_KEY` in Vercel

**Test email:**

```typescript
// Send test email
await resend.emails.send({
  from: 'E-Kankotri <noreply@ekankotri.com>',
  to: 'your-email@example.com',
  subject: 'Test Email',
  html: '<p>Test email from E-Kankotri</p>',
})
```

---

## 📊 ANALYTICS SETUP (UMAMI - OPTIONAL)

### Self-Hosted Analytics

1. Deploy Umami on Railway/Vercel
2. Create website in Umami
3. Get tracking code
4. Add environment variables:
   ```
   NEXT_PUBLIC_UMAMI_WEBSITE_ID=xxx-xxx-xxx
   NEXT_PUBLIC_UMAMI_URL=https://analytics.your-domain.com
   ```

5. Add tracking script to `app/layout.tsx`:

```typescript
{process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID && (
  <Script
    src={`${process.env.NEXT_PUBLIC_UMAMI_URL}/script.js`}
    data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
    strategy="afterInteractive"
  />
)}
```

---

## 🔄 CI/CD PIPELINE

Vercel automatically deploys on every push to `main`.

### Branch Configuration

- **main** → Production (ekankotri.com)
- **staging** → Staging (ekankotri-git-staging.vercel.app)
- **feature/** → Preview (ekankotri-git-feature-xxx.vercel.app)

### GitHub Actions (Optional)

**File:** `.github/workflows/ci.yml`

```yaml
name: CI

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Type check
        run: npm run type-check

      - name: Lint
        run: npm run lint

      - name: Format check
        run: npm run format:check

      - name: Test
        run: npm run test

      - name: Build
        run: npm run build
```

---

## 🔍 POST-DEPLOYMENT VERIFICATION

### 1. Functional Testing

- [ ] Landing page loads
- [ ] Demo mode works (try template)
- [ ] Real-time preview updates
- [ ] Payment flow works (test transaction)
- [ ] PDF generation works
- [ ] WhatsApp share works
- [ ] Login/signup works
- [ ] Dashboard loads invitations
- [ ] Edit invitation works
- [ ] Download PDF works

### 2. Performance Testing

```bash
# Run Lighthouse
npx lighthouse https://ekankotri.com --view

# Check Core Web Vitals
# Visit: https://pagespeed.web.dev/
# Enter: https://ekankotri.com
```

**Target Metrics:**
- Performance: > 90
- Accessibility: > 95
- Best Practices: > 90
- SEO: > 90
- LCP: < 2.5s
- FID: < 100ms
- CLS: < 0.1

### 3. Security Testing

- [ ] HTTPS enabled (padlock in browser)
- [ ] Security headers present (check with securityheaders.com)
- [ ] No sensitive data in client-side code
- [ ] API endpoints require authentication
- [ ] RLS policies work (test with different users)

### 4. SEO Testing

- [ ] Meta tags present (title, description)
- [ ] Open Graph tags (for social sharing)
- [ ] Sitemap generated
- [ ] robots.txt configured
- [ ] Schema markup added

---

## 🚨 ROLLBACK PROCEDURE

If deployment fails:

### Via Vercel Dashboard

1. Go to Deployments
2. Find last working deployment
3. Click "..." → "Promote to Production"

### Via Vercel CLI

```bash
# List deployments
vercel ls

# Rollback to specific deployment
vercel rollback [deployment-url]
```

---

## 📊 MONITORING

### Vercel Analytics

Built-in metrics:
- Page views
- Top pages
- Top referrers
- Devices
- Locations

### Supabase Monitoring

Dashboard shows:
- Database size
- API requests
- Active connections
- Error rate

### Custom Monitoring

**File:** `lib/monitoring.ts`

```typescript
export function logError(error: Error, context?: any) {
  console.error('Application Error:', {
    message: error.message,
    stack: error.stack,
    context,
    timestamp: new Date().toISOString(),
  })

  // Send to error tracking service (e.g., Sentry)
  // Sentry.captureException(error)
}

export function logEvent(event: string, data?: any) {
  if (process.env.NODE_ENV === 'production') {
    // Log to analytics
    console.log('Event:', event, data)
  }
}
```

---

## ✅ DEPLOYMENT CHECKLIST

**Pre-Deploy:**
- [ ] Code tested locally
- [ ] Environment variables prepared
- [ ] Database migrated
- [ ] Assets uploaded

**Deploy:**
- [ ] Code pushed to GitHub
- [ ] Vercel project created
- [ ] Environment variables set
- [ ] Custom domain configured
- [ ] SSL certificate active

**Post-Deploy:**
- [ ] All features tested
- [ ] Performance verified
- [ ] Security checked
- [ ] Monitoring set up
- [ ] Team notified

**Go Live:**
- [ ] DNS updated
- [ ] Payment gateway live
- [ ] Email service active
- [ ] Analytics tracking
- [ ] Backups configured

---

Deployment process is production-ready with comprehensive verification steps.
