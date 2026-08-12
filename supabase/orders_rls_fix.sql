-- Print World — Orders RLS fix (idempotent, safe to re-run)
-- Allows authenticated users to create orders for themselves and guest checkout when not logged in.
-- Does NOT disable RLS. Does NOT delete existing orders.

-- Orders: users create own orders (authenticated OR guest)
DROP POLICY IF EXISTS "Users create own orders" ON orders;
CREATE POLICY "Users create own orders" ON orders
  FOR INSERT
  WITH CHECK (
    (auth.uid() IS NOT NULL AND auth.uid() = user_id)
    OR (auth.uid() IS NULL AND user_id IS NULL)
  );

-- Orders: users read own orders OR guest orders via email match is NOT used — own user_id only
DROP POLICY IF EXISTS "Users read own orders" ON orders;
CREATE POLICY "Users read own orders" ON orders
  FOR SELECT
  USING (auth.uid() = user_id);

-- Guest order read via cookie is handled server-side with admin client + guest token validation

-- Order items: insert when parent order belongs to user or is guest
DROP POLICY IF EXISTS "Users insert own order items" ON order_items;
CREATE POLICY "Users insert own order items" ON order_items
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders o
      WHERE o.id = order_id
        AND (
          (auth.uid() IS NOT NULL AND o.user_id = auth.uid())
          OR (auth.uid() IS NULL AND o.user_id IS NULL)
        )
    )
  );

DROP POLICY IF EXISTS "Users read own order items" ON order_items;
CREATE POLICY "Users read own order items" ON order_items
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM orders o
      WHERE o.id = order_id AND o.user_id = auth.uid()
    )
  );

-- Admin policies (unchanged pattern)
DROP POLICY IF EXISTS "Admin select orders" ON orders;
CREATE POLICY "Admin select orders" ON orders FOR SELECT USING (public.is_admin());

DROP POLICY IF EXISTS "Admin update orders" ON orders;
CREATE POLICY "Admin update orders" ON orders FOR UPDATE USING (public.is_admin());

DROP POLICY IF EXISTS "Admin delete orders" ON orders;
CREATE POLICY "Admin delete orders" ON orders FOR DELETE USING (public.is_admin());

DROP POLICY IF EXISTS "Admin select order items" ON order_items;
CREATE POLICY "Admin select order items" ON order_items FOR SELECT USING (public.is_admin());

DROP POLICY IF EXISTS "Admin update order items" ON order_items;
CREATE POLICY "Admin update order items" ON order_items FOR UPDATE USING (public.is_admin());

DROP POLICY IF EXISTS "Admin delete order items" ON order_items;
CREATE POLICY "Admin delete order items" ON order_items FOR DELETE USING (public.is_admin());

-- Allow admin to insert orders (for support/manual orders)
DROP POLICY IF EXISTS "Admin insert orders" ON orders;
CREATE POLICY "Admin insert orders" ON orders FOR INSERT WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admin insert order items" ON order_items;
CREATE POLICY "Admin insert order items" ON order_items FOR INSERT WITH CHECK (public.is_admin());
