# 🏥 DOCUMENTATION HEALTH CHECK - Quick Scan Protocol

**Purpose:** Catch stale docs without disrupting development  
**Duration:** 2-3 minutes max  
**For:** AI assistants to run periodically, NOT every time

---

## ⚡ WHEN TO RUN (Triggers)

```yaml
run_this_check_when:
  - Before pushing to git (always)
  - End of work session (always)
  - After 3-5 commits (periodic)
  - After major feature completed (milestone)
  - User asks "are docs current?" (on demand)

do_NOT_run_when:
  - Starting new chat (waste of time, read 00_START_HERE instead)
  - In middle of coding (disrupts flow)
  - Just made 1 small change (overkill)
  - User is actively debugging (not the time)
```

---

## 🎯 QUICK SCAN (2 Minutes)

### Step 1: Check Recent Git History (30 sec)

```bash
# What files changed recently?
git log --oneline --name-only -5

# Questions to ask:
- Any new .tsx files in components/? → Should be in 02_COMPONENT_CATALOG
- Any changes to types/? → Should be in 04_TYPE_DEFINITIONS
- Any bug fixes in commit messages? → Should be in 01_CODE_PATTERNS
```

### Step 2: Spot Check Import Paths (30 sec)

```yaml
quick_validation:
  - Pick 2-3 import statements from 02_COMPONENT_CATALOG.md
  - Verify files exist at those paths
  - If 404 → FLAG: Import paths stale

example_check:
  doc_says: "import { KankotriEnhanced } from '@/components/.../KankotriEnhanced'"
  verify: ls components/templates-v2/themes/KankotriTemplate/KankotriEnhanced.tsx
  result: exists ✅ OR missing ❌
```

### Step 3: Check Session History (30 sec)

```yaml
check_00_START_HERE:
  - Look at "Latest Changes" section
  - Does latest entry match what you just did?
  - If you added component but no session entry → FLAG

expected:
  - Last session entry within last 24 hours
  - Session # increments properly
  - Commit hashes match git log
```

### Step 4: Component Count Validation (30 sec)

```yaml
quick_count:
  - Count .tsx files in components/templates-v2/themes/KankotriTemplate/
  - Count component entries in 02_COMPONENT_CATALOG.md
  - Should match (or catalog has 1-2 less for utilities)
  
if_mismatch:
  - FLAG: "Component catalog may be missing entries"
  - List files not documented
```

---

## 🚦 SEVERITY LEVELS

### 🔴 CRITICAL (Block commit)

```yaml
critical_issues:
  - Import paths in docs point to deleted files
  - Type definitions completely wrong
  - Component catalog has examples that crash
  - Major feature undocumented (new template, major refactor)

action: STOP and fix before commit
```

### 🟡 WARNING (Flag but don't block)

```yaml
warning_issues:
  - Session history not updated yet (end of session fixes this)
  - Minor prop changes not documented
  - Progress % slightly off (72% vs 73%)
  - Comments in code mention new pattern not in docs

action: Note it, fix at end of session
```

### 🟢 INFO (Nice to have)

```yaml
info_issues:
  - Docs could be more detailed
  - Example code could be prettier
  - More patterns could be documented

action: Ignore, not urgent
```

---

## 📋 HEALTH CHECK TEMPLATE

```markdown
## Doc Health Check - [Date Time]

### Git History Scan
- Recent commits: [list]
- New files: [list]
- Type changes: [none/yes]
- Bug fixes: [none/yes]

### Import Path Validation
- Checked: [3 random imports]
- All valid: ✅ / ❌ [broken path]

### Session History
- Latest entry: [Oct 16, 3:22 PM]
- Matches work: ✅ / ❌
- Commit hash current: ✅ / ❌

### Component Count
- Actual files: [count]
- Documented: [count]
- Match: ✅ / ❌ Missing: [list]

### Issues Found
🔴 CRITICAL: [none or list]
🟡 WARNING: [none or list]
🟢 INFO: [none or list]

### Action Required
- [ ] Update [file] before commit
- [ ] Update session history at end
- [ ] Document [component] when convenient
- [x] Docs healthy, proceed with work

### Time Taken: [2 min]
```

---

## 🎯 DECISION FLOW

```yaml
scan_complete:
  if_critical_issues_found:
    action: STOP coding
    message: "🔴 CRITICAL: Docs have broken import paths. Fix before commit."
    fix_now: YES
    
  if_warning_issues_found:
    action: NOTE it
    message: "🟡 WARNING: [list]. Will fix at end of session."
    fix_now: NO
    continue_coding: YES
    
  if_no_issues:
    action: CONTINUE
    message: "✅ Docs healthy. Continue building."
    confidence: HIGH
```

---

## 💡 BALANCE PHILOSOPHY

### What This IS:

```yaml
purpose:
  - Quick safety net to catch major doc drift
  - Periodic sanity check (not constant)
  - Non-intrusive (2-3 min max)
  - Run at natural breakpoints (commit, session end)

benefits:
  - Prevents docs from becoming useless
  - Catches critical issues early
  - Doesn't disrupt development flow
  - Builds trust in doc system
```

### What This is NOT:

```yaml
not_this:
  - Not a replacement for proper doc updates
  - Not run on every code change
  - Not a deep audit (that's manual, quarterly)
  - Not blocking development unnecessarily

anti_patterns:
  - ❌ Running health check every 5 minutes (overkill)
  - ❌ Spending 30 min fixing tiny doc issues (waste)
  - ❌ Blocking commit for minor warnings (annoying)
  - ❌ Checking docs but never building features (wrong priority)
```

---

## 🔄 WORKFLOW INTEGRATION

### During Active Development

```yaml
coding_sprint:
  - AI: Build features, fix bugs, write code
  - AI: Don't think about docs
  - AI: Focus on shipping

commit_time:
  - AI: Run quick health check (2 min)
  - AI: If critical issues → fix
  - AI: If warnings → note for later
  - AI: Commit code + doc fixes together

session_end:
  - AI: Update 00_START_HERE session history
  - AI: Run health check one more time
  - AI: Push everything
```

### Example Timeline

```yaml
3:00 PM: Start coding new component
3:00-3:30 PM: Code, test, iterate (NO doc checks)
3:30 PM: Ready to commit
3:30-3:32 PM: Quick health check ✅
3:32 PM: Add session entry to 00_START_HERE
3:33 PM: Commit + push

3:35 PM: Start next feature
3:35-4:15 PM: Code, test, iterate (NO doc checks)
4:15 PM: Ready to commit
4:15-4:17 PM: Quick health check → 🟡 WARNING (component not cataloged)
4:17-4:20 PM: Add component to 02_COMPONENT_CATALOG
4:20 PM: Commit + push

4:30 PM: Session ends
4:30-4:32 PM: Update session history + health check
4:32 PM: Push
```

**Total doc time:** 10 minutes out of 90 minutes (11%)  
**Coding time:** 80 minutes (89%)  
**Balance:** ✅ Perfect

---

## 🎲 SAMPLE CHECKS (Copy-Paste)

### Quick Import Path Check

```bash
# Pick 3 random components from catalog
# Verify they exist

# Example:
ls components/templates-v2/themes/KankotriTemplate/KankotriEnhanced.tsx
ls components/templates-v2/themes/KankotriTemplate/animations/PhysicsPetals.tsx
ls components/templates-v2/themes/KankotriTemplate/symbols/ProfessionalGanesh.tsx

# All exist? ✅ Docs valid
# Any missing? ❌ Flag issue
```

### Quick Component Count

```bash
# Count actual component files
find components/templates-v2/themes/KankotriTemplate -name "*.tsx" -type f | wc -l

# Count catalog entries (rough estimate)
grep "^### " docs-active/02_COMPONENT_CATALOG.md | wc -l

# Should be close (±2)
```

### Quick Session History Check

```bash
# Last commit
git log -1 --oneline

# Last session entry in 00_START_HERE
grep "###.*Session" 00_START_HERE.md | head -1

# Match? ✅ Current / ❌ Stale
```

---

## ✅ SUCCESS METRICS

```yaml
health_check_working_when:
  - Takes 2-3 minutes (not 30)
  - Catches critical issues (broken imports)
  - Doesn't block development (warnings don't stop work)
  - Run at natural breakpoints (commit, session end)
  - AI still spends 80%+ time coding

health_check_failing_when:
  - Takes 15+ minutes (too slow)
  - Misses major doc drift (not thorough enough)
  - Blocks work for minor issues (too strict)
  - Run every 5 minutes (too frequent)
  - AI spends 50%+ time on docs (wrong balance)
```

---

## 🚀 FUTURE AUTOMATION

```yaml
could_automate:
  - Script to validate import paths automatically
  - Script to count components vs catalog entries
  - Git pre-commit hook to run check
  - GitHub Action to verify docs on PR

but_for_now:
  - Manual quick scan works fine
  - 2-3 minutes is acceptable overhead
  - Automation later if needed
```

---

## 📝 QUICK REFERENCE

### "Should I run health check now?"

```yaml
YES_run_check:
  - About to commit (always)
  - Ending work session (always)
  - Just finished major feature (always)
  - User asks about docs (on demand)

NO_dont_run:
  - Just started coding (wrong time)
  - In middle of debugging (disruptive)
  - Made tiny 1-line change (overkill)
  - Already ran check 5 min ago (redundant)
```

### "How thorough should I be?"

```yaml
quick_scan_sufficient:
  - Check 2-3 import paths (not all 50)
  - Count components roughly (not exact)
  - Scan last 5 commits (not all history)
  - 2-3 minutes total (not 30)

only_go_deep_if:
  - Critical issue found (broken imports)
  - User explicitly asks for audit
  - Quarterly deep review (manual)
```

---

**Bottom Line:** Run 2-minute health check before commits and at session end. Flag critical issues (broken imports), note warnings (missing docs), ignore minor stuff. Spend 10-15% of time on docs, 85-90% on coding. Balance = key.
