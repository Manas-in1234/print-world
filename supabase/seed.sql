-- Print World seed data
-- Run after 001_initial_schema.sql

-- Categories
INSERT INTO categories (id, name, slug, description, active) VALUES
  ('a1000001-0000-4000-8000-000000000001', 'Business', 'business', 'Cards, signage, and branded materials', true),
  ('a1000001-0000-4000-8000-000000000002', 'Clothing', 'clothing', 'Custom apparel and wearable designs', true),
  ('a1000001-0000-4000-8000-000000000003', 'Home', 'home', 'Frames, posters, clocks, and decor', true),
  ('a1000001-0000-4000-8000-000000000004', 'Gifts', 'gifts', 'Thoughtful personalized keepsakes', true)
ON CONFLICT (slug) DO NOTHING;

-- Products
INSERT INTO products (id, name, slug, description, category_id, category, base_price, image, featured, active, sort_order) VALUES
  ('b2000001-0000-4000-8000-000000000001', 'Custom T-Shirt', 'custom-t-shirt',
   'Premium cotton tees with vibrant, long-lasting prints tailored to your style.', 'a1000001-0000-4000-8000-000000000002', 'clothing', 599.00, 'tshirt', true, true, 1),
  ('b2000001-0000-4000-8000-000000000002', 'Acrylic Photo Frame', 'acrylic-photo-frame',
   'Crystal-clear acrylic frames that showcase your memories with gallery-quality clarity.', 'a1000001-0000-4000-8000-000000000003', 'home', 499.00, 'frame', true, true, 2),
  ('b2000001-0000-4000-8000-000000000003', 'Custom Mug', 'custom-mug',
   'Ceramic mugs with rich, dishwasher-safe prints perfect for gifts or everyday use.', 'a1000001-0000-4000-8000-000000000004', 'gifts', 399.00, 'mug', true, true, 3),
  ('b2000001-0000-4000-8000-000000000004', 'Business Cards', 'business-card',
   'Premium cardstock business cards with sharp typography and professional finishes.', 'a1000001-0000-4000-8000-000000000001', 'business', 299.00, 'card', true, true, 4),
  ('b2000001-0000-4000-8000-000000000005', 'Custom Poster', 'custom-poster',
   'Museum-quality posters on premium paper with vivid color reproduction.', 'a1000001-0000-4000-8000-000000000003', 'home', 199.00, 'poster', true, true, 5),
  ('b2000001-0000-4000-8000-000000000006', 'Custom Clock', 'custom-clock',
   'Personalized wall clocks in multiple premium shapes — your design, every hour.', 'a1000001-0000-4000-8000-000000000003', 'home', 799.00, 'clock', true, true, 6)
ON CONFLICT (slug) DO NOTHING;

-- T-Shirt variants
INSERT INTO product_variants (product_id, name, variant_type, price, active) VALUES
  ('b2000001-0000-4000-8000-000000000001', 'Small', 'size', 599.00, true),
  ('b2000001-0000-4000-8000-000000000001', 'Medium', 'size', 599.00, true),
  ('b2000001-0000-4000-8000-000000000001', 'Large', 'size', 649.00, true),
  ('b2000001-0000-4000-8000-000000000001', 'XL', 'size', 699.00, true),
  ('b2000001-0000-4000-8000-000000000001', 'Premium Cotton', 'material', 749.00, true);

-- Mug variants
INSERT INTO product_variants (product_id, name, variant_type, price, active) VALUES
  ('b2000001-0000-4000-8000-000000000003', 'Standard 11oz', 'size', 399.00, true),
  ('b2000001-0000-4000-8000-000000000003', 'Large 15oz', 'size', 499.00, true);

-- Business card variants
INSERT INTO product_variants (product_id, name, variant_type, price, active) VALUES
  ('b2000001-0000-4000-8000-000000000004', 'Matte Finish', 'material', 299.00, true),
  ('b2000001-0000-4000-8000-000000000004', 'Gloss Finish', 'material', 349.00, true),
  ('b2000001-0000-4000-8000-000000000004', 'Premium Cardstock', 'material', 399.00, true);

-- Poster variants
INSERT INTO product_variants (product_id, name, variant_type, price, active) VALUES
  ('b2000001-0000-4000-8000-000000000005', 'A4', 'size', 199.00, true),
  ('b2000001-0000-4000-8000-000000000005', 'A3', 'size', 349.00, true),
  ('b2000001-0000-4000-8000-000000000005', 'A2', 'size', 549.00, true);

-- Acrylic shapes (8)
INSERT INTO product_shapes (product_id, name, slug, shape_type, preview_image, price_adjustment, sort_order, active) VALUES
  ('b2000001-0000-4000-8000-000000000002', 'Bean Portrait', 'bean-portrait', 'acrylic', 'bean-portrait', 200.00, 1, true),
  ('b2000001-0000-4000-8000-000000000002', 'Egg Portrait', 'egg-portrait', 'acrylic', 'egg-portrait', 150.00, 2, true),
  ('b2000001-0000-4000-8000-000000000002', 'Bean Landscape', 'bean-landscape', 'acrylic', 'bean-landscape', 400.00, 3, true),
  ('b2000001-0000-4000-8000-000000000002', 'Egg Landscape', 'egg-landscape', 'acrylic', 'egg-landscape', 350.00, 4, true),
  ('b2000001-0000-4000-8000-000000000002', '5 Photo Collage', '5-photo-collage', 'acrylic', 'photo-collage-5', 800.00, 5, true),
  ('b2000001-0000-4000-8000-000000000002', 'Large + Square Photo Collage', 'large-square-collage', 'acrylic', 'large-square-collage', 1000.00, 6, true),
  ('b2000001-0000-4000-8000-000000000002', 'Couple Acrylic', 'couple-acrylic', 'acrylic', 'couple-acrylic', 500.00, 7, true),
  ('b2000001-0000-4000-8000-000000000002', 'Hexagon 7 Photo Acrylic', 'hexagon-7-photo', 'acrylic', 'hexagon-7-photo', 1100.00, 8, true);

-- Clock shapes (9)
INSERT INTO product_shapes (product_id, name, slug, shape_type, preview_image, price_adjustment, sort_order, active) VALUES
  ('b2000001-0000-4000-8000-000000000006', 'Round', 'round', 'clock', 'round', 0.00, 1, true),
  ('b2000001-0000-4000-8000-000000000006', 'Square', 'square', 'clock', 'square', 0.00, 2, true),
  ('b2000001-0000-4000-8000-000000000006', 'Rectangle', 'rectangle', 'clock', 'rectangle', 50.00, 3, true),
  ('b2000001-0000-4000-8000-000000000006', 'Hexagon', 'hexagon', 'clock', 'hexagon', 100.00, 4, true),
  ('b2000001-0000-4000-8000-000000000006', 'Heart', 'heart', 'clock', 'heart', 100.00, 5, true),
  ('b2000001-0000-4000-8000-000000000006', 'Star', 'star', 'clock', 'star', 100.00, 6, true),
  ('b2000001-0000-4000-8000-000000000006', 'Bean', 'bean', 'clock', 'bean', 150.00, 7, true),
  ('b2000001-0000-4000-8000-000000000006', 'Egg', 'egg', 'clock', 'egg', 150.00, 8, true),
  ('b2000001-0000-4000-8000-000000000006', 'Floral', 'floral', 'clock', 'floral', 200.00, 9, true);

-- Explore-by-shape (9)
INSERT INTO product_shapes (product_id, name, slug, shape_type, preview_image, price_adjustment, sort_order, active) VALUES
  ('b2000001-0000-4000-8000-000000000002', 'Round', 'round', 'explore', 'round', 0.00, 1, true),
  ('b2000001-0000-4000-8000-000000000002', 'Square', 'square', 'explore', 'square', 0.00, 2, true),
  ('b2000001-0000-4000-8000-000000000002', 'Rectangle', 'rectangle', 'explore', 'rectangle', 0.00, 3, true),
  ('b2000001-0000-4000-8000-000000000002', 'Hexagon', 'hexagon', 'explore', 'hexagon', 0.00, 4, true),
  ('b2000001-0000-4000-8000-000000000002', 'Heart', 'heart', 'explore', 'heart', 0.00, 5, true),
  ('b2000001-0000-4000-8000-000000000002', 'Star', 'star', 'explore', 'star', 0.00, 6, true),
  ('b2000001-0000-4000-8000-000000000002', 'Bean', 'bean', 'explore', 'bean', 0.00, 7, true),
  ('b2000001-0000-4000-8000-000000000002', 'Egg', 'egg', 'explore', 'egg', 0.00, 8, true),
  ('b2000001-0000-4000-8000-000000000002', 'Floral', 'floral', 'explore', 'floral', 0.00, 9, true);
