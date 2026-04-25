-- Seed products
INSERT INTO products (name, description, category, price, image_url, in_stock) VALUES
('Classic White Blazer', 'Timeless tailored white blazer perfect for professional settings', 'Blazers', 245.00, 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400', true),
('Silk Black Dress', 'Elegant silk black evening dress with sophisticated draping', 'Dresses', 380.00, 'https://images.unsplash.com/photo-1595777707802-da6ccd5f8b4f?w=400', true),
('Tailored Gray Trousers', 'Modern gray wool trousers with perfect fit', 'Trousers', 165.00, 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400', true),
('Minimalist White T-Shirt', 'Premium cotton white t-shirt for everyday wear', 'Tops', 85.00, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', true),
('Statement Black Heels', 'Sleek black heels with comfortable arch support', 'Shoes', 220.00, 'https://images.unsplash.com/photo-1543163521-9145f4428f4e?w=400', true),
('Oversized Wool Coat', 'Premium wool coat in sophisticated black', 'Coats', 450.00, 'https://images.unsplash.com/photo-1539533057440-7bf458871e64?w=400', true),
('Neutral Linen Shirt', 'Breathable linen shirt in cream tone', 'Tops', 125.00, 'https://images.unsplash.com/photo-1594938299564-d8d5a5a7b6db?w=400', true),
('Wide-Leg Black Trousers', 'Contemporary wide-leg trousers for modern silhouette', 'Trousers', 195.00, 'https://images.unsplash.com/photo-1549887534-f2e1defc8a2b?w=400', true);

-- Seed outfits
INSERT INTO outfits (name, description, occasion, style_tags) VALUES
('Professional Business', 'Perfect outfit for important meetings and presentations', 'Work', ARRAY['professional', 'minimalist', 'elegant']),
('Evening Elegance', 'Sophisticated outfit for evening events and dinners', 'Evening', ARRAY['elegant', 'timeless', 'chic']),
('Casual Minimalist', 'Relaxed yet stylish outfit for everyday activities', 'Casual', ARRAY['casual', 'comfortable', 'modern']),
('Weekend Chic', 'Effortlessly stylish outfit for weekend outings', 'Weekend', ARRAY['relaxed', 'contemporary', 'versatile']);

-- Seed conversations
INSERT INTO conversations (customer_id, customer_name, customer_email, status, preferences) VALUES
('cust_001', 'Sarah Mitchell', 'sarah@example.com', 'active', '{"preferred_style": "minimalist", "budget": "high"}'::jsonb),
('cust_002', 'Emma Johnson', 'emma@example.com', 'active', '{"preferred_style": "elegant", "budget": "medium"}'::jsonb),
('cust_003', 'Lisa Chen', 'lisa@example.com', 'closed', '{"preferred_style": "modern", "budget": "high"}'::jsonb);

-- Seed messages
INSERT INTO messages (conversation_id, sender, content, message_type, outfit_data) 
SELECT 
  id, 
  'customer', 
  'I need an outfit for an important business meeting tomorrow', 
  'text',
  NULL
FROM conversations WHERE customer_id = 'cust_001'
LIMIT 1;

INSERT INTO messages (conversation_id, sender, content, message_type, outfit_data)
SELECT 
  id,
  'agent',
  'I recommend our Professional Business outfit featuring the Classic White Blazer paired with Tailored Gray Trousers',
  'text',
  '{"outfit_name": "Professional Business", "confidence": 0.95}'::jsonb
FROM conversations WHERE customer_id = 'cust_001'
LIMIT 1;

-- Seed sales_data
INSERT INTO sales_data (date, total_sales, total_orders, total_revenue, average_order_value) VALUES
('2024-01-15', 12500.00, 45, 12500.00, 277.78),
('2024-01-16', 13200.00, 48, 13200.00, 275.00),
('2024-01-17', 14100.00, 52, 14100.00, 271.15),
('2024-01-18', 12800.00, 46, 12800.00, 278.26),
('2024-01-19', 15300.00, 55, 15300.00, 278.18),
('2024-01-20', 16200.00, 58, 16200.00, 279.31),
('2024-01-21', 17100.00, 61, 17100.00, 280.33);

-- Seed inventory_alerts
INSERT INTO inventory_alerts (product_id, alert_type, message, quantity_threshold, current_quantity, status)
SELECT 
  id,
  'low_stock',
  'Stock running low for ' || name,
  10,
  3,
  'active'
FROM products WHERE name IN ('Minimalist White T-Shirt', 'Statement Black Heels');

-- Seed customer metadata
INSERT INTO customer_metadata (customer_id, preferred_style, size_preference, budget_range, preferences)
VALUES
('cust_001', 'minimalist', 'S', '$200-500', '{"colors": ["black", "white", "gray"], "occasions": ["work", "evening"]}'::jsonb),
('cust_002', 'elegant', 'M', '$100-300', '{"colors": ["neutral", "pastels"], "occasions": ["casual", "weekend"]}'::jsonb),
('cust_003', 'modern', 'XS', '$300+', '{"colors": ["black", "white"], "occasions": ["work", "evening", "weekend"]}'::jsonb);

-- Seed activity logs
INSERT INTO activity_logs (action, user_type, entity_type, entity_id, details)
VALUES
('conversation_started', 'customer', 'conversation', (SELECT id FROM conversations WHERE customer_id = 'cust_001' LIMIT 1), '{"message": "Customer initiated chat"}'::jsonb),
('outfit_recommended', 'agent', 'outfit', (SELECT id FROM outfits WHERE name = 'Professional Business' LIMIT 1), '{"confidence": 0.95, "reason": "matches business meeting requirement"}'::jsonb),
('product_viewed', 'customer', 'product', (SELECT id FROM products WHERE name = 'Classic White Blazer' LIMIT 1), '{"duration_seconds": 45}'::jsonb);
