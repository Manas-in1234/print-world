import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  getServiceRoleKey,
  getSupabaseEnv,
  CATALOG_NOT_CONFIGURED_MESSAGE,
} from "@/lib/supabase/env";

export interface CatalogEnvStatus {
  ok: boolean;
  error: string | null;
  hasUrl: boolean;
  hasServiceRoleKey: boolean;
}

/** Validate server env for catalog reads — never logs secret values. */
export function validateCatalogEnv(): CatalogEnvStatus {
  const { url } = getSupabaseEnv();
  const serviceKey = getServiceRoleKey();
  const hasUrl = Boolean(url);
  const hasServiceRoleKey = Boolean(serviceKey);

  if (!hasUrl || !hasServiceRoleKey) {
    const missing: string[] = [];
    if (!hasUrl) missing.push("NEXT_PUBLIC_SUPABASE_URL");
    if (!hasServiceRoleKey) missing.push("SUPABASE_SERVICE_ROLE_KEY");
    return {
      ok: false,
      error: `Catalog database not configured. Missing: ${missing.join(", ")}.`,
      hasUrl,
      hasServiceRoleKey,
    };
  }

  return { ok: true, error: null, hasUrl, hasServiceRoleKey };
}

/** Server-only Supabase client for public catalog reads (bypasses anon/publishable key). */
export function getCatalogClient(): SupabaseClient<Database> | null {
  const status = validateCatalogEnv();
  if (!status.ok) return null;
  return createAdminClient();
}

export function getCatalogConfigError(): string {
  return validateCatalogEnv().error ?? CATALOG_NOT_CONFIGURED_MESSAGE;
}
