# 🎯 Cascade AI Rules - WebKankotri Project (OPTIMIZED)

**Goal:** Build production-ready code in one go, minimize token usage.

---

## 🚨 CRITICAL RULES (Always Follow)

### 1. **Production-Ready First Time**
- ❌ NO prototypes, NO "we'll fix later"
- ✅ Complete implementation with ALL edge cases
- ✅ Error handling, loading states, fallbacks
- ✅ TypeScript strict mode, no `any`

### 2. **Research Before Building**
- ✅ ALWAYS grep/read existing code patterns
- ✅ Use existing components/utilities
- ✅ Match project style (don't invent new patterns)
- ❌ NEVER guess function signatures or imports

### 3. **Config-Driven Everything**
- ✅ User must customize WITHOUT AI help
- ✅ All settings in config files (colors, features, content)
- ✅ Clear comments, sensible defaults
- ❌ NO hardcoded values in components

### 4. **Mobile-First Performance**
- ✅ Device detection, performance budgets
- ✅ Lazy loading, code splitting
- ✅ Fallbacks for low-end devices
- ✅ Test assumptions (don't guess)

### 5. **Complete Documentation**
- ✅ Inline comments for complex logic
- ✅ JSDoc for all public functions
- ✅ README for each major component
- ✅ Usage examples

---

## 📝 Code Style (Brief)

**Imports:**
```typescript
// External libs first
import { motion } from 'framer-motion';
// Internal - absolute paths
import { Button } from '@/components/ui/button';
// Types
import type { Template } from '@/types/v2/template';
```

**Components:**
```typescript
// Props interface with JSDoc
interface VideoBackgroundProps {
  src: string;
  fallback?: ReactNode;
  onError?: () => void;
}

// Component with error handling
export function VideoBackground({ src, fallback, onError }: VideoBackgroundProps) {
  const [error, setError] = useState(false);
  
  if (error && fallback) return fallback;
  
  return (
    <video onError={() => { setError(true); onError?.(); }}>
      <source src={src} type="video/mp4" />
    </video>
  );
}
```

**Minimal, focused edits:**
- Small changes, not entire file rewrites
- Use `multi_edit` for multiple changes in one file

---

## ⚡ Efficiency Rules (Save Tokens)

### Research:
- ✅ Batch file reads in parallel
- ✅ Use grep with specific patterns
- ❌ Don't read entire large files (use offset/limit)

### Responses:
- ✅ Be concise, no verbose explanations
- ✅ Show code, not long descriptions
- ✅ Use bullet points, not paragraphs
- ❌ No acknowledgment phrases ("Great idea!", "You're right!")

### Tool Calls:
- ✅ Parallel independent calls
- ✅ Use `multi_edit` for same-file changes
- ❌ Never invoke `cd` (use `cwd` parameter)

---

## 🎨 WebKankotri Specifics

### Project Context:
- Next.js 15, React 19, TypeScript, Tailwind CSS 4
- Supabase (database, auth)
- Wedding invitation templates
- Target: ₹149 premium templates

### File Structure:
```
/components/animations-v2/   # Reusable animations
/components/templates-v2/    # Complete templates
/types/v2/                   # TypeScript types
/lib/                        # Utils, DB client
```

### Key Patterns:
- Config-driven templates (`template-config.ts`)
- Mobile optimization (device detection)
- Error boundaries and fallbacks
- Performance budgets (2MB video on mobile)

---

## 🔧 Quality Checklist (Before Marking Complete)

**Every Component Must Have:**
- [ ] TypeScript types (no `any`)
- [ ] Error handling (try/catch, onError)
- [ ] Loading/fallback states
- [ ] Mobile responsive
- [ ] Performance optimized
- [ ] JSDoc comments
- [ ] Usage example

**Every Feature Must Have:**
- [ ] Works on mobile (assume it doesn't until proven)
- [ ] Saves to database (if applicable)
- [ ] User can configure (via config file)
- [ ] Handles edge cases (null, undefined, empty)
- [ ] Clear error messages

---

## 🚫 What NOT to Do

1. ❌ Build MVP/prototype (build complete)
2. ❌ Assume mobile works (test/fallback)
3. ❌ Hardcode values (use config)
4. ❌ Skip error handling (handle everything)
5. ❌ Guess imports/signatures (grep first)
6. ❌ Output code in chat (use edit tools)
7. ❌ Long explanations (be concise)
8. ❌ "We'll fix later" (fix now)

---

## 🎯 Build Approach

**For Each Component:**
1. Research existing patterns (grep)
2. Build complete implementation
3. Add TypeScript types
4. Add error handling
5. Add documentation
6. Commit with clear message

**For Each Template:**
1. Build all sections
2. Integrate animations
3. Add configuration
4. Mobile optimization
5. Database integration
6. Documentation + examples

**One component = one commit. Small, focused changes.**

---

## 📊 Token Optimization

**Save tokens by:**
- Short, direct responses
- Code over explanations
- Bullet points over paragraphs
- Parallel tool calls
- Specific grep patterns
- No repetitive content

**This file itself: ~100 lines vs 1000+ in verbose rules.**

---

## ✅ Success = User Can Maintain Without AI

**If user needs AI to:**
- Change colors → FAILED (should be config)
- Toggle features → FAILED (should be config)
- Fix bugs → FAILED (shouldn't have bugs)
- Understand code → FAILED (needs better docs)

**Goal:** Ship production-ready, maintainable system.

---

**Use these rules. Stay concise. Build complete. Ship quality.** 🚀
