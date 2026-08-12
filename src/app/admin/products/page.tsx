import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";
import { formatPrice } from "@/lib/format-price";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const admin = createAdminClient();
  const { data: products } = admin
    ? await admin.from("products").select("*").order("sort_order")
    : { data: [] };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-3xl font-semibold">Products</h1>
        <Link href="/admin/products/new" className="rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background">
          Add Product
        </Link>
      </div>
      <div className="mt-6 overflow-x-auto rounded-2xl border border-card-border">
        <table className="w-full text-sm">
          <thead className="bg-surface text-left">
            <tr>
              <th className="p-4 font-medium">Name</th>
              <th className="p-4 font-medium">Category</th>
              <th className="p-4 font-medium">Price</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {(products ?? []).map((p) => (
              <tr key={p.id} className="border-t border-card-border">
                <td className="p-4">{p.name}</td>
                <td className="p-4 capitalize">{p.category}</td>
                <td className="p-4">{formatPrice(Number(p.base_price))}</td>
                <td className="p-4">{p.active ? (p.featured ? "Featured" : "Active") : "Inactive"}</td>
                <td className="p-4 space-x-3">
                  <Link href={`/admin/products/${p.id}/edit`} className="text-accent hover:underline">Edit</Link>
                  <Link href={`/products/${p.slug}`} className="text-muted hover:underline">View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
