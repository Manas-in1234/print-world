import { requireAdmin } from "@/lib/auth/session";
import { createAdminClient } from "@/lib/supabase/admin";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { isAdmin } = await requireAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await request.json();
  const admin = createAdminClient();
  if (!admin) {
    return NextResponse.json({ error: "Admin not configured" }, { status: 503 });
  }

  const { data, error } = await admin.from("products").insert({
    name: body.name,
    slug: body.slug,
    description: body.description ?? "",
    category: body.category ?? "home",
    base_price: body.base_price ?? 0,
    featured: body.featured ?? false,
    active: body.active ?? true,
    sort_order: body.sort_order ?? 99,
    image: body.image ?? null,
  }).select("id").single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ id: data.id });
}
