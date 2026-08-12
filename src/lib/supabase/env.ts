/**
 * Central Supabase environment configuration.
 *
 * Public catalog/auth reads use:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
 *
 * Legacy NEXT_PUBLIC_SUPABASE_ANON_KEY is accepted as a fallback only.
 * Server-only secrets (service role, OpenAI, Razorpay secret) stay in
 * their dedicated getters — never import those from client components.
 */

function readPublicEnv(name: string): string | undefined {
  const raw = process.env[name];
  if (raw == null) return undefined;
  const trimmed = raw.trim();
  if (!trimmed) return undefined;
  // Strip accidental surrounding quotes from Vercel / copy-paste
  const unquoted = trimmed.replace(/^['"]+|['"]+$/g, "");
  return unquoted.length > 0 ? unquoted : undefined;
}

export interface SupabaseEnv {
  url: string | undefined;
  anonKey: string | undefined;
  isConfigured: boolean;
}

export function getSupabaseEnv(): SupabaseEnv {
  const url = readPublicEnv("NEXT_PUBLIC_SUPABASE_URL");
  const anonKey =
    readPublicEnv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY") ??
    readPublicEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY");

  return {
    url,
    anonKey,
    isConfigured: Boolean(url && anonKey),
  };
}

/** Safe diagnostic for debugging deployment — never returns secret values. */
export function getSupabaseEnvDiagnostics() {
  const { url, anonKey, isConfigured } = getSupabaseEnv();
  let urlHost: string | null = null;
  if (url) {
    try {
      urlHost = new URL(url).host;
    } catch {
      urlHost = null;
    }
  }

  return {
    isConfigured,
    hasUrl: Boolean(url),
    hasPublishableKey: Boolean(readPublicEnv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY")),
    hasAnonKeyFallback: Boolean(readPublicEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY")),
    urlHost,
    keyLength: anonKey?.length ?? 0,
    nodeEnv: process.env.NODE_ENV ?? "unknown",
  };
}

export function getServiceRoleKey(): string | undefined {
  return readPublicEnv("SUPABASE_SERVICE_ROLE_KEY");
}

export function getOpenAIKey(): string | undefined {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return undefined;
  const trimmed = key.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

export function getRazorpayKeys() {
  const keyId = process.env.RAZORPAY_KEY_ID?.trim();
  const keySecret = process.env.RAZORPAY_KEY_SECRET?.trim();
  return {
    keyId: keyId || undefined,
    keySecret: keySecret || undefined,
    isConfigured: Boolean(keyId && keySecret),
  };
}

export function getPublicRazorpayKeyId() {
  return process.env.RAZORPAY_KEY_ID ?? process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
}

export const SUPABASE_AUTH_NOT_CONFIGURED_MESSAGE =
  "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY.";

/** Server-side catalog reads — requires URL + service role key. */
export const CATALOG_NOT_CONFIGURED_MESSAGE =
  "Catalog database not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY on the server.";
