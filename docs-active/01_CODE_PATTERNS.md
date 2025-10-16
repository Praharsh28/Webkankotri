# 🔧 CODE PATTERNS - SSR-Safe & Production-Ready

**AI Instruction:** Copy these patterns exactly. They solve critical production issues.

---

## ⚠️ CRITICAL: SSR Hydration Patterns

### Problem: Server renders different output than client
### Solution: Force deterministic values

---

## PATTERN 1: UTC Date Formatting

```typescript
// ❌ WRONG: Timezone-dependent (hydration error)
const formattedDate = weddingDate.toLocaleDateString('en-US', {
  weekday: 'long',
  month: 'long',
  day: 'numeric'
});
// Server: "Friday, January 31" (UTC timezone)
// Client: "Thursday, January 30" (User's timezone)
// Result: Hydration mismatch error!

// ✅ CORRECT: Force UTC timezone
const formattedDate = weddingDate.toLocaleDateString('en-US', {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
  timeZone: 'UTC'  // ← ADD THIS ALWAYS
});
// Server: "Friday, January 31" (UTC)
// Client: "Friday, January 31" (UTC)
// Result: No hydration error ✅
```

### All Date Formatting Must Include `timeZone: 'UTC'`

```typescript
// Weekday
weddingDate.toLocaleDateString('en-US', {
  weekday: 'long',
  timeZone: 'UTC'
});

// Month + Year
weddingDate.toLocaleDateString('en-US', {
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC'
});

// Gujarati format
weddingDate.toLocaleDateString('en-IN', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  timeZone: 'UTC'
});
```

---

## PATTERN 2: getUTCDate() Not getDate()

```typescript
// ❌ WRONG: Timezone-dependent day
const day = weddingDate.getDate();
// Server (UTC): 31
// Client (US timezone): 30
// Hydration error!

// ✅ CORRECT: Use UTC methods
const day = weddingDate.getUTCDate();
const month = weddingDate.getUTCMonth();
const year = weddingDate.getUTCFullYear();
// Server & Client: Always same ✅
```

---

## PATTERN 3: Date Input Normalization

### Problem: Data source might send string dates
### Solution: Always convert to Date objects

```typescript
// ❌ WRONG: Assume date is already Date object
export function KankotriEnhanced({ data }: KankotriEnhancedProps) {
  return (
    <KankotriCover
      weddingDate={data.wedding.date}  // Might be string!
    />
  );
}

// ✅ CORRECT: Normalize to Date object
export function KankotriEnhanced({ data }: KankotriEnhancedProps) {
  // Convert all dates to Date objects
  const normalizedWeddingDate = new Date(data.wedding.date);
  const normalizedCeremonies = data.ceremonies.map(c => ({
    ...c,
    date: new Date(c.date)
  }));

  return (
    <KankotriCover
      weddingDate={normalizedWeddingDate}  // Guaranteed Date object ✅
    />
  );
}
```

---

## PATTERN 4: Deterministic Animations (No Math.random)

### Problem: Math.random() gives different values on server vs client
### Solution: Use deterministic formulas based on index

```typescript
// ❌ WRONG: Random values in render
function Particle({ index }) {
  const x = Math.random() * 100;  // Hydration error!
  const y = Math.random() * 100;
  return <div style={{ left: x, top: y }} />;
}

// ✅ CORRECT: Deterministic formula
function Particle({ index, seed = 7 }) {
  const x = ((index * 7 + seed * 3) % 100);
  const y = ((index * 11 + seed * 5) % 100);
  return <div style={{ left: x, top: y }} />;
}

// ✅ ALSO CORRECT: Math.random inside useEffect (client-only)
function Particle({ index }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    // Safe: Only runs on client
    setPosition({
      x: Math.random() * 100,
      y: Math.random() * 100
    });
  }, []);
  
  return <div style={{ left: position.x, top: position.y }} />;
}
```

---

## PATTERN 5: useRef with Initial Value

### Problem: TypeScript strict mode requires initial value
### Solution: Provide `undefined` explicitly

```typescript
// ❌ WRONG: No initial value (TypeScript error)
const animationFrameRef = useRef<number>();
// Error: Expected 1 arguments, but got 0

// ✅ CORRECT: Provide undefined as initial value
const animationFrameRef = useRef<number | undefined>(undefined);
// Type: React.MutableRefObject<number | undefined>
// No error ✅
```

### Common useRef Patterns

```typescript
// Canvas ref
const canvasRef = useRef<HTMLCanvasElement>(null);

// Array ref
const particlesRef = useRef<Particle[]>([]);

// Object ref
const mouseRef = useRef({ x: 0, y: 0 });

// Number ref (animation frame ID)
const animationFrameRef = useRef<number | undefined>(undefined);

// Cleanup pattern
useEffect(() => {
  animationFrameRef.current = requestAnimationFrame(animate);
  return () => {
    if (animationFrameRef.current !== undefined) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  };
}, []);
```

---

## PATTERN 6: Error Boundaries

### Every page component should have error boundary

```typescript
import { ErrorBoundary } from '@/components/templates-v2/shared/ErrorBoundary';
import { Suspense } from 'react';

export function KankotriEnhanced({ data }: KankotriEnhancedProps) {
  return (
    <ErrorBoundary>
      <div className="relative min-h-screen">
        {/* Suspense for animations */}
        <Suspense fallback={null}>
          <PhysicsPetals count={50} />
        </Suspense>
        
        {/* Page content */}
        <KankotriCover data={data} />
      </div>
    </ErrorBoundary>
  );
}
```

---

## PATTERN 7: Animation Initialization

### Initialize particles/petals inside useEffect, not render

```typescript
// ❌ WRONG: Initialize in render
function PhysicsPetals({ count }) {
  const petals = Array.from({ length: count }, (_, i) => ({
    x: Math.random() * 100,  // Hydration error!
    y: Math.random() * 100,
  }));
  
  return petals.map((p, i) => <Petal key={i} {...p} />);
}

// ✅ CORRECT: Initialize in useEffect
function PhysicsPetals({ count }) {
  const petalsRef = useRef<Petal[]>([]);
  
  useEffect(() => {
    // Initialize only on client
    petalsRef.current = Array.from({ length: count }, (_, i) => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      rotation: Math.random() * 360,
      speed: 1 + Math.random() * 2,
    }));
  }, [count]);
  
  // Render using canvas or client-only logic
}
```

---

## PATTERN 8: Conditional Client-Side Rendering

### Use `useEffect` to detect client-side only

```typescript
function ClientOnlyComponent() {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  if (!isMounted) {
    return null; // or <LoadingPlaceholder />
  }
  
  // Client-only code here
  return <div>Client-side content</div>;
}
```

---

## PATTERN 9: Framer Motion useMotionValue

### For animated counters, use proper Framer Motion API

```typescript
import { useMotionValue, useTransform, animate } from 'framer-motion';

// ❌ WRONG: Animate custom "value" prop (not supported)
<motion.span
  initial={{ value: 0 }}
  animate={{ value: 100 }}
>
  {({ value }) => Math.round(value)}  // Type error!
</motion.span>

// ✅ CORRECT: Use useMotionValue + useTransform
function CountUp({ from, to, duration }) {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  
  useEffect(() => {
    const animation = animate(count, to, { duration });
    return animation.stop;
  }, [count, to, duration]);
  
  return <motion.span>{rounded}</motion.span>;
}
```

---

## PATTERN 10: Component Props with Separate Interfaces

### Don't reuse interfaces with incompatible props

```typescript
// ❌ WRONG: BorderProps used for corner components
interface BorderProps {
  type: 'corner' | 'top' | 'bottom' | 'full';  // Required
  position?: 'top-left' | 'top-right' | ...;  // Optional
}

function PalmLeaf({ position, color }: BorderProps) {
  // Error: 'type' is required but not used
}

// ✅ CORRECT: Separate interfaces
interface BorderProps {
  type: 'corner' | 'top' | 'bottom' | 'full';
  color?: string;
}

interface CornerProps {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  color?: string;
}

function PalmLeaf({ position, color }: CornerProps) {
  // Clean, no unused props ✅
}
```

---

## ✅ CHECKLIST: Before Committing Code

```yaml
dates:
  - [ ] All toLocaleDateString() has timeZone: 'UTC'
  - [ ] Using getUTCDate(), not getDate()
  - [ ] Date inputs normalized to Date objects

animations:
  - [ ] No Math.random() in render
  - [ ] Animations initialized in useEffect
  - [ ] Deterministic formulas for SSR-rendered animations

typescript:
  - [ ] useRef has initial value
  - [ ] No type errors in build
  - [ ] Props interfaces match actual usage

react:
  - [ ] Error boundaries wrapping pages
  - [ ] Suspense for lazy-loaded components
  - [ ] Client-only code in useEffect

performance:
  - [ ] Animations respect prefers-reduced-motion
  - [ ] Canvas used for heavy particle systems
  - [ ] Mobile detection for reduced particle counts
```

---

## 🚀 DEPLOYMENT VERIFICATION

```bash
# Must pass before deploy
npm run build

# Check for errors
# - TypeScript compilation errors
# - Hydration warnings
# - React errors

# If errors:
# 1. Read error message
# 2. Find pattern above
# 3. Apply fix
# 4. Re-run build
```

---

## 📚 RELATED DOCS

- Full type definitions: `04_TYPE_DEFINITIONS.md`
- Component catalog: `02_COMPONENT_CATALOG.md`
- Template blueprint: `03_TEMPLATE_BLUEPRINT.md`
- Testing protocol: `TESTING_CHECKLIST.md`
