import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/types/database";
import { getSupabaseEnv, SUPABASE_NOT_CONFIGURED_MESSAGE } from "@/lib/supabase/env";

export function createClient() {
  const { url, anonKey } = getSupabaseEnv();
  if (!url || !anonKey) {
    throw new Error(SUPABASE_NOT_CONFIGURED_MESSAGE);
  }
  return createBrowserClient<Database>(url, anonKey);
}

export function createClientIfConfigured() {
  const { url, anonKey, isConfigured } = getSupabaseEnv();
  if (!isConfigured || !url || !anonKey) return null;
  return createBrowserClient<Database>(url, anonKey);
}
