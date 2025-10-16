# 📝 DOCUMENTATION MAINTENANCE RULES

**Purpose:** Clear rules for when/where/how to update docs  
**For:** AI assistants maintaining this project  
**Philosophy:** Docs stay current automatically with zero ambiguity

---

## 🎯 CORE PRINCIPLE

```yaml
single_source_of_truth: Each piece of information exists in EXACTLY ONE place
update_trigger: Code changes → Docs update immediately
location_logic: Clear decision tree for where to update
no_duplication: Never copy information between docs
```

---

## 📊 DECISION TREE: Where to Update?

### Question 1: Is it a code change?

```yaml
new_component_created:
  update: 02_COMPONENT_CATALOG.md
  action: Add component entry with props, imports, usage
  location: Alphabetical by category (Animation, Symbol, Page, etc.)

new_type_added:
  update: 04_TYPE_DEFINITIONS.md
  action: Add interface/type with examples
  location: Under relevant section (Main Data, Supporting Types, etc.)

new_pattern_discovered:
  update: 01_CODE_PATTERNS.md
  action: Add pattern with ✅ CORRECT / ❌ WRONG examples
  location: Under relevant category (SSR, TypeScript, React, etc.)

bug_fixed:
  update: 01_CODE_PATTERNS.md
  action: Document anti-pattern and fix
  location: Add to existing pattern or create new entry

code_refactored:
  check_if_breaking_change:
    yes: Update ALL affected docs
    no: Update only if pattern changed
```

### Question 2: Is it project status/progress?

```yaml
milestone_completed:
  update: 00_START_HERE.md
  action: Add entry to "Latest Changes (Session History)"
  location: Top of session history (newest first)

next_priorities_changed:
  update: 00_START_HERE.md
  action: Update "Current State" section
  location: Lines 8-12

files_created_or_moved:
  update: 00_START_HERE.md
  action: Update "Where to Look" section
  location: Lines 16-63

progress_percentage_changed:
  update: 00_START_HERE.md + docs-active/PROJECT_STATUS.md
  action: Update percentage in both
  location: "Current State" in START_HERE, metrics in PROJECT_STATUS
```

### Question 3: Is it a new feature/template?

```yaml
new_template_created:
  update_files:
    - 00_AI_QUICK_SCAN.md: Add to "FILE STRUCTURE" section
    - 02_COMPONENT_CATALOG.md: Add new wrapper component
    - 00_START_HERE.md: Increment template count

new_animation_created:
  update_files:
    - 02_COMPONENT_CATALOG.md: Add to "ANIMATION COMPONENTS" section
    - 00_AI_QUICK_SCAN.md: Update animation count

new_symbol_created:
  update_files:
    - 02_COMPONENT_CATALOG.md: Add to "SYMBOL COMPONENTS" section
```

### Question 4: Is it configuration/setup?

```yaml
database_schema_changed:
  update: docs-active/DATABASE_SETUP_GUIDE.md
  action: Update schema, migration steps

environment_variable_added:
  update: 00_AI_QUICK_SCAN.md (if critical) OR PROJECT_STATUS.md
  action: Document required env var

deployment_config_changed:
  update: 00_AI_QUICK_SCAN.md
  action: Update "DEPLOYMENT VERIFICATION" section
```

---

## 📂 FILE-SPECIFIC UPDATE RULES

### `00_START_HERE.md` (Master Index)

**Update Frequency:** After every significant change  
**Sections to Update:**

```yaml
lines_8_12_current_state:
  triggers:
    - Build status changes (errors fixed, deployed)
    - Blockers added/removed
    - Next priorities change
  example: "✅ Build: All errors fixed → 🔴 Build: 3 TypeScript errors"

lines_16_63_where_to_look:
  triggers:
    - New doc created
    - Doc moved to different folder
    - Doc deleted
  example: Add "→ docs-active/05_NEW_DOC.md"

lines_67_95_latest_changes:
  triggers:
    - End of work session
    - Major milestone completed
    - Significant feature added
  format: "[Oct 16, 3:22 PM] Session #X - TITLE ✅"
  rule: Add at TOP (newest first), keep last 5-6 entries

lines_97_120_next_actions:
  triggers:
    - Priorities shift
    - Task completed (move to done)
    - New urgent task discovered
  format: "Priority 1/2/3: Task description"
```

**Update Template:**
```markdown
### [Oct DD, H:MM PM] Session #X - TITLE ✅
- What was done (bullet points)
- Files created/updated
- Result/impact
```

---

### `docs-active/00_AI_QUICK_SCAN.md` (Quick Reference)

**Update Frequency:** After code/structure changes  
**Sections to Update:**

```yaml
lines_6_25_project_identity:
  triggers:
    - Status percentage changes (72% → 75%)
    - Latest commit changes
    - Deployment status changes
  update_what: status, latest_commit, completed/missing lists

lines_27_62_file_structure:
  triggers:
    - New component file created
    - File moved/renamed
    - New folder added
  update_what: File tree structure

lines_64_90_critical_patterns:
  triggers:
    - New SSR pattern discovered
    - Bug fix reveals new pattern
    - TypeScript requirement changes
  update_what: Add pattern with code example

lines_92_110_component_usage:
  triggers:
    - Component API changes
    - New component created
    - Import path changes
  update_what: Update import/usage examples

lines_112_180_data_structure:
  triggers:
    - Type definition changes
    - New required field added
    - Field removed/renamed
  update_what: Interface definition, comments
```

---

### `docs-active/01_CODE_PATTERNS.md` (Patterns & Anti-Patterns)

**Update Frequency:** After every bug fix or pattern discovery  
**When to Add:**

```yaml
new_pattern_triggers:
  - Bug fixed that reveals broader issue
  - SSR hydration error solved
  - TypeScript compilation error solved
  - Production issue prevented
  - Performance optimization discovered

pattern_format:
  structure: |
    ## PATTERN N: Title
    
    ```typescript
    // ❌ WRONG: Description of problem
    <BadCode />
    // Problem: What breaks
    
    // ✅ CORRECT: Description of solution
    <GoodCode />
    // Why: Explanation
    ```

location_rules:
  ssr_hydration: Top section (highest priority)
  typescript_errors: Middle section
  react_patterns: Middle section
  performance: Lower section
  deployment: Bottom section
```

**Example Addition:**
```markdown
## PATTERN 11: Client-Side Only Components

```typescript
// ❌ WRONG: Component uses window/document in render
function MyComponent() {
  const width = window.innerWidth; // SSR error!
  return <div style={{ width }} />;
}

// ✅ CORRECT: Check if mounted first
function MyComponent() {
  const [width, setWidth] = useState(0);
  
  useEffect(() => {
    setWidth(window.innerWidth); // Safe: client-only
  }, []);
  
  return <div style={{ width }} />;
}
```
```

---

### `docs-active/02_COMPONENT_CATALOG.md` (Component Index)

**Update Frequency:** After every component creation/modification  
**When to Add:**

```yaml
new_component_created:
  action: Add full entry
  location: Under relevant category
  sections:
    - Purpose comment
    - Import statement
    - Usage example
    - Props interface
    - Features list

component_props_changed:
  action: Update props section only
  location: Find component by name, update props

component_renamed:
  action: Update all references
  check_files:
    - Import statements
    - Usage examples
    - Quick reference section
```

**Entry Template:**
```markdown
### ComponentName
```typescript
// FILE: path/to/ComponentName.tsx
// PURPOSE: One-line description

import { ComponentName } from '@/path/to/ComponentName';

<ComponentName prop1="value" prop2={value} />

// PROPS
interface ComponentNameProps {
  prop1: string;              // Description
  prop2?: number;             // Optional description
}

// FEATURES
- Feature 1
- Feature 2
```
```

**Location Rules:**
```yaml
wrapper_components: Top of file (MAIN WRAPPER section)
page_components: After wrapper (PAGE COMPONENTS section)
animation_components: Middle (ANIMATION COMPONENTS section)
symbol_components: After animations (SYMBOL COMPONENTS section)
decoration_components: After symbols (DECORATION COMPONENTS section)
audio_components: After decorations (AUDIO COMPONENTS section)
utility_components: After audio (UTILITY COMPONENTS section)
configuration: Bottom (CONFIGURATION section)
```

---

### `docs-active/03_TEMPLATE_BLUEPRINT.md` (Starter Code)

**Update Frequency:** When template pattern changes  
**When to Update:**

```yaml
wrapper_pattern_changes:
  action: Update "STEP 2: Main Wrapper Component" code
  example: New required import, different error boundary usage

page_component_pattern_changes:
  action: Update relevant step (Step 4, 5, or 6)
  example: New date formatting pattern

new_best_practice_discovered:
  action: Add to relevant code section with comment
  example: "// NEW: Added for performance"

type_definitions_change:
  action: Update import statements
  location: All steps that import types
```

---

### `docs-active/04_TYPE_DEFINITIONS.md` (Type Reference)

**Update Frequency:** After type definition changes in codebase  
**When to Update:**

```yaml
new_interface_added:
  action: Add complete interface with examples
  location: Under relevant section (Main Data, Supporting Types, etc.)

interface_field_added:
  action: Update interface definition + example usage
  location: Find interface by name, add field with comment

interface_field_removed:
  action: Remove field from interface + update examples
  check_impact: Update all example usage

type_constraint_changed:
  action: Update type definition + add note
  example: "string | number" becomes "string only"
```

**Update Template:**
```typescript
// NEW INTERFACE:
interface NewType {
  field1: string;              // Description
  field2?: number;             // Optional description
}

// EXAMPLE USAGE:
const example: NewType = {
  field1: 'value',
  field2: 123,
};
```

---

## 🔄 UPDATE WORKFLOW

### Step-by-Step Process

```yaml
step_1_code_change:
  action: Make code change
  files: Actual TypeScript/React files

step_2_identify_impact:
  questions:
    - Is this a new component? → 02_COMPONENT_CATALOG
    - Is this a new pattern? → 01_CODE_PATTERNS
    - Is this a type change? → 04_TYPE_DEFINITIONS
    - Is this a milestone? → 00_START_HERE

step_3_update_docs:
  action: Update ALL affected docs in one commit
  rule: NEVER leave docs stale

step_4_update_master:
  action: Update 00_START_HERE.md with session entry
  location: "Latest Changes" section

step_5_commit:
  message_format: "Type: Description\n\nUpdated docs: [list]"
  example: "Feature: Add FloatingHearts animation\n\nUpdated docs: 02_COMPONENT_CATALOG, 00_AI_QUICK_SCAN"
```

---

## 📋 MAINTENANCE CHECKLIST

### After Every Code Change

```yaml
- [ ] Updated relevant code docs (01, 02, or 04)
- [ ] Updated 00_AI_QUICK_SCAN if structure changed
- [ ] Updated 00_START_HERE session history
- [ ] All docs still accurate (no stale references)
- [ ] Commit message mentions doc updates
```

### End of Session

```yaml
- [ ] Add session entry to 00_START_HERE
- [ ] Update progress % if changed
- [ ] Update "Next Actions" if priorities shifted
- [ ] Commit docs separately with clear message
- [ ] Push to git
```

### Creating New Doc

```yaml
- [ ] Add to 00_START_HERE "Where to Look" section
- [ ] Add to 00_AI_QUICK_SCAN "Next Docs to Read" section
- [ ] Follow AI-first format (code > prose)
- [ ] Name with number prefix if core doc (05_NEW_DOC.md)
- [ ] Add to this maintenance guide
```

---

## 🚨 RED FLAGS (Stale Docs)

### Detect Stale Documentation

```yaml
code_and_docs_mismatch:
  check: Import paths in docs match actual code
  fix: Update all import statements

percentage_out_of_sync:
  check: Progress % same in START_HERE and PROJECT_STATUS
  fix: Update both to match

component_exists_but_not_documented:
  check: All files in components/ exist in 02_COMPONENT_CATALOG
  fix: Add missing component entries

pattern_not_documented:
  check: Code uses pattern not in 01_CODE_PATTERNS
  fix: Add pattern with explanation
```

### Prevention Rules

```yaml
rule_1: "Code changes → Doc updates in SAME commit"
rule_2: "New file created → Add to catalog immediately"
rule_3: "Bug fixed → Document pattern in 01_CODE_PATTERNS"
rule_4: "Session ends → Update 00_START_HERE"
rule_5: "Deploy → Verify all docs accurate"
```

---

## 📊 DOC UPDATE FREQUENCY

```yaml
every_commit:
  - 01_CODE_PATTERNS.md (if pattern changed)
  - 02_COMPONENT_CATALOG.md (if component changed)
  - 04_TYPE_DEFINITIONS.md (if type changed)

every_session:
  - 00_START_HERE.md (session history)
  - 00_AI_QUICK_SCAN.md (if status changed)

weekly:
  - PROJECT_STATUS.md (roadmap updates)
  - TESTING_CHECKLIST.md (test results)

as_needed:
  - DATABASE_SETUP_GUIDE.md (schema changes)
  - AI_TEMPLATE_CREATION_GUIDE.md (legacy, rarely)
```

---

## 🎯 GOLDEN RULES

### 1. Single Source of Truth
```yaml
rule: Each fact exists in EXACTLY ONE doc
example:
  correct: "Component props defined in 02_COMPONENT_CATALOG only"
  wrong: "Props duplicated in 00_AI_QUICK_SCAN and 02_COMPONENT_CATALOG"
```

### 2. Update Immediately
```yaml
rule: Docs updated in same commit as code
example:
  correct: "git commit -m 'Add FloatingHearts + update catalog'"
  wrong: "git commit -m 'Add FloatingHearts' (docs updated later)"
```

### 3. No Orphan Information
```yaml
rule: Every doc referenced from 00_START_HERE
example:
  correct: "New doc added → 00_START_HERE updated"
  wrong: "New doc created but not linked anywhere"
```

### 4. Versioned History
```yaml
rule: Session history in 00_START_HERE shows timeline
example:
  correct: "[Oct 16, 3:22 PM] Session #12 - ..."
  wrong: "Updated documentation" (no timestamp/context)
```

### 5. AI-First Format
```yaml
rule: Code examples > prose explanations
example:
  correct: "```typescript\nconst x = useRef<number | undefined>(undefined);\n```"
  wrong: "You should provide an initial value for useRef"
```

---

## 🔧 QUICK REFERENCE

### "I just created a new component. What do I update?"

```yaml
1. docs-active/02_COMPONENT_CATALOG.md
   - Add full component entry
   - Include imports, props, usage

2. docs-active/00_AI_QUICK_SCAN.md
   - Add to FILE STRUCTURE if new file/folder
   - Update component count

3. 00_START_HERE.md
   - Add session entry
```

### "I just fixed a bug. What do I update?"

```yaml
1. docs-active/01_CODE_PATTERNS.md
   - Document the anti-pattern
   - Show the fix pattern

2. 00_START_HERE.md
   - Add to session history
```

### "I just changed a type definition. What do I update?"

```yaml
1. docs-active/04_TYPE_DEFINITIONS.md
   - Update interface definition
   - Update all examples

2. docs-active/02_COMPONENT_CATALOG.md
   - Update props sections if affected

3. 00_START_HERE.md
   - Add session entry if significant change
```

### "I just finished a work session. What do I update?"

```yaml
1. 00_START_HERE.md
   - Add session entry to "Latest Changes"
   - Update "Current State" if progress changed
   - Update "Next Actions" if priorities shifted

2. Commit separately
   - Clear message: "Docs: Session #X summary"
```

---

## ✅ SUCCESS METRICS

```yaml
docs_are_current_when:
  - Any AI can read and build without asking questions
  - All import paths in docs match actual code
  - No stale references to deleted files
  - Progress % matches across all docs
  - Session history shows clear timeline

docs_need_update_when:
  - AI asks "Where is X component?"
  - Import paths in docs return 404
  - Examples reference deleted files
  - Progress % inconsistent
```

---

## 🚀 AUTOMATION (Future)

```yaml
future_improvements:
  - Script to validate import paths exist
  - Script to check component catalog completeness
  - Git pre-commit hook to remind about docs
  - Auto-generate component catalog from code
  - Auto-update type definitions from .ts files
```

---

**Bottom Line:** If you change code, update docs in SAME commit. If you finish session, update 00_START_HERE. Follow the decision tree above. Docs stay current = AI stays productive.
