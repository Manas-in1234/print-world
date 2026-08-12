import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";
import { AdminDesignDelete } from "@/components/admin/AdminDesignDelete";

export const dynamic = "force-dynamic";

export default async function AdminDesignsPage() {
  const admin = createAdminClient();
  const { data: designs } = admin
    ? await admin.from("saved_designs").select("*").order("created_at", { ascending: false }).limit(50)
    : { data: [] };

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold">Saved Designs</h1>
      <div className="mt-6 overflow-x-auto rounded-2xl border border-card-border">
        <table className="w-full text-sm">
          <thead className="bg-surface text-left">
            <tr><th className="p-4">Name</th><th className="p-4">Product</th><th className="p-4">Created</th><th className="p-4">Actions</th></tr>
          </thead>
          <tbody>
            {(designs ?? []).map((d) => (
              <tr key={d.id} className="border-t border-card-border">
                <td className="p-4">{d.name}</td>
                <td className="p-4">{d.product_slug}</td>
                <td className="p-4">{new Date(d.created_at).toLocaleDateString()}</td>
                <td className="p-4 space-x-3">
                  <Link href={`/customize/${d.product_slug}?designId=${d.id}`} className="text-accent hover:underline">View</Link>
                  <AdminDesignDelete designId={d.id} />
                </td>
              </tr>
            ))}
            {!designs?.length && (
              <tr><td colSpan={4} className="p-8 text-center text-muted">No saved designs yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
