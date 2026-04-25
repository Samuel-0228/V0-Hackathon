import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Product = {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  image_url: string;
  in_stock: boolean;
  created_at: string;
};

export type Outfit = {
  id: string;
  name: string;
  description: string;
  image_url: string;
  occasion: string;
  style_tags: string[];
  created_at: string;
};

export type Conversation = {
  id: string;
  customer_id: string;
  customer_name: string;
  customer_email: string;
  started_at: string;
  last_message_at: string;
  status: string;
  preferences: Record<string, any>;
  created_at: string;
};

export type Message = {
  id: string;
  conversation_id: string;
  sender: 'customer' | 'agent';
  content: string;
  message_type: string;
  outfit_data: Record<string, any> | null;
  suggested_products: string[] | null;
  created_at: string;
};

export type SalesData = {
  id: string;
  date: string;
  total_sales: number;
  total_orders: number;
  total_revenue: number;
  average_order_value: number;
};

export type InventoryAlert = {
  id: string;
  product_id: string;
  alert_type: string;
  message: string;
  quantity_threshold: number;
  current_quantity: number;
  status: string;
  created_at: string;
};
