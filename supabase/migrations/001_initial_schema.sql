-- WebKankotri Database Schema
-- Migration 001: Initial Schema
-- Created: 2025-10-12

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- 1. USER PROFILES TABLE
-- ============================================================================
-- Extends Supabase auth.users with custom profile data

CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS user_profiles_created_at_idx ON public.user_profiles(created_at);

-- Enable Row Level Security
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Users can only see/edit their own profile
CREATE POLICY "Users can view own profile" ON public.user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.user_profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.user_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- ============================================================================
-- 2. TEMPLATES TABLE
-- ============================================================================
-- Stores all available invitation templates/themes

CREATE TABLE IF NOT EXISTS public.templates (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  template_id TEXT UNIQUE NOT NULL, -- 'traditional', 'royal', 'modern'
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL, -- 'traditional', 'modern', 'elegant'
  thumbnail_url TEXT,
  preview_video_url TEXT,
  price_tier TEXT NOT NULL DEFAULT 'free', -- 'free', 'basic', 'premium'
  price INTEGER NOT NULL DEFAULT 0, -- Price in rupees
  config JSONB NOT NULL DEFAULT '{}', -- Full theme configuration
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS templates_template_id_idx ON public.templates(template_id);
CREATE INDEX IF NOT EXISTS templates_category_idx ON public.templates(category);
CREATE INDEX IF NOT EXISTS templates_price_tier_idx ON public.templates(price_tier);
CREATE INDEX IF NOT EXISTS templates_is_active_idx ON public.templates(is_active);
CREATE INDEX IF NOT EXISTS templates_sort_order_idx ON public.templates(sort_order);

-- Enable RLS
ALTER TABLE public.templates ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Everyone can view active templates
CREATE POLICY "Anyone can view active templates" ON public.templates
  FOR SELECT USING (is_active = true);

-- Only admins can modify (we'll add admin role later)
-- For now, templates are managed via direct SQL

-- ============================================================================
-- 3. INVITATIONS TABLE
-- ============================================================================
-- Stores user-created invitations

CREATE TABLE IF NOT EXISTS public.invitations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE NOT NULL,
  template_id UUID REFERENCES public.templates(id) NOT NULL,
  
  -- Basic info
  title TEXT NOT NULL, -- e.g., "Raj & Priya's Wedding"
  slug TEXT UNIQUE NOT NULL, -- URL-friendly: raj-priya-wedding
  
  -- Invitation data (JSONB for flexibility)
  data JSONB NOT NULL DEFAULT '{}', -- All section data
  
  -- Customizations
  customizations JSONB DEFAULT '{}', -- Color/font overrides
  
  -- Status
  status TEXT NOT NULL DEFAULT 'draft', -- 'draft', 'published', 'archived'
  
  -- Payment
  is_paid BOOLEAN NOT NULL DEFAULT false,
  payment_id UUID, -- Reference to payments table
  
  -- Analytics
  view_count INTEGER NOT NULL DEFAULT 0,
  unique_view_count INTEGER NOT NULL DEFAULT 0,
  
  -- Metadata
  wedding_date DATE, -- For sorting/filtering
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS invitations_user_id_idx ON public.invitations(user_id);
CREATE INDEX IF NOT EXISTS invitations_template_id_idx ON public.invitations(template_id);
CREATE INDEX IF NOT EXISTS invitations_slug_idx ON public.invitations(slug);
CREATE INDEX IF NOT EXISTS invitations_status_idx ON public.invitations(status);
CREATE INDEX IF NOT EXISTS invitations_wedding_date_idx ON public.invitations(wedding_date);
CREATE INDEX IF NOT EXISTS invitations_created_at_idx ON public.invitations(created_at);

-- Enable RLS
ALTER TABLE public.invitations ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Users can view their own invitations
CREATE POLICY "Users can view own invitations" ON public.invitations
  FOR SELECT USING (auth.uid() = user_id);

-- Users can create invitations
CREATE POLICY "Users can create invitations" ON public.invitations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own draft invitations
CREATE POLICY "Users can update own invitations" ON public.invitations
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete their own invitations
CREATE POLICY "Users can delete own invitations" ON public.invitations
  FOR DELETE USING (auth.uid() = user_id);

-- Anyone can view published invitations (for public sharing)
CREATE POLICY "Anyone can view published invitations" ON public.invitations
  FOR SELECT USING (status = 'published');

-- ============================================================================
-- 4. GUESTS TABLE
-- ============================================================================
-- Stores guest list for invitations

CREATE TABLE IF NOT EXISTS public.guests (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  invitation_id UUID REFERENCES public.invitations(id) ON DELETE CASCADE NOT NULL,
  
  -- Guest info
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  
  -- Guest code for personalized access
  guest_code TEXT UNIQUE, -- e.g., 'RAJ-PRIYA-001'
  
  -- Tracking
  has_viewed BOOLEAN NOT NULL DEFAULT false,
  view_count INTEGER NOT NULL DEFAULT 0,
  last_viewed_at TIMESTAMP WITH TIME ZONE,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS guests_invitation_id_idx ON public.guests(invitation_id);
CREATE INDEX IF NOT EXISTS guests_guest_code_idx ON public.guests(guest_code);
CREATE INDEX IF NOT EXISTS guests_email_idx ON public.guests(email);

-- Enable RLS
ALTER TABLE public.guests ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Users can manage guests for their own invitations
CREATE POLICY "Users can view own invitation guests" ON public.guests
  FOR SELECT USING (
    invitation_id IN (
      SELECT id FROM public.invitations WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own invitation guests" ON public.guests
  FOR INSERT WITH CHECK (
    invitation_id IN (
      SELECT id FROM public.invitations WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own invitation guests" ON public.guests
  FOR UPDATE USING (
    invitation_id IN (
      SELECT id FROM public.invitations WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete own invitation guests" ON public.guests
  FOR DELETE USING (
    invitation_id IN (
      SELECT id FROM public.invitations WHERE user_id = auth.uid()
    )
  );

-- ============================================================================
-- 5. RSVPS TABLE
-- ============================================================================
-- Stores RSVP responses from guests

CREATE TABLE IF NOT EXISTS public.rsvps (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  invitation_id UUID REFERENCES public.invitations(id) ON DELETE CASCADE NOT NULL,
  guest_id UUID REFERENCES public.guests(id) ON DELETE SET NULL,
  
  -- RSVP data
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  attending TEXT NOT NULL, -- 'yes', 'no', 'maybe'
  guest_count INTEGER DEFAULT 1,
  meal_preference TEXT, -- 'veg', 'non-veg', 'vegan', 'jain'
  message TEXT,
  
  -- Additional data (flexible)
  custom_fields JSONB DEFAULT '{}',
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS rsvps_invitation_id_idx ON public.rsvps(invitation_id);
CREATE INDEX IF NOT EXISTS rsvps_guest_id_idx ON public.rsvps(guest_id);
CREATE INDEX IF NOT EXISTS rsvps_attending_idx ON public.rsvps(attending);
CREATE INDEX IF NOT EXISTS rsvps_created_at_idx ON public.rsvps(created_at);

-- Enable RLS
ALTER TABLE public.rsvps ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Users can view RSVPs for their own invitations
CREATE POLICY "Users can view own invitation rsvps" ON public.rsvps
  FOR SELECT USING (
    invitation_id IN (
      SELECT id FROM public.invitations WHERE user_id = auth.uid()
    )
  );

-- Anyone can submit RSVP (for published invitations)
CREATE POLICY "Anyone can submit rsvp" ON public.rsvps
  FOR INSERT WITH CHECK (
    invitation_id IN (
      SELECT id FROM public.invitations WHERE status = 'published'
    )
  );

-- Users can update RSVPs for their invitations (admin function)
CREATE POLICY "Users can update own invitation rsvps" ON public.rsvps
  FOR UPDATE USING (
    invitation_id IN (
      SELECT id FROM public.invitations WHERE user_id = auth.uid()
    )
  );

-- ============================================================================
-- 6. PAYMENTS TABLE
-- ============================================================================
-- Stores payment transactions

CREATE TABLE IF NOT EXISTS public.payments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE NOT NULL,
  invitation_id UUID REFERENCES public.invitations(id) ON DELETE SET NULL,
  template_id UUID REFERENCES public.templates(id) NOT NULL,
  
  -- Payment details
  amount INTEGER NOT NULL, -- Amount in rupees
  currency TEXT NOT NULL DEFAULT 'INR',
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'success', 'failed', 'refunded'
  
  -- Razorpay details
  razorpay_order_id TEXT,
  razorpay_payment_id TEXT,
  razorpay_signature TEXT,
  
  -- Metadata
  payment_method TEXT, -- 'razorpay', 'upi', 'card'
  error_message TEXT,
  
  -- Timestamps
  paid_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS payments_user_id_idx ON public.payments(user_id);
CREATE INDEX IF NOT EXISTS payments_invitation_id_idx ON public.payments(invitation_id);
CREATE INDEX IF NOT EXISTS payments_template_id_idx ON public.payments(template_id);
CREATE INDEX IF NOT EXISTS payments_status_idx ON public.payments(status);
CREATE INDEX IF NOT EXISTS payments_razorpay_order_id_idx ON public.payments(razorpay_order_id);
CREATE INDEX IF NOT EXISTS payments_created_at_idx ON public.payments(created_at);

-- Enable RLS
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Users can view their own payments
CREATE POLICY "Users can view own payments" ON public.payments
  FOR SELECT USING (auth.uid() = user_id);

-- Users can create payments
CREATE POLICY "Users can create payments" ON public.payments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Only system can update payments (via service role)
-- No UPDATE policy for users

-- ============================================================================
-- 7. MEDIA FILES TABLE
-- ============================================================================
-- Stores uploaded media file references

CREATE TABLE IF NOT EXISTS public.media_files (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE NOT NULL,
  invitation_id UUID REFERENCES public.invitations(id) ON DELETE CASCADE,
  
  -- File info
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL, -- Path in Supabase Storage
  file_url TEXT NOT NULL, -- Public URL
  file_type TEXT NOT NULL, -- 'image', 'video'
  file_size INTEGER, -- Size in bytes
  mime_type TEXT,
  
  -- Image specific
  width INTEGER,
  height INTEGER,
  thumbnail_url TEXT,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS media_files_user_id_idx ON public.media_files(user_id);
CREATE INDEX IF NOT EXISTS media_files_invitation_id_idx ON public.media_files(invitation_id);
CREATE INDEX IF NOT EXISTS media_files_file_type_idx ON public.media_files(file_type);

-- Enable RLS
ALTER TABLE public.media_files ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Users can view their own media files
CREATE POLICY "Users can view own media files" ON public.media_files
  FOR SELECT USING (auth.uid() = user_id);

-- Users can upload media files
CREATE POLICY "Users can upload media files" ON public.media_files
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can delete their own media files
CREATE POLICY "Users can delete own media files" ON public.media_files
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================================================
-- 8. ANALYTICS TABLE (Optional - for tracking views)
-- ============================================================================
-- Stores detailed analytics events

CREATE TABLE IF NOT EXISTS public.analytics_events (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  invitation_id UUID REFERENCES public.invitations(id) ON DELETE CASCADE NOT NULL,
  
  -- Event details
  event_type TEXT NOT NULL, -- 'view', 'rsvp_submit', 'share', 'download'
  
  -- Visitor info (anonymous)
  visitor_id TEXT, -- Anonymous ID (cookie/localStorage)
  ip_address TEXT,
  user_agent TEXT,
  referrer TEXT,
  
  -- Location (optional)
  country TEXT,
  city TEXT,
  
  -- Metadata
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS analytics_events_invitation_id_idx ON public.analytics_events(invitation_id);
CREATE INDEX IF NOT EXISTS analytics_events_event_type_idx ON public.analytics_events(event_type);
CREATE INDEX IF NOT EXISTS analytics_events_created_at_idx ON public.analytics_events(created_at);

-- Enable RLS
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Users can view analytics for their own invitations
CREATE POLICY "Users can view own invitation analytics" ON public.analytics_events
  FOR SELECT USING (
    invitation_id IN (
      SELECT id FROM public.invitations WHERE user_id = auth.uid()
    )
  );

-- Anyone can create analytics events (for tracking)
CREATE POLICY "Anyone can create analytics events" ON public.analytics_events
  FOR INSERT WITH CHECK (true);

-- ============================================================================
-- FUNCTIONS & TRIGGERS
-- ============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to all tables
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_templates_updated_at
  BEFORE UPDATE ON public.templates
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_invitations_updated_at
  BEFORE UPDATE ON public.invitations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_guests_updated_at
  BEFORE UPDATE ON public.guests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_rsvps_updated_at
  BEFORE UPDATE ON public.rsvps
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payments_updated_at
  BEFORE UPDATE ON public.payments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================================
-- STORAGE BUCKETS (Run separately in Supabase Dashboard)
-- ============================================================================

-- Create storage buckets for media files
-- Run these in Supabase Dashboard > Storage:
-- 1. Create bucket: 'avatars' (public)
-- 2. Create bucket: 'invitation-photos' (public)
-- 3. Create bucket: 'invitation-videos' (public)

-- ============================================================================
-- SEED DATA - Insert default templates
-- ============================================================================
-- Will be added in next migration file

-- ============================================================================
-- END OF MIGRATION
-- ============================================================================
