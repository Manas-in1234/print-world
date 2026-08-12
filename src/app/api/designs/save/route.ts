import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = await createClient();
  if (!supabase) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Login required to save designs" }, { status: 401 });
  }

  const { productId, productSlug, name, designData } = await request.json();

  const { data, error } = await supabase
    .from("saved_designs")
    .insert({
      user_id: user.id,
      product_id: productId ?? null,
      product_slug: productSlug,
      name: name ?? "Untitled Design",
      design_data: designData,
    })
    .select("id")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ id: data.id });
}
