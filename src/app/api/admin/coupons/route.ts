import { requireAdmin } from "@/lib/auth/session";
import { createAdminClient } from "@/lib/supabase/admin";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { isAdmin } = await requireAdmin();
  if (!isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await request.json();
  const admin = createAdminClient();
  if (!admin) return NextResponse.json({ error: "Admin not configured" }, { status: 503 });

  const { data, error } = await admin.from("coupons").insert({
    code: body.code.toUpperCase(),
    description: body.description ?? null,
    discount_type: body.discount_type ?? "percent",
    discount_value: body.discount_value,
    min_order: body.min_order ?? 0,
    active: body.active ?? true,
    expires_at: body.expires_at ?? null,
  }).select("id").single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ id: data.id });
}
