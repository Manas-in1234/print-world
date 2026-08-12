import { createAdminClient } from "@/lib/supabase/admin";
import { AdminShapeForm } from "@/components/admin/AdminShapeForm";

export default async function NewShapePage() {
  const admin = createAdminClient();
  const { data: products } = admin
    ? await admin.from("products").select("id, name").order("name")
    : { data: [] };

  return <AdminShapeForm products={products ?? []} />;
}
