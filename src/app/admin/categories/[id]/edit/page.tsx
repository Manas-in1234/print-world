import { createAdminClient } from "@/lib/supabase/admin";
import { AdminCategoryForm } from "@/components/admin/AdminCategoryForm";
import Link from "next/link";

interface Props { params: Promise<{ id: string }> }

export default async function EditCategoryPage({ params }: Props) {
  const { id } = await params;
  const admin = createAdminClient();
  const { data: category } = admin
    ? await admin.from("categories").select("*").eq("id", id).maybeSingle()
    : { data: null };

  if (!category) {
    return <div><p>Not found</p><Link href="/admin/categories">Back</Link></div>;
  }

  return <AdminCategoryForm category={category} />;
}
