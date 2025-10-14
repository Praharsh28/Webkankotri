-- ============================================================================
-- WebKankotri V2 - SAFE Template Reset (Preserves User Data)
-- ============================================================================
-- This migration ONLY resets templates, keeping user invitations/data intact
-- Use this if you have existing users/invitations you want to keep
-- ============================================================================

-- ⚠️ IMPORTANT: This will NOT delete user data (invitations, RSVPs, etc.)
-- It only removes old templates and adds new V2 templates

-- ============================================================================
-- Step 1: Mark all templates as inactive (don't delete yet)
-- ============================================================================
-- This prevents users from creating new invitations with old templates
-- but existing invitations will still work

UPDATE public.templates
SET is_active = false
WHERE template_id NOT LIKE '%-v2'; -- Keep any V2 templates if they exist

-- ============================================================================
-- Step 2: Add V2 Templates
-- ============================================================================

-- Check if Royal V2 already exists, if not insert it
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
)
SELECT
  'royal-v2',
  'Royal Palace (V2)',
  'Luxurious palace-inspired template with video backgrounds, 3D effects, and stunning animations. Coming Soon!',
  'royal',
  '/templates/royal-v2/thumbnail.jpg',
  '/templates/royal-v2/preview.mp4',
  'premium',
  149,
  '{
    "version": "2.0",
    "features": {
      "videoBackground": true,
      "audioPlayer": true,
      "photoCarousel": true,
      "countdown": true,
      "fireworks": true,
      "parallax": true,
      "particles": true,
      "flipCard3D": true
    },
    "colors": {
      "primary": "#5D1A8B",
      "secondary": "#D4AF37",
      "accent": "#FF6B9D",
      "background": "#0F0019"
    },
    "animations": {
      "particles": {
        "type": "custom",
        "emojis": ["👑", "💎", "✨"],
        "count": 100,
        "speed": "slow"
      },
      "parallax": {
        "enabled": true,
        "speed": 0.5
      },
      "entrance": {
        "type": "curtain-reveal",
        "duration": 1.5
      }
    },
    "fonts": {
      "heading": "Playfair Display",
      "body": "Inter"
    }
  }'::jsonb,
  false,  -- Not active yet (coming soon)
  1
WHERE NOT EXISTS (
  SELECT 1 FROM public.templates WHERE template_id = 'royal-v2'
);

-- ============================================================================
-- Step 3: Create utility functions (if not exist)
-- ============================================================================

-- Function to get active templates by category
CREATE OR REPLACE FUNCTION get_templates_by_category(category_name TEXT)
RETURNS TABLE (
  id UUID,
  template_id TEXT,
  name TEXT,
  description TEXT,
  thumbnail_url TEXT,
  price_tier TEXT,
  price INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    t.id,
    t.template_id,
    t.name,
    t.description,
    t.thumbnail_url,
    t.price_tier,
    t.price
  FROM public.templates t
  WHERE t.category = category_name
    AND t.is_active = true
  ORDER BY t.sort_order ASC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION get_templates_by_category(TEXT) TO anon, authenticated;

-- Function to get template by ID with full config
CREATE OR REPLACE FUNCTION get_template_details(template_uuid UUID)
RETURNS TABLE (
  id UUID,
  template_id TEXT,
  name TEXT,
  description TEXT,
  category TEXT,
  thumbnail_url TEXT,
  preview_video_url TEXT,
  price_tier TEXT,
  price INTEGER,
  config JSONB
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    t.id,
    t.template_id,
    t.name,
    t.description,
    t.category,
    t.thumbnail_url,
    t.preview_video_url,
    t.price_tier,
    t.price,
    t.config
  FROM public.templates t
  WHERE t.id = template_uuid
    AND t.is_active = true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION get_template_details(UUID) TO anon, authenticated;

-- ============================================================================
-- OPTIONAL: Clean up old templates (only after migrating invitations)
-- ============================================================================
-- Uncomment this ONLY after you've:
-- 1. Migrated all existing invitations to use V2 templates
-- 2. Or after you're sure old templates are no longer needed

/*
DELETE FROM public.templates
WHERE is_active = false
  AND template_id NOT LIKE '%-v2';
*/

-- ============================================================================
-- MIGRATION NOTES
-- ============================================================================
-- 
-- This migration:
-- ✅ Marks old templates as inactive (safe)
-- ✅ Adds Royal V2 template placeholder (inactive)
-- ✅ Creates utility functions for template queries
-- ✅ Preserves all user data (invitations, RSVPs, etc.)
--
-- Old templates remain in database but are hidden from users
-- Existing invitations will continue to work
--
-- To fully clean up old templates later:
-- 1. Migrate existing invitations to V2 templates (if needed)
-- 2. Run the commented DELETE statement above
--
-- ============================================================================

-- Mark migration complete
SELECT 'V2 Safe Template Reset Complete! Old templates inactive, user data preserved.' as status;
