-- Add is_admin column to profiles table if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_name = 'profiles'
        AND column_name = 'is_admin'
    ) THEN
        ALTER TABLE public.profiles ADD COLUMN is_admin BOOLEAN DEFAULT FALSE;
    END IF;
END $$;

-- Create admin-specific RLS policies
CREATE POLICY IF NOT EXISTS "Admins can view all profiles"
  ON profiles FOR SELECT
  USING ( auth.uid() IN (SELECT id FROM profiles WHERE is_admin = TRUE) );

CREATE POLICY IF NOT EXISTS "Admins can update all profiles"
  ON profiles FOR UPDATE
  USING ( auth.uid() IN (SELECT id FROM profiles WHERE is_admin = TRUE) );

-- Create orders table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  total_amount DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  shipping_address TEXT NOT NULL,
  shipping_pincode TEXT NOT NULL,
  payment_method TEXT NOT NULL,
  payment_status TEXT NOT NULL CHECK (payment_status IN ('pending', 'paid', 'failed')),
  tracking_number TEXT,
  estimated_delivery TIMESTAMP WITH TIME ZONE
);

-- Create order items table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  product_id TEXT NOT NULL,
  product_name TEXT NOT NULL,
  product_image TEXT,
  quantity INTEGER NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on orders and order_items
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for orders
CREATE POLICY IF NOT EXISTS "Users can view own orders"
  ON orders FOR SELECT
  USING ( auth.uid() = user_id );

CREATE POLICY IF NOT EXISTS "Admins can view all orders"
  ON orders FOR SELECT
  USING ( auth.uid() IN (SELECT id FROM profiles WHERE is_admin = TRUE) );

CREATE POLICY IF NOT EXISTS "Admins can update all orders"
  ON orders FOR UPDATE
  USING ( auth.uid() IN (SELECT id FROM profiles WHERE is_admin = TRUE) );

CREATE POLICY IF NOT EXISTS "Admins can insert orders"
  ON orders FOR INSERT
  WITH CHECK ( auth.uid() IN (SELECT id FROM profiles WHERE is_admin = TRUE) );

-- Create RLS policies for order_items
CREATE POLICY IF NOT EXISTS "Users can view own order items"
  ON order_items FOR SELECT
  USING ( order_id IN (SELECT id FROM orders WHERE user_id = auth.uid()) );

CREATE POLICY IF NOT EXISTS "Admins can view all order items"
  ON order_items FOR SELECT
  USING ( auth.uid() IN (SELECT id FROM profiles WHERE is_admin = TRUE) );

CREATE POLICY IF NOT EXISTS "Admins can update all order items"
  ON order_items FOR UPDATE
  USING ( auth.uid() IN (SELECT id FROM profiles WHERE is_admin = TRUE) );

CREATE POLICY IF NOT EXISTS "Admins can insert order items"
  ON order_items FOR INSERT
  WITH CHECK ( auth.uid() IN (SELECT id FROM profiles WHERE is_admin = TRUE) );

-- Create functions for admin dashboard
CREATE OR REPLACE FUNCTION get_sales_by_date(time_period TEXT)
RETURNS TABLE (date TEXT, amount DECIMAL) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    TO_CHAR(created_at, 'YYYY-MM-DD') as date,
    SUM(total_amount) as amount
  FROM 
    orders
  WHERE 
    created_at >= (CURRENT_DATE - time_period::INTERVAL)
    AND payment_status = 'paid'
  GROUP BY 
    TO_CHAR(created_at, 'YYYY-MM-DD')
  ORDER BY 
    date;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_sales_by_category()
RETURNS TABLE (category TEXT, amount DECIMAL) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COALESCE(p.category, 'Unknown') as category,
    SUM(oi.price * oi.quantity) as amount
  FROM 
    order_items oi
  LEFT JOIN 
    orders o ON oi.order_id = o.id
  LEFT JOIN 
    products p ON oi.product_id = p.id::TEXT
  WHERE 
    o.payment_status = 'paid'
  GROUP BY 
    category
  ORDER BY 
    amount DESC;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_payment_method_stats()
RETURNS TABLE (method TEXT, count BIGINT) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    payment_method as method,
    COUNT(*) as count
  FROM 
    orders
  WHERE 
    payment_status = 'paid'
  GROUP BY 
    payment_method
  ORDER BY 
    count DESC;
END;
$$ LANGUAGE plpgsql;
