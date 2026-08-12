# Supabase Setup

1. Create a project at [supabase.com](https://supabase.com)
2. Copy `.env.example` to `.env.local` and fill in your credentials
3. Run the SQL files in order via the Supabase SQL Editor:
   - `supabase/migrations/001_initial_schema.sql`
   - `supabase/seed.sql`
4. Enable Email auth under Authentication → Providers
5. Start the dev server: `npm run dev`

The catalog, homepage sections, and product pages fetch live data from Supabase once configured.
