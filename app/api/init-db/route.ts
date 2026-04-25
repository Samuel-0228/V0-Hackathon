import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        { error: 'Missing Supabase environment variables' },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Create tables if they don't exist
    const { error: schemaError } = await supabase.rpc('exec_sql', {
      sql: `
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
        CREATE TABLE IF NOT EXISTS outfits (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          name VARCHAR(255) NOT NULL,
          description TEXT,
          image_url VARCHAR(500),
          occasion VARCHAR(100),
          style_tags TEXT[],
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW()
        );
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
        CREATE TABLE IF NOT EXISTS sales_data (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          date DATE NOT NULL,
          total_sales DECIMAL(12, 2) DEFAULT 0,
          total_orders INTEGER DEFAULT 0,
          total_revenue DECIMAL(12, 2) DEFAULT 0,
          average_order_value DECIMAL(10, 2) DEFAULT 0,
          created_at TIMESTAMP DEFAULT NOW()
        );
        CREATE TABLE IF NOT EXISTS inventory_alerts (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          product_id UUID NOT NULL,
          alert_type VARCHAR(50) NOT NULL,
          message TEXT,
          quantity_threshold INTEGER,
          current_quantity INTEGER,
          status VARCHAR(50) DEFAULT 'active',
          created_at TIMESTAMP DEFAULT NOW()
        );
      `,
    }).catch(err => ({ error: err }));

    // Insert sample data
    const products = [
      { name: 'Classic White Blazer', description: 'Timeless tailored white blazer', category: 'Blazers', price: 245, image_url: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400', in_stock: true },
      { name: 'Silk Black Dress', description: 'Elegant silk black evening dress', category: 'Dresses', price: 380, image_url: 'https://images.unsplash.com/photo-1595777707802-da6ccd5f8b4f?w=400', in_stock: true },
      { name: 'Tailored Gray Trousers', description: 'Modern gray wool trousers', category: 'Trousers', price: 165, image_url: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400', in_stock: true },
      { name: 'Minimalist White T-Shirt', description: 'Premium cotton white t-shirt', category: 'Tops', price: 85, image_url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', in_stock: true },
      { name: 'Statement Black Heels', description: 'Sleek black heels', category: 'Shoes', price: 220, image_url: 'https://images.unsplash.com/photo-1543163521-9145f4428f4e?w=400', in_stock: true },
      { name: 'Oversized Wool Coat', description: 'Premium wool coat', category: 'Coats', price: 450, image_url: 'https://images.unsplash.com/photo-1539533057440-7bf458871e64?w=400', in_stock: true },
    ];

    const { error: productError } = await supabase
      .from('products')
      .insert(products)
      .select();

    const outfits = [
      { name: 'Professional Business', description: 'Perfect for meetings', occasion: 'Work', style_tags: ['professional', 'minimalist'] },
      { name: 'Evening Elegance', description: 'For evening events', occasion: 'Evening', style_tags: ['elegant', 'timeless'] },
      { name: 'Casual Minimalist', description: 'Everyday style', occasion: 'Casual', style_tags: ['casual', 'comfortable'] },
    ];

    const { error: outfitError } = await supabase
      .from('outfits')
      .insert(outfits)
      .select();

    const conversations = [
      { customer_id: 'cust_001', customer_name: 'Sarah Mitchell', customer_email: 'sarah@example.com', status: 'active' },
      { customer_id: 'cust_002', customer_name: 'Emma Johnson', customer_email: 'emma@example.com', status: 'active' },
    ];

    const { error: convError } = await supabase
      .from('conversations')
      .insert(conversations)
      .select();

    const salesData = [
      { date: '2024-01-15', total_sales: 12500, total_orders: 45, total_revenue: 12500, average_order_value: 277.78 },
      { date: '2024-01-16', total_sales: 13200, total_orders: 48, total_revenue: 13200, average_order_value: 275 },
      { date: '2024-01-17', total_sales: 14100, total_orders: 52, total_revenue: 14100, average_order_value: 271.15 },
    ];

    const { error: salesError } = await supabase
      .from('sales_data')
      .insert(salesData)
      .select();

    if (productError || outfitError || convError || salesError) {
      console.log('Some data may already exist:', { productError, outfitError, convError, salesError });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Database initialized with sample data' 
    });
  } catch (error) {
    console.error('Database initialization error:', error);
    return NextResponse.json(
      { error: 'Failed to initialize database' },
      { status: 500 }
    );
  }
}
