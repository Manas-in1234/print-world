import { createServerClient } from "@supabase/ssr";
import { connection } from "next/server";
import { cookies } from "next/headers";
import type { Database } from "@/types/database";
import { getSupabaseEnv } from "@/lib/supabase/env";

/**
 * Server Supabase client (anon/publishable key + user session cookies).
 * Uses connection() so env vars are read at request time on Vercel,
 * not only from values inlined at build time.
 */
export async function createClient() {
  await connection();

  const { url, anonKey, isConfigured } = getSupabaseEnv();
  if (!isConfigured || !url || !anonKey) return null;

  const cookieStore = await cookies();

  return createServerClient<Database>(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // setAll called from Server Component — safe to ignore
        }
      },
    },
  });
}
