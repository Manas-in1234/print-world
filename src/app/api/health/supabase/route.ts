import { NextResponse } from "next/server";
import { getSupabaseEnvDiagnostics, getServiceRoleKey } from "@/lib/supabase/env";
import { validateCatalogEnv } from "@/lib/catalog/catalog-client";

/** Safe deployment diagnostic — never exposes secret values. */
export async function GET() {
  const catalogEnv = validateCatalogEnv();
  return NextResponse.json({
    ...getSupabaseEnvDiagnostics(),
    catalog: {
      ok: catalogEnv.ok,
      hasUrl: catalogEnv.hasUrl,
      hasServiceRoleKey: catalogEnv.hasServiceRoleKey,
      serviceRoleKeyLength: getServiceRoleKey()?.length ?? 0,
    },
  });
}
