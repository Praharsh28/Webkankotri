-- Create templates table
CREATE TABLE IF NOT EXISTS templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(50) NOT NULL,
  tags TEXT[],
  
  -- Template structure (JSON)
  components JSONB NOT NULL DEFAULT '[]'::jsonb,
  global_style JSONB,
  customizable_fields JSONB NOT NULL DEFAULT '[]'::jsonb,
  
  -- Media
  thumbnail TEXT,
  
  -- Status
  is_published BOOLEAN DEFAULT false,
  
  -- Ownership
  created_by UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_cards table
CREATE TABLE IF NOT EXISTS user_cards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  template_id UUID REFERENCES templates(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- User's customization data (JSON)
  customization JSONB NOT NULL DEFAULT '{}'::jsonb,
  
  -- Publishing
  published_url VARCHAR(255) UNIQUE,
  qr_code TEXT,
  
  -- Analytics
  view_count INTEGER DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_templates_category ON templates(category);
CREATE INDEX IF NOT EXISTS idx_templates_published ON templates(is_published);
CREATE INDEX IF NOT EXISTS idx_templates_created_by ON templates(created_by);
CREATE INDEX IF NOT EXISTS idx_user_cards_template ON user_cards(template_id);
CREATE INDEX IF NOT EXISTS idx_user_cards_user ON user_cards(user_id);
CREATE INDEX IF NOT EXISTS idx_user_cards_url ON user_cards(published_url);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
DROP TRIGGER IF EXISTS update_templates_updated_at ON templates;
CREATE TRIGGER update_templates_updated_at
  BEFORE UPDATE ON templates
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_user_cards_updated_at ON user_cards;
CREATE TRIGGER update_user_cards_updated_at
  BEFORE UPDATE ON user_cards
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_cards ENABLE ROW LEVEL SECURITY;

-- Templates policies
-- Anyone can view published templates
CREATE POLICY "Public can view published templates"
  ON templates FOR SELECT
  USING (is_published = true);

-- Users can view their own templates
CREATE POLICY "Users can view own templates"
  ON templates FOR SELECT
  USING (auth.uid() = created_by);

-- Users can create templates
CREATE POLICY "Users can create templates"
  ON templates FOR INSERT
  WITH CHECK (auth.uid() = created_by);

-- Users can update their own templates
CREATE POLICY "Users can update own templates"
  ON templates FOR UPDATE
  USING (auth.uid() = created_by);

-- Users can delete their own templates
CREATE POLICY "Users can delete own templates"
  ON templates FOR DELETE
  USING (auth.uid() = created_by);

-- User cards policies
-- Anyone can view published cards
CREATE POLICY "Public can view published cards"
  ON user_cards FOR SELECT
  USING (published_url IS NOT NULL);

-- Users can view their own cards
CREATE POLICY "Users can view own cards"
  ON user_cards FOR SELECT
  USING (auth.uid() = user_id);

-- Users can create cards
CREATE POLICY "Users can create cards"
  ON user_cards FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own cards
CREATE POLICY "Users can update own cards"
  ON user_cards FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete their own cards
CREATE POLICY "Users can delete own cards"
  ON user_cards FOR DELETE
  USING (auth.uid() = user_id);
