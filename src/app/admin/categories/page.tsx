import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage() {
  const admin = createAdminClient();
  const { data: categories } = admin
    ? await admin.from("categories").select("*").order("name")
    : { data: [] };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-3xl font-semibold">Categories</h1>
        <Link href="/admin/categories/new" className="rounded-full bg-foreground px-4 py-2 text-sm text-background">Add Category</Link>
      </div>
      <div className="mt-6 overflow-x-auto rounded-2xl border border-card-border">
        <table className="w-full text-sm">
          <thead className="bg-surface text-left">
            <tr><th className="p-4">Name</th><th className="p-4">Slug</th><th className="p-4">Active</th><th className="p-4">Actions</th></tr>
          </thead>
          <tbody>
            {(categories ?? []).map((c) => (
              <tr key={c.id} className="border-t border-card-border">
                <td className="p-4">{c.name}</td>
                <td className="p-4 font-mono text-xs">{c.slug}</td>
                <td className="p-4">{c.active ? "Yes" : "No"}</td>
                <td className="p-4"><Link href={`/admin/categories/${c.id}/edit`} className="text-accent hover:underline">Edit</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
