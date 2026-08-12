-- Print World FINAL_SETUP.sql
-- Safe/idempotent setup for partially migrated databases.
-- Run in Supabase SQL Editor. Does NOT drop data.

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- CATALOG TABLES (from 001 — idempotent)
-- ============================================================

CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  image TEXT,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  category TEXT NOT NULL,
  base_price NUMERIC(10, 2) NOT NULL,
  image TEXT,
  featured BOOLEAN NOT NULL DEFAULT false,
  active BOOLEAN NOT NULL DEFAULT true,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS product_variants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  variant_type TEXT NOT NULL DEFAULT 'size',
  price NUMERIC(10, 2) NOT NULL,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS product_shapes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  shape_type TEXT NOT NULL,
  preview_image TEXT,
  price_adjustment NUMERIC(10, 2) NOT NULL DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT true,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (product_id, slug)
);

CREATE TABLE IF NOT EXISTS product_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS design_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  template_data JSONB NOT NULL DEFAULT '{}',
  preview_image TEXT,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- USER & ORDER TABLES
-- ============================================================

CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  phone TEXT,
  is_admin BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS saved_designs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  product_slug TEXT NOT NULL,
  name TEXT NOT NULL DEFAULT 'Untitled Design',
  design_data JSONB NOT NULL DEFAULT '{}',
  preview_url TEXT,
  original_upload_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  order_number TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'Pending',
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  shipping_address JSONB NOT NULL DEFAULT '{}',
  subtotal NUMERIC(10, 2) NOT NULL DEFAULT 0,
  shipping_cost NUMERIC(10, 2) NOT NULL DEFAULT 0,
  total NUMERIC(10, 2) NOT NULL DEFAULT 0,
  payment_provider TEXT,
  payment_id TEXT,
  payment_status TEXT DEFAULT 'unpaid',
  coupon_code TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  product_name TEXT NOT NULL,
  product_slug TEXT NOT NULL,
  variant_name TEXT,
  shape_name TEXT,
  quantity INT NOT NULL DEFAULT 1,
  unit_price NUMERIC(10, 2) NOT NULL,
  customization_data JSONB DEFAULT '{}',
  saved_design_id UUID REFERENCES saved_designs(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS coupons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL UNIQUE,
  description TEXT,
  discount_type TEXT NOT NULL DEFAULT 'percent',
  discount_value NUMERIC(10, 2) NOT NULL,
  min_order NUMERIC(10, 2) DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT true,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS ai_generations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  generation_type TEXT NOT NULL,
  prompt TEXT,
  result_url TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- INDEXES
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_active ON products(active);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_product_shapes_product ON product_shapes(product_id);
CREATE INDEX IF NOT EXISTS idx_product_shapes_type ON product_shapes(shape_type);
CREATE INDEX IF NOT EXISTS idx_product_variants_product ON product_variants(product_id);
CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_saved_designs_user ON saved_designs(user_id);

-- ============================================================
-- TRIGGERS
-- ============================================================

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS products_updated_at ON products;
CREATE TRIGGER products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS design_templates_updated_at ON design_templates;
CREATE TRIGGER design_templates_updated_at BEFORE UPDATE ON design_templates FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS profiles_updated_at ON profiles;
CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS saved_designs_updated_at ON saved_designs;
CREATE TRIGGER saved_designs_updated_at BEFORE UPDATE ON saved_designs FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS orders_updated_at ON orders;
CREATE TRIGGER orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name')
  ON CONFLICT (id) DO UPDATE SET email = EXCLUDED.email, updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================================
-- RLS helper (avoids infinite recursion on profiles)
-- ============================================================

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT COALESCE(
    (SELECT is_admin FROM public.profiles WHERE id = auth.uid()),
    false
  );
$$;

-- ============================================================
-- RLS — CATALOG (public read)
-- ============================================================

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_shapes ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE design_templates ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read active categories" ON categories;
CREATE POLICY "Public read active categories" ON categories FOR SELECT USING (active = true);

DROP POLICY IF EXISTS "Public read active products" ON products;
CREATE POLICY "Public read active products" ON products FOR SELECT USING (active = true);

DROP POLICY IF EXISTS "Public read active variants" ON product_variants;
CREATE POLICY "Public read active variants" ON product_variants FOR SELECT USING (active = true);

DROP POLICY IF EXISTS "Public read active shapes" ON product_shapes;
CREATE POLICY "Public read active shapes" ON product_shapes FOR SELECT USING (active = true);

DROP POLICY IF EXISTS "Public read product images" ON product_images;
CREATE POLICY "Public read product images" ON product_images FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read active templates" ON design_templates;
CREATE POLICY "Public read active templates" ON design_templates FOR SELECT USING (active = true);

-- Admin write on catalog (writes only — public SELECT policies above)
DROP POLICY IF EXISTS "Admin manage categories" ON categories;
DROP POLICY IF EXISTS "Admin insert categories" ON categories;
DROP POLICY IF EXISTS "Admin update categories" ON categories;
DROP POLICY IF EXISTS "Admin delete categories" ON categories;
CREATE POLICY "Admin insert categories" ON categories FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admin update categories" ON categories FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admin delete categories" ON categories FOR DELETE USING (public.is_admin());

DROP POLICY IF EXISTS "Admin manage products" ON products;
DROP POLICY IF EXISTS "Admin insert products" ON products;
DROP POLICY IF EXISTS "Admin update products" ON products;
DROP POLICY IF EXISTS "Admin delete products" ON products;
CREATE POLICY "Admin insert products" ON products FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admin update products" ON products FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admin delete products" ON products FOR DELETE USING (public.is_admin());

DROP POLICY IF EXISTS "Admin manage variants" ON product_variants;
DROP POLICY IF EXISTS "Admin insert variants" ON product_variants;
DROP POLICY IF EXISTS "Admin update variants" ON product_variants;
DROP POLICY IF EXISTS "Admin delete variants" ON product_variants;
CREATE POLICY "Admin insert variants" ON product_variants FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admin update variants" ON product_variants FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admin delete variants" ON product_variants FOR DELETE USING (public.is_admin());

DROP POLICY IF EXISTS "Admin manage shapes" ON product_shapes;
DROP POLICY IF EXISTS "Admin insert shapes" ON product_shapes;
DROP POLICY IF EXISTS "Admin update shapes" ON product_shapes;
DROP POLICY IF EXISTS "Admin delete shapes" ON product_shapes;
CREATE POLICY "Admin insert shapes" ON product_shapes FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admin update shapes" ON product_shapes FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admin delete shapes" ON product_shapes FOR DELETE USING (public.is_admin());

DROP POLICY IF EXISTS "Admin manage images" ON product_images;
DROP POLICY IF EXISTS "Admin insert images" ON product_images;
DROP POLICY IF EXISTS "Admin update images" ON product_images;
DROP POLICY IF EXISTS "Admin delete images" ON product_images;
CREATE POLICY "Admin insert images" ON product_images FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admin update images" ON product_images FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admin delete images" ON product_images FOR DELETE USING (public.is_admin());

-- ============================================================
-- RLS — PROFILES, DESIGNS, ORDERS
-- ============================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_designs ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_generations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users read own profile" ON profiles;
CREATE POLICY "Users read own profile" ON profiles FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users update own profile" ON profiles;
CREATE POLICY "Users update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Admin read all profiles" ON profiles;
CREATE POLICY "Admin read all profiles" ON profiles FOR SELECT
  USING (public.is_admin());

DROP POLICY IF EXISTS "Users manage own designs" ON saved_designs;
CREATE POLICY "Users manage own designs" ON saved_designs FOR ALL
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users read own orders" ON orders;
CREATE POLICY "Users read own orders" ON orders FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users create own orders" ON orders;
CREATE POLICY "Users create own orders" ON orders FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admin manage orders" ON orders;
DROP POLICY IF EXISTS "Admin select orders" ON orders;
DROP POLICY IF EXISTS "Admin update orders" ON orders;
DROP POLICY IF EXISTS "Admin delete orders" ON orders;
CREATE POLICY "Admin select orders" ON orders FOR SELECT USING (public.is_admin());
CREATE POLICY "Admin update orders" ON orders FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admin delete orders" ON orders FOR DELETE USING (public.is_admin());

DROP POLICY IF EXISTS "Users read own order items" ON order_items;
CREATE POLICY "Users read own order items" ON order_items FOR SELECT
  USING (EXISTS (SELECT 1 FROM orders o WHERE o.id = order_id AND o.user_id = auth.uid()));

DROP POLICY IF EXISTS "Users insert own order items" ON order_items;
CREATE POLICY "Users insert own order items" ON order_items FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM orders o WHERE o.id = order_id AND o.user_id = auth.uid()));

DROP POLICY IF EXISTS "Admin manage order items" ON order_items;
DROP POLICY IF EXISTS "Admin select order items" ON order_items;
DROP POLICY IF EXISTS "Admin update order items" ON order_items;
DROP POLICY IF EXISTS "Admin delete order items" ON order_items;
CREATE POLICY "Admin select order items" ON order_items FOR SELECT USING (public.is_admin());
CREATE POLICY "Admin update order items" ON order_items FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admin delete order items" ON order_items FOR DELETE USING (public.is_admin());

DROP POLICY IF EXISTS "Public read active coupons" ON coupons;
CREATE POLICY "Public read active coupons" ON coupons FOR SELECT USING (active = true);

DROP POLICY IF EXISTS "Admin manage coupons" ON coupons;
DROP POLICY IF EXISTS "Admin insert coupons" ON coupons;
DROP POLICY IF EXISTS "Admin update coupons" ON coupons;
DROP POLICY IF EXISTS "Admin delete coupons" ON coupons;
CREATE POLICY "Admin insert coupons" ON coupons FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admin update coupons" ON coupons FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admin delete coupons" ON coupons FOR DELETE USING (public.is_admin());

DROP POLICY IF EXISTS "Public read site settings" ON site_settings;
CREATE POLICY "Public read site settings" ON site_settings FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admin manage site settings" ON site_settings;
DROP POLICY IF EXISTS "Admin insert site settings" ON site_settings;
DROP POLICY IF EXISTS "Admin update site settings" ON site_settings;
DROP POLICY IF EXISTS "Admin delete site settings" ON site_settings;
CREATE POLICY "Admin insert site settings" ON site_settings FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admin update site settings" ON site_settings FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admin delete site settings" ON site_settings FOR DELETE USING (public.is_admin());

DROP POLICY IF EXISTS "Users read own ai generations" ON ai_generations;
CREATE POLICY "Users read own ai generations" ON ai_generations FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users insert ai generations" ON ai_generations;
CREATE POLICY "Users insert ai generations" ON ai_generations FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admin read all ai generations" ON ai_generations;
CREATE POLICY "Admin read all ai generations" ON ai_generations FOR SELECT
  USING (public.is_admin());

-- ============================================================
-- SEED DATA (idempotent)
-- ============================================================

INSERT INTO categories (id, name, slug, description, active) VALUES
  ('a1000001-0000-4000-8000-000000000001', 'Business', 'business', 'Cards, signage, and branded materials', true),
  ('a1000001-0000-4000-8000-000000000002', 'Clothing', 'clothing', 'Custom apparel and wearable designs', true),
  ('a1000001-0000-4000-8000-000000000003', 'Home', 'home', 'Frames, posters, clocks, and decor', true),
  ('a1000001-0000-4000-8000-000000000004', 'Gifts', 'gifts', 'Thoughtful personalized keepsakes', true)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description, active = EXCLUDED.active;

INSERT INTO products (id, name, slug, description, category_id, category, base_price, image, featured, active, sort_order) VALUES
  ('b2000001-0000-4000-8000-000000000001', 'Custom T-Shirt', 'custom-t-shirt', 'Premium cotton tees with vibrant, long-lasting prints tailored to your style.', 'a1000001-0000-4000-8000-000000000002', 'clothing', 599.00, 'tshirt', true, true, 1),
  ('b2000001-0000-4000-8000-000000000002', 'Acrylic Photo Frame', 'acrylic-photo-frame', 'Crystal-clear acrylic frames that showcase your memories with gallery-quality clarity.', 'a1000001-0000-4000-8000-000000000003', 'home', 499.00, 'frame', true, true, 2),
  ('b2000001-0000-4000-8000-000000000003', 'Custom Mug', 'custom-mug', 'Ceramic mugs with rich, dishwasher-safe prints perfect for gifts or everyday use.', 'a1000001-0000-4000-8000-000000000004', 'gifts', 399.00, 'mug', true, true, 3),
  ('b2000001-0000-4000-8000-000000000004', 'Business Cards', 'business-card', 'Premium cardstock business cards with sharp typography and professional finishes.', 'a1000001-0000-4000-8000-000000000001', 'business', 299.00, 'card', true, true, 4),
  ('b2000001-0000-4000-8000-000000000005', 'Custom Poster', 'custom-poster', 'Museum-quality posters on premium paper with vivid color reproduction.', 'a1000001-0000-4000-8000-000000000003', 'home', 199.00, 'poster', true, true, 5),
  ('b2000001-0000-4000-8000-000000000006', 'Custom Clock', 'custom-clock', 'Personalized wall clocks in multiple premium shapes — your design, every hour.', 'a1000001-0000-4000-8000-000000000003', 'home', 799.00, 'clock', true, true, 6)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, description = EXCLUDED.description, base_price = EXCLUDED.base_price,
  image = EXCLUDED.image, featured = EXCLUDED.featured, active = EXCLUDED.active, sort_order = EXCLUDED.sort_order;

-- Shapes upsert helper via delete+insert for conflict on (product_id, slug)
INSERT INTO product_shapes (product_id, name, slug, shape_type, preview_image, price_adjustment, sort_order, active) VALUES
  ('b2000001-0000-4000-8000-000000000002', 'Bean Portrait', 'bean-portrait', 'acrylic', 'bean-portrait', 200.00, 1, true),
  ('b2000001-0000-4000-8000-000000000002', 'Egg Portrait', 'egg-portrait', 'acrylic', 'egg-portrait', 150.00, 2, true),
  ('b2000001-0000-4000-8000-000000000002', 'Bean Landscape', 'bean-landscape', 'acrylic', 'bean-landscape', 400.00, 3, true),
  ('b2000001-0000-4000-8000-000000000002', 'Egg Landscape', 'egg-landscape', 'acrylic', 'egg-landscape', 350.00, 4, true),
  ('b2000001-0000-4000-8000-000000000002', '5 Photo Collage', '5-photo-collage', 'acrylic', 'photo-collage-5', 800.00, 5, true),
  ('b2000001-0000-4000-8000-000000000002', 'Large + Square Photo Collage', 'large-square-collage', 'acrylic', 'large-square-collage', 1000.00, 6, true),
  ('b2000001-0000-4000-8000-000000000002', 'Couple Acrylic', 'couple-acrylic', 'acrylic', 'couple-acrylic', 500.00, 7, true),
  ('b2000001-0000-4000-8000-000000000002', 'Hexagon 7 Photo Acrylic', 'hexagon-7-photo', 'acrylic', 'hexagon-7-photo', 1100.00, 8, true),
  ('b2000001-0000-4000-8000-000000000006', 'Round', 'round', 'clock', 'round', 0.00, 1, true),
  ('b2000001-0000-4000-8000-000000000006', 'Square', 'square', 'clock', 'square', 0.00, 2, true),
  ('b2000001-0000-4000-8000-000000000006', 'Rectangle', 'rectangle', 'clock', 'rectangle', 50.00, 3, true),
  ('b2000001-0000-4000-8000-000000000006', 'Hexagon', 'hexagon', 'clock', 'hexagon', 100.00, 4, true),
  ('b2000001-0000-4000-8000-000000000006', 'Heart', 'heart', 'clock', 'heart', 100.00, 5, true),
  ('b2000001-0000-4000-8000-000000000006', 'Star', 'star', 'clock', 'star', 100.00, 6, true),
  ('b2000001-0000-4000-8000-000000000006', 'Bean', 'bean', 'clock', 'bean', 150.00, 7, true),
  ('b2000001-0000-4000-8000-000000000006', 'Egg', 'egg', 'clock', 'egg', 150.00, 8, true),
  ('b2000001-0000-4000-8000-000000000006', 'Floral', 'floral', 'clock', 'floral', 200.00, 9, true),
  ('b2000001-0000-4000-8000-000000000002', 'Round', 'round-explore', 'explore', 'round', 0.00, 1, true),
  ('b2000001-0000-4000-8000-000000000002', 'Square', 'square-explore', 'explore', 'square', 0.00, 2, true),
  ('b2000001-0000-4000-8000-000000000002', 'Rectangle', 'rectangle-explore', 'explore', 'rectangle', 0.00, 3, true),
  ('b2000001-0000-4000-8000-000000000002', 'Hexagon', 'hexagon-explore', 'explore', 'hexagon', 0.00, 4, true),
  ('b2000001-0000-4000-8000-000000000002', 'Heart', 'heart-explore', 'explore', 'heart', 0.00, 5, true),
  ('b2000001-0000-4000-8000-000000000002', 'Star', 'star-explore', 'explore', 'star', 0.00, 6, true),
  ('b2000001-0000-4000-8000-000000000002', 'Bean', 'bean-explore', 'explore', 'bean', 0.00, 7, true),
  ('b2000001-0000-4000-8000-000000000002', 'Egg', 'egg-explore', 'explore', 'egg', 0.00, 8, true),
  ('b2000001-0000-4000-8000-000000000002', 'Floral', 'floral-explore', 'explore', 'floral', 0.00, 9, true)
ON CONFLICT (product_id, slug) DO UPDATE SET
  name = EXCLUDED.name, shape_type = EXCLUDED.shape_type, preview_image = EXCLUDED.preview_image,
  price_adjustment = EXCLUDED.price_adjustment, sort_order = EXCLUDED.sort_order, active = EXCLUDED.active;

INSERT INTO site_settings (key, value) VALUES
  ('hero', '{"headline":"Turn Your Ideas Into Something Real.","subheadline":"Premium personalized printing, crafted your way."}'),
  ('featured_products', '[]')
ON CONFLICT (key) DO NOTHING;

-- Storage buckets (run in Supabase dashboard if SQL fails)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('uploads', 'uploads', false) ON CONFLICT DO NOTHING;
-- INSERT INTO storage.buckets (id, name, public) VALUES ('previews', 'previews', true) ON CONFLICT DO NOTHING;
