import { requireAdmin } from "@/lib/auth/session";
import { createAdminClient } from "@/lib/supabase/admin";
import { NextResponse } from "next/server";

interface Ctx { params: Promise<{ id: string }> }

export async function PUT(request: Request, context: Ctx) {
  const { isAdmin } = await requireAdmin();
  if (!isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await context.params;
  const body = await request.json();
  const admin = createAdminClient();
  if (!admin) return NextResponse.json({ error: "Admin not configured" }, { status: 503 });

  const { error } = await admin.from("product_shapes").update({
    name: body.name,
    slug: body.slug,
    shape_type: body.shape_type,
    preview_image: body.preview_image ?? null,
    price_adjustment: body.price_adjustment ?? 0,
    sort_order: body.sort_order ?? 99,
    active: body.active ?? true,
  }).eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: Request, context: Ctx) {
  const { isAdmin } = await requireAdmin();
  if (!isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await context.params;
  const admin = createAdminClient();
  if (!admin) return NextResponse.json({ error: "Admin not configured" }, { status: 503 });

  const { error } = await admin.from("product_shapes").update({ active: false }).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
