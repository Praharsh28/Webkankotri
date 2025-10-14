# 📝 Suggested Improvements to Global Rules

## Current State: 81 lines ✅ (Good!)

Your global rules are already concise. Here are **additions** specific to AI-assisted development and WebKankotri:

---

## 🆕 Add These Sections (12 lines)

### **AI-Assisted Development** (Add after "Workflow & Communication")
```markdown
## AI-Assisted Development
- **Production-ready first time**: Can't iterate easily, build complete features with all edge cases NOW.
- **Config-driven design**: User must maintain code WITHOUT AI help. All settings in config files.
- **Complete documentation**: Inline comments, JSDoc, README for each component. User shouldn't need AI to understand.
- **No prototypes**: Build full implementation, not MVP. Handle all edge cases upfront.
```

### **Project Context: WebKankotri** (Add at end)
```markdown
## Project: WebKankotri (Wedding Invitations)
- **Tech**: Next.js 15, React 19, TypeScript, Tailwind CSS 4, Supabase
- **Goal**: Premium templates (₹149) with video, animations, RSVP
- **Mobile-first**: 90% users on mobile. Performance budgets: 2MB video, 25-100 particles
- **Structure**: `/components/animations-v2/` (reusable), `/components/templates-v2/` (complete templates)
```

---

## ✂️ Optional: Condense These (Save ~10 lines)

### **Combine Performance & Security** (Currently 2 sections → 1)
```markdown
## Performance & Security
- **Efficiency**: Appropriate data structures, avoid premature optimization, cleanup resources
- **Security**: Validate inputs, parameterized queries, environment variables, least privilege
```

### **Shorten Web Development** (Currently 5 lines → 3)
```markdown
## Web Development
- **Modern stack**: React, TailwindCSS, shadcn/ui, Lucide icons
- **Responsive & accessible**: Mobile-first, WCAG guidelines, semantic HTML
```

---

## 📊 Suggested Final Structure (85-90 lines)

```
# Global Coding Rules for Cascade

## Code Quality & Safety (4 lines)
## Research First, Code Second (3 lines)
## Code Style & Consistency (3 lines)
## Production-Ready Standards (4 lines)
## Testing & Verification (3 lines)
## Documentation (4 lines - keep your custom line 34!)
## Performance & Security (3 lines - COMBINED)
## Workflow & Communication (5 lines)
## AI-Assisted Development (4 lines - NEW)
## Debugging Best Practices (4 lines)
## Command Execution (3 lines)
## External APIs & Dependencies (3 lines)
## Web Development (3 lines - CONDENSED)
## Workspace Discipline (3 lines)
## Project: WebKankotri (4 lines - NEW)

Total: ~85 lines (vs current 81)
```

---

## 🎯 Key Additions

**1. AI-Assisted Development Context:**
- Emphasizes "no iteration" constraint
- Config-driven for maintainability
- Complete features, not MVPs

**2. WebKankotri Project Context:**
- Tech stack at a glance
- Performance budgets
- File structure
- Business context (₹149 premium)

**3. Efficiency:**
- Combine Performance + Security (similar themes)
- Condense Web Development (still clear)

---

## ✅ What to Keep (Don't Change)

- ✅ Line 34 (your custom documentation rule)
- ✅ "Research First, Code Second" (critical)
- ✅ "Terse and direct" (saves tokens)
- ✅ "Never use cd" (important)
- ✅ Overall structure (well organized)

---

## 📝 Proposed Additions to Your File

**Add after line 52 (after "Workflow & Communication"):**

```markdown
## AI-Assisted Development
- **Production-ready first time**: Can't iterate easily, build complete features with all edge cases NOW.
- **Config-driven design**: User must maintain code WITHOUT AI help. All settings in config files.
- **Complete documentation**: Inline comments, JSDoc, README for each component. User shouldn't need AI to understand.
- **No prototypes**: Build full implementation, not MVP. Handle all edge cases upfront.
```

**Add at end (after line 79):**

```markdown
## Project: WebKankotri (Wedding Invitations)
- **Tech**: Next.js 15, React 19, TypeScript, Tailwind CSS 4, Supabase
- **Goal**: Premium templates (₹149) with video, animations, RSVP
- **Mobile-first**: 90% users on mobile. Performance budgets: 2MB video, 25-100 particles
- **Structure**: `/components/animations-v2/` (reusable), `/components/templates-v2/` (complete templates)
```

**Result: ~90 lines total (still very reasonable)**

---

## 💡 Why These Changes?

**AI-Assisted Development section:**
- Reminds AI of iteration constraints
- Emphasizes maintainability
- Prevents MVP thinking

**WebKankotri Project section:**
- Context-aware responses
- Relevant suggestions (mobile performance)
- Understands business goals

**Combined Performance & Security:**
- Related topics, saves space
- Still covers all key points

---

## 🤔 Your Decision

**Option A:** Add both new sections (~90 lines total)
- Best context for AI
- Saves time explaining project
- Worth the ~10 extra lines

**Option B:** Add only AI-Assisted Development (~85 lines)
- Focuses on development constraints
- Less project-specific

**Option C:** Keep as-is, use CASCADE_RULES_OPTIMIZED.md for project
- Current global rules stay general
- Project rules in separate file

---

**My recommendation: Option A** - Add both sections. The 10 extra lines give context that saves hundreds of tokens in explanations later.

**Want me to create the updated version for you?** 🎯
