# 🎨 TEMPLATE SEEDING GUIDE

**Quick guide to seed your 6 wedding invitation themes**

---

## 📋 **What's Being Added**

### **6 Templates:**

| # | Template ID | Name | Category | Price | Tier |
|---|-------------|------|----------|-------|------|
| 1 | `traditional` | Traditional Gujarati | traditional | ₹0 | free |
| 2 | `royal` | Royal Gold | elegant | ₹99 | basic |
| 3 | `modern` | Modern Minimal | modern | ₹149 | premium |
| 4 | `traditional-light` | Traditional Light | traditional | ₹0 | free |
| 5 | `royal-light` | Royal Light | elegant | ₹99 | basic |
| 6 | `modern-light` | Modern Light | modern | ₹149 | premium |

---

## 🚀 **How to Seed Templates**

### **Step 1: Open Supabase SQL Editor**

1. Go to your Supabase Dashboard
2. URL: https://hbecavxgtddbufyoewcw.supabase.co
3. Click **"SQL Editor"** in sidebar
4. Click **"New query"**

### **Step 2: Copy & Paste SQL**

1. Open file: `/supabase/migrations/002_seed_templates.sql`
2. Select ALL code (Ctrl+A)
3. Copy it (Ctrl+C)
4. Paste into SQL Editor

### **Step 3: Run the Migration**

1. Click **"Run"** (or press Ctrl+Enter)
2. Wait for success message
3. Should see: **"Successfully inserted 6 templates"**

### **Step 4: Verify**

Go to **Table Editor** → **templates**

You should see **6 rows** with all template data!

---

## ✅ **What Gets Inserted**

Each template includes:

- ✅ **Basic Info:** ID, name, description
- ✅ **Category:** traditional, elegant, modern
- ✅ **Pricing:** Free, ₹99, ₹149
- ✅ **Color Palette:** Primary, secondary, accent colors
- ✅ **Fonts:** Heading and body fonts (English & Gujarati)
- ✅ **Status:** Active/Inactive
- ✅ **Sort Order:** Display order

---

## 🎨 **Template Details**

### **1. Traditional Gujarati (FREE)**
**Colors:**
- Primary: `#800020` (Deep burgundy)
- Secondary: `#D4AF37` (Metallic gold)
- Accent: `#F0E68C` (Soft gold)

**Fonts:**
- Heading: Playfair Display
- Body: Inter

**Perfect for:** Traditional Indian weddings

---

### **2. Royal Gold (₹99)**
**Colors:**
- Primary: `#4A148C` (Deep purple)
- Secondary: `#D4AF37` (Metallic gold)
- Accent: `#FFD700` (Gold)

**Fonts:**
- Heading: Cinzel
- Body: Lora

**Perfect for:** Grand, royal celebrations

---

### **3. Modern Minimal (₹149)**
**Colors:**
- Primary: `#2C3E50` (Slate gray)
- Secondary: `#E74C3C` (Vibrant coral)
- Accent: `#FF6B6B` (Soft coral)

**Fonts:**
- Heading: Montserrat
- Body: Open Sans

**Perfect for:** Contemporary, minimalist couples

---

### **4. Traditional Light (FREE)**
**Colors:**
- Primary: `#8B4513` (Saddle brown)
- Secondary: `#D4AF37` (Gold)
- Accent: `#F0E68C` (Soft gold)

**Fonts:**
- Heading: Playfair Display
- Body: Inter

**Perfect for:** Light, airy traditional style

---

### **5. Royal Light (₹99)**
**Colors:**
- Primary: `#7B68EE` (Medium slate blue)
- Secondary: `#D4AF37` (Gold)
- Accent: `#FFD700` (Gold)

**Fonts:**
- Heading: Cinzel
- Body: Lora

**Perfect for:** Elegant, graceful celebrations

---

### **6. Modern Light (₹149)**
**Colors:**
- Primary: `#34495E` (Charcoal)
- Secondary: `#3498DB` (Bright blue)
- Accent: `#FF6B6B` (Coral)

**Fonts:**
- Heading: Montserrat
- Body: Open Sans

**Perfect for:** Fresh, contemporary aesthetic

---

## 🔍 **Verify Seeding**

### **Method 1: SQL Query**

Run this in SQL Editor:
```sql
SELECT 
  template_id,
  name,
  category,
  price_tier,
  price,
  is_active
FROM templates
ORDER BY sort_order;
```

### **Method 2: Table Editor**

1. Go to **Table Editor**
2. Click **templates** table
3. Should see 6 rows

### **Method 3: Test in App**

```bash
npm run dev
```

Visit: http://localhost:3000/test-db

Should show: **"Found 6 templates"**

---

## 🐛 **Troubleshooting**

### **Error: "relation templates does not exist"**
❌ You didn't run the first migration  
✅ Run `/supabase/migrations/001_initial_schema.sql` first

### **Error: "duplicate key value"**
❌ Templates already exist  
✅ The SQL deletes existing templates first, so this shouldn't happen  
✅ If it does, run: `DELETE FROM templates;` first

### **Error: "permission denied"**
❌ Wrong user permissions  
✅ Make sure you're running as project owner  
✅ Check RLS policies aren't blocking

### **No errors but templates not showing**
✅ Check: `SELECT * FROM templates;`  
✅ Verify: `is_active = true`  
✅ Refresh your SQL editor

---

## 📊 **After Seeding**

You can now:

1. ✅ **Build Template Browser** - Display all 6 themes
2. ✅ **Create Invitation Wizard** - Let users select templates
3. ✅ **Test Pricing** - Free vs Paid templates
4. ✅ **Implement Filters** - Filter by category (traditional, elegant, modern)

---

## 🎯 **Next Steps**

Once templates are seeded:

**Option A:** Build Template Browser Page  
- Display template cards
- Show pricing
- Preview button
- Filter by category

**Option B:** Build Create Wizard  
- Template selection step
- Data input forms
- Live preview

**Option C:** Update Test Page  
- Show template count
- Display template names
- Verify all 6 loaded

---

## 📝 **Quick Reference**

**Seed Command:**
```sql
-- Run this entire file in Supabase SQL Editor
/supabase/migrations/002_seed_templates.sql
```

**Verify Command:**
```sql
SELECT COUNT(*) FROM templates;
-- Should return: 6
```

**View All:**
```sql
SELECT * FROM templates ORDER BY sort_order;
```

---

## ✅ **Success Checklist**

- [ ] Opened Supabase SQL Editor
- [ ] Copied `002_seed_templates.sql` file
- [ ] Pasted and ran in SQL Editor
- [ ] Saw "Successfully inserted 6 templates"
- [ ] Verified in Table Editor
- [ ] Count shows 6 templates
- [ ] Test page shows "Found 6 templates"

---

**🎉 Once you see 6 templates, you're ready to build the Template Browser!**
