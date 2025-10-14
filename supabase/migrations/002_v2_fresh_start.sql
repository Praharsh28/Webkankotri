-- ============================================================================
-- WebKankotri V2 - Fresh Start Migration
-- ============================================================================
-- This migration prepares the database for the new V2 template system
-- Run this to clean up old template data and start fresh
-- ============================================================================

-- Clean up old template data (if any exists)
DELETE FROM public.templates;

-- Reset sequences and counters
-- This ensures we start with clean data

-- ============================================================================
-- TEMPLATE CATEGORIES FOR V2
-- ============================================================================
-- We'll use these consistent categories across all templates

-- Categories:
-- - 'royal' - Luxury palace-inspired templates
-- - 'traditional' - Classic Gujarati wedding templates  
-- - 'modern' - Contemporary minimalist templates
-- - 'festive' - Celebration and festival templates

-- Price Tiers:
-- - 'free' - ₹0 (1-2 free templates for users to try)
-- - 'basic' - ₹99 (Good quality templates)
-- - 'premium' - ₹149 (Stunning templates with all features)

-- ============================================================================
-- V2 TEMPLATE STRUCTURE
-- ============================================================================
-- Each template in V2 will have:
--
-- config JSONB structure:
-- {
--   "version": "2.0",
--   "features": {
--     "videoBackground": true/false,
--     "audioPlayer": true/false,
--     "photoCarousel": true/false,
--     "countdown": true/false,
--     "fireworks": true/false,
--     "parallax": true/false,
--     "particles": true/false
--   },
--   "colors": {
--     "primary": "#hex",
--     "secondary": "#hex",
--     "accent": "#hex",
--     "background": "#hex"
--   },
--   "animations": {
--     "particles": {
--       "type": "custom",
--       "emojis": ["👑", "💎"],
--       "count": 100,
--       "speed": "slow"
--     },
--     "parallax": {
--       "enabled": true,
--       "speed": 0.5
--     },
--     "entrance": {
--       "type": "curtain-reveal",
--       "duration": 1.5
--     }
--   },
--   "fonts": {
--     "heading": "Playfair Display",
--     "body": "Inter"
--   }
-- }

-- ============================================================================
-- EXAMPLE: Insert placeholder for Royal Template (Coming Soon)
-- ============================================================================
-- This is just a placeholder - actual template will be inserted when built

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
);

-- ============================================================================
-- UTILITY FUNCTIONS FOR V2
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
-- MIGRATION NOTES
-- ============================================================================
-- 
-- This migration:
-- ✅ Cleans up old template data
-- ✅ Adds placeholder for Royal V2 template (inactive)
-- ✅ Creates utility functions for template queries
-- ✅ Ready for new V2 templates to be added
--
-- Next steps:
-- 1. Build Royal template in code
-- 2. Add thumbnail and preview video
-- 3. Run migration to activate: UPDATE templates SET is_active = true WHERE template_id = 'royal-v2'
-- 4. Repeat for other templates (Traditional V2, Modern V2, etc.)
--
-- ============================================================================

-- Mark migration complete
SELECT 'V2 Fresh Start Migration Complete! Database is ready for new templates.' as status;
