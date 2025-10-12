-- Seed Templates Migration
-- Inserts 6 wedding invitation themes into the database

-- ============================================================================
-- DELETE EXISTING TEMPLATES (for clean re-seeding)
-- ============================================================================
DELETE FROM public.templates;

-- ============================================================================
-- INSERT 6 THEMES
-- ============================================================================

-- 1. TRADITIONAL THEME (FREE)
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
  'traditional',
  'Traditional Gujarati',
  'Elegant burgundy and rose gold with sophisticated warmth. Perfect for traditional wedding ceremonies.',
  'traditional',
  'free',
  0,
  true,
  1,
  '{
    "colors": {
      "primary": "#800020",
      "secondary": "#D4AF37",
      "accent": "#F0E68C"
    },
    "fonts": {
      "heading": {
        "english": "Playfair Display",
        "gujarati": "Noto Sans Gujarati"
      },
      "body": {
        "english": "Inter",
        "gujarati": "Noto Sans Gujarati"
      }
    },
    "style": "traditional",
    "isPremium": false,
    "isFeatured": true
  }'::jsonb
);

-- 2. ROYAL THEME (BASIC - PAID)
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
  'royal',
  'Royal Gold',
  'Luxurious deep purple and metallic gold for grand celebrations. Exudes royalty and elegance.',
  'elegant',
  'basic',
  99,
  true,
  2,
  '{
    "colors": {
      "primary": "#4A148C",
      "secondary": "#D4AF37",
      "accent": "#FFD700"
    },
    "fonts": {
      "heading": {
        "english": "Cinzel",
        "gujarati": "Noto Sans Gujarati"
      },
      "body": {
        "english": "Lora",
        "gujarati": "Noto Sans Gujarati"
      }
    },
    "style": "elegant",
    "isPremium": true,
    "isFeatured": true
  }'::jsonb
);

-- 3. MODERN THEME (PREMIUM - PAID)
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
  'modern',
  'Modern Minimal',
  'Clean slate gray with vibrant coral accents. Contemporary and stylish design.',
  'modern',
  'premium',
  149,
  true,
  3,
  '{
    "colors": {
      "primary": "#2C3E50",
      "secondary": "#E74C3C",
      "accent": "#FF6B6B"
    },
    "fonts": {
      "heading": {
        "english": "Montserrat",
        "gujarati": "Noto Sans Gujarati"
      },
      "body": {
        "english": "Open Sans",
        "gujarati": "Noto Sans Gujarati"
      }
    },
    "style": "modern",
    "isPremium": true,
    "isFeatured": true
  }'::jsonb
);

-- 4. TRADITIONAL LIGHT THEME (FREE)
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
  'traditional-light',
  'Traditional Light',
  'Soft cream and warm gold tones. Light, airy traditional elegance.',
  'traditional',
  'free',
  0,
  true,
  4,
  '{
    "colors": {
      "primary": "#8B4513",
      "secondary": "#D4AF37",
      "accent": "#F0E68C"
    },
    "fonts": {
      "heading": {
        "english": "Playfair Display",
        "gujarati": "Noto Sans Gujarati"
      },
      "body": {
        "english": "Inter",
        "gujarati": "Noto Sans Gujarati"
      }
    },
    "style": "traditional",
    "isPremium": false,
    "isFeatured": false
  }'::jsonb
);

-- 5. ROYAL LIGHT THEME (BASIC - PAID)
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
  'royal-light',
  'Royal Light',
  'Soft lavender with metallic gold accents. Elegant and graceful royal theme.',
  'elegant',
  'basic',
  99,
  true,
  5,
  '{
    "colors": {
      "primary": "#7B68EE",
      "secondary": "#D4AF37",
      "accent": "#FFD700"
    },
    "fonts": {
      "heading": {
        "english": "Cinzel",
        "gujarati": "Noto Sans Gujarati"
      },
      "body": {
        "english": "Lora",
        "gujarati": "Noto Sans Gujarati"
      }
    },
    "style": "elegant",
    "isPremium": true,
    "isFeatured": false
  }'::jsonb
);

-- 6. MODERN LIGHT THEME (PREMIUM - PAID)
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
  'modern-light',
  'Modern Light',
  'Clean white with soft blue and coral. Fresh, contemporary aesthetic.',
  'modern',
  'premium',
  149,
  true,
  6,
  '{
    "colors": {
      "primary": "#34495E",
      "secondary": "#3498DB",
      "accent": "#FF6B6B"
    },
    "fonts": {
      "heading": {
        "english": "Montserrat",
        "gujarati": "Noto Sans Gujarati"
      },
      "body": {
        "english": "Open Sans",
        "gujarati": "Noto Sans Gujarati"
      }
    },
    "style": "modern",
    "isPremium": true,
    "isFeatured": false
  }'::jsonb
);

-- ============================================================================
-- VERIFY INSERTION
-- ============================================================================
-- Count templates
DO $$
DECLARE
  template_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO template_count FROM public.templates;
  RAISE NOTICE 'Successfully inserted % templates', template_count;
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
