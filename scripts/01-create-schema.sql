-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  price DECIMAL(10, 2),
  image_url VARCHAR(500),
  in_stock BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create outfits table
CREATE TABLE IF NOT EXISTS outfits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  image_url VARCHAR(500),
  products_ids UUID[] DEFAULT '{}',
  occasion VARCHAR(100),
  style_tags TEXT[],
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create conversations table
CREATE TABLE IF NOT EXISTS conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id VARCHAR(255) NOT NULL,
  customer_name VARCHAR(255),
  customer_email VARCHAR(255),
  started_at TIMESTAMP DEFAULT NOW(),
  last_message_at TIMESTAMP DEFAULT NOW(),
  status VARCHAR(50) DEFAULT 'active',
  preferences JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  sender VARCHAR(50) NOT NULL,
  content TEXT NOT NULL,
  message_type VARCHAR(50) DEFAULT 'text',
  outfit_data JSONB,
  suggested_products UUID[],
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create reservations table
CREATE TABLE IF NOT EXISTS reservations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  outfit_id UUID REFERENCES outfits(id),
  customer_id VARCHAR(255) NOT NULL,
  reservation_date TIMESTAMP,
  status VARCHAR(50) DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create sales_data table
CREATE TABLE IF NOT EXISTS sales_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL,
  total_sales DECIMAL(12, 2) DEFAULT 0,
  total_orders INTEGER DEFAULT 0,
  total_revenue DECIMAL(12, 2) DEFAULT 0,
  average_order_value DECIMAL(10, 2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create inventory_alerts table
CREATE TABLE IF NOT EXISTS inventory_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  alert_type VARCHAR(50) NOT NULL,
  message TEXT,
  quantity_threshold INTEGER,
  current_quantity INTEGER,
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW(),
  resolved_at TIMESTAMP
);

-- Create outfit_recommendations table
CREATE TABLE IF NOT EXISTS outfit_recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  outfit_id UUID NOT NULL REFERENCES outfits(id) ON DELETE CASCADE,
  recommendation_score DECIMAL(3, 2),
  reason TEXT,
  trend_tags TEXT[],
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create customer_metadata table
CREATE TABLE IF NOT EXISTS customer_metadata (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id VARCHAR(255) NOT NULL UNIQUE,
  preferred_style VARCHAR(100),
  size_preference VARCHAR(50),
  budget_range VARCHAR(100),
  previous_purchases JSONB,
  preferences JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create activity_logs table
CREATE TABLE IF NOT EXISTS activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  action VARCHAR(255) NOT NULL,
  user_type VARCHAR(50),
  entity_type VARCHAR(100),
  entity_id UUID,
  details JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_conversations_customer_id ON conversations(customer_id);
CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at);
CREATE INDEX IF NOT EXISTS idx_reservations_conversation_id ON reservations(conversation_id);
CREATE INDEX IF NOT EXISTS idx_reservations_customer_id ON reservations(customer_id);
CREATE INDEX IF NOT EXISTS idx_sales_data_date ON sales_data(date);
CREATE INDEX IF NOT EXISTS idx_inventory_alerts_product_id ON inventory_alerts(product_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_created_at ON activity_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_customer_metadata_customer_id ON customer_metadata(customer_id);
