import { NextResponse } from "next/server";
import { getSupabaseEnvDiagnostics } from "@/lib/supabase/env";

/** Safe deployment diagnostic — never exposes secret values. */
export async function GET() {
  return NextResponse.json(getSupabaseEnvDiagnostics());
}
