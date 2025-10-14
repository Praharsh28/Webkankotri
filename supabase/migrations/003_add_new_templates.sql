-- Add 4 New Template Themes
-- Adds Floral, Peacock, Sunset, and Classic themes

-- ============================================================================
-- INSERT 4 NEW THEMES
-- ============================================================================

-- 7. FLORAL GARDEN THEME (FREE)
INSERT INTO public.templates (
  template_id,
  name,
  description,
  category,
  price_tier,
  price,
  is_active,
  sort_order,
  config
) VALUES (
  'floral-garden',
  'Floral Garden',
  'Soft blush pink with sage green accents. Perfect for garden and spring weddings.',
  'traditional',
  'free',
  0,
  true,
  7,
  '{
    "colors": {
      "primary": "#FF69B4",
      "secondary": "#9CAF88",
      "accent": "#FFE4E1"
    },
    "fonts": {
      "heading": {
        "english": "Cormorant Garamond",
        "gujarati": "Noto Sans Gujarati"
      },
      "body": {
        "english": "Lato",
        "gujarati": "Noto Sans Gujarati"
      }
    },
    "style": "romantic",
    "isPremium": false,
    "isFeatured": true
  }'::jsonb
);

-- 8. PEACOCK ELEGANCE THEME (BASIC - PAID)
INSERT INTO public.templates (
  template_id,
  name,
  description,
  category,
  price_tier,
  price,
  is_active,
  sort_order,
  config
) VALUES (
  'peacock-elegance',
  'Peacock Elegance',
  'Rich teal and emerald with gold highlights. Inspired by majestic peacock feathers.',
  'traditional',
  'basic',
  99,
  true,
  8,
  '{
    "colors": {
      "primary": "#008B8B",
      "secondary": "#50C878",
      "accent": "#FFD700"
    },
    "fonts": {
      "heading": {
        "english": "Libre Baskerville",
        "gujarati": "Noto Sans Gujarati"
      },
      "body": {
        "english": "Merriweather",
        "gujarati": "Noto Sans Gujarati"
      }
    },
    "style": "traditional",
    "isPremium": true,
    "isFeatured": true
  }'::jsonb
);

-- 9. SUNSET ROMANCE THEME (BASIC - PAID)
INSERT INTO public.templates (
  template_id,
  name,
  description,
  category,
  price_tier,
  price,
  is_active,
  sort_order,
  config
) VALUES (
  'sunset-romance',
  'Sunset Romance',
  'Warm terracotta and coral with golden hour glow. Perfect for evening celebrations.',
  'modern',
  'basic',
  99,
  true,
  9,
  '{
    "colors": {
      "primary": "#E2725B",
      "secondary": "#FF7F50",
      "accent": "#FFE4B5"
    },
    "fonts": {
      "heading": {
        "english": "Josefin Sans",
        "gujarati": "Noto Sans Gujarati"
      },
      "body": {
        "english": "Raleway",
        "gujarati": "Noto Sans Gujarati"
      }
    },
    "style": "modern",
    "isPremium": true,
    "isFeatured": true
  }'::jsonb
);

-- 10. CLASSIC BLACK & WHITE THEME (PREMIUM - PAID)
INSERT INTO public.templates (
  template_id,
  name,
  description,
  category,
  price_tier,
  price,
  is_active,
  sort_order,
  config
) VALUES (
  'classic-bw',
  'Classic Black & White',
  'Timeless monochrome with metallic silver accents. Ultimate sophistication.',
  'elegant',
  'premium',
  149,
  true,
  10,
  '{
    "colors": {
      "primary": "#000000",
      "secondary": "#C0C0C0",
      "accent": "#F5F5F5"
    },
    "fonts": {
      "heading": {
        "english": "Bodoni Moda",
        "gujarati": "Noto Sans Gujarati"
      },
      "body": {
        "english": "Quicksand",
        "gujarati": "Noto Sans Gujarati"
      }
    },
    "style": "elegant",
    "isPremium": true,
    "isFeatured": true
  }'::jsonb
);

-- ============================================================================
-- VERIFY INSERTION
-- ============================================================================
DO $$
DECLARE
  template_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO template_count FROM public.templates;
  RAISE NOTICE 'Total templates after addition: %', template_count;
  RAISE NOTICE 'Expected: 10 templates (6 original + 4 new)';
END $$;

-- ============================================================================
-- DISPLAY ALL TEMPLATES
-- ============================================================================
SELECT 
  template_id,
  name,
  category,
  price_tier,
  price,
  is_active,
  sort_order
FROM public.templates
ORDER BY sort_order;
