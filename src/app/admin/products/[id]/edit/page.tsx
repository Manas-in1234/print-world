import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";
import { AdminProductForm } from "@/components/admin/AdminProductForm";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;
  const admin = createAdminClient();
  const { data: product } = admin
    ? await admin.from("products").select("*").eq("id", id).maybeSingle()
    : { data: null };

  if (!product) {
    return (
      <div>
        <p>Product not found.</p>
        <Link href="/admin/products">Back</Link>
      </div>
    );
  }

  return <AdminProductForm product={product} />;
}
