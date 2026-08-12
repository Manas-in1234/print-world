-- Fix RLS infinite recursion on profiles (safe to re-run)
-- Run in Supabase SQL Editor if product queries fail with:
-- "infinite recursion detected in policy for relation profiles"

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

-- Profiles: replace self-referential admin policy
DROP POLICY IF EXISTS "Admin read all profiles" ON profiles;
CREATE POLICY "Admin read all profiles" ON profiles FOR SELECT
  USING (public.is_admin());

-- Catalog admin policies: scope to writes only (SELECT stays public)
DROP POLICY IF EXISTS "Admin manage categories" ON categories;
CREATE POLICY "Admin insert categories" ON categories FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admin update categories" ON categories FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admin delete categories" ON categories FOR DELETE USING (public.is_admin());

DROP POLICY IF EXISTS "Admin manage products" ON products;
CREATE POLICY "Admin insert products" ON products FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admin update products" ON products FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admin delete products" ON products FOR DELETE USING (public.is_admin());

DROP POLICY IF EXISTS "Admin manage variants" ON product_variants;
CREATE POLICY "Admin insert variants" ON product_variants FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admin update variants" ON product_variants FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admin delete variants" ON product_variants FOR DELETE USING (public.is_admin());

DROP POLICY IF EXISTS "Admin manage shapes" ON product_shapes;
CREATE POLICY "Admin insert shapes" ON product_shapes FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admin update shapes" ON product_shapes FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admin delete shapes" ON product_shapes FOR DELETE USING (public.is_admin());

DROP POLICY IF EXISTS "Admin manage images" ON product_images;
CREATE POLICY "Admin insert images" ON product_images FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admin update images" ON product_images FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admin delete images" ON product_images FOR DELETE USING (public.is_admin());

DROP POLICY IF EXISTS "Admin manage templates" ON design_templates;
CREATE POLICY "Admin insert templates" ON design_templates FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admin update templates" ON design_templates FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admin delete templates" ON design_templates FOR DELETE USING (public.is_admin());

-- Orders / coupons / settings / ai — use is_admin() helper
DROP POLICY IF EXISTS "Admin manage orders" ON orders;
CREATE POLICY "Admin select orders" ON orders FOR SELECT USING (public.is_admin());
CREATE POLICY "Admin update orders" ON orders FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admin delete orders" ON orders FOR DELETE USING (public.is_admin());

DROP POLICY IF EXISTS "Admin manage order items" ON order_items;
CREATE POLICY "Admin select order items" ON order_items FOR SELECT USING (public.is_admin());
CREATE POLICY "Admin update order items" ON order_items FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admin delete order items" ON order_items FOR DELETE USING (public.is_admin());

DROP POLICY IF EXISTS "Admin manage coupons" ON coupons;
CREATE POLICY "Admin insert coupons" ON coupons FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admin update coupons" ON coupons FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admin delete coupons" ON coupons FOR DELETE USING (public.is_admin());

DROP POLICY IF EXISTS "Admin manage site settings" ON site_settings;
CREATE POLICY "Admin insert site settings" ON site_settings FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admin update site settings" ON site_settings FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admin delete site settings" ON site_settings FOR DELETE USING (public.is_admin());

DROP POLICY IF EXISTS "Admin read all ai generations" ON ai_generations;
CREATE POLICY "Admin read all ai generations" ON ai_generations FOR SELECT
  USING (public.is_admin());
