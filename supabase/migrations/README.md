# 🗄️ Database Migrations

## Migration Files

### ✅ Active Migrations

1. **`001_initial_schema.sql`** - Core database schema
   - User profiles
   - Templates table
   - Invitations table
   - Guests table
   - RSVPs table
   - Payments table
   - All RLS policies

2. **`002_v2_fresh_start.sql`** - V2 fresh start
   - Cleans old template data
   - Adds Royal V2 placeholder (inactive)
   - Utility functions for queries
   - Ready for new V2 templates

3. **`003_view_counter_function.sql`** - View counter utility
   - Function to increment invitation views
   - Used for analytics

---

## 🚀 How to Run Migrations

### Initial Setup (New Database)

```bash
# Run migrations in order
psql -h your-db-host -U postgres -d your-db < 001_initial_schema.sql
psql -h your-db-host -U postgres -d your-db < 002_v2_fresh_start.sql
psql -h your-db-host -U postgres -d your-db < 003_view_counter_function.sql
```

### Using Supabase CLI

```bash
# Link to your project
supabase link --project-ref your-project-ref

# Run all migrations
supabase db push

# Or run specific migration
supabase db push --include-all --schema public
```

### Using Supabase Dashboard

1. Go to SQL Editor in Supabase Dashboard
2. Copy contents of each migration file
3. Run in order (001 → 002 → 003)

---

## 📊 Database Structure

### Core Tables

**users (Supabase Auth)**
- Managed by Supabase Auth

**user_profiles**
- Extended user information
- Links to auth.users

**templates**
- Wedding invitation templates
- Stores V2 config (JSON)
- Categories, pricing, features

**invitations**
- User-created invitations
- Links to templates
- Stores customization data
- Status: draft/published/archived

**guests**
- Guest lists for invitations
- Tracking (views, etc.)
- Unique guest codes

**rsvps**
- Guest RSVP responses
- Attendance, meal preferences
- Custom fields

**payments**
- Payment transactions
- Razorpay integration
- Status tracking

---

## 🔐 Row Level Security (RLS)

All tables have RLS enabled:

- **Templates**: Anyone can view active templates
- **Invitations**: Users see own, anyone sees published
- **Guests**: Users manage guests for own invitations
- **RSVPs**: Users see own, anyone can submit for published invitations
- **Payments**: Users see own payments only

---

## 📝 Adding New Templates

When you build a new V2 template:

### Step 1: Create the template in code
```
/components/templates-v2/themes/YourTemplate/
```

### Step 2: Add to database

Create migration file: `004_add_your_template.sql`

```sql
INSERT INTO public.templates (
  template_id,
  name,
  description,
  category,
  thumbnail_url,
  preview_video_url,
  price_tier,
  price,
  config,
  is_active,
  sort_order
) VALUES (
  'your-template-v2',
  'Your Template Name',
  'Amazing description...',
  'category',
  '/templates/your-template/thumbnail.jpg',
  '/templates/your-template/preview.mp4',
  'premium',
  149,
  '{
    "version": "2.0",
    "features": { ... },
    "colors": { ... },
    "animations": { ... }
  }'::jsonb,
  true,
  2
);
```

### Step 3: Run migration
```bash
supabase db push
```

---

## 🧹 Clean Database (Reset)

If you need to reset the database completely:

```sql
-- ⚠️ WARNING: This deletes ALL data!

DROP TABLE IF EXISTS public.payments CASCADE;
DROP TABLE IF EXISTS public.rsvps CASCADE;
DROP TABLE IF EXISTS public.guests CASCADE;
DROP TABLE IF EXISTS public.invitations CASCADE;
DROP TABLE IF EXISTS public.templates CASCADE;
DROP TABLE IF EXISTS public.user_profiles CASCADE;

DROP FUNCTION IF EXISTS increment_view_count(UUID);
DROP FUNCTION IF EXISTS get_templates_by_category(TEXT);
DROP FUNCTION IF EXISTS get_template_details(UUID);

-- Then run migrations again from scratch
```

---

## 🔍 Useful Queries

### View all templates
```sql
SELECT template_id, name, category, price_tier, price, is_active
FROM public.templates
ORDER BY sort_order;
```

### View user's invitations
```sql
SELECT i.title, i.slug, i.status, t.name as template_name
FROM public.invitations i
JOIN public.templates t ON i.template_id = t.id
WHERE i.user_id = 'user-uuid'
ORDER BY i.created_at DESC;
```

### Count RSVPs by invitation
```sql
SELECT 
  i.title,
  COUNT(r.id) as total_rsvps,
  SUM(CASE WHEN r.attending = 'yes' THEN 1 ELSE 0 END) as attending_count
FROM public.invitations i
LEFT JOIN public.rsvps r ON r.invitation_id = i.id
GROUP BY i.id, i.title;
```

---

## 📚 Migration Best Practices

1. **Always backup before running migrations**
2. **Test migrations on staging first**
3. **Migrations should be idempotent** (safe to run multiple times)
4. **Use IF NOT EXISTS when creating tables/functions**
5. **Keep migrations small and focused**
6. **Document what each migration does**

---

## 🚦 Migration Status

| Migration | Status | Description |
|-----------|--------|-------------|
| 001_initial_schema.sql | ✅ Ready | Core tables and RLS |
| 002_v2_fresh_start.sql | ✅ Ready | V2 fresh start |
| 003_view_counter_function.sql | ✅ Ready | Utility function |
| 004_seed_royal_template.sql | ⏳ Waiting | Add when Royal template is built |
| 005_seed_traditional_template.sql | ⏳ Waiting | Add when Traditional is built |

---

## 🆘 Troubleshooting

### Permission Errors
```sql
-- Grant all permissions to authenticated users
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO authenticated, anon;
```

### RLS Blocking Queries
```sql
-- Temporarily disable RLS for testing (DON'T DO IN PRODUCTION!)
ALTER TABLE table_name DISABLE ROW LEVEL SECURITY;

-- Re-enable
ALTER TABLE table_name ENABLE ROW LEVEL SECURITY;
```

### Check RLS Policies
```sql
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE schemaname = 'public';
```

---

**Last Updated:** After V2 cleanup (January 2025)
