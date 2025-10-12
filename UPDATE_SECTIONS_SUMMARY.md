# Section Components Theme Integration

## ✅ **Updated (6/14)**
1. **HeaderSection** - Full theme support
2. **BlessingSection** - Full theme support
3. **EventSection** - Full theme support
4. **ParentsSection** - Full theme support
5. **MessageSection** - Full theme support
6. **CustomTextSection** - Full theme support

## ⏳ **Remaining (8/14)**
7. **FamilyListSection** - Needs theme prop
8. **GallerySection** - Needs theme prop
9. **TimelineSection** - Needs theme prop
10. **MapSection** - Needs theme prop
11. **HotelsSection** - Needs theme prop
12. **DressCodeSection** - Needs theme prop
13. **RSVPSection** - Needs theme prop
14. **ContactSection** - Needs theme prop

## 🔧 **Standard Updates Needed**

For each remaining section:

1. **Add imports:**
```tsx
import type { KankotriTheme } from '@/types/theme'
import { useThemeStyles } from '@/lib/hooks/useThemeStyles'
```

2. **Update props interface:**
```tsx
interface SectionProps {
  data: SectionData
  theme: KankotriTheme  // ← Add this
  animated?: boolean
}
```

3. **Use theme in component:**
```tsx
export function Section({ data, theme, animated = true }: SectionProps) {
  const { text, font, gradient } = useThemeStyles(theme)
  // Replace hardcoded colors with theme colors
}
```

## 📝 **Color Replacements**

Replace hardcoded Tailwind classes with theme styles:

| Old Class | New Style |
|-----------|-----------|
| `text-orange-100` | `style={text.primary}` |
| `text-orange-200` | `style={text.secondary}` |
| `text-white` | `style={text.heading}` |
| `text-orange-300` | `style={{ color: theme.colors.accent }}` |
| `bg-orange-900` | `style={{ backgroundColor: theme.colors.primary }}` |
| `border-orange-300` | `style={{ borderColor: theme.colors.border.light }}` |
| `font-playfair` | `style={font.headingEn}` |
| `font-gujarati` | `style={font.headingGu}` or `font.bodyGu` |

## 🚀 **Next Steps**

Since we have 8 remaining sections, I'll update them in batches to complete the theme integration.
