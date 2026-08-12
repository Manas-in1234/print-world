-- Print World — Supabase Storage setup (idempotent, safe to re-run)
-- Run in Supabase SQL Editor after FINAL_SETUP.sql

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'uploads',
  'uploads',
  false,
  10485760,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'application/pdf']::text[]
)
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'previews',
  'previews',
  true,
  5242880,
  ARRAY['image/avif', 'image/webp', 'image/jpeg', 'image/png']::text[]
)
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- RLS for storage (drop/recreate idempotently)
DROP POLICY IF EXISTS "Authenticated upload originals" ON storage.objects;
CREATE POLICY "Authenticated upload originals" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'uploads');

DROP POLICY IF EXISTS "Service role full uploads access" ON storage.objects;
CREATE POLICY "Service role full uploads access" ON storage.objects
  FOR ALL TO service_role
  USING (bucket_id IN ('uploads', 'previews'))
  WITH CHECK (bucket_id IN ('uploads', 'previews'));

DROP POLICY IF EXISTS "Public read previews" ON storage.objects;
CREATE POLICY "Public read previews" ON storage.objects
  FOR SELECT TO public
  USING (bucket_id = 'previews');

DROP POLICY IF EXISTS "Users read own uploads" ON storage.objects;
CREATE POLICY "Users read own uploads" ON storage.objects
  FOR SELECT TO authenticated
  USING (bucket_id = 'uploads' AND (storage.foldername(name))[1] = auth.uid()::text);
