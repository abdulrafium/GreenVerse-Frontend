# Quick Database Setup Guide

## 🗄️ Create Database Tables in Supabase

### Step 1: Open Supabase SQL Editor
1. Go to: https://supabase.com/dashboard/project/qjhcqcfoxusmyezsvgxz/sql
2. Click "+ New Query" to create a new SQL query

### Step 2: Copy SQL Schema
Open the file: `E:\GreenVerse\backend\database\create_order_items.sql`

Or copy this complete SQL:

```sql
-- Enable RLS
ALTER TABLE IF EXISTS public.order_items DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.client_profiles DISABLE ROW LEVEL SECURITY;

-- Drop existing tables if they exist
DROP TABLE IF EXISTS public.order_items CASCADE;
DROP TABLE IF EXISTS public.client_profiles CASCADE;

-- Create order_items table for multi-product orders
CREATE TABLE public.order_items (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id BIGINT NOT NULL REFERENCES public.products(id) ON DELETE RESTRICT,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    unit_price DECIMAL(10, 2) NOT NULL CHECK (unit_price >= 0),
    total_price DECIMAL(10, 2) NOT NULL CHECK (total_price >= 0),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create client_profiles table for customer information
CREATE TABLE public.client_profiles (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
    phone VARCHAR(20) NOT NULL,
    city VARCHAR(100) NOT NULL,
    district VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    address_line TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for order_items
CREATE POLICY "Users can view their own order items"
    ON public.order_items FOR SELECT
    USING (
        order_id IN (
            SELECT id FROM public.orders 
            WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Admins can view all order items"
    ON public.order_items FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "System can insert order items"
    ON public.order_items FOR INSERT
    WITH CHECK (true);

-- RLS Policies for client_profiles
CREATE POLICY "Users can view own profile"
    ON public.client_profiles FOR SELECT
    USING (user_id = auth.uid());

CREATE POLICY "Users can insert own profile"
    ON public.client_profiles FOR INSERT
    WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own profile"
    ON public.client_profiles FOR UPDATE
    USING (user_id = auth.uid());

CREATE POLICY "Admins can view all profiles"
    ON public.client_profiles FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Indexes for performance
CREATE INDEX idx_order_items_order_id ON public.order_items(order_id);
CREATE INDEX idx_order_items_product_id ON public.order_items(product_id);
CREATE INDEX idx_client_profiles_user_id ON public.client_profiles(user_id);

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_client_profiles_updated_at
    BEFORE UPDATE ON public.client_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Success message
SELECT 'Database tables created successfully!' as status;
```

### Step 3: Execute SQL
1. Paste the SQL into the Supabase SQL Editor
2. Click the "Run" button (green play icon)
3. Wait for success message: "Database tables created successfully!"

### Step 4: Verify Tables
Run this query to verify:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('order_items', 'client_profiles');
```

You should see both tables listed.

### Step 5: Test the System
1. Backend should already be running on port 5000
2. Frontend should be running on port 3000
3. Navigate to http://localhost:3000/client/profile
4. Fill in profile information
5. Navigate to http://localhost:3000/client/place-order
6. Add products to cart and place order

---

## ✅ Success Indicators

After executing SQL, you should see:
- ✅ `order_items` table created
- ✅ `client_profiles` table created
- ✅ 8 RLS policies created
- ✅ 3 indexes created
- ✅ 1 trigger created
- ✅ Success message displayed

---

## 🐛 Troubleshooting

### If SQL fails:
- Check you're in the correct Supabase project
- Make sure you have admin permissions
- Try running each section separately

### If orders fail to place:
- Verify tables exist: Check Supabase Table Editor
- Verify profile is complete: All fields filled
- Check backend console for errors
- Check browser console for API errors

---

## 📊 Table Schemas

### order_items
- `id` - Primary key
- `order_id` - Reference to orders table
- `product_id` - Reference to products table
- `quantity` - Number of items
- `unit_price` - Price per item
- `total_price` - Quantity × Unit Price
- `created_at` - Timestamp

### client_profiles
- `id` - Primary key
- `user_id` - Reference to auth.users (unique)
- `phone` - Contact number
- `city` - City name
- `district` - District name
- `state` - State/province
- `address_line` - Full address
- `created_at` - Timestamp
- `updated_at` - Timestamp (auto-updated)

---

## 🎯 Next Steps After Setup

1. **Test Profile Creation**
   - Login as client
   - Go to Profile page
   - Fill all fields and save

2. **Test Order Placement**
   - Go to Place Order page
   - Add multiple products to cart
   - Place order
   - Verify in My Orders page

3. **Verify Database**
   - Check `orders` table for new order
   - Check `order_items` table for multiple entries
   - Check stock reduction in `products` table

4. **Admin Verification**
   - Login as admin
   - Check orders table
   - Verify all products are visible

---

Done! Your multi-product order system is now ready to use! 🚀
