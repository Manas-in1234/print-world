-- Print World — Product sample image references (idempotent, safe to re-run)
-- Points each product to stable local assets in /public/product-assets/

INSERT INTO product_images (product_id, image_url, alt_text, sort_order)
SELECT p.id, v.url, v.alt, v.sort_order
FROM products p
JOIN (VALUES
  ('custom-t-shirt', '/product-assets/custom-t-shirt.svg', 'Custom T-Shirt sample', 0),
  ('acrylic-photo-frame', '/product-assets/acrylic-photo-frame.svg', 'Acrylic Photo Frame sample', 0),
  ('custom-mug', '/product-assets/custom-mug.svg', 'Custom Mug sample', 0),
  ('business-card', '/product-assets/business-card.svg', 'Business Cards sample', 0),
  ('custom-poster', '/product-assets/custom-poster.svg', 'Custom Poster sample', 0),
  ('custom-clock', '/product-assets/custom-clock.svg', 'Custom Clock sample', 0)
) AS v(slug, url, alt, sort_order) ON p.slug = v.slug
WHERE NOT EXISTS (
  SELECT 1 FROM product_images pi WHERE pi.product_id = p.id
);

UPDATE product_images pi
SET image_url = v.url, alt_text = v.alt
FROM products p,
(VALUES
  ('custom-t-shirt', '/product-assets/custom-t-shirt.svg', 'Custom T-Shirt sample'),
  ('acrylic-photo-frame', '/product-assets/acrylic-photo-frame.svg', 'Acrylic Photo Frame sample'),
  ('custom-mug', '/product-assets/custom-mug.svg', 'Custom Mug sample'),
  ('business-card', '/product-assets/business-card.svg', 'Business Cards sample'),
  ('custom-poster', '/product-assets/custom-poster.svg', 'Custom Poster sample'),
  ('custom-clock', '/product-assets/custom-clock.svg', 'Custom Clock sample')
) AS v(slug, url, alt)
WHERE p.slug = v.slug
  AND pi.product_id = p.id
  AND (pi.image_url IS NULL OR pi.image_url = '' OR pi.image_url LIKE '/product-assets/%');
