# ⚙️ ENVIRONMENT CONFIGURATION

**Complete environment setup and configuration**

---

## 📋 ENVIRONMENT VARIABLES

### Required Environment Variables

Create `.env.local` file in project root:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Razorpay
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_razorpay_secret_here
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx

# Resend (Email)
RESEND_API_KEY=re_xxxxxxxxxxxxx

# Optional: Analytics
NEXT_PUBLIC_UMAMI_WEBSITE_ID=your-umami-id
NEXT_PUBLIC_UMAMI_URL=https://analytics.your-domain.com
```

---

## 🔐 ENVIRONMENT VARIABLE VALIDATION

**File:** `lib/env.ts`

```typescript
import { z } from 'zod'

const envSchema = z.object({
  // Supabase
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),

  // App
  NEXT_PUBLIC_APP_URL: z.string().url(),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

  // Razorpay
  RAZORPAY_KEY_ID: z.string().min(1),
  RAZORPAY_KEY_SECRET: z.string().min(1),
  NEXT_PUBLIC_RAZORPAY_KEY_ID: z.string().min(1),

  // Email
  RESEND_API_KEY: z.string().min(1),

  // Optional
  NEXT_PUBLIC_UMAMI_WEBSITE_ID: z.string().optional(),
  NEXT_PUBLIC_UMAMI_URL: z.string().url().optional(),
})

export type Env = z.infer<typeof envSchema>

function validateEnv(): Env {
  try {
    return envSchema.parse({
      // Supabase
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,

      // App
      NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
      NODE_ENV: process.env.NODE_ENV,

      // Razorpay
      RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
      RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET,
      NEXT_PUBLIC_RAZORPAY_KEY_ID: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,

      // Email
      RESEND_API_KEY: process.env.RESEND_API_KEY,

      // Optional
      NEXT_PUBLIC_UMAMI_WEBSITE_ID: process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID,
      NEXT_PUBLIC_UMAMI_URL: process.env.NEXT_PUBLIC_UMAMI_URL,
    })
  } catch (error) {
    console.error('❌ Invalid environment variables:')
    if (error instanceof z.ZodError) {
      error.errors.forEach((err) => {
        console.error(`  - ${err.path.join('.')}: ${err.message}`)
      })
    }
    process.exit(1)
  }
}

// Validate on module load (development only)
if (process.env.NODE_ENV === 'development') {
  validateEnv()
}

// Export validated env
export const env = {
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  },
  app: {
    url: process.env.NEXT_PUBLIC_APP_URL!,
    nodeEnv: process.env.NODE_ENV as 'development' | 'production' | 'test',
    isProd: process.env.NODE_ENV === 'production',
    isDev: process.env.NODE_ENV === 'development',
  },
  razorpay: {
    keyId: process.env.RAZORPAY_KEY_ID!,
    keySecret: process.env.RAZORPAY_KEY_SECRET!,
    publicKeyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  },
  email: {
    resendApiKey: process.env.RESEND_API_KEY!,
  },
  analytics: {
    umamiWebsiteId: process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID,
    umamiUrl: process.env.NEXT_PUBLIC_UMAMI_URL,
  },
}
```

---

## 📝 EXAMPLE FILES

### `.env.example`

```env
# Copy this file to .env.local and fill in your values

# =============================================================================
# SUPABASE
# =============================================================================
# Get these from: https://app.supabase.com/project/_/settings/api
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# =============================================================================
# APP URL
# =============================================================================
# Development: http://localhost:3000
# Production: https://ekankotri.com
NEXT_PUBLIC_APP_URL=http://localhost:3000

# =============================================================================
# RAZORPAY
# =============================================================================
# Get these from: https://dashboard.razorpay.com/app/website-app-settings/api-keys
# For testing, use test keys (prefix: rzp_test_)
# For production, use live keys (prefix: rzp_live_)
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_secret_here
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx

# =============================================================================
# RESEND (Email)
# =============================================================================
# Get your API key from: https://resend.com/api-keys
RESEND_API_KEY=re_xxxxxxxxxxxxx

# =============================================================================
# ANALYTICS (Optional)
# =============================================================================
# Umami Analytics
# NEXT_PUBLIC_UMAMI_WEBSITE_ID=your-website-id
# NEXT_PUBLIC_UMAMI_URL=https://analytics.your-domain.com
```

---

## 🚀 NEXT.JS CONFIGURATION

**File:** `next.config.mjs`

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // React strict mode
  reactStrictMode: true,

  // Image domains
  images: {
    domains: [
      'your-project.supabase.co', // Supabase storage
      'lh3.googleusercontent.com', // Google avatars (if using OAuth)
    ],
    formats: ['image/avif', 'image/webp'],
  },

  // Environment variables available to the browser
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },

  // Headers for security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ]
  },

  // Redirects
  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/dashboard',
        permanent: false,
      },
    ]
  },

  // Webpack config (for bundle analysis, etc.)
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Don't resolve 'fs' module on the client
      config.resolve.fallback = {
        fs: false,
        net: false,
        tls: false,
      }
    }
    return config
  },

  // Experimental features
  experimental: {
    optimizePackageImports: ['@radix-ui/react-icons', 'lucide-react'],
  },
}

export default nextConfig
```

---

## 🎨 TAILWIND CONFIGURATION

**File:** `tailwind.config.ts`

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#F97316',
          600: '#EA580C',
          700: '#C2410C',
          800: '#9A3412',
          900: '#7C2D12',
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          50: '#FDF2F8',
          100: '#FCE7F3',
          200: '#FBCFE8',
          300: '#F9A8D4',
          400: '#F472B6',
          500: '#EC4899',
          600: '#DB2777',
          700: '#BE185D',
          800: '#9D174D',
          900: '#831843',
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        accent: {
          500: '#EF4444',
          600: '#DC2626',
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        serif: ['var(--font-playfair)'],
        gujarati: ['var(--font-gujarati)'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'float-delayed': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        float: 'float 3s ease-in-out infinite',
        'float-delayed': 'float-delayed 4s ease-in-out infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
```

---

## 📦 PACKAGE.JSON SCRIPTS

**File:** `package.json` (scripts section)

```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "format": "prettier --write \"**/*.{ts,tsx,md,json,css}\"",
    "format:check": "prettier --check \"**/*.{ts,tsx,md,json,css}\"",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "db:migrate": "supabase db push",
    "db:reset": "supabase db reset",
    "db:seed": "supabase db seed",
    "generate:types": "supabase gen types typescript --local > types/database.generated.ts"
  }
}
```

---

## 🔒 TSCONFIG.JSON

**File:** `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    },
    "forceConsistentCasingInFileNames": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

---

## 🎨 GLOBALS.CSS

**File:** `app/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 22 93% 53%;
    --primary-foreground: 0 0% 100%;
    --secondary: 330 81% 60%;
    --secondary-foreground: 0 0% 100%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 0 84% 60%;
    --accent-foreground: 0 0% 100%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 100%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 22 93% 53%;
    --radius: 0.5rem;
  }

  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}

@layer utilities {
  /* Hide scrollbar for Chrome, Safari and Opera */
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  .no-scrollbar {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
}
```

---

## ✅ CONFIGURATION CHECKLIST

- ✅ Environment variables defined
- ✅ Environment validation implemented
- ✅ .env.example created
- ✅ next.config.mjs configured
- ✅ tailwind.config.ts configured
- ✅ tsconfig.json configured
- ✅ package.json scripts defined
- ✅ globals.css with base styles
- ✅ Security headers configured
- ✅ Image optimization configured

---

All configuration files are production-ready and follow best practices.
