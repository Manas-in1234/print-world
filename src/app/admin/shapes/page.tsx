import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export default async function AdminShapesPage() {
  const admin = createAdminClient();
  const { data: shapes } = admin
    ? await admin.from("product_shapes").select("*").order("sort_order")
    : { data: [] };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-3xl font-semibold">Shapes</h1>
        <Link href="/admin/shapes/new" className="rounded-full bg-foreground px-4 py-2 text-sm text-background">Add Shape</Link>
      </div>
      <div className="mt-6 overflow-x-auto rounded-2xl border border-card-border">
        <table className="w-full text-sm">
          <thead className="bg-surface text-left">
            <tr><th className="p-4">Name</th><th className="p-4">Type</th><th className="p-4">Preview</th><th className="p-4">Active</th><th className="p-4">Actions</th></tr>
          </thead>
          <tbody>
            {(shapes ?? []).map((s) => (
              <tr key={s.id} className="border-t border-card-border">
                <td className="p-4">{s.name}</td>
                <td className="p-4">{s.shape_type}</td>
                <td className="p-4 font-mono text-xs">{s.preview_image ?? s.slug}</td>
                <td className="p-4">{s.active ? "Yes" : "No"}</td>
                <td className="p-4"><Link href={`/admin/shapes/${s.id}/edit`} className="text-accent hover:underline">Edit</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
