import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";
import { getServiceRoleKey, getSupabaseEnv } from "@/lib/supabase/env";

/** Server-only admin client — never import in client components. */
export function createAdminClient() {
  const { url } = getSupabaseEnv();
  const serviceKey = getServiceRoleKey();
  if (!url || !serviceKey) return null;
  return createClient<Database>(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
