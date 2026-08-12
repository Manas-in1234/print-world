import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";
import { AdminShapeForm } from "@/components/admin/AdminShapeForm";

interface Props { params: Promise<{ id: string }> }

export default async function EditShapePage({ params }: Props) {
  const { id } = await params;
  const admin = createAdminClient();
  const [{ data: shape }, { data: products }] = admin
    ? await Promise.all([
        admin.from("product_shapes").select("*").eq("id", id).maybeSingle(),
        admin.from("products").select("id, name").order("name"),
      ])
    : [{ data: null }, { data: [] }];

  if (!shape) {
    return <div><p>Not found</p><Link href="/admin/shapes">Back</Link></div>;
  }

  return <AdminShapeForm shape={shape} products={products ?? []} />;
}
